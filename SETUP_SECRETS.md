# Cloudflare Setup & Secrets Configuration

Complete guide to set up Cloudflare and CI/CD secrets for deployment.

## Prerequisites

1. Cloudflare account (free tier works)
2. Domain registered and added to Cloudflare
3. GitHub repository (for CI/CD)

## 1. Cloudflare API Credentials

### Get API Token

1. **Cloudflare Dashboard** → Account → API Tokens
2. Click **Create Token**
3. Use template: **Edit Cloudflare Workers**
4. Configure:
   - ✓ Account → Workers Scripts → Edit
   - ✓ Account → Workers Routes → Edit
   - ✓ Account → Workers KV → Edit
   - ✓ Account → Account Firewall Access → Edit
   - ✓ Zone → Workers Routes → Edit
   - Specific Zone: Select your zone (gym-meliora.com)
5. Copy the token

### Get Account ID

1. **Cloudflare Dashboard** → Overview
2. Find "Account ID" on the right panel
3. Copy it

## 2. GitHub Secrets Setup

### Add Secrets to GitHub

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Secret Name | Value |
|------------|-------|
| `CLOUDFLARE_API_TOKEN` | Your API token from above |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID from above |

### Example Secrets Format

```
CLOUDFLARE_API_TOKEN: v1.0xxxxxxxxxxxxx_xxxxxxxxxxxxxx-xxxxx
CLOUDFLARE_ACCOUNT_ID: abc123def456ghi789jk
```

## 3. Cloudflare Domain Setup

### Ensure Domain Uses Cloudflare

1. **Cloudflare Dashboard** → Your Domain
2. Check nameservers are pointing to Cloudflare:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
3. Update domain registrar if needed

### Create DNS Records (if needed)

For subdomain sharing (optional):
1. DNS → Add Record
   - Type: CNAME
   - Name: `share`
   - Content: `gym-meliora.workers.dev`
   - TTL: Auto
   - Proxy: Cloudflare

## 4. Cloudflare Worker Routes Configuration

### Manual Setup (Required)

After first deployment, configure routes:

1. **Cloudflare Dashboard** → Workers & Pages → Routes
2. Click **Add route**
3. Configure:
   - **Route pattern**: `share.gym-meliora.com/*`
   - **Worker**: `gym-meliora`
   - **Zone**: `gym-meliora.com` (if using zone-specific routing)

### Alternative Subdomain Routing

If using wildcard on main domain:
   - **Route pattern**: `*/share/*`
   - **Worker**: `gym-meliora`
   - No zone required

## 5. Test Deployment

### Manual Test (Local)

```bash
# Login to Cloudflare
wrangler login

# Deploy worker
wrangler deploy --env production

# Deploy frontend
cd frontend && npm run build && cd ..
wrangler pages deploy ./frontend/out --project-name=gym-meliora
```

### Test via GitHub Actions

1. Push to `main` branch
2. Go to repo → **Actions** tab
3. Watch "Deploy to Cloudflare" workflow
4. Check deployment status

## 6. Verify Deployment

### Check Worker Deployment

```bash
# View deployed worker
wrangler tail --env production

# Or check in dashboard:
# Cloudflare → Workers & Pages → gym-meliora
```

### Test Share Link

```bash
# Generate a share link
curl -X POST http://localhost:5000/api/share-links/generate \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "test",
    "clientName": "Test",
    "clientEmail": "test@example.com"
  }'

# Should return shortCode (e.g., "abc12345")

# Test the redirect
curl -L https://share.gym-meliora.com/abc12345
# Should redirect to https://gym-meliora.com?ref=abc12345
```

## 7. Environment Variables

### Production Environment

Update these in your deployment:

**wrangler.toml:**
```toml
[env.production]
vars = { 
  BACKEND_URL = "https://api.gym-meliora.com",
  FRONTEND_URL = "https://gym-meliora.com"
}
```

**frontend/.env.local:**
```bash
NEXT_PUBLIC_BACKEND_URL=https://api.gym-meliora.com
NEXT_PUBLIC_SHARE_DOMAIN=https://share.gym-meliora.com
```

**backend/.env:**
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gym_meliora
FRONTEND_URL=https://gym-meliora.com
SHARE_DOMAIN=https://share.gym-meliora.com
```

## 8. Troubleshooting

### "Could not find zone for gym-meliora.com"

**Solution:** Configure routes in dashboard instead of wrangler.toml
- Routes in config file require zone setup
- Use dashboard for easier configuration

### Worker not redirecting

**Check:**
1. Route configured in Cloudflare dashboard
2. DNS CNAME pointing to worker subdomain
3. Worker code has correct FRONTEND_URL

### CI/CD Secrets Error

**Solution:**
1. Verify secrets are added correctly
2. Check secret names match exactly (case-sensitive)
3. Re-run workflow after adding secrets

### Build fails in CI/CD

**Check:**
1. `frontend/out` directory created
2. `npm install` successful
3. Node version compatible
4. No TypeScript/ESLint errors

## 9. Maintenance

### Update API Token

If token expires or needs rotation:
1. Generate new token in Cloudflare
2. Update `CLOUDFLARE_API_TOKEN` secret in GitHub
3. Re-run deployment

### Monitor Deployments

```bash
# View recent deployments
wrangler deployments list --env production

# View worker logs
wrangler tail --env production --format pretty
```

## 10. Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Guide](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
