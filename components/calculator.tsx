"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalculatorIcon, Sparkles, ArrowRight, Shield } from "lucide-react"

export default function Calculator() {
  const [formData, setFormData] = useState({
    tipoSeguro: "",
    edad: "",
    ubicacion: "",
    valorAsegurado: "",
  })
  const [cotizacion, setCotizacion] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calcularCotizacion = () => {
    setLoading(true)

    // Simulación de cálculo con IA
    setTimeout(() => {
      let basePrice = 0

      switch (formData.tipoSeguro) {
        case "auto":
          basePrice = 8500
          break
        case "hogar":
          basePrice = 3200
          break
        case "vida":
          basePrice = 2800
          break
        case "comercial":
          basePrice = 15000
          break
        case "viaje":
          basePrice = 1500
          break
        case "celular":
          basePrice = 890
          break
        default:
          basePrice = 5000
      }

      // Factores de ajuste simulados
      const edadFactor = Number.parseInt(formData.edad) > 30 ? 0.9 : 1.1
      const ubicacionFactor = formData.ubicacion === "caba" ? 1.2 : 0.8
      const valorFactor = Number.parseInt(formData.valorAsegurado) > 1000000 ? 1.3 : 1.0

      const precioFinal = Math.round(basePrice * edadFactor * ubicacionFactor * valorFactor)
      setCotizacion(precioFinal)
      setLoading(false)
    }, 2000)
  }

  const isFormValid = formData.tipoSeguro && formData.edad && formData.ubicacion && formData.valorAsegurado

  return (
    <section id="calculadora" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Cotización Inteligente
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calculadora de Seguros
            <span className="text-gradient block">Powered by IA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtén una cotización personalizada en segundos usando nuestra Inteligencia Artificial avanzada
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalculatorIcon className="h-6 w-6 text-blue-600" />
                  <span>Calculadora Inteligente</span>
                </CardTitle>
                <CardDescription>Completa los datos para obtener tu cotización personalizada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo-seguro">Tipo de Seguro</Label>
                  <Select onValueChange={(value) => handleInputChange("tipoSeguro", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de seguro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Seguro de Auto</SelectItem>
                      <SelectItem value="hogar">Seguro de Hogar</SelectItem>
                      <SelectItem value="vida">Seguro de Vida</SelectItem>
                      <SelectItem value="comercial">Seguro Comercial</SelectItem>
                      <SelectItem value="viaje">Seguro de Viaje</SelectItem>
                      <SelectItem value="celular">Seguro de Celular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    type="number"
                    placeholder="Ingresa tu edad"
                    value={formData.edad}
                    onChange={(e) => handleInputChange("edad", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Select onValueChange={(value) => handleInputChange("ubicacion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caba">CABA</SelectItem>
                      <SelectItem value="gba">Gran Buenos Aires</SelectItem>
                      <SelectItem value="interior">Interior del País</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor a Asegurar (ARS)</Label>
                  <Input
                    id="valor"
                    type="number"
                    placeholder="Ej: 2500000"
                    value={formData.valorAsegurado}
                    onChange={(e) => handleInputChange("valorAsegurado", e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={calcularCotizacion}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculando con IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Calcular Cotización
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {cotizacion && (
                <Card className="shadow-xl border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <Shield className="h-6 w-6" />
                      <span>Tu Cotización Personalizada</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">${cotizacion.toLocaleString()}/mes</div>
                      <Badge className="bg-green-100 text-green-800">Precio optimizado con IA</Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio base:</span>
                        <span className="font-medium">${(cotizacion * 1.25).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Descuento IA:</span>
                        <span className="font-medium">-25%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total mensual:</span>
                        <span>${cotizacion.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <h4 className="font-medium text-gray-900">Incluye:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Cobertura completa 24/7</li>
                        <li>• Asistencia inmediata</li>
                        <li>• Sin franquicia</li>
                        <li>• Gestión digital</li>
                      </ul>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Contratar Ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>¿Por qué elegir nuestra IA?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Análisis Inteligente</h4>
                      <p className="text-sm text-gray-600">
                        Evaluamos más de 200 variables para ofrecerte el mejor precio
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Descuentos Automáticos</h4>
                      <p className="text-sm text-gray-600">
                        La IA identifica todos los descuentos aplicables a tu perfil
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Actualización Continua</h4>
                      <p className="text-sm text-gray-600">Tu póliza se optimiza automáticamente cada mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
