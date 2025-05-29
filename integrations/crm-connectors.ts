// Configuración centralizada de CRMs
export const CRM_CONFIGS = {
  zapier: {
    name: "Zapier",
    webhook_url: "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/",
    auth_type: "webhook",
    features: ["lead_capture", "automation", "multi_platform"],
    setup_difficulty: "easy",
  },
  hubspot: {
    name: "HubSpot",
    api_url: "https://api.hubapi.com",
    auth_type: "oauth2",
    features: ["contacts", "deals", "companies", "tasks", "emails"],
    setup_difficulty: "medium",
  },
  pipedrive: {
    name: "Pipedrive",
    api_url: "https://api.pipedrive.com/v1",
    auth_type: "api_key",
    features: ["persons", "deals", "organizations", "activities"],
    setup_difficulty: "easy",
  },
  salesforce: {
    name: "Salesforce",
    api_url: "https://your-instance.salesforce.com/services/data/v58.0",
    auth_type: "oauth2",
    features: ["leads", "contacts", "opportunities", "accounts"],
    setup_difficulty: "hard",
  },
  kommo: {
    name: "Kommo (amoCRM)",
    api_url: "https://your-domain.kommo.com/api/v4",
    auth_type: "oauth2",
    features: ["leads", "contacts", "companies", "tasks"],
    setup_difficulty: "medium",
  },
}

// Interface unificada para leads
export interface UnifiedLead {
  // Datos básicos
  name: string
  phone: string
  email?: string

  // Datos del seguro
  insurance_type: "auto" | "hogar" | "salud" | "vida" | "comercial"
  urgency: number // 1-10
  budget_range: string
  current_insurance: boolean

  // Datos específicos por tipo
  auto_info?: {
    brand: string
    model: string
    year: number
    type: "0km" | "usado" | "clasico"
    location: string
  }

  home_info?: {
    property_type: "casa" | "departamento" | "ph" | "quinta"
    location: string
    value_range: string
    ownership: "propio" | "alquilado" | "inversion"
  }

  // Scoring y seguimiento
  lead_score: number
  lead_source: string
  conversation_history: string[]
  last_interaction: Date
  next_follow_up: Date

  // Metadatos
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

// Define the connector classes (replace with actual implementations)
class ZapierConnector {}
class HubSpotConnector {}
class PipedriveConnector {}
class SalesforceConnector {}
class KommoConnector {}

// Factory para crear conectores
export class CRMConnectorFactory {
  static create(crmType: keyof typeof CRM_CONFIGS) {
    switch (crmType) {
      case "zapier":
        return new ZapierConnector()
      case "hubspot":
        return new HubSpotConnector()
      case "pipedrive":
        return new PipedriveConnector()
      case "salesforce":
        return new SalesforceConnector()
      case "kommo":
        return new KommoConnector()
      default:
        throw new Error(`CRM type ${crmType} not supported`)
    }
  }
}
