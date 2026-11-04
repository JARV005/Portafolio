"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Binary,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Database,
  FileText,
  FlaskConical,
  GitBranch,
  Server,
  Terminal,
  Workflow,
  Youtube,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal, SectionLabel } from "@/components/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Grimoire as GrimoireData, GrimoirePage } from "@/content/types"

type GrimoireProps = { data: GrimoireData }

const TECH_ICON: Record<string, LucideIcon> = {
  "C#": Code2,
  ".NET": Server,
  "EF Core": Database,
  JavaScript: Code2,
  "Node.js": Server,
  Express: Server,
  Azure: Cloud,
  "App Service": Cloud,
  Storage: Database,
  xUnit: FlaskConical,
  Playwright: FlaskConical,
  CI: GitBranch,
  Algoritmia: Binary,
  HTML: Code2,
  CSS: Code2,
  Linux: Terminal,
  Bash: Terminal,
  SQL: Database,
  PostgreSQL: Database,
  "SQL Server": Database,
  UML: FileText,
  "User Stories": FileText,
  AWS: Cloud,
  EC2: Cloud,
  Patterns: Workflow,
  Docker: Container,
  "CI/CD": GitBranch,
}

type SlideKind = "front" | "page" | "back"
type Slide =
  | { kind: "front" }
  | { kind: "page"; page: GrimoirePage }
  | { kind: "back" }

