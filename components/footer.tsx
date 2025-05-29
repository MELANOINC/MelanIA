import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">S</span>
              </div>
              <span className="font-bold text-xl">Seguros MDQ</span>
            </Link>
            <p className="mt-3 text-muted-foreground">
              Más de 30 años protegiendo a las familias y empresas de Mar del Plata. Confianza, experiencia y atención
              personalizada.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground">
                  Seguros de Auto
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                  Seguros de Hogar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Seguros de Vida
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Seguros Comerciales
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Guías de Seguros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Atención al Cliente
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Sucursales
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4 mt-8">
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Seguros MDQ. Todos los derechos reservados.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
