// app/components/IntroOverlay.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useVeraStore } from '../store/veraStore'

const MIN_DURATION_MS = 1200
const FADE_MS = 600

export default function IntroOverlay() {
  const [fading, setFading] = useState(false)
  const [mounted, setMounted] = useState(true)
  const setMode = useVeraStore((s) => s.setMode)
  const setLocked = useVeraStore((s) => s.setLocked)
  const hasRun = useRef(false)

  console.log('[IntroOverlay] render — mounted:', mounted, 'fading:', fading)

  useEffect(() => {
    if (hasRun.current) {
      console.log('[IntroOverlay] effect re-fired, skipping (StrictMode double-invoke guard)')
      return
    }
    hasRun.current = true

    console.log('[IntroOverlay] effect running, readyState:', document.readyState)
    setMode('loading')
    setLocked(true)

    const start = performance.now()
    const finish = () => {
      console.log('[IntroOverlay] finish() called')
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_DURATION_MS - elapsed)
      console.log('[IntroOverlay] waiting', wait, 'ms before fade')
      setTimeout(() => {
        console.log('[IntroOverlay] unlocking + fading')
        setLocked(false)
        setFading(true)
        setTimeout(() => {
          console.log('[IntroOverlay] unmounting')
          setMounted(false)
        }, FADE_MS)
      }, wait)
    }

    if (document.readyState === 'complete') {
      console.log('[IntroOverlay] already complete, calling finish() immediately')
      finish()
    } else {
      console.log('[IntroOverlay] waiting for load event')
      window.addEventListener('load', finish)
    }
  }, [setMode, setLocked])

  if (!mounted) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#000000',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    />
  )
}