"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Star, Users, Award, ArrowRight, Play } from "lucide-react"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-40 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              #1 en Seguros Inteligentes con IA
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Protección</span>
                <br />
                <span className="text-gradient">Inteligente</span>
                <br />
                <span className="text-gray-900">para tu Futuro</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Seguros personalizados con Inteligencia Artificial. Cotiza en segundos, obtén la mejor cobertura y
                protege lo que más importa.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">+500K</div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">25 Años</div>
                  <div className="text-sm text-gray-600">Experiencia</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection("calculadora")}
              >
                Cotizar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50 bg-transparent"
                onClick={() => scrollToSection("servicios")}
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Seguros
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Certificado por:</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-sm font-medium">SSN</div>
                <div className="text-sm font-medium">BCRA</div>
                <div className="text-sm font-medium">ISO 27001</div>
                <div className="text-sm font-medium">CNV</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 glass-effect">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900">Tu Póliza</div>
                        <div className="text-sm text-gray-600">Activa y Protegida</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activa</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cobertura Total</span>
                      <span className="font-bold text-gray-900">$2.500.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prima Mensual</span>
                      <span className="font-bold text-green-600">$12.500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Descuento IA</span>
                      <span className="font-bold text-blue-600">-25%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">Recomendación IA</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Basado en tu perfil, puedes ahorrar 15% más con nuestro seguro combinado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow">
                <Shield className="h-6 w-6" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-float">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
