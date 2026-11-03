import type { SkillGroup } from "../types"

export const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: ["C#", "ASP.NET Core", ".NET", "Entity Framework Core", "LINQ", "REST APIs", "Swagger", "JWT"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Architecture",
    items: ["Microservices", "Clean Architecture", "SOLID", "DDD"],
  },
  {
    category: "Databases",
    items: ["SQL Server", "PostgreSQL", "MySQL"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "CI/CD", "Azure"],
  },
  {
    category: "Messaging & Monitoring",
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
