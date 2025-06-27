import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MelanIA Seguros - Protección Inteligente para tu Futuro",
  description:
    "Seguros inteligentes con IA para auto, hogar, vida y más. Cotiza en línea y obtén la mejor protección al mejor precio.",
  keywords: "seguros, auto, hogar, vida, comercial, viaje, celular, cotización, IA, inteligente",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
