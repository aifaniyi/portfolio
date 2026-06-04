# GitHub Actions Workflows

This directory contains automated workflows for building and deploying the portfolio.

## Available Workflows

### `deploy.yml` - Build and Deploy to S3

Automatically builds the portfolio and deploys to AWS S3 on every push to main/master branch.

**Triggers:**
- Push to `main` or `master` branch (builds and deploys)
- Pull requests to `main` or `master` (builds only, no deploy)
- Manual trigger via GitHub Actions UI

**Features:**
- ✅ Automated build with linting
- ✅ Deployment to S3 with smart caching
- ✅ CloudFront cache invalidation (optional)
- ✅ Secure authentication via OIDC or Access Keys
- ✅ Concurrency control (one deployment at a time)
- ✅ Only deploys from protected branches

## Getting Started

1. **Read the Setup Guide**: See [SETUP-CHECKLIST.md](./SETUP-CHECKLIST.md)
2. **Follow Detailed Instructions**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Configure AWS**: Set up S3, IAM, and optionally CloudFront
4. **Add GitHub Secrets**: Configure authentication credentials
5. **Push to Main**: Trigger your first deployment!

## Required GitHub Secrets

Choose one authentication method:

### Method 1: OIDC (Recommended)
```
AWS_ROLE_ARN=arn:aws:iam::ACCOUNT_ID:role/GitHubActionsDeployRole
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC (optional)
```

### Method 2: Access Keys
```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC (optional)
```

## Quick Setup

### 1. Create S3 Bucket
```bash
aws s3 mb s3://your-portfolio-bucket
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document index.html
```

### 2. Apply Bucket Policy
Edit `.github/s3-bucket-policy.json` with your bucket name, then:
```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-bucket \
  --policy file://.github/s3-bucket-policy.json
```

### 3. Create IAM Role (OIDC)
Edit `.github/aws-trust-policy.json` and `.github/aws-iam-policy.json`, then:
```bash
aws iam create-role \
  --role-name GitHubActionsDeployRole \
  --assume-role-policy-document file://.github/aws-trust-policy.json

aws iam put-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-name GitHubActionsS3Deploy \
  --policy-document file://.github/aws-iam-policy.json
```

### 4. Add GitHub Secrets
Go to: Repository Settings → Secrets and variables → Actions → New secret

### 5. Push to Main
```bash
git add .
git commit -m "Add deployment workflow"
git push origin main
```

## Files in This Directory

- `deploy.yml` - Main workflow file
- `DEPLOYMENT.md` - Comprehensive deployment guide
- `SETUP-CHECKLIST.md` - Step-by-step setup checklist
- `aws-iam-policy.json` - IAM permissions template
- `aws-trust-policy.json` - OIDC trust policy template
- `s3-bucket-policy.json` - S3 public access policy template
- `README.md` - This file

## Workflow Status

Check your deployment status:
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. View recent workflow runs
4. Click on a run to see detailed logs

## Monitoring

### GitHub Actions
- **Actions tab**: See all workflow runs
- **Badges**: Add status badge to README
- **Notifications**: Get email on workflow failures

### AWS
```bash
# List S3 bucket contents
aws s3 ls s3://your-bucket-name/ --recursive

# Check CloudFront invalidations
aws cloudfront list-invalidations \
  --distribution-id YOUR_DISTRIBUTION_ID
```

## Troubleshooting

### Build Fails
1. Check GitHub Actions logs
2. Run `npm run build` locally
3. Verify Node.js version
4. Check for TypeScript/ESLint errors

### Deploy Fails
1. Verify AWS credentials in GitHub secrets
2. Check IAM permissions
3. Verify S3 bucket exists
4. Check AWS region is correct

### Website Not Loading
1. Check S3 bucket policy
2. Verify files were uploaded
3. Clear CloudFront cache
4. Check DNS settings (custom domain)

## Security

### Best Practices
- ✅ Use OIDC instead of access keys
- ✅ Least privilege IAM policies
- ✅ Enable branch protection
- ✅ Review workflow changes in PRs
- ✅ Rotate credentials regularly
- ✅ Monitor CloudTrail logs
- ✅ Enable MFA on AWS account

### Secrets Management
- Never commit secrets to repository
- Use GitHub encrypted secrets
- Rotate credentials periodically
- Use separate credentials per environment
- Review secret access regularly

## Cost Management

### Expected Costs (10K visits/month)
- S3: ~$0.01/month
- CloudFront: ~$0.10/month
- Data transfer: ~$0.05/month
- **Total**: ~$0.16/month (~$2/year)

### Cost Optimization
- Enable CloudFront compression
- Set appropriate cache headers
- Use S3 lifecycle policies
- Monitor with AWS Budgets
- Review CloudWatch metrics

## Customization

### Modify Build Command
Edit `deploy.yml`:
```yaml
- name: Run build
  run: npm run build
  env:
    NODE_ENV: production
    # Add custom env vars here
```

### Change Cache Strategy
Edit cache-control headers in `deploy.yml`:
```yaml
--cache-control "public,max-age=31536000,immutable"
```

### Add Build Steps
Add before the "Run build" step:
```yaml
- name: Run tests
  run: npm test

- name: Type check
  run: npm run type-check
```

## Next Steps

1. ✅ Follow [SETUP-CHECKLIST.md](./SETUP-CHECKLIST.md)
2. ✅ Configure AWS resources
3. ✅ Add GitHub secrets
4. ✅ Push to main to deploy
5. ✅ Set up custom domain (optional)
6. ✅ Configure monitoring (optional)

## Support

- **Documentation**: See DEPLOYMENT.md for detailed guide
- **AWS Support**: https://console.aws.amazon.com/support
- **GitHub Actions**: https://docs.github.com/en/actions
- **CloudFront**: https://docs.aws.amazon.com/cloudfront

---

**Ready to deploy?** Follow the [Setup Checklist](./SETUP-CHECKLIST.md)!
