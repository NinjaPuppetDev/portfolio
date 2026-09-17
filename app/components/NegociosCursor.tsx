'use client'

import { useEffect, useRef, useState } from 'react'

export default function NegociosCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    setIsTouch(coarsePointer)

    if (!coarsePointer) {
      document.body.classList.add('has-negocios-cursor')
    }

    return () => {
      document.body.classList.remove('has-negocios-cursor')
    }
  }, [])

  useEffect(() => {
    if (!mounted || isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    let hoveringInteractive = false
    let clicking = false

    const updateTransform = (x: number, y: number) => {
      let scale = 1

      if (clicking) {
        scale = 0.94
      } else if (hoveringInteractive) {
        scale = 1.06
      }

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, target } = event

      cursor.style.opacity = '1'

      const element = target as Element | null

      const interactive = Boolean(
        element?.closest(
          'a, button, input, select, textarea, [role="button"], [data-cursor="pointer"]'
        )
      )

      if (interactive !== hoveringInteractive) {
        hoveringInteractive = interactive
      }

      updateTransform(clientX, clientY)
    }

    const handleMouseDown = () => {
      clicking = true

      const rect = cursor.getBoundingClientRect()

      // Preserve the current cursor position while changing only the scale.
      const currentX = rect.left
      const currentY = rect.top

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(0.94)`
    }

    const handleMouseUp = () => {
      clicking = false
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mounted, isTouch])

  if (!mounted || isTouch) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      id="negocios-custom-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 9999999,
        opacity: 0,
        willChange: 'transform, opacity',
        transformOrigin: '2px 2px',
        transition:
          'opacity 120ms ease, transform 100ms ease-out',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cursors/negocios-cursor.svg"
        width="32"
        height="32"
        alt=""
        draggable={false}
        style={{
          display: 'block',
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  )
}