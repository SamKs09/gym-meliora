#!/bin/bash
# Build and deploy script for Gym Meliora
# Handles frontend build and worker deployment

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏋️  Gym Meliora - Build & Deploy Pipeline"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Get environment from first argument (production, staging, development)
ENVIRONMENT=${1:-production}
echo "📦 Target Environment: $ENVIRONMENT"

# Step 1: Build Frontend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 Step 1: Building Frontend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd frontend
npm install --production
npm run build
cd ..

if [ ! -d "frontend/out" ]; then
    echo "❌ Frontend build failed: frontend/out directory not found"
    exit 1
fi
echo "✅ Frontend built successfully"

# Step 2: Deploy Worker
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚙️  Step 2: Deploying Worker"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$ENVIRONMENT" != "production" ] && [ "$ENVIRONMENT" != "staging" ]; then
    echo "⚠️  Unknown environment: $ENVIRONMENT. Using production."
    ENVIRONMENT="production"
fi

npx wrangler deploy --env "$ENVIRONMENT"
echo "✅ Worker deployed successfully"

# Step 3: Deploy Frontend to Pages
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📄 Step 3: Deploying Frontend to Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

npx wrangler pages deploy ./frontend/out --project-name=gym-meliora
echo "✅ Frontend deployed to Pages successfully"

# Step 4: Manual Configuration Required
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  Manual Configuration Required"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Configure Worker Routes in Cloudflare Dashboard:"
echo "1. Go to Workers & Pages → Your Domain → Routes"
echo "2. Add new route:"
echo "   Pattern: share.gym-meliora.com/*"
echo "   Worker: gym-meliora"
echo "   Zone: gym-meliora.com"
echo ""
echo "Or for subdomain routing:"
echo "   Pattern: */share/*"
echo "   Worker: gym-meliora"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Verify worker is accessible"
echo "2. Test share link redirects"
echo "3. Check Cloudflare dashboard for deployment status"
echo ""
