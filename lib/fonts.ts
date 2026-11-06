import { Archivo, Geist, Geist_Mono } from "next/font/google"

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-display-ff",
  display: "swap",
})

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans-ff",
  display: "swap",
})

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-ff",
  display: "swap",
})

export const fontVariables = [archivo.variable, geist.variable, geistMono.variable].join(" ")
