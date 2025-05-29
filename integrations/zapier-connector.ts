import type { UnifiedLead } from "./crm-connectors"

export class ZapierConnector {
  private webhookUrl: string

  constructor(webhookUrl?: string) {
    this.webhookUrl = webhookUrl || process.env.ZAPIER_WEBHOOK_URL || ""
  }

  async sendLead(lead: UnifiedLead): Promise<boolean> {
    try {
      const zapierPayload = {
        // Datos básicos
        nombre: lead.name,
        telefono: lead.phone,
        email: lead.email,

        // Tipo de seguro
        tipo_seguro: lead.insurance_type,
        urgencia: lead.urgency,
        presupuesto: lead.budget_range,
        tiene_seguro_actual: lead.current_insurance,

        // Scoring
        puntaje_lead: lead.lead_score,
        fuente: lead.lead_source,

        // Auto específico
        auto_marca: lead.auto_info?.brand,
        auto_modelo: lead.auto_info?.model,
        auto_año: lead.auto_info?.year,
        auto_tipo: lead.auto_info?.type,
        auto_ubicacion: lead.auto_info?.location,

        // Hogar específico
        propiedad_tipo: lead.home_info?.property_type,
        propiedad_ubicacion: lead.home_info?.location,
        propiedad_valor: lead.home_info?.value_range,
        propiedad_tenencia: lead.home_info?.ownership,

        // Timestamps
        fecha_captura: new Date().toISOString(),
        ultimo_contacto: lead.last_interaction.toISOString(),
        proximo_seguimiento: lead.next_follow_up.toISOString(),

        // Conversación
        historial_conversacion: lead.conversation_history.join("\n---\n"),

        // UTMs
        utm_source: lead.utm_source,
        utm_medium: lead.utm_medium,
        utm_campaign: lead.utm_campaign,

        // Metadatos adicionales
        plataforma: "ALEXIA_WHATSAPP",
        version: "2.0",
        timestamp: Date.now(),
      }

      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zapierPayload),
      })

      return response.ok
    } catch (error) {
      console.error("Error sending lead to Zapier:", error)
      return false
    }
  }

  // Configuración de Zaps recomendados
  static getRecommendedZaps() {
    return [
      {
        name: "Lead Caliente → Notificación Slack",
        trigger: "Webhook ALEXIA",
        filter: "puntaje_lead >= 70",
        action: "Enviar mensaje a #ventas con datos del lead",
      },
      {
        name: "Lead → Google Sheets",
        trigger: "Webhook ALEXIA",
        action: "Agregar fila a hoja de cálculo con todos los datos",
      },
      {
        name: "Lead → Email al Vendedor",
        trigger: "Webhook ALEXIA",
        filter: "urgencia >= 8",
        action: "Enviar email con datos del lead al vendedor asignado",
      },
      {
        name: "Lead → WhatsApp al Manager",
        trigger: "Webhook ALEXIA",
        filter: "tipo_seguro = 'comercial' AND presupuesto = 'alto'",
        action: "Enviar WhatsApp al manager con datos del lead premium",
      },
      {
        name: "Lead → Calendario",
        trigger: "Webhook ALEXIA",
        filter: "urgencia >= 7",
        action: "Crear evento en Google Calendar para seguimiento",
      },
    ]
  }
}
