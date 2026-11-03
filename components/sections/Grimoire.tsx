"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { useTranslations } from "next-intl"
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
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal, SectionLabel } from "@/components/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Grimoire as GrimoireData, GrimoirePage } from "@/content/types"

type GrimoireProps = { data: GrimoireData }

const TECH_ICON: Record<string, LucideIcon> = {
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

const TURN_MS = 800

export function Grimoire({ data }: GrimoireProps) {
  const t = useTranslations("sections")
  const tG = useTranslations("grimoire")
  const sectionRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [turningFrom, setTurningFrom] = useState<number | null>(null)
  const [opened, setOpened] = useState(false)
  const reduced = useReducedMotion()
  const total = data.pages.length

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (reduced) {
      setOpened(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setOpened(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  function goTo(next: number) {
    if (next === current || next < 0 || next >= total) return
    if (!reduced) {
      setTurningFrom(current)
      window.setTimeout(() => setTurningFrom(null), TURN_MS)
    }
    setCurrent(next)
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo(current + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo(current - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(total - 1)
    }
  }

  return (
    <section id="grimoire" ref={sectionRef} className="space-y-10">
      <SectionLabel kanji="書" label={t("grimoire")} index="04" />

      <Reveal>
        {data.intro ? (
          <p className="text-fg-dim max-w-2xl mx-auto text-center leading-relaxed">
            {data.intro}
          </p>
        ) : (
          <p className="font-mono text-xs text-ki/80 text-center">
            {tG("pendingIntro")}
          </p>
        )}
      </Reveal>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("grimoire")}
        tabIndex={0}
        onKeyDown={onKey}
        className="grimoire-stage focus-visible:outline-none"
      >
        {/* Mobile: scroll-snap carousel */}
        <ol className="grimoire-cards flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:hidden">
          {data.pages.map((page, i) => (
            <li
              key={page.id}
              className="snap-center shrink-0 w-[82%] sm:w-[55%]"
              aria-roledescription="slide"
              aria-label={`${page.title} — ${i + 1} / ${total}`}
            >
              <PageContent page={page} active animate={!reduced} tG={tG} />
            </li>
          ))}
        </ol>

        {/* Desktop: libro 3D */}
        <div className="hidden md:block">
          <div
            className="book"
            data-opened={opened || reduced ? "true" : "false"}
            data-reduced={reduced ? "true" : "false"}
          >
            <div className="book-spine" aria-hidden />

            <div className="book-cover" aria-hidden>
              <GrimoireSeal />
            </div>

            <ol className="book-pages">
              {data.pages.map((page, i) => {
                const state =
                  i === turningFrom
                    ? "turning-away"
                    : i < current
                      ? "turned"
                      : i === current
                        ? "active"
                        : "upcoming"
                return (
                  <li
                    key={page.id}
                    className="book-page"
                    data-state={state}
                    aria-roledescription="slide"
                    aria-label={`${page.title} — ${i + 1} / ${total}`}
                    aria-current={i === current ? "page" : undefined}
                    aria-hidden={i !== current}
                    style={{
                      zIndex:
                        state === "turning-away"
                          ? 30
                          : state === "active"
                            ? 20
                            : state === "turned"
                              ? 5 + i
                              : total - i,
                    }}
                  >
                    <PageContent
                      page={page}
                      active={i === current}
                      animate={!reduced}
                      tG={tG}
                    />
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 font-mono text-sm">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
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
              {tG("pageOf", { current: current + 1, total })}
            </span>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === total - 1}
              aria-label={tG("next")}
              className="p-2 text-fg-dim hover:text-ki disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden />
            </button>
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
  // Remount icons when the page becomes active so the stroke animation replays
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
                <Icon
                  aria-hidden
                  className="w-4 h-4 text-ki"
                  strokeWidth={1.5}
                />
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
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="var(--ki)"
        strokeWidth="0.6"
        opacity="0.9"
      />
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="none"
        stroke="var(--ki)"
        strokeWidth="0.4"
        opacity="0.55"
      />
      <circle
        cx="60"
        cy="60"
        r="18"
        fill="none"
        stroke="var(--ki)"
        strokeWidth="0.5"
      />
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="var(--ki)"
          strokeWidth="0.6"
          opacity="0.75"
        />
      ))}
      <polygon
        points="60,45 66,60 60,56 54,60"
        fill="url(#grimoire-seal)"
      />
      <polygon
        points="60,75 54,60 60,64 66,60"
        fill="url(#grimoire-seal)"
        opacity="0.55"
      />
      <text
        x="60"
        y="104"
        textAnchor="middle"
        fontSize="4.5"
        letterSpacing="3"
        fill="var(--ki)"
        opacity="0.7"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        GRIMORIO
      </text>
    </svg>
  )
}
