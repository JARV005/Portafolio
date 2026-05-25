import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Johan Rivera — Technical Team Lead | Backend Developer .NET",
  description:
    "Technical Team Lead y Backend Developer .NET especializado en microservicios, arquitectura escalable y desarrollo backend moderno con ASP.NET Core. Clean Architecture, SOLID, DDD.",
  keywords: ["ASP.NET Core", "C#", ".NET", "Backend Developer", "Technical Lead", "Microservicios", "Docker", "Azure"],
  authors: [{ name: "Johan Rivera" }],
  openGraph: {
    title: "Johan Rivera — Technical Team Lead | Backend Developer .NET",
    description: "Especializado en microservicios, arquitectura escalable y desarrollo backend moderno.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
