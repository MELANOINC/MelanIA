"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Mail, Clock, Shield, Star, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function CTA() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle quote request
    console.log("Quote request:", { email, phone })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4 relative">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-6">
            <Star className="h-4 w-4 mr-2" />
            Oferta Especial por Tiempo Limitado
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">¡Protege lo que Más Importa Hoy!</h2>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Obtén tu cotización gratuita en menos de 5 minutos y recibe
            <span className="font-bold text-white"> 20% de descuento </span>
            en tu primer año de cobertura.
          </p>

          {/* Urgency Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Clock className="h-5 w-5 text-yellow-300" />
            <span className="text-yellow-300 font-semibold">Oferta válida solo por 48 horas más</span>
          </div>
        </div>

        {/* Quote Form */}
        <Card className="max-w-2xl mx-auto mb-16 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cotización Gratuita Instantánea</h3>
              <p className="text-gray-600">Sin compromiso • Sin papeleos • Respuesta inmediata</p>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Tu teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-12 text-lg">
                <Shield className="h-5 w-5 mr-2" />
                Obtener Cotización Gratis
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </form>

            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Sin spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Datos seguros</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Respuesta inmediata</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Llama Ahora</h3>
              <p className="text-blue-100 mb-4">Habla directamente con un agente especializado</p>
              <Button variant="secondary" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                0800-SEGUROS
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-blue-100 mb-4">Chatea con nosotros las 24 horas del día</p>
              <Button variant="secondary" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chatear Ahora
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-blue-100 mb-4">Envíanos tus preguntas y te respondemos rápido</p>
              <Button variant="secondary" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Escribir Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <div className="text-center mt-16">
          <div className="bg-red-600 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">🚨 Emergencias 24/7</h3>
            <p className="text-red-100 mb-4">¿Necesitas ayuda inmediata? Estamos aquí para ti</p>
            <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-red-50">
              <Phone className="h-5 w-5 mr-2" />
              Llamar Emergencias: 0800-SEGUROS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
