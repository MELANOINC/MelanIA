import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Award, Zap, Heart, Globe } from "lucide-react"

export default function About() {
  const milestones = [
    {
      year: "1998",
      event: "Fundación de MelanIA Seguros",
      description: "Iniciamos con la visión de democratizar los seguros en Argentina",
    },
    { year: "2005", event: "Expansión Nacional", description: "Llegamos a todas las provincias del país" },
    { year: "2012", event: "Plataforma Digital", description: "Lanzamos la primera plataforma 100% digital" },
    { year: "2018", event: "Inteligencia Artificial", description: "Implementamos IA para personalizar seguros" },
    { year: "2023", event: "500K Clientes", description: "Alcanzamos medio millón de clientes satisfechos" },
    { year: "2024", event: "Líder del Mercado", description: "Reconocidos como #1 en innovación" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Confianza",
      description: "25 años protegiendo familias argentinas con transparencia total",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Innovación",
      description: "Pioneros en usar IA para crear seguros más justos y accesibles",
      color: "bg-purple-500",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description: "Cada cliente es único y merece atención personalizada",
      color: "bg-red-500",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Construimos una red de protección para toda la sociedad",
      color: "bg-green-500",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Buscamos la perfección en cada proceso y servicio",
      color: "bg-orange-500",
    },
    {
      icon: Globe,
      title: "Sostenibilidad",
      description: "Comprometidos con un futuro sustentable para todos",
      color: "bg-teal-500",
    },
  ]

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Nuestra Historia
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            25 Años Protegiendo
            <span className="text-gradient block">el Futuro de Argentina</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde 1998, hemos evolucionado de una pequeña aseguradora a la empresa líder en seguros inteligentes,
            siempre con el compromiso de proteger lo que más valoras
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Nuestra Evolución</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-800">{milestone.year}</Badge>
                        </div>
                        <CardTitle className="text-lg">{milestone.event}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Equipo de Expertos</h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo está formado por más de 200 profesionales especializados en seguros, tecnología y
                atención al cliente, todos comprometidos con brindarte la mejor experiencia.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">200+</div>
                  <div className="text-sm text-gray-600">Profesionales</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Años Promedio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Disponibilidad</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.jpg"
                alt="Equipo MelanIA"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
