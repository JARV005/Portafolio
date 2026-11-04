import type { Leadership } from "../types"

export const leadership: Leadership = {
  practices: [
    "Code reviews and code standards.",
    "QA and DevOps processes for the team.",
    "Requirement management and stakeholder communication.",
    "1:1 mentoring and technical coaching.",
    "Solution architecture and documentation.",
  ],
  metrics: [
    { id: "coders", value: 200, label: "Coders trained", unit: "+" },
    { id: "employed", value: 50, label: "Coders who landed a job", unit: "+" },
    { id: "projects", value: 15, label: "Projects led", unit: "+" },
  ],
  nodes: [
    { id: "backend", label: "Backend" },
    { id: "frontend", label: "Frontend" },
    { id: "qa", label: "QA" },
    { id: "devops", label: "DevOps" },
    { id: "product", label: "Product" },
  ],
  // TODO: leadership one-liner (first person)
  quote: null,
}
