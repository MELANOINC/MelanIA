import type { UnifiedLead } from "./crm-connectors"

export class HubSpotConnector {
  private apiKey: string
  private baseUrl = "https://api.hubapi.com"

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.HUBSPOT_API_KEY || ""
  }

  async sendLead(lead: UnifiedLead): Promise<{ success: boolean; contactId?: string; dealId?: string }> {
    try {
      // 1. Crear o actualizar contacto
      const contactId = await this.createOrUpdateContact(lead)

      // 2. Crear deal/oportunidad
      const dealId = await this.createDeal(lead, contactId)

      // 3. Crear actividades de seguimiento
      await this.createFollowUpActivities(lead, contactId)

      // 4. Agregar notas de conversación
      await this.addConversationNotes(lead, contactId)

      return { success: true, contactId, dealId }
    } catch (error) {
      console.error("Error sending lead to HubSpot:", error)
      return { success: false }
    }
  }

  private async createOrUpdateContact(lead: UnifiedLead): Promise<string> {
    // Buscar contacto existente por email o teléfono
    const existingContact = await this.findContactByEmailOrPhone(lead.email, lead.phone)

    const contactData = {
      properties: {
        firstname: lead.name.split(" ")[0],
        lastname: lead.name.split(" ").slice(1).join(" ") || ".",
        email: lead.email,
        phone: lead.phone,

        // Campos personalizados de seguros
        tipo_seguro_interes: lead.insurance_type,
        urgencia_seguro: lead.urgency.toString(),
        presupuesto_mensual: lead.budget_range,
        tiene_seguro_actual: lead.current_insurance ? "Sí" : "No",
        puntaje_lead_alexia: lead.lead_score.toString(),
        fuente_lead: lead.lead_source,

        // Auto específico
        auto_marca_modelo: lead.auto_info ? `${lead.auto_info.brand} ${lead.auto_info.model}` : "",
        auto_año: lead.auto_info?.year?.toString(),
        auto_tipo: lead.auto_info?.type,
        auto_ubicacion: lead.auto_info?.location,

        // Hogar específico
        propiedad_tipo: lead.home_info?.property_type,
        propiedad_ubicacion: lead.home_info?.location,
        propiedad_valor: lead.home_info?.value_range,

        // UTMs
        hs_analytics_source: lead.utm_source,
        hs_analytics_source_data_1: lead.utm_medium,
        hs_analytics_source_data_2: lead.utm_campaign,

        // Lifecycle stage
        lifecyclestage: this.getLifecycleStage(lead.lead_score),
      },
    }

    if (existingContact) {
      // Actualizar contacto existente
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/${existingContact.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      const updatedContact = await response.json()
      return updatedContact.id
    } else {
      // Crear nuevo contacto
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      const newContact = await response.json()
      return newContact.id
    }
  }

  private async createDeal(lead: UnifiedLead, contactId: string): Promise<string> {
    const dealData = {
      properties: {
        dealname: `${lead.insurance_type.toUpperCase()} - ${lead.name}`,
        dealstage: this.getDealStage(lead.urgency, lead.lead_score),
        pipeline: "default", // O tu pipeline personalizado
        amount: this.estimateDealValue(lead),
        closedate: this.calculateCloseDate(lead.urgency),

        // Campos personalizados
        tipo_seguro: lead.insurance_type,
        urgencia_cliente: lead.urgency.toString(),
        fuente_lead: lead.lead_source,
        puntaje_lead: lead.lead_score.toString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }], // Contact to Deal
        },
      ],
    }

    const response = await fetch(`${this.baseUrl}/crm/v3/objects/deals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    })

    const deal = await response.json()
    return deal.id
  }

  private async createFollowUpActivities(lead: UnifiedLead, contactId: string) {
    const activities = []

    // Actividad inmediata para leads calientes
    if (lead.urgency >= 8) {
      activities.push({
        properties: {
          hs_task_subject: `🔥 LLAMADA URGENTE - ${lead.name}`,
          hs_task_body: `Lead caliente de ${lead.insurance_type}. Urgencia: ${lead.urgency}/10. Llamar AHORA.`,
          hs_task_status: "NOT_STARTED",
          hs_task_priority: "HIGH",
          hs_timestamp: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // En 5 minutos
          hs_task_type: "CALL",
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }], // Contact to Task
          },
        ],
      })
    }

    // Actividad de seguimiento estándar
    activities.push({
      properties: {
        hs_task_subject: `📞 Seguimiento ${lead.insurance_type} - ${lead.name}`,
        hs_task_body: `Seguimiento de lead de ${lead.insurance_type}. Presupuesto: ${lead.budget_range}. Score: ${lead.lead_score}`,
        hs_task_status: "NOT_STARTED",
        hs_task_priority: lead.urgency >= 7 ? "HIGH" : "MEDIUM",
        hs_timestamp: lead.next_follow_up.toISOString(),
        hs_task_type: "CALL",
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }],
        },
      ],
    })

    // Crear todas las actividades
    for (const activity of activities) {
      await fetch(`${this.baseUrl}/crm/v3/objects/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      })
    }
  }

  private async addConversationNotes(lead: UnifiedLead, contactId: string) {
    const noteContent = `
🤖 CONVERSACIÓN CON ALEXIA - ${new Date().toLocaleDateString()}

📋 RESUMEN:
• Tipo de seguro: ${lead.insurance_type.toUpperCase()}
• Urgencia: ${lead.urgency}/10
• Presupuesto: ${lead.budget_range}
• Score: ${lead.lead_score}/100
• Fuente: ${lead.lead_source}

${
  lead.auto_info
    ? `
🚗 INFORMACIÓN DEL AUTO:
• Vehículo: ${lead.auto_info.brand} ${lead.auto_info.model} ${lead.auto_info.year}
• Tipo: ${lead.auto_info.type}
• Ubicación: ${lead.auto_info.location}
`
    : ""
}

${
  lead.home_info
    ? `
🏠 INFORMACIÓN DE LA PROPIEDAD:
• Tipo: ${lead.home_info.property_type}
• Ubicación: ${lead.home_info.location}
• Valor: ${lead.home_info.value_range}
• Tenencia: ${lead.home_info.ownership}
`
    : ""
}

💬 HISTORIAL DE CONVERSACIÓN:
${lead.conversation_history.join("\n\n")}

⏰ PRÓXIMO SEGUIMIENTO: ${lead.next_follow_up.toLocaleDateString()}
    `

    const noteData = {
      properties: {
        hs_note_body: noteContent,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }], // Contact to Note
        },
      ],
    }

    await fetch(`${this.baseUrl}/crm/v3/objects/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    })
  }

  private async findContactByEmailOrPhone(email?: string, phone?: string) {
    if (!email && !phone) return null

    const searchCriteria = []
    if (email) {
      searchCriteria.push({
        propertyName: "email",
        operator: "EQ",
        value: email,
      })
    }
    if (phone) {
      searchCriteria.push({
        propertyName: "phone",
        operator: "EQ",
        value: phone,
      })
    }

    const searchData = {
      filterGroups: [
        {
          filters: searchCriteria,
        },
      ],
    }

    const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    })

    const results = await response.json()
    return results.results?.[0] || null
  }

  private getLifecycleStage(score: number): string {
    if (score >= 80) return "opportunity"
    if (score >= 60) return "marketingqualifiedlead"
    if (score >= 40) return "lead"
    return "subscriber"
  }

  private getDealStage(urgency: number, score: number): string {
    if (urgency >= 9 && score >= 80) return "closedwon"
    if (urgency >= 8 && score >= 70) return "decisionmakerboughtin"
    if (urgency >= 7 && score >= 60) return "qualifiedtobuy"
    if (urgency >= 5 && score >= 40) return "presentationscheduled"
    return "appointmentscheduled"
  }

  private estimateDealValue(lead: UnifiedLead): string {
    const baseValues = {
      auto: 50000, // Comisión promedio anual
      hogar: 25000,
      salud: 80000,
      vida: 30000,
      comercial: 120000,
    }

    const multiplier = lead.budget_range.includes("alto") ? 1.5 : lead.budget_range.includes("medio") ? 1.2 : 1

    return (baseValues[lead.insurance_type] * multiplier).toString()
  }

  private calculateCloseDate(urgency: number): string {
    const daysToAdd = urgency >= 8 ? 3 : urgency >= 6 ? 7 : urgency >= 4 ? 14 : 30
    const closeDate = new Date()
    closeDate.setDate(closeDate.getDate() + daysToAdd)
    return closeDate.toISOString()
  }
}
