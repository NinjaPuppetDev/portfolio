'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState('idle')
  const [contactError, setContactError] = useState('')

  const handleContactSubmit = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('All fields are required.')
      setContactStatus('error')
      return
    }
    setContactStatus('loading')
    setContactError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setContactError(data.error ?? 'Something went wrong.')
        setContactStatus('error')
      } else {
        setContactStatus('success')
        setContactName('')
        setContactEmail('')
        setContactMessage('')
      }
    } catch {
      setContactError('Connection error. Try again.')
      setContactStatus('error')
    }
  }

  if (contactStatus === 'success') {
    return (
      <div style={{ border: '1px solid var(--accent)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Message sent ✓</p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>Got it — I'll get back to you shortly.</p>
        <button onClick={() => setContactStatus('idle')} style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.5rem 1rem', cursor: 'pointer', marginTop: '0.5rem' }}>Send another</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Name</label>
        <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Your name" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', width: '100%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label>
        <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="your@email.com" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', width: '100%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Message</label>
        <textarea value={contactMessage} onChange={e => setContactMessage(e.target.value)} placeholder="What are you working on?" rows={5} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', resize: 'vertical', width: '100%', lineHeight: 1.6 }} />
      </div>
      {contactStatus === 'error' && contactError && <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#ff4444' }}>{contactError}</p>}
      <button onClick={handleContactSubmit} disabled={contactStatus === 'loading'} style={{ background: contactStatus === 'loading' ? 'var(--border)' : 'var(--accent)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2rem', cursor: contactStatus === 'loading' ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}>Submit</button>
    </div>
  )
}