export const WHATSAPP_CONFIG = {
  // WhatsApp Cloud API configuration
  phone_number_id: "YOUR_PHONE_NUMBER_ID",
  access_token: "YOUR_ACCESS_TOKEN",
  webhook_verify_token: "YOUR_VERIFY_TOKEN",
  api_url: "https://graph.facebook.com/v18.0",
}

export interface WhatsAppMessage {
  to: string
  type: "text" | "template" | "interactive"
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: string
    }
    components?: any[]
  }
}

export async function sendWhatsAppMessage(message: WhatsAppMessage) {
  const url = `${WHATSAPP_CONFIG.api_url}/${WHATSAPP_CONFIG.phone_number_id}/messages`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_CONFIG.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })

    return await response.json()
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    throw error
  }
}

// Predefined message templates
export const WHATSAPP_TEMPLATES = {
  welcome: {
    name: "welcome_insurance",
    language: { code: "es" },
  },
  quote_ready: {
    name: "quote_ready",
    language: { code: "es" },
  },
  follow_up: {
    name: "follow_up_insurance",
    language: { code: "es" },
  },
}
