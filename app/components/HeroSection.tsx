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
  const [isHovered, setIsHovered] = useState(false)

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
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          heroRef.current.style.setProperty('--mx', String(nx))
          heroRef.current.style.setProperty('--my', String(ny))
        }
        raf = 0
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isMobile])

  const veraMask = isMobile
    ? 'radial-gradient(ellipse 62% 58% at 50% 45%, black 35%, transparent 88%)'
    : `radial-gradient(ellipse 78% 72% at 58% 42%, black 42%, transparent 92%),
       linear-gradient(to left, black 55%, transparent 100%),
       linear-gradient(to top, black 55%, transparent 100%),
       linear-gradient(to bottom, black 65%, transparent 100%)`

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
      {/* Premium Neutral Grid Overlay with top fade mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'translateY(var(--py, 0px))',
          pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 10%, black 25%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 10%, black 25%)',
        }}
      />

      {/* Balanced Editorial Portrait */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '30%' : '50%',
          right: isMobile ? '-20%' : '-5%',
          transform: isMobile
            ? 'translateY(-50%)'
            : `translateY(calc(-50% + ${mounted ? '0px' : '16px'})) translate(calc(var(--mx, 0) * 8px), calc(var(--my, 0) * 6px))`,
          width: isMobile ? '130%' : 'clamp(500px, 60vw, 880px)',
          maxHeight: isMobile ? 'none' : 'min(80vh, 800px)',
          opacity: isMobile ? 0.25 : mounted ? 0.9 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.3s ease-out',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
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
            WebkitMaskImage: veraMask,
            maskImage: veraMask,
            WebkitMaskComposite: isMobile ? 'source-over' : 'source-in, source-in, source-in',
            maskComposite: isMobile ? 'add' : 'intersect, intersect, intersect',
          }}
        >
          <source src="/images/vera/vera-hero.mov" type="video/mp4; codecs=hvc1" />
          <source src="/images/vera/vera-hero.webm" type="video/webm" />
          <source src="/images/vera/vera-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* TEXT & COPY CONTAINER */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1400px' }}>
        {/* Active System Indicator Trigger */}
        <button
          type="button"
          aria-label="Activate Vera AI Assistant"
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new CustomEvent('open-vera'))
            setTimeout(() => {
              const inputEl = document.querySelector('input') || document.querySelector('textarea')
              if (inputEl) inputEl.focus()
            }, 60)
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem 0',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '2rem',
            cursor: 'pointer',
            textAlign: 'left',
            outline: 'none',
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'inline-block',
              transform: isHovered ? 'scale(1.25)' : 'scale(1)',
              boxShadow: isHovered ? '0 0 8px var(--accent)' : 'none',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--text)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: 0,
              userSelect: 'none',
            }}
          >
            David Raigoza. Product Designer Engineer.
          </p>
        </button>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: isMobile ? '2.5rem' : 'clamp(3.5rem, 7vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: '2.5rem',
          }}
        >
          {mounted ? <GlitchWord word="Idea to Production." /> : 'Idea to Production.'}
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
            {mounted ? <GlitchWord word="One partner, zero handoffs." /> : 'One partner, zero handoffs.'}
          </span>
          <br />
          <span style={{ color: 'var(--muted)', opacity: 0.6 }}>
            {mounted ? <GlitchWord word="In days. Not months." /> : 'In days. Not months.'}
          </span>
        </h1>

        {/* Honest Value Proposition */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.15rem, 1.7vw, 1.4rem)',
            color: 'var(--text)',
            maxWidth: '52ch',
            lineHeight: 1.45,
            fontWeight: 400,
            marginBottom: '2.5rem',
          }}
        >
          Make entire products with a team of one. I take your ideas straight from Figma prototypes into production Next.js code. Over 15 years bridging product design and frontend architecture, giving you direct execution with zero handoff friction so you can focus on building your business.
        </p>

        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.7,
            marginBottom: '3rem',
          }}
        >
          Product design and working code. Moving at founder speed.
        </p>

        {/* Credentials & High-Impact Metrics */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4rem', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1000px' }}>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.9rem',
              color: 'var(--muted)',
              maxWidth: '52ch',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            <strong>Over 15 years spanning physical product design, 3D prototyping, and frontend code.</strong> I translate high-level strategy into rapid, high-converting interfaces and live software. You get direct access to a senior partner who builds real software instead of static mockups.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '0.25rem' }}>
            {[
              ['Communication Overhead', '0% (Direct Access)'],
              ['Delivery Speed', 'Days, Not Months'],
              ['Execution Model', 'Design + Frontend Code'],
            ].map(([label, value]) => (
              <div key={label} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', display: 'flex', gap: '2rem', opacity: 0.85 }}>
                <span>{label}</span>
                <span style={{ color: 'var(--accent)', marginLeft: 'auto' }}>{value}</span>
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