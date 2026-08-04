'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ─── CONTENT ─────────────────────────────────────────────────────────────────
// All copy lives here so the JSX below stays purely structural.

const ENGAGEMENTS = [
  {
    label: 'For teams that need clarity before they build.',
    title: 'Discovery & Product Strategy',
    items: ['Product strategy', 'UX research', 'Technical direction', 'AI opportunity assessment', 'Product roadmap'],
  },
  {
    label: 'Design digital products that balance usability, business goals and technical feasibility.',
    title: 'Product Design',
    items: ['UX/UI design', 'Design systems', 'Interactive prototypes', 'Validation', 'Developer handoff'],
  },
  {
    label: 'Turn ideas into production-ready software.',
    title: 'Product Engineering',
    items: ['SaaS applications', 'AI integrations', 'Internal tools', 'Full-stack development', 'Deployment'],
  },
  {
    label: 'Design systems where humans and AI work together.',
    title: 'AI Workflow Design',
    items: ['AI copilots', 'Workflow automation', 'Knowledge systems', 'Evaluation pipelines', 'Internal AI tools'],
  },
  {
    label: 'Design and build blockchain products.',
    title: 'Web3 Product Development',
    items: ['Smart contracts', 'Web3 frontends', 'Protocol UX', 'Token systems', 'MVP development'],
  },
]

const MODELS = [
  {
    name: 'Discovery Sprint',
    priceLabel: 'Typical investment',
    price: 'Starting at $2,500',
    idealFor: ['Validating ideas', 'Product direction', 'Technical planning'],
    included: ['Workshop', 'Product roadmap', 'Technical recommendations', 'Next steps'],
    featured: false,
  },
  {
    name: 'MVP Partnership',
    priceLabel: 'Typical investment',
    price: 'Starting at $10,000',
    idealFor: ['Startups', 'AI products', 'SaaS', 'Internal tools'],
    included: ['Strategy', 'UX/UI', 'Development', 'Deployment'],
    featured: true,
  },
  {
    name: 'Fractional Product Partner',
    priceLabel: 'Investment',
    price: 'Custom monthly engagement',
    idealFor: ['Companies needing continuous product strategy, design and engineering'],
    included: [],
    featured: false,
  },
]

const INDUSTRIES = ['AI Products', 'SaaS', 'Developer Tools', 'Web3', 'Startups', 'Innovation Teams']

const PROCESS = [
  { step: 'Understand', description: 'Clarify the problem, the user, and the constraints before any solution takes shape.' },
  { step: 'Model', description: 'Map the system — data, logic, and technical architecture — so complexity is visible early.' },
  { step: 'Design', description: 'Shape the interface and experience around real usage, not assumptions.' },
  { step: 'Build', description: 'Ship production-grade code, iterating in the open as the product takes form.' },
  { step: 'Deploy', description: 'Release to real users with monitoring, security, and stability in place.' },
  { step: 'Learn', description: 'Study what the data and users reveal, then feed it back into the next cycle.' },
]

const PRODUCTS = [
  { name: 'Vera', description: 'AI interface for navigating products and portfolios.', status: 'In Development' },
  { name: 'Common Ground', description: 'Ontology-based market positioning analysis.', status: 'In Development' },
  { name: 'Web3 Builder', description: 'AI-assisted Web3 application builder with automated deployment and testing.', status: 'In Development' },
]

const DIFFERENTIATORS = [
  'One partner instead of multiple specialists.',
  'Strategy, design and engineering connected from day one.',
  'AI-native workflows that accelerate execution without replacing human judgment.',
  'Rapid iteration from idea to production.',
]

const GOOD_FIT = [
  "You're validating a new product.",
  'You need strategy and execution.',
  "You're building AI products.",
  "You're building Web3 products.",
  'You want one technical partner.',
]

const NOT_FIT = [
  "You're looking for the cheapest freelancer.",
  'You need a large production agency.',
  'You already have a finished specification and only need implementation.',
  'Your priority is high-volume marketing production.',
]

