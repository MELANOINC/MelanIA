// Real Estate specific CRM integrations
export const REALESTATE_CRM_CONFIGS = {
  followUpBoss: {
    name: "Follow Up Boss",
    api_url: "https://api.followupboss.com/v1",
    auth_type: "api_key",
    features: ["contacts", "leads", "events", "tags", "sources"],
    setup_difficulty: "easy",
    pricing: "$69/month per user",
  },

  chime: {
    name: "Chime CRM",
    api_url: "https://api.chime.me/v1",
    auth_type: "oauth2",
    features: ["contacts", "transactions", "marketing", "websites"],
    setup_difficulty: "medium",
    pricing: "$40/month per user",
  },

  kvcore: {
    name: "kvCORE",
    api_url: "https://api.kvcore.com/public/v1",
    auth_type: "api_key",
    features: ["leads", "listings", "marketing", "websites", "crm"],
    setup_difficulty: "medium",
    pricing: "$129/month per user",
  },

  topProducer: {
    name: "Top Producer",
    api_url: "https://api.topproducer.com/v1",
    auth_type: "oauth2",
    features: ["contacts", "transactions", "marketing", "calendar"],
    setup_difficulty: "hard",
    pricing: "$40/month per user",
  },

  realGeeks: {
    name: "Real Geeks",
    api_url: "https://api.realgeeks.com/v1",
    auth_type: "api_key",
    features: ["leads", "websites", "crm", "marketing"],
    setup_difficulty: "easy",
    pricing: "$249/month unlimited users",
  },

  boomtown: {
    name: "BoomTown",
    api_url: "https://api.boomtownroi.com/v1",
    auth_type: "oauth2",
    features: ["leads", "crm", "marketing", "websites", "analytics"],
    setup_difficulty: "hard",
    pricing: "Custom enterprise pricing",
  },
}

export class RealEstateCRMConnector {
  private crmType: string
  private config: any

  constructor(crmType: keyof typeof REALESTATE_CRM_CONFIGS, apiKey: string) {
    this.crmType = crmType
    this.config = REALESTATE_CRM_CONFIGS[crmType]
    this.config.api_key = apiKey
  }

