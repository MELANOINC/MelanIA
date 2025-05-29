import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonios</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">La confianza de nuestros clientes</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Más de 15.000 familias y empresas de Mar del Plata confían en nosotros.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <Card className="bg-background">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">María González</p>
                    <p className="text-sm text-muted-foreground">Propietaria, Restaurante El Faro</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Cuando tuvimos el incendio en el restaurante, Seguros MDQ nos acompañó en todo momento. La
                  indemnización fue rápida y pudimos reabrir en tiempo récord.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Carlos Mendoza</p>
                    <p className="text-sm text-muted-foreground">Taxista, Mar del Plata</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Llevo 10 años con mi seguro de auto en Seguros MDQ. La atención es excelente y cuando tuve el
                  accidente, me solucionaron todo en 48 horas.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Ana Rodríguez</p>
                    <p className="text-sm text-muted-foreground">Ama de casa, Barrio Los Troncos</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  El seguro de hogar me dio mucha tranquilidad. Cuando se inundó el sótano, cubrieron todos los daños
                  sin problemas. Recomiendo Seguros MDQ al 100%.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
