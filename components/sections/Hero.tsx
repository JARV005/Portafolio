"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useTranslations } from "next-intl"
import { ArrowRight, Youtube } from "lucide-react"
import dynamic from "next/dynamic"
import { SectionLabel } from "@/components/motion"
import { CvButton } from "@/components/ui/CvButton"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Profile, ContactLink } from "@/content/types"

const KiCanvas = dynamic(
  () => import("@/components/motion/KiCanvas").then((m) => m.KiCanvas),
  { ssr: false },
)

type HeroProps = {
  profile: Profile
  contact: ContactLink[]
  locationLabel: string
}

export function Hero({ profile, contact, locationLabel }: HeroProps) {
  const tCta = useTranslations("cta")
  const containerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [startCanvas, setStartCanvas] = useState(false)
  const [auraBoost, setAuraBoost] = useState(0)
  const [auraInView, setAuraInView] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    let id1 = 0
    let id2 = 0
    id1 = window.requestAnimationFrame(() => {
      id2 = window.requestAnimationFrame(() => setStartCanvas(true))
    })
    return () => {
      cancelAnimationFrame(id1)
      cancelAnimationFrame(id2)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setAuraInView(entry.isIntersecting)
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia("(hover: hover)").matches) return
    const el = containerRef.current
    const name = nameRef.current
    if (!el || !name) return

    let raf = 0
    let target = 0

    const onMove = (e: MouseEvent) => {
      const r = name.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const d = Math.sqrt(dx * dx + dy * dy)
      const maxD = 320
      target = Math.max(0, 1 - d / maxD) * 0.6
      if (!raf) raf = requestAnimationFrame(step)
    }
    const step = () => {
      setAuraBoost((prev) => {
        const next = prev + (target - prev) * 0.15
        if (Math.abs(next - target) > 0.005) {
          raf = requestAnimationFrame(step)
        } else {
          raf = 0
        }
        return next
      })
    }

    el.addEventListener("mousemove", onMove)
    return () => {
      el.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  const github = contact.find((c) => c.kind === "github")
  const linkedin = contact.find((c) => c.kind === "linkedin")
  const email = contact.find((c) => c.kind === "email")
  const youtube = contact.find((c) => c.kind === "youtube")

  const auraStyle = {
    "--aura-boost": auraBoost.toFixed(3),
  } as CSSProperties

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center px-6 overflow-hidden"
    >
      <div
        aria-hidden
        className={
          reduced
            ? "ki-aura-static"
            : `ki-aura ${auraInView ? "" : "ki-aura-paused"}`
        }
        style={auraStyle}
      />
      {startCanvas && !reduced && (
        <KiCanvas nameRef={nameRef} containerRef={containerRef} />
      )}

      <div className="relative z-10 mx-auto w-full max-w-3xl space-y-6">
        <SectionLabel kanji="気" label={locationLabel} index="00" />

        <h1
          ref={nameRef}
          className="hero-name font-display font-black text-5xl md:text-7xl leading-[1.02] tracking-tight"
          data-reduced={reduced ? "true" : "false"}
        >
          {profile.name}
        </h1>

        <p className="font-mono text-sm md:text-base tracking-wider text-fg-dim uppercase">
          {profile.headline}
        </p>

        {profile.trinity ? (
          <p className="text-fg-dim leading-relaxed max-w-2xl">{profile.trinity}</p>
        ) : (
          <p className="font-mono text-xs text-ki/80 max-w-2xl">
            ⚠ TODO: línea breve sobre Entrenar · Liderar · Enseñar
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-[var(--radius-ink)] bg-ki text-bg px-5 py-3 font-mono text-sm font-medium transition-transform hover:-translate-y-[1px]"
          >
            {tCta("viewProjects")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <CvButton href={profile.cvUrl} label={tCta("downloadCV")} />
        </div>

        <ul className="flex flex-wrap gap-4 pt-2 text-xs font-mono">
          {github && (
            <li>
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-dim hover:text-ki transition-colors"
              >
                GitHub
              </a>
            </li>
          )}
          {linkedin && (
            <li>
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-dim hover:text-ki transition-colors"
              >
                LinkedIn
              </a>
            </li>
          )}
          {youtube && (
            <li>
              <a
                href={youtube.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-fg-dim hover:text-ki transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" aria-hidden />
                YouTube
              </a>
            </li>
          )}
          {email && (
            <li>
              <a
                href={email.href}
                className="text-fg-dim hover:text-ki transition-colors"
              >
                Email
              </a>
            </li>
          )}
        </ul>
      </div>

      <ScrollIndicator label={tCta("scroll")} reduced={reduced} />
    </section>
  )
}

function ScrollIndicator({ label, reduced }: { label: string; reduced: boolean }) {
  return (
    <a
      href="#about"
      aria-label={label}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim hover:text-ki transition-colors"
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">{label}</span>
      <span aria-hidden className="relative block w-px h-10 overflow-hidden bg-stroke">
        {!reduced && <span className="scroll-trail absolute inset-x-0 top-0 h-3 bg-ki" />}
      </span>
    </a>
  )
}
