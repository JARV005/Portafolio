"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 z-50 w-full bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            {"<JR />"}
          </div>

          <div className="hidden md:flex space-x-8">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm hover:text-orange-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all" />
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-2 hover:bg-blue-500/10 rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-orange-500/5 via-blue-500/10 to-orange-500/5 rounded-full blur-3xl animate-pulse-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 bg-clip-text text-transparent animate-gradient bg-300%">
            Johan Rivera
          </h1>

          <p className="text-2xl md:text-3xl text-blue-300 font-light mt-6 mb-6">
            Full Stack Developer · Software Engineer · Team Leader
          </p>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building scalable digital solutions with discipline, creativity, and continuous evolution.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-lg shadow-lg hover:shadow-orange-500/40"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-blue-500 text-blue-400 px-8 py-6 text-lg"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 scroll-animate opacity-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <Card className="bg-[#0f0f1a] border-blue-500/20">
            <CardContent className="p-10 text-gray-300 space-y-6 text-lg leading-relaxed">
              <p>
                Full Stack Developer with a strong foundation in web and software development, experienced in building
                scalable applications, managing databases, and automating processes using modern technologies.
              </p>
              <p>
                I combine technical leadership, teamwork, and problem-solving skills to deliver efficient and
                maintainable solutions. Passionate about clean architecture, system optimization, and transforming ideas
                into real-world digital products.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-32 px-6 scroll-animate opacity-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",
                skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Pinia", "Vite"],
              },
              {
                title: "Backend",
                skills: ["C#", "ASP.NET", "EF Core", "Python", "Node.js"],
              },
              {
                title: "DevOps & Tools",
                skills: [
                  "Docker",
                  "CI/CD",
                  "Git & GitHub",
                  "n8n Automation",
                  "Grafana",
                  "Prometheus",
                  "Render",
                  "Netlify",
                ],
              },
            ].map((group, i) => (
              <Card key={i} className="bg-[#0f0f1a] border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-orange-400">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-blue-500/10 border border-blue-500/30 text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-32 px-6 scroll-animate opacity-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Experience & Leadership
          </h2>

          <Card className="bg-[#0f0f1a] border-blue-500/20">
            <CardHeader>
              <CardTitle>Team Leader</CardTitle>
              <CardDescription className="text-orange-400">
                Riwi · November 2025 – Present
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              Leading and mentoring software development teams, guiding technical and professional growth. Responsible
              for project coordination, technical decision-making, and implementation of best practices in software
              engineering.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 px-6 scroll-animate opacity-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AutoSpace – Parking Management System",
                description:
                  "Web-based system for vehicle entry control, subscriptions, and parking management.",
                tech: ["C#", "ASP.NET", "EF Core", "Vue.js", "Pinia", "Vite", "Render", "Netlify"],
                link: "https://autospace-frontend.netlify.app/",
              },
              {
                title: "CeleneManager",
                description:
                  "Web platform focused on structured database management and process automation.",
                tech: ["C#", "ASP.NET", "EF Core", "Vue.js", "Docker", "n8n"],
                link: "https://hubble.andrescortes.dev/",
              },
              {
                title: "Human Life Detection Rover",
                description:
                  "Robotic vehicle prototype designed to detect human life in fire emergency environments.",
                tech: ["Arduino", "Python", "Raspberry Pi"],
                link: "#",
              },
            ].map((project, i) => (
              <Card key={i} className="bg-[#0f0f1a] border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {project.title}
                    <a href={project.link} target="_blank">
                      <ExternalLink className="w-5 h-5 text-orange-400" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-sm rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 scroll-animate opacity-0">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Let’s Connect
          </h2>

          <p className="text-xl text-gray-400 mb-12">
            Open to new projects, collaborations, and opportunities.
          </p>

          <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-lg">
            <a href="mailto:johanalexanderriveravasquez@gmail.com">
              <Mail className="w-5 h-5 mr-2" /> Send Email
            </a>
          </Button>

          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com/JARV005"><Github /></a>
            <a href="https://www.linkedin.com/in/johan-alexander-rivera-vasquez-a50494293"><Linkedin /></a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 border-t border-blue-500/10">
        © {new Date().getFullYear()} Johan Rivera. Built with discipline and continuous evolution.
      </footer>
    </div>
  )
}
