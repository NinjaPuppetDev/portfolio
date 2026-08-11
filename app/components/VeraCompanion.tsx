// app/components/VeraCompanion.tsx
'use client'

import { useRef } from 'react'
import VeraGraph, { type VeraGraphHandle } from './VeraGraph'
import { useVeraStore } from '../store/veraStore'

const BASE_SIZE = 900

const PRESETS: Record<string, React.CSSProperties> = {
  hero: {
    top: '50%',
    right: '14%',
    width: 'clamp(380px, 34vw, 560px)',   // was: clamp(500px, 60vw, 880px)
    height: 'min(60vh, 560px)',           // was: min(80vh, 800px)
    transform: 'translateY(-50%)',
    opacity: 0.9,
  },
  dock: {
    top: '100px',
    right: '32px',
    width: '140px',
    height: '140px',
    transform: 'none',
    opacity: 0.85,
  },
  transition: {
    top: '50%',
    right: '50%',
    width: '200px',
    height: '200px',
    transform: 'translate(50%, -50%)',
    opacity: 1,
  },
  loading: {
    top: '50%',
    right: '50%',
    width: '160px',
    height: '160px',
    transform: 'translate(50%, -50%)',
    opacity: 1,
  },
}

const GRAPH_SCALE: Record<string, number> = {
  hero: 400 / BASE_SIZE,
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
  dock: DOCK_MASK,
  transition: DOCK_MASK,
  loading: DOCK_MASK,
}

export const graphRef = { current: null as VeraGraphHandle | null }

export default function VeraCompanion() {
  const mode = useVeraStore((s) => s.mode)
  const localRef = useRef<VeraGraphHandle>(null)

  const preset = PRESETS[mode] ?? PRESETS.hero
  const mask = MASKS[mode] ?? HERO_MASK
  const scale = GRAPH_SCALE[mode] ?? 1

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 20000, // clearly above IntroOverlay's 10000 — no tie possible
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: mode === 'loading' ? 'normal' : 'screen',
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