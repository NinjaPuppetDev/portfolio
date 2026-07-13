'use client'

import { useEffect, useState } from 'react'
import { useExperiment } from './ExperimentProvider'

export default function Nav() {
  const { variant } = useExperiment()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)

    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      media.removeEventListener('change', listener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const isVariantB = variant === 'B'
  const showActiveState = scrolled || isVariantB

  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? '0.5rem' : '1.75rem',
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      padding: isMobile ? '0 1rem' : '0 2rem',
      pointerEvents: 'none'
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: isMobile ? '100%' : '1100px',
        padding: isMobile ? '0.75rem 1.25rem' : '0.7rem 1.75rem',
        pointerEvents: 'all',
        
        // ── EXAGGERATED PREMIUM NEUMORPHIC CHASSIS ──
        // Blends a rich dark core with a crisp highlight rim and massive structural ambient absorption drop-shadows
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)', // Sharp light-facing bevel
        borderLeft: '1px solid rgba(255, 255, 255, 0.07)',
        borderRight: '1px solid rgba(0, 0, 0, 0.6)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.8)', // Shadow-facing baseline bleed
        borderRadius: '40px',
        backdropFilter: 'blur(30px)',
        
        // Complex stacked shadows: 1. Soft widespread absorption, 2. Hard physical occlusion, 3. Crisp inner shadow depth
        boxShadow: `
          0 24px 48px -12px rgba(0, 0, 0, 0.85),
          0 8px 16px -4px rgba(0, 0, 0, 0.9),
          inset 0 1px 1px rgba(255, 255, 255, 0.05)
        `,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: showActiveState ? 'translateY(0)' : 'translateY(-4px)',
      }}>
        
        {/* IDENTITY BLOCK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            DR
          </span>
          
          {!isMobile && (
            <span style={{ 
              fontFamily: 'var(--mono)', 
              fontSize: '0.55rem', 
              color: 'var(--muted)', 
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.3,
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              paddingLeft: '1.25rem'
            }}>
              SYS.OP // 2026
            </span>
          )}
        </div>

        {/* INTERACTION LINKS (MILLEDOUT SLAG CONTAINER) */}
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '1.25rem' : '0.5rem',
          position: isMobile ? 'static' : 'absolute',
          left: isMobile ? 'auto' : '50%',
          transform: isMobile ? 'none' : 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          borderBottomColor: 'rgba(255, 255, 255, 0.03)',
          borderRightColor: 'rgba(255, 255, 255, 0.02)',
          padding: isMobile ? '0' : '0.25rem',
          borderRadius: '20px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)'
        }}>
          {['work', 'about'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                padding: '0.35rem 1rem',
                borderRadius: '16px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05), inset 0 1px 1px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)'
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* NEUMORPHIC BUTTON EXTENSION */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-vera'))
            setTimeout(() => {
              const inputEl = document.querySelector('input') || document.querySelector('textarea')
              if (inputEl) inputEl.focus()
            }, 50)
          }}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
            borderRight: '1px solid rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
            padding: '0.45rem 1.1rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-0.5px)'
            e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)'
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)'
          }}
        >
          Launch Vera
        </button>
      </nav>
    </div>
  )
}