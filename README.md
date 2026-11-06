# Portafolio — Johan Rivera

Portafolio personal construido con Next.js 16 (App Router), TypeScript estricto, Tailwind v4 y next-intl (es/en).

Guía de proyecto en [`CLAUDE.md`](./CLAUDE.md): identidad, concepto creativo, sistema visual, reglas de animación y tono de contenido.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 → redirige a `/es`. También está disponible `/en`.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint (flat config con `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` con `strict` + `noUncheckedIndexedAccess` |

## Estructura

```
app/
  layout.tsx            # raíz mínima
  globals.css           # tokens globales (Fase 2 agrega @theme)
  [locale]/             # layout + páginas por idioma (es, en)
content/
  types.ts              # tipos compartidos del contenido
  index.ts              # getContent(locale)
  es/  en/              # datos reales tipados (profile, experience, projects, skills, education, contact)
messages/
  es.json  en.json      # strings de UI (nav, CTAs, labels de sección)
i18n/
  routing.ts            # locales y defaults
  request.ts            # getRequestConfig de next-intl
proxy.ts                # detección y prefijo de locale (Next 16 — reemplaza middleware.ts)
components/
  sections/  motion/  ui/   # vacíos por ahora, se llenan en fases siguientes
hooks/  lib/            # vacíos por ahora
.github/workflows/ci.yml
```

## Despliegue

### Vercel (producción)

Producción se sirve desde la rama `main` en [johan-rv.site](https://johan-rv.site).

1. En Vercel: **Add New Project → Import** → repo `JARV005/Portafolio`.
2. Framework preset: **Next.js** (auto). Build: `next build`. Install: `npm install`.
3. Configura las [variables de entorno](#variables-de-entorno) para Production **y** Preview.
4. Deploy. Rama `main` queda como producción; cada PR obtiene una URL de preview automática.
5. En **Project → Settings → Domains**:
   - Añade `johan-rv.site` y `www.johan-rv.site`.
   - Vercel muestra los registros DNS requeridos (A `76.76.21.21` o CNAME según proveedor).
   - Si el dominio está en Cloudflare: desactiva proxy (nube gris) para los records de verificación. Reactiva una vez validado.
   - Marca `johan-rv.site` como primario; redirige `www` al apex.
6. SSL se emite automáticamente.

### CI (GitHub Actions)

- [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) corre `lint + typecheck + build` en cada PR y en push a `main`.
- Es el único workflow que **construye** el proyecto. **No** hay workflow que despliegue Next.js a GitHub Pages — el despliegue de la app lo hace Vercel.

### GitHub Pages — solo redirección

La URL antigua de GitHub Pages (`jarv005.github.io/Portafolio`) **no sirve** el portafolio; solo redirige a `johan-rv.site`.

- [`github-pages/index.html`](./github-pages/index.html) y [`github-pages/404.html`](./github-pages/404.html) tienen `<meta refresh>` + fallback JS a `https://johan-rv.site/`.
- [`.github/workflows/pages-redirect.yml`](./.github/workflows/pages-redirect.yml) publica **solo** esa carpeta en Pages en cada push a `main`. No corre `next build`.
- Una sola vez, en **Settings → Pages**: Source `GitHub Actions`.
- Si el dominio `johan-rv.site` estaba antes ligado a Pages, suéltalo en **Settings → Pages → Custom domain** para que el A record apunte solo a Vercel.

### Variables de entorno

Copia [`.env.example`](./.env.example) a `.env.local` para desarrollo, o configúralas en Vercel para Production y Preview:

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `RESEND_API_KEY` | sí (producción) | API key de [resend.com](https://resend.com). Sin esta variable el endpoint `/api/contact` responde **503** y el formulario pinta un mensaje amable con el email como alternativa. |
| `CONTACT_TO` | sí (producción) | Email de destino (ej. `johanalexanderriveravasquez@gmail.com`). |
| `CONTACT_FROM` | no | Email `from` verificado en Resend (ej. `Johan Rivera <contacto@johan-rv.site>`). Default: `onboarding@resend.dev` (solo para test). |

> El botón **"Copiar email"** y los enlaces directos (LinkedIn, GitHub, YouTube) funcionan siempre, independientemente del formulario.

### `/dev/kit`

La ruta `/dev/kit` solo es accesible cuando `process.env.NODE_ENV === "development"`. En producción (Vercel) devuelve 404 automáticamente, y en `robots.txt` está excluida de la indexación (`disallow /*/dev/`).

## i18n

- Rutas: `/es/...` y `/en/...` (locale siempre en el path).
- Contenido estructurado tipado en `content/{es,en}/*.ts`.
- Strings de UI en `messages/{es,en}.json` (consumidos por next-intl).
- Idioma por defecto: `es`.
