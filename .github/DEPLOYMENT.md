# GitHub Actions Deployment to AWS S3

This guide will help you set up automated deployment of your portfolio to AWS S3 using GitHub Actions.

## Architecture

```
GitHub Push → GitHub Actions → Build → Upload to S3 → (Optional) CloudFront Invalidation
```

## Prerequisites

1. AWS Account
2. GitHub repository
3. S3 bucket created
4. (Optional) CloudFront distribution

## Setup Methods

Choose **ONE** of these authentication methods:

### Method 1: OIDC (Recommended - More Secure) 🔒

OpenID Connect provides temporary credentials without storing long-term secrets.

#### Step 1: Create IAM Role for GitHub Actions

1. **Go to AWS IAM Console** → Roles → Create role

2. **Select "Web identity"**
   - Identity provider: Choose or create OIDC provider
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

3. **Configure Trust Policy**
   
   Edit the trust policy to:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/portfolio:*"
           }
         }
       }
     ]
   }
   ```
   
   Replace:
   - `YOUR_ACCOUNT_ID` with your AWS account ID
   - `YOUR_GITHUB_USERNAME` with your GitHub username

4. **Attach Permissions Policy**
   
   Create an inline policy or attach existing policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::YOUR_BUCKET_NAME",
           "arn:aws:s3:::YOUR_BUCKET_NAME/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
       }
     ]
   }
   ```

5. **Name the role**: `GitHubActionsDeployRole`

6. **Copy the Role ARN**: `arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole`

#### Step 2: Add GitHub Identity Provider (if not exists)

1. Go to IAM → Identity providers → Add provider
2. Provider type: OpenID Connect
3. Provider URL: `https://token.actions.githubusercontent.com`
4. Audience: `sts.amazonaws.com`
5. Click "Add provider"

---

### Method 2: Access Keys (Simpler, Less Secure) ⚠️

Uses long-term credentials stored as secrets.

#### Step 1: Create IAM User

1. **Go to AWS IAM Console** → Users → Create user
2. **User name**: `github-actions-deploy`
3. **Attach policies directly**: Create custom policy
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::YOUR_BUCKET_NAME",
           "arn:aws:s3:::YOUR_BUCKET_NAME/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

#### Step 2: Create Access Keys

