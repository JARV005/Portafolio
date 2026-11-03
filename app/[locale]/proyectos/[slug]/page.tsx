import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { getContent, type Locale } from "@/content"
import { routing } from "@/i18n/routing"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram"

type Params = { locale: string; slug: string }

export function generateStaticParams(): Params[] {
  const slugs = getContent("es").projects.map((p) => p.id)
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getContent(locale as Locale).projects.find(
    (p) => p.id === slug,
  )
  if (!project) return {}
  return {
    title: `${project.name} — Johan Rivera`,
    description: project.tagline,
  }
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { locale, slug } = await params
  const content = getContent(locale as Locale)
  const project = content.projects.find((p) => p.id === slug)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: "projects" })
  const tCta = await getTranslations({ locale, namespace: "cta" })
  const tLabels = await getTranslations({ locale, namespace: "labels" })

  return (
    <main className="relative mx-auto w-full max-w-4xl px-6 pt-28 pb-24 space-y-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-fg-dim hover:text-ki transition-colors"
      >
        <ArrowLeft aria-hidden className="w-3.5 h-3.5" />
        {tCta("backToProjects")}
      </Link>

      <header
        className="space-y-5"
        style={{ viewTransitionName: `proj-${project.id}` }}
      >
        <SectionLabel kanji="作" label={t("problemLabel")} index="—" />
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight">
            {project.name}
          </h1>
          {project.featured && (
            <span className="text-xs uppercase tracking-widest text-ki font-mono">
              {tLabels("featured")}
            </span>
          )}
        </div>
        <p className="font-mono text-sm text-fg-dim tracking-wider">
          {project.tagline}
        </p>
        <p className="text-fg-dim leading-relaxed max-w-2xl text-base">
          {project.case.problem}
        </p>
      </header>

      {project.case.imageUrl && (
        <Reveal>
          <div
            className="relative aspect-video overflow-hidden rounded-[var(--radius-ink)] border-2"
            style={{ borderColor: "var(--stroke)" }}
          >
            <Image
              src={project.case.imageUrl}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Reveal>
          <InkPanel className="p-5 h-full">
            <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-2">
              {t("roleLabel")}
            </div>
            <p className="text-sm">
              {project.case.role ?? (
                <span className="text-ki/80">⚠ {t("pendingRole")}</span>
              )}
            </p>
          </InkPanel>
        </Reveal>
        <Reveal delay={0.05}>
          <InkPanel className="p-5 h-full md:col-span-2">
            <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-2">
              {t("stackLabel")}
            </div>
            <p className="font-mono text-xs text-fg-dim leading-relaxed">
              {project.tags.join(" · ")}
            </p>
          </InkPanel>
        </Reveal>
      </div>

      <Reveal>
        <section className="space-y-4">
          <h2 className="font-display font-black text-2xl">
            {t("architectureLabel")}
          </h2>
          {project.case.architecture ? (
            <p className="text-fg-dim leading-relaxed max-w-2xl">
              {project.case.architecture}
            </p>
          ) : (
            <p className="font-mono text-xs text-ki/80">
              ⚠ {t("pendingArchitecture")}
            </p>
          )}
          <InkPanel className="p-6" texture="halftone">
            <ArchitectureDiagram tags={project.tags} />
          </InkPanel>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <h2 className="font-display font-black text-2xl">
            {t("decisionsLabel")}
          </h2>
          <ul className="space-y-2 text-fg-dim">
            {project.case.decisions.map((d) => (
              <li key={d} className="flex gap-2 text-sm leading-relaxed">
                <span
                  aria-hidden
                  className="w-1 h-1 rounded-full bg-ki mt-[0.5rem] shrink-0"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <h2 className="font-display font-black text-2xl">
            {t("resultLabel")}
          </h2>
          {project.case.result ? (
            <p className="text-fg-dim leading-relaxed max-w-2xl">
              {project.case.result}
            </p>
          ) : (
            <p className="font-mono text-xs text-ki/80">
              ⚠ {t("pendingResult")}
            </p>
          )}
        </section>
      </Reveal>

      {(project.demoUrl || project.repoUrl || project.todo) && (
        <Reveal>
          <section className="space-y-3">
            <h2 className="font-display font-black text-2xl">
              {t("linksLabel")}
            </h2>
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ink)] border-2 hover:border-ki transition-colors"
                  style={{ borderColor: "var(--stroke)" }}
                >
                  <ExternalLink aria-hidden className="w-4 h-4" />
                  {tCta("viewDemo")}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ink)] border-2 hover:border-ki transition-colors"
                  style={{ borderColor: "var(--stroke)" }}
                >
                  <Github aria-hidden className="w-4 h-4" />
                  {tCta("viewRepo")}
                </a>
              )}
              {project.todo && (
                <p className="font-mono text-[0.65rem] text-ki/80 self-center">
                  ⚠ {tLabels("pendingContent")}: {project.todo}
                </p>
              )}
            </div>
          </section>
        </Reveal>
      )}
    </main>
  )
}
