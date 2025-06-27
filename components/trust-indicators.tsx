import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react"

export default function TrustIndicators() {
  const stats = [
    {
      icon: Users,
      value: "500K+",
      label: "Clientes Satisfechos",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      value: "98%",
      label: "Siniestros Pagados",
      color: "text-green-600",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Atención al Cliente",
      color: "text-purple-600",
    },
    {
      icon: Award,
      value: "25",
      label: "Años de Experiencia",
      color: "text-orange-600",
    },
    {
      icon: CheckCircle,
      value: "99.9%",
      label: "Disponibilidad",
      color: "text-teal-600",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Calificación",
      color: "text-yellow-600",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Confianza que Respalda Resultados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 25 años protegiendo familias y empresas argentinas con la mejor tecnología y servicio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 group-hover:bg-gray-200 transition-colors`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Certificados y Regulados por:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">Superintendencia de Seguros</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">BCRA</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">ISO 27001</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">CNV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
