// app/components/VeraCompanion.tsx
'use client'

import { useRef } from 'react'
import VeraGraph, { type VeraGraphHandle } from './VeraGraph'
import { useVeraStore } from '../store/veraStore'

const PRESETS: Record<string, React.CSSProperties> = {
  hero: {
    top: '50%',
    right: '-5%',
    width: 'clamp(500px, 60vw, 880px)',
    height: 'min(80vh, 800px)',
    transform: 'translateY(-50%)',
    opacity: 0.9,
  },
  dock: {
    top: '24px',
    right: '24px',
    width: '120px',
    height: '120px',
    transform: 'none',
    opacity: 1,
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

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 50,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        WebkitMaskImage: mask,
        maskImage: mask,
        transition: 'top 0.6s cubic-bezier(0.16,1,0.3,1), right 0.6s cubic-bezier(0.16,1,0.3,1), width 0.6s cubic-bezier(0.16,1,0.3,1), height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
        ...preset,
      }}
    >
      <VeraGraph ref={localRef} />
    </div>
  )
}