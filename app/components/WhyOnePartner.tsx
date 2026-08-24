'use client'

import React from 'react'

export interface WhyOnePartnerProps {
  onExploreClick?: () => void
  onBookCallClick?: () => void
  bookCallHref?: string
}

export default function WhyOnePartner({
  onExploreClick,
  onBookCallClick,
  bookCallHref = 'https://cal.com/david-raigoza-1juo6a',
}: WhyOnePartnerProps) {
  const principles = [
    {
      index: '01',
      title: 'Preserve the idea',
      description:
        'Every decision should reinforce the original problem instead of diluting it through disconnected handoffs.',
    },
    {
      index: '02',
      title: 'Build as one system',
      description:
        'Strategy, design, engineering, AI, and business decisions evolve together instead of being separated into isolated phases.',
    },
    {
      index: '03',
      title: 'Learn from reality',
      description:
        'Launching is not the end. Every product generates evidence that informs what comes next.',
    },
  ]

  return (
    <section
      id="about"
      aria-labelledby="why-one-partner-heading"
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '10rem 1.5rem 8rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '6rem',
        color: 'var(--text-primary, #FFFFFF)',
      }}
    >
      {/* SECTION INTRO */}
      <style>{`
        .why-one-partner-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 900px) {
          .why-one-partner-intro {
            grid-template-columns: 1.35fr 1fr;
            gap: 4.5rem;
          }
          .why-one-partner-photo {
            order: 2;
            margin-top: 0.5rem;
          }
          .why-one-partner-text {
            order: 1;
          }
        }
      `}</style>

      <div className="why-one-partner-intro">
        {/* TEXT COLUMN */}
        <header
          className="why-one-partner-text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '820px',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: 'var(--mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--muted, rgba(255, 255, 255, 0.45))',
              marginBottom: '1.75rem',
              display: 'inline-block',
            }}
          >
            WHY ONE PARTNER?
          </span>

          {/* Heading */}
          <h2
            id="why-one-partner-heading"
            style={{
              fontFamily: 'var(--font-sans, system-ui, sans-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 2.5rem 0',
              color: 'var(--text-primary, #FFFFFF)',
            }}
          >
            One conversation.
            <br />
            One continuous system.
          </h2>

          {/* Editorial Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              fontSize: 'clamp(1rem, 1.8vw, 1.1875rem)',
              lineHeight: 1.65,
              fontWeight: 300,
              color: 'var(--text-secondary, rgba(255, 255, 255, 0.75))',
              maxWidth: '720px',
            }}
          >
            <p style={{ margin: 0 }}>
              I run a lightweight product studio built to move from intention to working product without the overhead of a traditional team.
            </p>
            <p style={{ margin: 0 }}>
              Strategy, design, engineering, AI, and deployment are usually treated as separate stages. I work across them as one continuous system, so decisions can stay connected from the first idea to the product in people's hands.
            </p>
          </div>
        </header>

        {/* PHOTO COLUMN */}
        <div
          className="why-one-partner-photo"
          style={{
            width: '100%',
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <img
            src="/images/why-one-partner/david-raigoza.jpg"
            alt="David Raigoza"
            style={{
              width: '100%',
              aspectRatio: '4 / 5',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
            }}
          />

          {onBookCallClick ? (
            <button
              onClick={onBookCallClick}
              type="button"
              style={{
                background: 'none',
                border: '1px solid var(--border-color, rgba(255, 255, 255, 0.2))',
                padding: '0.875rem 1.25rem',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-primary, #FFFFFF)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.borderColor = 'var(--text-primary, rgba(255, 255, 255, 0.6))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color, rgba(255, 255, 255, 0.2))'
              }}
            >
              Book a discovery call
            </button>
          ) : (
            <a
              href={bookCallHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'none',
                border: '1px solid var(--border-color, rgba(255, 255, 255, 0.2))',
                padding: '0.875rem 1.25rem',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-primary, #FFFFFF)',
                textDecoration: 'none',
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                textAlign: 'center',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.borderColor = 'var(--text-primary, rgba(255, 255, 255, 0.6))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color, rgba(255, 255, 255, 0.2))'
              }}
            >
              Book a discovery call
            </a>
          )}
        </div>
      </div>

      {/* EDITORIAL PRINCIPLES */}
      <ol
        aria-label="Editorial Principles"
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '4rem 3rem',
          borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
          paddingTop: '4rem',
        }}
      >
        {principles.map((principle) => (
          <li
            key={principle.index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.8125rem',
                color: 'var(--muted, rgba(255, 255, 255, 0.45))',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
              }}
            >
              {principle.index}
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-sans, system-ui, sans-serif)',
                fontSize: '1.25rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                margin: '0 0 0.875rem 0',
                color: 'var(--text-primary, #FFFFFF)',
              }}
            >
              {principle.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans, system-ui, sans-serif)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                fontWeight: 300,
                color: 'var(--text-muted, rgba(255, 255, 255, 0.6))',
                margin: 0,
              }}
            >
              {principle.description}
            </p>
          </li>
        ))}
      </ol>

      {/* CLOSING STATEMENT & TRANSITION */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4rem',
          maxWidth: '720px',
          borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
          paddingTop: '4rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
            lineHeight: 1.65,
            fontWeight: 300,
            color: 'var(--text-secondary, rgba(255, 255, 255, 0.75))',
          }}
        >
          <p style={{ margin: 0 }}>
            The projects below are connected by more than technology.
          </p>
          <p style={{ margin: 0 }}>
            Whether the outcome becomes an AI platform, a blockchain protocol, or a
            physical product, the objective remains the same:
          </p>
          <p
            style={{
              margin: 0,
              color: 'var(--text-primary, #FFFFFF)',
              fontWeight: 400,
            }}
          >
            Reduce the distance between intention and understanding.
          </p>
        </div>

        {onExploreClick ? (
          <button
            onClick={onExploreClick}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'var(--mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted, rgba(255, 255, 255, 0.5))',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary, #FFFFFF)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted, rgba(255, 255, 255, 0.5))'
            }}
          >
            <span>Explore the portfolio</span>
            <span aria-hidden="true">↓</span>
          </button>
        ) : (
          <a
            href="#work"
            style={{
              fontFamily: 'var(--mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted, rgba(255, 255, 255, 0.5))',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary, #FFFFFF)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted, rgba(255, 255, 255, 0.5))'
            }}
          >
            <span>Explore the portfolio</span>
            <span aria-hidden="true">↓</span>
          </a>
        )}
      </footer>
    </section>
  )
}