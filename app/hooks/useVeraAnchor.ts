// app/hooks/useVeraAnchor.ts
'use client'

import { useEffect, useRef } from 'react'
import { useVeraStore, type VeraMode } from '../store/veraStore'

export function useVeraAnchor(activeMode: VeraMode, inactiveMode?: VeraMode) {
  const ref = useRef<HTMLElement | null>(null)
  const setMode = useVeraStore((s) => s.setMode)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode(activeMode)
        } else if (inactiveMode) {
          setMode(inactiveMode)
        }
      },
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [activeMode, inactiveMode, setMode])

  return ref
}