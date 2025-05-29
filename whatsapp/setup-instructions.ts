export const SETUP_INSTRUCTIONS = `
# 🚀 CONFIGURACIÓN WHATSAPP BUSINESS API - PASO A PASO

## 📋 REQUISITOS PREVIOS
1. ✅ Cuenta de Facebook Business verificada
2. ✅ Número de teléfono dedicado para el negocio
3. ✅ Dominio web verificado
4. ✅ Tarjeta de crédito para facturación

## 🔧 PASO 1: CREAR APP EN META DEVELOPERS

### 1.1 Ir a Meta for Developers
- Visitar: https://developers.facebook.com/
- Iniciar sesión con cuenta de Facebook Business
- Crear nueva app → Tipo: "Business"

### 1.2 Configurar WhatsApp Business API
- Agregar producto "WhatsApp Business API"
- Seleccionar cuenta de negocio
- Configurar número de teléfono

### 1.3 Obtener credenciales
\`\`\`
App ID: [COPIAR DE LA CONSOLA]
Phone Number ID: [COPIAR DE WHATSAPP > GETTING STARTED]
Access Token: [GENERAR TOKEN PERMANENTE]
Business Account ID: [COPIAR DE BUSINESS SETTINGS]
\`\`\`

## 🔧 PASO 2: CONFIGURAR WEBHOOK

### 2.1 URL del Webhook
\`\`\`
https://tu-dominio.com/api/whatsapp/webhook
\`\`\`

### 2.2 Verify Token
\`\`\`
tu_token_secreto_123
\`\`\`

### 2.3 Suscribirse a eventos
- ✅ messages
- ✅ message_deliveries  
- ✅ message_reads
- ✅ message_reactions

## 🔧 PASO 3: CONFIGURAR TEMPLATES

### 3.1 Crear templates en Meta Business Manager
1. Ir a WhatsApp Manager
2. Message Templates → Create Template
3. Copiar los templates del archivo \`message-templates.ts\`
4. Enviar para aprobación (24-48hs)

### 3.2 Templates requeridos:
- ✅ welcome_insurance (MARKETING)
- ✅ quote_ready (UTILITY)  
- ✅ follow_up_insurance (MARKETING)
- ✅ urgent_activation (UTILITY)
- ✅ special_promotion (MARKETING)

## 🔧 PASO 4: CONFIGURAR PERFIL DE NEGOCIO

### 4.1 Información básica
\`\`\`json
{
  "about": "🛡️ SEGUROS INTELIGENTES - Cotizá tu seguro ideal en 2 minutos",
  "address": "Buenos Aires, Argentina", 
  "description": "Comparamos 15+ aseguradoras para conseguirte el mejor precio",
  "email": "alexia@segurosinteligentes.com",
  "websites": ["https://segurosinteligentes.com"],
  "vertical": "PROF_SERVICES"
}
\`\`\`

### 4.2 Foto de perfil
- Subir logo de la empresa (640x640px)
- Formato: JPG o PNG
- Tamaño máximo: 5MB

## 🔧 PASO 5: IMPLEMENTAR CÓDIGO

### 5.1 Variables de entorno (.env.local)
\`\`\`env
WHATSAPP_ACCESS_TOKEN=tu_access_token
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=tu_verify_token
WHATSAPP_BUSINESS_ACCOUNT_ID=tu_business_account_id
\`\`\`

### 5.2 Desplegar webhook
\`\`\`bash
# Subir a Vercel/Netlify
vercel --prod

# Configurar URL en Meta Developers
# Verificar webhook funcionando
\`\`\`

## 🔧 PASO 6: TESTING

### 6.1 Enviar mensaje de prueba
\`\`\`bash
curl -X POST "https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages" \\
  -H "Authorization: Bearer ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messaging_product": "whatsapp",
    "to": "TU_NUMERO_DE_PRUEBA",
    "type": "text",
    "text": {"body": "¡Hola! Soy ALEXIA, tu asesora de seguros 🛡️"}
  }'
\`\`\`

### 6.2 Probar flujos interactivos
1. ✅ Menú principal con botones
2. ✅ Lista de tipos de seguro
3. ✅ Cotización rápida
4. ✅ Captura de datos
5. ✅ Templates de seguimiento

## 🔧 PASO 7: MONITOREO Y ANALYTICS

### 7.1 Configurar métricas
- Mensajes enviados/recibidos
- Tasa de respuesta
- Conversiones por canal
- Tiempo de respuesta promedio

### 7.2 Dashboard recomendado
- WhatsApp Business API Analytics
- Google Analytics con eventos personalizados
- CRM integrado con webhooks

## 💰 COSTOS ESTIMADOS

### Mensajes de plantilla (templates):
- Marketing: $0.055 USD por mensaje
- Utility: $0.021 USD por mensaje  
- Authentication: $0.045 USD por mensaje

### Mensajes de conversación:
- Primeras 1000 conversaciones/mes: GRATIS
- Conversaciones adicionales: $0.005-$0.009 USD

### Estimación mensual para 1000 leads:
- Templates: ~$30 USD
- Conversaciones: ~$15 USD
- **Total: ~$45 USD/mes**

## 🚨 CONSIDERACIONES IMPORTANTES

### Límites de envío:
- Nuevos números: 50 mensajes/día
- Después de verificación: 1000 mensajes/día
- Con historial: Sin límites

### Políticas de WhatsApp:
- ✅ No spam
- ✅ Opt-in requerido
- ✅ Respuesta en 24hs
- ✅ Contenido relevante

### Mejores prácticas:
- Personalizar mensajes
- Usar templates aprobados
- Responder rápido
- Segmentar audiencias

¿Necesitás ayuda con algún paso específico? 🚀
`
