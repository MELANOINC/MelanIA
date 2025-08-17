import { botProjectsData } from "@/lib/bot-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, ExternalLink, MessageSquare } from "lucide-react"
import BotDemo from "@/components/bot-demo"

// Para generar las páginas estáticamente en build time
export async function generateStaticParams() {
  return botProjectsData.map((bot) => ({
    botId: bot.id,
  }))
}

interface BotPageProps {
  params: {
    botId: string
  }
}

export default function BotPage({ params }: BotPageProps) {
  const bot = botProjectsData.find((p) => p.id === params.botId)

  if (!bot) {
    notFound() // Muestra página 404 si el bot no se encuentra
  }

  const { icon: Icon } = bot // Renombrar para usar como componente

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/#proyectos-ia">
          {" "}
          {/* Asumiendo que ProyectosIa está en la home y tiene id="proyectos-ia" */}
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Link>
      </Button>

      <header className="mb-10 text-center">
        <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{bot.name}</h1>
        <p className="mt-3 text-xl text-muted-foreground">{bot.subtitle}</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Descripción Detallada</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              {bot.detailedDescription.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funciones Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bot.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ver en Acción</CardTitle>
            </CardHeader>
            <CardContent>
              <BotDemo demo={bot.demo} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Qué Incluye el Pack?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bot.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Siguientes Pasos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href={bot.landingUrl} target="_blank" rel="noopener noreferrer">
                  Visitar Landing Original
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href={bot.whatsAppUrl} target="_blank" rel="noopener noreferrer">
                  Contactar por WhatsApp
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
