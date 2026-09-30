// Cloudflare Worker for handling short URLs, tracking, and static frontend serving
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

        const backendUrl = env?.BACKEND_URL || 'https://gym-meliora-api.example.com';
        const frontendUrl = env?.FRONTEND_URL || url.origin;

        ctx.waitUntil(
          fetch(`${backendUrl}/api/share-links/track-click/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trackingData)
          }).catch(err => console.error('Tracking failed:', err))
        );

        // Redirect to frontend with referral code
        return Response.redirect(
          `${frontendUrl}/?ref=${path}`,
          302
        );
      } catch (error) {
        console.error('Error processing short link:', error);
        return new Response('Short link not found', { status: 404 });
      }
    }

    // Serve Next.js static assets from ./frontend/out
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
