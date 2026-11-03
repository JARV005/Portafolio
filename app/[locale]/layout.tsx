import type { ReactNode } from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { archivo, geist, geistMono } from "@/lib/fonts"
import { LenisProvider, PowerMode } from "@/components/motion"
import { SiteNav } from "@/components/sections/SiteNav"
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

const FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const fontVars = `${archivo.variable} ${geist.variable} ${geistMono.variable}`

  return (
    <html lang={locale} suppressHydrationWarning className={fontVars}>
      <body className="antialiased font-sans bg-bg text-fg">
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
        <NextIntlClientProvider locale={locale as Locale}>
          <LenisProvider>
            <SiteNav />
            {children}
            <PowerMode />
          </LenisProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
