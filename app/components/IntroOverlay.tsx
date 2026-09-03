// app/components/IntroOverlay.tsx
'use client'

import { useEffect, useState } from 'react'
import { useVeraStore } from '../store/veraStore'

const MIN_DURATION_MS = 1200
const FADE_MS = 600

export default function IntroOverlay() {
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(true)
  const setMode = useVeraStore((s) => s.setMode)
  const setLocked = useVeraStore((s) => s.setLocked)

  useEffect(() => {
    setMode('loading')
    setLocked(true)

    const start = performance.now()
    let completionStarted = false
    let unlockTimer: ReturnType<typeof setTimeout> | undefined
    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    const finish = () => {
      if (completionStarted) return
      completionStarted = true

      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_DURATION_MS - elapsed)
      unlockTimer = setTimeout(() => {
        setLocked(false)
        setFading(true)
        fadeTimer = setTimeout(() => {
          setVisible(false)
        }, FADE_MS)
      }, wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
      fallbackTimer = setTimeout(finish, 2500)
    }

    return () => {
      window.removeEventListener('load', finish)
      if (fallbackTimer) clearTimeout(fallbackTimer)
      if (unlockTimer) clearTimeout(unlockTimer)
      if (fadeTimer) clearTimeout(fadeTimer)
    }
  }, [setMode, setLocked])

  if (!visible) return null

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