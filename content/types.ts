export type Locale = "es" | "en"

export type ContactLink = {
  kind: "email" | "github" | "linkedin"
  label: string
  href: string
  display: string
}

export type Profile = {
  name: string
  headline: string
  trinity: string | null
  summary: string[]
  location: string
  languages: string[]
  cvUrl: string
}

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  active?: boolean
  bullets: string[]
  tags: string[]
}

export type Education = {
  id: string
  degree: string
  institution: string
  period?: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  url?: string
  repoUrl?: string
  tags: string[]
  featured?: boolean
  todo?: string
}

export type Content = {
  profile: Profile
  experience: Experience[]
  education: Education[]
  skills: SkillGroup[]
  stackHighlights: string[]
  projects: Project[]
  contact: ContactLink[]
}
