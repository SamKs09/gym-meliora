// Cloudflare Worker for handling short URLs and tracking
const BACKEND_URL = 'https://gym-meliora-api.example.com'; // Update with your actual backend URL
const FRONTEND_URL = 'https://gym-meliora.com'; // Update with your actual frontend URL

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.substring(1); // Remove leading slash

    // Check if this looks like a short code (alphanumeric, 8 chars)
    if (/^[a-f0-9]{8}$/.test(path)) {
      try {
        // Track the click
        const trackingData = {
          ipAddress: request.headers.get('cf-connecting-ip') || 'unknown',
          referrer: request.headers.get('referer') || 'direct',
          userAgent: request.headers.get('user-agent') || 'unknown'
        };

        ctx.waitUntil(
          fetch(`${BACKEND_URL}/api/share-links/track-click/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trackingData)
          }).catch(err => console.error('Tracking failed:', err))
        );

        // Redirect to frontend with referral code
        return Response.redirect(
          `${FRONTEND_URL}/?ref=${path}`,
          302
        );
      } catch (error) {
        console.error('Error processing short link:', error);
        return new Response('Short link not found', { status: 404 });
      }
    }

    // If not a short code, return 404
    return new Response('Not found', { status: 404 });
  }
};
