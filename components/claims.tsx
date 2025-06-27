import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Phone, CheckCircle, Clock, AlertTriangle, Smartphone, ArrowRight } from "lucide-react"

export default function Claims() {
  const steps = [
    {
      icon: Phone,
      title: "Reporta el Siniestro",
      description: "Llama al 0800-SINIESTRO o usa nuestra app móvil las 24 horas",
      time: "Inmediato",
    },
    {
      icon: FileText,
      title: "Documentación",
      description: "Nuestro equipo te guía para reunir la documentación necesaria",
      time: "24 horas",
    },
    {
      icon: AlertTriangle,
      title: "Evaluación",
      description: "Perito especializado evalúa los daños in situ o virtualmente",
      time: "48 horas",
    },
    {
      icon: CheckCircle,
      title: "Pago Aprobado",
      description: "Transferencia directa a tu cuenta una vez aprobado el siniestro",
      time: "72 horas",
    },
  ]

  const stats = [
    { value: "98%", label: "Siniestros Pagados", color: "text-green-600" },
    { value: "72hs", label: "Tiempo Promedio", color: "text-blue-600" },
    { value: "24/7", label: "Atención Disponible", color: "text-purple-600" },
    { value: "95%", label: "Satisfacción Cliente", color: "text-orange-600" },
  ]

  return (
    <section id="siniestros" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 mb-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            Gestión de Siniestros
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proceso Rápido y<span className="text-gradient block">Transparente</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cuando más nos necesitas, estamos ahí. Proceso digitalizado y eficiente para resolver tu siniestro en tiempo
            récord
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Proceso en 4 Pasos Simples</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {step.time}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{step.description}</CardDescription>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Necesitas Reportar un Siniestro?</h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo especializado está disponible 24/7 para asistirte en el momento que más nos necesitas
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="font-medium">0800-SINIESTRO (746-4378)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">App MelanIA Seguros</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Atención 24 horas, 365 días</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Llamar Ahora
              </Button>
              <Button size="lg" variant="outline" className="w-full border-2 bg-transparent">
                <Smartphone className="mr-2 h-5 w-5" />
                Descargar App
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Documentación</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Te ayudamos a reunir toda la documentación necesaria para agilizar tu siniestro
              </p>
              <Button variant="outline" size="sm">
                Ver Lista
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Seguimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Consulta el estado de tu siniestro en tiempo real desde nuestra plataforma
              </p>
              <Button variant="outline" size="sm">
                Consultar Estado
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-600" />
                <span>Asistencia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Nuestros especialistas te acompañan durante todo el proceso</p>
              <Button variant="outline" size="sm">
                Contactar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
