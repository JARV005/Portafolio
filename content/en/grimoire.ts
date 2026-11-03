import type { Grimoire } from "../types"

export const grimoire: Grimoire = {
  // TODO: teaching one-liner (first person)
  intro: null,
  pages: [
    {
      id: "nodejs",
      title: "Node.js",
      learn:
        "Server-side JavaScript, REST APIs with Express and async handling.",
      approach:
        "Real projects with APIs and persistence, team challenges and instructor code reviews.",
      materialUrl: null,
      stack: ["JavaScript", "Node.js", "Express"],
    },
    {
      id: "azure",
      title: "Azure",
      learn:
        "Core Azure services (App Service, Storage, SQL) and .NET application deployment.",
      approach:
        "Labs on real subscriptions and step-by-step guided deployments.",
      materialUrl: null,
      stack: ["Azure", "App Service", "Storage"],
    },
    {
      id: "qa-automation",
      title: "QA Automation",
      learn:
        "Unit, integration and E2E automated tests; QA strategy.",
      approach:
        "Team cases on a real .NET backend; CI integration.",
      materialUrl: null,
      stack: ["xUnit", "Playwright", "CI"],
    },
    {
      id: "algoritmia",
      title: "Algorithms",
      learn:
        "Data structures, complexity and problem solving.",
      approach: "Team challenges and live solution reviews.",
      materialUrl: null,
      stack: ["Algoritmia"],
    },
    {
      id: "html-css",
      title: "HTML & CSS",
      learn:
        "Semantic HTML and modern CSS; responsive and accessibility fundamentals.",
      approach:
        "Rebuilds of real pieces by team and asynchronous feedback.",
      materialUrl: null,
      stack: ["HTML", "CSS"],
    },
    {
      id: "linux",
      title: "Linux",
      learn:
        "Shell, permissions, processes and essential development tools.",
      approach:
        "Guided practice on real machines and individual challenges.",
      materialUrl: null,
      stack: ["Linux", "Bash"],
    },
    {
      id: "databases",
      title: "Databases",
      learn:
        "Relational modeling, SQL and integrity best practices.",
      approach:
        "Projects with PostgreSQL and SQL Server; team model reviews.",
      materialUrl: null,
      stack: ["SQL", "PostgreSQL", "SQL Server"],
    },
    {
      id: "requirements",
      title: "Requirements Engineering",
      learn:
        "Capturing, analyzing and specifying requirements for real projects.",
      approach:
        "Real team cases, formal documentation and reviews with simulated stakeholders.",
      materialUrl: null,
      stack: ["UML", "User Stories"],
    },
    {
      id: "aws-patterns",
      title: "AWS & Design Patterns",
      learn:
        "Core AWS services (EC2, S3, RDS) and software design patterns.",
      approach:
        "Real deployments + refactor exercises applying patterns.",
      materialUrl: null,
      stack: ["AWS", "EC2", "Patterns"],
    },
    {
      id: "devops",
      title: "DevOps",
      learn:
        "CI/CD, Docker containers and development lifecycle automation.",
      approach:
        "Real team pipelines and continuous deployments on staging environments.",
      materialUrl: null,
      stack: ["Docker", "CI/CD"],
    },
  ],
}
