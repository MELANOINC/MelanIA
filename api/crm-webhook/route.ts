import { type NextRequest, NextResponse } from "next/server"
import { crmManager } from "@/integrations/unified-crm-manager"

export async function POST(request: NextRequest) {
  try {
    const whatsappData = await request.json()

    // Validar datos mínimos requeridos
    if (!whatsappData.telefono && !whatsappData.phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // Procesar lead desde WhatsApp
    const lead = await crmManager.processWhatsAppLead(whatsappData)

    // Distribuir a todos los CRMs configurados
    const result = await crmManager.distributeLeadToAllCRMs(lead)

    // Log para debugging
    console.log("Lead processed:", {
      name: lead.name,
      phone: lead.phone,
      insurance_type: lead.insurance_type,
      score: lead.lead_score,
      urgency: lead.urgency,
      crm_results: result.results,
    })

    return NextResponse.json({
      success: result.success,
      lead_id: `${Date.now()}-${lead.phone.slice(-4)}`,
      lead_score: lead.lead_score,
      urgency: lead.urgency,
      next_follow_up: lead.next_follow_up,
      crm_results: result.results,
      errors: result.errors,
    })
  } catch (error) {
    console.error("Error processing CRM webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Endpoint para verificar estado de las integraciones
  const stats = crmManager.getStats()

  return NextResponse.json({
    status: "active",
    ...stats,
    timestamp: new Date().toISOString(),
  })
}
