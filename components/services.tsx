"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Home, Heart, Building, Plane, Smartphone, Shield, Star, ArrowRight } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Car,
      title: "Seguro de Auto",
      description: "Cobertura completa para tu vehículo con asistencia 24/7",
      features: ["Responsabilidad Civil", "Todo Riesgo", "Asistencia Mecánica", "Auto Sustituto"],
      price: "Desde $8.500/mes",
      popular: true,
      color: "bg-blue-500",
    },
    {
      icon: Home,
      title: "Seguro de Hogar",
      description: "Protege tu hogar y pertenencias contra todo riesgo",
      features: ["Incendio y Explosión", "Robo y Hurto", "Daños por Agua", "Responsabilidad Civil"],
      price: "Desde $3.200/mes",
      popular: false,
      color: "bg-green-500",
    },
    {
      icon: Heart,
      title: "Seguro de Vida",
      description: "Tranquilidad para ti y tu familia en todo momento",
      features: ["Muerte Natural", "Muerte Accidental", "Invalidez Total", "Enfermedades Graves"],
      price: "Desde $2.800/mes",
      popular: false,
      color: "bg-red-500",
    },
    {
      icon: Building,
      title: "Seguro Comercial",
      description: "Protección integral para tu negocio o empresa",
      features: ["Responsabilidad Civil", "Incendio", "Robo", "Pérdida de Beneficios"],
      price: "Desde $15.000/mes",
      popular: false,
      color: "bg-purple-500",
    },
    {
      icon: Plane,
      title: "Seguro de Viaje",
      description: "Viaja tranquilo con cobertura nacional e internacional",
      features: ["Gastos Médicos", "Cancelación", "Equipaje", "Repatriación"],
      price: "Desde $1.500/viaje",
      popular: false,
      color: "bg-orange-500",
    },
    {
      icon: Smartphone,
      title: "Seguro de Celular",
      description: "Protege tu dispositivo móvil contra robos y daños",
      features: ["Robo y Hurto", "Daños Accidentales", "Falla de Fábrica", "Reposición Inmediata"],
      price: "Desde $890/mes",
      popular: false,
      color: "bg-teal-500",
    },
  ]

  const scrollToCalculator = () => {
    const element = document.getElementById("calculadora")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Nuestros Seguros
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cobertura Completa para
            <span className="text-gradient block">Cada Aspecto de tu Vida</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seguros personalizados con Inteligencia Artificial que se adaptan a tus necesidades específicas
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 group ${service.popular ? "ring-2 ring-blue-500" : ""}`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.color} text-white mb-4`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      -25% con IA
                    </Badge>
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 transition-colors" onClick={scrollToCalculator}>
                    Cotizar Ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestros expertos pueden crear un seguro personalizado que se adapte perfectamente a tus necesidades
            específicas
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Consulta Personalizada
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
