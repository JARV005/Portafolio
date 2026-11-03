"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SectionLabel } from "@/components/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { JourneyStage } from "@/content/types"

type JourneyProps = {
  stages: JourneyStage[]
}

const STAGE_COLORS = [
  "#f1ece2",
  "color-mix(in oklab, #f1ece2 50%, var(--ki))",
  "var(--ki)",
  "color-mix(in oklab, var(--ki) 50%, var(--ki-blue))",
  "var(--ki-blue)",
]

function stageColor(i: number, total: number): string {
  if (total === 5) return STAGE_COLORS[i] ?? "var(--ki)"
  if (total <= 1) return "var(--ki)"
  const t = i / (total - 1)
  if (t <= 0.5) {
    return `color-mix(in oklab, #f1ece2 ${Math.round((0.5 - t) * 200)}%, var(--ki))`
  }
  return `color-mix(in oklab, var(--ki) ${Math.round((1 - t) * 200)}%, var(--ki-blue))`
}

export function Journey({ stages }: JourneyProps) {
  const t = useTranslations("sections")
  const tLabels = useTranslations("labels")
  const containerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<Array<HTMLLIElement | null>>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const container = containerRef.current
    const fill = fillRef.current
    if (!container || !fill) return

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to(fill, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 65%",
          end: "bottom 55%",
          scrub: true,
        },
      })

      stageRefs.current.forEach((el) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: "top 72%",
          end: "bottom 30%",
          onEnter: () => el.classList.add("stage-active"),
          onEnterBack: () => el.classList.add("stage-active"),
          onLeave: () => el.classList.remove("stage-active"),
          onLeaveBack: () => el.classList.remove("stage-active"),
        })
      })
    }, container)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" className="relative space-y-10">
      <SectionLabel kanji="変" label={t("experience")} index="02" />
      <div ref={containerRef} className="relative py-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-stroke/50 left-[11px] md:left-1/2 md:-translate-x-1/2"
        />
        <div
          ref={fillRef}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px origin-top left-[11px] md:left-1/2 md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, #f1ece2 0%, var(--ki) 55%, var(--ki-blue) 100%)",
            boxShadow:
              "0 0 10px color-mix(in oklab, var(--ki) 50%, transparent)",
            transform: reduced ? "scaleY(1)" : "scaleY(0)",
          }}
        />

        <ol className="relative space-y-14 md:space-y-20">
          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0
            return (
              <li
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[i] = el
                }}
                className="stage relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16"
              >
                <span
                  aria-hidden
                  className="stage-dot absolute top-1 left-[7px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[10px] rounded-full border-2 bg-bg transition-all duration-500"
                  style={
                    {
                      borderColor: "var(--stroke)",
                      "--stage-color": stageColor(i, stages.length),
                    } as React.CSSProperties
                  }
                />

                <article
                  className={`${
                    isLeft
                      ? "md:col-start-1 md:text-right md:pr-10"
                      : "md:col-start-2 md:pl-10"
                  }`}
                >
                  <header>
                    <h3 className="font-display font-black text-lg">{stage.title}</h3>
                    <p
                      className={`font-mono text-xs mt-1 ${
                        stage.period ? "text-fg-dim" : "text-ki/80"
                      }`}
                    >
                      {stage.period ?? `⚠ ${tLabels("pendingDate")}`}
                    </p>
                  </header>

                  <p className="text-sm text-fg-dim mt-3 leading-relaxed">
                    {stage.summary}
                  </p>

                  {stage.highlights.length > 0 ? (
                    <ul
                      className={`mt-4 space-y-2 text-sm text-fg-dim ${
                        isLeft ? "md:ml-auto" : ""
                      } md:max-w-md`}
                    >
                      {stage.highlights.map((h) => (
                        <li
                          key={h}
                          className={`flex gap-2 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}
                        >
                          <span
                            aria-hidden
                            className="w-1 h-1 rounded-full bg-ki mt-[0.45rem] shrink-0"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 font-mono text-[0.65rem] text-ki/80">
                      ⚠ {tLabels("pendingContent")}
                    </p>
                  )}

                  {stage.tags.length > 0 && (
                    <p className="mt-4 font-mono text-[0.65rem] text-fg-dim tracking-wider">
                      {stage.tags.join(" · ")}
                    </p>
                  )}
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
