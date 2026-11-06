import type { JourneyStage } from "../types"

export const journey: JourneyStage[] = [
  {
    id: "itm",
    period: "2023 — Present",
    title: "Systems Engineering · ITM",
    summary:
      "Degree in Systems Engineering at Instituto Tecnológico Metropolitano.",
    highlights: [],
    tags: [],
    type: "education",
  },
  {
    id: "riwi-track",
    period: "2025 — 2026",
    title: "Software Development · RIWI",
    summary:
      "Intensive software development bootcamp. Here I worked with C#/.NET, PostgreSQL, PHP, Vue.js and server administration.",
    highlights: [
      "Built AutoSpace (shift management with C#/.NET and PostgreSQL) and other program projects.",
      "Mentored other coders on servers: Linux and monitoring with Prometheus and Grafana, among other topics.",
      "That work as coder and mentor led me to the Team Leader role.",
    ],
    tags: ["C#", ".NET", "PostgreSQL", "PHP", "Vue.js", "Linux", "Prometheus", "Grafana"],
    type: "education",
  },
  {
    id: "riwi-lead",
    period: "2025 — Present",
    title: "Team Leader · RIWI",
    summary:
      "Main job experience. I technically lead coder teams, set standards and own the full development cycle; here I expanded my stack far beyond what I brought as a coder.",
    highlights: [
      "Technical leadership of training teams: sprint planning, pair programming and 1:1 mentoring.",
      "Systematic code reviews and QA; code and documentation standards adopted across the team.",
      "Automated QA and DevOps processes (CI/CD with Docker) adopted by the team.",
      "Requirements management with simulated and real stakeholders; translation into technical stories.",
      "Microservice architecture with ASP.NET Core, RabbitMQ and Clean Architecture/DDD.",
      "Design and delivery of technical tracks for trainee coders (see the Grimoire).",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD", "Clean Architecture", "Mentoring"],
    type: "work",
    ascent: true,
  },
  {
    id: "nemora",
    period: "2026",
    title: "Founder · Nemora",
    summary:
      "Self-owned SaaS for document analysis and compliance with AI on Azure.",
    highlights: [
      "Multi-tenant architecture on .NET + Azure (App Service, Storage, Document Intelligence and Azure OpenAI).",
      "PostgreSQL data model to automate review of regulatory documentation.",
      "Full RAG pipeline: ingestion, chunking, embeddings and vector search, deployed with Docker and CI/CD.",
    ],
    tags: [".NET", "Azure", "Azure OpenAI", "PostgreSQL", "RAG", "Docker"],
    type: "venture",
  },
]
