import type { Project } from "../types"

export const projects: Project[] = [
  {
    id: "nemora",
    kanji: "文",
    name: "Nemora",
    tagline: "SaaS de análisis documental y cumplimiento con IA (proyecto propio)",
    description:
      "Definí una arquitectura multi-tenant sobre .NET y Azure (App Service, Storage, Document Intelligence y Azure OpenAI) y diseñé el modelo de datos en PostgreSQL para automatizar la revisión de documentación normativa. Implementé RAG (ingesta, chunking, embeddings y búsqueda vectorial) para que las respuestas queden ancladas al contenido real de cada documento, y automaticé el despliegue con Docker y CI/CD.",
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
        "Automatizar la revisión de documentación normativa con IA sin perder trazabilidad al contenido original.",
      role: "Fundador y arquitecto",
      architecture:
        "Multi-tenant sobre Azure (App Service, Storage, Document Intelligence y Azure OpenAI). PostgreSQL para datos relacionales y pipeline RAG propio (ingesta, chunking, embeddings y búsqueda vectorial) para anclar respuestas al contenido real.",
      decisions: [
        "RAG propio con chunking y embeddings para evitar alucinaciones y mantener trazabilidad.",
        "Multi-tenant con aislamiento lógico por organización.",
        "Document Intelligence para OCR y extracción de estructura.",
        "Despliegue automatizado con Docker y CI/CD.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "cstation",
    kanji: "塔",
    name: "CStation",
    tagline: "Developer Platform · ecosistema .NET",
    description:
      "Hub de conocimiento y recursos centrado en el ecosistema C# y .NET. Plataforma construida para engineers: arquitectura documentada, patrones de diseño, buenas prácticas y recursos avanzados del ecosistema backend moderno. Construida como producto real, no como blog.",
    demoUrl: "https://cstation.johan-rv.site/es",
    repoUrl: null,
    featured: true,
    tags: ["Next.js", "ASP.NET Core", "TypeScript", "Docker", "PostgreSQL", "Clean Architecture"],
    case: {
      problem:
        "Reunir arquitectura, patrones y buenas prácticas del ecosistema .NET en un solo producto para engineers.",
      role: "Autor y desarrollador",
      architecture:
        "Frontend en Next.js (App Router) y backend en ASP.NET Core con PostgreSQL. Despliegue contenerizado.",
      decisions: [
        "Clean Architecture para el backend.",
        "Multi-locale (es/en) desde el inicio.",
        "Despliegue vía Docker.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "sentinel",
    kanji: "守",
    name: "Sentinel",
    tagline: "Enterprise Security Platform",
    description:
      "Plataforma de seguridad con arquitectura de microservicios en ASP.NET Core. Análisis SAST/DAST, autenticación JWT, comunicación entre servicios y pipelines CI/CD.",
    tags: ["ASP.NET Core", "Docker", "JWT", "RabbitMQ", "CI/CD"],
    demoUrl: null,
    repoUrl: "https://github.com/RiwiLaziness",
    case: {
      problem:
        "Centralizar análisis de seguridad SAST/DAST y autenticación entre microservicios.",
      role: "Backend developer",
      architecture:
        "Microservicios en ASP.NET Core comunicados por RabbitMQ con autenticación JWT entre servicios.",
      decisions: [
        "Separación por servicio para escalar análisis.",
        "JWT para auth entre servicios.",
        "Pipeline CI/CD con Docker.",
      ],
      result: null,
      imageUrl: "/projects/sentinel.jpg",
    },
  },
  {
    id: "autospace",
    kanji: "駐",
    name: "AutoSpace",
    tagline: "Parking Management System",
    description:
      "Sistema de gestión de turnos y espacios con APIs REST y arquitectura escalable. Backend robusto con servicios desacoplados.",
    demoUrl: "https://autospace-frontend.netlify.app/",
    repoUrl: null,
    tags: ["C#", "ASP.NET Core", "EF Core", "REST API", "Docker"],
    case: {
      problem:
        "Gestionar espacios y turnos de parking con una API escalable y mantenible.",
      role: "Backend developer",
      architecture:
        "ASP.NET Core + EF Core sobre una API REST documentada con Swagger. Servicios desacoplados y Dockerizados.",
      decisions: [
        "APIs REST documentadas con Swagger.",
        "EF Core para persistencia relacional.",
        "Dockerización del servicio.",
      ],
      result: null,
      imageUrl: null,
    },
  },
  {
    id: "celenemanager",
    kanji: "蔵",
    name: "CeleneManager",
    tagline: "Database Instance Management",
    description:
      "Automatización y gestión de instancias de bases de datos. Administración centralizada y optimización de procesos operativos.",
    tags: ["C#", "ASP.NET Core", "EF Core", "Docker"],
    demoUrl: null,
    repoUrl: null,
    todo: "verificar URL — el repo anterior apuntaba a hubble.andrescortes.dev y parece dominio ajeno",
    case: {
      problem:
        "Administrar instancias de bases de datos de forma centralizada y automatizada.",
      role: "Backend developer",
      architecture:
        "ASP.NET Core + EF Core como capa de administración central. Dockerización del despliegue.",
      decisions: [
        "API central para gestionar múltiples instancias.",
        "EF Core para capa de datos.",
        "Docker para despliegue.",
      ],
      result: null,
      imageUrl: null,
    },
  },
]
