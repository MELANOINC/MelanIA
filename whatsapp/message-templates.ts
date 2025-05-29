// Templates oficiales aprobados por Meta
export const OFFICIAL_TEMPLATES = {
  // Template de bienvenida
  welcome_insurance: {
    name: "welcome_insurance",
    language: "es",
    category: "MARKETING",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "¡Bienvenido a SEGUROS INTELIGENTES! 🛡️",
      },
      {
        type: "BODY",
        text: "Hola {{1}}! 👋\n\nSoy ALEXIA, tu asesora de seguros inteligente.\n\nTe ayudo a encontrar el seguro perfecto para vos:\n\n🚗 Auto (desde $2.500/mes)\n🏠 Hogar (desde $1.800/mes)\n❤️ Salud (desde $4.200/mes)\n👨‍👩‍👧‍👦 Vida (desde $890/mes)\n\n¿Qué tipo de cobertura necesitás hoy?",
      },
      {
        type: "FOOTER",
        text: "Respuesta inmediata • Sin compromiso",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "🚗 Cotizar Auto",
          },
          {
            type: "QUICK_REPLY",
            text: "🏠 Cotizar Hogar",
          },
          {
            type: "QUICK_REPLY",
            text: "📞 Llamar Ahora",
          },
        ],
      },
    ],
  },

  // Template de cotización lista
  quote_ready: {
    name: "quote_ready",
    language: "es",
    category: "UTILITY",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "✅ Tu cotización está lista!",
      },
      {
        type: "BODY",
        text: "Hola {{1}}! 🎯\n\nYa tengo tu cotización personalizada para {{2}}:\n\n🥇 Mejor opción: ${{3}}/mes\n🥈 Alternativa: ${{4}}/mes\n🥉 Económica: ${{5}}/mes\n\nTodas incluyen:\n✅ Cobertura {{6}}\n✅ Asistencia 24hs\n✅ Sin franquicia\n\n¿Cuál te interesa más?",
      },
      {
        type: "FOOTER",
        text: "Válido por 48hs • Activación inmediata",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "💰 Ver Detalles",
          },
          {
            type: "QUICK_REPLY",
            text: "📞 Contratar Ya",
          },
          {
            type: "QUICK_REPLY",
            text: "🤔 Tengo Dudas",
          },
        ],
      },
    ],
  },

  // Template de seguimiento
  follow_up_insurance: {
    name: "follow_up_insurance",
    language: "es",
    category: "MARKETING",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "⏰ No te olvides de tu seguro",
      },
      {
        type: "BODY",
        text: "Hola {{1}}! 👋\n\nHace {{2}} días hablamos sobre tu seguro de {{3}}.\n\n¿Pudiste revisar las opciones que te pasé?\n\nRecordá que:\n🚨 Circular sin seguro puede costarte multas de hasta $200.000\n💰 Tenés descuentos especiales que vencen pronto\n⚡ La activación es inmediata\n\n¿Te ayudo a cerrar todo hoy?",
      },
      {
        type: "FOOTER",
        text: "Promociones por tiempo limitado",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "✅ Sí, contratar",
          },
          {
            type: "QUICK_REPLY",
            text: "❓ Tengo preguntas",
          },
          {
            type: "QUICK_REPLY",
            text: "⏸️ Pausar mensajes",
          },
        ],
      },
    ],
  },

  // Template de urgencia
  urgent_activation: {
    name: "urgent_activation",
    language: "es",
    category: "UTILITY",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "🚨 ACTIVACIÓN URGENTE",
      },
      {
        type: "BODY",
        text: "{{1}}, necesitás seguro URGENTE! 🔥\n\nPuedo activarte cobertura en los próximos 15 minutos:\n\n⚡ Proceso 100% digital\n📱 Póliza por WhatsApp\n💳 Pago con tarjeta\n✅ Cobertura inmediata\n\nOpciones express disponibles:\n🥇 {{2}} - ${{3}}/mes\n🥈 {{4}} - ${{5}}/mes\n\n¿Arrancamos YA?",
      },
      {
        type: "FOOTER",
        text: "Activación en 15 minutos",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "🚀 Activar YA",
          },
          {
            type: "QUICK_REPLY",
            text: "📞 Llamar Ahora",
          },
        ],
      },
    ],
  },

  // Template de promoción
  special_promotion: {
    name: "special_promotion",
    language: "es",
    category: "MARKETING",
    components: [
      {
        type: "HEADER",
        format: "IMAGE",
        example: {
          header_handle: ["https://your-domain.com/promo-image.jpg"],
        },
      },
      {
        type: "BODY",
        text: "🔥 PROMOCIÓN ESPECIAL - Solo por {{1}} días!\n\n{{2}}, tengo una oferta exclusiva para vos:\n\n💥 {{3}}% de descuento en {{4}}\n🎁 Primer mes GRATIS\n✅ Sin costo de activación\n⚡ Cobertura inmediata\n\nEsta promo es solo para los primeros {{5}} clientes.\n\n¿Aprovechamos esta oportunidad?",
      },
      {
        type: "FOOTER",
        text: "Oferta válida hasta {{1}}",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "🎯 Quiero la promo",
          },
          {
            type: "QUICK_REPLY",
            text: "📋 Ver condiciones",
          },
          {
            type: "QUICK_REPLY",
            text: "❌ No me interesa",
          },
        ],
      },
    ],
  },
}

// Importa la configuración de WhatsApp Business
import { WHATSAPP_BUSINESS_CONFIG } from "../config/whatsapp-business"

// Función para enviar templates
export async function sendTemplate(to: string, templateName: string, languageCode: string, components: any[]) {
  const message = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode,
      },
      components: components,
    },
  }

  const response = await fetch(
    `${WHATSAPP_BUSINESS_CONFIG.base_url}/${WHATSAPP_BUSINESS_CONFIG.api_version}/${WHATSAPP_BUSINESS_CONFIG.phone_number_id}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_BUSINESS_CONFIG.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    },
  )

  return response.json()
}
