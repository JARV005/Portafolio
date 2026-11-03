import { getTranslations } from "next-intl/server"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { InkPanel } from "@/components/motion"

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound")
  const tFooter = await getTranslations("footer")

  return (
    <main className="relative mx-auto w-full max-w-2xl px-6 pt-32 pb-24 flex flex-col items-center text-center gap-8">
      <InkPanel
        as="section"
        texture="halftone"
        className="relative w-full aspect-[4/3] max-w-md flex items-center justify-center"
      >
        <span
          aria-hidden
          className="absolute inset-0 speed-lines text-ki/15"
        />
        <span className="relative font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
          {/* viñeta vacía */}
          · · ·
        </span>
      </InkPanel>

      <div className="space-y-3">
        <h1 className="font-display font-black text-7xl md:text-8xl text-ki leading-none">
          {t("title")}
        </h1>
        <p className="text-fg-dim max-w-md mx-auto leading-relaxed">
          {t("message")}
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-ink)] border-2 font-mono text-sm text-fg hover:border-ki hover:text-ki transition-colors"
        style={{ borderColor: "var(--stroke)" }}
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        {t("cta")}
      </Link>

      <p className="pt-4 font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim/60">
        {tFooter("madeIn")}
      </p>
    </main>
  )
}
