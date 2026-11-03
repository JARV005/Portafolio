import { getTranslations } from "next-intl/server"
import { getContent, type Locale } from "@/content"

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
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-16">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          {content.profile.location}
        </p>
        <h1 className="text-4xl font-bold">{content.profile.name}</h1>
        <p className="text-xl text-neutral-300">{content.profile.headline}</p>
        <div className="space-y-2 pt-2">
          {content.profile.summary.map((paragraph) => (
            <p key={paragraph} className="text-neutral-300">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="text-sm text-neutral-400">
          <span className="text-neutral-500">{tLabels("languages")}:</span>{" "}
          {content.profile.languages.join(" · ")}
        </p>
        <p>
          <a
            href={content.profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {tCta("downloadCV")} →
          </a>
        </p>
      </header>

      <section aria-labelledby="about">
        <h2 id="about" className="text-2xl font-semibold mb-4">
          {t("about")}
        </h2>
        <ul className="text-sm text-neutral-400 space-y-1">
          {content.contact.map((link) => (
            <li key={link.kind}>
              <span className="text-neutral-500">{link.label}:</span>{" "}
              <a href={link.href} className="underline underline-offset-4">
                {link.display}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience">
        <h2 id="experience" className="text-2xl font-semibold mb-4">
          {t("experience")}
        </h2>
        {content.experience.map((item) => (
          <article key={item.id} className="space-y-2">
            <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-medium">
                {item.role} · {item.company}
              </h3>
              <span className="text-sm text-neutral-500">{item.period}</span>
              {item.active && (
                <span className="text-xs uppercase tracking-widest text-emerald-400">
                  {tLabels("active")}
                </span>
              )}
            </header>
            <ul className="list-disc pl-5 text-neutral-300 space-y-1">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="text-xs text-neutral-500 pt-1">{item.tags.join(" · ")}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="education">
        <h2 id="education" className="text-2xl font-semibold mb-4">
          {t("education")}
        </h2>
        <ul className="space-y-2">
          {content.education.map((e) => (
            <li key={e.id}>
              <div className="font-medium">{e.degree}</div>
              <div className="text-sm text-neutral-400">
                {e.institution}
                {e.period ? ` · ${e.period}` : ""}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills">
        <h2 id="skills" className="text-2xl font-semibold mb-4">
          {t("skills")}
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          {content.stackHighlights.join(" · ")}
        </p>
        <ul className="space-y-3">
          {content.skills.map((g) => (
            <li key={g.category}>
              <div className="font-medium">{g.category}</div>
              <div className="text-sm text-neutral-400">{g.items.join(" · ")}</div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="projects">
        <h2 id="projects" className="text-2xl font-semibold mb-4">
          {t("projects")}
        </h2>
        <ul className="space-y-6">
          {content.projects.map((p) => (
            <li key={p.id} className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-medium">{p.name}</h3>
                {p.featured && (
                  <span className="text-xs uppercase tracking-widest text-amber-400">
                    {tLabels("featured")}
                  </span>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4"
                  >
                    {tCta("viewProject")}
                  </a>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4"
                  >
                    {tCta("viewRepo")}
                  </a>
                )}
              </div>
              <p className="text-sm text-neutral-400">{p.tagline}</p>
              <p className="text-neutral-300">{p.description}</p>
              <p className="text-xs text-neutral-500">{p.tags.join(" · ")}</p>
              {p.todo && (
                <p className="text-xs text-amber-500/80">
                  ⚠ {tLabels("pendingContent")}: {p.todo}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="text-sm text-neutral-500 pt-8">
        © {new Date().getFullYear()} {content.profile.name}.
      </footer>
    </main>
  )
}
