'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ─── CONTENT ─────────────────────────────────────────────────────────────────
// All copy lives here so the JSX below stays purely structural.

const PROBLEMS = [
  'Product ambiguity — you know something should exist, not what it is yet.',
  'Slow development caused by too much coordination between specialists.',
  'Design and engineering handoffs that lose context every time work changes hands.',
  'Getting stuck between a prototype and something you can actually ship.',
  'Knowing what to build, but not having the person to carry it across the finish line.',
  'Having an existing team, but needing extra product/design/engineering capacity for one initiative.',
]

const WAYS = [
  {
    tag: '01',
    title: 'Find the Product',
    subtitle: 'You have an idea. Let’s figure out what’s actually worth building.',
    includes: [
      'Product strategy & problem framing',
      'UX research',
      'Technical direction',
      'AI opportunity assessment',
      'Interactive prototype',
      'Product roadmap',
    ],
    outcome: 'A clearer product direction and a concrete plan for what to build next.',
  },
  {
    tag: '02',
    title: 'Build the Product',
    subtitle: 'From product direction to a working MVP.',
    includes: [
      'Product strategy & UX/UI',
      'System architecture',
      'Full-stack development',
      'AI integrations',
      'Database & backend',
      'Deployment',
    ],
    outcome: 'A functional product that can reach real users and generate real learning.',
  },
  {
    tag: '03',
    title: 'Accelerate the Product',
    subtitle: 'Your team doesn’t need another pair of hands. It needs momentum.',
    includes: [
      'A new product or feature',
      'A prototype or redesign',
      'AI integration',
      'A complex technical interaction',
      'An initiative that has stalled',
      'Bridging product, design & engineering',
    ],
    outcome: 'An initiative that moves again, without waiting to hire and onboard.',
  },
  {
    tag: '04',
    title: 'Keep the Product Moving',
    subtitle: 'Ongoing product care and iteration without another full-time hire.',
    includes: [
      'Bug fixes & technical maintenance',
      'Dependency & infrastructure updates',
      'Performance & UX improvements',
      'Small feature iterations',
      'Analytics, SEO/AEO',
      'AI integrations',
    ],
    outcome: 'A product that keeps improving after launch, without staffing up to do it.',
  },
]

const CAPABILITIES = [
  'Product Strategy',
  'System Architecture',
  'Product Design',
  'Full-Stack Engineering',
  'AI-Native Workflows',
]

// ─── ENGAGEMENT MODELS ───────────────────────────────────────────────────────
// Every card shares the exact same 7-field shape on purpose: eyebrow → title →
// one-line description → price → ideal-for → outcome → CTA. No card is allowed
// to carry extra fields (e.g. a deliverables list) — that asymmetry was what
// made the four cards look like an uneven spreadsheet instead of one ladder.

interface PricingTier {
  eyebrow: string
  title: string
  description: string
  price: string
  idealFor: string[]
  outcome: string
  cta: { label: string; href: string }
}

const PRICING: PricingTier[] = [
  {
    eyebrow: 'Start Here',
    title: 'Product Clarity',
    description: 'Not sure what to build, fix, or prioritize? Get a focused assessment before committing to a larger engagement.',
    price: '$300–$500',
    idealFor: [
      'Founders with an idea',
      'Teams unsure what to prioritize',
      'A second opinion before a bigger commitment',
    ],
    outcome: 'A clear view of what deserves attention and what to do next.',
    cta: { label: 'Start with Product Clarity →', href: 'mailto:hello@davidraigoza.design' },
  },
  {
    eyebrow: 'Define the Product',
    title: 'Discovery Sprint',
    description: 'Turn an ambiguous product idea into a defined direction, architecture and prototype.',
    price: 'Starting at $2,500',
    idealFor: [
      'Founders with an idea',
      'Product direction & validation',
      'Technical planning',
    ],
    outcome: 'A concrete product definition and roadmap ready for execution.',
    cta: { label: 'Book a Discovery Call →', href: 'https://cal.com/davidraigoza' },
  },
  {
    eyebrow: 'Build the Product',
    title: 'MVP Partnership',
    description: 'Take a defined product from strategy and design through engineering and a working MVP.',
    price: 'Starting at $10,000',
    idealFor: [
      'Startups and small teams',
      'AI products, SaaS and internal tools',
      'A scoped product ready to build',
    ],
    outcome: 'A working product, built from strategy through deployment.',
    cta: { label: 'Book a Discovery Call →', href: 'https://cal.com/davidraigoza' },
  },
  {
    eyebrow: 'Accelerate the Product',
    title: 'Fractional Product Partner',
    description: 'Ongoing product strategy, design and engineering support without adding another full-time team.',
    price: 'Custom monthly engagement',
    idealFor: [
      'Teams that already have engineers',
      'A defined product initiative',
      'Teams that need senior product direction',
    ],
    outcome: 'Consistent product momentum without an agency-sized process.',
    cta: { label: 'Book a Discovery Call →', href: 'https://cal.com/davidraigoza' },
  },
]

