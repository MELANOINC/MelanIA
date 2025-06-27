"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      description: "Atención personalizada",
      contact: "0800-SEGUROS",
      subtext: "Lun-Vie 8:00-20:00, Sáb 9:00-14:00",
      color: "bg-blue-500",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Respuesta inmediata",
      contact: "+54 11 1234-5678",
      subtext: "24/7 disponible",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Consultas detalladas",
      contact: "info@melaniaseguros.com",
      subtext: "Respuesta en 2 horas",
      color: "bg-purple-500",
    },
    {
      icon: MapPin,
      title: "Oficinas",
      description: "Atención presencial",
      contact: "50+ sucursales",
      subtext: "En todo el país",
      color: "bg-orange-500",
    },
  ]

  const offices = [
    { city: "Buenos Aires", address: "Av. Corrientes 1234, CABA", phone: "(011) 4567-8900" },
    { city: "Córdoba", address: "San Martín 567, Centro", phone: "(0351) 234-5678" },
    { city: "Rosario", address: "Pellegrini 890, Centro", phone: "(0341) 345-6789" },
    { city: "Mendoza", address: "San Martín 123, Ciudad", phone: "(0261) 456-7890" },
  ]

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-xl border-green-200">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
                <p className="text-gray-600 mb-6">
                  Gracias por contactarnos. Nuestro equipo se comunicará contigo dentro de las próximas 2 horas.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-green-600 hover:bg-green-700">
                  Enviar Otro Mensaje
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contacto
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Estamos Aquí para
            <span className="text-gradient block">Ayudarte</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de expertos está disponible para resolver todas tus dudas y ayudarte a encontrar el seguro
            perfecto
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Canales de Atención</h3>

            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${method.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <method.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <p className="font-medium text-gray-900">{method.contact}</p>
                      <p className="text-xs text-gray-500">{method.subtext}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Office Hours */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6" />
                  <h4 className="font-bold">Horarios de Atención</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergencias:</span>
                    <span>24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos comunicaremos contigo en menos de 2 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre Completo *</Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        placeholder="+54 11 1234-5678"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo-consulta">Tipo de Consulta *</Label>
                      <Select onValueChange={(value) => handleInputChange("tipoConsulta", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cotizacion">Cotización</SelectItem>
                          <SelectItem value="siniestro">Siniestro</SelectItem>
                          <SelectItem value="renovacion">Renovación</SelectItem>
                          <SelectItem value="reclamo">Reclamo</SelectItem>
                          <SelectItem value="informacion">Información General</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={5}
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Nuestras Oficinas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">{office.city}</h4>
                  <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                  <p className="text-sm font-medium text-blue-600">{office.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
