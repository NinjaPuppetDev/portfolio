'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(tick)
    }

    const isInteractive = (e: MouseEvent) =>
      !!(e.target as Element)?.closest('a, button, [data-cursor]')

    const onEnter = (e: MouseEvent) => {
      if (!isInteractive(e)) return
      dot.style.width   = '0px'
      dot.style.height  = '0px'
      ring.style.width  = '48px'
      ring.style.height = '48px'
      ring.style.opacity = '0.8'
    }

    const onLeave = (e: MouseEvent) => {
      if (!isInteractive(e)) return
      dot.style.width   = '8px'
      dot.style.height  = '8px'
      ring.style.width  = '32px'
      ring.style.height = '32px'
      ring.style.opacity = '0.4'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout',  onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout',  onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}