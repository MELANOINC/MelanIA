import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "$2,500",
    period: "/mes",
    description: "Perfecto para conductores nuevos",
    features: ["Responsabilidad civil", "Asistencia mecánica", "Cobertura de cristales", "Atención telefónica"],
  },
  {
    name: "Completo",
    price: "$4,200",
    period: "/mes",
    description: "La opción más popular",
    features: [
      "Todo riesgo con franquicia",
      "Asistencia 24/7",
      "Auto sustituto",
      "Cobertura en viajes",
      "Granizo y inundación",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$6,800",
    period: "/mes",
    description: "Máxima protección",
    features: [
      "Todo riesgo sin franquicia",
      "Auto 0km en siniestro total",
      "Cobertura internacional",
      "Asesor personal",
      "Accesorios y equipos",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="precios" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Planes que se adaptan a vos</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Elegí el plan de seguro que mejor se ajuste a tus necesidades y presupuesto.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Más popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                Contratar ahora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
