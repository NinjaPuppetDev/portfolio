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

type TourType = 'design' | 'web3' | 'product'

// ─── TOUR CONFIGURATION META ──────────────────────────────────────────────────
// Product tour is the primary buyer path — leads with the AI/SaaS proof points
// (Virtual Portfolio Hub, ApplyIQ) rather than brand or Web3 work.
const PRODUCT_TOUR = [
  { step: 1, path: '/work/virtual-portfolio-hub', nextLabel: 'Next: ApplyIQ →' },
  { step: 2, path: '/work/applyiq', nextLabel: 'Get in touch →', finalStop: true },
]

const DESIGN_TOUR = [
  { step: 1, path: '/work/pepe-matilda', nextLabel: 'Next: NextStep →' },
  { step: 2, path: '/work/next-step', nextLabel: 'Next: Marigold Bloom →' },
  { step: 3, path: '/work/marigold-bloom', nextLabel: 'Get in touch →', finalStop: true },
]

const WEB3_TOUR = [
  { step: 1, path: '/work/qie-neobank', nextLabel: 'Next: Bruma Protocol →' },
  { step: 2, path: 'https://bruma-protocol.vercel.app/', nextLabel: 'Get in touch →', finalStop: true },
]

function tourArrayFor(type: TourType | null) {
  if (type === 'design') return DESIGN_TOUR
  if (type === 'web3') return WEB3_TOUR
  return PRODUCT_TOUR
}

