# Deployment Setup Checklist

Follow this checklist to set up your automated deployment.

## Prerequisites
- [ ] AWS Account created
- [ ] GitHub repository created
- [ ] AWS CLI installed (optional, for manual setup)
- [ ] Decided on authentication method (OIDC recommended)

---

## AWS Setup (Choose Method A or B)

### Method A: OIDC (Recommended) 🔒

#### 1. Create GitHub OIDC Provider in AWS IAM
- [ ] Go to IAM → Identity providers → Add provider
- [ ] Provider type: OpenID Connect
- [ ] Provider URL: `https://token.actions.githubusercontent.com`
- [ ] Audience: `sts.amazonaws.com`
- [ ] Click "Add provider"

#### 2. Create IAM Role
- [ ] Go to IAM → Roles → Create role
- [ ] Trusted entity: Web identity
- [ ] Identity provider: token.actions.githubusercontent.com
- [ ] Audience: sts.amazonaws.com
- [ ] Click "Next"

#### 3. Edit Trust Policy
- [ ] Copy content from `.github/aws-trust-policy.json`
- [ ] Replace `YOUR_ACCOUNT_ID` with your AWS account ID
- [ ] Replace `YOUR_GITHUB_USERNAME` with your GitHub username
- [ ] Paste into trust policy editor

#### 4. Attach Permissions
- [ ] Copy content from `.github/aws-iam-policy.json`
- [ ] Replace `YOUR_BUCKET_NAME` with your S3 bucket name
- [ ] Replace `YOUR_ACCOUNT_ID` with your AWS account ID
- [ ] Create inline policy and paste

