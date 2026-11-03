export type Locale = "es" | "en"

export type ContactLink = {
  kind: "email" | "github" | "linkedin"
  label: string
  href: string
  display: string
}

export type Pillars = {
  build: string
  lead: string
  teach: string
}

export type Profile = {
  name: string
  headline: string
  trinity: string | null
  summary: string[]
  pillars: Pillars
  photoUrl: string | null
  location: string
  languages: string[]
  cvUrl: string
}

export type JourneyStage = {
  id: string
  period: string | null
  title: string
  summary: string
  highlights: string[]
  tags: string[]
}

export type LeadershipMetric = {
  id: string
  value: number | null
  label: string
  unit?: string
}

export type LeadershipNode = {
  id: string
  label: string
}

export type Leadership = {
  practices: string[]
  metrics: LeadershipMetric[]
  nodes: LeadershipNode[]
  quote: string | null
}

export type GrimoirePage = {
  id: string
  title: string
  learn: string
  approach: string
  materialUrl: string | null
  stack: string[]
}

export type Grimoire = {
  intro: string | null
  pages: GrimoirePage[]
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
  journey: JourneyStage[]
  leadership: Leadership
  grimoire: Grimoire
  skills: SkillGroup[]
  stackHighlights: string[]
  projects: Project[]
  contact: ContactLink[]
}
