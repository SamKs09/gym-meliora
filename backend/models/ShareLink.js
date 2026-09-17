const mongoose = require('mongoose');

const shareLinkSchema = new mongoose.Schema({
  // Identifier for the short link
  shortCode: {
    type: String,
    unique: true,
    required: true,
    index: true
  },

  // Client information
  clientId: {
    type: String,
    required: true,
    index: true
  },
  clientName: String,
  clientEmail: String,

  // Link details
  fullUrl: {
    type: String,
    required: true
  },

  // Link type (referral, invite, etc)
  type: {
    type: String,
    enum: ['referral', 'invite', 'membership'],
    default: 'referral'
  },

  // Metadata
  membershipTier: String,
  discountCode: String,
  discountPercent: {
    type: Number,
    default: 0
  },

  // Tracking
  clicks: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  },
  clicksHistory: [{
    timestamp: Date,
    ipHash: String,
    referrer: String,
    userAgent: String
  }],

  // Link status
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: Date,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: Date
});

// Auto-update updatedAt
shareLinkSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ShareLink', shareLinkSchema);
