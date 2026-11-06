"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
import { InkPanel, Reveal, SectionLabel, SplitHeading } from "@/components/motion"
import { Counter } from "@/components/ui/Counter"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { generateRadialPoints } from "@/lib/speed-lines"
import type { Leadership } from "@/content/types"

const SquadCanvas = dynamic(
  () => import("@/components/motion/SquadCanvas").then((m) => m.SquadCanvas),
  { ssr: false },
)

type SquadProps = {
  leadership: Leadership
}

export function Squad({ leadership }: SquadProps) {
  const t = useTranslations("sections")
  const tSquad = useTranslations("squad")
  const containerRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const releaseRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<Array<HTMLDivElement | null>>([])
  const progressRef = useRef(0)
  const reduced = useReducedMotion()

  // ScrollTrigger: scrub updates progressRef
  useEffect(() => {
    if (reduced) return
    const container = containerRef.current
    if (!container) return

    gsap.registerPlugin(ScrollTrigger)
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
      onEnter: () => {
        progressRef.current = 0
      },
      onEnterBack: () => {
        /* no-op */
      },
    })
    return () => trigger.kill()
  }, [reduced])

  // DOM render loop: reads progressRef and updates core/release/flash/labels
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const tick = () => {
      const p = progressRef.current
      const scale = 0.4 + p * 1.1
      const glow = Math.min(1, p * 1.3)
      const releaseOp = Math.max(0, (p - 0.72) * 3.5)
      const flashOp =
        p > 0.76 && p < 0.9 ? Math.max(0, 1 - Math.abs(p - 0.82) * 18) : 0
      const labelOp = 0.4 + p * 0.6

      if (coreRef.current) {
        coreRef.current.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`
        coreRef.current.style.boxShadow = `0 0 ${(16 + glow * 56).toFixed(1)}px color-mix(in oklab, var(--ki) ${(30 + glow * 55).toFixed(0)}%, transparent)`
      }
      if (releaseRef.current) {
        releaseRef.current.style.opacity = releaseOp.toFixed(3)
      }
      if (flashRef.current) {
        flashRef.current.style.opacity = flashOp.toFixed(3)
      }
      labelRefs.current.forEach((el) => {
        if (el) el.style.opacity = labelOp.toFixed(3)
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const nodes = leadership.nodes
  const visibleMetrics = leadership.metrics.filter((m) => m.value !== null)
  const spokePoints = generateRadialPoints({
    count: nodes.length,
    radius: 42,
  })
  const labelPoints = generateRadialPoints({
    count: nodes.length,
    radius: 44,
  })

  return (
    <section id="squad" className="relative space-y-16">
      <SectionLabel kanji="隊" label={t("squad")} index="03" />

      {/* Scroll-driven stage */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: reduced ? "auto" : "220vh" }}
      >
        <div
          className={
            reduced
              ? "relative"
              : "sticky top-0 h-screen flex items-center justify-center"
          }
        >
          <div className="relative w-full max-w-xl aspect-square mx-auto">
            {!reduced && (
              <SquadCanvas progressRef={progressRef} nodeCount={nodes.length} />
            )}

            {/* Reduced-motion static spokes */}
            {reduced && (
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none text-ki/40"
              >
                {nodes.map((_, i) => {
                  const p = spokePoints[i] ?? { x: 50, y: 50 }
                  return (
                    <line
                      key={i}
                      x1={p.x}
                      y1={p.y}
                      x2={50}
                      y2={50}
                      stroke="currentColor"
                      strokeWidth="0.4"
                    />
                  )
                })}
              </svg>
            )}

            {/* Node labels (HTML, accessible) */}
            {nodes.map((node, i) => {
              const p = labelPoints[i] ?? { x: 50, y: 50 }
              const x = p.x
              const y = p.y
              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    labelRefs.current[i] = el
                  }}
                  className="squad-label absolute -translate-x-1/2 -translate-y-1/2 font-mono text-xs tracking-widest uppercase text-fg-dim whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: reduced ? 1 : 0.4,
                  }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="w-1.5 h-1.5 rounded-full bg-ki"
                    />
                    {node.label}
                  </span>
                </div>
              )
            })}

            {/* Core */}
            <div
              ref={coreRef}
              aria-hidden
              className="absolute left-1/2 top-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--ki) 90%, white) 0%, var(--ki) 45%, color-mix(in oklab, var(--ki) 20%, transparent) 100%)",
                transform: `translate(-50%, -50%) scale(${reduced ? 1.3 : 0.4})`,
                boxShadow:
                  "0 0 24px color-mix(in oklab, var(--ki) 40%, transparent)",
              }}
            />

            {/* Flash */}
            {!reduced && (
              <div
                ref={flashRef}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, white 0%, color-mix(in oklab, var(--ki) 70%, white) 25%, transparent 60%)",
                  filter: "blur(18px)",
                  opacity: 0,
                }}
              />
            )}

            {/* Impact seal — lo que la energía del equipo produce */}
            <div
              ref={releaseRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <div
                className="relative px-5 py-4 rounded-[var(--radius-ink)] border-2 bg-bg text-fg"
                style={{
                  borderColor: "var(--ki)",
                  boxShadow:
                    "0 0 32px color-mix(in oklab, var(--ki) 45%, transparent)",
                }}
              >
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ki mb-2 text-center">
                  {tSquad("impactLabel")}
                </div>
                <div className="flex items-start gap-4 md:gap-6 justify-center">
                  {leadership.metrics
                    .filter((m) => m.value !== null)
                    .map((m) => (
                      <div key={m.id} className="text-center min-w-[72px]">
                        <div className="font-display font-black text-2xl md:text-3xl text-ki tabular-nums leading-none">
                          +{m.value}
                        </div>
                        <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-widest text-fg-dim">
                          {m.label}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-sm text-fg-dim max-w-xl mx-auto px-6">
        {tSquad("team")}
      </p>

      {/* Supporting content */}
      <div className="space-y-6">
        <Reveal>
          <InkPanel className="p-6">
            <h3 className="font-display font-black text-sm uppercase tracking-wide mb-4">
              {tSquad("practicesHeading")}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-fg-dim">
              {leadership.practices.map((practice) => (
                <li key={practice} className="flex gap-2">
                  <span
                    aria-hidden
                    className="w-1 h-1 rounded-full bg-ki mt-[0.45rem] shrink-0"
                  />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </InkPanel>
        </Reveal>

        {visibleMetrics.length > 0 && (
          <div>
            <h3 className="font-display font-black text-sm uppercase tracking-wide mb-4">
              {tSquad("metricsHeading")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {visibleMetrics.map((m) => (
                <Counter
                  key={m.id}
                  value={m.value as number}
                  label={m.label}
                  unit={m.unit}
                />
              ))}
            </div>
          </div>
        )}

        {leadership.quote && (
          <InkPanel className="p-6 md:p-8" texture="halftone">
            <SplitHeading
              text={`“${leadership.quote}”`}
              as="blockquote"
              by="word"
              stagger={0.03}
              className="font-display font-black text-2xl md:text-3xl leading-tight text-fg"
            />
            <footer className="mt-5 font-mono text-xs text-fg-dim tracking-[0.25em] uppercase">
              — Johan
            </footer>
          </InkPanel>
        )}
      </div>
    </section>
  )
}
