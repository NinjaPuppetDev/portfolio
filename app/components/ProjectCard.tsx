'use client'

import { useState } from 'react'

interface ProjectCardProps {
  index: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  year: string
  accent?: string
}

export default function ProjectCard({
  index, title, subtitle, tags, description, link, linkLabel, year, accent = 'var(--accent)'
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        border: `1px solid ${hovered ? accent : 'var(--border)'}`,
        background: hovered ? 'var(--surface)' : 'transparent',
        padding: '2rem',
        transition: 'all 0.35s ease',
        textDecoration: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent */}
      <span style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: hovered ? '100%' : '0%',
        height: '1px',
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        transition: 'width 0.5s ease',
      }} />

      {/* Index */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: accent,
        letterSpacing: '0.2em',
        marginBottom: '1.25rem',
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }}>
        {index} / {year}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 300,
        lineHeight: 1.1,
        color: 'var(--text)',
        marginBottom: '0.4rem',
        fontStyle: 'italic',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.7rem',
        color: 'var(--muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '1.25rem',
      }}>
        {subtitle}
      </p>

      {/* Description — reveals on hover */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        maxHeight: hovered ? '6rem' : '0',
        overflow: 'hidden',
        opacity: hovered ? 1 : 0,
        transition: 'max-height 0.4s ease, opacity 0.35s ease',
        marginBottom: hovered ? '1.5rem' : '0',
      }}>
        {description}
      </p>

      {/* Tags + link row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: hovered ? accent : 'var(--muted)',
              border: `1px solid ${hovered ? accent : 'var(--border)'}`,
              padding: '0.2rem 0.5rem',
              transition: 'all 0.3s ease',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: accent,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
          transition: 'all 0.3s ease',
        }}>
          {linkLabel} →
        </span>
      </div>
    </a>
  )
}