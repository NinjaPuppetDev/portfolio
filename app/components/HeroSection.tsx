'use client'

import { useEffect, useRef, useState } from 'react'
import GlitchWord from './GlitchWord'
import PromptBar from './PromptBar'
import { useBodySignals } from '../hooks/useBodySignals'

export default function HeroSection() {
  useBodySignals()
  const heroRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      heroRef.current.style.setProperty('--py', `${window.scrollY * 0.15}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let raf = 0
    const onMouseMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        if (heroRef.current) {
          const nx = (e.clientX / window.innerWidth) - 0.5
          const ny = (e.clientY / window.innerHeight) - 0.5
          heroRef.current.style.setProperty('--mx', String(nx))
          heroRef.current.style.setProperty('--my', String(ny))
        }
        raf = 0
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isMobile])

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: isMobile 
          ? '8rem 1.5rem 4rem 1.5rem' 
          : 'clamp(8rem, 12vw, 12rem) clamp(2rem, 6vw, 6rem) clamp(4rem, 8vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Premium Neutral Grid Overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, 
        backgroundSize: '100px 100px', 
        transform: 'translateY(var(--py, 0px))', 
        pointerEvents: 'none' 
      }} />
      
      {/* Balanced Editorial Portrait Masking */}
      <div style={{ 
        position: 'absolute', 
        top: isMobile ? '30%' : '50%', 
        right: isMobile ? '-20%' : '-5%', 
        transform: isMobile ? 'translateY(-50%)' : `translateY(calc(-50% + ${mounted ? '0px' : '16px'})) translate(calc(var(--mx, 0) * 8px), calc(var(--my, 0) * 6px))`, 
        width: isMobile ? '130%' : 'clamp(500px, 60vw, 880px)', 
        maxHeight: isMobile ? 'none' : 'min(80vh, 800px)',
        opacity: isMobile ? 0.25 : (mounted ? 0.9 : 0), 
        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.3s ease-out', 
        pointerEvents: 'none', 
        zIndex: 1,
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: isMobile
            ? `radial-gradient(circle at center, transparent 30%, var(--bg) 80%)`
            : `linear-gradient(to right, var(--bg) 5%, transparent 25%), linear-gradient(to top, var(--bg) 5%, transparent 20%)`, 
          zIndex: 2 
        }} />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
            mixBlendMode: 'screen',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
        >
          <source src="/images/vera/vera-hero.webm" type="video/webm" />
          <source src="/images/vera/vera-hero.mp4" type="video/mp4" />
        </video>
      </div>

{/* ── TEXT & COPY CONTAINER ────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1400px' }}>
        
        {/* Restrained Subtitle Indicator */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new CustomEvent('open-vera'))
            setTimeout(() => {
              const inputEl = document.querySelector('input') || document.querySelector('textarea')
              if (inputEl) inputEl.focus()
            }, 60)
          }}
          style={{ 
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            display: 'inline-block'
          }} />
          <p style={{ 
            fontFamily: 'var(--mono)', 
            fontSize: '0.65rem', 
            color: 'var(--text)', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0.8
          }}>
            David Raigoza — Operating System Active
          </p>
        </button>

        {/* Editorial Typography (Monochrome Alignment) */}
        <h1 style={{ 
          fontFamily: 'var(--serif)', 
          fontSize: isMobile ? '3rem' : 'clamp(4rem, 8.5vw, 8rem)', 
          fontWeight: 300, 
          lineHeight: 0.95, 
          letterSpacing: '-0.03em', 
          color: 'var(--text)', 
          marginBottom: '3rem' 
        }}>
          {mounted ? <GlitchWord word="Constraint." /> : 'Constraint.'}<br />
          <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
            {mounted ? <GlitchWord word="Architecture." /> : 'Architecture.'}
          </span><br />
          <span style={{ color: 'var(--muted)', opacity: 0.6 }}>
            {mounted ? <GlitchWord word="Proof." /> : 'Proof.'}
          </span>
        </h1>

        {/* Deliberate Positioning Statement */}
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: isMobile ? '1.15rem' : 'clamp(1.2rem, 1.8vw, 1.5rem)',
          color: 'var(--text)',
          maxWidth: '38ch',
          lineHeight: 1.4,
          fontWeight: 400,
          marginBottom: '3.5rem',
        }}>
          I design AI products, developer tools, and enterprise systems that make technical complexity feel intuitive.
        </p>
        
        {/* Balanced Footprint Columns */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4rem', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '900px' }}>
          <p style={{ 
            fontFamily: 'var(--sans)', 
            fontSize: '0.9rem', 
            color: 'var(--muted)', 
            maxWidth: '48ch', 
            lineHeight: 1.65, 
            fontWeight: 300 
          }}>
            Every project begins where existing systems break down. I identify the constraint, architect the solution, and validate it through shipped products. From AI interfaces and real-time dashboards to developer platforms, the medium changes. The method remains: turning complexity into clarity.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '0.25rem' }}>
            {[
              ['Lápiz de Acero', '2013'],
              ['MA with Honours', '2016'],
              ['EAFIT · Universidad Nacional', ''],
            ].map(([label, year]) => (
              <div key={label} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', display: 'flex', gap: '1.5rem', opacity: 0.75 }}>
                <span>{label}</span>
                {year && <span style={{ color: 'var(--muted)', opacity: 0.5, marginLeft: 'auto' }}>{year}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Action Dock */}
      <div style={{ marginTop: '4rem', width: '100%', zIndex: 4, maxWidth: '600px' }}>
        <PromptBar mounted={mounted} />
      </div>
    </section>
  )
}