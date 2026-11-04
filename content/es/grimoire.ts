import type { Grimoire } from "../types"

export const grimoire: Grimoire = {
  // TODO: frase sobre enseñar (1-2 lineas en primera persona)
  intro: null,
  channelUrl: "https://www.youtube.com/@TheDevGrimoire",
  channelName: "The Dev Grimoire",
  pages: [
    {
      id: "csharp-dotnet",
      title: "C# con .NET",
      learn:
        "Fundamentos de C# moderno y .NET: tipos, LINQ, async/await, Entity Framework Core y buenas prácticas.",
      approach:
        "Proyectos por equipos con ASP.NET Core; retos individuales y revisión de código en vivo.",
      materialUrl: null,
      stack: ["C#", ".NET", "EF Core"],
    },
    {
      id: "nodejs",
      title: "Node.js",
      learn:
        "JavaScript del lado del servidor, APIs REST con Express y manejo asíncrono.",
      approach:
        "Proyectos reales con APIs y persistencia, retos por equipos y code reviews del instructor.",
      materialUrl: null,
      stack: ["JavaScript", "Node.js", "Express"],
    },
    {
      id: "azure",
      title: "Azure",
      learn:
        "Servicios core de Azure (App Service, Storage, SQL) y despliegue de aplicaciones .NET.",
      approach:
        "Laboratorios sobre suscripciones reales y despliegues guiados paso a paso.",
      materialUrl: null,
      stack: ["Azure", "App Service", "Storage"],
    },
    {
      id: "qa-automation",
      title: "QA Automation",
      learn:
        "Pruebas automatizadas unitarias, de integración y E2E; estrategia de QA.",
      approach:
        "Casos reales por equipos sobre un backend .NET; integración con CI.",
      materialUrl: null,
      stack: ["xUnit", "Playwright", "CI"],
    },
    {
      id: "algoritmia",
      title: "Algoritmia",
      learn: "Estructuras de datos, complejidad y resolución de problemas.",
      approach: "Retos por equipos y revisión en vivo de soluciones.",
      materialUrl: null,
      stack: ["Algoritmia"],
    },
    {
      id: "html-css",
      title: "HTML y CSS",
      learn:
        "Fundamentos de HTML semántico y CSS moderno; responsive y accesibilidad.",
      approach:
        "Reconstrucción de piezas reales por equipos y feedback asíncrono.",
      materialUrl: null,
      stack: ["HTML", "CSS"],
    },
    {
      id: "linux",
      title: "Linux",
      learn:
        "Shell, permisos, procesos y herramientas básicas para desarrollo.",
      approach:
        "Prácticas guiadas sobre máquinas reales y retos individuales.",
      materialUrl: null,
      stack: ["Linux", "Bash"],
    },
    {
      id: "databases",
      title: "Bases de datos",
      learn: "Modelado relacional, SQL y buenas prácticas de integridad.",
      approach:
        "Proyectos con PostgreSQL y SQL Server; revisiones de modelo por equipos.",
      materialUrl: null,
      stack: ["SQL", "PostgreSQL", "SQL Server"],
    },
    {
      id: "requirements",
      title: "Ingeniería de requisitos",
      learn:
        "Captura, análisis y especificación de requisitos para proyectos reales.",
      approach:
        "Casos reales por equipos, documentación formal y revisión con stakeholders simulados.",
      materialUrl: null,
      stack: ["UML", "User Stories"],
    },
    {
      id: "aws-patterns",
      title: "AWS y patrones de diseño",
      learn:
        "Servicios core de AWS (EC2, S3, RDS) y patrones de diseño en software.",
      approach:
        "Despliegues reales + ejercicios de refactor aplicando patrones.",
      materialUrl: null,
      stack: ["AWS", "EC2", "Patterns"],
    },
    {
      id: "devops",
      title: "DevOps",
      learn:
        "CI/CD, contenedores con Docker y automatización del ciclo de desarrollo.",
      approach:
        "Pipelines reales por equipos y despliegues continuos sobre entornos de prueba.",
      materialUrl: null,
      stack: ["Docker", "CI/CD"],
    },
  ],
}
