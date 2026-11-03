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
    demoUrl: null,
    repoUrl: null,
    case: {
      problem:
        "Automate review of regulatory documentation with AI without losing traceability to the source content.",
      role: "Founder and architect",
      architecture:
        "Multi-tenant on Azure (App Service, Storage, Document Intelligence and Azure OpenAI). PostgreSQL for relational data and a custom RAG pipeline (ingestion, chunking, embeddings and vector search) to anchor answers to real content.",
      decisions: [
        "Custom RAG with chunking and embeddings to avoid hallucinations and keep traceability.",
        "Multi-tenant with logical isolation per organization.",
        "Document Intelligence for OCR and structure extraction.",
        "Automated deployment with Docker and CI/CD.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "cstation",
    name: "CStation",
    tagline: "Developer Platform · .NET ecosystem",
    description:
      "Knowledge and resource hub focused on the C# and .NET ecosystem. Built for engineers: documented architecture, design patterns, best practices and advanced modern backend resources. Shipped as a real product, not a blog.",
    demoUrl: "https://cstation.johan-rv.site/es",
    repoUrl: null,
    featured: true,
    tags: ["Next.js", "ASP.NET Core", "TypeScript", "Docker", "PostgreSQL", "Clean Architecture"],
    case: {
      problem:
        "Gather architecture, patterns and .NET best practices into one product built for engineers.",
      role: "Author and developer",
      architecture:
        "Next.js (App Router) frontend and ASP.NET Core backend over PostgreSQL. Containerized deployment.",
      decisions: [
        "Clean Architecture on the backend.",
        "Multi-locale (es/en) from day one.",
        "Docker-based deployment.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Enterprise Security Platform",
    description:
      "Security platform with a microservice architecture in ASP.NET Core. SAST/DAST analysis, JWT authentication, inter-service communication and CI/CD pipelines.",
    tags: ["ASP.NET Core", "Docker", "JWT", "RabbitMQ", "CI/CD"],
    demoUrl: null,
    repoUrl: null,
    case: {
      problem:
        "Centralize SAST/DAST security analysis and authentication across microservices.",
      role: "Backend developer",
      architecture:
        "ASP.NET Core microservices communicating via RabbitMQ with JWT auth between services.",
      decisions: [
        "Service decomposition to scale analysis.",
        "JWT for inter-service auth.",
        "Docker-based CI/CD pipeline.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "autospace",
    name: "AutoSpace",
    tagline: "Parking Management System",
    description:
      "Shift and space management system with REST APIs and a scalable architecture. Robust backend with decoupled services.",
    demoUrl: "https://autospace-frontend.netlify.app/",
    repoUrl: null,
    tags: ["C#", "ASP.NET Core", "EF Core", "REST API", "Docker"],
    case: {
      problem:
        "Manage parking shifts and spaces with a scalable, maintainable API.",
      role: "Backend developer",
      architecture:
        "ASP.NET Core + EF Core over a Swagger-documented REST API. Decoupled, Dockerized services.",
      decisions: [
        "Swagger-documented REST APIs.",
        "EF Core for relational persistence.",
        "Containerized service.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "celenemanager",
    name: "CeleneManager",
    tagline: "Database Instance Management",
    description:
      "Automation and management of database instances. Centralized administration and optimization of operational processes.",
    tags: ["C#", "ASP.NET Core", "EF Core", "Docker"],
    demoUrl: null,
    repoUrl: null,
    todo: "verify URL — previous repo pointed to hubble.andrescortes.dev which looks like a third-party domain",
    case: {
      problem:
        "Administer database instances centrally and automate operational processes.",
      role: "Backend developer",
      architecture:
        "ASP.NET Core + EF Core as a central administration layer. Containerized deployment.",
      decisions: [
        "Central API to manage multiple instances.",
        "EF Core for the data layer.",
        "Docker for deployment.",
      ],
      result: null,
      imageUrl: null,
    },
  },
]