export function Grimoire({ data }: GrimoireProps) {
  const t = useTranslations("sections")
  const tG = useTranslations("grimoire")
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  const slides: Slide[] = [
    { kind: "front" },
    ...data.pages.map((page) => ({ kind: "page" as const, page })),
    { kind: "back" },
  ]
  const total = slides.length

  useEffect(() => {
    if (reduced) return
    const container = containerRef.current
    if (!container) return

    gsap.registerPlugin(ScrollTrigger)
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const raw = self.progress * (total - 0.001)
        const idx = Math.min(total - 1, Math.max(0, Math.floor(raw)))
        setIndex(idx)
      },
    })

    return () => st.kill()
  }, [reduced, total])

  function goTo(nextIndex: number) {
    const clamped = Math.min(total - 1, Math.max(0, nextIndex))
    if (reduced) {
      setIndex(clamped)
      return
    }
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const scrollY = window.scrollY
    const containerTop = rect.top + scrollY
    const containerHeight = container.offsetHeight
    const viewport = window.innerHeight
    const scrollable = containerHeight - viewport
    const targetProgress = (clamped + 0.5) / total
    const targetY = containerTop + targetProgress * scrollable
    window.scrollTo({ top: targetY, behavior: "smooth" })
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo(index + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo(index - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(total - 1)
    }
  }

  const slide = slides[index] ?? slides[0]!
  const slideKind: SlideKind = slide.kind
  const pageNumberText =
    slideKind === "page"
      ? tG("pageOf", { current: index, total: data.pages.length })
      : slideKind === "front"
        ? "—"
        : `${data.pages.length} / ${data.pages.length}`

  const headerLink = (
    <a
      href={data.channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-xs text-fg-dim hover:text-ki transition-colors"
    >
      <Youtube className="w-4 h-4 text-ki" aria-hidden />
      Ver {data.channelName} en YouTube
      <span aria-hidden>↗</span>
    </a>
  )

  return (
    <section id="grimoire" className="space-y-10">
      <SectionLabel kanji="書" label={t("grimoire")} index="04" />

      <Reveal>
        <div className="flex flex-col items-center gap-3 text-center">
          {data.intro ? (
            <p className="text-fg-dim max-w-2xl leading-relaxed">{data.intro}</p>
          ) : (
            <p className="font-mono text-xs text-ki/80">{tG("pendingIntro")}</p>
          )}
          {headerLink}
        </div>
      </Reveal>

      {/* Mobile: scroll-snap con portada, páginas y contraportada */}
      <ol
        className="grimoire-cards flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:hidden"
        aria-label={t("grimoire")}
      >
        <li
          className="snap-center shrink-0 w-[82%] sm:w-[55%]"
          aria-roledescription="slide"
          aria-label="Portada"
        >
          <CoverCard channelUrl={data.channelUrl} channelName={data.channelName} variant="front" />
        </li>
        {data.pages.map((page, i) => (
          <li
            key={page.id}
            className="snap-center shrink-0 w-[82%] sm:w-[55%]"
            aria-roledescription="slide"
            aria-label={`${page.title} — ${i + 1} / ${data.pages.length}`}
          >
            <PageContent page={page} active animate={!reduced} tG={tG} />
          </li>
        ))}
        <li
          className="snap-center shrink-0 w-[82%] sm:w-[55%]"
          aria-roledescription="slide"
          aria-label="Contraportada"
        >
          <CoverCard channelUrl={data.channelUrl} channelName={data.channelName} variant="back" />
        </li>
      </ol>

      {/* Desktop: flipbook con scrub + sticky */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: reduced ? "auto" : `${total * 45}vh` }}
      >
        <div
          className={reduced ? "" : "sticky top-0 h-screen flex items-center justify-center"}
        >
          <div className="w-full flex flex-col items-center gap-6">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={t("grimoire")}
              tabIndex={0}
              onKeyDown={onKey}
              className="grimoire-stage focus-visible:outline-none"
            >
              <div
                className="flipbook"
                data-reduced={reduced ? "true" : "false"}
              >
                <ol className="flipbook-pages">
                  {slides.map((s, i) => {
                    const state =
                      i < index
                        ? "turned"
                        : i === index
                          ? "active"
                          : "upcoming"
                    const zIndex =
                      state === "active" ? 30 : state === "turned" ? i : total - i
                    return (
                      <li
                        key={i}
                        className={`flipbook-page ${s.kind === "front" ? "flipbook-front" : s.kind === "back" ? "flipbook-back" : ""}`}
                        data-state={state}
                        aria-roledescription="slide"
                        aria-label={
                          s.kind === "front"
                            ? "Portada"
                            : s.kind === "back"
                              ? "Contraportada"
                              : `${s.page.title} — ${i} / ${data.pages.length}`
                        }
                        aria-current={i === index ? "page" : undefined}
                        aria-hidden={i !== index}
                        style={{ zIndex }}
                      >
                        {s.kind === "front" ? (
                          <FrontCoverContent />
                        ) : s.kind === "back" ? (
                          <BackCoverContent
                            channelUrl={data.channelUrl}
                            channelName={data.channelName}
                          />
                        ) : (
                          <PageContent
                            page={s.page}
                            active={i === index}
                            animate={!reduced}
                            tG={tG}
                          />
                        )}
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 font-mono text-sm">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label={tG("prev")}
                className="p-2 text-fg-dim hover:text-ki disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
              </button>
              <span
                aria-live="polite"
                aria-atomic="true"
                className="tabular-nums text-fg-dim"
              >
                {pageNumberText}
              </span>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
                aria-label={tG("next")}
                className="p-2 text-fg-dim hover:text-ki disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageContent({
  page,
  active,
  animate,
  tG,
}: {
  page: GrimoirePage
  active: boolean
  animate: boolean
  tG: ReturnType<typeof useTranslations>
}) {
  const iconsKey = active ? `${page.id}:on` : `${page.id}:off`
  return (
    <article className="grimoire-card relative h-full p-6 md:p-8 overflow-hidden">
      <span aria-hidden className="absolute inset-0 grain opacity-[0.05]" />
      <div className="relative flex flex-col h-full gap-4">
        <header>
          <h3 className="font-display font-black text-2xl md:text-3xl">
            {page.title}
          </h3>
        </header>
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-1">
            {tG("learnLabel")}
          </div>
          <p className="text-sm text-fg-dim leading-relaxed">{page.learn}</p>
        </div>
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-1">
            {tG("approachLabel")}
          </div>
          <p className="text-sm text-fg-dim leading-relaxed">{page.approach}</p>
        </div>
        <div
          key={iconsKey}
          className={`${animate && active ? "track-icons" : ""} flex flex-wrap gap-x-4 gap-y-2 pt-2`}
        >
          {page.stack.map((tech, i) => {
            const Icon = TECH_ICON[tech] ?? Code2
            return (
              <span
                key={tech + i}
                className="track-icon flex items-center gap-1.5"
                style={{ ["--icon-i" as string]: i }}
              >
                <Icon aria-hidden className="w-4 h-4 text-ki" strokeWidth={1.5} />
                <span className="font-mono text-[0.65rem] text-fg-dim">
                  {tech}
                </span>
              </span>
            )
          })}
        </div>
        <div className="mt-auto pt-4">
          {page.materialUrl ? (
            <a
              href={page.materialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs underline underline-offset-4 text-fg hover:text-ki transition-colors"
            >
              {tG("material")} ↗
            </a>
          ) : (
            <p className="font-mono text-[0.65rem] text-ki/80">
              ⚠ {tG("pendingMaterial")}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

function CoverCard({
  channelUrl,
  channelName,
  variant,
}: {
  channelUrl: string
  channelName: string
  variant: "front" | "back"
}) {
  return (
    <article className="grimoire-cover-card relative h-full min-h-[360px] p-6 flex flex-col items-center justify-center text-center gap-4">
      {variant === "front" ? (
        <>
          <GrimoireSeal />
          <div className="font-display font-black text-xl uppercase tracking-widest text-ki">
            Grimorio
          </div>
        </>
      ) : (
        <>
          <GrimoireSealBack />
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-fg hover:text-ki transition-colors underline underline-offset-4"
          >
            <Youtube className="w-4 h-4 text-ki" aria-hidden />
            {channelName}
          </a>
        </>
      )}
    </article>
  )
}

function FrontCoverContent() {
  return (
    <article className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center overflow-hidden">
      <span aria-hidden className="absolute inset-0 grain opacity-[0.07]" />
      <GrimoireSeal />
      <div className="font-display font-black text-xl md:text-2xl uppercase tracking-widest text-ki">
        Grimorio
      </div>
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
        The Dev Grimoire
      </p>
    </article>
  )
}

function BackCoverContent({
  channelUrl,
  channelName,
}: {
  channelUrl: string
  channelName: string
}) {
  return (
    <article className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center gap-5 text-center overflow-hidden">
      <span aria-hidden className="absolute inset-0 halftone opacity-20 text-ki" />
      <GrimoireSealBack />
      <div className="relative">
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-3">
          <span lang="ja" style={{ fontFamily: "var(--font-kanji)" }}>終</span>
          <span className="mx-2">·</span>
          <span>Fin</span>
        </div>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ink)] border-2 font-mono text-sm text-fg hover:border-ki hover:text-ki transition-colors"
          style={{ borderColor: "var(--stroke)" }}
        >
          <Youtube className="w-4 h-4 text-ki" aria-hidden />
          {channelName}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  )
}

function GrimoireSeal() {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    return {
      x1: 60 + Math.cos(a) * 34,
      y1: 60 + Math.sin(a) * 34,
      x2: 60 + Math.cos(a) * 48,
      y2: 60 + Math.sin(a) * 48,
    }
  })
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className="w-32 h-32 md:w-40 md:h-40"
    >
      <defs>
        <linearGradient id="grimoire-seal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--ki)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--ki)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--ki)" strokeWidth="0.6" opacity="0.9" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="var(--ki)" strokeWidth="0.4" opacity="0.55" />
      <circle cx="60" cy="60" r="18" fill="none" stroke="var(--ki)" strokeWidth="0.5" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="var(--ki)" strokeWidth="0.6" opacity="0.75" />
      ))}
      <polygon points="60,45 66,60 60,56 54,60" fill="url(#grimoire-seal)" />
      <polygon points="60,75 54,60 60,64 66,60" fill="url(#grimoire-seal)" opacity="0.55" />
    </svg>
  )
}

function GrimoireSealBack() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="w-28 h-28 md:w-32 md:h-32">
      <circle cx="60" cy="60" r="48" fill="none" stroke="var(--ki)" strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x1 = 60 + Math.cos(a) * 20
        const y1 = 60 + Math.sin(a) * 20
        const x2 = 60 + Math.cos(a) * 44
        const y2 = 60 + Math.sin(a) * 44
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ki)" strokeWidth="0.4" opacity="0.5" />
        )
      })}
    </svg>
  )
}
