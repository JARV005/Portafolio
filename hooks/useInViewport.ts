"use client"

import { useEffect, useRef, useState } from "react"

export function useInViewport<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      options,
    )
    io.observe(el)
    return () => io.disconnect()
  }, [options?.rootMargin, options?.threshold, options?.root])

  return { ref, inView }
}
