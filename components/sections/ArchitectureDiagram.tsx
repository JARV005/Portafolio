type ArchitectureDiagramProps = {
  tags: string[]
  compact?: boolean
  className?: string
}

type NodeKind = "client" | "api" | "data" | "infra" | "ai"

const KIND_FOR_TAG: Array<{ match: RegExp; kind: NodeKind }> = [
  { match: /^Next\.js$|^React$|^TypeScript$/i, kind: "client" },
  { match: /ASP\.?NET|\.NET|Express|Node\.?js|API|REST|C#|JWT/i, kind: "api" },
  { match: /PostgreSQL|MySQL|SQL Server|SQL|EF Core|Storage/i, kind: "data" },
  { match: /Docker|CI\/CD|Kubernetes|Container|RabbitMQ/i, kind: "infra" },
  { match: /Azure OpenAI|RAG|Document Intelligence|AI|Embeddings|LLM/i, kind: "ai" },
]

const LABEL: Record<NodeKind, string> = {
  client: "Client",
  api: "API",
  data: "Data",
  infra: "Infra",
  ai: "AI",
}

const POSITIONS: Record<NodeKind, { x: number; y: number }> = {
  client: { x: 15, y: 50 },
  api: { x: 50, y: 50 },
  data: { x: 85, y: 72 },
  infra: { x: 85, y: 28 },
  ai: { x: 50, y: 15 },
}

function kindsFromTags(tags: string[]): NodeKind[] {
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
  return Array.from(kinds)
}

export function ArchitectureDiagram({
  tags,
  compact = false,
  className = "",
}: ArchitectureDiagramProps) {
  const nodes = kindsFromTags(tags)

  return (
    <svg
      viewBox="0 0 100 90"
      role="img"
      aria-label="Diagrama de arquitectura simplificado"
      className={`proj-diagram w-full h-full block ${className}`}
      preserveAspectRatio="xMidYMid meet"
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
            strokeWidth={compact ? 0.6 : 0.4}
            strokeDasharray={compact ? undefined : "1 1"}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            opacity="0.7"
          />
        )
      })}
      {nodes.map((kind) => {
        const pos = POSITIONS[kind]
        const isCore = kind === "api"
        return (
          <g key={kind}>
            <rect
              x={pos.x - (compact ? 8 : 10)}
              y={pos.y - (compact ? 4 : 5)}
              width={compact ? 16 : 20}
              height={compact ? 8 : 10}
              rx={1.5}
              fill="var(--surface)"
              stroke={isCore ? "currentColor" : "var(--stroke)"}
              strokeWidth={isCore ? 0.7 : 0.5}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              opacity={compact ? 0.85 : 1}
            />
            {!compact && (
              <text
                x={pos.x}
                y={pos.y + 1.2}
                textAnchor="middle"
                fontSize="3.2"
                fill={isCore ? "currentColor" : "var(--fg-dim)"}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {LABEL[kind]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
