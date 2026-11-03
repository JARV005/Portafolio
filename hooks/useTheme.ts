"use client"

import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined
    if (current === "dark" || current === "light") setThemeState(current)
  }, [])

  function setTheme(next: Theme) {
    document.documentElement.setAttribute("data-theme", next)
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      /* storage disabled, ignore */
    }
    setThemeState(next)
  }

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return { theme, setTheme, toggle }
}
