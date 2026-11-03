"use client"

import { useState, type KeyboardEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Download } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type CvButtonProps = {
  href: string
  label: string
}

export function CvButton({ href, label }: CvButtonProps) {
  const [primed, setPrimed] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const reduced = useReducedMotion()

  function fire() {
    if (reduced) return
    setFlashing(true)
    window.setTimeout(() => setFlashing(false), 380)
  }

  function onKey(e: KeyboardEvent<HTMLAnchorElement>) {
    if (e.key === "Enter" || e.key === " ") fire()
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setPrimed(true)}
      onMouseLeave={() => setPrimed(false)}
      onFocus={() => setPrimed(true)}
      onBlur={() => setPrimed(false)}
      onClick={fire}
      onKeyDown={onKey}
      className="relative inline-flex items-center gap-2 overflow-hidden rounded-[var(--radius-ink)] border-2 bg-surface px-5 py-3 font-mono text-sm text-fg transition-colors hover:text-fg focus-visible:outline-none"
      style={{ borderColor: "var(--stroke)" }}
    >
      {!reduced && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--ki) 35%, transparent), color-mix(in oklab, var(--ki) 8%, transparent))",
            transform: primed ? "scaleX(1)" : "scaleX(0)",
            transition: primed
              ? "transform 900ms cubic-bezier(0.33,1,0.68,1)"
              : "transform 220ms ease-out",
          }}
        />
      )}

      <AnimatePresence>
        {flashing && (
          <motion.span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, color-mix(in oklab, var(--ki) 85%, white) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.35 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <Download className="relative z-10 w-4 h-4 text-ki" />
      <span className="relative z-10">{label}</span>
    </a>
  )
}
