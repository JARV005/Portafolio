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
  Youtube,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Grimoire as GrimoireData, GrimoirePage } from "@/content/types"

type Slot =
  | { side: "cover-front" }
  | { side: "inner-front" }
  | { side: "intro" }
  | { side: "index" }
  | { side: "track-left"; page: GrimoirePage }
  | { side: "track-right"; page: GrimoirePage }
  | { side: "closing" }
  | { side: "youtube" }
  | { side: "inner-back" }
  | { side: "cover-back" }

type GrimoireBookProps = { data: GrimoireData }

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

const PROJECT_KANJI: Record<string, string> = {
  "csharp-dotnet": "識",
  nodejs: "繋",
  azure: "雲",
  "qa-automation": "試",
  algoritmia: "算",
  "html-css": "形",
  linux: "殻",
  databases: "蔵",
  requirements: "求",
  "aws-patterns": "型",
  devops: "環",
}

type FlipEngine = {
  destroy: () => void
  flipNext: () => void
  flipPrev: () => void
  turnToPage: (n: number) => void
  on: (ev: "flip", handler: (e: { data: number }) => void) => void
}

export default function GrimoireBook({ data }: GrimoireBookProps) {
  const t = useTranslations("sections")
  const tG = useTranslations("grimoire")
  const bookRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<FlipEngine | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  const pages = data.pages
  const slots: Slot[] = [
    { side: "cover-front" },
    { side: "inner-front" },
    { side: "intro" },
    { side: "index" },
    ...pages.flatMap<Slot>((p) => [
      { side: "track-left", page: p },
      { side: "track-right", page: p },
    ]),
    { side: "closing" },
    { side: "youtube" },
    { side: "inner-back" },
    { side: "cover-back" },
  ]
  const totalSlots = slots.length

  useEffect(() => {
    if (reduced) return
    if (!bookRef.current) return

    let destroyed = false
    let engine: FlipEngine | null = null

    import("page-flip").then(({ PageFlip }) => {
      if (destroyed || !bookRef.current) return
      const el = bookRef.current
      const pf = new PageFlip(el, {
        width: 380,
        height: 540,
        size: "stretch",
        minWidth: 300,
        maxWidth: 520,
        minHeight: 420,
        maxHeight: 720,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: true,
        flippingTime: 650,
        startZIndex: 10,
      })
      pf.loadFromHTML(el.querySelectorAll(".page"))
      pf.on("flip", (e) => setCurrentPage(e.data))
      engine = pf
      engineRef.current = pf
      setReady(true)
    })

    return () => {
      destroyed = true
      try {
        engine?.destroy()
      } catch {
        /* no-op */
      }
      engineRef.current = null
    }
  }, [reduced])

  function goTo(nextIndex: number) {
    const clamped = Math.min(totalSlots - 1, Math.max(0, nextIndex))
    if (reduced) {
      setCurrentPage(clamped)
      return
    }
    engineRef.current?.turnToPage(clamped)
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo(currentPage + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo(currentPage - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(totalSlots - 1)
    }
  }

  const trackIndex = (slug: string) => {
    const idx = pages.findIndex((p) => p.id === slug)
    if (idx < 0) return 0
    return 4 + idx * 2
  }

  return (
    <div className="grimoire-shell">
      <div className="grimoire-stack-left" aria-hidden style={{ width: `${Math.max(4, (currentPage / totalSlots) * 22)}px` }} />
      <div className="grimoire-stack-right" aria-hidden style={{ width: `${Math.max(4, ((totalSlots - currentPage) / totalSlots) * 22)}px` }} />

      <div
        role="region"
        aria-roledescription="book"
        aria-label={t("grimoire")}
        tabIndex={0}
        onKeyDown={onKey}
        className="relative outline-none"
      >
        <div ref={bookRef} className="grimoire-flipbook mx-auto">
          {/* 0: Portada */}
          <div className="page page-cover" data-density="hard">
            <PageFront />
          </div>
          {/* 1: Inner front (blank decorativa) */}
          <div className="page page-inner">
            <PageInner side="left" />
          </div>
          {/* 2: Intro */}
          <div className="page">
            <PageIntro intro={data.intro} pendingIntro={tG("pendingIntro")} />
          </div>
          {/* 3: Índice */}
          <div className="page">
            <PageIndex
              pages={pages}
              channelUrl={data.channelUrl}
              channelName={data.channelName}
              onJump={(slug) => goTo(trackIndex(slug))}
            />
          </div>
          {pages.map((page, i) => [
            <div key={`${page.id}-l`} className="page">
              <PageTrackLeft page={page} />
            </div>,
            <div key={`${page.id}-r`} className="page">
              <PageTrackRight
                page={page}
                tG={tG}
                pageNum={5 + i * 2}
                totalPages={totalSlots}
              />
            </div>,
          ])}
          {/* Closing */}
          <div className="page">
            <PageClosing />
          </div>
          <div className="page">
            <PageYouTube
              channelUrl={data.channelUrl}
              channelName={data.channelName}
            />
          </div>
          {/* Inner back */}
          <div className="page page-inner">
            <PageInner side="right" />
          </div>
          {/* Back cover */}
          <div className="page page-cover" data-density="hard">
            <PageBack />
          </div>
        </div>

        {/* Reduced motion fallback — simple fade carousel */}
        {reduced && (
          <div className="reduced-pages">
            <article
              aria-live="polite"
              className="reduced-page bg-surface border-2 rounded-[var(--radius-ink)] p-6"
              style={{ borderColor: "var(--stroke)" }}
            >
              {renderReduced(slots[currentPage] ?? slots[0]!, data, tG)}
            </article>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div
          className="flex items-center gap-6 font-mono text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label={tG("prev")}
            className="p-2 text-fg-dim hover:text-ki disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <span className="tabular-nums text-fg-dim">
            {tG("pageOf", { current: currentPage + 1, total: totalSlots })}
          </span>
          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage >= totalSlots - 1}
            aria-label={tG("next")}
            className="p-2 text-fg-dim hover:text-ki disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>
        {ready && !reduced && (
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim/70">
            {tG("dragHint")}
          </p>
        )}
      </div>
    </div>
  )
}

/* ---------- Page components ---------- */

function PageFront() {
  return (
    <div className="relative h-full w-full bg-[#0b0a0d] text-[#f1ece2] p-6 flex flex-col items-center justify-center gap-5 overflow-hidden">
      <span aria-hidden className="absolute inset-0 grain opacity-[0.08]" />
      <span
        aria-hidden
        className="absolute inset-[6px] rounded-[4px]"
        style={{ border: "1px solid color-mix(in oklab, #ffb224 30%, transparent)" }}
      />
      <GrimoireSeal />
      <div
        className="font-display font-black text-2xl uppercase tracking-[0.3em] text-[#ffb224]"
        style={{ textShadow: "0 0 24px rgba(255,178,36,0.35)" }}
      >
        Grimorio
      </div>
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#a39e95]">
        The Dev Grimoire
      </div>
    </div>
  )
}

function PageBack() {
  return (
    <div className="relative h-full w-full bg-[#0b0a0d] text-[#f1ece2] p-6 flex flex-col items-center justify-center gap-4 overflow-hidden">
      <span aria-hidden className="absolute inset-0 halftone opacity-20 text-[#ffb224]" />
      <GrimoireSealBack />
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#a39e95]">
        <span lang="ja" style={{ fontFamily: "var(--font-kanji)" }}>終</span>
      </div>
    </div>
  )
}

function PageInner({ side }: { side: "left" | "right" }) {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] overflow-hidden grimoire-paper">
      <div
        className="absolute top-6 right-6 left-6 flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-[#4a4740]"
      >
        <span>The Dev Grimoire</span>
        <span style={{ fontFamily: "var(--font-kanji)" }}>気</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          lang="ja"
          className="text-[14rem] leading-none"
          style={{
            fontFamily: "var(--font-kanji)",
            color: "color-mix(in oklab, #ffb224 20%, transparent)",
          }}
        >
          {side === "left" ? "書" : "終"}
        </span>
      </div>
    </div>
  )
}

