export interface RealEstateLead {
  name: string
  phone: string
  email: string
  propertyType: string
  intent: "buying" | "selling" | "investing" | "renting"
  timeline: string
  budget: string
  location: string
  financing: string
  urgency: number // 1-10
  responses: string[]
  score: number
  category: "hot" | "warm" | "cool"
  source: string
}

export function calculateRealEstateLeadScore(lead: Partial<RealEstateLead>): number {
  let score = 0

  // Timeline urgency (35% weight)
  if (lead.timeline) {
    switch (lead.timeline.toLowerCase()) {
      case "immediately":
      case "within 30 days":
        score += 35
        break
      case "within 3 months":
        score += 25
        break
      case "within 6 months":
        score += 15
        break
      case "within a year":
        score += 8
        break
      default:
        score += 3
    }
  }

  // Budget qualification (25% weight)
  if (lead.budget && lead.budget !== "not_specified") {
    if (lead.budget.includes("pre-approved") || lead.budget.includes("cash")) {
      score += 25
    } else if (lead.budget.includes("$")) {
      score += 20
    } else {
      score += 10
    }
  }

  // Contact completeness (20% weight)
  let contactScore = 0
  if (lead.name) contactScore += 7
  if (lead.phone) contactScore += 8
  if (lead.email) contactScore += 5
  score += contactScore

  // Engagement quality (15% weight)
  if (lead.responses && lead.responses.length > 0) {
    const avgResponseLength = lead.responses.reduce((acc, resp) => acc + resp.length, 0) / lead.responses.length
    if (avgResponseLength > 100) score += 15
    else if (avgResponseLength > 50) score += 10
    else score += 5
  }

  // Specific requirements (5% weight)
  if (lead.location && lead.propertyType) {
    score += 5
  }

  return Math.min(score, 100)
}

export function categorizeRealEstateLeadByScore(score: number): "hot" | "warm" | "cool" {
  if (score >= 75) return "hot"
  if (score >= 45) return "warm"
  return "cool"
}

export function getRealEstateFollowUpStrategy(category: "hot" | "warm" | "cool", intent: string): string {
  const baseStrategies = {
    hot: "Immediate phone call + property showing within 24hrs + priority agent assignment",
    warm: "Phone call within 4 hours + email with listings + follow-up in 48hrs",
    cool: "Email with market report + monthly newsletter + follow-up in 1 week",
  }

  const intentModifiers = {
    selling: " + home valuation + market analysis",
    investing: " + investment opportunities + ROI analysis",
    renting: " + rental listings + lease consultation",
    buying: " + property matches + financing options",
  }

  return baseStrategies[category] + (intentModifiers[intent as keyof typeof intentModifiers] || "")
}
