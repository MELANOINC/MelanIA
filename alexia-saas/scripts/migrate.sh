#!/bin/bash
# Alexia SaaS - Database Migration Script
# MELANO INC - Proprietary
# 
# Usage: ./migrate.sh [up|down|seed]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL not set"
    exit 1
fi

case "$1" in
    up)
        echo "🔄 Running migrations..."
        node -e "
            const { Pool } = require('pg');
            const pool = new Pool({ connectionString: process.env.DATABASE_URL });
            
            async function migrate() {
                const client = await pool.connect();
                try {
                    // Clientes table
                    await client.query(\`
                        CREATE TABLE IF NOT EXISTS clientes (
                            id SERIAL PRIMARY KEY,
                            nombre VARCHAR(255) NOT NULL,
                            email VARCHAR(255) UNIQUE NOT NULL,
                            api_key VARCHAR(64) UNIQUE NOT NULL,
                            whatsapp_numero VARCHAR(20),
                            activo BOOLEAN DEFAULT true,
                            configuracion JSONB DEFAULT '{}',
                            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    \`);
                    
                    // Conversaciones table
                    await client.query(\`
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
                    \`);
                    
                    await client.query(\`CREATE INDEX IF NOT EXISTS idx_conversaciones_cliente_id ON conversaciones(cliente_id)\`);
                    await client.query(\`CREATE INDEX IF NOT EXISTS idx_conversaciones_whatsapp_from ON conversaciones(whatsapp_from)\`);
                    
                    // Eventos table
                    await client.query(\`
                        CREATE TABLE IF NOT EXISTS eventos (
                            id SERIAL PRIMARY KEY,
                            cliente_id INTEGER REFERENCES clientes(id),
                            conversacion_id INTEGER REFERENCES conversaciones(id),
                            tipo VARCHAR(50) NOT NULL,
                            contenido TEXT,
                            metadata JSONB DEFAULT '{}',
                            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    \`);
                    
                    await client.query(\`CREATE INDEX IF NOT EXISTS idx_eventos_cliente_id ON eventos(cliente_id)\`);
                    await client.query(\`CREATE INDEX IF NOT EXISTS idx_eventos_conversacion_id ON eventos(conversacion_id)\`);
                    await client.query(\`CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha)\`);
                    
                    // Configuracion cliente table
                    await client.query(\`
                        CREATE TABLE IF NOT EXISTS configuracion_cliente (
                            id SERIAL PRIMARY KEY,
                            cliente_id INTEGER NOT NULL REFERENCES clientes(id) UNIQUE,
                            webhook_url VARCHAR(500),
                            respuesta_automatica TEXT,
                            horario_atencion JSONB DEFAULT '{\"inicio\": \"09:00\", \"fin\": \"18:00\", \"dias\": [1,2,3,4,5]}',
                            mensaje_fuera_horario TEXT,
                            idioma VARCHAR(10) DEFAULT 'es',
                            activo BOOLEAN DEFAULT true,
                            opciones JSONB DEFAULT '{}',
                            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    \`);
                    
                    console.log('✅ Migrations completed successfully');
                } finally {
                    client.release();
                    await pool.end();
                }
            }
            
            migrate().catch(e => { console.error('Migration failed:', e.message); process.exit(1); });
        "
        ;;
    
    down)
        echo "⚠️  Dropping all tables..."
        read -p "Are you sure? This will delete all data! (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            node -e "
                const { Pool } = require('pg');
                const pool = new Pool({ connectionString: process.env.DATABASE_URL });
                
                async function rollback() {
                    const client = await pool.connect();
                    try {
                        await client.query('DROP TABLE IF EXISTS configuracion_cliente CASCADE');
                        await client.query('DROP TABLE IF EXISTS eventos CASCADE');
                        await client.query('DROP TABLE IF EXISTS conversaciones CASCADE');
                        await client.query('DROP TABLE IF EXISTS clientes CASCADE');
                        console.log('✅ All tables dropped');
                    } finally {
                        client.release();
                        await pool.end();
                    }
                }
                
                rollback().catch(e => { console.error('Rollback failed:', e.message); process.exit(1); });
            "
        else
            echo "Cancelled"
        fi
        ;;
    
    seed)
        echo "🌱 Seeding database with sample data..."
        node -e "
            const { Pool } = require('pg');
            const { v4: uuidv4 } = require('uuid');
            const pool = new Pool({ connectionString: process.env.DATABASE_URL });
            
            async function seed() {
                const client = await pool.connect();
                try {
                    // Create demo client
                    const apiKey = 'alex_' + uuidv4().replace(/-/g, '');
                    await client.query(\`
                        INSERT INTO clientes (nombre, email, api_key, whatsapp_numero, configuracion)
                        VALUES ('Demo Client', 'demo@melano.inc', '\${apiKey}', '+5491234567890', '{\"plan\": \"starter\"}')
                        ON CONFLICT (email) DO NOTHING
                    \`);
                    
                    console.log('✅ Seed data inserted');
                    console.log('📝 Demo API Key:', apiKey);
                } finally {
                    client.release();
                    await pool.end();
                }
            }
            
            seed().catch(e => { console.error('Seed failed:', e.message); process.exit(1); });
        "
        ;;
    
    *)
        echo "Usage: $0 [up|down|seed]"
        echo "  up   - Create all tables"
        echo "  down - Drop all tables (destructive!)"
        echo "  seed - Insert sample data"
        exit 1
        ;;
esac
