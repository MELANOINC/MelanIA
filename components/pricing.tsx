import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestros Planes</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Planes accesibles y transparentes</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elige el plan que mejor se adapte a tus necesidades. Cotización gratuita y sin compromiso.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Básico</CardTitle>
              <CardDescription>Ideal para protección esencial de auto y hogar.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$15.000</span>
                <span className="ml-1 text-muted-foreground">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="grid gap-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguro de auto terceros completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguro de hogar básico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Asistencia 24hs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Atención telefónica</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Cotizar Plan</Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col border-primary">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full px-3 py-1 text-xs bg-primary text-primary-foreground">Most Popular</div>
              </div>
              <CardTitle className="text-xl">Completo</CardTitle>
              <CardDescription>La protección más elegida por las familias marplatenses.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$35.000</span>
                <span className="ml-1 text-muted-foreground">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="grid gap-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguro de auto todo riesgo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguro de hogar integral</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguro de vida básico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Asistencia premium 24hs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Gestión online de pólizas</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Cotizar Plan</Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Premium</CardTitle>
              <CardDescription>Protección total para familias y empresas.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">A medida</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="grid gap-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Todos los seguros incluidos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Cobertura internacional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Asesor personal dedicado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Atención prioritaria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Descuentos por flota</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Seguros comerciales especializados</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contactar Asesor
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
