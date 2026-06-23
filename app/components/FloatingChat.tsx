'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
  tourAction?: TourAction   // injected by tour engine, not sent to API
}

interface TourAction {
  navigate?: string          // internal path or external URL
  nextPrompt?: string        // pre-filled button text for next step
  tourStep?: number
  offerTour?: boolean        // show "Start tour" CTA
}

// ─── TOUR DEFINITION ──────────────────────────────────────────────────────────
// Each stop: what the assistant says, where to navigate, what to offer next
const DESIGN_TOUR = [
  {
    step: 1,
    path: '/work/pepe-matilda',
    intro: "Let's start with Pepe Matilda — an award-winning silver jewelry brand I built from zero. We're talking proprietary microcasting system, Blender 3D modeling, full brand identity, and institutional distribution through MAMM and Museo de Antioquia. It won the Lápiz de Acero in 2013, Colombia's most prestigious industrial design award. Take a look around — when you're ready, I'll take you to the next stop.",
    nextLabel: 'Next: NextStep →',
  },
  {
    step: 2,
    path: '/work/next-step',
    intro: "This is NextStep — a full brand and UI system for a 3D-printed custom footwear concept. I designed the visual identity, the e-commerce landing page, 3D product renders in Blender, and a social media pitch doc. The whole thing runs on a high-contrast dark aesthetic with neon green accents. Ready for the last stop?",
    nextLabel: 'Next: Marigold Bloom →',
  },
  {
    step: 3,
    path: '/work/marigold',
    intro: "Last stop — Marigold Bloom. End-to-end brand and UI for a botanical skincare brand. Warm earthy tones, serif typography, ritual-driven narrative translated from web to social. That's the brand and design track. Want to see my Web3 work next, or would you rather get in touch?",
    nextLabel: 'Get in touch →',
    finalStop: true,
  },
]

const WEB3_TOUR = [
  {
    step: 1,
    path: '/work/qie-neobank',
    intro: "Starting with QIE Neobank — a full-stack DeFi neobank I built for a blockchain hackathon. Six Solidity smart contracts deployed to mainnet: an ERC-4626 yield vault, soulbound identity passport, and an on-chain credit scoring engine with 7-day aging logic. Next.js 16 frontend with RainbowKit, Wagmi, and Viem. Have a look — I'll take you to the next stop when you're ready.",
    nextLabel: 'Next: Bruma Protocol →',
  },
  {
    step: 2,
    path: 'https://bruma-protocol.vercel.app/',
    intro: "This is Bruma Protocol — a trustless rainfall derivatives protocol on Ethereum. Users can hedge and trade rainfall risk with positions that settle automatically via Chainlink oracle feeds. No intermediaries. I designed the smart contract architecture, tokenomics model, and built the full dApp interface. That covers the Web3 track. Want to see the design work, or ready to get in touch?",
    nextLabel: 'Get in touch →',
    finalStop: true,
  },
]

// ─── SUGGESTED PROMPTS ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "I'm a recruiter",
  "I need a designer or developer",
  'Tell me about the Web3 work',
  'Just exploring',
]

// ─── GREETING ─────────────────────────────────────────────────────────────────
const GREETING: Message = {
  role: 'assistant',
  content: "Hi — I'm Vera, the AI built into David's portfolio. I can walk you through his work, answer questions about his background, or give you a guided tour of the projects most relevant to you.\n\nWhat brings you here today?",
}


