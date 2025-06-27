import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustIndicators from "@/components/trust-indicators"
import Services from "@/components/services"
import Calculator from "@/components/calculator"
import Claims from "@/components/claims"
import Testimonials from "@/components/testimonials"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustIndicators />
      <Services />
      <Calculator />
      <Claims />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
