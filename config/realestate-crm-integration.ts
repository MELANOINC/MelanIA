export interface RealEstateCRMConfig {
  webhook_url: string
  api_key: string
  lead_source: string
  agent_assignment_rules: AgentAssignmentRule[]
}

export interface AgentAssignmentRule {
  condition: string
  agent_id: string
  agent_name: string
  specialization: string[]
}

export const REALESTATE_CRM_ENDPOINTS = {
  // Top Producer CRM
  topProducer: "https://api.topproducer.com/v1/leads",

  // Chime CRM
  chime: "https://api.chime.me/v1/contacts",

  // Follow Up Boss
  followUpBoss: "https://api.followupboss.com/v1/people",

  // KvCORE
  kvcore: "https://api.kvcore.com/public/v1/leads",

  // Real Geeks
  realGeeks: "https://api.realgeeks.com/v1/leads",

  // BoomTown
  boomtown: "https://api.boomtownroi.com/v1/leads",

  // Wise Agent
  wiseAgent: "https://api.wiseagent.com/v1/contacts",
}

export interface RealEstateLead {
  name: string
  phone: string
  email: string
  propertyType: string
  intent: string
  timeline: string
  budget: string
  location: string
  financing: string
  score: number
  category: string
  urgency: number
  responses: string[]
}

export async function sendRealEstateLeadToCRM(lead: RealEstateLead, config: RealEstateCRMConfig) {
  const assignedAgent = assignLeadToAgent(lead, config.agent_assignment_rules)

  const payload = {
    // Basic lead info
    first_name: lead.name.split(" ")[0],
    last_name: lead.name.split(" ").slice(1).join(" "),
    phone: lead.phone,
    email: lead.email,

    // Real estate specific
    property_type: lead.propertyType,
    intent: lead.intent,
    timeline: lead.timeline,
    budget: lead.budget,
    preferred_location: lead.location,
    financing_status: lead.financing,

    // Lead scoring
    lead_score: lead.score,
    lead_category: lead.category,
    urgency_level: lead.urgency,

    // Assignment
    assigned_agent_id: assignedAgent?.agent_id,
    assigned_agent_name: assignedAgent?.agent_name,

    // Source tracking
    lead_source: config.lead_source,
    source_detail: "ARIA_BOT",
    capture_timestamp: new Date().toISOString(),

    // Follow-up strategy
    follow_up_strategy: getRealEstateFollowUpStrategy(lead.category, lead.intent),
    next_contact_date: calculateNextContactDate(lead.urgency),

    // Custom fields
    bot_conversation_summary: lead.responses.join(" | "),
    qualification_notes: generateQualificationNotes(lead),
  }

  try {
    const response = await fetch(config.webhook_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.api_key}`,
      },
      body: JSON.stringify(payload),
    })

    return response.ok
  } catch (error) {
    console.error("Error sending real estate lead to CRM:", error)
    return false
  }
}

function assignLeadToAgent(lead: RealEstateLead, rules: AgentAssignmentRule[]): AgentAssignmentRule | null {
  // Priority assignment based on lead characteristics
  for (const rule of rules) {
    if (evaluateAssignmentCondition(rule.condition, lead)) {
      return rule
    }
  }
  return null
}

function evaluateAssignmentCondition(condition: string, lead: RealEstateLead): boolean {
  // Simple condition evaluation - can be expanded
  if (condition.includes("luxury") && lead.budget.includes("$1M+")) return true
  if (condition.includes("commercial") && lead.propertyType.includes("commercial")) return true
  if (condition.includes("investment") && lead.intent === "investing") return true
  if (condition.includes("first-time") && lead.responses.some((r) => r.includes("first time"))) return true

  return false
}

function calculateNextContactDate(urgency: number): string {
  const now = new Date()
  const hoursToAdd = urgency >= 8 ? 1 : urgency >= 6 ? 4 : urgency >= 4 ? 24 : 72
  const nextContact = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000)
  return nextContact.toISOString()
}

function generateQualificationNotes(lead: RealEstateLead): string {
  return `
Lead qualified via ARIA bot:
- Intent: ${lead.intent}
- Timeline: ${lead.timeline}
- Budget: ${lead.budget}
- Location: ${lead.location}
- Score: ${lead.score}/100
- Category: ${lead.category.toUpperCase()}
- Key responses: ${lead.responses.slice(-3).join("; ")}
  `.trim()
}

// Import the function from the lead scoring file
import { getRealEstateFollowUpStrategy } from "./lead-scoring-realestate"
