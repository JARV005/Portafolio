import { getTranslations } from "next-intl/server"
import { getContent, type Locale } from "@/content"
import { InkPanel, Reveal, SectionLabel, SplitHeading } from "@/components/motion"

const KANJI = {
  about: { kanji: "道", index: "01" },
  experience: { kanji: "変", index: "02" },
  skills: { kanji: "隊", index: "03" },
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
    <main className="relative mx-auto w-full max-w-4xl px-6 pt-28 pb-24 space-y-24">
      {/* HERO */}
      <section className="pt-12 space-y-6">
        <SectionLabel kanji="気" label={content.profile.location} index="00" />
        <SplitHeading
          text={content.profile.name}
          as="h1"
          by="letter"
          stagger={0.03}
          className="font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-tight"
        />
        <Reveal delay={0.1}>
          <p className="font-mono text-sm tracking-wider text-fg-dim uppercase">
            {content.profile.headline}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="space-y-3 max-w-2xl text-fg-dim leading-relaxed">
            {content.profile.summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3 pt-2 text-sm font-mono">
            <a
              href={content.profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-[var(--radius-ink)] border-2 bg-surface hover:bg-fg hover:text-bg transition-colors"
              style={{ borderColor: "var(--stroke)" }}
            >
              {tCta("downloadCV")} →
            </a>
            <a
              href={content.contact.find((c) => c.kind === "github")?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-[var(--radius-ink)] text-fg-dim hover:text-ki transition-colors"
            >
              GitHub
            </a>
            <a
              href={content.contact.find((c) => c.kind === "linkedin")?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-[var(--radius-ink)] text-fg-dim hover:text-ki transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>

      <div className="energy-rule" />

      {/* ABOUT (languages + location) */}
      <section id="about" className="space-y-6">
        <SectionLabel kanji={KANJI.about.kanji} label={t("about")} index={KANJI.about.index} />
        <Reveal>
          <InkPanel className="p-6 text-sm">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono">
              <div>
                <dt className="text-fg-dim text-xs uppercase tracking-widest">
                  {tLabels("location")}
                </dt>
                <dd className="mt-1">{content.profile.location}</dd>
              </div>
              <div>
                <dt className="text-fg-dim text-xs uppercase tracking-widest">
                  {tLabels("languages")}
                </dt>
                <dd className="mt-1">{content.profile.languages.join(" · ")}</dd>
              </div>
            </dl>
          </InkPanel>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="space-y-6">
        <SectionLabel
          kanji={KANJI.experience.kanji}
          label={t("experience")}
          index={KANJI.experience.index}
        />
        {content.experience.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <InkPanel className="p-6">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                <h3 className="font-display font-black text-lg">
                  {item.role} · {item.company}
                </h3>
                <span className="text-xs font-mono text-fg-dim">{item.period}</span>
                {item.active && (
                  <span className="text-[0.65rem] uppercase tracking-widest text-ki font-mono">
                    {tLabels("active")}
                  </span>
                )}
              </header>
              <ul className="space-y-2 text-sm text-fg-dim">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-ki mt-[0.4rem] shrink-0 w-1 h-1 rounded-full bg-ki" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.7rem] text-fg-dim tracking-wider">
                {item.tags.join(" · ")}
              </p>
            </InkPanel>
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <InkPanel className="p-6" texture="halftone">
            <h3 className="font-display font-black text-lg mb-4">{t("education")}</h3>
            <ul className="space-y-3 text-sm">
              {content.education.map((e) => (
                <li key={e.id}>
                  <div className="font-medium">{e.degree}</div>
                  <div className="text-fg-dim">
                    {e.institution}
                    {e.period ? ` · ${e.period}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          </InkPanel>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills" className="space-y-6">
        <SectionLabel kanji={KANJI.skills.kanji} label={t("skills")} index={KANJI.skills.index} />
        <Reveal>
          <p className="font-mono text-xs text-fg-dim tracking-wider mb-4">
            {content.stackHighlights.join(" · ")}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.skills.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.04}>
              <InkPanel className="p-5 h-full">
                <div className="font-display font-black text-sm mb-2">{g.category}</div>
                <div className="font-mono text-xs text-fg-dim leading-relaxed">
                  {g.items.join(" · ")}
                </div>
              </InkPanel>
            </Reveal>
          ))}
        </div>
      </section>

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
  )
}
