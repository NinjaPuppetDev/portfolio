'use client'

import { useEffect, useState } from 'react'
import { useExperiment } from './ExperimentProvider' // ◄── Pulls the cookie variant ('A' or 'B')

export default function Nav() {
  const { variant } = useExperiment()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 1. Mobile responsive check
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)

    // 2. Scroll depth check
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      media.removeEventListener('change', listener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // ─── A/B VARIANT CONDITIONS ───────────────────────────────────────────
  const isVariantA = variant === 'A' // Agentic Focus
  const isVariantB = variant === 'B' // Contextual High-Contrast Nav Focus

  // Variant B is permanently solid/blurred from line 1; Variant A waits for scroll.
  const showActiveState = scrolled || isVariantB

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '1rem 1.25rem' : '1.25rem 2.5rem',
      
      // Dynamic styles shifting based on variant allocation
      borderBottom: showActiveState 
        ? (isVariantB ? '1px solid var(--accent)' : '1px solid var(--border)') 
        : '1px solid transparent',
      background: showActiveState ? 'rgba(8,8,8,0.95)' : 'transparent',
      backdropFilter: showActiveState ? 'blur(16px)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      
      {/* BRAND IDENTITY */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
        }}>
          DR
        </span>
        
        {!isMobile && (
          <span style={{ 
            fontFamily: 'var(--mono)', 
            fontSize: '0.65rem', 
            color: 'var(--muted)', 
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Medellín, CO — {new Date().getFullYear()}
          </span>
        )}
      </div>

      {/* INTERACTIONS AND LINKS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
        
        {/* Dynamic Launch Button: Accentuated heavily in Variant A to pull chat engagement */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-vera'))
            setTimeout(() => {
              const inputEl = document.querySelector('input') || document.querySelector('textarea')
              if (inputEl) inputEl.focus()
            }, 50)
          }}
          style={{
            background: isVariantA ? 'var(--accent)' : 'transparent',
            border: '1px solid var(--accent)',
            borderRadius: '2px',
            padding: '0.35rem 0.75rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            fontWeight: 600,
            color: isVariantA ? 'var(--bg)' : 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: isVariantA ? '0 0 15px rgba(200, 240, 74, 0.2)' : 'none',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isVariantA ? 'var(--text)' : 'var(--accent)'
            e.currentTarget.style.color = 'var(--bg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isVariantA ? 'var(--accent)' : 'rgba(200, 240, 74, 0.02)'
            e.currentTarget.style.color = isVariantA ? 'var(--bg)' : 'var(--accent)'
          }}
        >
          ✦ Launch Vera
        </button>

        {/* Anchor Navigation Links: Emphasized clearly in Variant B for explicit routes */}
        <div style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem' }}>
          {['work', 'about'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                
                // Variant B targets look prominent immediately; Variant A keeps them muted
                color: isVariantB ? 'var(--text)' : 'var(--muted)',
                fontWeight: isVariantB ? 600 : 400,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = isVariantB ? 'var(--text)' : 'var(--muted)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}