// ─── CLIENT-SIDE NAVIGATION INTENT MAP ───────────────────────────────────────
const NAV_INTENTS: { patterns: RegExp[]; path: string; label: string }[] = [
  { patterns: [/\bhome(page)?\b/i, /\bstart\b/i, /\bback to (the )?top\b/i], path: '/', label: 'Taking you home.' },
  { patterns: [/\bpepe\s*matilda\b/i], path: '/work/pepe-matilda', label: 'Opening Pepe Matilda.' },
  { patterns: [/\bnext\s*step\b/i], path: '/work/next-step', label: 'Opening NextStep.' },
  { patterns: [/\bmarigold\b/i, /\bmarigold-bloom\b/i], path: '/work/marigold-bloom', label: 'Opening Marigold Bloom.' },
  { patterns: [/\bqie\b/i, /\bneobank\b/i], path: '/work/qie-neobank', label: 'Opening QIE Neobank.' },
  { patterns: [/\bbruma\b/i], path: 'https://bruma-protocol.vercel.app/', label: 'Opening Bruma Protocol.' },
  { patterns: [/\bgithub\b/i, /\brepo\b/i], path: 'https://github.com/NinjaPuppetDev', label: 'Opening GitHub.' },
  { patterns: [/\bvirtual\s*portfolio\b/i, /\bportfolio\s*hub\b/i], path: '/work/virtual-portfolio-hub', label: 'Opening the Virtual Portfolio Hub.' },
  { patterns: [/\bapply\s*iq\b/i, /\bsiftparity\b/i, /\bjob\s*scanner\b/i], path: '/work/applyiq', label: 'Opening ApplyIQ.' },
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
const TOUR_OFFER_PATTERN = /product tour|ai tour|saas tour|design tour|web3 tour|brand tour|protocol tour/i

// Swapped "I'm a recruiter" for client-facing quick replies — the buyer here
// is a founder/technical leader, not a hiring manager screening a candidate.
const SUGGESTIONS = [
  'I need a product designed and built',
  'I need a brand or design system',
  'Tell me about the Web3 work',
  'Just exploring',
]

const GREETING: Message = {
  role: 'assistant',
  content: "Hi — I'm Vera, an AI system architected into this ecosystem. I can unpack the studio's operational layout, break down specific technical systems, or guide you through selected production logs.",
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

  const [tourActive, setTourActive] = useState(false)
  const [tourType, setTourType] = useState<TourType | null>(null)
  const [tourStep, setTourStep] = useState(0)

  const [contactMode, setContactMode] = useState(false)
  const [contactEmail, setContactEmail] = useState('')
  const [contactName, setContactName] = useState('')

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true)
      const detail = (e as CustomEvent).detail
      if (detail?.prefill) setInput(detail.prefill)
      if (detail?.autoSend && detail?.message) {
        setTimeout(() => sendMessage(detail.message), 100)
      }
    }
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

  const sendMessage = async (text: string, overrideTourType?: TourType, overrideTourStep?: number) => {
    const trimmed = text.trim()
    if (!trimmed && overrideTourStep === undefined) return
    if (loading) return

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
        setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: "Select an architectural sequence to begin.", tourAction: { offerTour: true } }])
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
        setMessages(prev => [...prev, { role: 'assistant', content: 'Connection timed out. Please execute request again.' }])
        return
      }

      const content: string = data.content ?? ''
      const offerTourFromApi: boolean = data.offerTour ?? false
      const navigateFromApi: string | null = data.navigate ?? null

      let actionPayload: TourAction | undefined = undefined
      if (activeType && activeStep > 0) {
        actionPayload = { tourStep: activeStep }
      } else if (offerTourFromApi || TOUR_OFFER_PATTERN.test(content)) {
        actionPayload = { offerTour: true }
      }

      if (navigateFromApi) {
        actionPayload = { ...actionPayload, navigate: navigateFromApi }
      }

      setMessages(prev => [...prev, { role: 'assistant', content, tourAction: actionPayload }])

      if (navigateFromApi) {
        if (navigateFromApi === '#contact') {
          initiateContactFlow()
        } else {
          setTimeout(() => executeNavigation(navigateFromApi, router), 400)
        }
      }

    } catch (err) {
      console.error('Chat pipeline error:', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'System error. Unable to process command.' }])
    } finally {
      setLoading(false)
    }
  }

  const initiateContactFlow = () => {
    setTourActive(false)
    setTourType(null)
    setTourStep(0)
    setContactMode(true)
    setContactName('')
    setContactEmail('')
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: "Initializing message context sync.\n\nCould you supply your name?" 
    }])
  }

  const handleChatContactSubmit = async (messageContent: string) => {
    if (!contactName) {
      setContactName(messageContent)
      setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: `Acknowledged, ${messageContent}. Provide a secure email configuration for the return route:` }])
      setInput('')
      return
    }

    if (!contactEmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageContent)) {
        setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: "Invalid syntax format. Please re-enter secure routing parameter:" }])
        setInput('')
        return
      }
      setContactEmail(messageContent)
      setMessages(prev => [...prev, { role: 'user', content: messageContent }, { role: 'assistant', content: "Parameters locked. Enter your message core details:" }])
      setInput('')
      return
    }

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
        setMessages(prev => [...prev, { role: 'assistant', content: "Transmission complete. ✓\n\nDavid has been updated on this communication pipeline. Let me know if you need any further indexing." }])
        setContactMode(false)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Routing error encountered. You can issue communications manually to raigoza.david.j@gmail.com" }])
        setContactMode(false)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network layer drop. Re-initialize contact stack." }])
    } finally {
      setLoading(false)
    }
  }

  const startTour = (type: TourType) => {
    const tour = tourArrayFor(type)
    setTourActive(true)
    setTourType(type)
    setTourStep(1)
    
    if (tour[0]?.path) executeNavigation(tour[0].path, router)
    sendMessage('', type, 1)
  }

  const advanceTour = () => {
    if (!tourType) return

    const tour = tourArrayFor(tourType)
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
    setMessages(prev => [...prev, { role: 'assistant', content: "Sequence stopped. Awaiting independent input." }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  if (!mounted) return null

  const currentTourArray = tourArrayFor(tourType)
  const currentStepConfig = currentTourArray[tourStep - 1]
  const nextStepConfig = currentTourArray[tourStep]
  const lastMsg = messages[messages.length - 1]

  return (
    <>
      <div
        role="dialog"
        aria-label="Portfolio operating system"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: 'clamp(1rem, 3vw, 2.5rem)',
          width: 'min(360px, calc(100vw - 2rem))',
          height: '500px',
          background: 'rgba(10, 10, 10, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.65)',
          backdropFilter: 'blur(24px)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.99)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Editorial Sub-Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'var(--muted)', opacity: 0.5, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
              {contactMode ? 'System Context' : tourActive ? `Index · 0${tourStep} / 0${currentTourArray.length}` : 'Core Operating Interface'}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text)', fontWeight: 400, opacity: 0.9 }}>
              {contactMode ? 'Direct Channel' : tourActive ? 'Guided System Sequence' : 'Vera / Studio Layer'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {(tourActive || contactMode) && (
              <button onClick={endTour} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '0.25rem 0.5rem', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                Cancel
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Minimize interface" style={{ background: 'none', border: 'none', color: 'var(--muted)', opacity: 0.5, cursor: 'pointer', fontSize: '0.75rem', padding: '0.25rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>✕</button>
          </div>
        </div>

        {/* Content Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem' }}>
              <div style={{
                maxWidth: '90%',
                padding: msg.role === 'user' ? '0.5rem 0.8rem' : '0px',
                background: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'none',
                border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderRadius: msg.role === 'user' ? '4px' : '0px',
                fontFamily: 'var(--sans)',
                fontSize: '0.78rem',
                color: 'var(--text)',
                opacity: msg.role === 'user' ? 1 : 0.85,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>

              {msg.role === 'assistant' && i === 0 && messages.length === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', marginTop: '0.5rem' }}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: '0.75rem', padding: '0.5rem 0.75rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease', lineHeight: 1.4 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '2px' }}>
              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: '3px', height: '3px', background: 'var(--text)', opacity: 0.3, borderRadius: '50%', display: 'inline-block', animation: `chatDot 1.4s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Action Controls Deck */}
        <div style={{ padding: '0px 1.25rem 0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
          {(!tourActive && !contactMode && (lastMsg?.tourAction?.offerTour || TOUR_OFFER_PATTERN.test(lastMsg?.content ?? ''))) && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <TourButton onClick={() => startTour('product')}>Product & AI Tour</TourButton>
              <TourButton onClick={() => startTour('design')}>Production Artifacts Tour</TourButton>
              <TourButton onClick={() => startTour('web3')}>Web3 Engine Tour</TourButton>
            </div>
          )}

          {tourActive && !loading && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {nextStepConfig ? (
                <TourButton onClick={advanceTour}>{currentStepConfig?.nextLabel?.replace('→', '').trim() || 'Next Phase'}</TourButton>
              ) : (
                <TourButton onClick={initiateContactFlow}>Sync Workspace</TourButton>
              )}
              <TourButton secondary onClick={endTour}>Exit Journey</TourButton>
            </div>
          )}
        </div>

        {/* Console Input Line */}
        <div style={{ padding: '0.75rem 1.25rem 1.25rem 1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              contactMode 
                ? !contactName ? "Specify identity..." : !contactEmail ? "Specify communications route..." : "Draft prompt payload..."
                : "Ask anything..."
            }
            rows={1}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '4px',
              color: 'var(--text)',
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              padding: '0.55rem 0.75rem',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.5,
              maxHeight: '72px',
              overflowY: 'auto',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.06)')}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Submit intent payload"
            style={{
              background: input.trim() && !loading ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '4px',
              color: 'var(--text)',
              opacity: input.trim() && !loading ? 1 : 0.25,
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              padding: '0.55rem 0.75rem',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if(input.trim() && !loading) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { if(input.trim() && !loading) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            →
          </button>
        </div>
      </div>

      {/* Luxury System Dock Trigger Pin */}
      <div style={{ position: 'fixed', bottom: 'clamp(1rem, 3vw, 1.75rem)', right: 'clamp(1rem, 3vw, 2.5rem)', zIndex: 1000, opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close system layer' : 'Open system layer'}
          style={{
            position: 'relative',
            background: 'rgba(12, 12, 12, 0.9)',
            border: open ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.55rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backdropFilter: 'blur(16px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 16px 32px -8px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = open ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* Subtle rare accent state indicator */}
          <span style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: open ? 'var(--text)' : 'var(--accent)', 
            display: 'inline-block',
            boxShadow: open ? 'none' : '0 0 8px var(--accent)'
          }} />
          {open ? 'Close' : 'Ask Vera'}
        </button>
      </div>

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.2; transform: translateY(0px); }
          40% { opacity: 1; transform: translateY(-1px); }
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
        background: secondary ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
        border: secondary ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '4px',
        color: secondary ? 'var(--muted)' : 'var(--text)',
        fontFamily: 'var(--mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '0.45rem 0.8rem',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        if (secondary) { e.currentTarget.style.color = 'var(--text)' }
        else {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
        }
      }}
      onMouseLeave={e => {
        if (secondary) { e.currentTarget.style.color = 'var(--muted)' }
        else {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
        }
      }}
    >
      {children}
    </button>
  )
}