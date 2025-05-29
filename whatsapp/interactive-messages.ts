export const INTERACTIVE_MESSAGES = {
  // Menú principal con botones
  main_menu: {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "🛡️ SEGUROS INTELIGENTES",
      },
      body: {
        text: "¡Hola! Soy ALEXIA 👋\n\nTe ayudo a encontrar el seguro perfecto para vos.\n\n¿Qué tipo de cobertura necesitás hoy?",
      },
      footer: {
        text: "Respuesta en menos de 2 minutos ⚡",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "cotizar_auto",
              title: "🚗 Seguro Auto",
            },
          },
          {
            type: "reply",
            reply: {
              id: "cotizar_hogar",
              title: "🏠 Seguro Hogar",
            },
          },
          {
            type: "reply",
            reply: {
              id: "otros_seguros",
              title: "➕ Otros Seguros",
            },
          },
        ],
      },
    },
  },

  // Lista de tipos de seguro
  insurance_types_list: {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "🎯 Tipos de Seguros Disponibles",
      },
      body: {
        text: "Seleccioná el tipo de seguro que necesitás:",
      },
      footer: {
        text: "Cotización gratuita y sin compromiso",
      },
      action: {
        button: "Ver Opciones",
        sections: [
          {
            title: "🚗 Vehículos",
            rows: [
              {
                id: "auto_0km",
                title: "Auto 0KM",
                description: "Cobertura completa para autos nuevos",
              },
              {
                id: "auto_usado",
                title: "Auto Usado",
                description: "Opciones flexibles según antigüedad",
              },
              {
                id: "moto",
                title: "Moto/Ciclomotor",
                description: "Cobertura específica para motos",
              },
            ],
          },
          {
            title: "🏠 Propiedades",
            rows: [
              {
                id: "hogar_casa",
                title: "Casa/Quinta",
                description: "Protección integral del hogar",
              },
              {
                id: "hogar_depto",
                title: "Departamento",
                description: "Cobertura para departamentos",
              },
              {
                id: "comercio",
                title: "Local Comercial",
                description: "Seguros para negocios",
              },
            ],
          },
          {
            title: "👨‍👩‍👧‍👦 Personas",
            rows: [
              {
                id: "salud_individual",
                title: "Salud Individual",
                description: "Cobertura médica personal",
              },
              {
                id: "salud_familiar",
                title: "Salud Familiar",
                description: "Plan familiar completo",
              },
              {
                id: "vida",
                title: "Seguro de Vida",
                description: "Protección para tu familia",
              },
            ],
          },
        ],
      },
    },
  },

  // Cotización rápida auto
  auto_quick_quote: {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "🚗 Cotización Express Auto",
      },
      body: {
        text: "Para darte el mejor precio necesito conocer tu auto.\n\n¿Qué tipo de vehículo querés asegurar?",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "auto_0km",
              title: "✨ 0KM",
            },
          },
          {
            type: "reply",
            reply: {
              id: "auto_usado",
              title: "🚙 Usado",
            },
          },
          {
            type: "reply",
            reply: {
              id: "auto_clasico",
              title: "🏛️ Clásico",
            },
          },
        ],
      },
    },
  },

  // Selector de cobertura
  coverage_selector: {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "🛡️ Tipos de Cobertura",
      },
      body: {
        text: "¿Qué nivel de protección buscás?",
      },
      footer: {
        text: "Podés cambiar la cobertura después",
      },
      action: {
        button: "Elegir Cobertura",
        sections: [
          {
            title: "Opciones de Cobertura",
            rows: [
              {
                id: "basica",
                title: "🥉 Básica - Contra Terceros",
                description: "Obligatoria por ley. Desde $2.500/mes",
              },
              {
                id: "intermedia",
                title: "🥈 Intermedia - Terceros Completo",
                description: "Incluye robo e incendio. Desde $4.200/mes",
              },
              {
                id: "completa",
                title: "🥇 Completa - Todo Riesgo",
                description: "Máxima protección. Desde $6.800/mes",
              },
              {
                id: "premium",
                title: "💎 Premium - Todo Riesgo Plus",
                description: "Cobertura premium. Desde $9.500/mes",
              },
            ],
          },
        ],
      },
    },
  },

  // Urgencia y contacto
  urgency_contact: {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "⏰ ¿Cuándo necesitás el seguro?",
      },
      body: {
        text: "Para priorizarte correctamente, ¿qué urgencia tenés?",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "urgente_hoy",
              title: "🔥 Hoy mismo",
            },
          },
          {
            type: "reply",
            reply: {
              id: "esta_semana",
              title: "📅 Esta semana",
            },
          },
          {
            type: "reply",
            reply: {
              id: "sin_apuro",
              title: "🤷‍♂️ Sin apuro",
            },
          },
        ],
      },
    },
  },
}

// Función para enviar mensajes interactivos
import { WHATSAPP_BUSINESS_CONFIG } from "../config/whatsapp"

export async function sendInteractiveMessage(to: string, messageType: keyof typeof INTERACTIVE_MESSAGES) {
  const message = {
    messaging_product: "whatsapp",
    to: to,
    ...INTERACTIVE_MESSAGES[messageType],
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
