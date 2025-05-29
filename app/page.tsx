import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Bot,
  Building,
  TrendingUp,
  Users,
  Star,
  Phone,
  MessageCircle,
  Zap,
  Target,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function MelanoLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">MELANO INC</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#solutions" className="text-gray-300 hover:text-white transition-colors">
              Solutions
            </Link>
            <Link href="#services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors">
              Benefits
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            <MessageCircle className="h-4 w-4 mr-2" />
            Demo ARIA Bot
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
              🤖 AI-Powered Real Estate Automation
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Real Estate Marketing
              </span>{" "}
              with Intelligent Bots
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Automate lead generation, qualify prospects, and close more deals with our enterprise-grade AI bots.
              <strong className="text-white">
                {" "}
                Increase conversions by 300% while reducing operational costs by 60%.
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Bot className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Lead Qualification</div>
                <div className="text-gray-400 text-sm">24/7 Automated</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Conversion Rate</div>
                <div className="text-gray-400 text-sm">+300% Average</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Lead Response</div>
                <div className="text-gray-400 text-sm">Under 30 Seconds</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <BarChart3 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">ROI Increase</div>
                <div className="text-gray-400 text-sm">450% Average</div>
              </div>
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">🚀 Request Enterprise Demo</CardTitle>
                <CardDescription className="text-gray-300">
                  See how our AI bots can transform your real estate business in just 15 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Business Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your Real Estate Company"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-type" className="text-white">
                    Business Type
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brokerage">🏢 Real Estate Brokerage</SelectItem>
                      <SelectItem value="agent">🏠 Individual Agent</SelectItem>
                      <SelectItem value="developer">🏗️ Property Developer</SelectItem>
                      <SelectItem value="property-management">🔑 Property Management</SelectItem>
                      <SelectItem value="investment">💰 Real Estate Investment</SelectItem>
                      <SelectItem value="marketing-agency">📈 Marketing Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team-size" className="text-white">
                    Team Size
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">1 Person (Solo Agent)</SelectItem>
                      <SelectItem value="small">2-10 People</SelectItem>
                      <SelectItem value="medium">11-50 People</SelectItem>
                      <SelectItem value="large">51-200 People</SelectItem>
                      <SelectItem value="enterprise">200+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges" className="text-white">
                    Current Marketing Challenges
                  </Label>
                  <Textarea
                    id="challenges"
                    placeholder="Tell us about your lead generation challenges, current tools, and what you'd like to improve..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-green-500/50 text-green-300 hover:bg-green-500/10"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat with ARIA
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                  ✅ No commitment required • ✅ Custom solution design • ✅ ROI analysis included
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">🎯 Our AI-Powered Solutions</h2>
            <p className="text-xl text-gray-300">Comprehensive automation suite for modern real estate professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Lead Qualification Bots</h3>
                <p className="text-gray-400 mb-4">
                  Automatically qualify leads 24/7, collect contact information, and schedule appointments with
                  qualified prospects
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✅ 24/7 lead response</li>
                  <li>✅ Smart qualification logic</li>
                  <li>✅ CRM integration</li>
                  <li>✅ Appointment scheduling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Marketing Automation</h3>
                <p className="text-gray-400 mb-4">
                  Nurture leads with personalized drip campaigns, property recommendations, and market insights
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✅ Personalized campaigns</li>
                  <li>✅ Property matching</li>
                  <li>✅ Market updates</li>
                  <li>✅ Behavioral triggers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Analytics & Insights</h3>
                <p className="text-gray-400 mb-4">
                  Advanced analytics dashboard with lead scoring, conversion tracking, and ROI measurement
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✅ Real-time analytics</li>
                  <li>✅ Lead scoring</li>
                  <li>✅ Conversion tracking</li>
                  <li>✅ ROI reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Melano Inc?</h2>
            <p className="text-xl text-gray-300">Enterprise-grade solutions that deliver measurable results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-white font-semibold">Instant Lead Response</h3>
                </div>
                <p className="text-gray-400">
                  Respond to leads within 30 seconds, 24/7. Studies show that responding within 5 minutes increases
                  conversion rates by 900%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-green-400 mr-3" />
                  <h3 className="text-white font-semibold">Higher Quality Leads</h3>
                </div>
                <p className="text-gray-400">
                  Our AI qualification process ensures you only spend time on high-intent prospects, improving your
                  close rate by 250%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
                  <h3 className="text-white font-semibold">Scalable Growth</h3>
                </div>
                <p className="text-gray-400">
                  Handle unlimited leads without hiring additional staff. Scale your business without scaling your
                  overhead costs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-white font-semibold">Enterprise Security</h3>
                </div>
                <p className="text-gray-400">
                  SOC 2 compliant with enterprise-grade security. Your data and your clients' data are always protected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-cyan-400 mr-3" />
                  <h3 className="text-white font-semibold">Dedicated Support</h3>
                </div>
                <p className="text-gray-400">
                  White-glove onboarding and dedicated customer success manager. We ensure your success from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-8 w-8 text-orange-400 mr-3" />
                  <h3 className="text-white font-semibold">Proven ROI</h3>
                </div>
                <p className="text-gray-400">
                  Average 450% ROI within 6 months. Our clients typically see payback within 60 days of implementation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-300">Real results from real estate professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Melano's bots increased our lead conversion by 340% in just 3 months. We went from 12 closings per
                  month to 41. The ROI is incredible."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">SM</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Sarah Martinez</div>
                    <div className="text-gray-400 text-sm">Broker/Owner, Martinez Realty Group</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The automation freed up 25 hours per week for our team. We can now focus on high-value activities
                  while the bots handle lead qualification."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">DT</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">David Thompson</div>
                    <div className="text-gray-400 text-sm">VP of Sales, Premier Properties</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Best investment we've made. The bots work 24/7 and never miss a lead. Our response time went from
                  hours to seconds."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">LW</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Lisa Wang</div>
                    <div className="text-gray-400 text-sm">Managing Director, Urban Estates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              🚀 Ready to Transform Your Real Estate Business?
            </h2>
            <p className="text-2xl text-gray-300 mb-4">Don't let another lead slip away.</p>
            <p className="text-2xl text-blue-400 mb-8 font-semibold">
              Start automating today and see results within 30 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Enterprise Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with ARIA Bot
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Sales Team
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">30 sec</div>
                <div className="text-gray-400">Average response time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">450%</div>
                <div className="text-gray-400">Average ROI increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-gray-400">Lead qualification</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl">MELANO INC</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Enterprise-grade AI automation solutions for real estate professionals. Transform your marketing,
                automate lead generation, and scale your business with intelligent bots.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Twitter
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Lead Qualification Bots
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Marketing Automation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    CRM Integration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Analytics Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Schedule Demo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Sales Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Chat with ARIA
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Melano Inc. All rights reserved.
              <span className="text-blue-400 ml-2">Automation that delivers results.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
