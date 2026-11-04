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
    period: "2025 — 2026",
    title: "Desarrollo de Software · RIWI",
    summary:
      "Formación intensiva en desarrollo de software: fundamentos, patrones y buenas prácticas sobre el ecosistema .NET.",
    highlights: [],
    tags: [],
  },
  {
    id: "riwi-lead",
    period: "2025 — Actualidad",
    title: "Technical Team Lead · RIWI",
    summary:
      "Experiencia laboral principal: lidero técnicamente equipos en formación, defino estándares y acompaño todo el ciclo de desarrollo.",
    highlights: [
      "Liderazgo técnico de equipos en formación: planeación por sprints, pair programming y mentoría 1:1.",
      "Code reviews y QA sistemáticos; estándares de código y de documentación para el equipo.",
      "Procesos de QA automatizado y DevOps (CI/CD con Docker) adoptados por el escuadrón.",
      "Gestión de requisitos con stakeholders simulados y reales; traducción a historias técnicas.",
      "Arquitectura de microservicios con ASP.NET Core, RabbitMQ y Clean Architecture/DDD.",
      "Diseño y dictado de tracks técnicos para coders en formación (ver Grimorio).",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD", "Clean Architecture", "Mentoría"],
  },
  {
    id: "nemora",
    period: "2026",
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
