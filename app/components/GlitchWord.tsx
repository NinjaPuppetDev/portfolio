'use client'

import { useEffect, useState } from 'react'

function useGlitch(text: string, active: boolean) {
  const chars = '!<>-_\\/[]{}=+*^?#'
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let iter = 0
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) =>
          i < iter ? text[i] : char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      )
      iter += 0.4
      if (iter >= text.length) clearInterval(interval)
    }, 35)
    return () => clearInterval(interval)
  }, [active, text])

  return display
}

export default function GlitchWord({ word }: { word: string }) {
  const [active, setActive] = useState(false)
  const display = useGlitch(word, active)

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 400)
    return () => clearTimeout(t)
  }, [])

  return <>{display}</>
}