  async sendLead(lead: RealEstateLead): Promise<{ success: boolean; contact_id?: string; error?: string }> {
    try {
      switch (this.crmType) {
        case "followUpBoss":
          return await this.sendToFollowUpBoss(lead)
        case "chime":
          return await this.sendToChime(lead)
        case "kvcore":
          return await this.sendToKvCore(lead)
        case "realGeeks":
          return await this.sendToRealGeeks(lead)
        default:
          throw new Error(`CRM type ${this.crmType} not implemented`)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private async sendToFollowUpBoss(lead: RealEstateLead) {
    const payload = {
      firstName: lead.name.split(" ")[0],
      lastName: lead.name.split(" ").slice(1).join(" "),
      emails: [{ value: lead.email, type: "personal" }],
      phones: [{ value: lead.phone, type: "mobile" }],

      // Custom fields
      customFields: {
        property_type: lead.propertyType,
        intent: lead.intent,
        timeline: lead.timeline,
        budget: lead.budget,
        location_preference: lead.location,
        lead_score: lead.score,
        lead_source: "ARIA_BOT",
        urgency_level: lead.urgency,
      },

      // Tags for segmentation
      tags: [lead.intent, lead.category, `score_${Math.floor(lead.score / 10) * 10}`, "aria_bot"],

      // Source tracking
      source: "ARIA Bot - Melano Inc",

      // Notes
      note: `Lead captured via ARIA bot:
Intent: ${lead.intent}
Property Type: ${lead.propertyType}
Timeline: ${lead.timeline}
Budget: ${lead.budget}
Location: ${lead.location}
Score: ${lead.score}/100

Conversation Summary:
${lead.responses.join("\n")}`,
    }

    const response = await fetch(`${this.config.api_url}/people`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, contact_id: result.id }
    } else {
      return { success: false, error: result.message || "Failed to create contact" }
    }
  }

  private async sendToChime(lead: RealEstateLead) {
    const payload = {
      contact: {
        first_name: lead.name.split(" ")[0],
        last_name: lead.name.split(" ").slice(1).join(" "),
        email: lead.email,
        phone: lead.phone,

        // Chime specific fields
        lead_source: "ARIA Bot",
        property_interest: lead.propertyType,
        buying_timeline: lead.timeline,
        price_range: lead.budget,
        preferred_areas: lead.location,

        // Custom properties
        custom_fields: {
          intent: lead.intent,
          lead_score: lead.score,
          urgency: lead.urgency,
          qualification_notes: lead.responses.join(" | "),
        },

        tags: [lead.intent, lead.category, "aria_qualified"],
      },
    }

    const response = await fetch(`${this.config.api_url}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    return response.ok ? { success: true, contact_id: result.contact.id } : { success: false, error: result.error }
  }

  private async sendToKvCore(lead: RealEstateLead) {
    const payload = {
      first_name: lead.name.split(" ")[0],
      last_name: lead.name.split(" ").slice(1).join(" "),
      email: lead.email,
      phone: lead.phone,

      // kvCORE lead fields
      lead_source: "ARIA Bot - Melano Inc",
      property_types: [lead.propertyType],
      price_min: this.extractMinPrice(lead.budget),
      price_max: this.extractMaxPrice(lead.budget),
      areas: [lead.location],

      // Custom data
      custom_data: {
        intent: lead.intent,
        timeline: lead.timeline,
        lead_score: lead.score,
        urgency_level: lead.urgency,
        bot_conversation: lead.responses.join(" | "),
        qualification_category: lead.category,
      },

      // Lead status based on score
      status: lead.score >= 75 ? "hot" : lead.score >= 45 ? "warm" : "cold",

      notes: `ARIA Bot Qualification:
- Intent: ${lead.intent}
- Timeline: ${lead.timeline}
- Budget: ${lead.budget}
- Score: ${lead.score}/100
- Category: ${lead.category}

Key responses: ${lead.responses.slice(-3).join("; ")}`,
    }

    const response = await fetch(`${this.config.api_url}/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    return response.ok ? { success: true, contact_id: result.lead_id } : { success: false, error: result.message }
  }

  private async sendToRealGeeks(lead: RealEstateLead) {
    const payload = {
      lead: {
        first_name: lead.name.split(" ")[0],
        last_name: lead.name.split(" ").slice(1).join(" "),
        email: lead.email,
        phone: lead.phone,

        // Real Geeks specific
        source: "ARIA Bot",
        property_type: lead.propertyType,
        min_price: this.extractMinPrice(lead.budget),
        max_price: this.extractMaxPrice(lead.budget),
        locations: [lead.location],

        // Lead qualification
        lead_temperature: lead.category,
        timeline: lead.timeline,
        notes: `ARIA Bot Lead - Score: ${lead.score}/100
Intent: ${lead.intent}
Urgency: ${lead.urgency}/10
Responses: ${lead.responses.join(" | ")}`,

        // Tags for segmentation
        tags: [
          `intent_${lead.intent}`,
          `score_${lead.category}`,
          `timeline_${lead.timeline.replace(/\s+/g, "_")}`,
          "aria_bot_qualified",
        ],
      },
    }

    const response = await fetch(`${this.config.api_url}/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    return response.ok
      ? { success: true, contact_id: result.id }
      : { success: false, error: result.errors?.join(", ") || "Failed to create lead" }
  }

  private extractMinPrice(budget: string): number {
    const match = budget.match(/\$?([\d,]+)/)
    return match ? Number.parseInt(match[1].replace(/,/g, "")) : 0
  }

  private extractMaxPrice(budget: string): number {
    const matches = budget.match(/\$?([\d,]+)/g)
    if (matches && matches.length > 1) {
      return Number.parseInt(matches[1].replace(/[$,]/g, ""))
    }
    return this.extractMinPrice(budget) * 1.5 // Estimate max as 1.5x min
  }
}

// Import the RealEstateLead type
import type { RealEstateLead } from "../utils/lead-scoring-realestate"
