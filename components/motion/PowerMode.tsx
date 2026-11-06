"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const

const DURATION_MS = 6000

export function PowerMode() {
  const t = useTranslations("konami")
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduced) return
    let buffer: string[] = []
    const target = KONAMI.map((k) => k.toLowerCase())

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea") return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      buffer.push(key)
      if (buffer.length > target.length) buffer = buffer.slice(-target.length)
      if (
        buffer.length === target.length &&
        buffer.every((k, i) => k === target[i])
      ) {
        setActive(true)
        buffer = []
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [reduced])

  useEffect(() => {
    if (!active) return
    document.documentElement.setAttribute("data-power", "true")
    const id = window.setTimeout(() => setActive(false), DURATION_MS)
    return () => {
      window.clearTimeout(id)
      document.documentElement.removeAttribute("data-power")
    }
  }, [active])

  if (!active || reduced) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]"
    >
      <div
        className="power-toast px-4 py-2 rounded-[var(--radius-ink)] border-2 bg-bg font-mono text-xs text-fg shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ borderColor: "var(--ki)" }}
      >
        {t("badge")}
      </div>
    </div>
  )
}
