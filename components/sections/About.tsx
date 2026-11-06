import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Hammer, Users, BookOpen } from "lucide-react"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import type { Profile } from "@/content/types"

type AboutProps = {
  profile: Profile
  locale: string
}

export async function About({ profile, locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "sections" })
  const tLabels = await getTranslations({ locale, namespace: "labels" })

  const pillars = [
    { key: "build", label: tLabels("pillarBuild"), icon: Hammer, text: profile.pillars.build },
    { key: "lead", label: tLabels("pillarLead"), icon: Users, text: profile.pillars.lead },
    { key: "teach", label: tLabels("pillarTeach"), icon: BookOpen, text: profile.pillars.teach },
  ] as const

  return (
    <section id="about" className="space-y-10">
      <SectionLabel kanji="道" label={t("about")} index="01" />

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
        <Reveal>
          {profile.photoUrl ? (
            <figure
              className="photo-halftone relative w-40 md:w-48 aspect-square rounded-[var(--radius-ink)] overflow-hidden border-2"
              style={{ borderColor: "var(--stroke)" }}
              tabIndex={0}
              aria-label={profile.name}
            >
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 10rem, 12rem"
                className="object-cover"
              />
              <span aria-hidden className="photo-overlay" />
            </figure>
          ) : (
            <div
              className="relative w-40 md:w-48 aspect-square rounded-[var(--radius-ink)] overflow-hidden border-2 flex items-center justify-center"
              style={{ borderColor: "var(--stroke)" }}
            >
              <span aria-hidden className="absolute inset-0 halftone opacity-25" />
              <span className="relative font-mono text-[0.65rem] uppercase tracking-widest text-ki/80">
                ⚠ {tLabels("noPhoto")}
              </span>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3 text-fg-dim leading-relaxed max-w-2xl">
            {profile.summary.slice(0, 4).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map((p, i) => {
          const Icon = p.icon
          return (
            <Reveal key={p.key} delay={0.1 + i * 0.08}>
              <InkPanel className="p-5 h-full">
                <div className="flex items-center gap-2 mb-3 text-ki">
                  <Icon aria-hidden className="w-4 h-4" />
                  <span className="font-display font-black text-sm uppercase tracking-wide text-fg">
                    {p.label}
                  </span>
                </div>
                <p className="text-sm text-fg-dim leading-relaxed">{p.text}</p>
              </InkPanel>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
