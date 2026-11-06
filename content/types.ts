export type Locale = "es" | "en"

export type ContactLink = {
  kind: "email" | "github" | "linkedin" | "youtube"
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
  type?: "education" | "work" | "venture"
  ascent?: boolean
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
  channelUrl: string
  channelName: string
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

export type ProjectCaseStudy = {
  problem: string
  role: string | null
  architecture: string | null
  decisions: string[]
  result: string | null
  imageUrl: string | null
}

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  demoUrl: string | null
  repoUrl: string | null
  tags: string[]
  featured?: boolean
  todo?: string
  kanji: string
  case: ProjectCaseStudy
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
