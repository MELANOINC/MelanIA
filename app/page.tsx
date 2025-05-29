import Header from "../components/header"
import Hero from "../components/hero"
import Features from "../components/features"
import Testimonials from "../components/testimonials"
import Pricing from "../components/pricing"
import Cta from "../components/cta"
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
