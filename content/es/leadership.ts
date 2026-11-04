import type { Leadership } from "../types"

export const leadership: Leadership = {
  practices: [
    "Code reviews y definición de estándares de código.",
    "Procesos de QA y DevOps para el equipo.",
    "Gestión de requisitos y comunicación con stakeholders.",
    "Mentoría 1:1 y acompañamiento técnico.",
    "Arquitectura de las soluciones y documentación.",
  ],
  metrics: [
    { id: "coders", value: 200, label: "Coders entrenados", unit: "+" },
    { id: "employed", value: 50, label: "Coders que ya consiguieron empleo", unit: "+" },
    { id: "projects", value: 15, label: "Proyectos liderados", unit: "+" },
  ],
  nodes: [
    { id: "backend", label: "Backend" },
    { id: "frontend", label: "Frontend" },
    { id: "qa", label: "QA" },
    { id: "devops", label: "DevOps" },
    { id: "product", label: "Producto" },
  ],
  // TODO: frase sobre liderazgo (en primera persona, 1-2 lineas)
  quote: null,
}
