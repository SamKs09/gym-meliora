const express = require('express');
const router = express.Router();
const crypto = require('crypto');

let ShareLink;
try {
  ShareLink = require('../models/ShareLink');
} catch (e) {
  ShareLink = null;
}

// In-memory fallback
let shareLinkMemoryDb = [];

function generateShortCode() {
  return crypto.randomBytes(4).toString('hex');
}

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

// 1. Generate a new share link for a client
router.post('/generate', async (req, res) => {
  try {
    const { clientId, clientName, clientEmail, type = 'referral', membershipTier, discountPercent } = req.body;

    if (!clientId || !clientName) {
      return res.status(400).json({ error: 'clientId and clientName are required' });
    }

    const shortCode = generateShortCode();
    const fullUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}?ref=${shortCode}`;
    const discountCode = `MELIORA-${shortCode.toUpperCase()}`;

    const shareLinkData = {
      shortCode,
      clientId,
      clientName,
      clientEmail,
      fullUrl,
      type,
      membershipTier,
      discountCode,
      discountPercent: discountPercent || 10,
      clicks: 0,
      conversions: 0,
      isActive: true
    };

    if (ShareLink) {
      const newLink = new ShareLink(shareLinkData);
      await newLink.save();
      return res.status(201).json({ success: true, shareLink: newLink });
    } else {
      const linkWithId = { _id: shortCode, ...shareLinkData };
      shareLinkMemoryDb.push(linkWithId);
      return res.status(201).json({ success: true, shareLink: linkWithId });
    }
  } catch (error) {
    console.error('Error generating share link:', error);
    res.status(500).json({ error: 'Failed to generate share link' });
  }
});

// 2. Get all share links for a client
router.get('/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;

    if (ShareLink) {
      const links = await ShareLink.find({ clientId }).sort({ createdAt: -1 });
      return res.json(links);
    } else {
      const links = shareLinkMemoryDb.filter(l => l.clientId === clientId).sort((a, b) => b.createdAt - a.createdAt);
      return res.json(links);
    }
  } catch (error) {
    console.error('Error fetching share links:', error);
    res.status(500).json({ error: 'Failed to fetch share links' });
  }
});

// 3. Track a click on a share link (called by Cloudflare Worker)
router.post('/track-click/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { ipAddress, referrer, userAgent } = req.body;
    const ipHash = hashIp(ipAddress || 'unknown');

    if (ShareLink) {
      const link = await ShareLink.findOne({ shortCode });
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      link.clicks += 1;
      link.clicksHistory = link.clicksHistory || [];
      link.clicksHistory.push({
        timestamp: new Date(),
        ipHash,
        referrer,
        userAgent
      });

      await link.save();
      return res.json({ success: true, clicks: link.clicks });
    } else {
      const link = shareLinkMemoryDb.find(l => l.shortCode === shortCode);
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      link.clicks += 1;
      link.clicksHistory = link.clicksHistory || [];
      link.clicksHistory.push({
        timestamp: new Date(),
        ipHash,
        referrer,
        userAgent
      });

      return res.json({ success: true, clicks: link.clicks });
    }
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

// 4. Record a conversion (booking from referral link)
router.post('/convert/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    if (ShareLink) {
      const link = await ShareLink.findOne({ shortCode });
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      link.conversions += 1;
      await link.save();
      return res.json({ success: true, conversions: link.conversions });
    } else {
      const link = shareLinkMemoryDb.find(l => l.shortCode === shortCode);
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      link.conversions += 1;
      return res.json({ success: true, conversions: link.conversions });
    }
  } catch (error) {
    console.error('Error recording conversion:', error);
    res.status(500).json({ error: 'Failed to record conversion' });
  }
});

// 5. Get share link stats
router.get('/stats/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    if (ShareLink) {
      const link = await ShareLink.findOne({ shortCode });
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      const conversionRate = link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(2) : 0;
      return res.json({
        shortCode: link.shortCode,
        clicks: link.clicks,
        conversions: link.conversions,
        conversionRate: parseFloat(conversionRate),
        shareUrl: `${process.env.SHARE_DOMAIN || 'https://share.gym-meliora.com'}/${shortCode}`,
        discountCode: link.discountCode,
        discountPercent: link.discountPercent
      });
    } else {
      const link = shareLinkMemoryDb.find(l => l.shortCode === shortCode);
      if (!link) {
        return res.status(404).json({ error: 'Share link not found' });
      }

      const conversionRate = link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(2) : 0;
      return res.json({
        shortCode: link.shortCode,
        clicks: link.clicks,
        conversions: link.conversions,
        conversionRate: parseFloat(conversionRate),
        shareUrl: `${process.env.SHARE_DOMAIN || 'http://localhost:3000'}/?ref=${shortCode}`,
        discountCode: link.discountCode,
        discountPercent: link.discountPercent
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
