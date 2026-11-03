import type { Profile } from "../types"

export const profile: Profile = {
  name: "Johan Rivera",
  headline: "Desarrollador Backend · Team Leader en RIWI",
  // TODO: línea breve sobre "Entrenar · Liderar · Enseñar" (Johan la va a escribir)
  trinity: null,
  summary: [
    "Team Leader y Backend Developer .NET con experiencia en diseño de arquitecturas basadas en microservicios, liderazgo de equipos en formación y estandarización de procesos de desarrollo.",
    "Diseño y dicto tracks técnicos dentro de mi rol en RIWI. Fundador de Nemora, SaaS de análisis documental y cumplimiento con IA sobre Azure.",
    "Experiencia con Docker, CI/CD y Azure, y foco en mejora continua del software.",
  ],
  pillars: {
    build:
      "Backend .NET con microservicios, ASP.NET Core, mensajería con RabbitMQ y despliegue sobre Docker y Azure.",
    lead:
      "Team Lead del equipo en formación en RIWI: estandarizo procesos, hago code reviews y defino los estándares de calidad del equipo.",
    teach:
      "Diseño y dicto tracks técnicos para coders en formación como parte de mi rol en RIWI.",
  },
  photoUrl: "/johan-rivera.jpg",
  location: "Medellín, Colombia",
  languages: ["Español (nativo)", "Inglés B2"],
  cvUrl:
    "https://drive.google.com/file/d/1XfhM2GDfTCCEDdRAHRGJDrR5PTeZV3Ew/view?usp=sharing",
}
