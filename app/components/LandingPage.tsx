'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProjectCard from './ProjectCard'




// ── PROJECT DATA ───────────────────────────────────────────────────────────────
const web3Projects = [
  {
    index: '01',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'DeFi neobank · On-chain credit scoring · Soulbound NFTs · Lending',
    tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'],
    description:
      'A full-stack DeFi neobank built for the QIE Blockchain Hackathon. Deployed smart contracts: vault, identity, lending, credit score.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '02',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Ethereum · Chainlink · DeFi · Rainfall Derivatives',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    description:
      'A trustless protocol for hedging and trading rainfall risk on Ethereum. Positions settle automatically via Chainlink oracle feeds — no intermediaries.',
    link: 'https://bruma-protocol.vercel.app/',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '06',
    year: '2019–',
    title: 'GitHub',
    subtitle: 'Solidity · Next.js · Smart Contracts · Open Source',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    description:
      'Active repo where the work lives. Smart contracts, protocol interfaces, and the codebase behind this site — version-controlled from first commit to mainnet deploy.',
    link: 'https://github.com/NinjaPuppetDev',
    linkLabel: 'View on GitHub',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
]

const productProjects = [
  {
    index: '03',
    year: '2026',
    title: 'Raigoza Job Scanner',
    subtitle: 'Next.js · Airtable · Groq · Job Search CRM',
    tags: ['Next.js', 'Airtable', 'Groq AI', 'No-code', 'Dashboard'],
    description:
      'A personal job search CRM built on Airtable as the live backend, surfaced through a custom Next.js dashboard. Tracks application funnel stages, interview schedules, and follow-up cadences in real time.',
    link: 'https://raigoza-job-scanner.vercel.app/',
    linkLabel: 'View Job Scanner',
    accent: 'var(--accent)',
    variant: 'product' as const,
  },
]

const brandProjects = [
  {
    index: '04',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Jewelry Design · Microcasting · Brand · Material Research',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'],
    description:
      "Built 0→1: designed and hand-cast every piece, engineered a proprietary microcasting system, modeled products in 3D, and built the brand from identity to e-commerce UI. Won Colombia's Lápiz de Acero (2013). Exhibited at MAMM and Museo de Antioquia.",
    link: '/work/pepe-matilda',
    linkLabel: 'View project',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/pepe-matilda/PepeMatilda.png', // drop your Pepe Matilda product photo URL here
  },
  {
  index: '05',
  year: '2024',
  title: 'NextStep',
  subtitle: 'Brand Identity · UI Design · 3D Rendering',
  tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
  description:
    'Full brand and UI system for a 3D-printed custom footwear brand. Designed the visual identity, landing page, and email marketing — built around a high-contrast dark aesthetic with neon green accents, 3D-rendered product shots, and a customization-first UX flow.',
  link: '/work/next-step',
  linkLabel: 'View case study',
  accent: 'var(--amber)',
  variant: 'brand' as const,
  image: '/work/nextstep/NextStep.png',
},
{
  index: '06',
  year: '2024',
  title: 'Marigold Bloom',
  subtitle: 'Brand Identity · UI Design · Social Media',
  tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
  description:
    'End-to-end brand and UI system for a botanical skincare brand. Developed the visual identity, e-commerce landing page, and Instagram content system — warm earthy tones, serif typography, and a ritual-driven narrative translated consistently from web to social.',
  link: '/work/marigold',
  linkLabel: 'View case study',
  accent: 'var(--amber)',
  variant: 'brand' as const,
  image: '/work/marigold/Marigold.png',
},
]

// ── SECTION DIVIDER ────────────────────────────────────────────────────────────
function SectionLabel({ label, count, accent = 'var(--accent)' }: { label: string; count: number; accent?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '1.25rem',
      marginBottom: '0',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.6rem',
        color: accent,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.55rem',
        color: 'var(--border-hi)',
        letterSpacing: '0.1em',
      }}>
        {String(count).padStart(2, '0')} projects
      </span>
    </div>
  )
}

