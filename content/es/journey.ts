import type { JourneyStage } from "../types"

export const journey: JourneyStage[] = [
  {
    id: "itm",
    period: "2023 — Actualidad",
    title: "Ingeniería de Sistemas · ITM",
    summary:
      "Formación académica en Ingeniería de Sistemas en el Instituto Tecnológico Metropolitano.",
    highlights: [],
    tags: [],
  },
  {
    id: "riwi-track",
    period: "2025 — Actualidad",
    title: "Desarrollo de Software · RIWI",
    summary:
      "Formación intensiva en desarrollo de software: fundamentos, patrones y buenas prácticas sobre el ecosistema .NET.",
    highlights: [],
    tags: [],
  },
  {
    id: "riwi-lead",
    period: "2025 — Actualidad",
    title: "Team Leader · RIWI",
    summary:
      "Lidero técnicamente un escuadrón en formación y estandarizo las prácticas de desarrollo del equipo.",
    highlights: [
      "Code reviews y QA sistemáticos del output del equipo.",
      "Arquitectura de microservicios con RabbitMQ y Docker.",
      "Implementación de Clean Architecture y DDD en los proyectos.",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD"],
  },
  {
    id: "riwi-trainer",
    // TODO: período en que empezaste a dictar tracks
    period: null,
    title: "Formador de tracks técnicos · RIWI",
    summary:
      "Diseño y dicto tracks técnicos para coders en formación como parte de mi rol en RIWI.",
    highlights: [],
    tags: [],
  },
  {
    id: "nemora",
    // TODO: fecha de arranque de Nemora
    period: null,
    title: "Fundador · Nemora",
    summary:
      "SaaS propio de análisis documental y cumplimiento con IA sobre Azure.",
    highlights: [
      "Arquitectura multi-tenant sobre .NET + Azure (App Service, Storage, Document Intelligence y Azure OpenAI).",
      "Modelo de datos en PostgreSQL para automatizar la revisión de documentación normativa.",
      "RAG completo: ingesta, chunking, embeddings y búsqueda vectorial, con despliegue vía Docker y CI/CD.",
    ],
    tags: [".NET", "Azure", "Azure OpenAI", "PostgreSQL", "RAG", "Docker"],
  },
]
