'use client'

import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    index: '01',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Jewelry Design · Microcasting · Material Research',
    tags: ['Industrial Design', 'Lápiz de Acero', '3D Prototyping', 'MAMM'],
    description:
      'Award-winning jewelry brand exploring the boundary between craft and production. Developed a proprietary microcasting system for complex geometries and collaborated with Museo de Arte Moderno de Medellín and Museo de Antioquia.',
    link: 'https://www.instagram.com/pepe_matilda_?igsh=MXNvdDY1MzR5bmwyNg==',              // ← replace with your Pepe Matilda link
    linkLabel: 'View project',
    accent: 'var(--amber)',
  },
  {
    index: '02',
    year: '2024–2025',
    title: 'Bruma Protocol',
    subtitle: 'Ethereum · Chainlink · DeFi · Rainfall Derivatives',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    description:
      'A trustless protocol for hedging and trading rainfall risk on Ethereum. Users can take long or short positions on precipitation data; positions settle automatically via Chainlink oracle feeds — no intermediaries.',
    link: 'https://bruma-protocol.vercel.app/',              // ← replace with your Bruma link or GitHub repo
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
  },
  {
    index: '03',
    year: '2023–present',
    title: 'Security Research',
    subtitle: 'Smart Contract Auditing · Sherlock · Code4rena',
    tags: ['Solidity', 'Smart Contract Audits', 'Sherlock', 'Code4rena'],
    description:
      'Competitive smart contract security research across public audit contests. Finding vulnerabilities in DeFi protocols — reentrancy, logic errors, oracle manipulation, access control bypasses.',
    link: 'https://github.com/sherlock-audit/2025-12-monolith-stablecoin-factory-NinjaPuppetDev/issues/1',  // ← replace with your GitHub
    linkLabel: 'View GitHub',
    accent: 'var(--accent)',
  },
]

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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax on hero grid lines
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.setProperty('--py', `${y * 0.3}px`)
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
        {/* Grid background */}
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

        {/* Glow orb */}
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

        {/* Top label */}
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

        {/* Main headline */}
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
            gap: '3rem',
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

        {/* Scroll hint */}
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
            03 projects
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1px',
          background: 'var(--border)',
        }}>
          {projects.map(p => (
            <div key={p.index} style={{ background: 'var(--bg)' }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
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
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}>
            I'm a product designer-engineer from Medellín. I started casting metal,
            ended up writing smart contracts — and somewhere in between I dropped out
            of music school, won a design award, and built a stablecoin for my MA thesis.
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}>
            I use AI as a creative and technical amplifier. I research Web3 security
            competitively on Sherlock and Code4rena. I am fluent in both the language
            of materials and the language of protocols.
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}>
            Currently open to roles at the intersection of product, blockchain,
            and anything that requires someone who thinks with both hands.
          </p>

          {/* Stack pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {['Solidity', 'Ethereum', 'Chainlink', 'Figma', 'Next.js', 'AI Tools', 'CAD / 3D'].map(s => (
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
        {/* Background glow */}
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
          href="mailto:david@raigoza.co"
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
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--text)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--accent)'
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