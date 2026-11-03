"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useInViewport } from "@/hooks/useInViewport"
import { InkPanel } from "@/components/motion"

type CounterProps = {
  value: number
  label: string
  unit?: string
}

export function Counter({ value, label, unit }: CounterProps) {
  const [display, setDisplay] = useState(0)
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewport<HTMLDivElement>({ threshold: 0.3 })
  const played = useRef(false)

  useEffect(() => {
    if (!inView || played.current) return
    played.current = true
    if (reduced) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    const dur = 900
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduced])

  return (
    <InkPanel className="p-5">
      <div ref={ref} className="flex items-baseline gap-2">
        <span className="font-display font-black text-3xl md:text-4xl text-ki tabular-nums">
          {display.toLocaleString()}
        </span>
        {unit && (
          <span className="font-mono text-xs text-fg-dim">{unit}</span>
        )}
      </div>
      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
        {label}
      </p>
    </InkPanel>
  )
}
