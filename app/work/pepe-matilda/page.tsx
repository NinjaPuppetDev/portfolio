'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── CONSTANTS — update these when ready ─────────────────────────────────────
const CANVA_VIDEO_URL = 'https://drive.google.com/file/d/1yo5wHSdJA9m7wE5c5LYJhhoA7ML6RI2x/preview'  // paste Canva embed URL here
const INSTAGRAM_URL   = 'https://www.instagram.com/pepe_matilda_?igsh=MXNvdDY1MzR5bmwyNg=='
const FIGMA_URL       = 'https://www.figma.com/design/iZ4qn2tuRrdexN0ZTRPgkL/PortfolioWix?node-id=0-1&p=f&t=8gcYn6JhelNu0YqZ-0'

const PRESS = [
  {
    outlet: 'Lápiz de Acero',
    year: '2013',
    note: "Official award recognition — Premio Lápiz de Acero, Colombia's leading industrial design award",
  },
  {
    outlet: 'El Colombiano',
    year: '2013',
    note: 'Print coverage — physical archive held',
  },
  {
    outlet: 'Universidad EAFIT',
    year: '2013',
    note: 'Institutional recognition — documented in university communications',
  },
]

const PROCESS = [
  {
    label: 'Material Architecture',
    description:
      'Evaluated casting behavior, surface optimization, and manufacturing tolerances across alloy groups. Silver was selected to balance premium product tiering with optimal material performance.',
  },
  {
    label: '0-to-1 Pipeline Architecture',
    description:
      'Engineered a proprietary high-precision microcasting infrastructure from the ground up to bypass commercial manufacturing limits and unlock uncompromised geometric detail.',
  },
  {
    label: 'Parametric Master Schemas',
    description:
      'Established high-fidelity digital blueprints in Blender as an absolute single source of truth, transferring data directly to master molds to eliminate physical iteration cycles.',
  },
  {
    label: 'Omnichannel Brand Systems',
    description:
      'Designed a multi-surface visual infrastructure—spanning physical luxury packaging, brand iconography, and digital e-commerce surfaces—to guarantee a cohesive brand experience.',
  },
  {
    label: 'Ecosystem Validation',
    description:
      'Strategically positioned the product ecosystem to secure institutional placement within Colombia’s premier cultural networks (MAMM and Museo de Antioquia).',
  },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Pepe Matilda',
  description:
    'Award-winning silver jewelry brand designed and built by David Raigoza. Winner of the Premio Lápiz de Acero 2013. Sold through MAMM and Museo de Antioquia, Medellín, Colombia.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
  award: 'Premio Lápiz de Acero 2013',
  dateCreated: '2011',
  locationCreated: { '@type': 'Place', name: 'Medellín, Colombia' },
  keywords:
    'Pepe Matilda, David Raigoza, Premio Lápiz de Acero 2013, silver jewelry, microcasting, MAMM, Museo de Antioquia',
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function PepeMatildaCaseStudy() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

        {/* ── BACK NAV ─────────────────────────────────────────────── */}
        <nav style={{
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back
          </Link>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            04 / 2011–2016
          </span>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Warm glow */}
          <div style={{
            position: 'absolute', top: '10%', right: '10%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(255,180,60,0.05) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(60px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
              Case Study · Jewelry Design · Medellín, 2011–2016
            </p>

            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '2rem', ...fadeIn(0.2) }}>
              Pepe Matilda
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>0 to award.</span>
            </h1>

            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'var(--muted)', maxWidth: '52ch', lineHeight: 1.75, fontWeight: 300, marginBottom: '3rem', ...fadeIn(0.4) }}>
              A silver jewelry brand built entirely from scratch — proprietary
              microcasting system, 3D modelling, brand identity, and institutional
              distribution. Winner of the Premio Lápiz de Acero 2013, Colombia's
              most important industrial design award.
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fadeIn(0.5) }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--amber)', padding: '0.75rem 2rem', textDecoration: 'none', transition: 'background 0.2s ease' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--text)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--amber)')}
              >
                View on Instagram →
              </a>

              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', border: '1px solid var(--amber)', padding: '0.75rem 2rem', textDecoration: 'none', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--amber)'; el.style.color = 'var(--bg)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = 'var(--amber)' }}
              >
                Open in Figma →
              </a>
            </div>
          </div>
        </section>

        {/* ── AWARD BANNER ─────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'rgba(255,180,60,0.03)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--amber)', lineHeight: 1 }}>▴</span>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Premio Lápiz de Acero 2013
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.2 }}>
                Colombia's most important industrial design award
              </p>
            </div>
            <div style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textAlign: 'right', lineHeight: 1.8 }}>
              <div>Exhibited at MAMM</div>
              <div>Museo de Antioquia</div>
              <div>Medellín, Colombia</div>
            </div>
          </div>
        </section>

        {/* ── BRAND VIDEO ──────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Label amber>The work in motion</Label>
          <SectionTitle>Brand film</SectionTitle>

          {/* Vertical video container — Canva exports ~9:16 */}
          <div style={{
            marginTop: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',          // keeps vertical video from stretching full-width
              paddingBottom: 'min(177.78%, 680px)', // 9:16 capped at 680px tall
              height: 0,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#0a0a0a',
            }}>
              <iframe
                src={CANVA_VIDEO_URL}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Pepe Matilda — brand film"
              />
            </div>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.08em', marginTop: '0.75rem', opacity: 0.6, textAlign: 'center' }}>
            Brand film — process, material, and identity
          </p>
        </section>

        {/* ── LANDING PAGE SCREENSHOT ───────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Label amber>Web design</Label>
          <SectionTitle>Landing page</SectionTitle>

          <div style={{
            marginTop: '2.5rem',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <Image
              src="/work/pepe-matilda/PepeMatildaLandingPage.png"
              alt="Pepe Matilda landing page — Silver Jewelry Inspired by Nature, full page mockup"
              width={1200}
              height={1800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>

          {/* Figma link under screenshot */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            >
              Open in Figma →
            </a>
          </div>
        </section>

        {/* ── SOCIAL MEDIA / BRAND DOC SCREENSHOT ──────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Label amber>Brand system</Label>
          <SectionTitle>Social media & identity</SectionTitle>

          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.9rem',
            color: 'var(--muted)',
            maxWidth: '56ch',
            lineHeight: 1.75,
            marginTop: '1rem',
            marginBottom: '2.5rem',
          }}>
            Consistent, elegant content designed to connect with nature and celebrate
            craftsmanship — brand mission, visual direction, and Instagram presence,
            all in one system.
          </p>

          <div style={{
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}>
            <Image
              src="/work/pepe-matilda/PepeMatildaSocialMedia.png"
              alt="Pepe Matilda brand system — social media presence, brand mission, visual direction, Instagram mockups"
              width={1200}
              height={1800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Label amber>How it was built</Label>
          <SectionTitle>Process</SectionTitle>

          <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
            {PROCESS.map((step, i) => (
              <div key={step.label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '2rem',
                padding: '1.75rem 2rem',
                borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', opacity: 0.6 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.3 }}>
                    {step.label}
                  </p>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRESS & RECOGNITION ──────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Label amber>Press & recognition</Label>
          <SectionTitle>Covered by</SectionTitle>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '0', border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
            {PRESS.map((p, i) => (
              <div key={p.outlet} style={{ padding: '2rem', borderRight: i < PRESS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {p.year}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text)', marginBottom: '0.6rem' }}>
                  {p.outlet}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {p.note}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.08em', marginTop: '1rem', opacity: 0.5, lineHeight: 1.6 }}>
            Original press links from 2013 are no longer active. Physical archive held.
          </p>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(255,180,60,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            The brand is live
          </p>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', marginBottom: '2.5rem', lineHeight: 1.1 }}>
            Follow the journey<br />
            <span style={{ color: 'var(--muted)', fontSize: '0.5em', fontStyle: 'normal', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              @pepe_matilda_
            </span>
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--amber)', padding: '1rem 2.5rem', textDecoration: 'none', transition: 'background 0.2s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--amber)')}
            >
              Follow on Instagram →
            </a>
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
        }}>
          <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
            ← All work
          </Link>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} David Raigoza
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Label({ children, amber }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: amber ? 'var(--amber)' : 'var(--accent)',
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
      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      color: 'var(--text)',
      lineHeight: 1.1,
    }}>
      {children}
    </h2>
  )
}