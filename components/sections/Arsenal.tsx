"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import type { Project, SkillGroup } from "@/content/types"

type ArsenalProps = {
  skills: SkillGroup[]
  projects: Project[]
}

export function Arsenal({ skills, projects }: ArsenalProps) {
  const t = useTranslations("sections")
  const tA = useTranslations("arsenal")
  const [hovered, setHovered] = useState<string | null>(null)

  const techToProjects = useMemo(() => {
    const map: Record<string, Project[]> = {}
    for (const project of projects) {
      for (const tag of project.tags) {
        if (!map[tag]) map[tag] = []
        map[tag].push(project)
      }
    }
    return map
  }, [projects])

  const activeTech = hovered
  const activeProjects = activeTech ? techToProjects[activeTech] ?? [] : []

  return (
    <section id="arsenal" className="space-y-6">
      <SectionLabel kanji="器" label={t("arsenal")} index="06" />

      <p className="font-mono text-xs text-fg-dim max-w-xl">{tA("hint")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.04}>
            <InkPanel className="p-5 h-full">
              <div className="font-display font-black text-sm uppercase tracking-wide mb-3">
                {group.category}
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => {
                  const hasProjects = (techToProjects[tech]?.length ?? 0) > 0
                  const isActive = hovered === tech
                  return (
                    <li key={tech}>
                      <button
                        type="button"
                        onMouseEnter={() => setHovered(tech)}
                        onMouseLeave={() => setHovered((prev) => (prev === tech ? null : prev))}
                        onFocus={() => setHovered(tech)}
                        onBlur={() => setHovered((prev) => (prev === tech ? null : prev))}
                        aria-pressed={isActive}
                        aria-describedby="arsenal-detail"
                        className={`tech-chip font-mono text-[0.65rem] px-2 py-1 rounded-[4px] border transition-colors ${
                          isActive
                            ? "border-ki text-ki bg-[color-mix(in_oklab,var(--ki)_12%,transparent)]"
                            : hasProjects
                              ? "border-[color:var(--stroke)] text-fg-dim hover:text-fg"
                              : "border-[color:var(--stroke)] text-fg-dim/60 hover:text-fg-dim"
                        }`}
                      >
                        {tech}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </InkPanel>
          </Reveal>
        ))}
      </div>

      <div
        id="arsenal-detail"
        aria-live="polite"
        className="min-h-[64px] px-5 py-4 rounded-[var(--radius-ink)] border-2 bg-surface flex flex-wrap items-center gap-3"
        style={{ borderColor: activeTech ? "var(--ki)" : "var(--stroke)" }}
      >
        {activeTech ? (
          activeProjects.length > 0 ? (
            <>
              <span className="font-mono text-xs text-fg-dim">
                <span className="text-ki">{activeTech}</span>{" "}
                <span>{tA("usedIn")}</span>
              </span>
              <ul className="flex flex-wrap gap-2">
                {activeProjects.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/proyectos/${p.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-[4px] border border-[color:var(--stroke)] hover:border-ki hover:text-ki transition-colors"
                    >
                      {p.name}
                      <ArrowUpRight className="w-3 h-3" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <span className="font-mono text-xs text-fg-dim">
              <span className="text-ki">{activeTech}</span>{" "}
              <span>·</span> <span>{tA("noMatches")}</span>
            </span>
          )
        ) : (
          <span className="font-mono text-xs text-fg-dim/60">{tA("hint")}</span>
        )}
      </div>
    </section>
  )
}
