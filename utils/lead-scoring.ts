export interface Lead {
  name: string
  phone: string
  email: string
  insuranceType: string
  urgency: number // 1-10
  budget: string
  currentInsurance: boolean
  responses: string[]
  score: number
  category: "hot" | "warm" | "cold"
}

export function calculateLeadScore(lead: Partial<Lead>): number {
  let score = 0

  // Urgency scoring (40% weight)
  if (lead.urgency) {
    score += (lead.urgency / 10) * 40
  }

  // Response quality (30% weight)
  if (lead.responses && lead.responses.length > 0) {
    const avgResponseLength = lead.responses.reduce((acc, resp) => acc + resp.length, 0) / lead.responses.length
    if (avgResponseLength > 50) score += 30
    else if (avgResponseLength > 20) score += 20
    else score += 10
  }

  // Contact info completeness (20% weight)
  let contactScore = 0
  if (lead.name) contactScore += 7
  if (lead.phone) contactScore += 7
  if (lead.email) contactScore += 6
  score += contactScore

  // Budget defined (10% weight)
  if (lead.budget && lead.budget !== "no_budget") {
    score += 10
  }

  return Math.min(score, 100)
}

export function categorizeLeadByScore(score: number): "hot" | "warm" | "cold" {
  if (score >= 70) return "hot"
  if (score >= 40) return "warm"
  return "cold"
}

export function getFollowUpStrategy(category: "hot" | "warm" | "cold"): string {
  switch (category) {
    case "hot":
      return "Llamada inmediata + WhatsApp + Email con cotización"
    case "warm":
      return "WhatsApp en 2 horas + Email con comparativo + Llamada en 24hs"
    case "cold":
      return "Email con contenido educativo + WhatsApp en 3 días + Remarketing"
    default:
      return "Seguimiento estándar"
  }
}
