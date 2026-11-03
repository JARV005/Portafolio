"use client"

import { motion } from "motion/react"
import type { ElementType } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type SplitHeadingProps = {
  text: string
  as?: Extract<ElementType, "h1" | "h2" | "h3" | "h4" | "p">
  by?: "word" | "letter"
  stagger?: number
  className?: string
}

export function SplitHeading({
  text,
  as: Tag = "h2",
  by = "word",
  stagger = 0.04,
  className,
}: SplitHeadingProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const parts = by === "word" ? text.split(/(\s+)/) : [...text]

  return (
    <Tag className={className} aria-label={text}>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.35, delay: i * stagger, ease: "easeOut" }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {part}
          </motion.span>
        )
      })}
    </Tag>
  )
}
