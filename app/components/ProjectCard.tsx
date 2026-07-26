'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export interface ProjectCardProps {
  index: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  year: string
  accent?: string
  variant?: 'web3' | 'brand' | 'product'
  image?: string
}

const getCardChassisStyles = (hovered: boolean, isMobile: boolean) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  position: 'relative' as const,
  backgroundColor: '#0A0A0A',
  padding: isMobile ? '1.5rem' : '2.25rem',
  textDecoration: 'none',
  overflow: 'hidden',
  height: '100%',
  borderTop: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(255, 255, 255, 0.08)',
  borderLeft: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(255, 255, 255, 0.04)',
  borderRight: '1px solid rgba(0, 0, 0, 0.6)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.9)',
  borderRadius: '16px',
  boxShadow: hovered && !isMobile
    ? '0 32px 64px -16px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.04)'
    : '0 16px 32px -12px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
  transform: hovered && !isMobile ? 'translateY(-2px)' : 'translateY(0)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
})

// Unified Card Shell for standard visual presentation
export default function ProjectCard(props: ProjectCardProps) {
  const {
    index,
    title,
    subtitle,
    tags,
    description,
    link,
    linkLabel,
    year,
    accent = 'var(--accent)',
    image,
  } = props

  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const active = isMobile ? true : hovered

  return (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={getCardChassisStyles(hovered, isMobile)}
    >
      {/* Editorial Thumbnail Tray */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          marginBottom: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#050505',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
        }}
      >
        {image ? (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.18)',
                mixBlendMode: 'multiply',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                zIndex: 1,
                filter: active
                  ? 'brightness(0.9) contrast(1.05)'
                  : 'brightness(0.75) contrast(1.02) grayscale(20%)',
                transform: active ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: accent,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Interactive Demo
            </span>
          </div>
        )}
      </div>

      {/* Header Info */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: accent,
          letterSpacing: '0.2em',
          marginBottom: '0.75rem',
          opacity: active ? 1 : 0.6,
        }}
      >
        {index} / {year}
      </div>

      <h3
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontStyle: 'italic',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.625rem',
          color: 'var(--muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Footer & Tech Tags */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: active ? '#FFFFFF' : 'var(--muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                padding: '0.2rem 0.45rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accent,
            whiteSpace: 'nowrap',
          }}
        >
          {linkLabel} →
        </span>
      </div>
    </a>
  )
}