function PageIntro({
  intro,
  pendingIntro,
}: {
  intro: string | null
  pendingIntro: string
}) {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="left" />
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em]"
          style={{ color: "#a86618" }}
        >
          I · Enseñar
        </div>
        <h2
          className="font-display font-black text-3xl leading-tight"
          style={{ color: "#111014" }}
        >
          {intro ? intro : "Enseñar es dejar que el equipo te alcance."}
        </h2>
        {!intro && (
          <p className="font-mono text-[0.65rem]" style={{ color: "#a86618" }}>
            {pendingIntro}
          </p>
        )}
      </div>
      <PageNumber side="left" n={3} />
    </div>
  )
}

function PageIndex({
  pages,
  channelUrl,
  channelName,
  onJump,
}: {
  pages: GrimoirePage[]
  channelUrl: string
  channelName: string
  onJump: (slug: string) => void
}) {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="right" />
      <div className="flex-1 flex flex-col gap-3 pt-6">
        <div
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em]"
          style={{ color: "#a86618" }}
        >
          Índice
        </div>
        <ol className="space-y-1.5 font-mono text-[0.72rem]" style={{ color: "#111014" }}>
          {pages.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onJump(p.id)}
                className="flex items-baseline gap-2 text-left hover:underline underline-offset-2"
                style={{ color: "inherit" }}
              >
                <span className="tabular-nums w-5" style={{ color: "#a86618" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[0.7rem]"
          style={{ color: "#a86618" }}
        >
          <Youtube className="w-3.5 h-3.5" aria-hidden />
          {channelName} ↗
        </a>
      </div>
      <PageNumber side="right" n={4} />
    </div>
  )
}

