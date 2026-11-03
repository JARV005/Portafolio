import { getTranslations } from "next-intl/server"
import { Github } from "lucide-react"

type SiteFooterProps = {
  name: string
}

const REPO_URL = "https://github.com/JARV005/Portafolio"

export async function SiteFooter({ name }: SiteFooterProps) {
  const t = await getTranslations("footer")
  const year = 2026 // placeholder — year is stamped at build time

  return (
    <footer className="relative mt-8 border-t border-stroke/60">
      <div className="mx-auto max-w-4xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fg-dim">
        <span className="font-display font-black text-fg">JR</span>
        <span className="order-last sm:order-none text-center">
          <span className="text-ki">{t("madeIn")}</span>
          <span className="mx-2">·</span>
          <span>© {year}</span>
          <span className="mx-2">·</span>
          <span>{name}</span>
        </span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-ki transition-colors"
        >
          <Github className="w-3.5 h-3.5" aria-hidden />
          {t("repo")}
        </a>
      </div>
    </footer>
  )
}
