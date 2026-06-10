'use client'

import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    index: '01',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'DeFi neobank on QIE Mainnet, on-chain credit scoring, soulbound identity NFTs, and lending. · Solidity · Next.js · Figma',
    tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'],
    description:
      'A full-stack DeFi neobank built for the QIE Blockchain Hackathon. Deployed smart contracts: vault, identity, lending, credit score.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
  },
  {
    index: '02',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Ethereum · Chainlink · DeFi · Rainfall Derivatives',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    description:
      'A trustless protocol for hedging and trading rainfall risk on Ethereum. Users can take long or short positions on precipitation data; positions settle automatically via Chainlink oracle feeds — no intermediaries.',
    link: 'https://bruma-protocol.vercel.app/',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
  },
  {
    index: '03',
    year: '2026',
    title: 'Raigoza Job Scanner',
    subtitle: 'Next.js · Airtable · No-code Automation · Job Search CRM',
    tags: ['Next.js', 'Airtable', 'No-code', 'Product Design', 'Dashboard'],
    description:
      'A personal job search CRM built on Airtable as the live backend, surfaced through a custom Next.js dashboard. Tracks application funnel stages, interview schedules, and follow-up cadences in real time — the same discipline I apply to design, applied to the search itself.',
    link: 'https://raigoza-job-scanner.vercel.app/',
    linkLabel: 'View Job Scanner',
    accent: 'var(--accent)',
  },
  {
    index: '04',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Jewelry Design · Microcasting · Brand · Material Research',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'],
    description:
      'Built 0→1: designed and hand-cast every piece, engineered a proprietary microcasting system, modeled products in 3D, and built the brand from identity to e-commerce UI. Won Colombia\'s Lápiz de Acero (2013). Exhibited at MAMM and Museo de Antioquia.',
    link: 'https://www.instagram.com/pepe_matilda_?igsh=MXNvdDY1MzR5bmwyNg==',
    linkLabel: 'View project',
    accent: 'var(--amber)',
  },
  {
    index: '05',
    year: '2024',
    title: 'Brand & UI Design',
    subtitle: 'Figma · Blender · Visual Identity · Web Mockups',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'Three complete brand and UI projects — MarigoldBloom, NextStep, and Pepe Matilda — each with a full landing page mockup and style guide covering typography, color systems, 3D-rendered packaging, and logo rationale.',
    link: 'https://www.figma.com/design/iZ4qn2tuRrdexN0ZTRPgkL/PortfolioWix?node-id=0-1&p=f&t=8gcYn6JhelNu0YqZ-0',
    linkLabel: 'View in Figma',
    accent: 'var(--amber)',
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
  },
]

function ProjectGrid() {
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(1)
      else if (window.innerWidth < 900) setCols(2)
      else setCols(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const remainder = projects.length % cols
  const orphanStart = remainder === 0 ? null : Math.floor((cols - remainder) / 2) + 1

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '0',
    }}>
      {projects.map((p, i) => {
        const isFirstOrphan = orphanStart !== null && i === projects.length - remainder
        const col = (i % cols) + 1
        const row = Math.floor(i / cols) + 1

        return (
          <div
            key={p.index}
            style={{
              borderTop: row === 1 ? '1px solid var(--border)' : 'none',
              borderBottom: '1px solid var(--border)',
              borderLeft: col === 1 || isFirstOrphan ? '1px solid var(--border)' : 'none',
              borderRight: '1px solid var(--border)',
              ...(isFirstOrphan ? { gridColumnStart: orphanStart } : {}),
            }}
          >
            <ProjectCard {...p} />
          </div>
        )
      })}
    </div>
  )
}

// Animated glitch text hook
function useGlitch(text: string, active: boolean) {
  const chars = '!<>-_\\/[]{}—=+*^?#'
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

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

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
      {/* ── HERO ─────────────────────────────────────────────────────── */}
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

        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(200,240,74,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} />

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
        }}>
          Medellín, Colombia — {new Date().getFullYear()}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
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

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeFloat 2s ease-in-out infinite',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease 1.5s',
        }}>
          <span>scroll</span>
          <span style={{ color: 'var(--accent)' }}>↓</span>
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
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
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>

        <ProjectGrid />
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
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

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
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

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>
          Contact
        </p>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text)',
          lineHeight: 1,
          marginBottom: '2.5rem',
        }}>
          Let's build something.
        </h2>

        <a
          href="mailto:raigoza.david.j@gmail.com"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
            background: 'var(--accent)',
            padding: '1rem 2.5rem',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'
          }}
        >
          raigoza.david.j@gmail.com
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
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
      `}</style>
    </main>
  )
}