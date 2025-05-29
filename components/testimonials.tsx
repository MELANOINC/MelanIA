import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "María González",
    role: "Propietaria de vivienda",
    content: "Excelente atención y rapidez en la gestión de mi siniestro. Recomiendo totalmente sus servicios.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carlos Rodríguez",
    role: "Comerciante",
    content: "Llevan años asegurando mi negocio. Siempre están cuando los necesito, muy profesionales.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ana Martínez",
    role: "Conductora",
    content: "Mi seguro de auto me salvó de un gran problema. El servicio de grúa llegó en 15 minutos.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Lo que dicen nuestros clientes</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Miles de familias marplatenses confían en nosotros para proteger lo que más aman.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
