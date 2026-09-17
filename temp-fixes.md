# CardGrid.tsx

```tsx
'use client'

import ProjectCard from './ProjectCard'

interface Project {
  index: string
  year: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  accent: string
  variant: 'web3' | 'product' | 'brand'
  image?: string
}

export default function CardGrid({ projects, cols = 3 }: { projects: Project[]; cols?: number }) {
  const gridClass =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'

  return (
    <div className={`grid ${gridClass} gap-3 sm:gap-4 lg:gap-5`}>
      {projects.map((p, i) => {
        const col = (i % (cols === 1 ? 1 : cols === 2 ? 2 : 3)) + 1
        const row = Math.floor(i / (cols === 1 ? 1 : cols === 2 ? 2 : 3)) + 1

        return (
          <div
            key={p.index}
            className={[
              'overflow-hidden bg-[#0A0A0A]',
              row === 1 ? 'border-t border-white/10' : '',
              col === 1 ? 'border-l border-white/10' : '',
              'border-b border-r border-white/10',
            ].join(' ')}
          >
            <ProjectCard {...p} />
          </div>
        )
      })}
    </div>
  )
}
```

# ProjectCard.tsx

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface ProjectCardProps {
  index: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  year: string
  accent?: string
  variant?: 'web3' | 'brand' | 'product'
  image?: string
  layout?: 'split' | 'stacked'
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    index,
    title,
    subtitle,
    tags,
    description,
    link,
    linkLabel,
    year,
    accent = 'var(--accent)',
    image,
    layout = 'split',
  } = props

  const [hovered, setHovered] = useState(false)
  const active = hovered
  const isExternal = link.startsWith('http')
  const isSplit = layout === 'split'

  const cardChassisStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: '#090909',
    textDecoration: 'none',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    borderTop: hovered ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.08)',
    borderLeft: hovered ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
    borderRight: '1px solid rgba(0, 0, 0, 0.7)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.9)',
    borderRadius: '16px',
    boxShadow: hovered
      ? '0 32px 64px -16px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
      : '0 16px 36px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  const chassisProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: cardChassisStyles,
    className: [
      'group relative flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-[#090909] no-underline transition-all duration-300',
      isSplit ? 'md:flex-row' : '',
      hovered ? 'border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.95)]' : 'border border-white/10 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8)]',
    ].join(' '),
  }

  const cardContent = (
    <div className="flex h-full w-full flex-col justify-between gap-3 bg-[#090909] p-4 sm:p-5 md:gap-4 md:p-6">
      <div className={[
        'flex flex-1 items-stretch gap-4',
        isSplit ? 'flex-col md:flex-row md:gap-6' : 'flex-col',
      ].join(' ')}>
        <div
          className={[
            'relative w-full overflow-hidden rounded-lg border border-white/10 bg-[#040404] md:flex-shrink-0',
            isSplit ? 'aspect-[16/10] md:w-[46%] md:aspect-square md:min-h-[180px] md:max-h-[260px]' : 'aspect-[16/10] md:aspect-[16/10]',
          ].join(' ')}
        >
          {image ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-300 md:scale-[1.03]"
                style={{
                  filter: 'grayscale(100%) brightness(0.75) contrast(1.05)',
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 bg-[#040404] opacity-60 md:opacity-80"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]"
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)]">
              <span
                className="font-[var(--mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[#fff] opacity-70"
                style={{ color: accent }}
              >
                Interactive Artifact
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-1 flex-col justify-start md:w-[54%]">
          <div
            className="font-[var(--mono)] text-[0.7rem] uppercase tracking-[0.15em]"
            style={{ color: accent, marginBottom: '0.4rem' }}
          >
            {index} / {year}
          </div>

          <div
            className="font-[var(--mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] opacity-80"
            style={{ marginBottom: '1.25rem' }}
          >
            Project Artifact · {index}
          </div>

          <h3
            className="mb-3 font-[var(--serif)] text-[clamp(1.65rem,2.6vw,2.45rem)] font-light italic leading-[1.15] tracking-[-0.01em] text-white"
          >
            {title}
          </h3>

          {subtitle && (
            <p
              className="mb-5 font-[var(--mono)] text-[0.625rem] uppercase tracking-[0.08em] leading-[1.4] text-[var(--muted)]"
            >
              {subtitle}
            </p>
          )}

          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] border border-white/10 bg-white/[0.03] px-2 py-1 font-[var(--mono)] text-[0.55rem] uppercase tracking-[0.08em]"
                style={{
                  color: active ? '#FFFFFF' : 'var(--muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={[
          'mt-auto flex gap-3 border-t border-white/10 pt-3',
          isSplit ? 'flex-col md:flex-row md:items-end md:justify-between' : 'flex-col',
        ].join(' ')}
      >
        <p
          className="m-0 max-w-full font-[var(--sans)] text-[clamp(0.85rem,0.95vw,0.92rem)] font-light leading-[1.5] text-[var(--text)] opacity-90 md:max-w-[46ch]"
        >
          {description}
        </p>

        <div className="flex shrink-0 items-center">
          <span
            className="flex items-center gap-2 whitespace-normal font-[var(--mono)] text-[0.65rem] uppercase tracking-[0.14em] sm:whitespace-nowrap"
            style={{ color: accent, fontWeight: 500 }}
          >
            {linkLabel}
            <span
              className="inline-block transition-transform duration-200"
              style={{ transform: active ? 'translateX(4px)' : 'translateX(0)' }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </div>
  )

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" {...chassisProps}>
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={link} {...chassisProps}>
      {cardContent}
    </Link>
  )
}
```

# FloatingChat.tsx

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

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

const PRODUCT_TOUR = [
  { step: 1, path: '/work/virtual-portfolio-hub', nextLabel: 'Next: CommonGround →' },
  { step: 2, path: '/work/common-ground', nextLabel: 'Get in touch →', finalStop: true },
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

const NAV_INTENTS: { patterns: RegExp[]; path: string; label: string }[] = [
  { patterns: [/\bhome(page)?\b/i, /\bstart\b/i, /\bback to (the )?top\b/i], path: '/', label: 'Taking you home.' },
  { patterns: [/\bpepe\s*matilda\b/i], path: '/work/pepe-matilda', label: 'Opening Pepe Matilda.' },
  { patterns: [/\bnext\s*step\b/i], path: '/work/next-step', label: 'Opening NextStep.' },
  { patterns: [/\bmarigold\b/i, /\bmarigold-bloom\b/i], path: '/work/marigold-bloom', label: 'Opening Marigold Bloom.' },
  { patterns: [/\bqie\b/i, /\bneobank\b/i], path: '/work/qie-neobank', label: 'Opening QIE Neobank.' },
  { patterns: [/\bbruma\b/i], path: 'https://bruma-protocol.vercel.app/', label: 'Opening Bruma Protocol.' },
  { patterns: [/\bgithub\b/i, /\brepo\b/i], path: 'https://github.com/NinjaPuppetDev', label: 'Opening GitHub.' },
  { patterns: [/\bvirtual\s*portfolio\b/i, /\bportfolio\s*hub\b/i], path: '/work/virtual-portfolio-hub', label: 'Opening the Virtual Portfolio Hub.' },
  { patterns: [/\bcommon\s*ground\b/i, /\bcommon\s*ground\b/i], path: '/work/common-ground', label: 'Opening CommonGround.' },
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

const NUDGE_DELAY_MS = 3500

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

  const [showNudge, setShowNudge] = useState(false)
  const [nudgeDismissed, setNudgeDismissed] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sendMessageRef = useRef<(text: string, overrideTourType?: TourType, overrideTourStep?: number) => Promise<void>>(async () => {})

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => triggerRef.current?.focus())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true)
      const detail = (e as CustomEvent).detail
      if (detail?.prefill) setInput(detail.prefill)
      if (detail?.autoSend && detail?.message) {
        setTimeout(() => sendMessageRef.current(detail.message), 100)
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

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      if (!open && !nudgeDismissed) setShowNudge(true)
    }, NUDGE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [mounted, open, nudgeDismissed])

  useEffect(() => {
    if (open) setShowNudge(false)
  }, [open])

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

  useEffect(() => {
    sendMessageRef.current = sendMessage
  })

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

  const dismissNudge = () => {
    setShowNudge(false)
    setNudgeDismissed(true)
  }

  const openFromNudge = () => {
    setOpen(true)
  }

  if (!mounted) return null

  const currentTourArray = tourArrayFor(tourType)
  const currentStepConfig = currentTourArray[tourStep - 1]
  const nextStepConfig = currentTourArray[tourStep]
  const lastMsg = messages[messages.length - 1]

  return (
    <>
      <div
        id="portfolio-chat-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio operating system"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: 'clamp(1rem, 3vw, 2.5rem)',
          width: 'min(360px, calc(100vw - 1.5rem))',
          maxWidth: 'calc(100vw - 1.5rem)',
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
              <button
                type="button"
                onClick={endTour}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', color: '#f4f4f5', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '0.25rem 0.5rem', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimize interface"
              className="h-10 w-10 rounded-full text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>
          </div>
        </div>

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
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
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
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Submit intent payload"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
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

      <div
        style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 3vw, 1.75rem)',
          right: 'clamp(1rem, 3vw, 2.5rem)',
          zIndex: 1000,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.6rem',
        }}
      >
        {showNudge && !open && (
          <div
            className="vera-nudge"
            style={{
              position: 'relative',
              fontFamily: 'var(--sans)',
              fontSize: '0.75rem',
              color: 'var(--text)',
              background: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '0.6rem 0.9rem',
              backdropFilter: 'blur(16px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 16px 32px -8px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={openFromNudge}
          >
            Talk to me
            <button
              type="button"
              onClick={e => {
                e.stopPropagation()
                dismissNudge()
              }}
              aria-label="Dismiss message"
              className="h-8 w-8 rounded-full text-zinc-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.65rem',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '22px',
                width: '10px',
                height: '10px',
                background: 'rgba(12, 12, 12, 0.95)',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close system layer' : 'Open system layer'}
          aria-expanded={open}
          aria-controls="portfolio-chat-panel"
          className="vera-blob focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
          style={{
            position: 'relative',
            width: '58px',
            height: '58px',
            background: 'rgba(12, 12, 12, 0.9)',
            border: open ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 16px 32px -8px rgba(0,0,0,0.4)',
            flexShrink: 0,
          }}
        >
          {open ? (
            '✕'
          ) : (
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent)',
            }} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.2; transform: translateY(0px); }
          40% { opacity: 1; transform: translateY(-1px); }
        }

        .vera-blob {
          border-radius: 58% 42% 63% 37% / 41% 55% 45% 59%;
          animation: blobMorph 8s ease-in-out infinite;
          transition: border-radius 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .vera-blob:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.2);
        }

        @keyframes blobMorph {
          0%, 100% { border-radius: 58% 42% 63% 37% / 41% 55% 45% 59%; }
          50% { border-radius: 43% 57% 41% 59% / 58% 44% 56% 42%; }
        }

        .vera-nudge {
          opacity: 0;
          transform: translateY(6px) scale(0.96);
          animation: nudgeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes nudgeIn {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}

function TourButton({ children, onClick, secondary }: { children: React.ReactNode; onClick: () => void; secondary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
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
```
