import type { ReactNode } from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { archivo, geist, geistMono } from "@/lib/fonts"
import { LenisProvider, PowerMode } from "@/components/motion"
import { SiteNav } from "@/components/sections/SiteNav"
import { routing, type Locale } from "@/i18n/routing"
import "../globals.css"

const BASE_URL = "https://johan-rv.site"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: "%s — Johan Rivera",
    },
    description: t("description"),
    authors: [{ name: "Johan Rivera", url: BASE_URL }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "Johan Rivera",
      url: `${BASE_URL}/${locale}`,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
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

  const tA11y = await getTranslations({ locale, namespace: "a11y" })
  const content = (await import("@/content")).getContent(locale as Locale)

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.profile.name,
    jobTitle: content.profile.headline,
    url: BASE_URL,
    sameAs: content.contact
      .filter((c) => c.kind !== "email")
      .map((c) => c.href),
    email: content.contact.find((c) => c.kind === "email")?.href.replace(
      "mailto:",
      "",
    ),
    worksFor: { "@type": "Organization", name: "RIWI" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    knowsAbout: content.stackHighlights,
  }

  const fontVars = `${archivo.variable} ${geist.variable} ${geistMono.variable}`

  return (
    <html lang={locale} suppressHydrationWarning className={fontVars}>
      <body className="antialiased font-sans bg-bg text-fg">
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <a href="#content" className="skip-link">
          {tA11y("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale as Locale}>
          <LenisProvider>
            <SiteNav />
            <div id="content" tabIndex={-1}>
              {children}
            </div>
            <PowerMode />
          </LenisProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
