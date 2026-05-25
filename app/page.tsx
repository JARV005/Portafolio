"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Github, Linkedin, Mail, ExternalLink, Menu, X,
  ChevronDown, Download, ArrowRight, Shield, Car,
  Database, Code2, Terminal, Server, Layers, Cloud,
  Zap, Activity
} from "lucide-react"

/* ──────────────────────────────────────────
   CONSTANTS
─────────────────────────────────────────── */
const NAV_ITEMS = ["Sobre Mí", "Skills", "Experiencia", "Proyectos", "Contacto"]
const NAV_IDS   = ["about",    "skills", "experience",   "projects",  "contact"]

const STACK = ["C#", "ASP.NET Core", "Docker", "Azure", "React", "Next.js", "RabbitMQ", "SQL Server"]

const SKILLS = [
  {
    category: "Backend",
    icon: <Server className="w-4 h-4" />,
    gradient: "from-violet-700 to-purple-800",
    glow: "rgba(124,58,237,0.35)",
    items: ["C#", "ASP.NET Core", ".NET", "Entity Framework Core", "LINQ", "APIs REST", "Swagger", "JWT"],
  },
  {
    category: "Frontend",
    icon: <Code2 className="w-4 h-4" />,
    gradient: "from-indigo-600 to-blue-700",
    glow: "rgba(99,102,241,0.3)",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Arquitectura",
    icon: <Layers className="w-4 h-4" />,
    gradient: "from-purple-700 to-fuchsia-800",
    glow: "rgba(168,85,247,0.3)",
    items: ["Microservicios", "Clean Architecture", "SOLID", "DDD"],
  },
  {
    category: "Bases de Datos",
    icon: <Database className="w-4 h-4" />,
    gradient: "from-sky-600 to-cyan-700",
    glow: "rgba(14,165,233,0.3)",
    items: ["SQL Server", "PostgreSQL", "MySQL"],
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="w-4 h-4" />,
    gradient: "from-violet-600 to-indigo-700",
    glow: "rgba(139,92,246,0.3)",
    items: ["Docker", "CI/CD", "Azure"],
  },
  {
    category: "Mensajería & Monitoring",
    icon: <Activity className="w-4 h-4" />,
    gradient: "from-fuchsia-700 to-pink-800",
    glow: "rgba(217,70,239,0.3)",
    items: ["RabbitMQ", "Prometheus", "Grafana"],
  },
]

const SKILLS_BARS = [
  { label: "Backend / .NET", pct: 92 },
  { label: "Arquitectura & Patterns", pct: 88 },
  { label: "DevOps & CI/CD", pct: 80 },
  { label: "Team Leadership", pct: 85 },
]

const PROJECTS = [
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Enterprise Security Platform",
    desc: "Plataforma de seguridad con arquitectura de microservicios en ASP.NET Core. Análisis SAST/DAST, autenticación JWT, comunicación entre servicios y pipelines CI/CD.",
    icon: <Shield className="w-5 h-5" />,
    tags: ["ASP.NET Core", "Docker", "JWT", "RabbitMQ", "CI/CD"],
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
    arch: "Microservicios",
    href: "#",
  },
  {
    id: "autospace",
    name: "AutoSpace",
    tagline: "Parking Management System",
    desc: "Sistema de gestión de turnos y espacios con APIs REST y arquitectura escalable. Backend robusto con servicios desacoplados.",
    icon: <Car className="w-5 h-5" />,
    tags: ["C#", "ASP.NET Core", "EF Core", "REST API", "Docker"],
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
    arch: "REST API",
    href: "https://autospace-frontend.netlify.app/",
  },
  {
    id: "celenemanager",
    name: "CeleneManager",
    tagline: "Database Instance Management",
    desc: "Automatización y gestión de instancias de bases de datos. Administración centralizada y optimización de procesos operativos.",
    icon: <Database className="w-5 h-5" />,
    tags: ["C#", "ASP.NET Core", "EF Core", "Docker"],
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    arch: "Microservicios",
    href: "https://hubble.andrescortes.dev/",
  },
]

