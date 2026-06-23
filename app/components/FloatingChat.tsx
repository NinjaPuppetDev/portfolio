'use client'

import { useEffect, useRef, useState } from 'react'

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ─── SUGGESTED PROMPTS ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'What has David built in Web3?',
  '¿Está disponible para trabajo remoto?',
  'What design tools does he use?',
  'Tell me about Pepe Matilda',
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Sorry, something went wrong. Try again in a moment.",
        }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection error. Check your network and try again.",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* ── PANEL ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="Portfolio assistant"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: 'clamp(1rem, 3vw, 2rem)',
          width: 'min(380px, calc(100vw - 2rem))',
          height: '520px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          // open/close animation
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Portfolio AI
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>
              Ask about David's work
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0.25rem' }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {/* Empty state */}
          {messages.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                You're looking at David's work. Ask me anything — projects, stack, process, availability.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      fontFamily: 'var(--sans)',
                      fontSize: '0.72rem',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, color 0.15s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'var(--accent)'
                      el.style.color = 'var(--text)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'var(--border)'
                      el.style.color = 'var(--muted)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message thread */}
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '0.65rem 0.9rem',
                background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                fontFamily: 'var(--sans)',
                fontSize: '0.8rem',
                color: msg.role === 'user' ? 'var(--bg)' : 'var(--text)',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.65rem 0.9rem',
                border: '1px solid var(--border)',
                display: 'flex',
                gap: '0.3rem',
                alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: '4px', height: '4px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'flex-end',
          flexShrink: 0,
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--sans)',
              fontSize: '0.8rem',
              padding: '0.6rem 0.75rem',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.5,
              maxHeight: '80px',
              overflowY: 'auto',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            style={{
              background: input.trim() && !loading ? 'var(--accent)' : 'var(--border)',
              border: 'none',
              color: input.trim() && !loading ? 'var(--bg)' : 'var(--muted)',
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              padding: '0.6rem 0.9rem',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s, color 0.15s',
              flexShrink: 0,
              letterSpacing: '0.05em',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* ── TRIGGER BUTTON ────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 3vw, 1.75rem)',
          right: 'clamp(1rem, 3vw, 2rem)',
          zIndex: 1000,
          background: open ? 'var(--text)' : 'var(--accent)',
          border: 'none',
          color: 'var(--bg)',
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.25rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'background 0.2s, transform 0.15s',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          opacity: mounted ? 1 : 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <span style={{ fontSize: '0.75rem' }}>{open ? '✕' : '◈'}</span>
        {open ? 'Close' : 'Ask about my work'}
      </button>

      {/* ── KEYFRAMES ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}