#### 5. Name and Create Role
- [ ] Role name: `GitHubActionsDeployRole`
- [ ] Click "Create role"
- [ ] Copy the Role ARN (you'll need this for GitHub secrets)

---

### Method B: Access Keys (Simpler) ⚠️

#### 1. Create IAM User
- [ ] Go to IAM → Users → Create user
- [ ] User name: `github-actions-deploy`
- [ ] No console access needed

#### 2. Attach Policy
- [ ] Copy content from `.github/aws-iam-policy.json`
- [ ] Replace `YOUR_BUCKET_NAME` with your S3 bucket name
- [ ] Replace `YOUR_ACCOUNT_ID` with your AWS account ID
- [ ] Attach as inline policy

#### 3. Create Access Keys
- [ ] Click on user → Security credentials
- [ ] Create access key → Application running outside AWS
- [ ] **Save Access Key ID and Secret Access Key** (you won't see it again!)

---

## S3 Bucket Setup

### 1. Create Bucket
- [ ] Go to S3 → Create bucket
- [ ] Bucket name: `your-portfolio-bucket` (must be globally unique)
- [ ] Region: Select your preferred region (e.g., us-east-1)
- [ ] Keep default settings for now
- [ ] Click "Create bucket"

### 2. Enable Static Website Hosting
- [ ] Go to bucket → Properties tab
- [ ] Scroll to "Static website hosting" → Edit
- [ ] Enable static website hosting
- [ ] Index document: `portfolio/index.html`
- [ ] Error document: `portfolio/index.html`
- [ ] Save changes
- [ ] Copy the bucket website endpoint URL

### 3. Configure Bucket Policy (if not using CloudFront)
- [ ] Go to bucket → Permissions tab
- [ ] Scroll to "Bucket policy" → Edit
- [ ] Copy content from `.github/s3-bucket-policy.json`
- [ ] Replace `YOUR_BUCKET_NAME` with your actual bucket name
- [ ] Save changes

### 4. Disable Block Public Access (if not using CloudFront)
- [ ] Go to bucket → Permissions tab
- [ ] "Block public access" → Edit
- [ ] Uncheck "Block all public access"
- [ ] Confirm by typing "confirm"
- [ ] Save changes

**Note**: If using CloudFront, skip steps 3 and 4.

---

## CloudFront Setup (Optional but Recommended)

### 1. Create Distribution
- [ ] Go to CloudFront → Create distribution
- [ ] Origin domain: Select your S3 bucket website endpoint
  - Use: `your-bucket.s3-website-us-east-1.amazonaws.com`
  - NOT: `your-bucket.s3.amazonaws.com`
- [ ] Origin path: leave empty
- [ ] Name: Your bucket name

### 2. Distribution Settings
- [ ] Viewer protocol policy: Redirect HTTP to HTTPS
- [ ] Allowed HTTP methods: GET, HEAD
- [ ] Compress objects automatically: Yes
- [ ] Price class: Use only North America and Europe (or your preference)
- [ ] Alternate domain name (CNAME): your-domain.com (if using custom domain)
- [ ] Custom SSL certificate: Select your certificate (if using custom domain)
- [ ] Default root object: `index.html`
- [ ] Click "Create distribution"

### 3. Configure Error Pages (for SPA routing)
- [ ] Go to distribution → Error pages tab
- [ ] Create custom error response:
  - HTTP error code: 403
  - Customize error response: Yes
  - Response page path: `/portfolio/index.html`
  - HTTP response code: 200
  - Click "Create"
- [ ] Create another custom error response:
  - HTTP error code: 404
  - Customize error response: Yes
  - Response page path: `/portfolio/index.html`
  - HTTP response code: 200
  - Click "Create"

### 4. Copy Distribution Details
- [ ] Copy Distribution ID (e.g., E1234567890ABC)
- [ ] Copy Distribution domain name (e.g., d123.cloudfront.net)
- [ ] Wait for distribution to deploy (Status: "Enabled")

---

## GitHub Secrets Setup

Go to your GitHub repository: **Settings → Secrets and variables → Actions**

### For OIDC Method:
- [ ] New repository secret: `AWS_ROLE_ARN`
  - Value: `arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole`
- [ ] New repository secret: `AWS_REGION`
  - Value: `us-east-1` (or your chosen region)
- [ ] New repository secret: `S3_BUCKET_NAME`
  - Value: Your bucket name (e.g., `your-portfolio-bucket`)

### For Access Keys Method:
- [ ] New repository secret: `AWS_ACCESS_KEY_ID`
  - Value: Your access key ID
- [ ] New repository secret: `AWS_SECRET_ACCESS_KEY`
  - Value: Your secret access key
- [ ] New repository secret: `AWS_REGION`
  - Value: `us-east-1` (or your chosen region)
- [ ] New repository secret: `S3_BUCKET_NAME`
  - Value: Your bucket name

### Optional (for both methods):
- [ ] New repository secret: `CLOUDFRONT_DISTRIBUTION_ID`
  - Value: Your CloudFront distribution ID (if using CloudFront)

---

## Workflow Setup

### 1. Verify Workflow File
- [ ] Check that `.github/workflows/deploy.yml` exists
- [ ] If using Access Keys, uncomment the Access Keys authentication section
- [ ] If using Access Keys, comment out the OIDC authentication section

### 2. Update Workflow (if needed)
- [ ] Open `.github/workflows/deploy.yml`
- [ ] Verify branch names match your repo (main or master)
- [ ] Verify Node.js version matches your local version
- [ ] Save any changes

---

## Testing

### 1. Test Build Locally
```bash
npm install
npm run lint
npm run build
```
- [ ] Verify build completes successfully
- [ ] Check that `dist/` folder is created
- [ ] Open `dist/index.html` in browser to verify

### 2. Push to Repository
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```
- [ ] Push committed successfully

### 3. Monitor GitHub Actions
- [ ] Go to repository → Actions tab
- [ ] Click on the latest workflow run
- [ ] Verify "Build Application" job completes
- [ ] Verify "Deploy to S3" job completes (only on main/master)
- [ ] Check for any errors in logs

### 4. Verify Deployment
- [ ] Visit S3 bucket website URL (from step "S3 Bucket Setup #2")
- [ ] OR visit CloudFront URL (if using CloudFront)
- [ ] Verify your portfolio loads correctly
- [ ] Test navigation and links
- [ ] Check browser console for errors

---

## Custom Domain Setup (Optional)

### 1. Request SSL Certificate
- [ ] Go to AWS Certificate Manager (ACM)
- [ ] Region: **us-east-1** (required for CloudFront)
- [ ] Request certificate
- [ ] Domain name: `yourdomain.com`
- [ ] Add another name: `www.yourdomain.com`
- [ ] Validation method: DNS validation
- [ ] Request certificate

### 2. Validate Certificate
- [ ] Copy DNS records from ACM
- [ ] Add CNAME records to your domain DNS
- [ ] Wait for validation (can take up to 30 minutes)
- [ ] Verify status shows "Issued"

### 3. Update CloudFront
- [ ] Go to CloudFront distribution → Edit
- [ ] Alternate domain names: Add `yourdomain.com` and `www.yourdomain.com`
- [ ] Custom SSL certificate: Select your ACM certificate
- [ ] Save changes
- [ ] Wait for distribution to deploy

### 4. Update DNS
- [ ] Go to your domain DNS provider
- [ ] Add A record or ALIAS record:
  - Name: `@` (or leave blank for root domain)
  - Type: A or ALIAS
  - Value: Your CloudFront distribution domain
- [ ] Add CNAME record for www:
  - Name: `www`
  - Type: CNAME
  - Value: Your CloudFront distribution domain
- [ ] Save changes
- [ ] Wait for DNS propagation (5-30 minutes)

---

## Post-Deployment

### 1. Set Up Monitoring (Optional)
- [ ] Enable CloudWatch alarms for S3
- [ ] Enable CloudWatch alarms for CloudFront
- [ ] Set up AWS Budget alerts
- [ ] Configure SNS notifications

### 2. Security Hardening
- [ ] Enable S3 versioning for backup
- [ ] Enable S3 server access logging
- [ ] Enable CloudTrail for audit logs
- [ ] Review IAM permissions (least privilege)
- [ ] Enable MFA on AWS account

### 3. Performance Optimization
- [ ] Enable S3 Transfer Acceleration (if needed)
- [ ] Configure CloudFront caching rules
- [ ] Set up CloudFront functions (if needed)
- [ ] Monitor CloudFront cache hit ratio

---

## Troubleshooting

### Build Fails
- [ ] Check GitHub Actions logs for errors
- [ ] Verify build works locally: `npm run build`
- [ ] Check Node.js version matches workflow
- [ ] Verify all dependencies are in package.json

### Deployment Fails
- [ ] Verify AWS credentials/role ARN in GitHub secrets
- [ ] Check IAM permissions include S3 access
- [ ] Verify bucket name is correct
- [ ] Check AWS region matches

### Website Not Loading
- [ ] Verify bucket policy allows public read
- [ ] Check CloudFront distribution is deployed
- [ ] Clear browser cache
- [ ] Check S3 bucket has files
- [ ] Verify index.html exists in bucket root

### Changes Not Showing
- [ ] Wait for CloudFront invalidation to complete
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check if files were actually uploaded to S3
- [ ] Verify CloudFront cache settings

---

## Maintenance

### Regular Tasks
- [ ] Review AWS costs monthly
- [ ] Update dependencies regularly
- [ ] Monitor GitHub Actions usage
- [ ] Review CloudWatch logs
- [ ] Rotate access keys (if using Access Keys method)

### When Making Changes
- [ ] Create feature branch
- [ ] Test locally
- [ ] Create pull request (triggers build)
- [ ] Review GitHub Actions output
- [ ] Merge to main (triggers deployment)
- [ ] Verify deployment successful

---

## Quick Reference

### Useful Commands

```bash
# Test build locally
npm run build

# Sync to S3 manually
aws s3 sync dist/ s3://your-bucket-name/portfolio/ --delete

# List S3 bucket contents
aws s3 ls s3://your-bucket-name/portfolio/

# Invalidate CloudFront cache manually
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/portfolio/*"

# Check CloudFront invalidation status
aws cloudfront get-invalidation \
  --distribution-id YOUR_DIST_ID \
  --id INVALIDATION_ID
```

### Important URLs

- GitHub Actions: `https://github.com/USERNAME/REPO/actions`
- AWS Console: `https://console.aws.amazon.com`
- S3 Console: `https://s3.console.aws.amazon.com`
- CloudFront Console: `https://console.aws.amazon.com/cloudfront`
- IAM Console: `https://console.aws.amazon.com/iam`

---

## Success Criteria

You've successfully set up deployment when:
- ✅ GitHub Actions workflow runs without errors
- ✅ Files are uploaded to S3 bucket
- ✅ Website loads at S3 or CloudFront URL
- ✅ All pages and features work correctly
- ✅ HTTPS is enabled (if using CloudFront)
- ✅ Custom domain works (if configured)

**Congratulations!** 🎉 Your portfolio is now automatically deployed!

---

## Need Help?

- Review `.github/DEPLOYMENT.md` for detailed instructions
- Check GitHub Actions logs for errors
- Review AWS CloudWatch logs
- Test AWS CLI commands manually
- Verify all secrets are set correctly in GitHub
