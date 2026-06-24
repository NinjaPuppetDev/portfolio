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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        border: `1px solid ${focused ? 'var(--accent)' : 'rgba(200,240,74,0.25)'}`,
        transition: 'border-color 0.15s',
        maxWidth: '640px',
        background: 'rgba(200,240,74,0.06)',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--accent)', padding: '0 1rem', flexShrink: 0, opacity: 0.8, userSelect: 'none' }}>◈</span>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask Vera anything, or navigate anywhere…"
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text)', padding: '0.9rem 0', letterSpacing: '0.02em' }}
        />
        <button
          onClick={() => fire(value)}
          disabled={!value.trim()}
          style={{ background: value.trim() ? 'var(--accent)' : 'transparent', border: 'none', borderLeft: `1px solid ${value.trim() ? 'var(--accent)' : 'var(--border)'}`, color: value.trim() ? 'var(--bg)' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.1em', padding: '0.9rem 1.25rem', cursor: value.trim() ? 'pointer' : 'default', transition: 'background 0.15s, color 0.15s', flexShrink: 0 }}
        >
          →
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem', maxWidth: '640px' }}>
        {PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => fire(p)}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.08em', padding: '0.3rem 0.75rem', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s', whiteSpace: 'nowrap' }}
          >
            {p}
          </button>
        ))}
      </div>
      {pill && <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.12em', marginTop: '0.5rem' }}>✓ Sent to Vera</p>}
    </div>
  )
}