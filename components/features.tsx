import { Zap, LineChart, Users, Shield } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nuestros Servicios</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Todo lo que necesitas para estar protegido
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ofrecemos una amplia gama de seguros diseñados para cubrir todas tus necesidades en Mar del Plata.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Seguros de Auto</h3>
                <p className="text-muted-foreground">
                  Cobertura completa para tu vehículo con asistencia 24hs en toda la costa atlántica. Talleres de
                  confianza y gestión rápida de siniestros.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <LineChart className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Seguros de Hogar</h3>
                <p className="text-muted-foreground">
                  Protege tu casa y pertenencias contra incendio, robo, daños por agua y fenómenos climáticos. Cobertura
                  especial para propiedades costeras.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Seguros de Vida</h3>
                <p className="text-muted-foreground">
                  Tranquilidad para tu familia con planes flexibles de seguro de vida. Cobertura por muerte, invalidez y
                  enfermedades graves.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Shield className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Seguros Comerciales</h3>
                <p className="text-muted-foreground">
                  Protección integral para tu negocio: responsabilidad civil, incendio, robo y todo riesgo operativo.
                  Especialistas en comercios marplatenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