function PageTrackLeft({ page }: { page: GrimoirePage }) {
  const kanji = PROJECT_KANJI[page.id] ?? "書"
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="left" />
      <div className="flex-1 flex flex-col gap-5 pt-6">
        <span
          aria-hidden
          lang="ja"
          className="absolute right-6 top-1/4 text-[9rem] leading-none pointer-events-none"
          style={{
            fontFamily: "var(--font-kanji)",
            color: "color-mix(in oklab, #a86618 25%, transparent)",
          }}
        >
          {kanji}
        </span>
        <h3
          className="font-display font-black text-3xl leading-[1.05]"
          style={{ color: "#111014" }}
        >
          {page.title}
        </h3>
        <div>
          <div
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] mb-1"
            style={{ color: "#a86618" }}
          >
            Qué aprenden
          </div>
          <p className="text-[0.85rem] leading-relaxed" style={{ color: "#111014" }}>
            {page.learn}
          </p>
        </div>
      </div>
      <PageNumber side="left" n={0} />
    </div>
  )
}

function PageTrackRight({
  page,
  tG,
  pageNum,
  totalPages,
}: {
  page: GrimoirePage
  tG: ReturnType<typeof useTranslations>
  pageNum: number
  totalPages: number
}) {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="right" />
      <div className="flex-1 flex flex-col gap-4 pt-6">
        <div>
          <div
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] mb-1"
            style={{ color: "#a86618" }}
          >
            Mi enfoque
          </div>
          <p className="text-[0.85rem] leading-relaxed" style={{ color: "#111014" }}>
            {page.approach}
          </p>
        </div>
        <div>
          <div
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] mb-2"
            style={{ color: "#a86618" }}
          >
            Runas
          </div>
          <div className="runes flex flex-wrap gap-2.5">
            {page.stack.map((tech, i) => {
              const Icon = TECH_ICON[tech] ?? Code2
              return (
                <span
                  key={tech + i}
                  className="rune inline-flex items-center gap-1 px-2 py-1 border-2 rounded-[4px]"
                  style={{
                    borderColor: "#a86618",
                    color: "#111014",
                    ["--rune-i" as string]: i,
                  }}
                >
                  <Icon
                    className="w-3 h-3"
                    aria-hidden
                    strokeWidth={1.8}
                    style={{ color: "#a86618" }}
                  />
                  <span className="font-mono text-[0.65rem]">{tech}</span>
                </span>
              )
            })}
          </div>
        </div>
        <div className="mt-auto">
          {page.materialUrl ? (
            <a
              href={page.materialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] underline underline-offset-4"
              style={{ color: "#a86618" }}
            >
              {tG("material")} ↗
            </a>
          ) : (
            <p className="font-mono text-[0.6rem]" style={{ color: "#a86618" }}>
              ⚠ {tG("pendingMaterial")}
            </p>
          )}
        </div>
      </div>
      <PageNumber side="right" n={pageNum} total={totalPages} />
    </div>
  )
}

