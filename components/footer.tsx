import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    seguros: [
      { name: "Seguro de Auto", href: "#servicios" },
      { name: "Seguro de Hogar", href: "#servicios" },
      { name: "Seguro de Vida", href: "#servicios" },
      { name: "Seguro Comercial", href: "#servicios" },
      { name: "Seguro de Viaje", href: "#servicios" },
      { name: "Seguro de Celular", href: "#servicios" },
    ],
    servicios: [
      { name: "Cotizar Online", href: "#calculadora" },
      { name: "Reportar Siniestro", href: "#siniestros" },
      { name: "Estado de Siniestro", href: "#siniestros" },
      { name: "Pagar Póliza", href: "#" },
      { name: "Descargar App", href: "#" },
      { name: "Atención al Cliente", href: "#contacto" },
    ],
    empresa: [
      { name: "Sobre Nosotros", href: "#nosotros" },
      { name: "Nuestra Historia", href: "#nosotros" },
      { name: "Trabaja con Nosotros", href: "#" },
      { name: "Prensa", href: "#" },
      { name: "Responsabilidad Social", href: "#" },
      { name: "Sustentabilidad", href: "#" },
    ],
    legal: [
      { name: "Términos y Condiciones", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Defensa del Consumidor", href: "#" },
      { name: "Superintendencia de Seguros", href: "#" },
      { name: "BCRA", href: "#" },
      { name: "Compliance", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Youtube, href: "#", name: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <span className="text-2xl font-bold">MelanIA</span>
                <span className="text-gray-400 ml-2">Seguros</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Protegemos lo que más valoras con seguros inteligentes powered by IA. 25 años de experiencia respaldando
              familias y empresas argentinas.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">0800-SEGUROS (734-8767)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@melaniaseguros.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Av. Corrientes 1234, CABA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-lg font-bold mb-6">Seguros</h3>
            <ul className="space-y-3">
              {footerLinks.seguros.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© {currentYear} MelanIA Seguros. Todos los derechos reservados.</div>

            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <span>Superintendencia de Seguros de la Nación</span>
              <span>•</span>
              <span>CUIT: 30-12345678-9</span>
              <span>•</span>
              <span>Matrícula SSN: 12345</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-xs text-gray-500">
            <span>Certificado ISO 27001</span>
            <span>•</span>
            <span>Regulado por BCRA</span>
            <span>•</span>
            <span>Miembro de AACS</span>
            <span>•</span>
            <span>Adherido a Defensa del Consumidor</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
