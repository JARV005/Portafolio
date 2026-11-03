import type { ReactNode } from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { routing, type Locale } from "@/i18n/routing"
import "../globals.css"

export const metadata: Metadata = {
  title: "Johan Rivera — Desarrollador Backend · Team Leader en RIWI",
  description:
    "Desarrollador Backend (C#/.NET, Node.js, Azure) y Team Leader en RIWI. Construyo backend sólido, lidero equipos y formo coders.",
  authors: [{ name: "Johan Rivera" }],
  openGraph: {
    title: "Johan Rivera — Desarrollador Backend · Team Leader en RIWI",
    description:
      "Desarrollador Backend y Team Leader en RIWI. Microservicios .NET, Azure y formación de coders.",
    type: "website",
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased">
        <NextIntlClientProvider locale={locale as Locale}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
