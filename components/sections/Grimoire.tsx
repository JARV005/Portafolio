"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Youtube } from "lucide-react"
import { InkPanel, Reveal, SectionLabel, SplitHeading } from "@/components/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Grimoire as GrimoireData } from "@/content/types"

const GrimoireBook = dynamic(() => import("./GrimoireBook"), {
  ssr: false,
  loading: () => (
    <div className="h-[540px] max-w-md mx-auto rounded-[var(--radius-ink)] border-2 border-[color:var(--stroke)] bg-surface animate-pulse" />
  ),
})

type GrimoireProps = { data: GrimoireData }

export function Grimoire({ data }: GrimoireProps) {
  const t = useTranslations("sections")
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (reduced) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px 20% 0px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <section id="grimoire" ref={sectionRef} className="space-y-10">
      <SectionLabel kanji="書" label={t("grimoire")} index="04" />

      {data.intro && (
        <InkPanel className="p-6 md:p-8 max-w-3xl mx-auto" texture="halftone">
          <SplitHeading
            text={`“${data.intro}”`}
            as="blockquote"
            by="word"
            stagger={0.03}
            className="font-display font-black text-2xl md:text-3xl leading-tight text-fg"
          />
          <footer className="mt-5 font-mono text-xs text-fg-dim tracking-[0.25em] uppercase">
            — Johan
          </footer>
        </InkPanel>
      )}

      <Reveal>
        <div className="flex justify-center">
          <a
            href={data.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-fg-dim hover:text-ki transition-colors"
          >
            <Youtube className="w-4 h-4 text-ki" aria-hidden />
            Ver {data.channelName} en YouTube
            <span aria-hidden>↗</span>
          </a>
        </div>
      </Reveal>

      {visible && <GrimoireBook data={data} />}
    </section>
  )
}
