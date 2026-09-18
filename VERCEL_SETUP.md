# Vercel Deployment Setup

Complete guide to deploy Gym Meliora frontend to Vercel.

## Quick Start

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **New Project**
4. Select your GitHub repository (`gym-meliora`)
5. Click **Import**

### 2. Configure Project

- **Project Name:** gym-meliora
- **Framework:** Next.js (auto-detected)
- **Root Directory:** ./ (or leave blank)
- Click **Deploy**

That's it! Vercel will automatically deploy on every push to `main`.

## GitHub Secrets Setup

To enable automatic deployments, add these GitHub secrets:

### Get Vercel Tokens

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create** 
3. Name: `GitHub Actions`
4. Copy the token

### Get Vercel Project IDs

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **gym-meliora** project
3. Settings → **General**
4. Copy:
   - **Project ID**
   - **Organization ID** (at top of page)

### Add to GitHub Secrets

Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Your Vercel token from step 1 |
| `VERCEL_ORG_ID` | Organization ID |
| `VERCEL_PROJECT_ID` | Project ID |
| `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:5000` (for now) |

## Environment Variables

### For Frontend

Add to Vercel project settings → **Environment Variables**:

```
NEXT_PUBLIC_BACKEND_URL = http://localhost:5000
NEXT_PUBLIC_SHARE_DOMAIN = https://gym-meliora.vercel.app
```

Or set in GitHub Secrets → Actions → `NEXT_PUBLIC_BACKEND_URL`

## Your Website URL

Once deployed:
- **Preview:** https://gym-meliora.vercel.app
- **Live:** https://gym-meliora.vercel.app (same, since no custom domain yet)

## Testing Deployment

### Manual Deploy (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Check Status

1. Vercel Dashboard → **gym-meliora** project
2. **Deployments** tab shows:
   - Build status (success/failed)
   - Live URL
   - Deployment history

## Local Testing Before Deploy

```bash
cd frontend
npm install
npm run build
npm run start
```

Then visit: http://localhost:3000

## Troubleshooting

### Build Fails

**Check:**
1. Vercel Logs: Dashboard → Deployments → Click failed deploy → View logs
2. Package.json has correct build script
3. All dependencies installed

**Common error:** "Cannot read properties of undefined (reading 'fsPath')"
- Solution: This is fixed with the new vercel.json configuration

### Environment Variables Not Working

1. Make sure variables start with `NEXT_PUBLIC_` for client-side
2. Add to Vercel project settings (not just GitHub secrets)
3. Redeploy after adding variables

### Website Shows 404

1. Check that `/out` directory was built
2. Verify `vercel.json` outputDirectory is correct
3. Check Vercel build logs for errors

## Next Steps

1. ✅ Connect GitHub to Vercel
2. ✅ Add GitHub secrets for auto-deploy
3. ✅ Add environment variables to Vercel
4. ✅ Push to main (triggers auto-deploy)
5. ⏳ Deploy backend somewhere
6. 🔗 Update `NEXT_PUBLIC_BACKEND_URL` with backend URL

## Custom Domain (Optional)

1. Vercel Dashboard → gym-meliora → Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions

## Monitoring

- **Build Logs:** Vercel Dashboard → Deployments
- **Error Tracking:** Vercel Analytics
- **Performance:** Vercel Web Analytics

## Cost

- **Free tier:** Unlimited static sites, good for this project
- **Pro:** $20/month if you need advanced features

Your website is now live at: **https://gym-meliora.vercel.app** 🚀
