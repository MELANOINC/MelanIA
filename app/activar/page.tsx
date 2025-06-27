"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ActivarPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      const success = Math.random() > 0.2

      if (success) {
        setStatus("success")
        setMessage("¡Tu cuenta ha sido activada exitosamente!")
      } else {
        setStatus("error")
        setMessage("Error al activar la cuenta. Por favor, intenta nuevamente.")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleGoHome = () => {
    router.push("/")
  }

  const handleRetry = () => {
    setStatus("loading")
    setMessage("")

    const timer = setTimeout(() => {
      setStatus("success")
      setMessage("¡Tu cuenta ha sido activada exitosamente!")
    }, 2000)

    return () => clearTimeout(timer)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Activación de Cuenta</CardTitle>
          <CardDescription>Procesando la activación de tu cuenta...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                <p className="text-center text-gray-600">Activando tu cuenta, por favor espera...</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="h-16 w-16 text-green-600" />
                <p className="text-center text-green-700 font-medium">{message}</p>
                <p className="text-center text-gray-600 text-sm">
                  Ya puedes acceder a todas las funcionalidades de tu cuenta.
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <AlertCircle className="h-16 w-16 text-red-600" />
                <p className="text-center text-red-700 font-medium">{message}</p>
                <p className="text-center text-gray-600 text-sm">
                  Si el problema persiste, contacta con nuestro soporte.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {status === "success" && (
              <Button onClick={handleGoHome} className="w-full">
                Ir al Inicio
              </Button>
            )}

            {status === "error" && (
              <>
                <Button onClick={handleRetry} className="w-full">
                  Intentar Nuevamente
                </Button>
                <Button variant="outline" onClick={handleGoHome} className="w-full bg-transparent">
                  Volver al Inicio
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
