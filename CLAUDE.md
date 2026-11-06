# Portafolio de Johan Rivera — guía del proyecto

## Qué debe comunicar
- Johan Rivera, **Desarrollador Backend (C#/.NET, Node.js, Azure)**, Medellín. Fundador de Nemora (SaaS de análisis documental y cumplimiento con IA sobre Azure).
- RIWI es **experiencia laboral**, no identidad: aparece como la entrada más completa de la Trayectoria (liderazgo de equipos, code reviews, estándares, QA/DevOps, gestión de requisitos y formación de coders). No se usa como titular, etiqueta principal, meta, Open Graph ni JSON-LD jobTitle.
- Tres ideas que el visitante debe llevarse en 10 segundos: construyo backend sólido, trabajo bien con equipos, enseño.
- Público principal: reclutadores técnicos y tech leads. Deben llegar a proyectos, stack, CV y contacto en máximo 2 clics.

### Titular canónico
"Desarrollador Backend · C#/.NET · Node.js · Azure"

### Sección "Cómo trabajo con equipos" (antes "Escuadrón")
- Mantiene el kanji 隊 y la mecánica de "energía del equipo", pero el encabezado de sección es **"Cómo trabajo con equipos"** (/ "How I work with teams"). En la nav va como "Equipo" / "Team".
- Es evidencia de cómo lidero, no un cargo.
- Las **únicas cifras del sitio** viven aquí:
  - **+200 · coders entrenados**
  - **+50 · coders que ya consiguieron empleo**
  - **+15 · proyectos liderados**
- El contador anima de 0 a la cifra al entrar en viewport y muestra el `+` al terminar. Reduced motion: cifra final directa.
- Prohibido inventar otras métricas o dejar contadores en TODO.

### YouTube — "The Dev Grimoire"
- Canal: https://www.youtube.com/@TheDevGrimoire.
- Enlace destacado en el Grimorio (encabezado o contraportada), y como enlace social en hero, contacto y footer con icono simple de YouTube.
- Incluido en `sameAs` del JSON-LD Person.

### Grimorio — libro abierto real
- **Decisión técnica**: libro renderizado con `page-flip` (StPageFlip), importado dinámicamente (`dynamic({ ssr: false })`) y montado solo cuando la sección está a <20% del viewport. ~27 KB gzip fuera del bundle inicial.
- **No secuestra el scroll**: nada de pin o scroll horizontal. El libro se abre solo una vez al entrar al viewport y las páginas se pasan con drag de esquina, clic en la mitad, botones o teclado (←/→/Home/End).
- **Composición**: shell exterior con tapa dura (cuero oscuro + cantos ámbar), lomo redondeado, bloque de hojas apiladas a los lados cuyo grosor cambia con el avance. Perspectiva leve (`rotateX(2deg)`).
- **Páginas**: papel #F4EFE6 con grano SVG inline, encabezado corrido "The Dev Grimoire" y número de página en cada esquina inferior. Texto en tinta #111014.
- **Secuencia**: portada → inner front → intro + índice → 11 tracks × 2 páginas (izq: título + kanji + qué aprenden; der: enfoque + runas + material) → closing + YouTube → inner back → contraportada.
- **Runas**: las tecnologías del track se dibujan con `stroke-dasharray` en trazo escalonado al abrirse la página.
- **Móvil (<768px)**: `usePortrait: true` → 1 página a la vez con swipe nativo, mismo paso realista. Shell reducido sin perspectiva.
- **Reduced motion**: no se inicializa page-flip. Se muestra una sola página con cross-fade al cambiar. Las runas aparecen rellenas sin animación.
- **Accesibilidad**: cada página es DOM real (page-flip carga HTML con `loadFromHTML`), `role="region"` con `aria-roledescription="book"`, `aria-live` en el indicador "Página X de Y", teclado completo. El índice en la segunda hoja permite saltar a cualquier track.

## Concepto creativo: "Entrenar · Liderar · Enseñar"
Narrativa shōnen: el progreso viene del entrenamiento, el equipo multiplica la fuerza y quien enseña hace crecer a otros. Inspirado en Dragon Ball y Black Clover, pero el homenaje es por MECÁNICAS y lenguaje visual, nunca por contenido de las series.

Lenguaje visual:
- Energía (ki): partículas, auras, convergencias, cargas. Todo dibujado por código.
- Manga: semitono (screentone), líneas de velocidad, viñetas con borde de tinta.
- Grimorio: libro de conocimiento que se abre (sección de docencia).
- Kanji decorativos como etiqueta de sección: 気 inicio, 道 sobre mí, 変 trayectoria, 隊 escuadrón, 書 grimorio, 作 proyectos, 会 contacto. Siempre aria-hidden y con la etiqueta real en texto.

Reglas de homenaje (innegociables):
- Prohibido: personajes o siluetas reconocibles, peinados icónicos, logos, emblemas, tréboles, esferas naranjas con estrellas, nombres de técnicas o personajes en la UI, e imágenes, audio o fuentes tomadas de las series.
- Permitido: auras y energía genéricas, estética manga genérica, la palabra "grimorio", easter eggs discretos.
- **Excepción de avatar propio**: Mis avatares ilustrados en `public/avatar/` (`johan-saludo.png` y `johan-mano.png`) son arte propio y se usan tal cual, sin recortar ni alterar sus símbolos. La regla de no usar tréboles, emblemas ni personajes aplica a todo lo que se dibuje por código, no a mis propias ilustraciones. Como las ilustraciones ya cargan el guiño visual más fuerte, el resto del sitio mantiene los homenajes sutiles — no agregar más elementos temáticos solo porque las ilustraciones existan.

## Sistema visual
- Tema "Noche" (por defecto): fondo #0B0A0D, superficie #141218, texto #F1ECE2, texto secundario #A39E95.
- Tema "Manga" (claro): papel #F4EFE6, tinta #111014, tramas en grises.
- Acento principal "ki" ámbar #FFB224. Energía secundaria azul #4CC2FF solo en estados (hover, foco, momentos de carga). Carmesí #E5484D solo como detalle puntual.
- Máximo 2 acentos visibles a la vez. Prohibidos los degradados morado/neón genéricos.
- Tipografía (next/font): display "Archivo" expandido 800–900 para titulares; "Geist" para texto; "Geist Mono" para etiquetas y datos; "Noto Serif JP" solo para los kanji (subset).
- Viñetas con borde de tinta de 2px y radio de 4–6px; grano o semitono muy sutil de fondo.

## Reglas de animación: único, no saturado
- Una sola animación firma por sección. El resto son microinteracciones (opacidad + desplazamiento de 8–16px, 300–600ms, ease-out).
- Nada en bucle infinito salvo el aura del hero en baja intensidad. Los canvas se pausan fuera del viewport (IntersectionObserver) y con la pestaña oculta.
- prefers-reduced-motion: cada animación firma tiene una versión estática equivalente.
- Animar solo transform y opacity; canvas con devicePixelRatio máximo 2; 60fps en un portátil medio.
- Móvil: versiones simplificadas (menos partículas, sin efectos de cursor).
- **Avatar del hero (`johan-saludo.png`) puede ser el LCP**: cargar con `priority`, `next/image` con sizes óptimos y objetivo < 150 KB entregados al cliente en desktop (AVIF/WebP vía Next).

## Stack
- Next.js App Router + TypeScript estricto (sin ignoreBuildErrors) + Tailwind CSS v4.
- motion (motion/react) para microinteracciones; GSAP + ScrollTrigger para coreografías de scroll; Lenis para scroll suave; Canvas 2D para partículas (sin three.js salvo justificación).
- Contenido separado de la UI en content/, tipado y bilingüe (es por defecto, en).
- Despliegue en Vercel. Lighthouse móvil: Performance ≥ 90; Accessibility, Best Practices y SEO ≥ 95.

## Contenido y tono
- Todo debe ser verdadero y defendible en una entrevista técnica. Si falta un dato, deja un TODO en content/ y NO inventes cifras, fechas ni logros.
- Nada de "apasionado", "results-driven", "ninja" ni frases genéricas de IA. Primera persona, frases cortas: qué hice, cómo, qué impacto.
- Sin barras de porcentaje ni niveles de habilidad.
- Titular: "Desarrollador Backend · C#/.NET · Node.js · Azure".

## Forma de trabajo
- Estructura: components/sections/*, components/motion/* (primitivas), hooks/*, lib/*, content/{es,en}/*.
- Commits pequeños por fase. Al cerrar cada fase: npm run build y lint sin errores, más un resumen de lo hecho y de qué revisar en el navegador.
- Antes de agregar un servicio externo o una dependencia pesada, pregunta.
