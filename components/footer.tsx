import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold">Seguros MDQ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Más de 30 años protegiendo familias y empresas marplatenses con la mejor atención personalizada.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Seguros de Auto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Seguros de Hogar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Seguros de Vida
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Seguros Comerciales
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Sucursales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Trabaja con nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📞 (0223) 495-1234</li>
              <li>📧 info@segurosmdq.com.ar</li>
              <li>📍 Güemes 2847, Mar del Plata</li>
              <li>🕒 Lun-Vie 9:00-18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Seguros MDQ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
