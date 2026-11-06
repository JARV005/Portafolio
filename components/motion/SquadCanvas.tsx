"use client"

import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type SquadCanvasProps = {
  progressRef: RefObject<number>
  nodeCount: number
}

const KI_RGB = "255, 178, 36"

export function SquadCanvas({ progressRef, nodeCount }: SquadCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const MAX_PARTICLES = isMobile ? 60 : 180
    let W = 0
    let H = 0

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let inView = true
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) inView = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(parent)

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      alpha: number
      size: number
    }

    const particles: Particle[] = []
    const count = Math.max(1, nodeCount)

    function nodePos(i: number): [number, number] {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2
      const r = Math.min(W, H) * 0.42
      return [W / 2 + Math.cos(angle) * r, H / 2 + Math.sin(angle) * r]
    }

    function spawnFrom(i: number) {
      if (particles.length >= MAX_PARTICLES) return
      const [ox, oy] = nodePos(i)
      const cx = W / 2
      const cy = H / 2
      const dx = cx - ox
      const dy = cy - oy
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const speed = 1.4 + Math.random() * 1.4
      particles.push({
        x: ox + (Math.random() - 0.5) * 10,
        y: oy + (Math.random() - 0.5) * 10,
        vx: (dx / d) * speed + (Math.random() - 0.5) * 0.6,
        vy: (dy / d) * speed + (Math.random() - 0.5) * 0.6,
        life: 0,
        maxLife: 60 + Math.random() * 30,
        alpha: 0.7 + Math.random() * 0.3,
        size: Math.random() * 1.4 + 0.5,
      })
    }

    let frame = 0
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!inView || document.hidden) return

      ctx.clearRect(0, 0, W, H)
      const p = progressRef.current ?? 0
      const emission =
        p > 0.95 ? Math.max(0, (1 - p) * 10) : Math.max(0, p * (1.1 - p))
      frame++

      // Spokes from each node to core — alpha grows with progress
      const spokeAlpha = (0.07 + p * 0.22).toFixed(3)
      ctx.strokeStyle = `rgba(${KI_RGB}, ${spokeAlpha})`
      ctx.lineWidth = 0.5
      const cx = W / 2
      const cy = H / 2
      for (let i = 0; i < count; i++) {
        const [nx, ny] = nodePos(i)
        ctx.beginPath()
        ctx.moveTo(nx, ny)
        ctx.lineTo(cx, cy)
        ctx.stroke()
      }

      // Spawn new particles proportional to emission
      if (frame % 2 === 0 && emission > 0.02) {
        for (let i = 0; i < count; i++) {
          if (Math.random() < emission * 0.9) spawnFrom(i)
        }
      }

      // Update + draw particles with pull toward core
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i]!
        const ddx = cx - pt.x
        const ddy = cy - pt.y
        const dd = Math.sqrt(ddx * ddx + ddy * ddy)
        if (dd < 10 || pt.life > pt.maxLife) {
          particles.splice(i, 1)
          continue
        }
        pt.vx += (ddx / dd) * 0.06
        pt.vy += (ddy / dd) * 0.06
        pt.vx *= 0.98
        pt.vy *= 0.98
        pt.x += pt.vx
        pt.y += pt.vy
        pt.life++
        const a = pt.alpha * (1 - pt.life / pt.maxLife)
        ctx.fillStyle = `rgba(${KI_RGB}, ${a.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    raf = requestAnimationFrame(loop)
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      io.disconnect()
    }
  }, [reduced, progressRef, nodeCount])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
