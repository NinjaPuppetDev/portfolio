'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
// Drop the walkthrough video in this path once you have it.
const WALKTHROUGH_VIDEO_URL = '/work/virtual-portfolio-hub/vph-walkthrough.mp4'
const LIVE_APP_URL = 'https://aistudio.google.com/apps/a6a43dcb-0f83-4b02-aed2-169360546c3a?fullscreenApplet=true'

const FEATURES = [
  { step: '01', name: 'Conversational Routing', detail: 'Replaces static case-study browsing with an agent that routes visitors by stated intent.' },
  { step: '02', name: 'Dynamic Project Filtering', detail: 'Case studies surface based on the conversation, not a fixed menu.' },
  { step: '03', name: 'Contextual Telemetry', detail: 'The agent hydrates project detail from a live data layer, not hardcoded copy.' },
  { step: '04', name: 'Hallucination Guardrails', detail: 'Strict scoping — the agent only speaks to what exists in the data layer, nothing invented.' },
  { step: '05', name: 'Bilingual Detection', detail: 'Detects visitor language automatically and responds in kind, no toggle required.' },
]

const PROCESS = [
  {
    label: 'System Prompt Architecture',
    description: 'Designed a strict-scope system prompt with explicit hallucination prevention — the agent only speaks to what exists in the underlying project data, and redirects everything else to direct contact.',
  },
  {
    label: 'Dynamic Data Hydration',
    description: 'Project details are compiled programmatically from a single structured data source at request time, so the agent and the visible case studies never drift out of sync.',
  },
  {
    label: 'Guided Tour State Machine',
    description: 'Built a step-tracking system so the agent can walk a visitor through a sequence of projects in order, injecting per-step context without losing track of where the conversation is.',
  },
  {
    label: 'Bilingual Conversational Layer',
    description: 'Language detection runs per-message, allowing visitors to switch between English and Spanish mid-conversation without breaking context.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Virtual Portfolio Hub — Case Study',
  description:
    'Award-winning conversational portfolio platform designed and built by David Raigoza during an AI bootcamp competition.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
}

export default function VirtualPortfolioHubCaseStudy() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
            AI Agents · Conversational UX · Full-Stack Product
          </p>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '2.5rem',
            ...fadeIn(0.2)
          }}>
            Virtual Portfolio Hub.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
              Replacing static templates with a conversation.
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--text)', maxWidth: '52ch', lineHeight: 1.5, fontWeight: 400, marginBottom: '2.5rem', ...fadeIn(0.3) }}>
            An award-winning platform built during an AI bootcamp competition — combining conversational AI agents with dynamic project filtering and contextual telemetry, so visitors get routed to what they actually need instead of scrolling a static menu.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
            <a
              href="#walkthrough"
              style={{
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
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Watch Build Walkthrough ↓
            </a>
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Open Live App →
            </a>
          </div>
        </section>

        {/* ── STRATEGIC FRAMEWORK ─────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: '4rem clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>01 / The Business Agitation</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              Static portfolios force every visitor through the same linear scroll, regardless of what they actually came looking for — a recruiter, a technical evaluator, and a founder all want to see something different first.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>02 / Technical Execution</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              Built a conversational agent directly into the navigation layer, hydrated from a live project data source, with strict hallucination guardrails so it never invents work that doesn't exist.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>03 / Operational Scale</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              A single system prompt and data layer now powers routing, guided tours, and bilingual support — adding a new case study means adding one data entry, not rebuilding navigation logic.
            </p>
          </div>
        </section>

        {/* ── WALKTHROUGH ─────────────────────────────────────────── */}
        <section id="walkthrough" style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <Label>Live Walkthrough</Label>
              <SectionTitle>Conversational Routing In Action</SectionTitle>
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '36ch', textAlign: 'right' }}>
              BUILT DURING AN AI BOOTCAMP COMPETITION TO DEMONSTRATE HIGH-VELOCITY FULL-STACK DESIGN ENGINEERING.
            </p>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            border: '1px solid var(--border)',
            background: '#0a0a0a',
            overflow: 'hidden',
          }}>
            <video
              src={WALKTHROUGH_VIDEO_URL}
              controls
              playsInline
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* ── FEATURE BREAKDOWN ────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>What It Actually Does</Label>
          <SectionTitle>From Static Menu to Live Routing</SectionTitle>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.7, marginTop: '1rem', marginBottom: '3rem', fontWeight: 300 }}>
            Every piece of the agent's behavior is scoped and data-driven — nothing is a scripted demo path pretending to be intelligent.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {FEATURES.map(item => (
              <div key={item.step} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>{item.step}</span>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--text)' }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS & METHODOLOGY ───────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>Full-Stack Execution</Label>
          <SectionTitle>How We Built It</SectionTitle>

          <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
            {PROCESS.map((step, i) => (
              <div key={step.label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '2rem',
                padding: '2rem',
                borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    0{i + 1}
                  </span>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.3 }}>
                    {step.label}
                  </p>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Ready to scale your product?
          </p>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '2.5rem', lineHeight: 1.05 }}>
            One Team. Zero Handoffs. Full Stack.
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/#contact"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--text)',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              Start a Project →
            </Link>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
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
            ← Back to All Case Studies
          </Link>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} David Raigoza Studio
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── SHARED HELPER COMPONENTS ──────────────────────────────────────────────
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
    }}>
      {children}
    </h2>
  )
}