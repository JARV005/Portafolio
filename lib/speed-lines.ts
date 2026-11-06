/**
 * Coordenadas redondeadas para SVG renderizados en SSR + hidratados en cliente.
 * Sin esto, Math.cos/Math.sin producen flotantes largos cuya serialización
 * difiere entre Node y el motor JS del navegador (ej. 38.509333353215325 vs
 * 38.50933335321533), lo que dispara un hydration mismatch.
 */

const round = (v: number, decimals = 2) => {
  const factor = 10 ** decimals
  return Math.round(v * factor) / factor
}

export type SvgLine = { x1: number; y1: number; x2: number; y2: number }
export type SvgPoint = { x: number; y: number }

export type SpeedLinesOptions = {
  count: number
  innerRadius: number
  outerRadius: number
  cx?: number
  cy?: number
  startAngle?: number
  decimals?: number
}

export function generateSpeedLines({
  count,
  innerRadius,
  outerRadius,
  cx = 50,
  cy = 50,
  startAngle = 0,
  decimals = 2,
}: SpeedLinesOptions): SvgLine[] {
  const out: SvgLine[] = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + startAngle
    out.push({
      x1: round(cx + Math.cos(a) * innerRadius, decimals),
      y1: round(cy + Math.sin(a) * innerRadius, decimals),
      x2: round(cx + Math.cos(a) * outerRadius, decimals),
      y2: round(cy + Math.sin(a) * outerRadius, decimals),
    })
  }
  return out
}

export type RadialPointsOptions = {
  count: number
  radius: number
  cx?: number
  cy?: number
  startAngle?: number
  decimals?: number
}

export function generateRadialPoints({
  count,
  radius,
  cx = 50,
  cy = 50,
  startAngle = -Math.PI / 2,
  decimals = 2,
}: RadialPointsOptions): SvgPoint[] {
  const out: SvgPoint[] = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + startAngle
    out.push({
      x: round(cx + Math.cos(a) * radius, decimals),
      y: round(cy + Math.sin(a) * radius, decimals),
    })
  }
  return out
}
