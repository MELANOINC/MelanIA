import { Button } from "@/components/ui/button"
import { Menu, Shield } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Shield className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Seguros MDQ</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#servicios">
              Servicios
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#testimonios">
              Testimonios
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#precios">
              Precios
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contacto">
              Contacto
            </a>
          </nav>
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 bg-background hover:bg-accent">
              <span className="hidden lg:inline-flex">Buscar seguros...</span>
              <span className="inline-flex lg:hidden">Buscar...</span>
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
            <Button size="sm">Cotizar ahora</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
