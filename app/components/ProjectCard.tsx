'use client'

import { useEffect, useState } from 'react'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // On mobile: description always visible, no hover effects
  const active = isMobile ? true : hovered

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        background: hovered && !isMobile ? 'var(--surface)' : 'transparent',
        padding: isMobile ? '1.5rem' : '2rem',
        transition: 'background 0.35s ease',
        textDecoration: 'none',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Top accent line — desktop hover only */}
      {!isMobile && (
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: hovered ? '100%' : '0%',
          height: '1px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          transition: 'width 0.5s ease',
        }} />
      )}

      {/* Index / year */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: accent,
        letterSpacing: '0.2em',
        marginBottom: '1rem',
        opacity: active ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }}>
        {index} / {year}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: isMobile ? 'clamp(1.3rem, 6vw, 1.8rem)' : 'clamp(1.6rem, 3vw, 2.2rem)',
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
        fontSize: '0.65rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>

      {/* Description — always visible on mobile, hover-reveal on desktop */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        maxHeight: active ? '8rem' : '0',
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        transition: isMobile ? 'none' : 'max-height 0.4s ease, opacity 0.35s ease',
        marginBottom: active ? '1.25rem' : '0',
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
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? accent : 'var(--muted)',
              border: `1px solid ${active ? accent : 'var(--border)'}`,
              padding: '0.2rem 0.45rem',
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
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(-8px)',
          transition: isMobile ? 'none' : 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}>
          {linkLabel} →
        </span>
      </div>
    </a>
  )
}