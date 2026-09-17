# Deployment Guide - Gym Meliora

Complete instructions for deploying to Cloudflare Pages + Workers.

## Prerequisites

1. Cloudflare account with a domain
2. `wrangler` CLI installed: `npm install -g @cloudflare/wrangler`
3. Authenticated with Cloudflare: `wrangler login`

## Deployment Steps

### Step 1: Build Frontend

```bash
cd frontend
npm install
npm run build
cd ..
```

This creates `frontend/out` with optimized static files.

### Step 2: Deploy Worker (Share Links Handler)

```bash
# Deploy to production environment
wrangler deploy --env production

# Or deploy to staging
wrangler deploy --env staging
```

This deploys the short URL redirect worker (`src/worker.js`).

### Step 3: Configure Worker Routes (Cloudflare Dashboard)

After deploying the worker, configure routes:

1. **Cloudflare Dashboard** → Your Domain → Workers Routes
2. **Add Route:**
   - Pattern: `share.gym-meliora.com/*`
   - Worker: `gym-meliora` (or your worker name)
   - Zone: `gym-meliora.com`

Or use subdomain routing:
   - Pattern: `*/share/*`
   - Worker: `gym-meliora`
   - No zone required (routes to any domain)

### Step 4: Deploy Frontend to Pages

```bash
# Requires frontend/out directory to exist (from step 1)
wrangler pages deploy ./frontend/out --project-name=gym-meliora
```

Or configure continuous deployment in Cloudflare Dashboard:
1. Go to Pages → Create → Connect to Git
2. Select your repo
3. Build settings:
   - Framework: Next.js
   - Build command: `cd frontend && npm run build`
   - Build output directory: `frontend/out`

### Step 4: Configure DNS & Routes

**For share subdomain:**
1. Cloudflare Dashboard → DNS
2. Create CNAME: `share` → `gym-meliora-worker.workers.dev`
3. Or route `/share/*` on main domain to the worker

**For main site:**
1. Cloudflare Pages automatically sets up DNS
2. Point your domain to Pages nameservers

## Environment Setup

### Production Environment

Update `.env.production`:
```bash
NEXT_PUBLIC_BACKEND_URL=https://api.gym-meliora.com
NEXT_PUBLIC_SHARE_DOMAIN=https://share.gym-meliora.com
```

Update wrangler.toml `[env.production]`:
```toml
[env.production]
vars = { BACKEND_URL = "https://api.gym-meliora.com", FRONTEND_URL = "https://gym-meliora.com" }
```

### Deploy Production Worker

```bash
wrangler deploy --env production
```

## Deployment Checklist

- [ ] Backend API is running and accessible
- [ ] MongoDB connection verified
- [ ] Frontend environment variables configured
- [ ] Frontend builds successfully (`npm run build`)
- [ ] `frontend/out` directory exists
- [ ] Wrangler authenticated (`wrangler whoami`)
- [ ] Worker code has correct backend URL
- [ ] Pages deployment configured or manual deploy complete
- [ ] DNS records pointing to Cloudflare
- [ ] Share domain/route configured
- [ ] Test referral link generation
- [ ] Test share link redirect
- [ ] Verify click tracking works

## Testing After Deployment

### Test Share Link Flow

```bash
# 1. Generate a link
curl -X POST https://api.gym-meliora.com/api/share-links/generate \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "test-user",
    "clientName": "Test Client",
    "clientEmail": "test@example.com",
    "discountPercent": 10
  }'

# 2. Visit the share link (should redirect and track click)
curl -L https://share.gym-meliora.com/{shortCode}

# 3. Check stats
curl https://api.gym-meliora.com/api/share-links/stats/{shortCode}
```

## Troubleshooting

### "Could not find frontend/out"
- Run `cd frontend && npm run build` first
- Verify `next.config.mjs` has `output: "export"`

### Worker not redirecting
- Check wrangler.toml routes match your domain
- Verify DNS/CNAME points to worker
- Check worker logs: `wrangler tail --env production`

### Clicks not tracking
- Verify backend URL in worker matches actual API
- Check backend logs for tracking requests
- Ensure CORS is configured properly

### Deployment fails in CI/CD
- Set `CLOUDFLARE_API_TOKEN` environment variable
- Set `CLOUDFLARE_ACCOUNT_ID` environment variable
- Run `npm install -g @cloudflare/wrangler@latest`

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
          cd ..
      
      - name: Deploy Pages
        run: npx wrangler pages deploy ./frontend/out --project-name=gym-meliora
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      
      - name: Deploy Worker
        run: npx wrangler deploy --env production
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Set secrets in GitHub:
- `CLOUDFLARE_API_TOKEN` - from Cloudflare Dashboard → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` - from Cloudflare Dashboard → Overview

## Rollback

### Rollback Worker
```bash
# View deployment history
wrangler deployments list

# Rollback to previous version
wrangler rollback
```

### Rollback Pages
1. Cloudflare Dashboard → Pages → Deployments
2. Select previous version → "Rollback to this deployment"

## Monitoring

### View Logs

```bash
# Worker logs (real-time)
wrangler tail --env production

# Worker logs (last 100 messages)
wrangler tail --env production --limit=100
```

### Analytics

- **Pages**: Dashboard → Analytics & Logs
- **Worker**: Dashboard → Analytics → HTTP Requests
- **API**: Check backend application logs

## Support

For issues:
1. Check Cloudflare status: https://www.cloudflarestatus.com
2. Review Wrangler logs: Check `.wrangler/logs/`
3. Verify credentials: `wrangler whoami`
4. Check DNS propagation: `dig share.gym-meliora.com`
