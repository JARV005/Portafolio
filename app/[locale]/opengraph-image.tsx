import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { getTranslations } from "next-intl/server"
import { getContent, type Locale } from "@/content"

export const alt = "Johan Rivera"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const content = getContent(locale as Locale)

  let avatarSrc: string | null = null
  try {
    const avatarPath = path.join(
      process.cwd(),
      "public",
      "avatar",
      "johan-saludo.png",
    )
    const buf = await readFile(avatarPath)
    avatarSrc = `data:image/png;base64,${buf.toString("base64")}`
  } catch {
    avatarSrc = null
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#f1ece2",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          background:
            "radial-gradient(ellipse 55% 55% at 28% 55%, rgba(255,178,36,0.26) 0%, transparent 60%), #0b0a0d",
          position: "relative",
        }}
      >
        {/* Left column: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 40px 80px 100px",
            width: avatarSrc ? "60%" : "100%",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a39e95",
              marginBottom: 28,
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            00 · {content.profile.location}
          </div>
          <div
            style={{
              fontSize: avatarSrc ? 120 : 140,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {content.profile.name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#ffb224",
              marginTop: 28,
              fontFamily: "ui-monospace, Menlo, monospace",
              display: "flex",
            }}
          >
            {content.profile.headline}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#a39e95",
              marginTop: 20,
              fontFamily: "ui-monospace, Menlo, monospace",
              display: "flex",
              maxWidth: 560,
            }}
          >
            {t("description")}
          </div>
        </div>

        {/* Right column: avatar */}
        {avatarSrc && (
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 0,
              top: 0,
              width: "48%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt=""
              width={520}
              height={475}
              style={{ objectFit: "contain", maxHeight: "92%" }}
            />
          </div>
        )}

        {/* URL top-right */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            fontSize: 20,
            letterSpacing: "0.25em",
            color: "#4a4740",
            fontFamily: "ui-monospace, Menlo, monospace",
            display: "flex",
          }}
        >
          johan-rv.site
        </div>
      </div>
    ),
    size,
  )
}
