"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">SM</span>
            </div>
            <span className="font-bold text-xl">Seguros MDQ</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Servicios
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Testimonios
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Planes
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Noticias
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Ingresar
          </Link>
          <Button>Cotizar Ahora</Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonios
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planes
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Noticias
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ingresar
            </Link>
            <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
              Cotizar Ahora
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
