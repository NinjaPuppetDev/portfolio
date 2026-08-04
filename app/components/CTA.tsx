'use client'

import React from 'react'
import Link from 'next/link'

export interface CTAProps {
  primaryCtaHref?: string
  contactFormId?: string
}

export default function CTA({
  primaryCtaHref = '/work-with-me',
  contactFormId = 'cta',
}: CTAProps) {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById(contactFormId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback if the ContactForm is rendered on a different page
      window.location.hash = contactFormId
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      style={{
        padding: 'clamp(6rem, 12vw, 11rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        color: 'var(--text, #FFFFFF)',
      }}
    >
      {/* SECTION HEADLINE */}
      <h2
        id="cta-heading"
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.75rem, 7vw, 5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: '0 0 2.25rem 0',
          color: 'var(--text, #FFFFFF)',
        }}
      >
        Let&apos;s continue the conversation.
      </h2>

      {/* SUPPORTING PARAGRAPHS */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          lineHeight: 1.65,
          fontWeight: 300,
          color: 'var(--muted, rgba(255, 255, 255, 0.75))',
          maxWidth: '680px',
          margin: '0 0 3.5rem 0',
        }}
      >
        <p style={{ margin: 0, color: 'var(--text, #FFFFFF)', fontWeight: 400 }}>
          Every product begins as an idea.
        </p>
        <p style={{ margin: 0 }}>
          Sometimes that idea needs validation. Sometimes it needs a prototype.
          Sometimes it needs a partner who can carry it from concept to production.
        </p>
        <p style={{ margin: 0 }}>
          Whether you&apos;re exploring AI, Web3, SaaS, or something entirely
          different, I&apos;d love to hear what you&apos;re building.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}
      >
        {/* Primary CTA */}
        <Link
          href={primaryCtaHref}
          style={{
            fontFamily: 'var(--mono, monospace)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--bg, #080808)',
            backgroundColor: 'var(--text, #FFFFFF)',
            padding: '0.9rem 2.25rem',
            borderRadius: '30px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.backgroundColor = 'var(--accent, #C8F04A)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.backgroundColor = 'var(--text, #FFFFFF)'
          }}
        >
          Work With Me
        </Link>

        {/* Secondary CTA: Scroll to <ContactForm /> */}
        <a
          href={`#${contactFormId}`}
          onClick={handleScrollToContact}
          style={{
            fontFamily: 'var(--mono, monospace)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--text, #FFFFFF)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-hi, rgba(255, 255, 255, 0.18))',
            padding: '0.85rem 2.25rem',
            borderRadius: '30px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--text, #FFFFFF)'
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hi, rgba(255, 255, 255, 0.18))'
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
          }}
        >
          Email Me
        </a>
      </div>

      {/* CLOSING THESIS LINE */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          fontFamily: 'var(--mono, monospace)',
          fontSize: '0.6875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted, rgba(255, 255, 255, 0.45))',
          maxWidth: '48ch',
        }}
      >
        <p style={{ margin: 0 }}>Not every conversation becomes a project.</p>
        <p style={{ margin: 0, color: 'var(--text-secondary, rgba(255, 255, 255, 0.75))' }}>
          But every project begins with one.
        </p>
      </footer>
    </section>
  )
}