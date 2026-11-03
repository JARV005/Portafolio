"use client"

import { useState, useId } from "react"
import type { FormEvent } from "react"
import { useTranslations } from "next-intl"
import { Check, Send } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type Status = "idle" | "sending" | "ok" | "not_configured" | "error"

export function ContactForm() {
  const t = useTranslations("contactForm")
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const [status, setStatus] = useState<Status>("idle")
  const [animating, setAnimating] = useState(false)
  const reduced = useReducedMotion()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus("sending")
    if (!reduced) setAnimating(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      })
      window.setTimeout(() => setAnimating(false), 650)
      if (res.ok) {
        setStatus("ok")
        form.reset()
      } else if (res.status === 503) {
        setStatus("not_configured")
      } else {
        setStatus("error")
      }
    } catch {
      setAnimating(false)
      setStatus("error")
    }
  }

  const sending = status === "sending"
  const ok = status === "ok"

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label htmlFor={nameId} className="block">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
            {t("nameLabel")}
          </span>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className="mt-1 w-full bg-bg border-2 rounded-[var(--radius-ink)] px-3 py-2 text-sm font-mono text-fg focus:outline-none focus:border-ki"
            style={{ borderColor: "var(--stroke)" }}
          />
        </label>
        <label htmlFor={emailId} className="block">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
            {t("emailLabel")}
          </span>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full bg-bg border-2 rounded-[var(--radius-ink)] px-3 py-2 text-sm font-mono text-fg focus:outline-none focus:border-ki"
            style={{ borderColor: "var(--stroke)" }}
          />
        </label>
      </div>

      <label htmlFor={messageId} className="block">
        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
          {t("messageLabel")}
        </span>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          className="mt-1 w-full bg-bg border-2 rounded-[var(--radius-ink)] px-3 py-2 text-sm font-mono text-fg focus:outline-none focus:border-ki resize-y"
          style={{ borderColor: "var(--stroke)" }}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending || ok}
          data-animating={animating ? "true" : "false"}
          className="copy-button relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-ink)] border-2 bg-bg font-mono text-sm text-fg transition-colors hover:text-ki focus-visible:outline-none focus-visible:border-ki disabled:opacity-70"
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
            {ok ? (
              <>
                <Check className="w-4 h-4 text-ki" aria-hidden />
                {t("sent")}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden />
                {sending ? t("sending") : t("send")}
              </>
            )}
          </span>
        </button>

        {status === "error" && (
          <p
            role="status"
            aria-live="polite"
            className="font-mono text-xs text-[color:var(--ink)]"
          >
            {t("error")}
          </p>
        )}
        {status === "not_configured" && (
          <p
            role="status"
            aria-live="polite"
            className="font-mono text-xs text-ki/80"
          >
            {t("notConfigured")}
          </p>
        )}
      </div>
    </form>
  )
}
