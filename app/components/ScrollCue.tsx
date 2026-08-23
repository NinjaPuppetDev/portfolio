// app/components/ScrollCue.tsx
'use client'

export default function ScrollCue() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 4vh, 3rem)',
        left: '50%',                        // was: right: 'clamp(2rem, 6vw, 6rem)'
        transform: 'translateX(-50%)',      // new — centers based on the element's own width
        zIndex: 3,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--text)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: 0,
          opacity: 0.6,
        }}
      >
        Scroll to Navigate
      </p>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          display: 'inline-block',
          animation: 'scrollCuePulse 2s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes scrollCuePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
          50% {
            transform: scale(1.35);
            opacity: 1;
            box-shadow: 0 0 8px var(--accent);
          }
        }
      `}</style>
    </div>
  )
}