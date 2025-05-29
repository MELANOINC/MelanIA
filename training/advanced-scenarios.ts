export const ADVANCED_SCENARIOS = {
  high_value_client: {
    trigger: "auto premium, casa cara, presupuesto alto",
    approach: "VIP treatment",
    script: `
    "Perfecto [NOMBRE], veo que buscás cobertura premium. Para clientes como vos tengo un servicio especializado.
    
    Te asigno un asesor personal que va a manejar todo tu portfolio de seguros y te va a conseguir descuentos por multi-producto.
    
    ¿Te parece si coordinamos una reunión presencial para revisar todas tus necesidades de cobertura?"
    `,
  },

  fleet_owner: {
    trigger: "varios autos, flota, empresa",
    approach: "B2B specialized",
    script: `
    "Entiendo [NOMBRE], para flotas el manejo es diferente. Tengo descuentos especiales por volumen y gestión centralizada.
    
    ¿Cuántos vehículos necesitás asegurar? Con más de 5 unidades ya tenés descuentos importantes.
    
    También puedo incluir gestión de siniestros dedicada y reportes mensuales."
    `,
  },

  young_driver: {
    trigger: "primer auto, joven, estudiante",
    approach: "Educational + affordable",
    script: `
    "¡Qué bueno [NOMBRE]! Tu primer auto es un momento especial 🚗
    
    Para conductores jóvenes tengo opciones especiales con:
    - Descuentos por buen estudiante
    - Cobertura de aprendizaje
    - Planes de pago flexibles
    
    ¿Tenés registro hace más de 2 años? Eso te da mejores precios."
    `,
  },

  claim_history: {
    trigger: "tuve siniestros, choque, robo",
    approach: "Risk assessment + solutions",
    script: `
    "Entiendo [NOMBRE], los siniestros previos pueden complicar las cosas, pero tengo soluciones.
    
    ¿Qué tipo de siniestro fue y cuándo pasó?
    - Menos de 1 año: Algunas aseguradoras te van a rechazar
    - 1-3 años: Precios más altos pero factible
    - Más de 3 años: Sin problemas
    
    Conozco aseguradoras que se especializan en perfiles con historial."
    `,
  },
}

export const EMOTIONAL_TRIGGERS = {
  fear: [
    "¿Sabías que 1 de cada 10 autos sufre algún siniestro por año?",
    "Un choque puede costarte hasta $500.000 sin seguro",
    "Circular sin seguro puede traerte problemas legales serios",
  ],

  urgency: [
    "Esta promoción vence hoy a las 18hs",
    "Solo quedan 3 cupos con este descuento",
    "Los precios suben el lunes próximo",
  ],

  exclusivity: [
    "Esta oferta es solo para clientes que llegan por recomendación",
    "Tengo acceso a descuentos que no están disponibles al público",
    "Como asesor premium puedo conseguirte condiciones especiales",
  ],

  social_proof: [
    "El 90% de mis clientes renuevan conmigo año tras año",
    "Ayer ayudé a 15 personas como vos a ahorrar en su seguro",
    "Esta aseguradora tiene la mejor calificación en atención al cliente",
  ],
}
