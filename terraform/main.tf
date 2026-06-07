# ── Terraform & Provider ────────────────────────────────────────────────────

terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ── S3 ──────────────────────────────────────────────────────────────────────
# Private bucket — no public access. CloudFront reads it via OAC.

resource "aws_s3_bucket" "portfolio" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "portfolio" {
  bucket                  = aws_s3_bucket.portfolio.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "portfolio" {
  bucket     = aws_s3_bucket.portfolio.id
  depends_on = [aws_s3_bucket_public_access_block.portfolio]
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontOAC"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.portfolio.arn}/portfolio/*"
      Condition = {
        StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.portfolio.arn }
      }
    }]
  })
}

# ── CloudFront ───────────────────────────────────────────────────────────────
# OAC signs requests to S3 so the bucket never needs to be public.

resource "aws_cloudfront_origin_access_control" "portfolio" {
  name                              = "${var.bucket_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "portfolio" {
  enabled             = true
  default_root_object = "portfolio/index.html"

  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = "s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.portfolio.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/portfolio/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/portfolio/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# ── GitHub Actions OIDC ───────────────────────────────────────────────────────
# Allows GitHub Actions to assume an AWS role without storing long-term credentials.

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
  ]
}

resource "aws_iam_role" "github_actions" {
  name = "GitHubActionsDeployRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRoleWithWebIdentity"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Condition = {
        StringEquals = { "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com" }
        StringLike   = { "token.actions.githubusercontent.com:sub" = "repo:${var.github_username}/${var.github_repo}:*" }
      }
    }]
  })
}

resource "aws_iam_role_policy" "github_actions" {
  role = aws_iam_role.github_actions.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"]
        Resource = [aws_s3_bucket.portfolio.arn, "${aws_s3_bucket.portfolio.arn}/*"]
      },
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = aws_cloudfront_distribution.portfolio.arn
      },
    ]
  })
}
