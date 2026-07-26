'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Essay } from '../../lib/essays'

// Deliberately not styled like ProjectCard. This is a byline, not a sales
// pitch — no tags, no "proof points" framing, no neumorphic chassis. It
// should read as writing, not collateral.
export default function EssayCard({ essay }: { essay: Essay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/writing/${essay.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        textDecoration: 'none',
        padding: '1.5rem 0',
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
            fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
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
          fontSize: '0.85rem',
          color: 'var(--muted)',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '56ch',
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
          marginTop: '0.15rem',
        }}
      >
        Read →
      </span>
    </Link>
  )
}