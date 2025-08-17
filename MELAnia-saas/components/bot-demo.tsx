import type { Demo } from "@/lib/bot-data"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import MelaniaDemo from "./interactive-demos/melania-demo"

interface BotDemoProps {
  demo?: Demo
}

const renderDemo = (demo: Demo) => {
  switch (demo.type) {
    case "video":
      return (
        <div className="aspect-video overflow-hidden rounded-lg border">
          <iframe
            src={demo.src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )
    case "iframe":
      return (
        <div className="aspect-video overflow-hidden rounded-lg border">
          <iframe src={demo.src} title="Iframe Demo" className="w-full h-full"></iframe>
        </div>
      )
    case "interactive":
      switch (demo.componentId) {
        case "melania":
          return <MelaniaDemo />
        // Aquí podrías añadir más 'case' para otros bots interactivos
        default:
          return <p>Componente de demo interactiva no encontrado.</p>
      }
    default:
      return null
  }
}

export default function BotDemo({ demo }: BotDemoProps) {
  if (!demo) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
          <Info className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium">Demostración no disponible.</p>
        </CardContent>
      </Card>
    )
  }

  return <div>{renderDemo(demo)}</div>
}
