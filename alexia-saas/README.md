# Alexia SaaS Backend

Backend multi-cliente (SaaS) para el bot de WhatsApp Alexia de MELANO INC.

> ⚠️ **CÓDIGO PROPIETARIO**: Este repositorio es privado y propiedad de MELANO INC. No publicar ni compartir.

## Arquitectura

```
alexia-saas/
├── config/           # Configuración (DB, logger)
├── middleware/       # Autenticación, validación
├── models/           # Modelos de datos (ORM)
├── routes/           # Endpoints API
├── src/              # Punto de entrada principal
├── Dockerfile        # Contenedor Docker
└── docker-compose.yml # Orquestación multi-servicio
```

## Tecnologías

- **Backend**: Node.js (Express)
- **Base de datos**: PostgreSQL / Supabase
- **Contenedores**: Docker / Docker Compose
- **Integraciones**: WhatsApp (Twilio / Meta Cloud API)

## Instalación Rápida

### Con Docker (Recomendado)

```bash
# Clonar y configurar
cd alexia-saas
cp .env.example .env
# Editar .env con tus valores

# Iniciar servicios
docker-compose up -d
```

### Sin Docker (Desarrollo)

```bash
cd alexia-saas
npm install
cp .env.example .env
# Configurar DATABASE_URL a PostgreSQL local
npm run dev
```

## Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URL` | URL de conexión PostgreSQL | Sí |
| `API_KEY_SECRET` | Clave para autenticación admin | Sí |
| `PORT` | Puerto del servidor (default: 3001) | No |
| `WHATSAPP_PROVIDER` | `twilio` o `meta` | No |
| `TWILIO_ACCOUNT_SID` | SID de cuenta Twilio | Condicional |
| `TWILIO_AUTH_TOKEN` | Token de Twilio | Condicional |
| `META_WHATSAPP_TOKEN` | Token de Meta Cloud API | Condicional |
| `META_VERIFY_TOKEN` | Token de verificación webhook | Condicional |

## Endpoints API

### Gestión de Clientes (Admin)

```bash
# Crear cliente
POST /api/clientes
Headers: X-Admin-Key: <API_KEY_SECRET>
Body: { "nombre": "Empresa ABC", "email": "admin@empresa.com" }

# Listar clientes
GET /api/clientes
Headers: X-Admin-Key: <API_KEY_SECRET>

# Actualizar cliente
PUT /api/clientes/:id
Headers: X-Admin-Key: <API_KEY_SECRET>

# Regenerar API key
POST /api/clientes/:id/regenerar-api-key
Headers: X-Admin-Key: <API_KEY_SECRET>
```

### Webhooks de WhatsApp

```bash
# Recibir mensaje (Twilio o Meta)
POST /api/webhook/whatsapp
Headers: X-API-Key: <client_api_key>
Body: { ... payload de Twilio/Meta ... }

# Registrar mensaje saliente
POST /api/webhook/whatsapp/outbound
Headers: X-API-Key: <client_api_key>
Body: { "conversacion_id": 123, "contenido": "Hola!" }
```

### Conversaciones

```bash
# Listar conversaciones
GET /api/conversaciones
Headers: X-API-Key: <client_api_key>

# Ver conversación con mensajes
GET /api/conversaciones/:id
Headers: X-API-Key: <client_api_key>

# Cerrar conversación
POST /api/conversaciones/:id/cerrar
Headers: X-API-Key: <client_api_key>
```

### Estadísticas

```bash
# Obtener estadísticas
GET /api/estadisticas?desde=2024-01-01&hasta=2024-12-31
Headers: X-API-Key: <client_api_key>

# Mensajes por día
GET /api/estadisticas/mensajes-por-dia?days=30
Headers: X-API-Key: <client_api_key>
```

## Modelos de Datos

### clientes
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único |
| nombre | VARCHAR | Nombre del cliente |
| email | VARCHAR | Email único |
| api_key | VARCHAR | Clave API del cliente |
| whatsapp_numero | VARCHAR | Número WhatsApp asociado |
| activo | BOOLEAN | Estado del cliente |
| configuracion | JSONB | Configuración personalizada |

### conversaciones
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único |
| cliente_id | INTEGER | FK a clientes |
| whatsapp_from | VARCHAR | Número del contacto |
| estado | VARCHAR | activa/cerrada |
| metadata | JSONB | Datos adicionales |

### eventos
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único |
| cliente_id | INTEGER | FK a clientes |
| conversacion_id | INTEGER | FK a conversaciones |
| tipo | VARCHAR | Tipo de evento |
| contenido | TEXT | Contenido del mensaje |
| metadata | JSONB | Datos adicionales |

### configuracion_cliente
| Campo | Tipo | Descripción |
|-------|------|-------------|
| cliente_id | INTEGER | FK a clientes |
| webhook_url | VARCHAR | URL para callbacks |
| respuesta_automatica | TEXT | Mensaje automático |
| horario_atencion | JSONB | Horarios de atención |

## Seguridad

- ✅ Autenticación por API Key
- ✅ Rate limiting configurable
- ✅ Helmet para headers seguros
- ✅ Validación de payloads
- ✅ Sanitización de inputs
- ✅ No se loguean secrets
- ✅ Ejecución como usuario no-root en Docker

## Despliegue en VPS

```bash
# 1. Clonar el repo en el VPS
git clone <repo> && cd alexia-saas

# 2. Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con valores de producción

# 3. Construir y levantar
docker-compose up -d --build

# 4. Verificar estado
docker-compose ps
curl http://localhost:3001/health
```

## Mantenimiento

```bash
# Ver logs
docker-compose logs -f alexia-backend

# Reiniciar servicios
docker-compose restart

# Backup de base de datos
docker-compose exec postgres pg_dump -U alexia alexia_saas > backup.sql

# Restaurar backup
cat backup.sql | docker-compose exec -T postgres psql -U alexia alexia_saas
```

---

**MELANO INC** - Código Propietario © 2025
