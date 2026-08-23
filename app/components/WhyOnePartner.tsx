'use client'

import React from 'react'

export interface WhyOnePartnerProps {
  onExploreClick?: () => void
}

export default function WhyOnePartner({ onExploreClick }: WhyOnePartnerProps) {
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
      <header
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
            Every product starts with an intention. The challenge is carrying that intention through everything that follows.
          </p>
          <p style={{ margin: 0 }}>
            Strategy, design, engineering, AI, and deployment are usually treated as separate stages. I work across them as one continuous system, so decisions can stay connected from the first idea to the product in people's hands.
          </p>
        </div>
      </header>

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
            {/* Index Number */}
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

            {/* Principle Title */}
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

            {/* Principle Body */}
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

        {/* Transition Link / CTA */}
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