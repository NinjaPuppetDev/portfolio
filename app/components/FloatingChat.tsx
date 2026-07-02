'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
  tourAction?: TourAction
}

interface TourAction {
  navigate?: string
  nextPrompt?: string
  tourStep?: number
  offerTour?: boolean
}

// ─── TOUR CONFIGURATION META (FIXED SLUG TO MARIGOLD-BLOOM) ───────────────────
const DESIGN_TOUR = [
  { step: 1, path: '/work/pepe-matilda', nextLabel: 'Next: NextStep →' },
  { step: 2, path: '/work/next-step', nextLabel: 'Next: Marigold Bloom →' },
  { step: 3, path: '/work/marigold-bloom', nextLabel: 'Get in touch →', finalStop: true },
]

const WEB3_TOUR = [
  { step: 1, path: '/work/qie-neobank', nextLabel: 'Next: Bruma Protocol →' },
  { step: 2, path: 'https://bruma-protocol.vercel.app/', nextLabel: 'Get in touch →', finalStop: true },
]

// ─── CLIENT-SIDE NAVIGATION INTENT MAP ───────────────────────────────────────
const NAV_INTENTS: { patterns: RegExp[]; path: string; label: string }[] = [
  { patterns: [/\bhome(page)?\b/i, /\bstart\b/i, /\bback to (the )?top\b/i], path: '/', label: 'Taking you home.' },
  { patterns: [/\bpepe\s*matilda\b/i], path: '/work/pepe-matilda', label: 'Opening Pepe Matilda.' },
  { patterns: [/\bnext\s*step\b/i], path: '/work/next-step', label: 'Opening NextStep.' },
  { patterns: [/\bmarigold\b/i, /\bmarigold-bloom\b/i], path: '/work/marigold-bloom', label: 'Opening Marigold Bloom.' },
  { patterns: [/\bqie\b/i, /\bneobank\b/i], path: '/work/qie-neobank', label: 'Opening QIE Neobank.' },
  { patterns: [/\bbruma\b/i], path: 'https://bruma-protocol.vercel.app/', label: 'Opening Bruma Protocol.' },
  { patterns: [/\bgithub\b/i, /\brepo\b/i], path: 'https://github.com/NinjaPuppetDev', label: 'Opening GitHub.' },
  { patterns: [/\bjob\s*scanner\b/i], path: 'https://raigoza-job-scanner.vercel.app/', label: 'Opening the Job Scanner.' },
  { patterns: [/\bcontact\b/i, /\bget in touch\b/i, /\breach out\b/i], path: '#contact', label: 'Opening contact flow.' },
]

const NAV_TRIGGER = /\b(take me|go|navigate|open|show me|bring me|jump)\b/i

function detectNavIntent(text: string): { path: string; label: string } | null {
  if (!NAV_TRIGGER.test(text)) return null
  for (const intent of NAV_INTENTS) {
    if (intent.patterns.some(p => p.test(text))) {
      return { path: intent.path, label: intent.label }
    }
  }
  return null
}

const TOUR_RECOVERY = /\b(show|open|restart|see|start|re-?open).{0,20}tour\b/i

const SUGGESTIONS = [
  "I'm a recruiter",
  "I need a designer or developer",
  'Tell me about the Web3 work',
  'Just exploring',
]

const GREETING: Message = {
  role: 'assistant',
  content: "Hi — I'm Vera, the AI built into David's portfolio. I can walk you through his work, answer questions about his background, or give you a guided tour of the projects most relevant to you.\n\nWhat brings you here today?",
}

function isExternal(path: string) {
  return path.startsWith('http')
}

