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
    period: "2025 — Present",
    title: "Software Development · RIWI",
    summary:
      "Intensive software development bootcamp focused on the .NET ecosystem, patterns and best practices.",
    highlights: [],
    tags: [],
  },
  {
    id: "riwi-lead",
    period: "2025 — Present",
    title: "Team Leader · RIWI",
    summary:
      "I technically lead a training squad and standardize the team's development practices.",
    highlights: [
      "Systematic code reviews and QA across the team's output.",
      "Microservice architecture with RabbitMQ and Docker.",
      "Clean Architecture and DDD applied across the projects.",
    ],
    tags: ["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD"],
  },
  {
    id: "riwi-trainer",
    // TODO: start period for the trainer role
    period: null,
    title: "Technical Track Instructor · RIWI",
    summary:
      "I design and deliver technical tracks for trainee coders as part of my role at RIWI.",
    highlights: [],
    tags: [],
  },
  {
    id: "nemora",
    // TODO: Nemora start date
    period: null,
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
