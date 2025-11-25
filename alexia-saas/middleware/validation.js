/**
 * Request Validation Middleware
 * MELANO INC - Proprietary
 */

const { logger } = require('../config/logger');

/**
 * Validates required fields in request body
 * @param {Array<string>} requiredFields - List of required field names
 * @returns {Function} Express middleware function
 */
const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => {
      const value = req.body[field];
      return value === undefined || value === null || value === '';
    });
    
    if (missingFields.length > 0) {
      logger.warn('Validation failed: missing fields', { 
        path: req.path, 
        missingFields 
      });
      return res.status(400).json({
        error: 'Validation error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    next();
  };
};

/**
 * Validates WhatsApp payload structure
 * Supports both Twilio and Meta Cloud API formats
 */
const validateWhatsAppPayload = (req, res, next) => {
  const body = req.body;
  
  // Twilio format validation
  if (body.From && body.Body) {
    req.whatsappData = {
      provider: 'twilio',
      from: body.From,
      to: body.To,
      body: body.Body,
      messageSid: body.MessageSid,
      accountSid: body.AccountSid
    };
    return next();
  }
  
  // Meta Cloud API format validation
  if (body.object === 'whatsapp_business_account' && body.entry) {
    try {
      const entry = body.entry[0];
      const change = entry.changes[0];
      const value = change.value;
      const message = value.messages?.[0];
      
      if (message) {
        req.whatsappData = {
          provider: 'meta',
          from: message.from,
          to: value.metadata?.display_phone_number,
          body: message.text?.body || '',
          messageId: message.id,
          timestamp: message.timestamp
        };
        return next();
      }
    } catch (error) {
      logger.warn('Failed to parse Meta WhatsApp payload', { error: error.message });
    }
  }
  
  logger.warn('Invalid WhatsApp payload format', { 
    path: req.path,
    hasFrom: !!body.From,
    hasEntry: !!body.entry
  });
  
  return res.status(400).json({
    error: 'Invalid payload',
    message: 'Unrecognized WhatsApp message format'
  });
};

/**
 * Sanitizes string inputs to prevent injection
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 10000);
};

module.exports = {
  validateBody,
  validateWhatsAppPayload,
  sanitizeInput
};
