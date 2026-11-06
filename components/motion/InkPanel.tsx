import type { ElementType, ReactNode } from "react"

type InkPanelProps = {
  children: ReactNode
  as?: Extract<ElementType, "div" | "section" | "article" | "aside">
  texture?: "grain" | "halftone" | "none"
  className?: string
}

export function InkPanel({
  children,
  as: Tag = "div",
  texture = "grain",
  className = "",
}: InkPanelProps) {
  return (
    <Tag
      className={`relative overflow-hidden rounded-[var(--radius-ink)] border-2 bg-surface text-fg ${className}`}
      style={{ borderColor: "var(--stroke)" }}
    >
      {texture !== "none" && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 opacity-[0.06] ${
            texture === "grain" ? "grain" : "halftone"
          }`}
        />
      )}
      <div className="relative">{children}</div>
    </Tag>
  )
}
