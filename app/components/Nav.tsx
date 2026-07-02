'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check mobile breakpoint on mount
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      media.removeEventListener('change', listener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Brand Identity Group */}
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
        
        {/* Hide location tracking on mobile nav to protect spacing layout links */}
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

      {/* Navigation Actions + Agent Hook */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
        
        {/* The Action Button sits seamlessly inside the bar flow */}
        <button
  onClick={() => {
    // Fire a global event that any component on the page can listen for
    window.dispatchEvent(new CustomEvent('open-vera'))
    
    // Fallback: Still focus the text field immediately for a clean UX pipeline
    setTimeout(() => {
      const inputEl = document.querySelector('input') || document.querySelector('textarea')
      if (inputEl) inputEl.focus()
    }, 50)
  }}
  style={{
    background: 'transparent',
    border: '1px solid var(--accent)',
    borderRadius: '2px',
    padding: '0.3rem 0.6rem',
    fontFamily: 'var(--mono)',
    fontSize: '0.6rem',
    fontWeight: 500,
    color: 'var(--accent)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    backgroundColor: 'rgba(200, 240, 74, 0.02)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--accent)'
    e.currentTarget.style.color = 'var(--bg)'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(200, 240, 74, 0.02)'
    e.currentTarget.style.color = 'var(--accent)'
  }}
>
  ✦ Launch Vera
</button>

        {/* Standard Anchor Links */}
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
                color: 'var(--muted)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}