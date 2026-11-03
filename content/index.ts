import type { Content, Locale } from "./types"
import { es } from "./es"
import { en } from "./en"

const content: Record<Locale, Content> = { es, en }

export function getContent(locale: Locale): Content {
  return content[locale]
}

export type { Content, Locale }
