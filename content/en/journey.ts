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
  },
  {
    id: "riwi-track",
    period: "2025 — 2026",
    title: "Software Development · RIWI",
    summary:
      "Intensive software development bootcamp focused on the .NET ecosystem, patterns and best practices.",
    highlights: [],
    tags: [],
  },
  {
    id: "riwi-lead",
    period: "2025 — Present",
    title: "Technical Team Lead · RIWI",
    summary:
      "Main job experience: I technically lead training squads, set standards and own the full development cycle.",
    highlights: [
      "Technical leadership of training squads: sprint planning, pair programming and 1:1 mentoring.",
      "Systematic code reviews and QA; code and documentation standards adopted across the team.",
      "Automated QA and DevOps processes (CI/CD with Docker) rolled out to the squad.",
      "Requirements management with simulated and real stakeholders; translation into technical stories.",
      "Microservice architecture with ASP.NET Core, RabbitMQ and Clean Architecture/DDD.",
      "Design and delivery of technical tracks for trainee coders (see the Grimoire).",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD", "Clean Architecture", "Mentoring"],
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
  },
]
