import { getContent, type Locale } from "@/content"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Journey } from "@/components/sections/Journey"
import { Squad } from "@/components/sections/Squad"
import { Grimoire } from "@/components/sections/Grimoire"
import { Projects } from "@/components/sections/Projects"
import { Arsenal } from "@/components/sections/Arsenal"
import { Contact } from "@/components/sections/Contact"
import { SiteFooter } from "@/components/sections/SiteFooter"

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return (
    <>
      <Hero
        profile={content.profile}
        contact={content.contact}
        locationLabel={content.profile.location}
      />

      <main className="relative mx-auto w-full max-w-4xl px-6 pt-12 pb-24 space-y-24">
        <div className="energy-rule" />

        <About profile={content.profile} locale={locale} />

        <Journey stages={content.journey} />

        <Squad leadership={content.leadership} />

        <Grimoire data={content.grimoire} />

        <Projects projects={content.projects} />

        <Arsenal skills={content.skills} projects={content.projects} />

        <Contact contact={content.contact} profile={content.profile} />
      </main>

      <SiteFooter name={content.profile.name} />
    </>
  )
}