// ─── HELPERS ──────────────────────────────────────────────────────────────────
function isExternal(path: string) {
  return path.startsWith('http')
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function FloatingChat() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Tour state
  const [tourActive, setTourActive] = useState(false)
  const [tourType, setTourType] = useState<'design' | 'web3' | null>(null)
  const [tourStep, setTourStep] = useState(0)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Listen for open event from hero nudge or any page
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-portfolio-chat', handler)
    return () => window.removeEventListener('open-portfolio-chat', handler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  // ── Tour engine ─────────────────────────────────────────────────────────────
  const startTour = (type: 'design' | 'web3') => {
    const tour = type === 'design' ? DESIGN_TOUR : WEB3_TOUR
    const first = tour[0]

    setTourActive(true)
    setTourType(type)
    setTourStep(1)

    // Navigate to first stop
    if (isExternal(first.path)) {
      window.open(first.path, '_blank')
    } else {
      router.push(first.path)
    }

    // Inject tour message
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: first.intro,
      tourAction: {
        navigate: first.path,
        nextPrompt: tour.length > 1 ? tour[1]?.nextLabel : undefined,
        tourStep: 1,
      },
    }])
  }

  const advanceTour = () => {
    const tour = tourType === 'design' ? DESIGN_TOUR : WEB3_TOUR
    const nextStep = tourStep + 1
    const stop = tour[nextStep - 1]

    if (!stop) {
      // Tour complete — drop to free chat
      setTourActive(false)
      setTourType(null)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's the full tour. Feel free to ask me anything else, or reach out directly at raigoza.david.j@gmail.com",
      }])
      return
    }

    setTourStep(nextStep)

    if (isExternal(stop.path)) {
      window.open(stop.path, '_blank')
    } else {
      router.push(stop.path)
    }

    const nextStop = tour[nextStep] // one ahead
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: stop.intro,
      tourAction: {
        navigate: stop.path,
        nextPrompt: nextStop?.nextLabel ?? (stop.finalStop ? 'Get in touch →' : undefined),
        tourStep: nextStep,
      },
    }])
  }

  const endTour = () => {
    setTourActive(false)
    setTourType(null)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Tour ended. Ask me anything, or reach out at raigoza.david.j@gmail.com",
    }])
  }

  // ── AI message send ──────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }

    // Only send clean role/content to the API — strip tourAction
    const apiMessages = [...messages, userMsg].map(({ role, content }) => ({ role, content }))

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, something went wrong. Try again in a moment.',
        }])
        return
      }

      const content: string = data.content ?? ''

      // Detect tour offers from the AI response
      const offerDesign = /design tour|tour.*design|brand tour|take you through/i.test(content)
      const offerWeb3 = /web3 tour|tour.*web3|protocol tour|blockchain tour/i.test(content)

      setMessages(prev => [...prev, {
        role: 'assistant',
        content,
        tourAction: offerDesign
          ? { offerTour: true }
          : offerWeb3
          ? { offerTour: true }
          : undefined,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Check your network and try again.',
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

  // Last assistant message — used to show tour CTAs
  const lastMsg = messages[messages.length - 1]
  const lastAction = lastMsg?.role === 'assistant' ? lastMsg.tourAction : undefined

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
              {tourActive ? `Tour · ${tourType === 'design' ? 'Brand & Design' : 'Web3'} · ${tourStep}/${tourType === 'design' ? DESIGN_TOUR.length : WEB3_TOUR.length}` : 'Vera'}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>
              {tourActive ? 'Guided tour in progress' : "David's portfolio assistant"}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {tourActive && (
              <button
                onClick={endTour}
                style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.5rem' }}
              >
                Exit tour
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0.25rem' }}
            >
              ✕
            </button>
          </div>
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
      
          {/* Message thread */}
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

                        {msg.role === 'assistant' && i === 0 && messages.length === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
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
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Tour offer buttons — appear under the last assistant message only */}
              {msg.role === 'assistant' && i === messages.length - 1 && (
                <>
                  {/* Tour start offer */}
                  {msg.tourAction?.offerTour && !tourActive && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <TourButton onClick={() => startTour('design')}>Brand & Design tour →</TourButton>
                      <TourButton onClick={() => startTour('web3')}>Web3 tour →</TourButton>
                    </div>
                  )}

                  {/* Tour advance button */}
                  {tourActive && msg.tourAction?.nextPrompt && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <TourButton onClick={advanceTour}>{msg.tourAction.nextPrompt}</TourButton>
                      <TourButton secondary onClick={endTour}>Exit tour</TourButton>
                    </div>
                  )}

                  {/* Final stop — contact CTA */}
                  {tourActive && !msg.tourAction?.nextPrompt && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <TourButton onClick={() => window.location.href = 'mailto:raigoza.david.j@gmail.com'}>Get in touch →</TourButton>
                      <TourButton secondary onClick={endTour}>Keep exploring</TourButton>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Typing indicator */}
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

        {/* Input */}
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tourActive ? 'Ask a question or use the buttons above…' : 'Ask anything…'}
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

      {/* ── TRIGGER BUTTON + PULSE ────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 'clamp(1rem, 3vw, 1.75rem)',
        right: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 1000,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
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

// ─── TOUR BUTTON ──────────────────────────────────────────────────────────────
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