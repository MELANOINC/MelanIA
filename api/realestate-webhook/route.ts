import { type NextRequest, NextResponse } from "next/server"
import { RealEstateCRMConnector } from "@/integrations/realestate-crm-connectors"
import { calculateRealEstateLeadScore, categorizeRealEstateLeadByScore } from "@/utils/lead-scoring-realestate"
import type { RealEstateLead } from "@/utils/lead-scoring-realestate"

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    // Validate required fields
    if (!leadData.phone && !leadData.email) {
      return NextResponse.json({ error: "Phone or email is required" }, { status: 400 })
    }

    // Process and score the lead
    const lead: RealEstateLead = {
      name: leadData.name || "Unknown Lead",
      phone: leadData.phone || "",
      email: leadData.email || "",
      propertyType: leadData.property_type || leadData.propertyType || "residential",
      intent: leadData.intent || "buying",
      timeline: leadData.timeline || "not_specified",
      budget: leadData.budget || "not_specified",
      location: leadData.location || leadData.preferred_location || "",
      financing: leadData.financing || "not_specified",
      urgency: Number.parseInt(leadData.urgency) || 5,
      responses: leadData.responses || leadData.conversation_history?.split("|") || [],
      score: 0, // Will be calculated
      category: "cool", // Will be determined by score
      source: leadData.source || "ARIA_BOT",
    }

    // Calculate lead score and category
    lead.score = calculateRealEstateLeadScore(lead)
    lead.category = categorizeRealEstateLeadByScore(lead.score)

    // Send to configured CRMs
    const results: Record<string, any> = {}
    const errors: Record<string, string> = {}

    // Check which CRMs are configured
    const configuredCRMs = []

    if (process.env.FOLLOWUPBOSS_API_KEY) {
      configuredCRMs.push({ type: "followUpBoss", key: process.env.FOLLOWUPBOSS_API_KEY })
    }

    if (process.env.CHIME_API_KEY) {
      configuredCRMs.push({ type: "chime", key: process.env.CHIME_API_KEY })
    }

    if (process.env.KVCORE_API_KEY) {
      configuredCRMs.push({ type: "kvcore", key: process.env.KVCORE_API_KEY })
    }

    if (process.env.REALGEEKS_API_KEY) {
      configuredCRMs.push({ type: "realGeeks", key: process.env.REALGEEKS_API_KEY })
    }

    // Send to all configured CRMs
    for (const crm of configuredCRMs) {
      try {
        const connector = new RealEstateCRMConnector(crm.type as any, crm.key)
        const result = await connector.sendLead(lead)
        results[crm.type] = result

        if (!result.success) {
          errors[crm.type] = result.error || "Unknown error"
        }
      } catch (error) {
        errors[crm.type] = error instanceof Error ? error.message : "Connection failed"
      }
    }

    // Log for analytics
    console.log("Real Estate Lead Processed:", {
      name: lead.name,
      intent: lead.intent,
      property_type: lead.propertyType,
      score: lead.score,
      category: lead.category,
      timeline: lead.timeline,
      crm_results: Object.keys(results),
    })

    // Determine next actions based on lead score
    const nextActions = getNextActions(lead)

    return NextResponse.json({
      success: true,
      lead_id: `RE_${Date.now()}_${lead.phone.slice(-4)}`,
      lead_score: lead.score,
      lead_category: lead.category,
      urgency_level: lead.urgency,
      next_actions: nextActions,
      crm_results: results,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
      recommendations: getLeadRecommendations(lead),
    })
  } catch (error) {
    console.error("Error processing real estate lead:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  // Health check and configuration status
  const configuredCRMs = []

  if (process.env.FOLLOWUPBOSS_API_KEY) configuredCRMs.push("Follow Up Boss")
  if (process.env.CHIME_API_KEY) configuredCRMs.push("Chime")
  if (process.env.KVCORE_API_KEY) configuredCRMs.push("kvCORE")
  if (process.env.REALGEEKS_API_KEY) configuredCRMs.push("Real Geeks")

  return NextResponse.json({
    status: "active",
    service: "Real Estate Lead Processing",
    configured_crms: configuredCRMs,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  })
}

function getNextActions(lead: RealEstateLead): string[] {
  const actions = []

  if (lead.category === "hot") {
    actions.push("Immediate phone call within 1 hour")
    actions.push("Send property matches within 2 hours")
    actions.push("Schedule showing within 24 hours")
    if (lead.intent === "selling") {
      actions.push("Schedule home valuation appointment")
    }
  } else if (lead.category === "warm") {
    actions.push("Phone call within 4 hours")
    actions.push("Email with market analysis")
    actions.push("Follow-up call in 48 hours")
    actions.push("Add to weekly newsletter")
  } else {
    actions.push("Email with buyer/seller guide")
    actions.push("Add to monthly market updates")
    actions.push("Follow-up call in 1 week")
    actions.push("Retargeting campaign enrollment")
  }

  return actions
}

function getLeadRecommendations(lead: RealEstateLead): Record<string, any> {
  const recommendations: Record<string, any> = {
    agent_specialization: [],
    marketing_approach: "",
    follow_up_frequency: "",
    content_suggestions: [],
  }

  // Agent specialization recommendations
  if (lead.intent === "investing") {
    recommendations.agent_specialization.push("Investment specialist")
  }
  if (lead.budget.includes("$1M") || lead.budget.includes("luxury")) {
    recommendations.agent_specialization.push("Luxury market expert")
  }
  if (lead.responses.some((r) => r.toLowerCase().includes("first time"))) {
    recommendations.agent_specialization.push("First-time buyer specialist")
  }

  // Marketing approach
  if (lead.category === "hot") {
    recommendations.marketing_approach = "High-touch, immediate response"
  } else if (lead.category === "warm") {
    recommendations.marketing_approach = "Educational nurturing with regular check-ins"
  } else {
    recommendations.marketing_approach = "Long-term nurturing with valuable content"
  }

  // Follow-up frequency
  recommendations.follow_up_frequency = {
    hot: "Daily for first week, then weekly",
    warm: "Weekly for first month, then bi-weekly",
    cool: "Monthly with quarterly personal outreach",
  }[lead.category]

  // Content suggestions
  if (lead.intent === "buying") {
    recommendations.content_suggestions = [
      "Buyer's guide for " + lead.location,
      "Market trends in preferred area",
      "Financing options and pre-approval tips",
      "Home inspection checklist",
    ]
  } else if (lead.intent === "selling") {
    recommendations.content_suggestions = [
      "Home preparation checklist",
      "Market analysis for their area",
      "Pricing strategy guide",
      "Staging tips and recommendations",
    ]
  }

  return recommendations
}
