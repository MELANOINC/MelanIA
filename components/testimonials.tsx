"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, Shield } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "María González",
      role: "Empresaria",
      location: "Buenos Aires",
      rating: 5,
      text: "Cuando tuve el accidente, MelanIA resolvió todo en 48 horas. La atención fue excepcional y el proceso completamente digital. Recomiendo 100%.",
      insurance: "Seguro de Auto",
      amount: "$850.000",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Carlos Rodríguez",
      role: "Comerciante",
      location: "Córdoba",
      rating: 5,
      text: "El seguro de mi local se activó cuando más lo necesitaba. El equipo de MelanIA fue profesional y me acompañó en cada paso del proceso.",
      insurance: "Seguro Comercial",
      amount: "$1.200.000",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Ana Martínez",
      role: "Profesional",
      location: "Rosario",
      rating: 5,
      text: "La IA de MelanIA me ayudó a encontrar el seguro perfecto para mi familia. Ahorro 30% comparado con mi seguro anterior y tengo mejor cobertura.",
      insurance: "Seguro de Hogar",
      amount: "$2.100.000",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Roberto Silva",
      role: "Jubilado",
      location: "Mendoza",
      rating: 5,
      text: "A mis 65 años, pensé que sería difícil conseguir un buen seguro de vida. MelanIA me ofreció una propuesta excelente con precios accesibles.",
      insurance: "Seguro de Vida",
      amount: "$450.000",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Laura Fernández",
      role: "Madre de Familia",
      location: "La Plata",
      rating: 5,
      text: "Cuando se me rompió el celular, MelanIA me dio uno de reemplazo el mismo día. El servicio es increíble y los precios muy competitivos.",
      insurance: "Seguro de Celular",
      amount: "$180.000",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Diego Morales",
      role: "Viajero Frecuente",
      location: "Salta",
      rating: 5,
      text: "Viajo mucho por trabajo y el seguro de viaje de MelanIA me ha salvado varias veces. Cobertura internacional excelente y trámites súper rápidos.",
      insurance: "Seguro de Viaje",
      amount: "$95.000",
      avatar: "/placeholder-user.jpg",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-yellow-100 text-yellow-800 mb-4">
            <Star className="h-4 w-4 mr-2" />
            Testimonios Reales
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lo que Dicen Nuestros
            <span className="text-gradient block">Clientes Satisfechos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 500,000 clientes confían en MelanIA para proteger lo que más valoran
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Content */}
                <div className="p-8 md:p-12 space-y-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={currentTestimonial.avatar || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                      <p className="text-gray-600">{currentTestimonial.role}</p>
                      <p className="text-sm text-gray-500">{currentTestimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                    <p className="text-lg text-gray-700 leading-relaxed pl-6">{currentTestimonial.text}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Seguro</p>
                      <p className="font-medium text-gray-900">{currentTestimonial.insurance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Monto Asegurado</p>
                      <p className="font-bold text-green-600">{currentTestimonial.amount}</p>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center text-white space-y-6">
                    <Shield className="h-20 w-20 mx-auto opacity-80" />
                    <div>
                      <div className="text-3xl font-bold mb-2">4.9/5</div>
                      <div className="text-blue-100">Calificación Promedio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-2">500K+</div>
                      <div className="text-blue-100">Clientes Satisfechos</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Siniestros Pagados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">72h</div>
            <div className="text-gray-600">Tiempo Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Atención</div>
          </div>
        </div>
      </div>
    </section>
  )
}
