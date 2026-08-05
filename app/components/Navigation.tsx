'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useExperiment } from './ExperimentProvider'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

export default function Navigation() {
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

  // Dynamic token mapping based on route context — computed once here,
  // passed down so Desktop/Mobile/Menu/Button never diverge on theme.
  const theme = {
    isLightPage,
    textPrimary: isLightPage ? '#1A1A1A' : '#FFFFFF',
    textMuted: isLightPage ? 'rgba(0, 0, 0, 0.5)' : 'var(--muted)',
  }

  const navItems = [
    { label: 'work', href: '/#work' },
    { label: 'about', href: '/#about' },
    { label: 'work with me', href: '/work-with-me' },
  ]

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
      pointerEvents: 'none',
    }}>
      {isMobile ? (
        <MobileNavigation
          theme={theme}
          navItems={navItems}
          pathname={pathname}
          showActiveState={showActiveState}
        />
      ) : (
        <DesktopNavigation
          theme={theme}
          navItems={navItems}
          pathname={pathname}
          showActiveState={showActiveState}
        />
      )}
    </div>
  )
}