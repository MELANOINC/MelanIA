/**
 * Conversations Model
 * MELANO INC - Proprietary
 * 
 * Tracks WhatsApp conversations linked to clients
 */

const db = require('../config/database');

/**
 * Initialize conversations table
 */
const initTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS conversaciones (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER NOT NULL REFERENCES clientes(id),
      whatsapp_from VARCHAR(30) NOT NULL,
      whatsapp_to VARCHAR(30),
      estado VARCHAR(20) DEFAULT 'activa',
      metadata JSONB DEFAULT '{}',
      fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      fecha_ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_conversaciones_cliente_id ON conversaciones(cliente_id)
  `);
  
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_conversaciones_whatsapp_from ON conversaciones(whatsapp_from)
  `);
};

/**
 * Create a new conversation
 * @param {Object} data - Conversation data
 * @returns {Promise<Object>} Created conversation
 */
const create = async ({ cliente_id, whatsapp_from, whatsapp_to, metadata = {} }) => {
  const result = await db.query(
    `INSERT INTO conversaciones (cliente_id, whatsapp_from, whatsapp_to, metadata)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [cliente_id, whatsapp_from, whatsapp_to, JSON.stringify(metadata)]
  );
  return result.rows[0];
};

/**
 * Find active conversation for a WhatsApp number and client
 * @param {number} clienteId - Client ID
 * @param {string} whatsappFrom - Sender's WhatsApp number
 * @returns {Promise<Object|null>} Conversation or null
 */
const findActiveByContact = async (clienteId, whatsappFrom) => {
  const result = await db.query(
    `SELECT * FROM conversaciones 
     WHERE cliente_id = $1 AND whatsapp_from = $2 AND estado = 'activa'
     ORDER BY fecha_ultima_actividad DESC
     LIMIT 1`,
    [clienteId, whatsappFrom]
  );
  return result.rows[0] || null;
};

/**
 * Find or create a conversation
 * @param {Object} data - Conversation data
 * @returns {Promise<Object>} Existing or new conversation
 */
const findOrCreate = async ({ cliente_id, whatsapp_from, whatsapp_to, metadata = {} }) => {
  let conversation = await findActiveByContact(cliente_id, whatsapp_from);
  
  if (!conversation) {
    conversation = await create({ cliente_id, whatsapp_from, whatsapp_to, metadata });
  }
  
  return conversation;
};

/**
 * Find a conversation by ID
 * @param {number} id - Conversation ID
 * @returns {Promise<Object|null>} Conversation or null
 */
const findById = async (id) => {
  const result = await db.query(
    `SELECT * FROM conversaciones WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

/**
 * List conversations for a client
 * @param {number} clienteId - Client ID
 * @param {number} limit - Results limit
 * @param {number} offset - Pagination offset
 * @returns {Promise<Array>} List of conversations
 */
const findByClientId = async (clienteId, limit = 50, offset = 0) => {
  const result = await db.query(
    `SELECT * FROM conversaciones 
     WHERE cliente_id = $1
     ORDER BY fecha_ultima_actividad DESC
     LIMIT $2 OFFSET $3`,
    [clienteId, limit, offset]
  );
  return result.rows;
};

/**
 * Update conversation last activity
 * @param {number} id - Conversation ID
 * @returns {Promise<Object|null>} Updated conversation
 */
const updateActivity = async (id) => {
  const result = await db.query(
    `UPDATE conversaciones SET fecha_ultima_actividad = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0] || null;
};

/**
 * Update conversation metadata
 * @param {number} id - Conversation ID
 * @param {Object} metadata - New metadata to merge
 * @returns {Promise<Object|null>} Updated conversation
 */
const updateMetadata = async (id, metadata) => {
  const result = await db.query(
    `UPDATE conversaciones 
     SET metadata = metadata || $1, fecha_ultima_actividad = CURRENT_TIMESTAMP
     WHERE id = $2 RETURNING *`,
    [JSON.stringify(metadata), id]
  );
  return result.rows[0] || null;
};

/**
 * Close a conversation
 * @param {number} id - Conversation ID
 * @returns {Promise<Object|null>} Closed conversation
 */
const close = async (id) => {
  const result = await db.query(
    `UPDATE conversaciones 
     SET estado = 'cerrada', fecha_ultima_actividad = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0] || null;
};

module.exports = {
  initTable,
  create,
  findActiveByContact,
  findOrCreate,
  findById,
  findByClientId,
  updateActivity,
  updateMetadata,
  close,
};
