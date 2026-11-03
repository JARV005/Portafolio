import { getTranslations } from "next-intl/server"
import { getContent, type Locale } from "@/content"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Journey } from "@/components/sections/Journey"
import { Squad } from "@/components/sections/Squad"
import { Grimoire } from "@/components/sections/Grimoire"
import { Projects } from "@/components/sections/Projects"

const KANJI = {
  contact: { kanji: "会", index: "06" },
} as const

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "sections" })
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

        <Projects projects={content.projects} />

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
