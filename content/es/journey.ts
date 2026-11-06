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
    type: "education",
  },
  {
    id: "riwi-track",
    period: "2025 — 2026",
    title: "Desarrollo de Software · RIWI",
    summary:
      "Formación intensiva en desarrollo de software. Aquí trabajé con C#/.NET, PostgreSQL, PHP, Vue.js y administración de servidores.",
    highlights: [
      "Construí AutoSpace (gestión de turnos con C#/.NET y PostgreSQL) y otros proyectos del programa.",
      "Di mentorías a otros coders sobre servidores: Linux y monitoreo con Prometheus y Grafana, entre otros temas.",
      "Ese trabajo como coder y como mentor me llevó al rol de Team Leader.",
    ],
    tags: ["C#", ".NET", "PostgreSQL", "PHP", "Vue.js", "Linux", "Prometheus", "Grafana"],
    type: "education",
  },
  {
    id: "riwi-lead",
    period: "2025 — Actualidad",
    title: "Team Leader · RIWI",
    summary:
      "Experiencia laboral principal. Lidero técnicamente equipos de coders, defino estándares y acompaño todo el ciclo de desarrollo; aquí amplié mi stack mucho más allá de lo que traía como coder.",
    highlights: [
      "Liderazgo técnico de equipos en formación: planeación por sprints, pair programming y mentoría 1:1.",
      "Code reviews y QA sistemáticos; estándares de código y de documentación para el equipo.",
      "Procesos de QA automatizado y DevOps (CI/CD con Docker) adoptados por el equipo.",
      "Gestión de requisitos con stakeholders simulados y reales; traducción a historias técnicas.",
      "Arquitectura de microservicios con ASP.NET Core, RabbitMQ y Clean Architecture/DDD.",
      "Diseño y dictado de tracks técnicos para coders en formación (ver Grimorio).",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD", "Clean Architecture", "Mentoría"],
    type: "work",
    ascent: true,
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
    type: "venture",
  },
]
