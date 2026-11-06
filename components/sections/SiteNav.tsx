"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useTheme } from "@/hooks/useTheme"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Locale } from "@/i18n/routing"

const SECTIONS = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "squad", href: "#squad" },
  { key: "grimoire", href: "#grimoire" },
  { key: "projects", href: "#projects" },
  { key: "arsenal", href: "#arsenal" },
  { key: "contact", href: "#contact" },
] as const

export function SiteNav() {
  const t = useTranslations("nav")
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const reduced = useReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (pathname?.startsWith("/dev")) return null

  function switchLocale(to: Locale) {
    if (to !== locale) router.replace(pathname, { locale: to })
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 backdrop-blur transition-all duration-300 ${
          scrolled ? "h-12 bg-bg/85" : "h-16 bg-bg/60"
        }`}
        style={{ borderBottom: "1px solid color-mix(in oklab, var(--stroke) 70%, transparent)" }}
      >
        <div className="h-full max-w-6xl mx-auto px-5 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display font-black tracking-tight text-fg text-lg leading-none"
          >
            JR
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-mono text-fg-dim">
            {SECTIONS.map((s) => (
              <a key={s.key} href={s.href} className="hover:text-ki transition-colors">
                {t(s.key)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={() => switchLocale("es")}
              className={locale === "es" ? "text-ki" : "text-fg-dim hover:text-fg transition-colors"}
            >
              ES
            </button>
            <span className="text-stroke">/</span>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={locale === "en" ? "text-ki" : "text-fg-dim hover:text-fg transition-colors"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="ml-2 p-1 text-fg-dim hover:text-ki transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="button"
            className="md:hidden text-fg-dim"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso: barra de energía ki → ki-blue */}
        <div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, var(--ki), var(--ki-blue))",
            boxShadow: "0 0 8px color-mix(in oklab, var(--ki) 60%, transparent)",
            transition: reduced ? undefined : "width 90ms linear",
          }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 bg-bg text-fg md:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "circle(0% at 90% 10%)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "circle(140% at 90% 10%)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.35, ease: [0.6, 0.05, 0.1, 1] }}
          >
            <div className="flex items-center justify-between px-5 h-16">
              <span className="font-display font-black text-lg">JR</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-fg-dim"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 py-10">
              {SECTIONS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="font-display font-black text-3xl text-fg hover:text-ki transition-colors"
                >
                  {t(s.key)}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-4 py-6 font-mono text-sm">
              <button
                type="button"
                onClick={() => {
                  switchLocale("es")
                  setOpen(false)
                }}
                className={locale === "es" ? "text-ki" : "text-fg-dim"}
              >
                ES
              </button>
              <span className="text-stroke">/</span>
              <button
                type="button"
                onClick={() => {
                  switchLocale("en")
                  setOpen(false)
                }}
                className={locale === "en" ? "text-ki" : "text-fg-dim"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                className="ml-4 p-1 text-fg-dim hover:text-ki"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