/* ──────────────────────────────────────────
   PARTICLE CANVAS
─────────────────────────────────────────── */
function EnergyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resize)

    type Particle = {
      x: number; y: number; vx: number; vy: number
      size: number; alpha: number; color: string; life: number; maxLife: number
    }

    const colors = ["rgba(139,92,246,", "rgba(99,102,241,", "rgba(167,139,250,", "rgba(103,232,249,"]
    const particles: Particle[] = []

    const spawn = () => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.5 + 0.2,
        color,
        life: 0,
        maxLife: Math.random() * 180 + 120,
      })
    }

    let frame = 0
    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      if (frame % 4 === 0 && particles.length < 55) spawn()
      frame++

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.life++
        const progress = p.life / p.maxLife
        const a = p.alpha * Math.sin(progress * Math.PI)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${a.toFixed(2)})`
        ctx.fill()
        if (p.life >= p.maxLife) particles.splice(i, 1)
      }
      requestAnimationFrame(loop)
    }
    loop()
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
─────────────────────────────────────────── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [activeSection, setActive]    = useState("")
  const [scrolled, setScrolled]       = useState(false)
  const [barsVisible, setBarsVisible] = useState(false)
  const barsRef = useRef<HTMLDivElement>(null)

  /* Scroll + active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = ""
      NAV_IDS.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) current = id
      })
      setActive(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.07 }
    )
    document.querySelectorAll(".reveal,.reveal-left").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Bars reveal */
  useEffect(() => {
    if (!barsRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true) },
      { threshold: 0.3 }
    )
    io.observe(barsRef.current)
    return () => io.disconnect()
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-[#06050e] text-white bg-grid relative overflow-x-hidden">

      {/* ── Particles ── */}
      <EnergyParticles />

      {/* ── Ambient orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="orb animate-pulse-orb w-[700px] h-[700px] bg-purple-950/40 top-[-15%] left-[-5%]" />
        <div className="orb animate-pulse-orb w-[500px] h-[500px] bg-indigo-950/35 top-[35%] right-[-8%]" style={{ animationDelay: "1.8s" }} />
        <div className="orb animate-pulse-orb w-[400px] h-[400px] bg-violet-950/30 bottom-[5%] left-[15%]" style={{ animationDelay: "3.2s" }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass border-b border-purple-900/25 shadow-2xl shadow-purple-950/40" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex justify-between items-center">
          <button
            onClick={() => scrollTo("hero")}
            className="font-bold text-base gradient-text tracking-tight hover:opacity-80 transition-opacity font-mono"
          >
            {"<JR />"}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(NAV_IDS[i])}
                className={`nav-link ${activeSection === NAV_IDS[i] ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1XfhM2GDfTCCEDdRAHRGJDrR5PTeZV3Ew/view?usp=sharing"
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-mono text-purple-300/80 border border-purple-700/40 rounded-full px-4 py-2 hover:bg-purple-900/25 hover:border-purple-500/60 transition-all tracking-widest uppercase"
          >
            <Download className="w-3 h-3" /> CV
          </a>

          <button
            className="md:hidden text-purple-300/80 hover:text-purple-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-purple-900/25 px-6 pb-6 pt-3 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(NAV_IDS[i])}
                className="block w-full text-left px-4 py-3 text-sm text-purple-200/70 hover:bg-purple-900/25 rounded-xl transition-colors uppercase tracking-widest font-mono text-xs"
              >
                {item}
              </button>
            ))}
            <a href="https://drive.google.com/file/d/1XfhM2GDfTCCEDdRAHRGJDrR5PTeZV3Ew/view?usp=sharing" className="flex items-center gap-2 px-4 py-3 text-xs text-purple-300/70 hover:bg-purple-900/25 rounded-xl font-mono uppercase tracking-widest">
              <Download className="w-3.5 h-3.5" /> Descargar CV
            </a>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      >
        {/* Scouter decorative lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scouter-line absolute top-[28%] left-0 right-0" />
          <div className="scouter-line absolute top-[72%] left-0 right-0" style={{ animationDelay: "2s" }} />
          <div className="absolute top-0 bottom-0 left-[22%] w-px bg-gradient-to-b from-transparent via-purple-700/8 to-transparent" />
          <div className="absolute top-0 bottom-0 right-[22%] w-px bg-gradient-to-b from-transparent via-purple-700/8 to-transparent" />
        </div>

        {/* Energy rings around center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="energy-ring w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" style={{ animationDelay: "0s" }} />
          <div className="energy-ring w-[580px] h-[580px] -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" style={{ animationDelay: "1s" }} />
          <div className="energy-ring w-[740px] h-[740px] -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" style={{ animationDelay: "2s" }} />
        </div>

        {/* Core aura */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none animate-aura"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)" }} />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          {/* Status pill */}
          <div
            className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full glass border border-purple-700/35 text-xs font-mono text-purple-300/80 tracking-widest uppercase animate-fade-in"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            Disponible para proyectos
          </div>

          {/* Name */}
          <h1
            className="text-[clamp(3rem,11vw,7.5rem)] font-bold tracking-tight leading-none gradient-text animate-fade-in-up"
            style={{ textShadow: "0 0 80px rgba(139,92,246,0.3)", animationDelay: "0.1s" }}
          >
            Johan Rivera
          </h1>

          {/* Role */}
          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="text-lg md:text-xl text-purple-200/80 font-light tracking-wide">Technical Team Lead</span>
            <span className="w-1 h-1 rounded-full bg-purple-600" />
            <span className="text-lg md:text-xl text-purple-200/80 font-light tracking-wide">Backend Developer</span>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-900/50 border border-purple-600/35 text-purple-300 text-sm font-mono tracking-wider">.NET</span>
          </div>

          {/* Subtitle */}
          <p
            className="mt-5 mb-12 text-sm md:text-base text-purple-300/55 max-w-xl mx-auto leading-relaxed tracking-wide animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Especializado en microservicios, arquitectura escalable y desarrollo backend moderno con ASP.NET Core.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-14 animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
                boxShadow: "0 0 0 1px rgba(139,92,246,0.3), 0 8px 32px rgba(109,40,217,0.35)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(167,139,250,0.5), 0 8px 40px rgba(109,40,217,0.55)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(139,92,246,0.3), 0 8px 32px rgba(109,40,217,0.35)"
              }}
            >
              Ver Proyectos <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://drive.google.com/file/d/1XfhM2GDfTCCEDdRAHRGJDrR5PTeZV3Ew/view?usp=sharing"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium text-purple-200 glass border border-purple-700/40 hover:border-purple-500/60 hover:bg-purple-900/25 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" /> Descargar CV
            </a>

            <a href="https://github.com/JARV005" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-purple-800/35 text-purple-400 hover:text-purple-200 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="www.linkedin.com/in/jarv005" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-xl glass border border-purple-800/35 text-purple-400 hover:text-purple-200 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Stack floating badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            {STACK.map((tech, i) => (
              <span
                key={tech}
                className="tech-badge animate-float"
                style={{ animationDelay: `${i * 0.45}s`, animationDuration: `${3.5 + i * 0.25}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-purple-500/50 hover:text-purple-400 transition-colors animate-float"
          style={{ animationDuration: "2.2s" }}
        >
          <span className="text-[0.6rem] tracking-[0.2em] uppercase font-mono">Scroll</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section id="about" className="relative py-32 px-6">
        <div className="section-divider" />
        <div className="max-w-5xl mx-auto">

          <div className="reveal text-center mb-16">
            <span className="text-[0.65rem] font-mono text-purple-500/80 tracking-[0.25em] uppercase">// 01 · Sobre Mí</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 gradient-text">Technical Profile</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: text */}
            <div className="reveal-left space-y-5">
              <p className="text-purple-100/75 leading-relaxed text-base">
                <span className="text-purple-200 font-semibold">Technical Team Lead</span> y Backend Developer .NET con experiencia en diseño de arquitecturas basadas en microservicios, liderazgo de equipos en formación y estandarización de procesos de desarrollo.
              </p>
              <p className="text-purple-100/65 leading-relaxed text-sm">
                Especializado en APIs escalables con <span className="text-violet-300">ASP.NET Core</span>, Clean Architecture, SOLID y DDD. Con enfoque en calidad de código, mentoría técnica y entregas de valor real en entornos enterprise.
              </p>
              <p className="text-purple-100/65 leading-relaxed text-sm">
                Experiencia con <span className="text-violet-300">Docker, CI/CD, Azure</span> y mejora continua del software. Español nativo · Inglés B2.
              </p>

              <div className="flex flex-wrap gap-2 pt-3">
                {["Liderazgo Técnico", "Mentoría", "Clean Architecture", "Backend Engineering", "Code Review"].map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { val: "4+", label: "Proyectos" },
                  { val: "2025", label: "Lead desde" },
                  { val: "B2", label: "Inglés" },
                ].map(({ val, label }) => (
                  <div key={label} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-xl font-bold gradient-text">{val}</div>
                    <div className="text-[0.65rem] text-purple-400 mt-1 tracking-wider uppercase font-mono">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: skill bars */}
            <div ref={barsRef} className="reveal space-y-5 delay-2">
              {SKILLS_BARS.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-purple-200/80">{label}</span>
                    <span className="text-xs font-mono text-purple-400">{pct}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-purple-950/70 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: barsVisible ? `${pct}%` : "0%",
                        background: "linear-gradient(90deg, #6d28d9, #8b5cf6, #a78bfa)",
                        transition: "width 1.6s cubic-bezier(.16,1,.3,1)",
                        boxShadow: "0 0 8px rgba(139,92,246,0.5)",
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Scouter-style info card */}
              <div className="mt-6 glass-card rounded-2xl p-5 animate-border-energy">
                <div className="scouter-line mb-4" />
                <div className="font-mono text-[0.65rem] text-purple-500/70 tracking-[0.2em] uppercase mb-3">// System Status</div>
                <div className="space-y-2">
                  {[
                    { key: "Especialización", val: "Backend / .NET" },
                    { key: "Arquitectura", val: "Microservicios / DDD" },
                    { key: "Disponibilidad", val: "Inmediata" },
                  ].map(({ key, val }) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-purple-500/70 font-mono">{key}</span>
                      <span className="text-purple-200 font-mono">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="scouter-line mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SKILLS
      ════════════════════════════════ */}
      <section id="skills" className="relative py-32 px-6">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto">

          <div className="reveal text-center mb-16">
            <span className="text-[0.65rem] font-mono text-purple-500/80 tracking-[0.25em] uppercase">// 02 · Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 gradient-text">Skills & Technologies</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((g, i) => (
              <div
                key={g.category}
                className={`reveal skill-card glass-card rounded-2xl p-6 delay-${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g.gradient} flex items-center justify-center text-white`}
                    style={{ boxShadow: `0 4px 14px ${g.glow}` }}
                  >
                    {g.icon}
                  </div>
                  <span className="text-sm font-semibold text-purple-100 tracking-wide">{g.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map(s => <span key={s} className="tech-badge">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          EXPERIENCE
      ════════════════════════════════ */}
      <section id="experience" className="relative py-32 px-6">
        <div className="section-divider" />
        <div className="max-w-4xl mx-auto">

          <div className="reveal text-center mb-16">
            <span className="text-[0.65rem] font-mono text-purple-500/80 tracking-[0.25em] uppercase">// 03 · Trayectoria</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 gradient-text">Experiencia</h2>
          </div>

          {/* Timeline */}
          <div className="relative border-l border-purple-800/30 pl-10">
            <div className="timeline-dot" />
            <div className="reveal glass-card rounded-2xl p-7">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-purple-100">Technical Team Lead / Backend Developer</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-violet-400 font-semibold text-sm">RIWI</span>
                    <span className="text-[0.65rem] font-mono text-purple-500 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded tracking-wider">2025 – Actualidad</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-[0.65rem] rounded-full bg-emerald-900/30 border border-emerald-700/35 text-emerald-400 font-mono tracking-widest uppercase">Activo</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Liderazgo técnico y mentoría de equipos en formación",
                  "Estandarización de procesos y buenas prácticas de desarrollo",
                  "Code reviews, QA y definición de estándares de calidad",
                  "Desarrollo backend con ASP.NET Core y APIs REST",
                  "Arquitectura de microservicios con RabbitMQ y Docker",
                  "Implementación de CI/CD, Clean Architecture y DDD",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-purple-200/65">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {["ASP.NET Core", "Docker", "RabbitMQ", "CI/CD", "DDD", "Clean Architecture"].map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="reveal mt-10 glass-card rounded-2xl p-7 delay-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-purple-100 tracking-wide">Educación</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-purple-100">Ingeniería de Sistemas</div>
                  <div className="text-xs text-violet-400 mt-0.5">ITM — Instituto Tecnológico Metropolitano</div>
                </div>
                <span className="text-[0.65rem] font-mono text-purple-500 whitespace-nowrap">2023 – Actualidad</span>
              </div>
              <div className="h-px bg-purple-900/25" />
              <div>
                <div className="text-sm font-medium text-purple-100">Desarrollo de Software</div>
                <div className="text-xs text-violet-400 mt-0.5">RIWI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <section id="projects" className="relative py-32 px-6">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto">

          <div className="reveal text-center mb-16">
            <span className="text-[0.65rem] font-mono text-purple-500/80 tracking-[0.25em] uppercase">// 04 · Proyectos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 gradient-text">Featured Projects</h2>
            <p className="text-purple-300/50 mt-4 text-sm max-w-lg mx-auto tracking-wide">
              Arquitectura enterprise, plataformas SaaS y herramientas backend de alto rendimiento.
            </p>
          </div>

          {/* ── CStation hero card ── */}
          <div className="reveal mb-8">
            <div className="cstation-card rounded-3xl p-8 md:p-12"
              style={{ boxShadow: "0 0 60px rgba(109,40,217,0.18), 0 0 0 1px rgba(139,92,246,0.2)" }}>
              {/* Decorative aura */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-700 to-purple-900 flex items-center justify-center"
                      style={{ boxShadow: "0 0 20px rgba(109,40,217,0.5)" }}>
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl md:text-3xl font-bold gradient-text">CStation</h3>
                        <span className="text-[0.6rem] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-purple-900/60 border border-purple-600/35 text-purple-300">Featured</span>
                      </div>
                      <p className="text-xs text-purple-400 mt-0.5 font-mono tracking-wide">Developer Platform · .NET Ecosystem</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                      style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed)", boxShadow: "0 4px 20px rgba(109,40,217,0.4)" }}>
                      Explorar <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://github.com/JARV005" target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass border border-purple-700/35 text-purple-300 hover:text-purple-100 hover:border-purple-500 transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Scouter line */}
                <div className="scouter-line mb-6" />

                <p className="text-purple-200/75 leading-relaxed max-w-2xl mb-8 text-sm md:text-base">
                  Hub de conocimiento y recursos centrado en el ecosistema <span className="text-violet-300 font-semibold">C# y .NET</span>. Una plataforma construida para engineers: arquitectura documentada, patrones de diseño, buenas prácticas y recursos avanzados del ecosistema backend moderno. Construida como producto real, no como blog.
                </p>

                {/* Feature grid */}
                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  {[
                    { icon: <Layers className="w-3.5 h-3.5" />, label: "Knowledge Platform", sub: "Recursos estructurados" },
                    { icon: <Code2 className="w-3.5 h-3.5" />, label: "Ecosistema .NET", sub: "C# · ASP.NET Core" },
                    { icon: <Zap className="w-3.5 h-3.5" />, label: "Architecture Docs", sub: "SOLID · DDD · Patterns" },
                  ].map(({ icon, label, sub }) => (
                    <div key={label} className="glass rounded-xl p-4 border border-purple-800/25">
                      <div className="flex items-center gap-2 text-violet-400 mb-1.5">{icon}
                        <span className="text-xs font-medium text-purple-200">{label}</span>
                      </div>
                      <div className="text-[0.65rem] text-purple-400 font-mono">{sub}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "ASP.NET Core", "TypeScript", "Docker", "PostgreSQL", "Clean Architecture"].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Other projects ── */}
          <div className="grid md:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`reveal project-card glass-card rounded-2xl p-6 flex flex-col delay-${i + 1}`}
                style={{ ["--hover-glow" as string]: p.glow }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`, boxShadow: `0 4px 14px ${p.glow}` }}>
                    {p.icon}
                  </div>
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg glass border border-purple-800/25 text-purple-500 hover:text-purple-200 hover:border-purple-600/45 transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold text-base text-purple-100">{p.name}</h3>
                  <span className="text-[0.6rem] font-mono text-purple-500 bg-purple-950/50 border border-purple-800/25 px-2 py-0.5 rounded tracking-wider">{p.arch}</span>
                </div>
                <p className="text-[0.7rem] text-purple-500 mb-3 font-mono tracking-wide">{p.tagline}</p>
                <p className="text-xs text-purple-200/65 leading-relaxed flex-1 mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT
      ════════════════════════════════ */}
      <section id="contact" className="relative py-32 px-6">
        <div className="section-divider" />
        <div className="max-w-xl mx-auto">

          <div className="reveal text-center mb-12">
            <span className="text-[0.65rem] font-mono text-purple-500/80 tracking-[0.25em] uppercase">// 05 · Contacto</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 gradient-text">Let&apos;s Build</h2>
            <p className="text-purple-300/50 mt-4 text-sm tracking-wide">
              Abierto a proyectos, colaboraciones y nuevas oportunidades.
            </p>
          </div>

          <div className="reveal glass-card rounded-3xl p-8 delay-1">
            <div className="scouter-line mb-6" />

            <div className="space-y-3 mb-8">
              {[
                {
                  href: "mailto:johanalexanderriveravasquez@gmail.com",
                  icon: <Mail className="w-4 h-4 text-white" />,
                  grad: "from-violet-700 to-purple-800",
                  glow: "rgba(109,40,217,0.4)",
                  label: "Email",
                  sub: "johanalexanderriveravasquez@gmail.com",
                  ext: false,
                },
                {
                  href: "https://github.com/JARV005",
                  icon: <Github className="w-4 h-4 text-white" />,
                  grad: "from-gray-700 to-gray-800",
                  glow: "rgba(75,85,99,0.4)",
                  label: "GitHub",
                  sub: "github.com/JARV005",
                  ext: true,
                },
                {
                  href: "www.linkedin.com/in/jarv005",
                  icon: <Linkedin className="w-4 h-4 text-white" />,
                  grad: "from-blue-700 to-blue-800",
                  glow: "rgba(29,78,216,0.4)",
                  label: "LinkedIn",
                  sub: "Johan Alexander Rivera",
                  ext: true,
                },
              ].map(({ href, icon, grad, glow, label, sub, ext }) => (
                <a
                  key={label}
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-purple-800/25 hover:border-purple-600/45 hover:bg-purple-900/15 transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 transition-all`}
                    style={{ boxShadow: `0 0 0 ${glow}` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${glow}` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 ${glow}` }}
                  >
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-purple-100">{label}</div>
                    <div className="text-[0.65rem] text-purple-400 font-mono truncate">{sub}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:text-purple-300 group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              ))}
            </div>

            <div className="scouter-line mb-6" />

            <a
              href="mailto:johanalexanderriveravasquez@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-medium text-white transition-all"
              style={{
                background: "linear-gradient(135deg,#6d28d9,#7c3aed)",
                boxShadow: "0 0 0 1px rgba(139,92,246,0.3), 0 6px 24px rgba(109,40,217,0.35)",
              }}
            >
              <Mail className="w-4 h-4" /> Enviar Mensaje
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-10 px-6 border-t border-purple-900/20">
        <div className="scouter-line mb-8" />
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="gradient-text font-bold font-mono">{"<JR />"}</span>
          <span className="text-[0.65rem] text-purple-600/60 font-mono tracking-wider">© {new Date().getFullYear()} Johan Rivera · Built with precision.</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/JARV005" target="_blank" rel="noopener noreferrer"
              className="text-purple-600/60 hover:text-purple-400 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="www.linkedin.com/in/jarv005" target="_blank" rel="noopener noreferrer"
              className="text-purple-600/60 hover:text-purple-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