function executeNavigation(path: string, router: ReturnType<typeof useRouter>) {
  if (path === '#contact') {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else if (isExternal(path)) {
    window.open(path, '_blank')
  } else {
    router.push(path)
  }
}

export default function FloatingChat() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Explicit Tour Tracking States
  const [tourActive, setTourActive] = useState(false)
  const [tourType, setTourType] = useState<'design' | 'web3' | null>(null)
  const [tourStep, setTourStep] = useState(0)

  // In-Chat Contact Form Intercept Pipeline
  const [contactMode, setContactMode] = useState(false)
  const [contactEmail, setContactEmail] = useState('')
  const [contactName, setContactName] = useState('')

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true) // This opens the chat layout frame instantly!
      const detail = (e as CustomEvent).detail
      if (detail?.prefill) setInput(detail.prefill)
      if (detail?.autoSend && detail?.message) {
        setTimeout(() => sendMessage(detail.message), 100)
      }
    }
    
    // Register both event listener tracks
    window.addEventListener('open-portfolio-chat', handler as EventListener)
    window.addEventListener('open-vera', handler as EventListener)
    
    return () => {
      window.removeEventListener('open-portfolio-chat', handler as EventListener)
      window.removeEventListener('open-vera', handler as EventListener)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, contactMode])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open, contactMode])

  // ── CORE COMMUNICATIONS PIPELINE ───────────────────────────────────────────
  const sendMessage = async (text: string, overrideTourType?: 'design' | 'web3', overrideTourStep?: number) => {
    const trimmed = text.trim()
    if (!trimmed && overrideTourStep === undefined) return
    if (loading) return

    // Route directly to standard API contact endpoint if form flow is active
    if (contactMode) {
      handleChatContactSubmit(trimmed)
      return
    }

    if (trimmed) {
      const navIntent = detectNavIntent(trimmed)
      if (navIntent) {
        if (navIntent.path === '#contact') {
          initiateContactFlow()
          return
        }
        setTourActive(false)
        setTourType(null)
        setTourStep(0)
        setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: navIntent.label }])
        setInput('')
        setTimeout(() => executeNavigation(navIntent.path, router), 300)
        return
      }

      if (TOUR_RECOVERY.test(trimmed)) {
        setTourActive(false)
        setTourType(null)
        setTourStep(0)
        setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: "Of course — here are the tours. Pick one and I'll walk you through step by step.", tourAction: { offerTour: true } }])
        setInput('')
        return
      }
    }

    const activeType = overrideTourType !== undefined ? overrideTourType : tourType
    const activeStep = overrideTourStep !== undefined ? overrideTourStep : tourStep

    const backendMessageContent = trimmed || `Describe project step ${activeStep} on the ${activeType} tour.`
    const userMsg: Message = { role: 'user', content: backendMessageContent }
    
    if (trimmed) {
      setMessages(prev => [...prev, { role: 'user', content: trimmed }])
    }
    
    setInput('')
    setLoading(true)

    let formattedApiMessages;
    if (!trimmed && activeStep > 0) {
      formattedApiMessages = [{ role: 'user', content: backendMessageContent }]
    } else {
      const apiMessages = [...messages]
      if (trimmed) apiMessages.push(userMsg)
      formattedApiMessages = apiMessages.map(({ role, content }) => ({ role, content }))
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: formattedApiMessages,
          tourType: activeType,
          tourStep: activeStep
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Try again in a moment.' }])
        return
      }

      const content: string = data.content ?? ''
      const offerTourFromApi: boolean = data.offerTour ?? false

      let actionPayload: TourAction | undefined = undefined
      if (activeType && activeStep > 0) {
        actionPayload = { tourStep: activeStep }
      } else if (offerTourFromApi || /design tour|web3 tour|brand tour|protocol tour/i.test(content)) {
        actionPayload = { offerTour: true }
      }

      setMessages(prev => [...prev, { role: 'assistant', content, tourAction: actionPayload }])
    } catch (err) {
      console.error('Chat pipeline error:', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Check your network and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  // ── INTEGRATED RESEND API CONTACT SUBMISSION HANDLE ──────────────────────────
  const initiateContactFlow = () => {
    setTourActive(false)
    setTourType(null)
    setTourStep(0)
    setContactMode(true)
    setContactName('')
    setContactEmail('')
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: "Let's get in touch! I can send a message straight to David's inbox from here.\n\nFirst, what is your name?" 
    }])
  }

  const handleChatContactSubmit = async (messageContent: string) => {
    if (!contactName) {
      setContactName(messageContent)
      setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: `Great to meet you, ${messageContent}. What email address should David use to reply to you?` }])
      setInput('')
      return
    }

    if (!contactEmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageContent)) {
        setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: "Oops, that doesn't look like a valid email configuration. Let's try again:" }])
        setInput('')
        return
      }
      setContactEmail(messageContent)
      setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: "Got it. Finally, what would you like to tell David?" }])
      setInput('')
      return
    }

    // Submit complete object context to /api/contact route
    setMessages(prev => [...prev, { role: 'user', content: messageContent }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: messageContent }),
      })
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Message sent successfully! ✓\n\nDavid will check his inbox and get back to you shortly. Let me know if there's anything else you'd like to see!" }])
        setContactMode(false)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I ran into a server problem trying to process that message. Feel free to use the form at the bottom of the page or email raigoza.david.j@gmail.com directly!" }])
        setContactMode(false)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error sending contact data. Try again in a second." }])
    } finally {
      setLoading(false)
    }
  }

  // ── TOUR STATE STEP CONTROLLERS ──────────────────────────────────────────────
  const startTour = (type: 'design' | 'web3') => {
    const tour = type === 'design' ? DESIGN_TOUR : WEB3_TOUR
    setTourActive(true)
    setTourType(type)
    setTourStep(1)
    
    if (tour[0]?.path) executeNavigation(tour[0].path, router)
    sendMessage('', type, 1)
  }

  const advanceTour = () => {
    if (!tourType) return

    const tour = tourType === 'design' ? DESIGN_TOUR : WEB3_TOUR
    const nextStep = tourStep + 1
    const stop = tour[nextStep - 1]

    if (!stop) {
      initiateContactFlow()
      return
    }

    setTourStep(nextStep)
    if (stop.path) executeNavigation(stop.path, router)
    sendMessage('', tourType, nextStep)
  }

  const endTour = () => {
    setTourActive(false)
    setTourType(null)
    setTourStep(0)
    setContactMode(false)
    setMessages(prev => [...prev, { role: 'assistant', content: "Tour ended. Ask me anything, or reach out at raigoza.david.j@gmail.com" }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  if (!mounted) return null

  const currentTourArray = tourType === 'design' ? DESIGN_TOUR : WEB3_TOUR
  const currentStepConfig = currentTourArray[tourStep - 1]
  const nextStepConfig = currentTourArray[tourStep]
  const lastMsg = messages[messages.length - 1]

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
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              {contactMode ? 'Inbox Sync' : tourActive ? `Tour · ${tourType === 'design' ? 'Brand & Design' : 'Web3'} · ${tourStep}/${currentTourArray.length}` : 'Vera'}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>
              {contactMode ? 'Direct Contact Form' : tourActive ? 'Guided tour in progress' : "David's portfolio assistant"}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {(tourActive || contactMode) && (
              <button onClick={endTour} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.5rem' }}>
                Exit flow
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem' }}>✕</button>
          </div>
        </div>

        {/* Messages Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem' }}>
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

              {/* Onboarding triggers */}
              {msg.role === 'assistant' && i === 0 && messages.length === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: '0.72rem', padding: '0.5rem 0.75rem', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, color 0.15s', lineHeight: 1.4 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '0.65rem 0.9rem', border: '1px solid var(--border)', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Action Button Stage Layouts */}
        <div style={{ padding: '0px 1.25rem 0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
          {(!tourActive && !contactMode && (lastMsg?.tourAction?.offerTour || /tour/i.test(lastMsg?.content ?? ''))) && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <TourButton onClick={() => startTour('design')}>Brand & Design tour →</TourButton>
              <TourButton onClick={() => startTour('web3')}>Web3 tour →</TourButton>
            </div>
          )}

          {tourActive && !loading && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {nextStepConfig ? (
                <TourButton onClick={advanceTour}>{currentStepConfig?.nextLabel ?? 'Next Step →'}</TourButton>
              ) : (
                <TourButton onClick={initiateContactFlow}>Get in touch →</TourButton>
              )}
              <TourButton secondary onClick={endTour}>Keep exploring</TourButton>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              contactMode 
                ? !contactName ? "Type your name..." : !contactEmail ? "Type your email address..." : "Type your message..."
                : tourActive ? 'Ask a question or use the buttons above…' : 'Ask anything…'
            }
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
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Trigger Button */}
      <div style={{ position: 'fixed', bottom: 'clamp(1rem, 3vw, 1.75rem)', right: 'clamp(1rem, 3vw, 2rem)', zIndex: 1000, opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        {!open && (
          <>
            <span style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent)', animation: 'chatPulse 2.5s ease-out 1.5s infinite', pointerEvents: 'none' }} />
            <span style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent)', animation: 'chatPulse 2.5s ease-out 2.2s infinite', pointerEvents: 'none' }} />
          </>
        )}
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
          style={{
            position: 'relative',
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
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <span style={{ fontSize: '0.75rem' }}>{open ? '✕' : '◈'}</span>
          {open ? 'Close' : 'Ask Vera'}
        </button>
      </div>

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes chatPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </>
  )
}

function TourButton({ children, onClick, secondary }: { children: React.ReactNode; onClick: () => void; secondary?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: secondary ? 'none' : 'var(--accent)',
        border: secondary ? '1px solid var(--border)' : 'none',
        color: secondary ? 'var(--muted)' : 'var(--bg)',
        fontFamily: 'var(--mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '0.5rem 0.9rem',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => {
        if (secondary) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)' }
        else e.currentTarget.style.background = 'var(--text)'
      }}
      onMouseLeave={e => {
        if (secondary) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }
        else e.currentTarget.style.background = 'var(--accent)'
      }}
    >
      {children}
    </button>
  )
}