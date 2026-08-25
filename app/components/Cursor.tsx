'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let isVisible = false
    let raf: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '0.4'
      }

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`

      const target = e.target as Element | null
      const isInteractive = !!target?.closest('a, button, [data-cursor], input, textarea')

      if (isInteractive) {
        dot.style.width   = '0px'
        dot.style.height  = '0px'
        ring.style.width  = '48px'
        ring.style.height = '48px'
        ring.style.opacity = '0.8'
      } else {
        dot.style.width   = '8px'
        dot.style.height  = '8px'
        ring.style.width  = '32px'
        ring.style.height = '32px'
        ring.style.opacity = '0.4'
      }
    }

    const onLeaveWindow = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const tick = () => {
      rx = lerp(rx, mx, 0.15)
      ry = lerp(ry, my, 0.15)
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeaveWindow)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeaveWindow)
      cancelAnimationFrame(raf)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <div ref={dotRef}  className="cursor" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  )
}