// app/components/IntroOverlay.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useVeraStore } from '../store/veraStore'

const MIN_DURATION_MS = 1200
const FADE_MS = 600

export default function IntroOverlay() {
  const [mounted, setMounted] = useState(false)
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(true)
  const setMode = useVeraStore((s) => s.setMode)
  const setLocked = useVeraStore((s) => s.setLocked)
  const hasRun = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (hasRun.current) return
    hasRun.current = true

    setMode('loading')
    setLocked(true)

    const start = performance.now()
    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_DURATION_MS - elapsed)
      setTimeout(() => {
        setLocked(false)
        setFading(true)
        setTimeout(() => {
          setVisible(false)
        }, FADE_MS)
      }, wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
      const fallbackTimer = setTimeout(finish, 2500)
      return () => {
        window.removeEventListener('load', finish)
        clearTimeout(fallbackTimer)
      }
    }
  }, [setMode, setLocked])

  if (!mounted || !visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    />
  )
}