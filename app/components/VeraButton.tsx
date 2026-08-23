'use client'

interface Theme {
  isLightPage: boolean
  textPrimary: string
  textMuted?: string
}

interface VeraButtonProps {
  theme: Theme
  variant?: 'desktop' | 'mobile'
  onClick?: () => void
}

// Single source of truth for the "Launch Vera" CTA. Desktop renders it inline
// in the pill nav; mobile renders it full-width at the bottom of the drawer.
// Same trigger logic (open-vera event + input focus) either way.
export default function VeraButton({ theme, variant = 'desktop', onClick }: VeraButtonProps) {
  const { isLightPage, textPrimary } = theme
  const isMobileVariant = variant === 'mobile'

  const launch = () => {
    window.dispatchEvent(new CustomEvent('open-vera'))
    setTimeout(() => {
      const inputEl = document.querySelector('input') || document.querySelector('textarea')
      if (inputEl) inputEl.focus()
    }, 50)
    onClick?.()
  }

  return (
    <button
      onClick={launch}
      style={{
        background: isLightPage
          ? 'linear-gradient(180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.04) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        borderTop: isLightPage ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: isLightPage ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
        borderRight: isLightPage ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid rgba(0, 0, 0, 0.3)',
        borderBottom: isLightPage ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.5)',
        borderRadius: '20px',
        padding: isMobileVariant ? '0.9rem 1.25rem' : '0.45rem 1.1rem',
        width: isMobileVariant ? '100%' : 'auto',
        textAlign: isMobileVariant ? 'center' : 'left',
        fontFamily: 'var(--mono)',
        fontSize: isMobileVariant ? '0.75rem' : '0.6rem',
        fontWeight: 600,
        color: textPrimary,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: isLightPage
          ? '0 4px 10px rgba(40, 30, 20, 0.03), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap',
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
  )
}