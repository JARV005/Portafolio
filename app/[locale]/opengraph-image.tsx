import { ImageResponse } from "next/og"
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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          color: "#f1ece2",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          background:
            "radial-gradient(ellipse 60% 50% at 30% 55%, rgba(255,178,36,0.22) 0%, transparent 60%), #0b0a0d",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a39e95",
            marginBottom: 32,
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          00 · {content.profile.location}
        </div>
        <div
          style={{
            fontSize: 140,
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
            fontSize: 36,
            color: "#ffb224",
            marginTop: 36,
            fontFamily: "ui-monospace, Menlo, monospace",
            display: "flex",
          }}
        >
          {content.profile.headline}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#a39e95",
            marginTop: 24,
            fontFamily: "ui-monospace, Menlo, monospace",
            display: "flex",
          }}
        >
          {t("description")}
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 100,
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
