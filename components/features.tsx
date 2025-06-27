"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Home, Heart, Building, Plane, Smartphone, Shield, Clock, Phone, Calculator } from "lucide-react"

const seguros = [
  {
    icon: Car,
    title: "Seguro de Auto",
    description: "Cobertura completa para tu vehículo con asistencia en ruta 24/7",
    features: ["Responsabilidad Civil", "Robo Total", "Asistencia Mecánica", "Auto Sustituto"],
    price: "Desde $2,500/mes",
    popular: true,
  },
  {
    icon: Home,
    title: "Seguro de Hogar",
    description: "Protege tu casa y pertenencias contra incendios, robos y desastres",
    features: ["Incendio y Rayo", "Robo y Hurto", "Daños por Agua", "Responsabilidad Civil"],
    price: "Desde $1,800/mes",
    popular: false,
  },
  {
    icon: Heart,
    title: "Seguro de Vida",
    description: "Tranquilidad para tu familia con cobertura de vida y gastos médicos",
    features: ["Muerte Natural", "Muerte Accidental", "Gastos Médicos", "Invalidez Total"],
    price: "Desde $800/mes",
    popular: false,
  },
  {
    icon: Building,
    title: "Seguro Comercial",
    description: "Protección integral para tu negocio y empleados",
    features: ["Responsabilidad Civil", "Incendio", "Robo", "Pérdida de Ganancias"],
    price: "Desde $3,500/mes",
    popular: false,
  },
  {
    icon: Plane,
    title: "Seguro de Viaje",
    description: "Viaja tranquilo con cobertura médica y de equipaje internacional",
    features: ["Gastos Médicos", "Cancelación", "Equipaje", "Repatriación"],
    price: "Desde $150/viaje",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Seguro de Celular",
    description: "Protege tu smartphone contra robos, daños y fallas técnicas",
    features: ["Robo y Hurto", "Daños Accidentales", "Fallas Técnicas", "Reposición"],
    price: "Desde $200/mes",
    popular: false,
  },
]

const servicios = [
  {
    icon: Shield,
    title: "Atención 24/7",
    description: "Soporte y emergencias las 24 horas del día, los 365 días del año",
  },
  {
    icon: Clock,
    title: "Siniestros Rápidos",
    description: "Procesamiento de siniestros en menos de 48 horas hábiles",
  },
  {
    icon: Phone,
    title: "Asesoría Personalizada",
    description: "Agentes especializados para ayudarte a elegir la mejor cobertura",
  },
  {
    icon: Calculator,
    title: "Cotización Instantánea",
    description: "Obtén tu cotización en línea en menos de 5 minutos",
  },
]

export default function Features() {
  return (
    <section id="seguros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nuestros Seguros
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Cobertura Completa para Cada Necesidad</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde seguros de auto hasta protección comercial, tenemos la solución perfecta para proteger lo que más te
            importa.
          </p>
        </div>

        {/* Seguros Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {seguros.map((seguro, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 hover:shadow-xl ${seguro.popular ? "ring-2 ring-blue-500" : ""}`}
            >
              {seguro.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Más Popular</Badge>
              )}
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <seguro.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{seguro.title}</CardTitle>
                    <div className="text-lg font-bold text-blue-600">{seguro.price}</div>
                  </div>
                </div>
                <CardDescription className="text-base">{seguro.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {seguro.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={seguro.popular ? "default" : "outline"}>
                  Cotizar {seguro.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">¿Por Qué Elegir MelanIA Seguros?</h3>
          <p className="text-lg text-gray-600">Más de 35 años de experiencia nos respaldan</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <servicio.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{servicio.title}</h4>
                <p className="text-gray-600 text-sm">{servicio.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
