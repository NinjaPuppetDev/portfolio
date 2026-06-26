'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GlitchWord from './GlitchWord'
import PromptBar from './PromptBar'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

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
        padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,240,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,74,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px', transform: 'translateY(var(--py, 0px))', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '-8%', transform: `translateY(calc(-50% + ${mounted ? '0px' : '24px'}))`, width: 'clamp(420px, 58vw, 820px)', opacity: mounted ? 1 : 0, transition: 'opacity 1.1s ease 0.5s, transform 1.1s ease 0.5s', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, var(--bg) 0%, transparent 28%), linear-gradient(to top, var(--bg) 0%, transparent 18%)`, zIndex: 1 }} />
        <Image src="/images/hero/finalmall.png" alt="Blender render" width={1456} height={816} priority style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', top: '2rem', right: 'clamp(1.5rem, 5vw, 4rem)', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 2 }}>
        Medellín, Colombia — {new Date().getFullYear()}
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Native anchor tag targeting #hero with explicit smooth scroll logic to eliminate dead clicks */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{ 
            display: 'inline-block', 
            textDecoration: 'none',
            marginBottom: '1.5rem' 
          }}
        >
          <p style={{ 
            fontFamily: 'var(--mono)', 
            fontSize: '0.7rem', 
            color: 'var(--accent)', 
            letterSpacing: '0.25em', 
            textTransform: 'uppercase',
            margin: 0,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            David Raigoza
          </p>
        </a>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '2.5rem' }}>
          {mounted ? <GlitchWord word="Constraint." /> : 'Constraint.'}<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{mounted ? <GlitchWord word="Architecture." /> : 'Architecture.'}</span><br />
          <span style={{ color: 'var(--muted)' }}>{mounted ? <GlitchWord word="Proof." /> : 'Proof.'}</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'var(--muted)', maxWidth: '42ch', lineHeight: 1.7, fontWeight: 300 }}>
            Every project starts with the same question: what does the existing system refuse to do? The answer becomes the work. Whether engineering a stainless steel microcasting pipeline that didn't exist, deploying trustless derivative settlement for climate risk, or building an AI agent that operates an interface instead of answering questions. The medium changes. The method doesn't.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Lápiz de Acero', '2013'],
              ['MA with Honours', '2016'],
              ['EAFIT · Universidad Nacional', ''],
            ].map(([label, year]) => (
              <div key={label} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)', minWidth: '0.6rem' }}>▸</span>
                <span>{label}</span>
                {year && <span style={{ color: 'var(--border-hi)' }}>{year}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <PromptBar mounted={mounted} />
    </section>
  )
}