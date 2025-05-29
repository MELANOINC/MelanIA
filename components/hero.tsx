import { Button } from "@/components/ui/button"
import { Shield, Phone, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
          🏆 Más de 30 años protegiendo Mar del Plata
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Protege lo que más{" "}
          <span className="text-gradient bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            importa
          </span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Seguros de auto, hogar, vida y comercio con la mejor atención personalizada. Más de 10,000 familias
          marplatenses confían en nosotros.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="h-11 px-8">
            <Shield className="mr-2 h-4 w-4" />
            Cotizar mi seguro
          </Button>
          <Button variant="outline" size="lg" className="h-11 px-8">
            <Phone className="mr-2 h-4 w-4" />
            Llamar ahora
          </Button>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Atención 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Cobertura total</span>
          </div>
        </div>
      </div>
    </section>
  )
}
