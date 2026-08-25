// app/components/VeraCompanion.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import VeraGraph, { type VeraGraphHandle } from './VeraGraph'
import { useVeraStore } from '../store/veraStore'

const BASE_SIZE = 900

const PRESETS: Record<string, React.CSSProperties> = {
  hero: {
    top: '50%',
    right: '25%',
    width: 'clamp(280px, 22vw, 380px)',
    height: 'min(40dvh, 380px)',
    transform: 'translateY(-50%)',
    opacity: 0.9,
  },
  heroMobile: {
    top: '12%',              // sits above the text block instead of behind it
    right: '50%',
    width: '150px',
    height: '150px',
    transform: 'translateX(50%)',
    opacity: 0.7,
  },
  dock: { /* unchanged */
    top: '100px',
    right: '32px',
    width: '140px',
    height: '140px',
    transform: 'none',
    opacity: 0.85,
  },
  transition: { /* unchanged */
    top: '50%',
    right: '50%',
    width: '200px',
    height: '200px',
    transform: 'translate(50%, -50%)',
    opacity: 1,
  },
  loading: { /* unchanged */
    top: '50%',
    right: '50%',
    width: '160px',
    height: '160px',
    transform: 'translate(50%, -50%)',
    opacity: 1,
  },
}

const GRAPH_SCALE: Record<string, number> = {
  hero: 380 / BASE_SIZE,
  heroMobile: 150 / BASE_SIZE,
  dock: 140 / BASE_SIZE,
  transition: 200 / BASE_SIZE,
  loading: 160 / BASE_SIZE,
}

const HERO_MASK = `radial-gradient(ellipse 78% 72% at 58% 42%, black 42%, transparent 92%),
  linear-gradient(to left, black 55%, transparent 100%),
  linear-gradient(to top, black 55%, transparent 100%),
  linear-gradient(to bottom, black 65%, transparent 100%)`

const DOCK_MASK = 'radial-gradient(ellipse 65% 65% at 50% 50%, black 60%, transparent 95%)'

const MASKS: Record<string, string> = {
  hero: HERO_MASK,
  heroMobile: DOCK_MASK,
  dock: DOCK_MASK,
  transition: DOCK_MASK,
  loading: DOCK_MASK,
}

export const graphRef = { current: null as VeraGraphHandle | null }

export default function VeraCompanion() {
  const mode = useVeraStore((s) => s.mode)
  const localRef = useRef<VeraGraphHandle>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  if (!mounted) return null

  const effectiveMode = mode === 'hero' && isMobile ? 'heroMobile' : mode

  const preset = PRESETS[effectiveMode] ?? PRESETS.hero
  const mask = MASKS[effectiveMode] ?? HERO_MASK
  const scale = GRAPH_SCALE[effectiveMode] ?? 1

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: effectiveMode === 'loading' ? 10000 : 25,
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: effectiveMode === 'loading' ? 'normal' : 'screen',
        WebkitMaskImage: mask,
        maskImage: mask,
        transition:
          'top 0.6s cubic-bezier(0.16,1,0.3,1), right 0.6s cubic-bezier(0.16,1,0.3,1), width 0.6s cubic-bezier(0.16,1,0.3,1), height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
        ...preset,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${BASE_SIZE}px`,
          height: `${BASE_SIZE}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <VeraGraph ref={localRef} />
      </div>
    </div>
  )
}