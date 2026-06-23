'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('All fields are required.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch {
      setErrorMsg('Connection error. Try again.')
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(200,240,74,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '4rem' }}>

        {/* Left — heading */}
        <div>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            Let's build<br />something.
          </h2>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.875rem',
            color: 'var(--muted)',
            lineHeight: 1.75,
            maxWidth: '36ch',
          }}>
            Open to remote roles, freelance projects, and interesting conversations.
            Based in Medellín — available EST hours.
          </p>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            marginTop: '1.5rem',
            opacity: 0.6,
          }}>
            raigoza.david.j@gmail.com
          </p>
        </div>

        {/* Right — form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>

          {/* Success state */}
          {status === 'success' ? (
            <div style={{
              border: '1px solid var(--accent)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Message sent ✓
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                Got it — I'll get back to you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.875rem',
                    padding: '0.75rem 1rem',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                    width: '100%',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.875rem',
                    padding: '0.75rem 1rem',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                    width: '100%',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="What are you working on?"
                  rows={5}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.875rem',
                    padding: '0.75rem 1rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.15s',
                    width: '100%',
                    lineHeight: 1.6,
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Error */}
              {status === 'error' && errorMsg && (
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#ff4444', letterSpacing: '0.1em' }}>
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? 'var(--border)' : 'var(--accent)',
                  border: 'none',
                  color: 'var(--bg)',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1rem 2rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = 'var(--text)' }}
                onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = 'var(--accent)' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send message →'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}