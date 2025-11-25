/**
 * WhatsApp Webhook Routes
 * MELANO INC - Proprietary
 * 
 * Handles incoming WhatsApp messages from Twilio or Meta Cloud API
 */

const express = require('express');
const router = express.Router();
const Conversaciones = require('../models/conversaciones');
const Eventos = require('../models/eventos');
const Clientes = require('../models/clientes');
const ConfiguracionCliente = require('../models/configuracion_cliente');
const { authenticateApiKey } = require('../middleware/auth');
const { validateWhatsAppPayload, sanitizeInput } = require('../middleware/validation');
const { logger, sanitize } = require('../config/logger');

/**
 * GET /api/webhook/whatsapp
 * Verification endpoint for Meta Cloud API
 */
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  const verifyToken = process.env.META_VERIFY_TOKEN;
  
  if (mode === 'subscribe' && token === verifyToken) {
    logger.info('WhatsApp webhook verified');
    return res.status(200).send(challenge);
  }
  
  logger.warn('WhatsApp webhook verification failed');
  return res.sendStatus(403);
});

/**
 * POST /api/webhook/whatsapp
 * Receive WhatsApp messages and associate with client
 * Requires API key authentication
 */
router.post('/whatsapp',
  authenticateApiKey,
  validateWhatsAppPayload,
  async (req, res) => {
    const clientId = req.client.id;
    const whatsappData = req.whatsappData;
    
    try {
      logger.info('WhatsApp message received', {
        clientId,
        from: whatsappData.from,
        provider: whatsappData.provider
      });
      
      // Find or create conversation
      const conversation = await Conversaciones.findOrCreate({
        cliente_id: clientId,
        whatsapp_from: whatsappData.from,
        whatsapp_to: whatsappData.to,
        metadata: {
          provider: whatsappData.provider
        }
      });
      
      // Record message event
      await Eventos.create({
        cliente_id: clientId,
        conversacion_id: conversation.id,
        tipo: Eventos.EVENT_TYPES.MESSAGE_RECEIVED,
        contenido: sanitizeInput(whatsappData.body),
        metadata: {
          provider: whatsappData.provider,
          messageId: whatsappData.messageSid || whatsappData.messageId,
          timestamp: whatsappData.timestamp
        }
      });
      
      // Update conversation activity
      await Conversaciones.updateActivity(conversation.id);
      
      // Check business hours and get configuration
      const config = await ConfiguracionCliente.findByClientId(clientId);
      let response = null;
      
      if (config) {
        if (!ConfiguracionCliente.isWithinBusinessHours(config.horario_atencion)) {
          response = config.mensaje_fuera_horario;
        } else if (config.respuesta_automatica) {
          response = config.respuesta_automatica;
        }
      }
      
      // Respond to WhatsApp
      res.status(200).json({
        success: true,
        data: {
          conversationId: conversation.id,
          response: response,
          isNew: conversation.fecha_inicio === conversation.fecha_ultima_actividad
        }
      });
      
    } catch (error) {
      logger.error('Error processing WhatsApp message', {
        clientId,
        error: error.message
      });
      
      // Log error event
      await Eventos.create({
        cliente_id: clientId,
        tipo: Eventos.EVENT_TYPES.ERROR,
        contenido: 'Failed to process WhatsApp message',
        metadata: { error: error.message }
      }).catch(() => {});
      
      res.status(500).json({
        error: 'Failed to process message'
      });
    }
  }
);

/**
 * POST /api/webhook/whatsapp/outbound
 * Register outbound messages sent to WhatsApp
 * Requires API key authentication
 */
router.post('/whatsapp/outbound',
  authenticateApiKey,
  async (req, res) => {
    const clientId = req.client.id;
    const { conversacion_id, contenido, whatsapp_to, metadata = {} } = req.body;
    
    try {
      if (!conversacion_id && !whatsapp_to) {
        return res.status(400).json({
          error: 'Either conversacion_id or whatsapp_to is required'
        });
      }
      
      let conversation;
      
      if (conversacion_id) {
        conversation = await Conversaciones.findById(conversacion_id);
        if (!conversation || conversation.cliente_id !== clientId) {
          return res.status(404).json({ error: 'Conversation not found' });
        }
      } else {
        // Find active conversation by whatsapp number
        conversation = await Conversaciones.findActiveByContact(clientId, whatsapp_to);
        if (!conversation) {
          return res.status(404).json({ error: 'No active conversation found for this number' });
        }
      }
      
      // Record outbound message event
      const event = await Eventos.create({
        cliente_id: clientId,
        conversacion_id: conversation.id,
        tipo: Eventos.EVENT_TYPES.MESSAGE_SENT,
        contenido: sanitizeInput(contenido),
        metadata
      });
      
      await Conversaciones.updateActivity(conversation.id);
      
      logger.info('Outbound message recorded', {
        clientId,
        conversationId: conversation.id
      });
      
      res.json({
        success: true,
        data: {
          eventId: event.id,
          conversationId: conversation.id
        }
      });
      
    } catch (error) {
      logger.error('Error recording outbound message', {
        clientId,
        error: error.message
      });
      res.status(500).json({ error: 'Failed to record message' });
    }
  }
);

module.exports = router;
