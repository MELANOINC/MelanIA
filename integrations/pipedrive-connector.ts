import type { UnifiedLead } from "./crm-connectors"

export class PipedriveConnector {
  private apiToken: string
  private companyDomain: string
  private baseUrl: string

  constructor(apiToken?: string, companyDomain?: string) {
    this.apiToken = apiToken || process.env.PIPEDRIVE_API_TOKEN || ""
    this.companyDomain = companyDomain || process.env.PIPEDRIVE_COMPANY_DOMAIN || ""
    this.baseUrl = `https://${this.companyDomain}.pipedrive.com/api/v1`
  }

  async sendLead(lead: UnifiedLead): Promise<{ success: boolean; personId?: number; dealId?: number }> {
    try {
      // 1. Crear persona
      const personId = await this.createPerson(lead)

      // 2. Crear deal
      const dealId = await this.createDeal(lead, personId)

      // 3. Agregar actividades
      await this.createActivities(lead, personId, dealId)

      // 4. Agregar notas
      await this.addNotes(lead, personId, dealId)

      return { success: true, personId, dealId }
    } catch (error) {
      console.error("Error sending lead to Pipedrive:", error)
      return { success: false }
    }
  }

  private async createPerson(lead: UnifiedLead): Promise<number> {
    // Buscar persona existente
    const existingPerson = await this.findPersonByEmailOrPhone(lead.email, lead.phone)

    const personData = {
      name: lead.name,
      email: [{ value: lead.email, primary: true }],
      phone: [{ value: lead.phone, primary: true }],

      // Campos personalizados (debes crearlos en Pipedrive primero)
      custom_field_tipo_seguro: lead.insurance_type,
      custom_field_urgencia: lead.urgency,
      custom_field_presupuesto: lead.budget_range,
      custom_field_tiene_seguro: lead.current_insurance,
      custom_field_score_lead: lead.lead_score,
      custom_field_fuente: lead.lead_source,

      // Auto info
      custom_field_auto_marca: lead.auto_info?.brand,
      custom_field_auto_modelo: lead.auto_info?.model,
      custom_field_auto_año: lead.auto_info?.year,
      custom_field_auto_tipo: lead.auto_info?.type,

      // Home info
      custom_field_propiedad_tipo: lead.home_info?.property_type,
      custom_field_propiedad_ubicacion: lead.home_info?.location,
    }

    if (existingPerson) {
      // Actualizar persona existente
      const response = await fetch(`${this.baseUrl}/persons/${existingPerson.id}?api_token=${this.apiToken}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personData),
      })
      const result = await response.json()
      return result.data.id
    } else {
      // Crear nueva persona
      const response = await fetch(`${this.baseUrl}/persons?api_token=${this.apiToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personData),
      })
      const result = await response.json()
      return result.data.id
    }
  }

  private async createDeal(lead: UnifiedLead, personId: number): Promise<number> {
    const dealData = {
      title: `${lead.insurance_type.toUpperCase()} - ${lead.name}`,
      person_id: personId,
      stage_id: this.getStageId(lead.urgency, lead.lead_score),
      value: this.estimateDealValue(lead),
      currency: "ARS",
      expected_close_date: this.calculateCloseDate(lead.urgency),

      // Campos personalizados
      custom_field_tipo_seguro: lead.insurance_type,
      custom_field_urgencia: lead.urgency,
      custom_field_score: lead.lead_score,
      custom_field_fuente: lead.lead_source,
    }

    const response = await fetch(`${this.baseUrl}/deals?api_token=${this.apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dealData),
    })

    const result = await response.json()
    return result.data.id
  }

  private async createActivities(lead: UnifiedLead, personId: number, dealId: number) {
    const activities = []

    // Actividad inmediata para leads urgentes
    if (lead.urgency >= 8) {
      activities.push({
        subject: `🔥 LLAMADA URGENTE - ${lead.name}`,
        type: "call",
        due_date: new Date(Date.now() + 5 * 60 * 1000).toISOString().split("T")[0],
        due_time: new Date(Date.now() + 5 * 60 * 1000).toTimeString().split(" ")[0],
        person_id: personId,
        deal_id: dealId,
        note: `Lead caliente de ${lead.insurance_type}. Urgencia: ${lead.urgency}/10. Score: ${lead.lead_score}. LLAMAR INMEDIATAMENTE.`,
      })
    }

    // Actividad de seguimiento
    activities.push({
      subject: `📞 Seguimiento ${lead.insurance_type} - ${lead.name}`,
      type: "call",
      due_date: lead.next_follow_up.toISOString().split("T")[0],
      due_time: "10:00:00",
      person_id: personId,
      deal_id: dealId,
      note: `Seguimiento programado. Presupuesto: ${lead.budget_range}. Revisar cotización y cerrar venta.`,
    })

    // Email de seguimiento
    activities.push({
      subject: `📧 Email seguimiento - ${lead.name}`,
      type: "email",
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      due_time: "09:00:00",
      person_id: personId,
      deal_id: dealId,
      note: `Enviar cotización detallada y beneficios específicos para ${lead.insurance_type}.`,
    })

    // Crear todas las actividades
    for (const activity of activities) {
      await fetch(`${this.baseUrl}/activities?api_token=${this.apiToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      })
    }
  }

  private async addNotes(lead: UnifiedLead, personId: number, dealId: number) {
    const noteContent = `
🤖 LEAD CAPTURADO POR ALEXIA - ${new Date().toLocaleDateString()}

📊 INFORMACIÓN DEL LEAD:
• Nombre: ${lead.name}
• Teléfono: ${lead.phone}
• Email: ${lead.email || "No proporcionado"}
• Tipo de seguro: ${lead.insurance_type.toUpperCase()}
• Urgencia: ${lead.urgency}/10
• Presupuesto: ${lead.budget_range}
• Tiene seguro actual: ${lead.current_insurance ? "Sí" : "No"}
• Score del lead: ${lead.lead_score}/100
• Fuente: ${lead.lead_source}

${
  lead.auto_info
    ? `
🚗 INFORMACIÓN DEL VEHÍCULO:
• Marca y modelo: ${lead.auto_info.brand} ${lead.auto_info.model}
• Año: ${lead.auto_info.year}
• Tipo: ${lead.auto_info.type}
• Ubicación de uso: ${lead.auto_info.location}
`
    : ""
}

${
  lead.home_info
    ? `
🏠 INFORMACIÓN DE LA PROPIEDAD:
• Tipo: ${lead.home_info.property_type}
• Ubicación: ${lead.home_info.location}
• Rango de valor: ${lead.home_info.value_range}
• Tenencia: ${lead.home_info.ownership}
`
    : ""
}

💬 RESUMEN DE CONVERSACIÓN:
${lead.conversation_history.slice(-3).join("\n\n")}

🎯 PRÓXIMOS PASOS:
• Seguimiento programado: ${lead.next_follow_up.toLocaleDateString()}
• Prioridad: ${lead.urgency >= 8 ? "ALTA" : lead.urgency >= 6 ? "MEDIA" : "BAJA"}
• Estrategia: ${this.getFollowUpStrategy(lead)}
    `

    const noteData = {
      content: noteContent,
      person_id: personId,
      deal_id: dealId,
    }

    await fetch(`${this.baseUrl}/notes?api_token=${this.apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    })
  }

  private async findPersonByEmailOrPhone(email?: string, phone?: string) {
    if (!email && !phone) return null

    // Buscar por email
    if (email) {
      const response = await fetch(
        `${this.baseUrl}/persons/search?term=${encodeURIComponent(email)}&api_token=${this.apiToken}`,
      )
      const result = await response.json()
      if (result.data?.items?.length > 0) {
        return result.data.items[0].item
      }
    }

    // Buscar por teléfono
    if (phone) {
      const response = await fetch(
        `${this.baseUrl}/persons/search?term=${encodeURIComponent(phone)}&api_token=${this.apiToken}`,
      )
      const result = await response.json()
      if (result.data?.items?.length > 0) {
        return result.data.items[0].item
      }
    }

    return null
  }

  private getStageId(urgency: number, score: number): number {
    // Estos IDs dependen de tu pipeline en Pipedrive
    // Debes configurarlos según tu setup
    if (urgency >= 9 && score >= 80) return 5 // Qualified to buy
    if (urgency >= 7 && score >= 60) return 4 // Proposal made
    if (urgency >= 5 && score >= 40) return 3 // Contact made
    return 2 // Qualified
  }

  private estimateDealValue(lead: UnifiedLead): number {
    const baseValues = {
      auto: 50000,
      hogar: 25000,
      salud: 80000,
      vida: 30000,
      comercial: 120000,
    }

    const multiplier = lead.budget_range.includes("alto") ? 1.5 : lead.budget_range.includes("medio") ? 1.2 : 1

    return baseValues[lead.insurance_type] * multiplier
  }

  private calculateCloseDate(urgency: number): string {
    const daysToAdd = urgency >= 8 ? 3 : urgency >= 6 ? 7 : urgency >= 4 ? 14 : 30
    const closeDate = new Date()
    closeDate.setDate(closeDate.getDate() + daysToAdd)
    return closeDate.toISOString().split("T")[0]
  }

  private getFollowUpStrategy(lead: UnifiedLead): string {
    if (lead.urgency >= 8) return "Llamada inmediata + WhatsApp + Email"
    if (lead.urgency >= 6) return "Llamada en 2 horas + Email con cotización"
    if (lead.urgency >= 4) return "Email hoy + Llamada mañana"
    return "Email educativo + Seguimiento en 3 días"
  }
}
