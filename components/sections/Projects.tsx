"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import type { MouseEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link, useRouter } from "@/i18n/navigation"
import { SectionLabel } from "@/components/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Project } from "@/content/types"

type ProjectsProps = {
  projects: Project[]
}

const GRID_LAYOUT: Record<string, string> = {
  nemora: "md:col-span-2 md:row-span-2",
  sentinel: "md:col-start-3 md:row-start-1",
  cstation: "md:col-start-3 md:row-start-2",
  autospace: "md:col-start-1 md:row-start-3",
  celenemanager: "md:col-span-2 md:col-start-2 md:row-start-3",
}

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations("sections")
  const tLabels = useTranslations("labels")
  const tCta = useTranslations("cta")
  const tProjects = useTranslations("projects")
  const router = useRouter()
  const reduced = useReducedMotion()

  function navigate(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
    e.preventDefault()
    const start =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !reduced
        ? (
            document as unknown as {
              startViewTransition: (cb: () => void) => unknown
            }
          ).startViewTransition.bind(document)
        : null
    if (start) {
      start(() => router.push(href))
    } else {
      router.push(href)
    }
  }

  return (
    <section id="projects" className="space-y-10">
      <SectionLabel kanji="作" label={t("projects")} index="05" />

      <ol className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-4">
        {projects.map((project) => {
          const layout = GRID_LAYOUT[project.id] ?? ""
          const href = `/proyectos/${project.id}`
          return (
            <li
              key={project.id}
              className={layout}
              style={{
                viewTransitionName: reduced ? undefined : `proj-${project.id}`,
              }}
            >
              <Link
                href={href}
                onClick={(e) => navigate(e, href)}
                className="proj-card group relative block h-full w-full overflow-hidden rounded-[var(--radius-ink)] border-2 bg-surface focus-visible:outline-none"
                style={{ borderColor: "var(--stroke)" }}
                aria-label={`${project.name} — ${tCta("viewCase")}`}
              >
                <div className="proj-image-wrap absolute inset-0">
                  {project.case.imageUrl ? (
                    <Image
                      src={project.case.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="proj-image object-cover"
                    />
                  ) : (
                    <div className="proj-image-placeholder relative w-full h-full">
                      <span
                        aria-hidden
                        className="absolute inset-0 halftone opacity-20 text-ki"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 grain opacity-[0.06]"
                      />
                      <span className="relative z-10 flex items-center justify-center h-full font-mono text-[0.65rem] uppercase tracking-widest text-ki/70">
                        ⚠ {tProjects("pendingImage")}
                      </span>
                    </div>
                  )}
                </div>

                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="proj-speed pointer-events-none absolute inset-0 w-full h-full text-ki"
                >
                  {Array.from({ length: 24 }).map((_, i) => {
                    const a = (i / 24) * Math.PI * 2
                    const x1 = 50 + Math.cos(a) * 10
                    const y1 = 50 + Math.sin(a) * 10
                    const x2 = 50 + Math.cos(a) * 70
                    const y2 = 50 + Math.sin(a) * 70
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        strokeWidth="0.3"
                      />
                    )
                  })}
                </svg>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/10"
                />

                <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <h3 className="font-display font-black text-xl md:text-2xl">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="text-[0.6rem] uppercase tracking-widest text-ki font-mono">
                            {tLabels("featured")}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[0.65rem] text-fg-dim tracking-wider">
                        {project.tagline}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      className="w-4 h-4 text-fg-dim transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ki"
                    />
                  </div>
                  <p className="mt-2 font-mono text-[0.6rem] text-fg-dim tracking-wider">
                    {project.tags.slice(0, 4).join(" · ")}
                  </p>
                </div>

                <ProblemBubble text={project.case.problem} />
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function ProblemBubble({ text }: { text: string }) {
  return (
    <div className="proj-bubble pointer-events-none absolute left-4 right-4 bottom-20 md:bottom-24 z-20">
      <div
        className="relative px-3.5 py-2.5 text-xs text-fg bg-bg border-2 rounded-[var(--radius-ink)] shadow-[0_6px_24px_rgba(0,0,0,0.3)]"
        style={{ borderColor: "var(--stroke)" }}
      >
        {text}
        <span
          aria-hidden
          className="absolute -bottom-[9px] left-6 w-0 h-0"
          style={{
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: "9px solid var(--stroke)",
          }}
        />
        <span
          aria-hidden
          className="absolute -bottom-[6px] left-[27px] w-0 h-0"
          style={{
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "7px solid var(--bg)",
          }}
        />
      </div>
    </div>
  )
}