// De-duplicated step labels, in order, for the progression strip.
const COMMITMENT_LADDER = [
  { label: 'Product Clarity', price: '$300–$500' },
  { label: 'Discovery Sprint', price: '$2,500+' },
  { label: 'MVP Partnership', price: '$10,000+' },
  { label: 'Fractional Partner', price: 'Custom' },
]

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

const WHY_MODEL = [
  {
    tag: 'Instead of a freelancer',
    title: 'You’re not hiring a specialist for one task.',
    body: 'You’re hiring one person who can carry the product across disciplines. A developer is the right call once a spec is finished and all that’s left is implementation. I’m strongest when the problem still needs product thinking.',
  },
  {
    tag: 'Instead of an agency',
    title: 'Not because agencies are slow. Because of the structure.',
    body: 'Traditional agency structures add coordination, handoffs and overhead that are often unnecessary for early-stage product work. The studio stays deliberately small: fewer handoffs, less context loss, shorter feedback loops, no account-management layer between you and the work.',
  },
  {
    tag: 'Instead of hiring internally',
    title: 'Hiring makes sense when you need permanent capacity.',
    body: 'I make sense when you need to test an idea before a major commitment, move a product forward before building a larger team, add senior cross-functional capability temporarily, or ship a defined initiative without hiring several specialists for one project.',
  },
]

const DIFFERENTIATORS = [
  'Continuity — one person carries context from problem to production.',
  'Cross-functional execution — strategy, design and engineering connected from day one.',
  'Lower coordination overhead — fewer handoffs, less interpretation, less rework.',
  'AI-native acceleration — part of how the studio works, not the pitch.',
  'Speed, as a consequence of the above — not the primary promise.',
]

const GOOD_FIT = [
  'You have a promising idea that needs to become a coherent, buildable product.',
  'Your AI or product concept is technically interesting but hard to understand, use, demonstrate or bring to market.',
  'You need product strategy, design and engineering connected — without coordinating multiple specialists.',
  'A technically complex product needs a clearer interface, workflow or user experience.',
  'You need senior product/design/engineering capability without building an agency or a full team.',
]

const NOT_FIT = [
  'You’re looking for the cheapest possible freelancer.',
  'You need a high-volume production agency or a generic web development shop.',
  'You need marketing production, not product work.',
  'You have a finished spec and only need implementation — a developer is the better fit.',
  'You need a large production team or a permanent full-time hire.',
]