1. Click on the user → Security credentials
2. Create access key → Application running outside AWS
3. **Save the Access Key ID and Secret Access Key** (you won't see it again!)

---

## GitHub Secrets Configuration

Go to your GitHub repository: **Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets

Add these secrets based on your chosen method:

#### For OIDC Method (Recommended):
```
AWS_ROLE_ARN
  Value: arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole

AWS_REGION
  Value: us-east-1 (or your preferred region)

S3_BUCKET_NAME
  Value: your-bucket-name
```

#### For Access Keys Method:
```
AWS_ACCESS_KEY_ID
  Value: AKIA... (from Step 2 above)

AWS_SECRET_ACCESS_KEY
  Value: (from Step 2 above)

AWS_REGION
  Value: us-east-1 (or your preferred region)

S3_BUCKET_NAME
  Value: your-bucket-name
```

#### Optional (for both methods):
```
CLOUDFRONT_DISTRIBUTION_ID
  Value: E1234567890ABC (if using CloudFront)
```

---

## S3 Bucket Configuration

### 1. Create S3 Bucket

```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

### 2. Enable Static Website Hosting

```bash
aws s3 website s3://your-bucket-name \
  --index-document portfolio/index.html \
  --error-document portfolio/index.html
```

Or via Console:
1. Go to S3 → Your bucket → Properties
2. Static website hosting → Enable
3. Index document: `portfolio/index.html`
4. Error document: `portfolio/index.html` (for SPA routing)

### 3. Configure Bucket Policy (Public Access)

**⚠️ Warning**: This makes your bucket publicly readable

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply via:
```bash
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

### 4. Disable Block Public Access (if needed)

1. Go to S3 → Your bucket → Permissions
2. Block public access → Edit
3. Uncheck "Block all public access" (only if using S3 directly, not needed with CloudFront)

---

## CloudFront Configuration (Optional but Recommended)

### Benefits:
- HTTPS support
- Custom domain
- CDN caching
- Better performance
- DDoS protection

### Setup:

1. **Create Distribution**
   ```bash
   aws cloudfront create-distribution \
     --origin-domain-name your-bucket-name.s3-website-us-east-1.amazonaws.com \
     --default-root-object index.html
   ```

2. **Configure Settings**:
   - Origin: Your S3 bucket website endpoint (not REST endpoint)
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Compress objects: Yes
   - Price class: Use only US, Canada, Europe (or all)
   - Alternate domain names: your-domain.com (if using custom domain)
   - SSL certificate: Request or import certificate in ACM

3. **Custom Error Pages** (for SPA routing):
   - Error code: 403
   - Response page path: `/portfolio/index.html`
   - Response code: 200
   
   - Error code: 404
   - Response page path: `/portfolio/index.html`
   - Response code: 200

4. **Copy Distribution ID** and add to GitHub secrets

---

## Workflow Features

### What it Does:

1. **Build Job**:
   - ✅ Checks out code
   - ✅ Sets up Node.js 18 with npm caching
   - ✅ Installs dependencies (npm ci for reproducible builds)
   - ✅ Runs linter to catch errors
   - ✅ Builds production bundle
   - ✅ Uploads build artifacts

2. **Deploy Job** (only on main/master branch):
   - ✅ Downloads build artifacts
   - ✅ Authenticates with AWS (OIDC or Access Keys)
   - ✅ Syncs files to S3 with smart caching:
     - Static assets (JS/CSS/images): 1 year cache
     - HTML files: 1 hour cache
     - Metadata (JSON/XML): No cache
   - ✅ Invalidates CloudFront cache (if configured)
   - ✅ Provides deployment summary

### Cache Strategy:

```
Static Assets (*.js, *.css, images): max-age=31536000 (1 year)
  - These are hashed and immutable
  - Safe to cache aggressively

HTML Files (*.html): max-age=3600 (1 hour)
  - Entry points that reference hashed assets
  - Shorter cache for updates

Metadata (*.json, *.xml, *.txt): no-cache
  - Always fetch fresh
  - Important for SEO (sitemap, robots.txt)
```

### Security Features:

- ✅ Read-only default permissions
- ✅ OIDC authentication (no long-term credentials)
- ✅ Temporary session credentials
- ✅ Least privilege IAM policies
- ✅ Concurrency control (only one deployment at a time)
- ✅ Only deploys from main/master branch
- ✅ Secrets stored securely in GitHub

---

## Testing the Workflow

### 1. Test Build (Pull Request)

Create a PR to test the build without deploying:
```bash
git checkout -b test-deployment
git add .
git commit -m "Test GitHub Actions workflow"
git push origin test-deployment
```

Open a PR on GitHub - it will build but NOT deploy.

### 2. Deploy (Push to Main)

After PR is merged or push directly:
```bash
git checkout main
git push origin main
```

This will build AND deploy to S3.

### 3. Manual Trigger

You can also trigger manually from GitHub:
1. Go to Actions tab
2. Select "Build and Deploy to S3"
3. Click "Run workflow"

---

## Monitoring

### GitHub Actions

1. Go to your repository → Actions tab
2. Click on a workflow run to see details
3. Expand steps to see logs

### AWS

```bash
# List recent objects in bucket
aws s3 ls s3://your-bucket-name/portfolio/ --recursive --human-readable

# Check CloudFront invalidation status
aws cloudfront get-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --id INVALIDATION_ID
```

---

## Troubleshooting

### Issue: "Error: Credentials could not be loaded"

**Solution**: 
- Check that secrets are set correctly in GitHub
- Verify IAM role ARN is correct (for OIDC)
- Verify access keys are correct (for Access Keys method)

### Issue: "Access Denied" on S3

**Solution**:
- Check IAM policy has correct permissions
- Verify bucket name is correct
- Check bucket policy allows public read (if applicable)

### Issue: "Build failed"

**Solution**:
- Check build logs in GitHub Actions
- Ensure all dependencies are in package.json
- Test build locally: `npm run build`

### Issue: Changes not visible on website

**Solution**:
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check CloudFront invalidation completed
- Wait a few minutes for CloudFront propagation
- Check if correct files were uploaded to S3

### Issue: SPA routing not working (404 on refresh)

**Solution**:
- Configure CloudFront error pages (see above)
- Or configure S3 error document to index.html

---

## Cost Estimates

### S3:
- Storage: $0.023 per GB/month (first 50 TB)
- Requests: $0.0004 per 1,000 GET requests
- Data transfer: Free to CloudFront, $0.09/GB to internet

### CloudFront:
- Data transfer: $0.085 per GB (first 10 TB)
- Requests: $0.0075 per 10,000 requests

**Example**: Portfolio with 10,000 visits/month
- Storage (100 MB): ~$0.002
- S3 requests: ~$0.004
- CloudFront data transfer (1 GB): ~$0.085
- CloudFront requests: ~$0.008

**Total**: ~$0.10/month (less than $2/year)

---

## Custom Domain Setup

### 1. Request SSL Certificate (ACM)

```bash
aws acm request-certificate \
  --domain-name yourdomain.com \
  --subject-alternative-names www.yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

**Important**: Must be in us-east-1 for CloudFront

### 2. Validate Certificate

Add DNS records provided by ACM to your domain

### 3. Configure CloudFront

1. Edit distribution
2. Alternate domain names: `yourdomain.com`, `www.yourdomain.com`
3. Custom SSL certificate: Select your ACM certificate

### 4. Update DNS

Add CNAME or ALIAS record pointing to CloudFront distribution:
```
yourdomain.com → d1234567890.cloudfront.net
```

---

## Environment Variables (Optional)

If you need environment variables in your build:

### 1. Add to workflow:
```yaml
- name: Run build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_URL: ${{ secrets.API_URL }}
    VITE_ANALYTICS_ID: ${{ secrets.ANALYTICS_ID }}
```

### 2. Add secrets to GitHub

### 3. Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Security Best Practices

1. ✅ **Use OIDC instead of Access Keys**
2. ✅ **Principle of least privilege** - only grant necessary permissions
3. ✅ **Enable MFA** on AWS root and IAM users
4. ✅ **Rotate credentials** regularly (if using Access Keys)
5. ✅ **Monitor CloudTrail** for suspicious activity
6. ✅ **Use CloudFront** instead of direct S3 access
7. ✅ **Enable S3 versioning** for backup
8. ✅ **Set up AWS Budget alerts**
9. ✅ **Use branch protection** on main branch
10. ✅ **Review IAM policies** periodically

---

## Next Steps

1. [ ] Choose authentication method (OIDC recommended)
2. [ ] Create AWS resources (IAM role/user, S3 bucket)
3. [ ] Configure GitHub secrets
4. [ ] Push to main branch to trigger deployment
5. [ ] Verify deployment in S3/CloudFront
6. [ ] (Optional) Set up custom domain
7. [ ] (Optional) Set up monitoring/alerts

---

## Quick Start Commands

```bash
# Create S3 bucket
aws s3 mb s3://your-portfolio-bucket

# Enable website hosting
aws s3 website s3://your-portfolio-bucket \
  --index-document portfolio/index.html \
  --error-document portfolio/index.html

# Upload build manually (test)
npm run build
aws s3 sync dist/ s3://your-portfolio-bucket/portfolio/ --delete

# View website
echo "http://your-portfolio-bucket.s3-website-us-east-1.amazonaws.com/portfolio/"
```

---

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify AWS credentials and permissions
3. Test AWS CLI commands manually
4. Check CloudWatch logs (if applicable)
5. Review AWS documentation

---

## Workflow File Location

`.github/workflows/deploy.yml`

This file is already created in your repository and ready to use once you configure the AWS resources and GitHub secrets!
