"use client"

import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type KiCanvasProps = {
  nameRef: RefObject<HTMLElement | null>
  containerRef: RefObject<HTMLElement | null>
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  size: number
  life: number
  arrived: boolean
}

const CHARGE_DURATION = 1800
const KI_RGB = "255, 178, 36"

export function KiCanvas({ nameRef, containerRef }: KiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const container = containerRef.current
    const nameEl = nameRef.current
    if (!canvas || !container || !nameEl) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const COUNT = isMobile ? 80 : 250

    let W = 0
    let H = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    function nameRect() {
      const n = nameEl!.getBoundingClientRect()
      const c = container!.getBoundingClientRect()
      return { x: n.left - c.left, y: n.top - c.top, w: n.width, h: n.height }
    }

    function pickTarget(): { tx: number; ty: number } {
      const r = nameRect()
      return {
        tx: r.x + Math.random() * r.w,
        ty: r.y + Math.random() * r.h,
      }
    }

    function spawnConverge(): Particle {
      const { tx, ty } = pickTarget()
      const angle = Math.random() * Math.PI * 2
      const dist = Math.max(W, H) * (0.4 + Math.random() * 0.4)
      return {
        x: tx + Math.cos(angle) * dist,
        y: ty + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        tx,
        ty,
        size: Math.random() * 1.4 + 0.6,
        life: 0,
        arrived: false,
      }
    }

    function spawnAmbient(): Particle {
      const r = nameRect()
      const cx = r.x + r.w / 2
      const cy = r.y + r.h / 2
      const padX = r.w * 0.6
      const padY = r.h * 0.9
      return {
        x: cx + (Math.random() - 0.5) * (r.w + padX),
        y: cy + r.h / 2 + Math.random() * padY,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.12 + Math.random() * 0.2),
        tx: cx,
        ty: cy,
        size: Math.random() * 1.1 + 0.3,
        life: 0,
        arrived: true,
      }
    }

    const particles: Particle[] = Array.from({ length: COUNT }, spawnConverge)
    const ambientCount = Math.round(COUNT * 0.3)
    const start = performance.now()
    let raf = 0
    let inView = true

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) inView = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(container)

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)

      if (!inView || document.hidden) return

      ctx.clearRect(0, 0, W, H)
      const elapsed = now - start
      const inCharge = elapsed < CHARGE_DURATION
      const chargeFade = inCharge
        ? 1
        : Math.max(0, 1 - (elapsed - CHARGE_DURATION) / 600)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!
        if (inCharge || chargeFade > 0.01) {
          const dx = p.tx - p.x
          const dy = p.ty - p.y
          if (!p.arrived) {
            p.vx += dx * 0.0018
            p.vy += dy * 0.0018
            p.vx *= 0.94
            p.vy *= 0.94
            p.x += p.vx
            p.y += p.vy
            if (dx * dx + dy * dy < 9) p.arrived = true
          }
          const base = p.arrived ? 0.9 : 0.6
          const a = (base * chargeFade).toFixed(3)
          ctx.fillStyle = `rgba(${KI_RGB}, ${a})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!inCharge) {
        for (let i = 0; i < ambientCount; i++) {
          const p = particles[i]!
          p.x += p.vx
          p.y += p.vy
          p.life++
          if (p.life > 200 || p.y < -4) {
            Object.assign(p, spawnAmbient())
          }
          if (!p.arrived) continue
          const breath =
            0.18 + 0.1 * Math.sin((p.life / 70) * Math.PI + i * 0.3)
          ctx.fillStyle = `rgba(${KI_RGB}, ${breath.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.75, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    raf = requestAnimationFrame(loop)
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      io.disconnect()
    }
  }, [reduced, nameRef, containerRef])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
