import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Cta() {
  return (
    <section id="contacto" className="container py-8 md:py-12 lg:py-24">
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              ¿Listo para proteger lo que más importa?
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Obtené tu cotización personalizada en menos de 2 minutos. Sin compromiso.
            </p>
            <div className="w-full max-w-md space-y-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Input placeholder="Tu email" type="email" className="flex-1" />
                <Button type="submit">Cotizar gratis</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Al enviar tu email, aceptás recibir comunicaciones comerciales.
              </p>
            </div>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-x-6 sm:space-y-0">
              <span>📞 (0223) 495-1234</span>
              <span>📧 info@segurosmdq.com.ar</span>
              <span>📍 Güemes 2847, Mar del Plata</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
