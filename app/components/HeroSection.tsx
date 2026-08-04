'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import GlitchWord from './GlitchWord'
import PromptBar from './PromptBar'
import VeraPointCloud from './VeraPointCloud'
import { useBodySignals } from '../hooks/useBodySignals'

export default function HeroSection() {
  useBodySignals()
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)

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
          minHeight: isMobile ? '100dvh' : 'calc(100dvh - 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: isMobile
            ? '7rem 1.5rem 2rem 1.5rem'
            : 'clamp(5rem, 8vh, 7rem) clamp(2rem, 6vw, 6rem) clamp(3.5rem, 6vh, 5.5rem)',
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

      {/* Interactive Point Cloud */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '30%' : '50%',
          right: isMobile ? '-20%' : '-5%',
          transform: isMobile
            ? 'translateY(-50%)'
            : `translateY(calc(-50% + ${mounted ? '0px' : '16px'})) translate(calc(var(--mx, 0) * 8px), calc(var(--my, 0) * 6px))`,
          width: isMobile ? '130%' : 'clamp(500px, 60vw, 880px)',
          height: isMobile ? '60vh' : 'min(80vh, 800px)',
          opacity: isMobile ? 0.25 : mounted ? 0.9 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.3s ease-out',
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'screen',
          WebkitMaskImage: veraMask,
          maskImage: veraMask,
          WebkitMaskComposite: isMobile ? 'source-over' : 'source-in, source-in, source-in',
          maskComposite: isMobile ? 'add' : 'intersect, intersect, intersect',
        }}
      >
        {mounted && <VeraPointCloud />}
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
            marginBottom: '1.5rem',
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
            marginBottom: '1.75rem',
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

        {/* Value Proposition */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.15rem, 1.7vw, 1.4rem)',
            color: 'var(--text)',
            maxWidth: '52ch',
            lineHeight: 1.45,
            fontWeight: 400,
            margin: 0,
          }}
        >
          Every product begins as a conversation. Somewhere between the first sketch and the first customer, that conversation gets translated into specifications, tickets, meetings, revisions, and handoffs. Every translation changes the idea. I built my practice to remove those translations.
        </p>
      </div>

      {/* Structured Action Dock & CTA Container */}
      <div style={{ marginTop: '1.5rem', width: '100%', zIndex: 4, maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <PromptBar mounted={mounted} />

        {/* Work With Me Direct CTA Link */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="/work-with-me"
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '20px',
              fontFamily: 'var(--mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--text)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              borderRight: '1px solid rgba(0, 0, 0, 0.4)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.6)',
              boxShadow: isCtaHovered
                ? '0 6px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              transform: isCtaHovered ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span>Work With Me</span>
            <span
              aria-hidden="true"
              style={{
                transform: isCtaHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}