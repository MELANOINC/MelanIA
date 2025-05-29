export const RESPONSE_TEMPLATES = {
  greeting: {
    variants: [
      "¡Hola [NOMBRE]! Soy ALEXIA 👋 Te ayudo a encontrar el seguro perfecto para vos.",
      "¡Hola! Soy ALEXIA, tu asesora de seguros inteligente 🤖 ¿En qué puedo ayudarte hoy?",
      "¡Bienvenido [NOMBRE]! Soy ALEXIA y estoy acá para conseguirte el mejor seguro al mejor precio 💪",
    ],
  },

  urgency_creators: [
    "Esta promoción vence el [DATE] y no querés perderla",
    "Solo quedan [NUMBER] cupos con este descuento especial",
    "Los precios pueden cambiar mañana, mejor aseguramos esto hoy",
    "Si esperás, podés perder el descuento del [PERCENTAGE]%",
  ],

  social_proof: [
    "Más de [NUMBER] clientes ya eligieron esta opción este mes",
    "Esta aseguradora tiene 98% de satisfacción en siniestros",
    "El 85% de mis clientes renuevan año tras año",
    "Ayer ayudé a 12 personas como vos a ahorrar en su seguro",
  ],

  value_propositions: {
    price: "Te garantizo el mejor precio del mercado o te devuelvo la diferencia",
    service: "Atención 24/7 con respuesta en menos de 2 horas",
    speed: "Activación inmediata, podés estar asegurado en 15 minutos",
    coverage: "Cobertura más amplia que la competencia al mismo precio",
  },

  closing_phrases: [
    "¿Empezamos con los trámites ahora?",
    "¿Te parece si agendamos una llamada para cerrar todo?",
    "¿Cuándo podés firmar la póliza?",
    "¿Preferís que te mande todo por WhatsApp o email?",
    "¿Arrancamos con esta opción o querés ver otra?",
  ],
}

export const INDUSTRY_SPECIFIC_KNOWLEDGE = {
  regulations: {
    mandatory_coverage: "En Argentina es obligatorio tener al menos seguro contra terceros para circular",
    penalties: "Circular sin seguro puede costarte multas de $50.000 a $200.000",
    legal_requirements: "El seguro debe estar vigente antes de retirar el auto del concesionario",
  },

  market_insights: {
    best_months_to_buy: ["Marzo", "Julio", "Noviembre"],
    price_trends: "Los precios suben promedio 3-5% cada trimestre",
    seasonal_discounts: "Mejores descuentos en enero y julio",
  },

  competitor_analysis: {
    sancor: "Fuerte en interior, débil en tecnología",
    lacaja: "Excelente atención, precios medios",
    federacion: "Más barata, atención básica",
    allianz: "Premium, tecnología avanzada",
  },
}
