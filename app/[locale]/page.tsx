import { getTranslations } from "next-intl/server"
import { getContent, type Locale } from "@/content"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Journey } from "@/components/sections/Journey"
import { Squad } from "@/components/sections/Squad"
import { Grimoire } from "@/components/sections/Grimoire"

const KANJI = {
  projects: { kanji: "作", index: "04" },
  contact: { kanji: "会", index: "05" },
} as const

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "sections" })
  const tLabels = await getTranslations({ locale, namespace: "labels" })
  const tCta = await getTranslations({ locale, namespace: "cta" })
  const content = getContent(locale as Locale)

  return (
    <>
      <Hero
        profile={content.profile}
        contact={content.contact}
        locationLabel={content.profile.location}
      />

      <main className="relative mx-auto w-full max-w-4xl px-6 pt-12 pb-24 space-y-24">
        <div className="energy-rule" />

        <About profile={content.profile} locale={locale} />

        <Journey stages={content.journey} />

        <Squad leadership={content.leadership} />

        <Grimoire data={content.grimoire} />

        {/* PROJECTS */}
        <section id="projects" className="space-y-6">
          <SectionLabel
            kanji={KANJI.projects.kanji}
            label={t("projects")}
            index={KANJI.projects.index}
          />
          <ul className="space-y-5">
            {content.projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <InkPanel className="p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                    <h3 className="font-display font-black text-lg">{p.name}</h3>
                    {p.featured && (
                      <span className="text-[0.65rem] uppercase tracking-widest text-ki font-mono">
                        {tLabels("featured")}
                      </span>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs underline underline-offset-4 text-fg-dim hover:text-ki"
                      >
                        {tCta("viewProject")} ↗
                      </a>
                    )}
                  </div>
                  <p className="font-mono text-xs text-fg-dim mb-3">{p.tagline}</p>
                  <p className="text-sm text-fg-dim leading-relaxed mb-3">{p.description}</p>
                  <p className="font-mono text-[0.65rem] text-fg-dim tracking-wider">
                    {p.tags.join(" · ")}
                  </p>
                  {p.todo && (
                    <p className="mt-3 font-mono text-[0.65rem] text-ki/80">
                      ⚠ {tLabels("pendingContent")}: {p.todo}
                    </p>
                  )}
                </InkPanel>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact" className="space-y-6">
          <SectionLabel kanji={KANJI.contact.kanji} label={t("contact")} index={KANJI.contact.index} />
          <Reveal>
            <InkPanel className="p-6">
              <ul className="space-y-3 text-sm">
                {content.contact.map((link) => (
                  <li key={link.kind} className="flex flex-wrap items-baseline gap-3 font-mono">
                    <span className="text-fg-dim text-xs uppercase tracking-widest min-w-16">
                      {link.label}
                    </span>
                    <a href={link.href} className="hover:text-ki transition-colors">
                      {link.display}
                    </a>
                  </li>
                ))}
              </ul>
            </InkPanel>
          </Reveal>
        </section>

        <footer className="pt-4 text-xs font-mono text-fg-dim">
          © {new Date().getFullYear()} {content.profile.name}
        </footer>
      </main>
    </>
  )
}
