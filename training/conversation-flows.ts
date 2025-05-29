export const CONVERSATION_FLOWS = {
  new_car_flow: {
    trigger: ["auto nuevo", "0km", "compré auto", "retiro auto"],
    flow: [
      {
        step: 1,
        message:
          "¡Felicitaciones por tu auto nuevo! 🚗✨ Para un 0km necesitás cobertura completa desde el primer día.",
        collect: ["car_brand", "car_model", "pickup_date"],
      },
      {
        step: 2,
        message: "Perfecto, un [CAR_BRAND] [CAR_MODEL]. ¿Cuándo lo retirás del concesionario?",
        collect: ["pickup_date", "dealer_insurance_offered"],
      },
      {
        step: 3,
        message: "Te paso 3 opciones especiales para 0km con descuentos que no vas a encontrar en otro lado:",
        action: "show_0km_quotes",
      },
    ],
  },

  expired_insurance_flow: {
    trigger: ["seguro vencido", "se me venció", "sin seguro", "venció la póliza"],
    flow: [
      {
        step: 1,
        message:
          "Entiendo tu situación [NOMBRE]. Tener el seguro vencido es riesgoso. La buena noticia: podemos activarte cobertura HOY MISMO.",
        collect: ["expiry_date", "previous_insurer"],
      },
      {
        step: 2,
        message: "¿Hace cuánto venció tu póliza? Esto determina el proceso:",
        options: ["Menos de 30 días", "30-90 días", "Más de 90 días"],
      },
      {
        step: 3,
        message: "Basándome en tu situación, este es el proceso más rápido para activar tu cobertura:",
        action: "show_reactivation_process",
      },
    ],
  },

  dissatisfied_customer_flow: {
    trigger: ["problemas con", "mala atención", "no me pagaron", "cambiar de seguro"],
    flow: [
      {
        step: 1,
        message: "Te entiendo perfectamente [NOMBRE]. Los problemas con aseguradoras son más comunes de lo que pensás.",
        collect: ["current_insurer", "problem_type"],
      },
      {
        step: 2,
        message: "¿Qué fue lo que más te molestó?",
        options: ["Demora en siniestros", "Mala atención", "Aumento sin aviso", "Cobertura insuficiente"],
      },
      {
        step: 3,
        message:
          "Basándome en tu experiencia, te voy a recomendar aseguradoras que específicamente son fuertes en esas áreas.",
        action: "show_targeted_recommendations",
      },
    ],
  },

  budget_conscious_flow: {
    trigger: ["barato", "económico", "presupuesto ajustado", "no tengo mucha plata"],
    flow: [
      {
        step: 1,
        message:
          "Entiendo [NOMBRE], el presupuesto es importante. La realidad es que NO tener seguro puede salirte mucho más caro.",
        collect: ["max_budget", "current_expenses"],
      },
      {
        step: 2,
        message: "¿Cuál es tu presupuesto máximo mensual?",
        options: ["Hasta $2.500", "$2.500-$4.000", "$4.000-$6.000", "Más de $6.000"],
      },
      {
        step: 3,
        message: "Perfecto. Te muestro 3 opciones inteligentes dentro de tu presupuesto:",
        action: "show_budget_options",
      },
    ],
  },
}

export const LEAD_QUALIFICATION_QUESTIONS = {
  auto_insurance: [
    {
      question: "¿Qué auto querés asegurar?",
      type: "text",
      required: true,
      follow_up: "¿Es 0km o usado?",
    },
    {
      question: "¿Dónde lo usás principalmente?",
      type: "select",
      options: ["CABA", "GBA Norte", "GBA Sur", "GBA Oeste", "Interior"],
      required: true,
    },
    {
      question: "¿Ya tenés seguro actualmente?",
      type: "boolean",
      follow_up_yes: "¿Con qué compañía?",
      follow_up_no: "¿Es la primera vez que sacás seguro?",
    },
    {
      question: "¿Buscás cobertura básica o completa?",
      type: "select",
      options: ["Solo contra terceros", "Terceros completo", "Todo riesgo", "No estoy seguro"],
    },
    {
      question: "¿Cuál es tu presupuesto mensual aproximado?",
      type: "select",
      options: ["Hasta $3.000", "$3.000-$5.000", "$5.000-$8.000", "Más de $8.000", "No tengo límite"],
    },
  ],

  home_insurance: [
    {
      question: "¿Es casa o departamento?",
      type: "select",
      options: ["Casa", "Departamento", "PH", "Quinta"],
      required: true,
    },
    {
      question: "¿En qué zona está ubicado?",
      type: "text",
      required: true,
    },
    {
      question: "¿Vivís ahí o lo alquilás?",
      type: "select",
      options: ["Vivo ahí", "Lo alquilo", "Es de inversión", "Casa de fin de semana"],
    },
    {
      question: "¿Valor aproximado de la propiedad?",
      type: "select",
      options: ["Hasta $50M", "$50M-$100M", "$100M-$200M", "Más de $200M"],
    },
  ],
}
