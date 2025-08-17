import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, CheckCircle, Info } from "lucide-react"
import { botProjectsData } from "@/lib/bot-data" // Importar datos

export default function ProyectosIa() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nuestros Proyectos de Inteligencia Artificial y Bots
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones innovadoras con IA para potenciar negocios, enfocadas en impacto, automatización y escalabilidad.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {botProjectsData.map((bot) => (
            <Card
              key={bot.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="bg-card-foreground/5 p-6">
                <div className="flex items-center gap-4">
                  <bot.icon className="w-10 h-10 text-primary" />
                  <div>
                    <CardTitle className="text-xl font-semibold">{bot.name}</CardTitle>
                    <CardDescription className="text-sm">{bot.subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{bot.description}</p> {/* Usar descripción corta */}
                <h4 className="font-semibold mb-2 text-sm">Incluye (resumen):</h4>
                <ul className="space-y-1 text-sm">
                  {bot.includes.slice(0, 3).map(
                    (
                      item,
                      index, // Mostrar solo los primeros 3 items
                    ) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                  {bot.includes.length > 3 && (
                    <li className="flex items-start text-primary hover:underline">
                      <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <Link href={`/bots/${bot.id}`}>Ver más detalles...</Link>
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter className="p-6 bg-card-foreground/5 flex flex-col sm:flex-row sm:justify-between gap-3">
                <Button asChild variant="default" className="w-full sm:w-auto">
                  <Link href={`/bots/${bot.id}`}>
                    Conocer Más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Link href={bot.whatsAppUrl} target="_blank" rel="noopener noreferrer">
                    Contactar por WhatsApp
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
