'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useExperiment } from './ExperimentProvider'

export default function Nav() {
  const { variant } = useExperiment()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Explicit structural check for the light canvas route
  const isLightPage = pathname === '/work/marigold-bloom'

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

  // Dynamic token mapping based on route context
  const textPrimary = isLightPage ? '#1A1A1A' : '#FFFFFF'
  const textMuted = isLightPage ? 'rgba(0, 0, 0, 0.5)' : 'var(--muted)'

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
        
        // ── ADAPTIVE CHASSIS CONFIGURATION ──
        // Fill lifted from #0A0A0A (2pts off --bg #080808, i.e. invisible) to a real step up.
        backgroundColor: isLightPage ? 'rgba(247, 244, 238, 0.7)' : 'rgba(20, 20, 20, 0.92)',
        borderTop: isLightPage ? '1px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.16)',
        borderLeft: isLightPage ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.09)',
        borderRight: isLightPage ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid rgba(0, 0, 0, 0.6)',
        borderBottom: isLightPage ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.8)',
        borderRadius: '40px',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        
        boxShadow: isLightPage 
          ? `
            0 24px 48px -12px rgba(40, 30, 20, 0.08),
            0 8px 16px -4px rgba(40, 30, 20, 0.04),
            inset 0 1px 0px rgba(255, 255, 255, 0.8)
          `
          : `
            0 24px 48px -12px rgba(0, 0, 0, 0.85),
            0 8px 16px -4px rgba(0, 0, 0, 0.9),
            0 0 32px rgba(255, 255, 255, 0.03),
            inset 0 1px 1px rgba(255, 255, 255, 0.08)
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
            color: textPrimary,
            fontWeight: 700,
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}>
            DR
          </span>
          
          {!isMobile && (
            <span style={{ 
              fontFamily: 'var(--mono)', 
              fontSize: '0.55rem', 
              color: textMuted, 
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: isLightPage ? 0.6 : 0.3,
              borderLeft: isLightPage ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
              paddingLeft: '1.25rem',
              transition: 'all 0.3s ease',
            }}>
              SYS.OP // 2026
            </span>
          )}
        </div>

        {/* INTERACTION LINKS (MILLEDOUT TRAY) */}
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '1.25rem' : '0.5rem',
          position: isMobile ? 'static' : 'absolute',
          left: isMobile ? 'auto' : '50%',
          transform: isMobile ? 'none' : 'translateX(-50%)',
          backgroundColor: isLightPage ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.4)',
          border: isLightPage ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(0, 0, 0, 0.5)',
          borderBottomColor: isLightPage ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.03)',
          borderRightColor: isLightPage ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.02)',
          padding: isMobile ? '0' : '0.25rem',
          borderRadius: '20px',
          boxShadow: isLightPage ? 'inset 0 1px 2px rgba(0,0,0,0.04)' : 'inset 0 2px 4px rgba(0,0,0,0.6)',
          transition: 'all 0.3s ease',
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
                color: textMuted,
                padding: '0.35rem 1rem',
                borderRadius: '16px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = isLightPage ? '#000000' : '#FFFFFF'
                e.currentTarget.style.backgroundColor = isLightPage ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.boxShadow = isLightPage 
                  ? '0 1px 0 rgba(255,255,255,0.8), inset 0 1px 1px rgba(0,0,0,0.02)' 
                  : '0 1px 0 rgba(255,255,255,0.05), inset 0 1px 1px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = textMuted
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
            background: isLightPage 
              ? 'linear-gradient(180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.04) 100%)' 
              : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            borderTop: isLightPage ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderLeft: isLightPage ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
            borderRight: isLightPage ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid rgba(0, 0, 0, 0.3)',
            borderBottom: isLightPage ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
            padding: '0.45rem 1.1rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            fontWeight: 600,
            color: textPrimary,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: isLightPage 
              ? '0 4px 10px rgba(40, 30, 20, 0.03), inset 0 1px 0 rgba(255,255,255,0.9)' 
              : '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-0.5px)'
            e.currentTarget.style.background = isLightPage 
              ? 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.07) 100%)' 
              : 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)'
            e.currentTarget.style.boxShadow = isLightPage 
              ? '0 6px 14px rgba(40, 30, 20, 0.06), inset 0 1px 0 rgba(255,255,255,0.9)' 
              : '0 6px 14px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = isLightPage 
              ? 'linear-gradient(180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.04) 100%)' 
              : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
            e.currentTarget.style.boxShadow = isLightPage 
              ? '0 4px 10px rgba(40, 30, 20, 0.03), inset 0 1px 0 rgba(255,255,255,0.9)' 
              : '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)'
          }}
        >
          Launch Vera
        </button>
      </nav>
    </div>
  )
}