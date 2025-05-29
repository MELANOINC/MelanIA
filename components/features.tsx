import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Home, Heart, Building2, Users, Clock } from "lucide-react"

const features = [
  {
    icon: Car,
    title: "Seguros de Auto",
    description: "Cobertura completa para tu vehículo con asistencia 24/7 en toda Argentina.",
  },
  {
    icon: Home,
    title: "Seguros de Hogar",
    description: "Protege tu casa y pertenencias contra incendios, robos y daños naturales.",
  },
  {
    icon: Heart,
    title: "Seguros de Vida",
    description: "Tranquilidad para tu familia con planes flexibles y coberturas amplias.",
  },
  {
    icon: Building2,
    title: "Seguros Comerciales",
    description: "Protección integral para tu negocio, desde responsabilidad civil hasta equipos.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Asesoramiento directo con nuestros expertos locales en Mar del Plata.",
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    description: "Gestión ágil de siniestros y respuesta inmediata ante emergencias.",
  },
]

export default function Features() {
  return (
    <section id="servicios" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Nuestros Servicios</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Ofrecemos una amplia gama de seguros diseñados para proteger lo que más valoras.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
