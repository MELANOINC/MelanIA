export const WHATSAPP_BUSINESS_CONFIG = {
  // Configuración Meta Business API
  app_id: "YOUR_APP_ID",
  phone_number_id: "YOUR_PHONE_NUMBER_ID",
  access_token: "YOUR_ACCESS_TOKEN",
  webhook_verify_token: "YOUR_VERIFY_TOKEN",
  business_account_id: "YOUR_BUSINESS_ACCOUNT_ID",

  // URLs de la API
  api_version: "v18.0",
  base_url: "https://graph.facebook.com",

  // Configuración del perfil de negocio
  business_profile: {
    about:
      "🛡️ SEGUROS INTELIGENTES - Cotizá tu seguro ideal en 2 minutos. Atención 24/7 con ALEXIA, tu asesora de seguros IA.",
    address: "Buenos Aires, Argentina",
    description:
      "Comparamos 15+ aseguradoras para conseguirte el mejor precio y cobertura. Especialistas en Auto, Hogar, Salud y Vida.",
    email: "alexia@segurosinteligentes.com",
    profile_picture_url: "https://your-domain.com/alexia-profile.jpg",
    websites: ["https://segurosinteligentes.com"],
    vertical: "PROF_SERVICES",
  },
}

// Configuración de comandos rápidos
export const QUICK_REPLIES = {
  main_menu: [
    {
      type: "reply",
      reply: {
        id: "cotizar_auto",
        title: "🚗 Cotizar Auto",
      },
    },
    {
      type: "reply",
      reply: {
        id: "cotizar_hogar",
        title: "🏠 Cotizar Hogar",
      },
    },
    {
      type: "reply",
      reply: {
        id: "cotizar_salud",
        title: "❤️ Cotizar Salud",
      },
    },
    {
      type: "reply",
      reply: {
        id: "cotizar_vida",
        title: "👨‍👩‍👧‍👦 Cotizar Vida",
      },
    },
    {
      type: "reply",
      reply: {
        id: "hablar_asesor",
        title: "👤 Hablar con Asesor",
      },
    },
  ],

  urgency_level: [
    {
      type: "reply",
      reply: {
        id: "urgente_hoy",
        title: "🔥 Urgente (Hoy)",
      },
    },
    {
      type: "reply",
      reply: {
        id: "esta_semana",
        title: "📅 Esta Semana",
      },
    },
    {
      type: "reply",
      reply: {
        id: "este_mes",
        title: "🗓️ Este Mes",
      },
    },
    {
      type: "reply",
      reply: {
        id: "solo_consulta",
        title: "❓ Solo Consulta",
      },
    },
  ],

  budget_ranges: [
    {
      type: "reply",
      reply: {
        id: "hasta_3000",
        title: "💰 Hasta $3.000",
      },
    },
    {
      type: "reply",
      reply: {
        id: "3000_5000",
        title: "💰 $3.000-$5.000",
      },
    },
    {
      type: "reply",
      reply: {
        id: "5000_8000",
        title: "💰 $5.000-$8.000",
      },
    },
    {
      type: "reply",
      reply: {
        id: "mas_8000",
        title: "💰 Más de $8.000",
      },
    },
  ],
}
