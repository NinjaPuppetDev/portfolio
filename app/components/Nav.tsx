'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
      padding: '1.25rem 2.5rem',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
      }}>
        DR
      </span>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {['work', 'about', 'contact'].map(item => (
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
    </nav>
  )
}