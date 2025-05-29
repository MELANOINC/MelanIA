import { type NextRequest, NextResponse } from "next/server"
import { conversationHandler } from "./conversation-handler"
import { WHATSAPP_BUSINESS_CONFIG } from "@/config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verificar que es un mensaje entrante
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      await conversationHandler.handleIncomingMessage(body)
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  // Verificación del webhook
  if (mode === "subscribe" && token === WHATSAPP_BUSINESS_CONFIG.webhook_verify_token) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}
