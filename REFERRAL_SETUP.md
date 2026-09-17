# Gym Meliora Referral & Share Links System

Complete setup guide for the client referral program with Cloudflare integration.

## Overview

This system allows clients to:
- Generate unique referral links
- Share links via social media, email, or WhatsApp
- Track clicks and conversions
- Earn discounts when referred friends sign up
- View real-time referral statistics

## Architecture

### Backend (Express + MongoDB)
- **Model**: `ShareLink` - stores referral link data
- **Routes**: `/api/share-links/` - handles link generation, tracking, stats
- **Features**: Click tracking, conversion tracking, analytics

### Cloudflare Worker
- Handles short URL redirects
- Tracks clicks with IP/User-Agent/Referrer info
- Redirects to frontend with referral parameter

### Frontend (Next.js)
- `ReferralDashboard` component - client-facing UI
- Generate new links
- View statistics
- Social sharing buttons

## Setup Instructions

### 1. Backend Setup

**Add environment variables to `.env`:**
```bash
FRONTEND_URL=http://localhost:3000          # Development
SHARE_DOMAIN=http://localhost:3000          # Where share links point to
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gym_meliora
```

**Production values:**
```bash
FRONTEND_URL=https://gym-meliora.com
SHARE_DOMAIN=https://share.gym-meliora.com
```

**Install and run backend:**
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup

**Add to `.env.local`:**
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_SHARE_DOMAIN=http://localhost:3000
```

**Import the component in your page:**
```jsx
import ReferralDashboard from '@/components/ReferralDashboard';

export default function ReferralPage() {
  // Get clientId from auth/session
  const clientId = 'user-123';
  const clientName = 'John Doe';

  return <ReferralDashboard clientId={clientId} clientName={clientName} />;
}
```

### 3. Cloudflare Worker Setup

**Deploy the worker:**
```bash
# From project root
wrangler deploy
```

**Configure your domain:**
1. Go to Cloudflare Dashboard
2. Select your domain (gym-meliora.com)
3. Create a subdomain `share.gym-meliora.com`
4. Route traffic to the worker

**OR use custom domain routing:**
- Route `/share/*` to the Worker on your main domain
- Update `SHARE_DOMAIN` accordingly

### 4. Database Schema

ShareLink model includes:
- `shortCode` - unique 8-char hex code
- `clientId` - who owns the link
- `clientName` - name for display
- `fullUrl` - original landing URL
- `type` - 'referral', 'invite', or 'membership'
- `discountCode` - unique code like "MELIORA-ABC12345"
- `discountPercent` - discount amount (e.g., 10)
- `clicks` - number of click-throughs
- `conversions` - number of successful signups
- `clicksHistory` - detailed click logs
- `createdAt`, `updatedAt` - timestamps

## API Endpoints

### Generate a Share Link
```bash
POST /api/share-links/generate
{
  "clientId": "user-123",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "type": "referral",
  "discountPercent": 10
}
```

Response:
```json
{
  "success": true,
  "shareLink": {
    "shortCode": "abc12345",
    "discountCode": "MELIORA-ABC12345",
    "fullUrl": "https://gym-meliora.com?ref=abc12345",
    "clicks": 0,
    "conversions": 0
  }
}
```

### Get Client's Share Links
```bash
GET /api/share-links/client/:clientId
```

### Get Share Link Stats
```bash
GET /api/share-links/stats/:shortCode
```

Response:
```json
{
  "shortCode": "abc12345",
  "clicks": 42,
  "conversions": 5,
  "conversionRate": 11.9,
  "shareUrl": "https://share.gym-meliora.com/abc12345",
  "discountCode": "MELIORA-ABC12345",
  "discountPercent": 10
}
```

### Track a Click (Called by Worker)
```bash
POST /api/share-links/track-click/:shortCode
{
  "ipAddress": "192.168.1.1",
  "referrer": "twitter.com",
  "userAgent": "Mozilla/5.0..."
}
```

### Record a Conversion
```bash
POST /api/share-links/convert/:shortCode
```

## Integration with Booking System

When a user completes a booking with a referral code:

1. **Capture the referral code from URL:**
```jsx
const searchParams = useSearchParams();
const refCode = searchParams.get('ref');
```

2. **Store with booking:**
```javascript
app.post('/api/bookings', async (req, res) => {
  const { fullName, email, phone, interest, referralCode } = req.body;
  
  // Save booking with referral code
  const booking = new Booking({
    fullName, email, phone, interest, referralCode
  });
  await booking.save();
  
  // Record conversion if referral code exists
  if (referralCode) {
    await fetch(`/api/share-links/convert/${referralCode}`, { method: 'POST' });
  }
  
  res.json({ success: true, booking });
});
```

## Rewards Program

Add rewards logic to your booking confirmation:

```javascript
// Calculate client reward
if (booking.referralCode) {
  const refLink = await ShareLink.findOne({ shortCode: booking.referralCode });
  const reward = (refLink.discountPercent / 100) * bookingPrice;
  
  // Add credit to referrer's account
  await Client.findByIdAndUpdate(refLink.clientId, {
    $inc: { 'rewards.balance': reward }
  });
}
```

## Monitoring & Analytics

**View share link performance:**
```bash
GET /api/share-links/client/user-123
```

Returns array of all links with live stats:
- Clicks per link
- Conversion rates
- Creation date
- Active status

**Track top performers:**
```javascript
// Find links by conversion rate
const topLinks = await ShareLink.find({ clientId })
  .sort({ conversions: -1 })
  .limit(10);
```

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `FRONTEND_URL` | Frontend domain | `https://gym-meliora.com` |
| `SHARE_DOMAIN` | Short link domain | `https://share.gym-meliora.com` |
| `BACKEND_URL` | API endpoint | `https://api.gym-meliora.com` |
| `MONGODB_URI` | Database connection | `mongodb+srv://...` |

## Troubleshooting

**Links not tracking clicks:**
- Verify Worker is deployed: `wrangler deploy`
- Check backend URL in worker.js
- Review Cloudflare Worker logs

**Conversions not recording:**
- Ensure referral code is captured in booking form
- Verify `/api/share-links/convert/:code` is called
- Check MongoDB connection

**Short links not redirecting:**
- Confirm DNS is pointing to Cloudflare
- Check route configuration in wrangler.toml
- Verify Worker environment variables

## Next Steps

1. **Customize discount amounts** - adjust `discountPercent` per client tier
2. **Add tiered rewards** - higher rewards for multiple conversions
3. **Email notifications** - notify clients of clicks/conversions
4. **Leaderboard** - show top referrers
5. **Affiliate dashboard** - advanced analytics and export