const FAQS = [
  {
    q: 'Do you work internationally?',
    a: "Yes. I'm based in Medellín and work remotely with clients internationally.",
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes — particularly founders and small product teams where product thinking and execution need to stay closely connected.',
  },
  {
    q: 'Can you join an existing team?',
    a: 'Yes. The role can be project-based or ongoing, depending on the product initiative.',
  },
  {
    q: 'Do you build the software yourself?',
    a: "Yes. I handle product, design and engineering work directly rather than handing the project across a large production team.",
  },
  {
    q: 'Do you use AI?',
    a: "Yes. AI-native tools and workflows are part of the studio's process, but AI doesn't replace product judgment, engineering decisions or human validation.",
  },
  {
    q: 'What if I only have an idea?',
    a: 'That’s a strong fit for the Discovery Sprint — figuring out what’s actually worth building comes first.',
  },
  {
    q: 'What if I already have a team?',
    a: 'I can join for a specific initiative where product, design and engineering need to move together.',
  },
  {
    q: 'Do you build Web3 products?',
    a: 'Yes, but complex Web3 and protocol work is treated as a specialized engagement. For smart contracts, formal verification and security-sensitive systems, reach out directly.',
  },
  {
    q: 'What is Product Clarity, exactly?',
    a: 'A paid diagnostic, not a discounted Discovery Sprint. It answers what’s actually going on and what to prioritize next — useful on its own, and it can lead into a Discovery Sprint if a deeper product definition turns out to be needed.',
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
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100dvh', position: 'relative', zIndex: 10 }}>

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
          maxWidth: '20ch',
          ...fadeIn(0.2)
        }}>
          You don't need to assemble a product team for every product problem.
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
          I help early-stage product teams turn complex ideas into clear, working products — closing the gap between product thinking, system architecture, design and engineering, instead of hiring multiple specialists and hoping the handoffs hold.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
          <a href="https://cal.com/davidraigoza" target="_blank" rel="noopener noreferrer" style={primaryButtonStyle}>
            Book a Discovery Call →
          </a>
          <Link href="/" style={secondaryButtonStyle}>
            View My Work
          </Link>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>The Problem I Solve</Label>
        <SectionTitle>Most teams have the pieces. They're missing the connective tissue.</SectionTitle>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.95rem',
          color: 'var(--text)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '68ch',
          marginTop: '1.75rem',
        }}>
          Strategy gets disconnected from design. Design gets disconnected from engineering. AI capabilities get bolted onto products without a coherent interaction model. Complex technical systems become hard to explain, use and ship. I work across the system, from definition through production, to close that gap.
        </p>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '68ch',
          marginTop: '1rem',
        }}>
          The usual alternative is Founder → PM → designer → developer → QA → revisions. Every handoff adds interpretation, delay and rework. Working with me compresses that into one line: Founder or product team ↔ me.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.5rem',
          marginTop: '2.5rem',
        }}>
          {PROBLEMS.map((p) => (
            <div key={p} style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.55 }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUR WAYS TO WORK TOGETHER ──────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>How We Can Work Together</Label>
        <SectionTitle>Four situations. Pick the one that matches where you are.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {WAYS.map((w) => (
            <div key={w.title} style={cardStyle}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>
                {w.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0.5rem 0 0.6rem', color: 'var(--text)' }}>
                {w.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55, fontWeight: 300, marginBottom: '1.25rem' }}>
                {w.subtitle}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem' }}>
                {w.includes.map((item) => (
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
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Outcome
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5 }}>
                {w.outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>What I Bring</Label>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 300, maxWidth: '55ch', marginBottom: '1.25rem' }}>
          Not five separate services. One connected skill set, applied to whichever situation above fits you.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {CAPABILITIES.map((c) => (
            <span key={c} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '0.45rem 0.9rem',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── PRICING / ENGAGEMENT MODELS ─────────────────────────────── */}
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
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          fontWeight: 300,
          marginTop: '1rem',
          maxWidth: '60ch',
        }}>
          These are typical starting points, not rigid packages — actual scope depends on the initiative. Each level is a different depth of commitment, not a separate, unrelated service.
        </p>

        {/* Commitment ladder — makes the progression obvious before the cards */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.6rem',
          marginTop: '2rem',
        }}>
          {COMMITMENT_LADDER.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                border: '1px solid var(--border)',
                padding: '0.5rem 0.85rem',
                background: 'rgba(255,255,255,0.01)',
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text)', letterSpacing: '0.05em' }}>
                  {step.label}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>
                  {step.price}
                </span>
              </div>
              {i < COMMITMENT_LADDER.length - 1 && (
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', flexShrink: 0 }}>→</span>
              )}
            </div>
          ))}
        </div>

        {/*
          Card architecture: every card renders the exact same 7 blocks in the
          exact same order, with no branching on content presence. That's what
          keeps the four columns visually even. No side borders (that read as
          a spreadsheet/pricing-table); a single hairline top border per card
          plus thin internal separators between blocks instead.
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {PRICING.map((m) => (
            <div key={m.title} style={offerCardStyle}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                {m.eyebrow}
              </p>

              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0 0 0.85rem', color: 'var(--text)' }}>
                {m.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.55, marginBottom: '1.25rem', minHeight: '3.3rem' }}>
                {m.description}
              </p>

              <p style={{ fontSize: '1.05rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1.5rem' }}>
                {m.price}
              </p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.1rem', marginBottom: '1.1rem' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  Ideal for
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {m.idealFor.map((item) => (
                    <li key={item} style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.6 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.1rem', marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Outcome
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5 }}>
                  {m.outcome}
                </p>
              </div>

              <a
                href={m.cta.href}
                target={m.cta.href.startsWith('http') ? '_blank' : undefined}
                rel={m.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ ...secondaryButtonStyle, marginTop: 'auto', textAlign: 'center' }}
              >
                {m.cta.label}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── WEB3 SPECIALIST ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          ...cardStyle,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div style={{ maxWidth: '50ch' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Building Something Technically Serious?
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.6 }}>
              Smart contract architecture, protocol UX, token systems and security-sensitive systems are a different category of risk than a normal SaaS or AI MVP. This isn't a standard package — it's a conversation.
            </p>
          </div>
          <a href="mailto:hello@davidraigoza.design" style={secondaryButtonStyle}>
            Talk to Me
          </a>
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

      {/* ── WHY THE LIGHTWEIGHT STUDIO MODEL ────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>Why the Lightweight Studio Model</Label>
        <SectionTitle>The differentiator isn't speed. It's continuity.</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {WHY_MODEL.map((w) => (
            <div key={w.tag} style={cardStyle}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {w.tag}
              </p>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 0.75rem', color: 'var(--text)', lineHeight: 1.3 }}>
                {w.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                {w.body}
              </p>
            </div>
          ))}
        </div>

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
              Good fit
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
              Not a good fit
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

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--muted)',
          fontWeight: 300,
          lineHeight: 1.6,
          marginTop: '1.5rem',
          maxWidth: '60ch',
        }}>
          A missing feature or a rough-looking website isn't the same as a product problem. If there isn't a clear one here, I'll tell you.
        </p>
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
          maxWidth: '52ch',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6,
          fontWeight: 300,
        }}>
          Have an idea, a product problem, or something that needs shipping? Tell me what you're building, where you're stuck, and what you need next.
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

// Engagement-model cards intentionally do NOT use `cardStyle`. A full boxed
// border on all four sides is what made the section read as a pricing table.
// Instead: a single hairline top rule (the visual cue that echoes the "PROBLEMS"
// and other list sections elsewhere on the page), generous internal padding,
// and flex column + auto-margin CTA so the button always sits flush at the
// bottom regardless of how much text sits above it — this is what keeps the
// four cards the same height without padding any of them artificially.
const offerCardStyle: React.CSSProperties = {
  borderTop: '2px solid var(--border)',
  paddingTop: '1.75rem',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
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