import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Cta() {
  return (
    <section className="py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              ¿Listo para proteger lo que más te importa?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a miles de marplatenses que ya confían en Seguros MDQ para proteger su patrimonio y tranquilidad.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex flex-col md:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
              <Button type="submit">Cotizar Ahora</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              Cotización gratuita y sin compromiso. Te contactamos en 24hs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
