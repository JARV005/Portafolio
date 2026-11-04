import { getTranslations } from "next-intl/server"
import { Github, Youtube } from "lucide-react"

type SiteFooterProps = {
  name: string
}

const REPO_URL = "https://github.com/JARV005/Portafolio"
const YOUTUBE_URL = "https://www.youtube.com/@TheDevGrimoire"

export async function SiteFooter({ name }: SiteFooterProps) {
  const t = await getTranslations("footer")
  const year = 2026

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
        <div className="flex items-center gap-5">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube — The Dev Grimoire"
            className="inline-flex items-center gap-2 hover:text-ki transition-colors"
          >
            <Youtube className="w-3.5 h-3.5" aria-hidden />
            <span className="sr-only">YouTube</span>
          </a>
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
      </div>
    </footer>
  )
}
