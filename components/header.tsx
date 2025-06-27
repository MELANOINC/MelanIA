"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, MapPin, Shield, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>24/7: 0800-SEGUROS</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@melaniaseguros.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Oficinas en toda Argentina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gradient">MelanIA</span>
            <span className="text-sm text-gray-600 hidden sm:block">Seguros</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Inicio
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>Seguros</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro de Auto</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro de Hogar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro de Vida</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro Comercial</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro de Viaje</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("servicios")}>Seguro de Celular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("calculadora")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Cotizar
            </button>
            <button
              onClick={() => scrollToSection("siniestros")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Siniestros
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" onClick={() => scrollToSection("calculadora")}>
              Cotizar Ahora
            </Button>
            <Button onClick={() => scrollToSection("contacto")}>Contactar</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Inicio
                </button>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Seguros
                </button>
                <button
                  onClick={() => scrollToSection("calculadora")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Cotizar
                </button>
                <button
                  onClick={() => scrollToSection("siniestros")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Siniestros
                </button>
                <button
                  onClick={() => scrollToSection("nosotros")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Nosotros
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contacto
                </button>

                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => scrollToSection("calculadora")}
                    >
                      Cotizar Ahora
                    </Button>
                    <Button className="w-full" onClick={() => scrollToSection("contacto")}>
                      Contactar
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
