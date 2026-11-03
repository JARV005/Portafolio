import type { Project } from "../types"

export const projects: Project[] = [
  {
    id: "nemora",
    name: "Nemora",
    tagline: "SaaS for document analysis and compliance with AI (own project)",
    description:
      "I designed a multi-tenant architecture on .NET and Azure (App Service, Storage, Document Intelligence and Azure OpenAI) and modeled the data layer in PostgreSQL to automate review of regulatory documentation. I implemented RAG (ingestion, chunking, embeddings and vector search) so answers stay anchored to the real content of each document, and automated deployment with Docker and CI/CD.",
    featured: true,
    tags: [
      ".NET",
      "Azure",
      "Azure OpenAI",
      "Document Intelligence",
      "PostgreSQL",
      "RAG",
      "Docker",
      "CI/CD",
      "Multi-tenant",
    ],
    // TODO: confirm public URL and repoUrl
  },
  {
    id: "cstation",
    name: "CStation",
    tagline: "Developer Platform · .NET ecosystem",
    description:
      "Knowledge and resource hub focused on the C# and .NET ecosystem. Built for engineers: documented architecture, design patterns, best practices and advanced modern backend resources. Shipped as a real product, not a blog.",
    url: "https://cstation.johan-rv.site/es",
    featured: true,
    tags: ["Next.js", "ASP.NET Core", "TypeScript", "Docker", "PostgreSQL", "Clean Architecture"],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Enterprise Security Platform",
    description:
      "Security platform with a microservice architecture in ASP.NET Core. SAST/DAST analysis, JWT authentication, inter-service communication and CI/CD pipelines.",
    tags: ["ASP.NET Core", "Docker", "JWT", "RabbitMQ", "CI/CD"],
    todo: "public URL or repoUrl pending",
  },
  {
    id: "autospace",
    name: "AutoSpace",
    tagline: "Parking Management System",
    description:
      "Shift and space management system with REST APIs and a scalable architecture. Robust backend with decoupled services.",
    url: "https://autospace-frontend.netlify.app/",
    tags: ["C#", "ASP.NET Core", "EF Core", "REST API", "Docker"],
  },
  {
    id: "celenemanager",
    name: "CeleneManager",
    tagline: "Database Instance Management",
    description:
      "Automation and management of database instances. Centralized administration and optimization of operational processes.",
    tags: ["C#", "ASP.NET Core", "EF Core", "Docker"],
    todo: "verify URL — previous repo pointed to hubble.andrescortes.dev which looks like a third-party domain",
  },
]