const FAQS = [
  {
    q: 'Do you work internationally?',
    a: "Yes. I'm based in Medellín and work remotely with clients across the US, Latin America, and Europe, with overlap-friendly hours.",
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes — especially early-stage and pre-seed teams that need to validate direction before committing to a full build.',
  },
  {
    q: 'Can you join an existing team?',
    a: "Yes. I work as a fractional product partner or embedded contributor alongside your existing team, not just as an outside vendor.",
  },
  {
    q: 'Do you build the software yourself?',
    a: 'Yes. I design and ship the code myself — no handoff to a separate development team, no translation loss between design and build.',
  },
  {
    q: 'Do you use AI?',
    a: "Yes, throughout — for architecture, code, and workflow design. It's part of how I work, not a separate line item.",
  },
  {
    q: 'Do you build Web3 products?',
    a: 'Yes, end to end — from smart contracts and protocol design through to the frontend, with a security-conscious approach to contract work.',
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function WorkWithMePage() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

      {/* Background grid, matches site-wide pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(200,240,74,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,74,0.02) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          ...fadeIn(0.1)
        }}>
          Work With Me
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: '2rem',
          maxWidth: '18ch',
          ...fadeIn(0.2)
        }}>
          Build products without managing five different specialists.
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'var(--text)',
          maxWidth: '58ch',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: '2.5rem',
          ...fadeIn(0.3)
        }}>
          I help founders and product teams turn ideas into production-ready products by combining product strategy, design, engineering, and AI workflows into one continuous partnership.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
          <Link href="#contact" style={primaryButtonStyle}>
            Start a Project →
          </Link>
          <Link href="/" style={secondaryButtonStyle}>
            View My Work
          </Link>
        </div>
      </section>

      {/* ── WAYS WE CAN WORK TOGETHER ───────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>How We Can Work Together</Label>
        <SectionTitle>Five ways to bring me into what you're building.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {ENGAGEMENTS.map((e) => (
            <div key={e.title} style={cardStyle}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0 0 0.6rem', color: 'var(--text)' }}>
                {e.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55, fontWeight: 300, marginBottom: '1.25rem' }}>
                {e.label}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {e.items.map((item) => (
                  <li key={item} style={{
                    fontSize: '0.8rem',
                    color: 'var(--text)',
                    fontWeight: 300,
                    padding: '0.5rem 0',
                    borderTop: '1px solid var(--border)',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ───────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Engagement Models</Label>
        <SectionTitle>Sold as outcomes, not hours.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {MODELS.map((m) => (
            <div key={m.name} style={{
              ...cardStyle,
              borderColor: m.featured ? 'var(--accent)' : 'var(--border)',
              position: 'relative',
            }}>
              {m.featured && (
                <span style={{
                  position: 'absolute',
                  top: '-0.65rem',
                  left: '1.75rem',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  padding: '0.25rem 0.6rem',
                }}>
                  Most Common
                </span>
              )}
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 400, margin: '0.5rem 0 1rem', color: 'var(--text)' }}>
                {m.name}
              </h3>

              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {m.priceLabel}
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1.5rem' }}>
                {m.price}
              </p>

              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Ideal for
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem' }}>
                {m.idealFor.map((item) => (
                  <li key={item} style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                    {item}
                  </li>
                ))}
              </ul>

              {m.included.length > 0 && (
                <>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Included
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {m.included.map((item) => (
                      <li key={item} style={{
                        fontSize: '0.8rem',
                        color: 'var(--text)',
                        fontWeight: 300,
                        padding: '0.4rem 0',
                        borderTop: '1px solid var(--border)',
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Industries</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
          {INDUSTRIES.map((industry) => (
            <span key={industry} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '0.45rem 0.9rem',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>My Process</Label>
        <SectionTitle>One continuous cycle, not a handoff chain.</SectionTitle>

        <div style={{ marginTop: '3rem', maxWidth: '640px' }}>
          {PROCESS.map((p, i) => (
            <div key={p.step} style={{ display: 'flex', gap: '1.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '2rem' }}>
                <span style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }} />
                {i < PROCESS.length - 1 && (
                  <span style={{ width: '1px', flex: 1, background: 'var(--border)', minHeight: '3rem' }} />
                )}
              </div>
              <div style={{ paddingBottom: i < PROCESS.length - 1 ? '2rem' : 0 }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 0.4rem', color: 'var(--text)' }}>
                  {p.step}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS I'M BUILDING ───────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Products I'm Building</Label>
        <SectionTitle>I don't only provide services. I build original software.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {PRODUCTS.map((p) => (
            <div key={p.name} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 400, margin: 0, color: 'var(--text)' }}>
                  {p.name}
                </h3>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)',
                  padding: '0.25rem 0.5rem',
                  whiteSpace: 'nowrap',
                }}>
                  {p.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CLIENTS WORK WITH ME ────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Why Clients Work With Me</Label>
        <SectionTitle>The differentiator isn't speed. It's continuity.</SectionTitle>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {DIFFERENTIATORS.map((d, i) => (
            <div key={d} style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1.5rem 2rem',
              borderBottom: i < DIFFERENTIATORS.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0 }}>
                0{i + 1}
              </span>
              <span style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5 }}>
                {d}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARE WE A GOOD FIT ───────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Are We a Good Fit?</Label>
        <SectionTitle>Worth knowing before we talk.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          <div style={cardStyle}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              We're a great fit if
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {GOOD_FIT.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 300, padding: '0.6rem 0', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              We may not be the best fit if
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NOT_FIT.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 300, padding: '0.6rem 0', lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>FAQ</Label>
        <SectionTitle>Questions worth answering upfront.</SectionTitle>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem' }}>
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i
            return (
              <div key={f.q} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.5rem 2rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    font: 'inherit',
                    color: 'var(--text)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500 }}>
                    {f.q}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '1rem', color: 'var(--accent)', flexShrink: 0 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    padding: '0 2rem 1.5rem',
                    maxWidth: '60ch',
                  }}>
                    {f.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section id="contact" style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '1.5rem', lineHeight: 1.05 }}>
          Let's build something worth shipping.
        </h2>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '1rem',
          color: 'var(--muted)',
          maxWidth: '50ch',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6,
          fontWeight: 300,
        }}>
          Whether you're exploring an idea or scaling an existing product, I'd love to learn what you're building.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://cal.com/davidraigoza" target="_blank" rel="noopener noreferrer" style={primaryButtonStyle}>
            Book a Discovery Call →
          </a>
          <a href="mailto:hello@davidraigoza.design" style={secondaryButtonStyle}>
            Email Me
          </a>
        </div>
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
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} David Raigoza Studio
        </span>
      </footer>
    </main>
  )
}

// ─── SHARED STYLE TOKENS ─────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  padding: '1.75rem',
  background: 'rgba(255,255,255,0.01)',
}

const primaryButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--bg)',
  background: 'var(--text)',
  padding: '0.85rem 2rem',
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'opacity 0.2s ease',
}

const secondaryButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--text)',
  background: 'transparent',
  border: '1px solid var(--border)',
  padding: '0.8rem 2rem',
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'opacity 0.2s ease',
}

// ─── SHARED HELPER COMPONENTS ─────────────────────────────────────────────────
// If these already exist as a shared module elsewhere in the project
// (e.g. from the Bruma case study page), import them from there instead
// of duplicating the definitions below.

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--accent)',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 300,
      color: 'var(--text)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      maxWidth: '22ch',
    }}>
      {children}
    </h2>
  )
}