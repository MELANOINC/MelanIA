"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, Zap } from "lucide-react"

const planes = [
  {
    name: "Básico",
    price: "1,500",
    period: "mes",
    description: "Protección esencial para comenzar",
    features: [
      "Seguro de Auto Básico",
      "Responsabilidad Civil",
      "Asistencia Vial 24/7",
      "Atención telefónica",
      "App móvil básica",
    ],
    popular: false,
    icon: Shield,
  },
  {
    name: "Premium",
    price: "3,200",
    period: "mes",
    description: "La opción más popular con cobertura completa",
    features: [
      "Seguro de Auto Completo",
      "Seguro de Hogar Incluido",
      "Cobertura de Gastos Médicos",
      "Agente Personal Asignado",
      "App móvil premium",
      "Descuentos en renovación",
      "Siniestros express (<24h)",
    ],
    popular: true,
    icon: Star,
  },
  {
    name: "Empresarial",
    price: "8,500",
    period: "mes",
    description: "Solución integral para empresas",
    features: [
      "Flota de Vehículos",
      "Seguro Comercial Completo",
      "Responsabilidad Civil Profesional",
      "Cobertura de Empleados",
      "Gerente de Cuenta Dedicado",
      "Reportes y Analytics",
      "Soporte prioritario 24/7",
      "Descuentos por volumen",
    ],
    popular: false,
    icon: Zap,
  },
]

const beneficiosAdicionales = [
  "Sin deducible en cristales",
  "Auto sustituto sin costo",
  "Cobertura en toda la República",
  "Descuentos por buen historial",
  "Renovación automática",
  "Pago en mensualidades sin intereses",
]

export default function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Planes y Precios
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Elige el Plan Perfecto para Ti</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planes flexibles diseñados para cada necesidad y presupuesto. Todos incluyen nuestra garantía de
            satisfacción del 100%.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {planes.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 hover:shadow-2xl ${
                plan.popular ? "ring-2 ring-blue-500 scale-105 shadow-xl" : "hover:scale-105"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 px-6 py-1">
                  Más Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? "bg-blue-100" : "bg-gray-100"}`}>
                    <plan.icon className={`h-8 w-8 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">+ IVA</p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  size="lg"
                >
                  {plan.popular ? "Comenzar Ahora" : "Seleccionar Plan"}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">Sin permanencia • Cancela cuando quieras</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Beneficios Adicionales */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Beneficios Incluidos en Todos los Planes
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiosAdicionales.map((beneficio, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-1 bg-green-100 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Garantía de Satisfacción</h3>
            <p className="text-blue-100 mb-6">
              Si no estás completamente satisfecho en los primeros 30 días, te devolvemos tu dinero sin preguntas.
            </p>
            <Button variant="secondary" size="lg">
              Conocer Más Detalles
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
