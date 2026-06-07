# Terraform — Portfolio Infrastructure

Provisions the AWS infrastructure for the portfolio site: a private S3 bucket served through CloudFront (OAC), and a GitHub Actions IAM role using OIDC for keyless deployments.

## Resources

| Resource | Description |
|---|---|
| `aws_s3_bucket` | Private bucket for static assets |
| `aws_cloudfront_distribution` | CDN with HTTPS, SPA error handling |
| `aws_cloudfront_origin_access_control` | Signs S3 requests — bucket stays private |
| `aws_iam_openid_connect_provider` | GitHub Actions OIDC provider |
| `aws_iam_role` | Deploy role assumed by GitHub Actions |

## Prerequisites

- Terraform >= 1.6
- AWS credentials with sufficient permissions (IAM, S3, CloudFront)

## Usage

```bash
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars with your values

terraform init
terraform apply
```

## Variables

| Name | Description | Default |
|---|---|---|
| `aws_region` | AWS region | `us-east-1` |
| `bucket_name` | S3 bucket name | — |
| `github_username` | GitHub username for OIDC trust | — |
| `github_repo` | GitHub repo name for OIDC trust | `portfolio` |

## Outputs

| Name | Description |
|---|---|
| `s3_bucket_name` | Bucket name → `S3_BUCKET_NAME` secret |
| `cloudfront_distribution_id` | Distribution ID → `CLOUDFRONT_DISTRIBUTION_ID` secret |
| `cloudfront_domain_name` | Public CloudFront domain |
| `github_actions_role_arn` | IAM role ARN → `AWS_ROLE_ARN` secret |
