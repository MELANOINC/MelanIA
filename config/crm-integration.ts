export interface CRMConfig {
  webhook_url: string
  api_key: string
  lead_source: string
}

export const CRM_ENDPOINTS = {
  // Zapier webhook for lead capture
  zapier: "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/",

  // Kommo CRM integration
  kommo: "https://YOUR_DOMAIN.kommo.com/api/v4/leads",

  // HubSpot integration
  hubspot: "https://api.hubapi.com/crm/v3/objects/contacts",

  // Pipedrive integration
  pipedrive: "https://api.pipedrive.com/v1/persons",
}

import type { Lead } from "../types/lead" // Assuming Lead type is defined in types/lead.ts

// Mock function for getFollowUpStrategy, replace with actual implementation
const getFollowUpStrategy = (category: string) => {
  // Replace with your actual logic to determine follow-up strategy based on category
  return `Follow up based on ${category}`
}

export async function sendLeadToCRM(lead: Lead, config: CRMConfig) {
  const payload = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    insurance_type: lead.insuranceType,
    urgency: lead.urgency,
    score: lead.score,
    category: lead.category,
    source: "ALEXIA_BOT",
    timestamp: new Date().toISOString(),
    follow_up_strategy: getFollowUpStrategy(lead.category),
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
    console.error("Error sending lead to CRM:", error)
    return false
  }
}