function PageClosing() {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="left" />
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em]"
          style={{ color: "#a86618" }}
        >
          Fin del grimorio
        </div>
        <p className="text-[0.95rem] leading-relaxed" style={{ color: "#111014" }}>
          Cada track vive más allá de este libro. Los coders lo continúan en sus proyectos.
        </p>
      </div>
      <PageNumber side="left" n={0} />
    </div>
  )
}

function PageYouTube({
  channelUrl,
  channelName,
}: {
  channelUrl: string
  channelName: string
}) {
  return (
    <div className="relative h-full w-full bg-[#F4EFE6] text-[#111014] p-8 flex flex-col overflow-hidden grimoire-paper">
      <RunningHeader side="right" />
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 pt-6">
        <GrimoireSealBack />
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border-2 rounded-[6px] font-mono text-sm"
          style={{ borderColor: "#a86618", color: "#111014" }}
        >
          <Youtube className="w-4 h-4" style={{ color: "#a86618" }} aria-hidden />
          {channelName}
          <span aria-hidden>↗</span>
        </a>
      </div>
      <PageNumber side="right" n={0} />
    </div>
  )
}

function RunningHeader({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-5 ${side === "left" ? "left-6" : "right-6"} font-mono text-[0.55rem] uppercase tracking-[0.3em]`}
      style={{ color: "#4a4740" }}
    >
      The Dev Grimoire
    </div>
  )
}

function PageNumber({
  side,
  n,
  total,
}: {
  side: "left" | "right"
  n: number
  total?: number
}) {
  if (!n) return null
  return (
    <div
      className={`absolute bottom-5 ${side === "left" ? "left-6" : "right-6"} font-mono text-[0.55rem] tabular-nums`}
      style={{ color: "#4a4740" }}
    >
      {total ? `${n} / ${total}` : n}
    </div>
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
    <svg viewBox="0 0 120 120" aria-hidden className="w-32 h-32">
      <defs>
        <linearGradient id="g-seal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb224" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffb224" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="#ffb224" strokeWidth="0.6" opacity="0.9" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#ffb224" strokeWidth="0.4" opacity="0.55" />
      <circle cx="60" cy="60" r="18" fill="none" stroke="#ffb224" strokeWidth="0.5" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#ffb224" strokeWidth="0.6" opacity="0.75" />
      ))}
      <polygon points="60,45 66,60 60,56 54,60" fill="url(#g-seal)" />
      <polygon points="60,75 54,60 60,64 66,60" fill="url(#g-seal)" opacity="0.55" />
    </svg>
  )
}

function GrimoireSealBack() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="w-24 h-24">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#a86618" strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x1 = 60 + Math.cos(a) * 20
        const y1 = 60 + Math.sin(a) * 20
        const x2 = 60 + Math.cos(a) * 44
        const y2 = 60 + Math.sin(a) * 44
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a86618" strokeWidth="0.4" opacity="0.5" />
        )
      })}
    </svg>
  )
}

/* ---------- Reduced motion fallback ---------- */

function renderReduced(
  slot: Slot,
  data: GrimoireData,
  tG: ReturnType<typeof useTranslations>,
) {
  if (slot.side === "cover-front") return <PageFront />
  if (slot.side === "cover-back") return <PageBack />
  if (slot.side === "inner-front") return <PageInner side="left" />
  if (slot.side === "inner-back") return <PageInner side="right" />
  if (slot.side === "intro")
    return <PageIntro intro={data.intro} pendingIntro={tG("pendingIntro")} />
  if (slot.side === "index")
    return (
      <PageIndex
        pages={data.pages}
        channelUrl={data.channelUrl}
        channelName={data.channelName}
        onJump={() => {}}
      />
    )
  if (slot.side === "closing") return <PageClosing />
  if (slot.side === "youtube")
    return <PageYouTube channelUrl={data.channelUrl} channelName={data.channelName} />
  if (slot.side === "track-left") return <PageTrackLeft page={slot.page} />
  return (
    <PageTrackRight
      page={slot.page}
      tG={tG}
      pageNum={0}
      totalPages={0}
    />
  )
}
