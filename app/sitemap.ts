import type { MetadataRoute } from "next"
import { getContent } from "@/content"
import { routing } from "@/i18n/routing"

const BASE = "https://johan-rv.site"

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getContent("es").projects.map((p) => p.id)
  const paths = ["", ...projects.map((p) => `/proyectos/${p}`)]
  const now = new Date()

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  )
}
