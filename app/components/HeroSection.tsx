'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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
      heroRef.current.style.setProperty('--py', `${window.scrollY * 0.3}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          ? '6rem 1.5rem 3rem 1.5rem' 
          : 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Grid Overlay Background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,240,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,74,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px', transform: 'translateY(var(--py, 0px))', pointerEvents: 'none' }} />
      
      {/* Immersive Background Image */}
      <div style={{ 
        position: 'absolute', 
        top: isMobile ? '35%' : '50%', 
        right: isMobile ? '-20%' : '-8%', 
        transform: isMobile ? 'translateY(-50%)' : `translateY(calc(-50% + ${mounted ? '0px' : '24px'}))`, 
        width: isMobile ? '120%' : 'clamp(420px, 58vw, 820px)', 
        opacity: isMobile ? 0.35 : (mounted ? 1 : 0), 
        transition: 'opacity 1.1s ease 0.5s, transform 1.1s ease 0.5s', 
        pointerEvents: 'none', 
        zIndex: 0 
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: isMobile
            ? `radial-gradient(circle at center, transparent 10%, var(--bg) 75%), linear-gradient(to top, var(--bg) 5%, transparent 40%)`
            : `linear-gradient(to right, var(--bg) 0%, transparent 28%), linear-gradient(to top, var(--bg) 0%, transparent 18%)`, 
          zIndex: 1 
        }} />
        <Image src="/images/hero/finalmall.png" alt="Blender render" width={1456} height={816} priority style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
      </div>

      {/* Location Stamp */}
      <div style={{ 
        position: 'absolute', 
        top: '2rem', 
        right: 'clamp(1.5rem, 5vw, 4rem)', 
        fontFamily: 'var(--mono)', 
        fontSize: '0.65rem', 
        color: 'var(--muted)', 
        letterSpacing: '0.15em', 
        textTransform: 'uppercase', 
        zIndex: 2,
      }}>
      </div>

      {/* ── TEXT & COPY CONTAINER ────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new CustomEvent('open-vera'))
            
            setTimeout(() => {
              const inputEl = document.querySelector('input') || document.querySelector('textarea')
              if (inputEl) inputEl.focus()
            }, 60)
          }}
          style={{ 
            display: 'inline-block', 
            textDecoration: 'none',
            marginBottom: '1.5rem',
            cursor: 'pointer' 
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <p style={{ 
            fontFamily: 'var(--mono)', 
            fontSize: '0.7rem', 
            color: 'var(--accent)', 
            letterSpacing: '0.25em', 
            textTransform: 'uppercase',
            margin: 0,
          }}
          >
            David Raigoza ✦ [System Active — Click to Initialize Agent]
          </p>
        </a>

        {/* Dynamic header scaling */}
        <h1 style={{ 
          fontFamily: 'var(--serif)', 
          fontSize: isMobile ? '2.8rem' : 'clamp(3.5rem, 10vw, 9rem)', 
          fontWeight: 300, 
          lineHeight: isMobile ? 1.05 : 0.92, 
          letterSpacing: '-0.02em', 
          color: isMobile ? '#FFFFFF' : 'var(--text)', 
          marginBottom: '2rem' 
        }}>
          {mounted ? <GlitchWord word="Constraint." /> : 'Constraint.'}<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{mounted ? <GlitchWord word="Architecture." /> : 'Architecture.'}</span><br />
          <span style={{ color: isMobile ? '#A3A3A3' : 'var(--muted)' }}>{mounted ? <GlitchWord word="Proof." /> : 'Proof.'}</span>
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
          <p style={{ 
            fontFamily: 'var(--sans)', 
            fontSize: isMobile ? '0.92rem' : 'clamp(0.875rem, 1.5vw, 1rem)', 
            color: isMobile ? '#E5E5E5' : 'var(--muted)', 
            maxWidth: '44ch', 
            lineHeight: 1.6, 
            fontWeight: 300 
          }}>
            Every project begins where traditional systems fail: what does the existing infrastructure refuse to do? The answer becomes the work. Whether abstracting away the friction of on-chain protocols to enable mass onboarding, engineering sub-100ms dashboards on relational data pipelines, or designing an agentic interface that translates live user telemetry into natural language. The medium changes. The method remains: storytelling through high-agency engineering.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Lápiz de Acero', '2013'],
              ['MA with Honours', '2016'],
              ['EAFIT · Universidad Nacional', ''],
            ].map(([label, year]) => (
              <div key={label} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: isMobile ? '#A3A3A3' : 'var(--muted)', letterSpacing: '0.1em', display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)', minWidth: '0.6rem' }}>▸</span>
                <span>{label}</span>
                {year && <span style={{ color: 'var(--border-hi)' }}>{year}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prompt Action Input Deck */}
      <div style={{ marginTop: '2.5rem', width: '100%', zIndex: 3 }}>
        <PromptBar mounted={mounted} />
      </div>
    </section>
  )
}