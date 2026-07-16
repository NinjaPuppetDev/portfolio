'use client'

import { useState, useRef } from 'react'

const PROMPTS = [
  'Take me to Pepe Matilda',
  'Show me the Web3 work',
  "I'm a recruiter",
  'Start the design tour',
  'Open QIE Neobank',
]

export default function PromptBar({ mounted }: { mounted: boolean }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [pill, setPill] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fire = (text: string) => {
    const msg = text.trim()
    if (!msg) return
    window.dispatchEvent(
      new CustomEvent('open-portfolio-chat', {
        detail: { autoSend: true, message: msg },
      })
    )
    setValue('')
    setPill(msg)
    setTimeout(() => setPill(null), 1800)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fire(value)
  }

  return (
    <div style={{
      position: 'relative',
      zIndex: 2,
      marginTop: '3.5rem',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
    }}>
      {/* Input row — hairline underline only, no fill, no box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '640px',
        borderBottom: `1px solid ${focused ? 'var(--accent)' : 'var(--border-hi)'}`,
        transition: 'border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        paddingBottom: '0.85rem',
      }}>
        <span style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          flexShrink: 0,
          opacity: focused ? 1 : 0.6,
          boxShadow: focused ? '0 0 6px var(--accent)' : 'none',
          transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
        }} />
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask Vera anything, or navigate anywhere…"
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--text)',
            letterSpacing: '0.02em',
            padding: 0,
          }}
        />
        <button
          onClick={() => fire(value)}
          disabled={!value.trim()}
          aria-label="Send to Vera"
          style={{
            background: 'none',
            border: 'none',
            color: value.trim() ? 'var(--accent)' : 'var(--muted)',
            fontFamily: 'var(--mono)',
            fontSize: '0.85rem',
            padding: 0,
            cursor: value.trim() ? 'pointer' : 'default',
            opacity: value.trim() ? 1 : 0.4,
            transition: 'opacity 0.2s ease, color 0.2s ease',
            flexShrink: 0,
          }}
        >
          →
        </button>
      </div>

      {/* Quick prompts — inline mono list, no chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.6rem',
        marginTop: '1rem',
        maxWidth: '640px',
      }}>
        {PROMPTS.map((p, i) => (
          <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => fire(p)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontFamily: 'var(--mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.06em',
                padding: 0,
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'opacity 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = 'var(--muted)' }}
            >
              {p}
            </button>
            {i < PROMPTS.length - 1 && (
              <span style={{ color: 'var(--border-hi)', fontSize: '0.6rem' }}>/</span>
            )}
          </span>
        ))}
      </div>

      {pill && (
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          marginTop: '0.75rem',
          opacity: 0.85,
        }}>
          Sent to Vera →
        </p>
      )}
    </div>
  )
}