'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VeraButton from './VeraButton'

interface NavItem {
  label: string
  href: string
}

interface Theme {
  isLightPage: boolean
  textPrimary: string
  textMuted: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
  navItems: NavItem[]
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, theme, navItems, pathname }: MobileMenuProps) {
  const { isLightPage, textPrimary } = theme

  // Escape to close + lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    onClose()
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.replace('/#', '')
      const element = document.getElementById(targetId)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <div
      aria-hidden={!isOpen}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: isOpen ? 'all' : 'none',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backgroundColor: isLightPage ? 'rgba(20, 18, 14, 0.35)' : 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          width: 'min(320px, 82vw)',
          height: '100%',
          backgroundColor: isLightPage ? '#F7F4EE' : '#141414',
          borderLeft: isLightPage ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button
            aria-label="Close navigation menu"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: textPrimary,
              fontFamily: 'var(--mono)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              padding: '0.5rem',
              margin: '-0.5rem',
            }}
          >
            ✕
          </button>
        </div>

        {/* PRIMARY NAVIGATION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '1rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: textPrimary,
                textDecoration: 'none',
                padding: '0.85rem 0.25rem',
                borderBottom: isLightPage ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* SECONDARY / PRODUCT ACTION — visually separated */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: isLightPage ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
        }}>
          <VeraButton theme={theme} variant="mobile" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}