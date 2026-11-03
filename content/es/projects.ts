import type { Project } from "../types"

export const projects: Project[] = [
  {
    id: "nemora",
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
    // TODO: confirmar URL pública y repoUrl si corresponde
  },
  {
    id: "cstation",
    name: "CStation",
    tagline: "Developer Platform · ecosistema .NET",
    description:
      "Hub de conocimiento y recursos centrado en el ecosistema C# y .NET. Plataforma construida para engineers: arquitectura documentada, patrones de diseño, buenas prácticas y recursos avanzados del ecosistema backend moderno. Construida como producto real, no como blog.",
    url: "https://cstation.johan-rv.site/es",
    featured: true,
    tags: ["Next.js", "ASP.NET Core", "TypeScript", "Docker", "PostgreSQL", "Clean Architecture"],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Enterprise Security Platform",
    description:
      "Plataforma de seguridad con arquitectura de microservicios en ASP.NET Core. Análisis SAST/DAST, autenticación JWT, comunicación entre servicios y pipelines CI/CD.",
    tags: ["ASP.NET Core", "Docker", "JWT", "RabbitMQ", "CI/CD"],
    todo: "URL pública o repoUrl pendientes",
  },
  {
    id: "autospace",
    name: "AutoSpace",
    tagline: "Parking Management System",
    description:
      "Sistema de gestión de turnos y espacios con APIs REST y arquitectura escalable. Backend robusto con servicios desacoplados.",
    url: "https://autospace-frontend.netlify.app/",
    tags: ["C#", "ASP.NET Core", "EF Core", "REST API", "Docker"],
  },
  {
    id: "celenemanager",
    name: "CeleneManager",
    tagline: "Database Instance Management",
    description:
      "Automatización y gestión de instancias de bases de datos. Administración centralizada y optimización de procesos operativos.",
    tags: ["C#", "ASP.NET Core", "EF Core", "Docker"],
    todo: "verificar URL — en el repo anterior apuntaba a hubble.andrescortes.dev y parece dominio ajeno",
  },
]
