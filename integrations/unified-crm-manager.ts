import type { UnifiedLead } from "./crm-connectors"
import { ZapierConnector } from "./zapier-connector"
import { HubSpotConnector } from "./hubspot-connector"
import { PipedriveConnector } from "./pipedrive-connector"

export class UnifiedCRMManager {
  private enabledCRMs: string[] = []
  private connectors: Map<string, any> = new Map()

  constructor() {
    this.initializeConnectors()
  }

  private initializeConnectors() {
    // Inicializar conectores basado en variables de entorno
    if (process.env.ZAPIER_WEBHOOK_URL) {
      this.enabledCRMs.push("zapier")
      this.connectors.set("zapier", new ZapierConnector())
    }

    if (process.env.HUBSPOT_API_KEY) {
      this.enabledCRMs.push("hubspot")
      this.connectors.set("hubspot", new HubSpotConnector())
    }

    if (process.env.PIPEDRIVE_API_TOKEN) {
      this.enabledCRMs.push("pipedrive")
      this.connectors.set("pipedrive", new PipedriveConnector())
    }

    console.log(`CRM Manager initialized with: ${this.enabledCRMs.join(", ")}`)
  }

  async distributeLeadToAllCRMs(lead: UnifiedLead): Promise<{
    success: boolean
    results: Record<string, any>
    errors: Record<string, string>
  }> {
    const results: Record<string, any> = {}
    const errors: Record<string, string> = {}
    let overallSuccess = true

    // Enviar a todos los CRMs habilitados en paralelo
    const promises = this.enabledCRMs.map(async (crmName) => {
      try {
        const connector = this.connectors.get(crmName)
        if (connector) {
          const result = await connector.sendLead(lead)
          results[crmName] = result

          if (!result.success && result.success !== undefined) {
            overallSuccess = false
            errors[crmName] = "Failed to send lead"
          }
        }
      } catch (error) {
        overallSuccess = false
        errors[crmName] = error instanceof Error ? error.message : "Unknown error"
        console.error(`Error sending lead to ${crmName}:`, error)
      }
    })

    await Promise.allSettled(promises)

    return {
      success: overallSuccess,
      results,
      errors,
    }
  }

  async sendToSpecificCRM(lead: UnifiedLead, crmName: string): Promise<any> {
    const connector = this.connectors.get(crmName)
    if (!connector) {
      throw new Error(`CRM ${crmName} not configured or not supported`)
    }

    return await connector.sendLead(lead)
  }

  // Método para procesar leads desde WhatsApp
  async processWhatsAppLead(whatsappData: any): Promise<UnifiedLead> {
    // Convertir datos de WhatsApp a formato unificado
    const lead: UnifiedLead = {
      name: whatsappData.nombre || whatsappData.name || "Lead WhatsApp",
      phone: whatsappData.telefono || whatsappData.phone,
      email: whatsappData.email,

      insurance_type: whatsappData.tipo_seguro || "auto",
      urgency: Number.parseInt(whatsappData.urgencia) || 5,
      budget_range: whatsappData.presupuesto || "medio",
      current_insurance: whatsappData.tiene_seguro_actual || false,

      lead_score: this.calculateLeadScore(whatsappData),
      lead_source: "ALEXIA_WHATSAPP",
      conversation_history: whatsappData.historial_conversacion?.split("---") || [],
      last_interaction: new Date(),
      next_follow_up: this.calculateNextFollowUp(Number.parseInt(whatsappData.urgencia) || 5),

      utm_source: whatsappData.utm_source,
      utm_medium: whatsappData.utm_medium,
      utm_campaign: whatsappData.utm_campaign,
    }

    // Agregar información específica del auto si existe
    if (whatsappData.auto_marca) {
      lead.auto_info = {
        brand: whatsappData.auto_marca,
        model: whatsappData.auto_modelo || "",
        year: Number.parseInt(whatsappData.auto_año) || new Date().getFullYear(),
        type: whatsappData.auto_tipo || "usado",
        location: whatsappData.auto_ubicacion || "",
      }
    }

    // Agregar información del hogar si existe
    if (whatsappData.propiedad_tipo) {
      lead.home_info = {
        property_type: whatsappData.propiedad_tipo,
        location: whatsappData.propiedad_ubicacion || "",
        value_range: whatsappData.propiedad_valor || "",
        ownership: whatsappData.propiedad_tenencia || "propio",
      }
    }

    return lead
  }

  private calculateLeadScore(data: any): number {
    let score = 0

    // Urgencia (40% del score)
    const urgency = Number.parseInt(data.urgencia) || 5
    score += (urgency / 10) * 40

    // Información completa (30% del score)
    let completeness = 0
    if (data.nombre) completeness += 10
    if (data.telefono) completeness += 10
    if (data.email) completeness += 5
    if (data.tipo_seguro) completeness += 5
    score += completeness

    // Presupuesto definido (20% del score)
    if (data.presupuesto && data.presupuesto !== "no_definido") {
      score += 20
    }

    // Información específica (10% del score)
    if (data.auto_marca || data.propiedad_tipo) {
      score += 10
    }

    return Math.min(score, 100)
  }

  private calculateNextFollowUp(urgency: number): Date {
    const now = new Date()
    const hoursToAdd = urgency >= 8 ? 2 : urgency >= 6 ? 24 : urgency >= 4 ? 48 : 72
    return new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000)
  }

  // Método para obtener estadísticas
  getStats(): {
    enabledCRMs: string[]
    totalConnectors: number
    lastProcessed?: Date
  } {
    return {
      enabledCRMs: this.enabledCRMs,
      totalConnectors: this.connectors.size,
    }
  }
}

// Instancia global
export const crmManager = new UnifiedCRMManager()
