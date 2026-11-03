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

## Despliegue en Vercel

1. Push a GitHub.
2. En Vercel: **Add New Project → Import** el repo. Next.js se detecta solo; no se requiere configuración adicional.
3. Rama `main` = producción. Pull requests obtienen URL de preview automática.
4. CI de GitHub Actions (`lint + typecheck + build`) corre en cada PR; Vercel maneja el despliegue por su cuenta.

### Conectar el repo y apuntar `johan-rv.site`

1. En Vercel: **Add New Project → Import** → repo `JARV005/Portafolio`.
2. Framework preset: Next.js (auto). Build: `next build`. Install: `npm install`.
3. Agregar las env vars de abajo (producción + preview).
4. Deploy. Rama `main` queda como producción; cada PR obtiene URL de preview.
5. En **Project → Settings → Domains**:
   - Añadir `johan-rv.site` y `www.johan-rv.site`.
   - Vercel muestra los registros DNS requeridos (A `76.76.21.21` o CNAME según proveedor).
   - Si el dominio está en Cloudflare: desactiva proxy (nube gris) para los records de verificación. Reactiva una vez validado.
   - Marcar `johan-rv.site` como primario; redirige `www` a apex.
6. SSL se emite automáticamente.
7. GitHub Pages (si estaba conectado al dominio antes): quita el CNAME en `Settings → Pages` para liberarlo, o deja la página de redirección (ver abajo).

### GitHub Pages — página de redirección

El build de Vercel reemplaza al deploy anterior de GitHub Pages. Para que la URL antigua (`jarv005.github.io/Portafolio`) no quede huérfana, el repo incluye `github-pages/index.html` con `<meta refresh>` + fallback JS a `johan-rv.site`.

Para publicarlo:

```bash
git switch --orphan gh-pages
git checkout redesign -- github-pages/index.html
git mv github-pages/index.html index.html
rm -rf github-pages
git add index.html
git commit -m "chore(gh-pages): redirect to johan-rv.site"
git push origin gh-pages
```

Y en **Settings → Pages**: Source `Deploy from a branch` → `gh-pages` / `root`.

### Variables de entorno (formulario de contacto)

Setea en Vercel (Production + Preview):

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de [resend.com](https://resend.com) |
| `CONTACT_TO` | Email de destino (ej. `johanalexanderriveravasquez@gmail.com`) |
| `CONTACT_FROM` | Opcional. Email `from` verificado en Resend. Default: `onboarding@resend.dev` (solo para test) |

Si falta `RESEND_API_KEY` o `CONTACT_TO`, el endpoint `/api/contact` responde **503** y el formulario muestra "No configurado". El botón "Copiar email" sigue funcionando igualmente.

> No hay workflow de GitHub Pages: el proyecto corre como app Next.js (SSR / RSC) en Vercel, sin `output: "export"`.

## i18n

- Rutas: `/es/...` y `/en/...` (locale siempre en el path).
- Contenido estructurado tipado en `content/{es,en}/*.ts`.
- Strings de UI en `messages/{es,en}.json` (consumidos por next-intl).
- Idioma por defecto: `es`.
