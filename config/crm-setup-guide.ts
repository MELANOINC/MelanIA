export const CRM_SETUP_GUIDE = `
# 🔗 GUÍA COMPLETA DE INTEGRACIÓN CRM
## Conectar ALEXIA con Zapier, HubSpot, Pipedrive y más

## 🚀 CONFIGURACIÓN RÁPIDA (5 MINUTOS)

### 📋 VARIABLES DE ENTORNO REQUERIDAS
\`\`\`env
# Zapier (Más fácil - Recomendado para empezar)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/

# HubSpot (Potente para marketing automation)
HUBSPOT_API_KEY=pat-na1-your-private-app-token

# Pipedrive (Excelente para ventas)
PIPEDRIVE_API_TOKEN=your-api-token
PIPEDRIVE_COMPANY_DOMAIN=your-company

# Salesforce (Enterprise)
SALESFORCE_CLIENT_ID=your-client-id
SALESFORCE_CLIENT_SECRET=your-client-secret
SALESFORCE_USERNAME=your-username
SALESFORCE_PASSWORD=your-password

# Kommo/amoCRM
KOMMO_CLIENT_ID=your-client-id
KOMMO_CLIENT_SECRET=your-client-secret
KOMMO_SUBDOMAIN=your-subdomain
\`\`\`

## 🔧 SETUP ZAPIER (RECOMENDADO PARA EMPEZAR)

### Paso 1: Crear Zap
1. Ir a zapier.com → Create Zap
2. Trigger: "Webhooks by Zapier" → "Catch Hook"
3. Copiar la URL del webhook
4. Agregar a .env como ZAPIER_WEBHOOK_URL

### Paso 2: Configurar Acciones
**Zaps recomendados:**

#### 🔥 Lead Caliente → Slack
- **Trigger**: Webhook ALEXIA
- **Filter**: puntaje_lead >= 70
- **Action**: Send message to #ventas
- **Message**: 
\`\`\`
🔥 LEAD CALIENTE: {{nombre}}
📞 {{telefono}}
🛡️ {{tipo_seguro}}
⚡ Urgencia: {{urgencia}}/10
💰 Presupuesto: {{presupuesto}}
🎯 Score: {{puntaje_lead}}/100
\`\`\`

#### 📊 Lead → Google Sheets
- **Trigger**: Webhook ALEXIA
- **Action**: Create Spreadsheet Row
- **Columns**: nombre, telefono, email, tipo_seguro, urgencia, presupuesto, puntaje_lead, fecha_captura

#### 📧 Lead → Email al Vendedor
- **Trigger**: Webhook ALEXIA
- **Filter**: urgencia >= 8
- **Action**: Send Email
- **To**: vendedor@empresa.com
- **Subject**: 🚨 Lead Urgente: {{nombre}} - {{tipo_seguro}}

#### 📱 Lead Premium → WhatsApp Manager
- **Trigger**: Webhook ALEXIA
- **Filter**: tipo_seguro = "comercial" AND presupuesto = "alto"
- **Action**: Send WhatsApp (via API)

## 🔧 SETUP HUBSPOT

### Paso 1: Crear Private App
1. HubSpot → Settings → Integrations → Private Apps
2. Create private app → "ALEXIA Integration"
3. Scopes necesarios:
   - crm.objects.contacts.write
   - crm.objects.deals.write
   - crm.objects.companies.write
   - crm.objects.notes.write
   - crm.objects.tasks.write

### Paso 2: Crear Campos Personalizados
**En Contacts:**
- tipo_seguro_interes (Single-line text)
- urgencia_seguro (Number)
- presupuesto_mensual (Single-line text)
- tiene_seguro_actual (Single checkbox)
- puntaje_lead_alexia (Number)
- fuente_lead (Single-line text)
- auto_marca_modelo (Single-line text)
- auto_año (Number)
- propiedad_tipo (Dropdown)

**En Deals:**
- tipo_seguro (Dropdown: Auto, Hogar, Salud, Vida, Comercial)
- urgencia_cliente (Number)
- puntaje_lead (Number)
- fuente_lead (Single-line text)

### Paso 3: Configurar Pipeline
**Stages recomendados:**
1. Lead Nuevo (Appointment scheduled)
2. Contactado (Qualified to buy)
3. Cotización Enviada (Presentation scheduled)
4. Negociación (Decision maker bought-in)
5. Cerrado Ganado (Closed won)
6. Cerrado Perdido (Closed lost)

## 🔧 SETUP PIPEDRIVE

### Paso 1: Obtener API Token
1. Pipedrive → Settings → Personal → API
2. Copy API token
3. Agregar a .env como PIPEDRIVE_API_TOKEN

### Paso 2: Crear Campos Personalizados
**En Persons:**
- Tipo de Seguro (Dropdown)
- Urgencia (Number)
- Presupuesto (Dropdown)
- Tiene Seguro Actual (Yes/No)
- Score Lead (Number)
- Fuente Lead (Text)
- Auto Marca (Text)
- Auto Modelo (Text)
- Auto Año (Number)
- Propiedad Tipo (Dropdown)

**En Deals:**
- Tipo Seguro (Dropdown)
- Urgencia (Number)
- Score (Number)
- Fuente (Text)

### Paso 3: Configurar Pipeline
**Stages:**
1. Lead Nuevo
2. Calificado
3. Contacto Realizado
4. Propuesta Enviada
5. Negociación
6. Ganado
7. Perdido

## 🔧 AUTOMATIZACIONES RECOMENDADAS

### 📊 Scoring Automático
\`\`\`javascript
// Lógica de scoring implementada
Urgencia (40%): urgencia/10 * 40
Completitud (30%): datos completos
Presupuesto (20%): presupuesto definido
Información específica (10%): detalles auto/hogar
\`\`\`

### 🎯 Asignación Automática
\`\`\`javascript
// Reglas de asignación
Score >= 80: Vendedor Senior
Score 60-79: Vendedor Intermedio  
Score 40-59: Vendedor Junior
Score < 40: Marketing nurturing
\`\`\`

### ⏰ Seguimiento Automático
\`\`\`javascript
// Tiempos de seguimiento
Urgencia >= 8: 5 minutos
Urgencia 6-7: 2 horas
Urgencia 4-5: 24 horas
Urgencia < 4: 72 horas
\`\`\`

## 📊 MÉTRICAS A TRACKEAR

### 🎯 KPIs Principales
- **Leads capturados/día**: Meta 50+
- **Tasa de conversión**: Meta 25%+
- **Tiempo de respuesta**: Meta < 30 min
- **Score promedio**: Meta 60+
- **Costo por lead**: Meta < $500

### 📈 Reportes Automáticos
**Dashboard semanal:**
- Total leads capturados
- Distribución por tipo de seguro
- Score promedio por fuente
- Conversión por vendedor
- Tiempo promedio de cierre

## 🚨 TROUBLESHOOTING

### ❌ Webhook no funciona
1. Verificar URL en .env
2. Testear con curl:
\`\`\`bash
curl -X POST "TU_WEBHOOK_URL" \\
  -H "Content-Type: application/json" \\
  -d '{"test": "data"}'
\`\`\`

### ❌ HubSpot no crea contactos
1. Verificar scopes del Private App
2. Revisar campos personalizados
3. Checkear API limits

### ❌ Pipedrive error 401
1. Verificar API token
2. Checkear dominio de empresa
3. Revisar permisos de usuario

## 💰 COSTOS ESTIMADOS

### Zapier
- Plan Starter: $19.99/mes (750 tasks)
- Plan Professional: $49/mes (2000 tasks)

### HubSpot
- Free: 1M contacts
- Starter: $45/mes
- Professional: $800/mes

### Pipedrive
- Essential: $14.90/mes/user
- Advanced: $24.90/mes/user
- Professional: $49.90/mes/user

## 🎯 RECOMENDACIÓN DE SETUP

### 🥇 Para Empezar (Budget bajo)
1. **Zapier** + Google Sheets + Slack
2. Costo: ~$20/mes
3. Setup: 30 minutos

### 🥈 Para Crecer (Budget medio)
1. **Pipedrive** + Zapier
2. Costo: ~$65/mes
3. Setup: 2 horas

### 🥇 Para Escalar (Budget alto)
1. **HubSpot** + Zapier + Pipedrive
2. Costo: ~$150/mes
3. Setup: 1 día

¿Con cuál querés empezar? 🚀
`
