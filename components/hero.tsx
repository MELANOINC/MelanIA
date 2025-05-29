import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Protección Total en Mar del Plata
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Protege lo que más importa con los mejores seguros de Mar del Plata
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Más de 30 años protegiendo familias y empresas marplatenses. Seguros de auto, hogar, vida y comercio con
                la mejor atención personalizada.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="h-12 px-6">
                Cotizar Gratis
              </Button>
              <Link
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Conocer Más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Cotización gratuita</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[450px]">
              <Image
                src="/placeholder.svg?height=700&width=900"
                alt="Oficina Seguros MDQ"
                className="rounded-md object-cover shadow-xl"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
