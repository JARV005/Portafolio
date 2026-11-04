"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Check, Copy, Github, Linkedin, Mail, Download, Youtube } from "lucide-react"
import { InkPanel, Reveal, SectionLabel } from "@/components/motion"
import { ContactForm } from "@/components/sections/ContactForm"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { ContactLink, Profile } from "@/content/types"

type ContactProps = {
  contact: ContactLink[]
  profile: Profile
}

const ICON_FOR: Record<ContactLink["kind"], typeof Mail> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
}

export function Contact({ contact, profile }: ContactProps) {
  const t = useTranslations("sections")
  const tC = useTranslations("contactSection")
  const tCta = useTranslations("cta")
  const tA11y = useTranslations("a11y")
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [avatarEntered, setAvatarEntered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) {
      setAvatarEntered(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setAvatarEntered(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const email = contact.find((c) => c.kind === "email")
  const github = contact.find((c) => c.kind === "github")
  const linkedin = contact.find((c) => c.kind === "linkedin")
  const youtube = contact.find((c) => c.kind === "youtube")

  async function copyEmail() {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email.display)
    } catch {
      window.location.href = email.href
      return
    }
    if (!reduced) setAnimating(true)
    setCopied(true)
    window.setTimeout(() => setAnimating(false), 650)
    window.setTimeout(() => setCopied(false), 2600)
  }

  return (
    <section id="contact" ref={sectionRef} className="space-y-6">
      <SectionLabel kanji="会" label={t("contact")} index="07" />

      <Reveal>
        <h2 className="font-display font-black text-3xl md:text-4xl">
          {tC("heading")}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
        <Reveal delay={0.05} className="order-2 md:order-1">
        <InkPanel className="p-6">
          <div className="flex flex-col gap-5">
            {email && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 font-mono text-sm">
                  <Mail className="w-4 h-4 text-ki" aria-hidden />
                  <a
                    href={email.href}
                    className="text-fg hover:text-ki transition-colors"
                  >
                    {email.display}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  data-animating={animating ? "true" : "false"}
                  className="copy-button relative inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ink)] border-2 bg-bg font-mono text-xs text-fg transition-colors hover:text-ki focus-visible:outline-none focus-visible:border-ki"
                  style={{ borderColor: "var(--stroke)" }}
                >
                  <svg
                    aria-hidden
                    className="copy-trace pointer-events-none absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="98"
                      height="98"
                      rx="4"
                      ry="4"
                      fill="none"
                      stroke="var(--ki)"
                      strokeWidth="2"
                      pathLength={1}
                      vectorEffect="non-scaling-stroke"
                      className="copy-trace-path"
                    />
                  </svg>
                  <span className="relative z-10 flex items-center gap-2">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-ki" aria-hidden />
                        {tC("emailCopied")}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden />
                        {tC("copyEmail")}
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}

            <div className="h-px bg-stroke/60" />

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-sm">
              {[linkedin, github, youtube]
                .filter((c): c is ContactLink => Boolean(c))
                .map((link) => {
                  const Icon = ICON_FOR[link.kind]
                  return (
                    <li key={link.kind}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-3 py-2 rounded-[var(--radius-ink)] border border-[color:var(--stroke)] hover:border-ki hover:text-ki transition-colors"
                      >
                        <Icon className="w-4 h-4" aria-hidden />
                        <span className="text-xs">{link.display}</span>
                      </a>
                    </li>
                  )
                })}
              <li>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-ink)] border border-[color:var(--stroke)] hover:border-ki hover:text-ki transition-colors"
                >
                  <Download className="w-4 h-4 text-ki" aria-hidden />
                  <span className="text-xs">{tCta("downloadCV")}</span>
                </a>
              </li>
            </ul>

            <div className="pt-2 space-y-3">
              <h3 className="font-display font-black text-sm uppercase tracking-wide">
                {tC("formHeading")}
              </h3>
              <ContactForm />
            </div>
          </div>
        </InkPanel>
        </Reveal>

        <div
          className={`contact-avatar order-1 md:order-2 ${
            avatarEntered ? "contact-avatar-in" : ""
          } ${reduced ? "contact-avatar-reduced" : ""}`}
        >
          <span aria-hidden className="contact-avatar-glow" />
          <Image
            src="/avatar/johan-mano.png"
            alt={tA11y("avatarReach")}
            width={1312}
            height={1199}
            sizes="(max-width: 768px) 60vw, 280px"
            className="contact-avatar-img"
          />
        </div>
      </div>
    </section>
  )
}
