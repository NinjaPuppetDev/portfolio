'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

const CONSENT_COOKIE = 'COOKIE_CONSENT'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function hasConsentChoice(): boolean {
  if (typeof document === 'undefined') return true
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
}

function initializeAnalytics() {
  if (typeof document === 'undefined') return
  if (document.getElementById('google-analytics-consent')) return

  const analyticsScript = document.createElement('script')
  analyticsScript.id = 'google-analytics-consent'
  analyticsScript.async = true
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YQXEJSG71S'
  document.head.appendChild(analyticsScript)

  const analyticsConfig = document.createElement('script')
  analyticsConfig.id = 'google-analytics-config-consent'
  analyticsConfig.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YQXEJSG71S');
  `
  document.head.appendChild(analyticsConfig)

  const clarityScript = document.createElement('script')
  clarityScript.id = 'microsoft-clarity-consent'
  clarityScript.textContent = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","xc7iqvsl54");
  `
  document.head.appendChild(clarityScript)
}

export default function CookieBanner() {
  const t = useTranslations('cookie')
  const pathname = usePathname()
  const isNegocios = pathname?.includes('/negocios')

  const [mounted, setMounted] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [animatingIn, setAnimatingIn] = useState(false)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)

    if (hasConsentChoice()) {
      if (document.cookie.includes(`${CONSENT_COOKIE}=true`)) {
        initializeAnalytics()
      }
      return
    }

    // Delay presentation until the initial intro sequence has completed
    const enterTimer = setTimeout(() => {
      setRendered(true)
      // Trigger smooth entrance animation on next frame
      requestAnimationFrame(() => {
        setAnimatingIn(true)
      })
    }, 2000)

    return () => {
      clearTimeout(enterTimer)
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
    }
  }, [])

  const chooseConsent = (granted: boolean) => {
    document.cookie = `${CONSENT_COOKIE}=${granted}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    if (granted) {
      initializeAnalytics()
    }

    // Smooth exit animation before unmounting
    setAnimatingIn(false)
    exitTimerRef.current = setTimeout(() => {
      setRendered(false)
    }, 350)
  }

  if (!mounted || !rendered) return null

  return createPortal(
    <div
      role="region"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 'clamp(1rem, 2.5vw, 1.75rem)',
        left: 0,
        right: 0,
        zIndex: 9995,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
        pointerEvents: 'none',
      }}
    >
      <aside
        id="cookie-consent-banner"
        role="dialog"
        aria-live="polite"
        aria-label={t('title')}
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '520px',
          background: isNegocios ? '#FFFFFF' : 'rgba(15, 15, 15, 0.94)',
          border: isNegocios ? '1px solid #E2E2DE' : '1px solid var(--border-hi, #2e2e2e)',
          borderRadius: '16px',
          padding: '1.25rem 1.35rem',
          boxShadow: isNegocios
            ? '0 20px 48px -10px rgba(18, 18, 16, 0.12), 0 0 0 1px rgba(18, 18, 16, 0.05)'
            : '0 24px 60px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transform: animatingIn ? 'translateY(0)' : 'translateY(18px)',
          opacity: animatingIn ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
            {/* Minimalist status badge / icon */}
            <div
              style={{
                display: 'flex',
                height: '1.75rem',
                width: '1.75rem',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: isNegocios ? 'rgba(22, 163, 74, 0.1)' : 'rgba(200, 240, 74, 0.08)',
                border: isNegocios ? '1px solid rgba(22, 163, 74, 0.25)' : '1px solid rgba(200, 240, 74, 0.25)',
                color: isNegocios ? '#15803D' : 'var(--accent, #c8f04a)',
                marginTop: '0.1rem',
              }}
            >
              <svg
                style={{ width: '0.875rem', height: '0.875rem' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: isNegocios ? '#16A34A' : 'var(--accent, #c8f04a)',
                    boxShadow: isNegocios ? '0 0 6px rgba(22, 163, 74, 0.45)' : '0 0 8px var(--accent, #c8f04a)',
                  }}
                />
                <h2
                  style={{
                    fontFamily: 'var(--mono, monospace)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: isNegocios ? '#121210' : 'var(--text, #e8e2d9)',
                    margin: 0,
                  }}
                >
                  {t('title')}
                </h2>
              </div>
              <p
                style={{
                  fontFamily: 'var(--sans, sans-serif)',
                  fontSize: '0.8125rem',
                  lineHeight: '1.55',
                  color: isNegocios ? '#555550' : 'rgba(232, 226, 217, 0.72)',
                  fontWeight: isNegocios ? 400 : 300,
                  margin: 0,
                }}
              >
                {t('description')}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.625rem',
              paddingTop: '0.75rem',
              borderTop: isNegocios ? '1px solid #EAEAE6' : '1px solid var(--border, #1e1e1e)',
            }}
          >
            <button
              id="cookie-consent-decline-btn"
              type="button"
              onClick={() => chooseConsent(false)}
              style={{
                height: '2rem',
                borderRadius: '8px',
                border: isNegocios ? '1px solid #D4D4D0' : '1px solid var(--border-hi, #2e2e2e)',
                background: 'transparent',
                padding: '0 1rem',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isNegocios ? '#666660' : 'var(--muted, #5a5650)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (isNegocios) {
                  e.currentTarget.style.color = '#121210'
                  e.currentTarget.style.borderColor = '#121210'
                  e.currentTarget.style.background = '#F4F4F2'
                } else {
                  e.currentTarget.style.color = 'var(--text, #e8e2d9)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                }
              }}
              onMouseLeave={(e) => {
                if (isNegocios) {
                  e.currentTarget.style.color = '#666660'
                  e.currentTarget.style.borderColor = '#D4D4D0'
                  e.currentTarget.style.background = 'transparent'
                } else {
                  e.currentTarget.style.color = 'var(--muted, #5a5650)'
                  e.currentTarget.style.borderColor = 'var(--border-hi, #2e2e2e)'
                }
              }}
            >
              {t('decline')}
            </button>
            <button
              id="cookie-consent-accept-btn"
              type="button"
              onClick={() => chooseConsent(true)}
              style={{
                height: '2rem',
                borderRadius: '8px',
                border: isNegocios ? '1px solid #15803D' : '1px solid var(--accent, #c8f04a)',
                background: isNegocios ? '#15803D' : 'var(--accent, #c8f04a)',
                padding: '0 1.15rem',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isNegocios ? '#FFFFFF' : '#080808',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isNegocios
                  ? '0 4px 12px rgba(21, 128, 61, 0.22)'
                  : '0 0 16px rgba(200, 240, 74, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (isNegocios) {
                  e.currentTarget.style.background = '#166534'
                  e.currentTarget.style.borderColor = '#166534'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(21, 128, 61, 0.35)'
                } else {
                  e.currentTarget.style.background = '#d8f566'
                  e.currentTarget.style.borderColor = '#d8f566'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(200, 240, 74, 0.35)'
                }
              }}
              onMouseLeave={(e) => {
                if (isNegocios) {
                  e.currentTarget.style.background = '#15803D'
                  e.currentTarget.style.borderColor = '#15803D'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 128, 61, 0.22)'
                } else {
                  e.currentTarget.style.background = 'var(--accent, #c8f04a)'
                  e.currentTarget.style.borderColor = 'var(--accent, #c8f04a)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(200, 240, 74, 0.2)'
                }
              }}
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  )
}