// ── GRID ───────────────────────────────────────────────────────────────────────
function CardGrid({
  projects,
  cols = 3,
}: {
  projects: typeof web3Projects | typeof brandProjects | typeof productProjects
  cols?: number
}) {
  const [activeCols, setActiveCols] = useState(cols)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setActiveCols(1)
      else if (window.innerWidth < 900) setActiveCols(2)
      else setActiveCols(cols)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [cols])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${activeCols}, 1fr)`,
      gap: '0',
    }}>
      {projects.map((p, i) => {
        const col = (i % activeCols) + 1
        const row = Math.floor(i / activeCols) + 1
        return (
          <div
            key={p.index}
            style={{
              borderTop: row === 1 ? '1px solid var(--border)' : 'none',
              borderBottom: '1px solid var(--border)',
              borderLeft: col === 1 ? '1px solid var(--border)' : 'none',
              borderRight: '1px solid var(--border)',
            }}
          >
            <ProjectCard {...p} />
          </div>
        )
      })}
    </div>
  )
}

// ── GLITCH TEXT ────────────────────────────────────────────────────────────────
function useGlitch(text: string, active: boolean) {
  const chars = '!<>-_\\/[]{}=+*^?#'
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let iter = 0
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) =>
          i < iter ? text[i] : char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      )
      iter += 0.4
      if (iter >= text.length) clearInterval(interval)
    }, 35)
    return () => clearInterval(interval)
  }, [active, text])

  return display
}

function GlitchWord({ word }: { word: string }) {
  const [active, setActive] = useState(false)
  const display = useGlitch(word, active)

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 400)
    return () => clearTimeout(t)
  }, [])

  return <>{display}</>
}

// ── PROMPT BAR ─────────────────────────────────────────────────────────────────
const PROMPTS = [
  'Take me to Pepe Matilda',
  'Show me the Web3 work',
  "I'm a recruiter",
  'Start the design tour',
  'Open QIE Neobank',
]

function PromptBar({ mounted }: { mounted: boolean }) {
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
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        marginTop: '3.5rem',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
      }}
    >
      {/* Input row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          border: `1px solid ${focused ? 'var(--accent)' : 'rgba(200,240,74,0.25)'}`,
          transition: 'border-color 0.15s',
          maxWidth: '640px',
          background: 'rgba(200,240,74,0.06)',
        }}
      >
        {/* Sigil */}
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            padding: '0 1rem',
            flexShrink: 0,
            opacity: 0.8,
            userSelect: 'none',
          }}
        >
          ◈
        </span>

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
            padding: '0.9rem 0',
            letterSpacing: '0.02em',
          }}
        />

        <button
          onClick={() => fire(value)}
          disabled={!value.trim()}
          style={{
            background: value.trim() ? 'var(--accent)' : 'transparent',
            border: 'none',
            borderLeft: `1px solid ${value.trim() ? 'var(--accent)' : 'var(--border)'}`,
            color: value.trim() ? 'var(--bg)' : 'var(--muted)',
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            padding: '0.9rem 1.25rem',
            cursor: value.trim() ? 'pointer' : 'default',
            transition: 'background 0.15s, color 0.15s',
            flexShrink: 0,
          }}
        >
          →
        </button>
      </div>

      {/* Pill suggestions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '0.75rem',
          maxWidth: '640px',
        }}
      >
        {PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => fire(p)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.08em',
              padding: '0.3rem 0.75rem',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Sent confirmation */}
      {pill && (
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            marginTop: '0.5rem',
            opacity: 1,
            animation: 'fadeOut 1.8s ease forwards',
          }}
        >
          ✓ Sent to Vera
        </p>
      )}
    </div>
  )
}

// ── LANDING PAGE ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // ── CONTACT STATE ──────────────────────────────────────────────────────────
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
  
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      heroRef.current.style.setProperty('--py', `${window.scrollY * 0.3}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
  <section
    ref={heroRef}
    id="hero"
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Grid */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(200,240,74,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,240,74,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
      transform: 'translateY(var(--py, 0px))',
      pointerEvents: 'none',
    }} />

    {/* ── MALL RENDER ─────────────────────────────────────────────── */}
    <div style={{
      position: 'absolute',
      top: '50%',
      right: '-8%',
      transform: `translateY(calc(-50% + ${mounted ? '0px' : '24px'}))`,
      width: 'clamp(420px, 58vw, 820px)',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 1.1s ease 0.5s, transform 1.1s ease 0.5s',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Fade mask — left edge blends into bg, bottom fades out */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(to right, var(--bg) 0%, transparent 28%),
          linear-gradient(to top, var(--bg) 0%, transparent 18%)
        `,
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <Image
        src="/images/hero/finalmall.png"
        alt="Blender render — Marigold, Pepe Matilda, and NextStep brand stores"
        width={1456}
        height={816}
        priority
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
        }}
      />
    </div>

    {/* Accent glow — sits behind text, in front of image */}
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '30%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(200,240,74,0.04) 0%, transparent 70%)',
      pointerEvents: 'none',
      filter: 'blur(40px)',
      zIndex: 0,
    }} />

    {/* Date tag */}
    <div style={{
      position: 'absolute',
      top: '2rem',
      right: 'clamp(1.5rem, 5vw, 4rem)',
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--muted)',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 1s ease 0.5s',
      zIndex: 2,
    }}>
      Medellín, Colombia — {new Date().getFullYear()}
    </div>

    {/* Text content */}
    <div style={{ position: 'relative', zIndex: 2 }}>
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.7rem',
        color: 'var(--accent)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease 0.2s',
      }}>
        David Raigoza
      </p>

      <h1 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(3.5rem, 10vw, 9rem)',
        fontWeight: 300,
        lineHeight: 0.92,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '2.5rem',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
      }}>
        {mounted ? <GlitchWord word="Designer." /> : 'Designer.'}
        <br />
        <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
          {mounted ? <GlitchWord word="Builder." /> : 'Builder.'}
        </span>
        <br />
        <span style={{ color: 'var(--muted)' }}>
          {mounted ? <GlitchWord word="Researcher." /> : 'Researcher.'}
        </span>
      </h1>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease 0.8s',
      }}>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          color: 'var(--muted)',
          maxWidth: '38ch',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          Product designer-engineer turned protocol architect.
          Jewelry craft to Ethereum smart contracts — always building
          with both hands and a full mind.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            ['Lápiz de Acero', '2013'],
            ['MA with Honours', '2016'],
            ['EAFIT · Universidad Nacional', ''],
          ].map(([label, year]) => (
            <div key={label} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              display: 'flex',
              gap: '1rem',
            }}>
              <span style={{ color: 'var(--accent)', minWidth: '0.6rem' }}>▸</span>
              <span>{label}</span>
              {year && <span style={{ color: 'var(--border-hi)' }}>{year}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* ── PROMPT BAR ──────────────────────────────────────────────── */}
  <PromptBar mounted={mounted} />

  </section>

  

      {/* ── WORK ──────────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1.5rem',
          marginBottom: '3rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text)',
          }}>
            Selected Work
          </h2>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.15em',
          }}>
            {String(web3Projects.length + productProjects.length + brandProjects.length).padStart(2, '0')} projects
          </span>
        </div>

        {/* Web3 / Protocol track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Protocol & Web3" count={web3Projects.length} accent="var(--accent)" />
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        {/* Low-code / Product track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Product & Tools" count={productProjects.length} accent="var(--accent)" />
          {/* Single card, full width */}
          <div style={{
            border: '1px solid var(--border)',
            borderTop: '1px solid var(--border)',
          }}>
            <ProjectCard {...productProjects[0]} />
          </div>
        </div>

        {/* Brand / Physical track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Brand & Craft" count={brandProjects.length} accent="var(--amber)" />
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '4rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            About
          </p>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 300,
            lineHeight: 1.35,
            color: 'var(--text)',
            fontStyle: 'italic',
          }}>
            "It's not only the technical that drives a project, it's also the emotional."
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            I'm a product designer-engineer from Medellín. I started casting metal,
            ended up writing smart contracts — and somewhere in between I dropped out
            of music school, won a design award, and built a stablecoin for my MA thesis.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            I use AI as a creative and technical amplifier. I research Web3 security
            competitively on Sherlock and Code4rena. I am fluent in both the language
            of materials and the language of protocols.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Currently open to roles at the intersection of product, blockchain,
            and anything that requires someone who thinks with both hands.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {['Solidity', 'Ethereum', 'Chainlink', 'Figma', 'Blender', 'Next.js', 'Airtable', 'AI Tools', 'CAD / 3D'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid var(--border-hi)',
                color: 'var(--muted)',
                padding: '0.25rem 0.6rem',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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

          {/* Left */}
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Contact
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Let's build<br />something.
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '36ch' }}>
              Open to remote roles, freelance projects, and interesting conversations. Based in Medellín — available EST hours.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>
              raigoza.david.j@gmail.com
            </p>
          </div>

          {/* Right — form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
            {contactStatus === 'success' ? (
              <div style={{ border: '1px solid var(--accent)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Message sent ✓
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  Got it — I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setContactStatus('idle')}
                  style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.5rem 1rem', cursor: 'pointer', marginTop: '0.5rem' }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Your name"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', transition: 'border-color 0.15s', width: '100%' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', transition: 'border-color 0.15s', width: '100%' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Message</label>
                  <textarea
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="What are you working on?"
                    rows={5}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: '0.875rem', padding: '0.75rem 1rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.15s', width: '100%', lineHeight: 1.6 }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {/* Error */}
                {contactStatus === 'error' && contactError && (
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#ff4444', letterSpacing: '0.1em' }}>
                    {contactError}
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleContactSubmit}
                  disabled={contactStatus === 'loading'}
                  style={{ background: contactStatus === 'loading' ? 'var(--border)' : 'var(--accent)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2rem', cursor: contactStatus === 'loading' ? 'not-allowed' : 'pointer', transition: 'background 0.2s', alignSelf: 'flex-start' }}
                  onMouseEnter={e => { if (contactStatus !== 'loading') e.currentTarget.style.background = 'var(--text)' }}
                  onMouseLeave={e => { if (contactStatus !== 'loading') e.currentTarget.style.background = 'var(--accent)' }}
                >
                  {contactStatus === 'loading' ? 'Sending…' : 'Send message →'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} David Raigoza
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          Medellín, Colombia
        </span>
      </footer>

      <style>{`
        @keyframes fadeFloat {
        0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
        50% { opacity: 0.8; transform: translateX(-50%) translateY(4px); }
        }
        @keyframes fadeOut {
          0%   { opacity: 1; }
          60%  { opacity: 1; }
          100% { opacity: 0; }
        }
          
      `}</style>
    </main>
  )
}