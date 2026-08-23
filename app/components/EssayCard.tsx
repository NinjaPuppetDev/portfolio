'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Essay } from '../../lib/essays'

interface EssayCardProps {
  essay: Essay
  variant?: 'featured' | 'compact'
}

export default function EssayCard({ essay, variant = 'featured' }: EssayCardProps) {
  const [hovered, setHovered] = useState(false)

  // COMPACT VARIANT: Single-line row for archive/older essays
  if (variant === 'compact') {
    return (
      <Link
        href={`/writing/${essay.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
          textDecoration: 'none',
          padding: '0.65rem 0',
          transition: 'opacity 0.2s ease',
          opacity: hovered ? 1 : 0.75,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: hovered ? '#FFFFFF' : 'var(--text)',
            transition: 'color 0.2s ease',
          }}
        >
          {essay.title}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
            }}
          >
            {essay.displayDate}
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--accent)',
              opacity: hovered ? 1 : 0.5,
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'all 0.2s ease',
            }}
          >
            →
          </span>
        </div>
      </Link>
    )
  }

  // FEATURED VARIANT: Full editorial Hero for your latest weekly essay
  return (
    <Link
      href={`/writing/${essay.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        textDecoration: 'none',
        padding: '1.5rem 0 2rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.25rem, 2.4vw, 1.65rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: hovered ? '#FFFFFF' : 'var(--text)',
            letterSpacing: '-0.01em',
            margin: 0,
            transition: 'color 0.25s ease',
          }}
        >
          {essay.title}
        </h3>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            opacity: 0.6,
          }}
        >
          {essay.displayDate}
        </span>
      </div>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.9rem',
          color: 'var(--muted)',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '58ch',
        }}
      >
        {essay.dek}
      </p>

      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'all 0.25s ease',
          marginTop: '0.25rem',
        }}
      >
        Read →
      </span>
    </Link>
  )
}