'use client';

import { useState, useEffect } from 'react';
import styles from './ReferralDashboard.module.css';

export default function ReferralDashboard({ clientId = 'demo_client', clientName = 'Client' }) {
  const [shareLinks, setShareLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [stats, setStats] = useState({});
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Fetch existing share links
  useEffect(() => {
    fetchShareLinks();
  }, [clientId]);

  const fetchShareLinks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/share-links/client/${clientId}`);
      if (res.ok) {
        const links = await res.json();
        setShareLinks(links);
        // Fetch stats for each link
        links.forEach(link => fetchStats(link.shortCode));
      }
    } catch (error) {
      console.error('Error fetching share links:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (shortCode) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/share-links/stats/${shortCode}`);
      if (res.ok) {
        const data = await res.json();
        setStats(prev => ({ ...prev, [shortCode]: data }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const generateNewLink = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/share-links/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          clientName,
          clientEmail: `${clientId}@gym-meliora.com`,
          type: 'referral',
          discountPercent: 10
        })
      });

      if (res.ok) {
        const newLink = await res.json();
        setShareLinks([newLink.shareLink, ...shareLinks]);
        fetchStats(newLink.shareLink.shortCode);
      }
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, shortCode) => {
    navigator.clipboard.writeText(text);
    setCopied(shortCode);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareUrl = (link) => {
    const baseUrl = process.env.NEXT_PUBLIC_SHARE_DOMAIN || 'http://localhost:3000';
    return `${baseUrl}/share/${link.shortCode}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Your Referral Links</h2>
        <p className={styles.subtitle}>Share your unique links and earn rewards</p>
      </div>

      <button
        className={styles.generateBtn}
        onClick={generateNewLink}
        disabled={loading}
      >
        {loading ? 'Creating...' : '+ Generate New Link'}
      </button>

      <div className={styles.linksGrid}>
        {shareLinks.length === 0 ? (
          <div className={styles.empty}>
            <p>No referral links yet. Create one to get started!</p>
          </div>
        ) : (
          shareLinks.map(link => {
            const linkStats = stats[link.shortCode] || {};
            return (
              <div key={link.shortCode} className={styles.linkCard}>
                <div className={styles.cardHeader}>
                  <h3>Link #{shareLinks.indexOf(link) + 1}</h3>
                  <span className={styles.discount}>{link.discountPercent}% off</span>
                </div>

                {/* Share URL */}
                <div className={styles.urlSection}>
                  <label>Share this link:</label>
                  <div className={styles.urlInput}>
                    <input
                      type="text"
                      value={shareUrl(link)}
                      readOnly
                      onClick={(e) => e.target.select()}
                    />
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyToClipboard(shareUrl(link), link.shortCode)}
                      title="Copy to clipboard"
                    >
                      {copied === link.shortCode ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Discount Code */}
                <div className={styles.codeSection}>
                  <label>Discount Code:</label>
                  <div className={styles.codeInput}>
                    <input
                      type="text"
                      value={link.discountCode}
                      readOnly
                    />
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyToClipboard(link.discountCode, `code-${link.shortCode}`)}
                    >
                      {copied === `code-${link.shortCode}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>{linkStats.clicks || 0}</div>
                    <div className={styles.statLabel}>Clicks</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>{linkStats.conversions || 0}</div>
                    <div className={styles.statLabel}>Conversions</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>{linkStats.conversionRate || 0}%</div>
                    <div className={styles.statLabel}>Conversion Rate</div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className={styles.socialShare}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join me at Gym Meliora! Get ${link.discountPercent}% off with my link: ${shareUrl(link)}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    title="Share on X"
                  >
                    𝕏
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Join me at Gym Meliora! Get ${link.discountPercent}% off with my link: ${shareUrl(link)}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    title="Share on WhatsApp"
                  >
                    💬
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent('Join Gym Meliora')}&body=${encodeURIComponent(`Check out Gym Meliora! Get ${link.discountPercent}% off: ${shareUrl(link)}`)}`}
                    className={styles.socialBtn}
                    title="Share via Email"
                  >
                    ✉️
                  </a>
                </div>

                <div className={styles.meta}>
                  Created {new Date(link.createdAt).toLocaleDateString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
