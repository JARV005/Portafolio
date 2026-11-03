type SectionLabelProps = {
  kanji: string
  label: string
  index: string
  className?: string
}

export function SectionLabel({ kanji, label, index, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        lang="ja"
        className="text-3xl leading-none text-[color:var(--ki)]"
        style={{ fontFamily: "var(--font-kanji)" }}
      >
        {kanji}
      </span>
      <span className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-fg-dim">
        <span className="text-ki">{index}</span>
        <span className="mx-2 text-stroke">·</span>
        <span>{label}</span>
      </span>
    </div>
  )
}
