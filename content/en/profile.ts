import type { Profile } from "../types"

export const profile: Profile = {
  name: "Johan Rivera",
  headline: "Backend Developer · Team Leader at RIWI",
  // TODO: one-liner about "Train · Lead · Teach" (Johan to write)
  trinity: null,
  summary: [
    "Team Leader and .NET Backend Developer with experience designing microservice-based architectures, leading training squads and standardizing development processes.",
    "I design and deliver technical tracks as part of my role at RIWI. Founder of Nemora, a SaaS for document analysis and compliance with AI on Azure.",
    "Hands-on with Docker, CI/CD and Azure, focused on continuous software improvement.",
  ],
  pillars: {
    build:
      ".NET backend with microservices, ASP.NET Core, messaging with RabbitMQ and Docker/Azure deployment.",
    lead:
      "Team Lead of RIWI's training squad: I standardize processes, run code reviews and define the team's quality bar.",
    teach:
      "I design and deliver technical tracks for trainee coders as part of my role at RIWI.",
  },
  photoUrl: "/johan-rivera.jpg",
  location: "Medellín, Colombia",
  languages: ["Spanish (native)", "English B2"],
  cvUrl:
    "https://drive.google.com/file/d/1XfhM2GDfTCCEDdRAHRGJDrR5PTeZV3Ew/view?usp=sharing",
}
