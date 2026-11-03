import type { SkillGroup } from "../types"

export const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: ["C#", "ASP.NET Core", ".NET", "Entity Framework Core", "LINQ", "APIs REST", "Swagger", "JWT"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Arquitectura",
    items: ["Microservicios", "Clean Architecture", "SOLID", "DDD"],
  },
  {
    category: "Bases de datos",
    items: ["SQL Server", "PostgreSQL", "MySQL"],
  },
  {
    category: "DevOps y Cloud",
    items: ["Docker", "CI/CD", "Azure"],
  },
  {
    category: "Mensajería y Monitoring",
    items: ["RabbitMQ", "Prometheus", "Grafana"],
  },
]

export const stackHighlights = [
  "C#",
  "ASP.NET Core",
  "Docker",
  "Azure",
  "React",
  "Next.js",
  "RabbitMQ",
  "SQL Server",
]
