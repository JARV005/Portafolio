"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type RevealProps = {
  children: ReactNode
  delay?: number
  offset?: number
  className?: string
}

export function Reveal({ children, delay = 0, offset = 16, className }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
