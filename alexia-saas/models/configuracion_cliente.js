/**
 * Client Configuration Model
 * MELANO INC - Proprietary
 * 
 * Extended configuration settings per client
 */

const db = require('../config/database');

/**
 * Initialize client configuration table
 */
const initTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS configuracion_cliente (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER NOT NULL REFERENCES clientes(id) UNIQUE,
      webhook_url VARCHAR(500),
      respuesta_automatica TEXT,
      horario_atencion JSONB DEFAULT '{"inicio": "09:00", "fin": "18:00", "dias": [1,2,3,4,5]}',
      mensaje_fuera_horario TEXT,
      idioma VARCHAR(10) DEFAULT 'es',
      activo BOOLEAN DEFAULT true,
      opciones JSONB DEFAULT '{}',
      fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

/**
 * Create or update client configuration
 * @param {number} clienteId - Client ID
 * @param {Object} config - Configuration data
 * @returns {Promise<Object>} Configuration record
 */
const upsert = async (clienteId, config) => {
  const {
    webhook_url,
    respuesta_automatica,
    horario_atencion,
    mensaje_fuera_horario,
    idioma,
    activo,
    opciones
  } = config;
  
  const result = await db.query(`
    INSERT INTO configuracion_cliente 
      (cliente_id, webhook_url, respuesta_automatica, horario_atencion, mensaje_fuera_horario, idioma, activo, opciones)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (cliente_id) 
    DO UPDATE SET
      webhook_url = COALESCE($2, configuracion_cliente.webhook_url),
      respuesta_automatica = COALESCE($3, configuracion_cliente.respuesta_automatica),
      horario_atencion = COALESCE($4, configuracion_cliente.horario_atencion),
      mensaje_fuera_horario = COALESCE($5, configuracion_cliente.mensaje_fuera_horario),
      idioma = COALESCE($6, configuracion_cliente.idioma),
      activo = COALESCE($7, configuracion_cliente.activo),
      opciones = COALESCE($8, configuracion_cliente.opciones),
      fecha_actualizacion = CURRENT_TIMESTAMP
    RETURNING *
  `, [
    clienteId,
    webhook_url,
    respuesta_automatica,
    horario_atencion ? JSON.stringify(horario_atencion) : null,
    mensaje_fuera_horario,
    idioma,
    activo,
    opciones ? JSON.stringify(opciones) : null
  ]);
  
  return result.rows[0];
};

/**
 * Get configuration for a client
 * @param {number} clienteId - Client ID
 * @returns {Promise<Object|null>} Configuration or null
 */
const findByClientId = async (clienteId) => {
  const result = await db.query(
    `SELECT * FROM configuracion_cliente WHERE cliente_id = $1`,
    [clienteId]
  );
  return result.rows[0] || null;
};

/**
 * Check if current time is within business hours
 * @param {Object} horario - Business hours configuration
 * @returns {boolean} True if within hours
 */
const isWithinBusinessHours = (horario) => {
  if (!horario) return true;
  
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const { inicio, fin, dias } = horario;
  
  if (!dias.includes(currentDay)) return false;
  if (currentTime < inicio || currentTime > fin) return false;
  
  return true;
};

module.exports = {
  initTable,
  upsert,
  findByClientId,
  isWithinBusinessHours,
};
