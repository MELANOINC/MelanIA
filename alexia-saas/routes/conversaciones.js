/**
 * Conversations Routes
 * MELANO INC - Proprietary
 * 
 * API endpoints for conversation management
 */

const express = require('express');
const router = express.Router();
const Conversaciones = require('../models/conversaciones');
const Eventos = require('../models/eventos');
const { authenticateApiKey } = require('../middleware/auth');
const { logger } = require('../config/logger');

/**
 * GET /api/conversaciones
 * List conversations for the authenticated client
 */
router.get('/',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const offset = parseInt(req.query.offset) || 0;
      
      const conversations = await Conversaciones.findByClientId(clientId, limit, offset);
      
      res.json({
        success: true,
        data: conversations,
        pagination: { limit, offset }
      });
    } catch (error) {
      logger.error('Error listing conversations', { error: error.message });
      res.status(500).json({ error: 'Failed to list conversations' });
    }
  }
);

/**
 * GET /api/conversaciones/:id
 * Get a specific conversation with its messages
 */
router.get('/:id',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const conversationId = parseInt(req.params.id);
      
      const conversation = await Conversaciones.findById(conversationId);
      
      if (!conversation || conversation.cliente_id !== clientId) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      
      // Get messages for this conversation
      const messages = await Eventos.findByConversation(conversationId);
      
      res.json({
        success: true,
        data: {
          ...conversation,
          messages
        }
      });
    } catch (error) {
      logger.error('Error fetching conversation', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  }
);

/**
 * PUT /api/conversaciones/:id/metadata
 * Update conversation metadata
 */
router.put('/:id/metadata',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const conversationId = parseInt(req.params.id);
      const { metadata } = req.body;
      
      const conversation = await Conversaciones.findById(conversationId);
      
      if (!conversation || conversation.cliente_id !== clientId) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      
      if (!metadata || typeof metadata !== 'object') {
        return res.status(400).json({ error: 'Invalid metadata format' });
      }
      
      const updated = await Conversaciones.updateMetadata(conversationId, metadata);
      
      res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      logger.error('Error updating conversation metadata', { error: error.message });
      res.status(500).json({ error: 'Failed to update metadata' });
    }
  }
);

/**
 * POST /api/conversaciones/:id/cerrar
 * Close a conversation
 */
router.post('/:id/cerrar',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const conversationId = parseInt(req.params.id);
      
      const conversation = await Conversaciones.findById(conversationId);
      
      if (!conversation || conversation.cliente_id !== clientId) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      
      if (conversation.estado === 'cerrada') {
        return res.status(400).json({ error: 'Conversation is already closed' });
      }
      
      const closed = await Conversaciones.close(conversationId);
      
      // Record event
      await Eventos.create({
        cliente_id: clientId,
        conversacion_id: conversationId,
        tipo: Eventos.EVENT_TYPES.CONVERSATION_CLOSED,
        contenido: 'Conversation closed',
        metadata: {}
      });
      
      logger.info('Conversation closed', { clientId, conversationId });
      
      res.json({
        success: true,
        data: closed
      });
    } catch (error) {
      logger.error('Error closing conversation', { error: error.message });
      res.status(500).json({ error: 'Failed to close conversation' });
    }
  }
);

/**
 * GET /api/conversaciones/:id/eventos
 * Get all events for a conversation
 */
router.get('/:id/eventos',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const conversationId = parseInt(req.params.id);
      
      const conversation = await Conversaciones.findById(conversationId);
      
      if (!conversation || conversation.cliente_id !== clientId) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      
      const limit = Math.min(parseInt(req.query.limit) || 100, 500);
      const events = await Eventos.findByConversation(conversationId, limit);
      
      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      logger.error('Error fetching conversation events', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
);

module.exports = router;
