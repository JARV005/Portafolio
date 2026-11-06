import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { InkPanel, Reveal, SectionLabel, SplitHeading } from "@/components/motion"

const TOKENS = ["bg", "surface", "fg", "fg-dim", "ki", "ki-blue", "ink", "stroke"] as const

const KANJI_SET = [
  { k: "気", label: "inicio", i: "00" },
  { k: "道", label: "sobre mí", i: "01" },
  { k: "変", label: "trayectoria", i: "02" },
  { k: "隊", label: "escuadrón", i: "03" },
  { k: "書", label: "grimorio", i: "04" },
  { k: "作", label: "proyectos", i: "05" },
  { k: "会", label: "contacto", i: "06" },
] as const

function Pane({ theme, children }: { theme: "dark" | "light"; children: ReactNode }) {
  return (
    <div data-theme={theme} className="min-h-screen bg-bg text-fg">
      <div className="sticky top-0 z-10 bg-bg/80 backdrop-blur border-b border-[color:var(--stroke)] px-6 py-3 font-mono text-xs uppercase tracking-widest text-fg-dim">
        {theme === "dark" ? "Noche" : "Manga"}
      </div>
      <div className="p-8 space-y-10">{children}</div>
    </div>
  )
}

function Swatches() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {TOKENS.map((t) => (
        <div key={t} className="space-y-1">
          <div
            className="h-14 rounded-[var(--radius-ink)] border-2"
            style={{
              background: `var(--${t})`,
              borderColor: "var(--stroke)",
            }}
          />
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim">
            {t}
          </div>
        </div>
      ))}
    </div>
  )
}

function KanjiRow() {
  return (
    <div className="flex flex-wrap gap-5">
      {KANJI_SET.map(({ k, label, i }) => (
        <div key={k} className="flex flex-col items-center gap-1">
          <span
            aria-hidden="true"
            lang="ja"
            className="text-4xl text-ki leading-none"
            style={{ fontFamily: "var(--font-kanji)" }}
          >
            {k}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-fg-dim">
            {i} · {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function Typography() {
  return (
    <div className="space-y-3">
      <h1 className="font-display font-black text-5xl leading-[1.05]">Display 900 · Johan</h1>
      <h2 className="font-display font-black text-3xl">Display 800</h2>
      <p className="font-sans text-base">
        Geist — texto base. Primera persona, frases cortas, verdad defendible.
      </p>
      <p className="font-mono text-xs text-fg-dim tracking-wider uppercase">
        // 00 · Geist Mono · etiqueta
      </p>
    </div>
  )
}

function Textures() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className="h-24 relative rounded-[var(--radius-ink)] border-2 overflow-hidden text-fg-dim"
        style={{ borderColor: "var(--stroke)" }}
      >
        <span aria-hidden className="absolute inset-0 grain opacity-20" />
        <span className="relative p-2 font-mono text-xs">grain</span>
      </div>
      <div
        className="h-24 relative rounded-[var(--radius-ink)] border-2 overflow-hidden text-ki"
        style={{ borderColor: "var(--stroke)" }}
      >
        <span aria-hidden className="absolute inset-0 halftone opacity-50" />
        <span className="relative p-2 font-mono text-xs text-fg-dim">halftone</span>
      </div>
      <div
        className="h-24 relative rounded-[var(--radius-ink)] border-2 overflow-hidden text-fg-dim"
        style={{ borderColor: "var(--stroke)" }}
      >
        <span aria-hidden className="absolute inset-0 speed-lines opacity-30" />
        <span className="relative p-2 font-mono text-xs">speed-lines</span>
      </div>
    </div>
  )
}

function Primitives() {
  return (
    <div className="space-y-6">
      <SectionLabel kanji="書" label="SectionLabel" index="k0" />

      <div>
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-2">
          SplitHeading (word)
        </div>
        <SplitHeading
          text="Entrenar liderar enseñar"
          as="h2"
          className="font-display font-black text-3xl"
        />
      </div>

      <div>
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-2">
          Reveal + InkPanel
        </div>
        <Reveal>
          <InkPanel className="p-5">
            <p className="text-sm">
              Viñeta con borde de tinta y grano sutil. El `Reveal` entra con 16px desde abajo.
            </p>
          </InkPanel>
        </Reveal>
      </div>

      <div>
        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim mb-2">
          InkPanel · texture="halftone"
        </div>
        <InkPanel className="p-5" texture="halftone">
          <p className="text-sm">Textura de semitono atenuada como fondo.</p>
        </InkPanel>
      </div>
    </div>
  )
}

function Content() {
  return (
    <>
      <section>
        <h2 className="font-display font-black text-xl mb-3">Tokens</h2>
        <Swatches />
      </section>
      <section>
        <h2 className="font-display font-black text-xl mb-3">Tipografía</h2>
        <Typography />
      </section>
      <section>
        <h2 className="font-display font-black text-xl mb-3">Kanji subset</h2>
        <KanjiRow />
      </section>
      <section>
        <h2 className="font-display font-black text-xl mb-3">Texturas</h2>
        <Textures />
      </section>
      <section>
        <h2 className="font-display font-black text-xl mb-3">Primitivas</h2>
        <Primitives />
      </section>
    </>
  )
}

export default function DevKitPage() {
  if (process.env.NODE_ENV !== "development") notFound()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <Pane theme="dark">
        <Content />
      </Pane>
      <Pane theme="light">
        <Content />
      </Pane>
    </div>
  )
}
