import { NextResponse } from "next/server"
import { Resend } from "resend"

type Payload = {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isStr(v: unknown, min: number, max: number): v is string {
  return typeof v === "string" && v.trim().length >= min && v.trim().length <= max
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM ?? "onboarding@resend.dev"

  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  if (body.website && typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""

  if (!isStr(name, 2, 80) || !EMAIL_RE.test(email) || !isStr(message, 10, 2000)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 })
  }

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portafolio — ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  })

  if (result.error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
