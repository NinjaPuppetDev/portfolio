'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const FIGMA_URL = 'https://www.figma.com/design/iZ4qn2tuRrdexN0ZTRPgkL/PortfolioWix?node-id=0-1&p=f&t=8gcYn6JhelNu0YqZ-0'

// ─── PALETTE — locked to Marigold's warm botanical palette ───────────────────
const MG = {
  bg:      '#F5EFE6',   // warm cream
  surface: '#EDE4D8',   // slightly deeper warm
  border:  '#D9CEBA',   // soft tan
  text:    '#1C1410',   // near-black warm
  muted:   '#7A6A58',   // warm brown-grey
  rust:    '#C4713A',   // terracotta / marigold orange accent
  sage:    '#5C6B4E',   // botanical sage green (secondary)
  serif:   'var(--serif)',
  sans:    'var(--sans)',
  mono:    'var(--mono)',
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DELIVERABLES = [
  { label: 'Brand Identity',    note: 'Logo system, serif + script pairing, warm botanical color language, custom iconography' },
  { label: 'Landing Page',      note: 'Full e-commerce UI — hero, product grid, ingredients section, ritual steps, testimonial, brand story' },
  { label: 'Social Media',      note: 'Instagram grid system, brand mission doc, visual direction guide, and content tile set' },
  { label: '3D Rendering',      note: 'Product packaging renders — serum, cream jar, and cleanser tube — in warm natural-light style' },
]

const BRAND_VALUES = [
  { icon: '✦', label: 'Botanical',   note: 'Every formula grounded in plant-derived ingredients.' },
  { icon: '✦', label: 'Gentle',      note: 'Designed for sensitive skin and everyday rituals.' },
  { icon: '✦', label: 'Effective',   note: 'Science-backed botanicals, not just aesthetics.' },
  { icon: '✦', label: 'Made for you', note: 'Small-batch, ethically sourced, sustainable packaging.' },
]

const RITUAL_STEPS = [
  { step: '01', label: 'Cleanse',  note: 'Remove impurities without stripping.' },
  { step: '02', label: 'Hydrate',  note: 'Restore moisture and prepare skin.' },
  { step: '03', label: 'Restore',  note: 'Nourish with potent botanical actives.' },
  { step: '04', label: 'Protect',  note: 'Shield and support all day long.' },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Marigold Bloom — Brand & UI Design',
  description: 'End-to-end brand identity and UI design for Marigold Bloom, a botanical skincare brand. Designed by David Raigoza.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
  dateCreated: '2024',
  keywords: 'Marigold Bloom, David Raigoza, brand design, skincare UI, Figma, Blender, botanical, portfolio',
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function MarigoldBloomCaseStudy() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const fade = (delay = 0): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  })

  const section = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    ...extra,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: MG.bg, color: MG.text, minHeight: '100vh' }}>

        {/* ── NAV ──────────────────────────────────────────────────── */}
        <nav style={{
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          borderBottom: `1px solid ${MG.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(245,239,230,0.88)',
          backdropFilter: 'blur(12px)',
        }}>
          <Link
            href="/"
            style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.muted, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = MG.rust)}
            onMouseLeave={e => (e.currentTarget.style.color = MG.muted)}
          >
            ← Back
          </Link>
          <span style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.1em', opacity: 0.6 }}>
            06 / 2024
          </span>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle botanical warmth glow */}
          <div style={{
            position: 'absolute', top: 0, right: '-10%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(196,113,58,0.07) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(80px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fade(0.1) }}>
              Case Study · Brand & UI Design · 2024
            </p>

            {/* Logotype — mirrors the brand's own serif + script pairing feel */}
            <h1 style={{ fontFamily: MG.serif, fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: '0.5rem', ...fade(0.2) }}>
              Marigold
            </h1>
            <h1 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, color: MG.rust, marginBottom: '2.25rem', ...fade(0.3) }}>
              Bloom
            </h1>

            <p style={{ fontFamily: MG.sans, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: MG.muted, maxWidth: '52ch', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.25rem', ...fade(0.4) }}>
              End-to-end brand and UI system for a botanical skincare brand.
              Visual identity, e-commerce landing page, and Instagram content
              system — warm earthy tones, serif typography, and a ritual-driven
              narrative translated consistently from web to social.
            </p>

            <p style={{ fontFamily: MG.mono, fontSize: '0.68rem', color: MG.muted, letterSpacing: '0.1em', marginBottom: '3rem', opacity: 0.7, ...fade(0.45) }}>
              Figma · Blender · Brand Systems · UI Design · Social Media
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fade(0.55) }}>
              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: MG.mono, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', background: MG.rust, padding: '0.85rem 2.25rem', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.text)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.rust)}
              >
                Open in Figma →
              </a>
            </div>
          </div>
        </section>

        {/* ── DELIVERABLES STRIP ───────────────────────────────────── */}
        <div style={{ borderTop: `1px solid ${MG.border}`, borderBottom: `1px solid ${MG.border}`, background: MG.surface }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          }}>
            {DELIVERABLES.map((d, i) => (
              <div key={d.label} style={{
                padding: '1.5rem 1.75rem',
                borderRight: i < DELIVERABLES.length - 1 ? `1px solid ${MG.border}` : 'none',
              }}>
                <p style={{ fontFamily: MG.mono, fontSize: '0.55rem', color: MG.rust, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p style={{ fontFamily: MG.serif, fontSize: '1rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.35rem' }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: MG.sans, fontSize: '0.75rem', color: MG.muted, lineHeight: 1.6 }}>
                  {d.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── LANDING PAGE SCREENSHOT ───────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <MGLabel>Web design</MGLabel>
          <MGSectionTitle>Landing page</MGSectionTitle>

          <p style={{ fontFamily: MG.sans, fontSize: '0.9rem', color: MG.muted, maxWidth: '56ch', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            Full e-commerce UI — botanical hero with product photography,
            featured collection grid, ingredients section, ritual steps,
            customer testimonial, brand story, and newsletter signup.
          </p>

          <div style={{ border: `1px solid ${MG.border}`, overflow: 'hidden' }}>
            <Image
              src="/work/marigold/MarigoldLandingPage.png"
              alt="Marigold Bloom landing page — Skincare rooted in gentle rituals, full e-commerce page mockup"
              width={1440}
              height={2400}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.rust, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            >
              Open in Figma →
            </a>
          </div>
        </section>

        {/* ── BRAND VALUES ─────────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${MG.border}`, background: MG.surface }}>
          <div style={section()}>
            <MGLabel>Brand system</MGLabel>
            <MGSectionTitle>Rooted in values.</MGSectionTitle>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '0',
              border: `1px solid ${MG.border}`,
              marginTop: '2.5rem',
              overflow: 'hidden',
            }}>
              {BRAND_VALUES.map((v, i) => (
                <div key={v.label} style={{
                  padding: '2rem 1.75rem',
                  borderRight: i < BRAND_VALUES.length - 1 ? `1px solid ${MG.border}` : 'none',
                  background: MG.bg,
                }}>
                  <p style={{ fontFamily: MG.serif, fontSize: '1.5rem', color: MG.rust, marginBottom: '0.75rem' }}>✦</p>
                  <p style={{ fontFamily: MG.serif, fontSize: '1.05rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.4rem' }}>
                    {v.label}
                  </p>
                  <p style={{ fontFamily: MG.sans, fontSize: '0.8rem', color: MG.muted, lineHeight: 1.65 }}>
                    {v.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Ritual steps */}
            <div style={{ marginTop: '3rem' }}>
              <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Your daily ritual
              </p>
              <p style={{ fontFamily: MG.serif, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic', color: MG.text, marginBottom: '2rem' }}>
                Simple steps. Radiant results.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0',
                border: `1px solid ${MG.border}`,
                overflow: 'hidden',
              }}>
                {RITUAL_STEPS.map((r, i) => (
                  <div key={r.step} style={{
                    padding: '1.75rem',
                    borderRight: i < RITUAL_STEPS.length - 1 ? `1px solid ${MG.border}` : 'none',
                    background: MG.bg,
                  }}>
                    <p style={{ fontFamily: MG.mono, fontSize: '0.55rem', color: MG.rust, letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.7 }}>
                      {r.step}
                    </p>
                    <p style={{ fontFamily: MG.serif, fontSize: '1rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.35rem' }}>
                      {r.label}
                    </p>
                    <p style={{ fontFamily: MG.sans, fontSize: '0.78rem', color: MG.muted, lineHeight: 1.6 }}>
                      {r.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL MEDIA / BRAND DOC ─────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <MGLabel>Social media & identity</MGLabel>
          <MGSectionTitle>Brand in every touchpoint.</MGSectionTitle>

          <p style={{ fontFamily: MG.sans, fontSize: '0.9rem', color: MG.muted, maxWidth: '56ch', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            Brand mission, visual direction guide, Instagram profile and content
            grid — six tile variants covering product, testimonial, ingredient
            education, and new arrival. The warm earthy palette and serif
            typography stay locked across every format.
          </p>

          <div style={{ border: `1px solid ${MG.border}`, overflow: 'hidden' }}>
            <Image
              src="/work/marigold/MarigoldSocialMedia.png"
              alt="Marigold Bloom social media brand system — Instagram grid, brand mission, visual direction, content tiles"
              width={1200}
              height={1800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: MG.surface,
          borderTop: `1px solid ${MG.border}`,
        }}>
          {/* Warm glow */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '280px',
            background: 'radial-gradient(ellipse, rgba(196,113,58,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            See the full system
          </p>

          <h2 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: MG.text, marginBottom: '0.5rem', lineHeight: 1.1 }}>
            Rooted in care.
          </h2>
          <h2 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: MG.rust, marginBottom: '3rem', lineHeight: 1.1 }}>
            Inspired by nature.
          </h2>

          <a
            href={FIGMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: MG.mono, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', background: MG.rust, padding: '1.1rem 3rem', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.text)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.rust)}
          >
            Open in Figma →
          </a>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${MG.border}`,
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: MG.bg,
        }}>
          <Link
            href="/"
            style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = MG.rust)}
            onMouseLeave={e => (e.currentTarget.style.color = MG.muted)}
          >
            ← All work
          </Link>
          <span style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.1em', opacity: 0.6 }}>
            © {new Date().getFullYear()} David Raigoza
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── LOCAL SHARED COMPONENTS ──────────────────────────────────────────────────
function MGLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: '#C4713A',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function MGSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      color: '#1C1410',
      lineHeight: 1.1,
    }}>
      {children}
    </h2>
  )
}