import { sendInteractiveMessage, sendTemplate } from "./messages"
import { WHATSAPP_BUSINESS_CONFIG } from "./config"

export class WhatsAppConversationHandler {
  private userSessions: Map<string, any> = new Map()

  async handleIncomingMessage(webhookData: any) {
    const message = webhookData.entry[0].changes[0].value.messages[0]
    const from = message.from
    const messageType = message.type

    // Obtener o crear sesión del usuario
    const session = this.userSessions.get(from) || {
      step: "initial",
      data: {},
      lastActivity: Date.now(),
    }

    switch (messageType) {
      case "text":
        return await this.handleTextMessage(from, message.text.body, session)
      case "interactive":
        return await this.handleInteractiveMessage(from, message.interactive, session)
      case "button":
        return await this.handleButtonMessage(from, message.button, session)
      default:
        return await this.handleUnsupportedMessage(from)
    }
  }

  private async handleTextMessage(from: string, text: string, session: any) {
    const lowerText = text.toLowerCase()

    // Detección de intención inicial
    if (session.step === "initial") {
      if (lowerText.includes("auto") || lowerText.includes("coche") || lowerText.includes("vehiculo")) {
        session.step = "auto_qualification"
        session.data.insuranceType = "auto"
        this.userSessions.set(from, session)
        return await sendInteractiveMessage(from, "auto_quick_quote")
      }

      if (lowerText.includes("casa") || lowerText.includes("hogar") || lowerText.includes("departamento")) {
        session.step = "home_qualification"
        session.data.insuranceType = "hogar"
        this.userSessions.set(from, session)
        return await this.sendHomeQualificationMessage(from)
      }

      // Si no detecta intención específica, mostrar menú
      return await sendInteractiveMessage(from, "main_menu")
    }

    // Manejo según el paso actual
    switch (session.step) {
      case "auto_qualification":
        return await this.handleAutoQualification(from, text, session)
      case "home_qualification":
        return await this.handleHomeQualification(from, text, session)
      case "collecting_contact":
        return await this.handleContactCollection(from, text, session)
      default:
        return await this.handleGeneralQuery(from, text, session)
    }
  }

  private async handleInteractiveMessage(from: string, interactive: any, session: any) {
    const buttonId = interactive.button_reply?.id || interactive.list_reply?.id

    switch (buttonId) {
      case "cotizar_auto":
        session.step = "auto_qualification"
        session.data.insuranceType = "auto"
        this.userSessions.set(from, session)
        return await sendInteractiveMessage(from, "auto_quick_quote")

      case "cotizar_hogar":
        session.step = "home_qualification"
        session.data.insuranceType = "hogar"
        this.userSessions.set(from, session)
        return await this.sendHomeQualificationMessage(from)

      case "auto_0km":
        session.data.carType = "0km"
        this.userSessions.set(from, session)
        return await this.sendCarBrandMessage(from)

      case "auto_usado":
        session.data.carType = "usado"
        this.userSessions.set(from, session)
        return await this.sendCarBrandMessage(from)

      case "urgente_hoy":
        session.data.urgency = 10
        this.userSessions.set(from, session)
        return await this.sendUrgentResponse(from, session)

      case "esta_semana":
        session.data.urgency = 7
        this.userSessions.set(from, session)
        return await this.sendStandardResponse(from, session)

      case "sin_apuro":
        session.data.urgency = 3
        this.userSessions.set(from, session)
        return await this.sendEducationalResponse(from, session)

      default:
        return await this.handleUnknownInteraction(from, buttonId)
    }
  }

  private async sendCarBrandMessage(from: string) {
    const message = {
      messaging_product: "whatsapp",
      to: from,
      type: "text",
      text: {
        body: "Perfecto! 🚗\n\n¿Qué marca y modelo es tu auto?\n\nEjemplo: Toyota Corolla 2023\n\nEsto me ayuda a conseguirte el mejor precio.",
      },
    }

    return await this.sendMessage(message)
  }

  private async sendUrgentResponse(from: string, session: any) {
    // Para casos urgentes, activar template de urgencia
    const components = [
      {
        type: "body",
        parameters: [
          { type: "text", text: session.data.name || "Cliente" },
          { type: "text", text: "La Caja Seguros" },
          { type: "text", text: "3.200" },
          { type: "text", text: "Sancor Seguros" },
          { type: "text", text: "3.800" },
        ],
      },
    ]

    return await sendTemplate(from, "urgent_activation", "es", components)
  }

  private async handleAutoQualification(from: string, text: string, session: any) {
    // Procesar información del auto
    session.data.carInfo = text
    session.step = "collecting_location"
    this.userSessions.set(from, session)

    const message = {
      messaging_product: "whatsapp",
      to: from,
      type: "text",
      text: {
        body: `Excelente, un ${text}! 👍\n\n¿En qué zona lo usás principalmente?\n\nEsto afecta el precio del seguro:\n\n📍 CABA\n📍 GBA Norte/Sur/Oeste\n📍 Interior (¿qué ciudad?)`,
      },
    }

    return await this.sendMessage(message)
  }

  private async sendMessage(message: any) {
    const response = await fetch(
      `${WHATSAPP_BUSINESS_CONFIG.base_url}/${WHATSAPP_BUSINESS_CONFIG.api_version}/${WHATSAPP_BUSINESS_CONFIG.phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_BUSINESS_CONFIG.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      },
    )

    return response.json()
  }

  // Limpiar sesiones inactivas (ejecutar cada hora)
  cleanInactiveSessions() {
    const now = Date.now()
    const maxInactivity = 24 * 60 * 60 * 1000 // 24 horas

    for (const [userId, session] of this.userSessions.entries()) {
      if (now - session.lastActivity > maxInactivity) {
        this.userSessions.delete(userId)
      }
    }
  }
}

// Instancia global del manejador
export const conversationHandler = new WhatsAppConversationHandler()
