"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { ArrowRight, Youtube } from "lucide-react"
import dynamic from "next/dynamic"
import { SectionLabel } from "@/components/motion"
import { CvButton } from "@/components/ui/CvButton"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { generateSpeedLines } from "@/lib/speed-lines"
import type { Profile, ContactLink } from "@/content/types"

const HERO_AVATAR_LINES = generateSpeedLines({
  count: 18,
  innerRadius: 15,
  outerRadius: 65,
})

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
  const tA11y = useTranslations("a11y")
  const containerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [startCanvas, setStartCanvas] = useState(false)
  const [avatarEntered, setAvatarEntered] = useState(false)
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

  // Avatar entrance: tras la carga de ki (~2s desde mount)
  useEffect(() => {
    if (reduced) {
      setAvatarEntered(true)
      return
    }
    const t = window.setTimeout(() => setAvatarEntered(true), 2000)
    return () => window.clearTimeout(t)
  }, [reduced])

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

  // Parallax del cursor (solo desktop + hover disponible)
  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return
    const el = containerRef.current
    const name = nameRef.current
    const avatar = avatarRef.current
    if (!el || !name || !avatar) return

    let raf = 0
    let targetBoost = 0
    let targetParallaxX = 0
    let targetParallaxY = 0
    let currentBoost = 0
    let currentParallaxX = 0
    let currentParallaxY = 0

    const onMove = (e: MouseEvent) => {
      const r = name.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const d = Math.sqrt(dx * dx + dy * dy)
      const maxD = 320
      targetBoost = Math.max(0, 1 - d / maxD) * 0.6

      const w = window.innerWidth
      const h = window.innerHeight
      targetParallaxX = ((e.clientX - w / 2) / (w / 2)) * 8
      targetParallaxY = ((e.clientY - h / 2) / (h / 2)) * 8

      if (!raf) raf = requestAnimationFrame(step)
    }

    const step = () => {
      currentBoost += (targetBoost - currentBoost) * 0.15
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.12
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.12

      setAuraBoost(currentBoost)
      if (avatar) {
        avatar.style.transform = `translate3d(${currentParallaxX.toFixed(2)}px, ${currentParallaxY.toFixed(2)}px, 0)`
      }

      if (
        Math.abs(currentBoost - targetBoost) > 0.005 ||
        Math.abs(currentParallaxX - targetParallaxX) > 0.1 ||
        Math.abs(currentParallaxY - targetParallaxY) > 0.1
      ) {
        raf = requestAnimationFrame(step)
      } else {
        raf = 0
      }
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
      className="relative min-h-[92vh] flex items-center justify-center px-6 py-16 overflow-hidden"
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

      <div className="hero-vignette relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-center">
          <div className="space-y-5 md:py-10 md:pl-10">
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

            {profile.trinity && (
              <p className="text-fg-dim leading-relaxed max-w-xl">
                {profile.trinity}
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

          {/* Avatar container: rompe la viñeta con overflow */}
          <div className="hero-avatar-slot relative">
            <div
              ref={avatarRef}
              className={`hero-avatar ${avatarEntered ? "hero-avatar-in" : ""} ${reduced ? "hero-avatar-reduced" : ""}`}
            >
              <span aria-hidden className="hero-avatar-aura" />
              {!reduced && (
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="hero-avatar-speed"
                >
                  {HERO_AVATAR_LINES.map((l, i) => (
                    <line
                      key={i}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke="currentColor"
                      strokeWidth="0.35"
                    />
                  ))}
                </svg>
              )}
              <span aria-hidden className="hero-avatar-flash" />
              <Image
                src="/avatar/johan-saludo.png"
                alt={tA11y("avatarWave")}
                width={1312}
                height={1199}
                sizes="(max-width: 768px) 90vw, 480px"
                priority
                className="hero-avatar-img"
              />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator label={tCta("scroll")} reduced={reduced} />
    </section>
  )
}

function ScrollIndicator({
  label,
  reduced,
}: {
  label: string
  reduced: boolean
}) {
  return (
    <a
      href="#about"
      aria-label={label}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim hover:text-ki transition-colors z-20"
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">
        {label}
      </span>
      <span
        aria-hidden
        className="relative block w-px h-10 overflow-hidden bg-stroke"
      >
        {!reduced && (
          <span className="scroll-trail absolute inset-x-0 top-0 h-3 bg-ki" />
        )}
      </span>
    </a>
  )
}
