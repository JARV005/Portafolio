type ArchitectureDiagramProps = {
  tags: string[]
}

type NodeKind = "client" | "api" | "data" | "infra" | "ai"

const KIND_FOR_TAG: Array<{ match: RegExp; kind: NodeKind; label: string }> = [
  { match: /^Next\.js$|^React$|^TypeScript$/i, kind: "client", label: "Client" },
  { match: /ASP\.?NET|\.NET|Express|Node\.?js|API|REST|C#/i, kind: "api", label: "API" },
  { match: /PostgreSQL|MySQL|SQL Server|SQL|EF Core|Storage/i, kind: "data", label: "Data" },
  { match: /Docker|CI\/CD|Kubernetes|Container/i, kind: "infra", label: "Infra" },
  { match: /Azure OpenAI|RAG|Document Intelligence|AI/i, kind: "ai", label: "AI" },
]

function kindsFromTags(tags: string[]): Set<NodeKind> {
  const kinds = new Set<NodeKind>()
  for (const tag of tags) {
    for (const rule of KIND_FOR_TAG) {
      if (rule.match.test(tag)) {
        kinds.add(rule.kind)
        break
      }
    }
  }
  kinds.add("api")
  return kinds
}

const POSITIONS: Record<NodeKind, { x: number; y: number; label: string }> = {
  client: { x: 15, y: 50, label: "Client" },
  api: { x: 50, y: 50, label: "API" },
  data: { x: 85, y: 72, label: "Data" },
  infra: { x: 85, y: 28, label: "Infra" },
  ai: { x: 50, y: 15, label: "AI" },
}

export function ArchitectureDiagram({ tags }: ArchitectureDiagramProps) {
  const kinds = kindsFromTags(tags)
  const nodes = Array.from(kinds)

  return (
    <svg
      viewBox="0 0 100 90"
      role="img"
      aria-label="Diagrama de arquitectura simplificado"
      className="w-full max-w-xl mx-auto block"
      style={{ color: "var(--ki)" }}
    >
      {nodes.map((kind) => {
        if (kind === "api") return null
        const a = POSITIONS[kind]
        const b = POSITIONS.api
        return (
          <line
            key={`line-${kind}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="1 1"
            opacity="0.5"
          />
        )
      })}
      {nodes.map((kind) => {
        const pos = POSITIONS[kind]
        const isCore = kind === "api"
        return (
          <g key={kind}>
            <rect
              x={pos.x - 10}
              y={pos.y - 5}
              width="20"
              height="10"
              rx="1.5"
              fill="var(--surface)"
              stroke={isCore ? "currentColor" : "var(--stroke)"}
              strokeWidth={isCore ? "0.6" : "0.4"}
            />
            <text
              x={pos.x}
              y={pos.y + 1.2}
              textAnchor="middle"
              fontSize="3.2"
              fill={isCore ? "currentColor" : "var(--fg-dim)"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {pos.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
