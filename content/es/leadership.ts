import type { Leadership } from "../types"

export const leadership: Leadership = {
  practices: [
    "Code reviews y definición de estándares de código.",
    "Procesos de QA y DevOps para el equipo.",
    "Gestión de requisitos y comunicación con stakeholders.",
    "Mentoría 1:1 y acompañamiento técnico.",
    "Arquitectura de las soluciones y documentación.",
  ],
  // Dejar value en null oculta la cifra. Johan completa cuando tenga números defendibles.
  metrics: [
    { id: "coders", value: null, label: "Coders acompañados" },
    { id: "projects", value: null, label: "Proyectos liderados" },
    { id: "prs", value: null, label: "PRs revisados" },
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
