'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
// Drop the walkthrough video in this path once you have it.
const WALKTHROUGH_VIDEO_URL = '/work/applyiq/applyiq-walkthrough.mp4'
const LIVE_APP_URL = 'https://applyiq-job-scanner.vercel.app/'

const FEATURES = [
  { step: '01', name: 'Real-Time Telemetry', detail: 'Application funnel state updates propagate to the dashboard in near real-time.' },
  { step: '02', name: 'Schema Migration', detail: 'Moved off a rigid Airtable backend onto a relational Supabase schema built for speed.' },
  { step: '03', name: 'Sub-100ms Updates', detail: 'Interface reflects state changes fast enough to feel instant during active use.' },
  { step: '04', name: 'Automated Pipeline Tracking', detail: 'Custom automation rules move records through funnel stages without manual re-entry.' },
  { step: '05', name: 'Dashboard UI', detail: 'A responsive analytics interface built specifically around outreach and interview tracking.' },
]

const PROCESS = [
  {
    label: 'Relational Schema Design',
    description: 'Modeled the funnel data as a proper relational schema in Supabase, replacing the flat, loosely-typed structure inherited from Airtable.',
  },
  {
    label: 'Real-Time Sync Layer',
    description: 'Wired the dashboard directly to Supabase\'s real-time subscriptions so interface updates land in well under 100ms without manual refresh.',
  },
  {
    label: 'Funnel Automation Rules',
    description: 'Built custom data mapping hooks and automation rules to move applications through stages — applied, interviewing, offer, closed — based on triggered events rather than manual status changes.',
  },
  {
    label: 'Dashboard UI Engineering',
    description: 'Designed and built the analytics interface in Next.js, prioritizing at-a-glance funnel health over dense tabular data.',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'ApplyIQ (SiftParity) — Case Study',
  description:
    'Real-time job application telemetry dashboard designed and built by David Raigoza, migrated from Airtable to Supabase.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
}

export default function ApplyIQCaseStudy() {
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
            Product Architecture · Supabase · Dashboard UI
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
            ApplyIQ.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
              Real-time telemetry, not rigid spreadsheets.
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--text)', maxWidth: '52ch', lineHeight: 1.5, fontWeight: 400, marginBottom: '2.5rem', ...fadeIn(0.3) }}>
            When internal data tables are backed by slow, rigid databases, operations stall. We migrated an enterprise tracking platform from Airtable to Supabase, optimizing the relational schema to support sub-100ms interface updates and real-time telemetry.
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
              Companies don't hire because they like résumés — every new hire is a bet, and slow, rigid data pipelines make it harder to see clearly what's actually happening across an application funnel.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>02 / Technical Execution</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              Migrated the backend from Airtable to Supabase, redesigning the relational schema specifically to support sub-100ms real-time interface updates.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>03 / Operational Scale</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              Automation rules now move records through funnel stages on their own, so the dashboard reflects reality without manual status updates.
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
              <SectionTitle>Real-Time Telemetry In Action</SectionTitle>
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '36ch', textAlign: 'right' }}>
              MIGRATED FROM AIRTABLE TO SUPABASE TO SUPPORT SUB-100MS INTERFACE UPDATES.
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
          <SectionTitle>From Static Tables to Live Signal</SectionTitle>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.7, marginTop: '1rem', marginBottom: '3rem', fontWeight: 300 }}>
            The stack isn't the story — reducing the lag between what's actually happening and what the dashboard shows is.
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