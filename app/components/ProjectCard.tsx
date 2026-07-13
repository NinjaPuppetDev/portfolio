'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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
  variant?: 'web3' | 'brand' | 'product'
  image?: string
}

// ── COMMON NEUMORPHIC CARD CHASSIS STYLES ────────────────────────────────────
const getCardChassisStyles = (hovered: boolean, isMobile: boolean) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  position: 'relative' as const,
  backgroundColor: '#0A0A0A',
  // Luxury Spatial Breathing Room: Scaled internally up to 2.75rem padding
  padding: isMobile ? '1.75rem' : '2.75rem', 
  textDecoration: 'none',
  overflow: 'hidden',
  height: '100%',
  
  borderTop: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(255, 255, 255, 0.08)',
  borderLeft: hovered && !isMobile ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(255, 255, 255, 0.04)',
  borderRight: '1px solid rgba(0, 0, 0, 0.6)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.9)',
  borderRadius: '16px',
  
  boxShadow: hovered && !isMobile ? `
    0 32px 64px -16px rgba(0, 0, 0, 0.9),
    0 12px 24px -6px rgba(0, 0, 0, 0.95),
    inset 0 1px 1px rgba(255, 255, 255, 0.04)
  ` : `
    0 16px 32px -12px rgba(0, 0, 0, 0.75),
    0 4px 12px -3px rgba(0, 0, 0, 0.85),
    inset 0 1px 1px rgba(255, 255, 255, 0.02)
  `,
  transform: hovered && !isMobile ? 'translateY(-2px)' : 'translateY(0)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
})

// ── WEB3 CARD ─────────────────────────────────────────────────────────────────
function Web3Card({ index, title, subtitle, tags, description, link, linkLabel, year, accent = 'var(--accent)' }: ProjectCardProps) {
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
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={getCardChassisStyles(hovered, isMobile)}
    >
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: accent,
        letterSpacing: '0.2em',
        marginBottom: '1.5rem',
        opacity: active ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }}>
        {index} / {year}
      </div>

      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: isMobile ? 'clamp(1.3rem, 6vw, 1.8rem)' : 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 300,
        lineHeight: 1.1,
        color: '#FFFFFF',
        marginBottom: '0.75rem',
        fontStyle: 'italic',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '1.75rem',
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        maxHeight: active ? '12rem' : '0',
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        transition: isMobile ? 'none' : 'max-height 0.4s ease, opacity 0.35s ease',
        marginBottom: active ? '2rem' : '0',
        flex: 1,
      }}>
        {description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginTop: 'auto',
        paddingTop: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? '#FFFFFF' : 'var(--muted)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.4)',
              borderBottomColor: 'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              padding: '0.25rem 0.5rem',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
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

// ── PRODUCT CARD (Job Scanner) ─────────────────────────────────────────────────
function ProductCard({ index, title, subtitle, tags, description, link, linkLabel, year, accent = 'var(--accent)' }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!hovered && !isMobile) return
    const id = setInterval(() => setTick(t => t + 1), 900)
    return () => clearInterval(id)
  }, [hovered, isMobile])

  const active = isMobile ? true : hovered

  const rows = [
    { label: 'APPLIED',   value: '24', status: '●' },
    { label: 'INTERVIEW', value: tick % 2 === 0 ? '06' : '07', status: '◐' },
    { label: 'REJECTED',  value: tick % 2 === 0 ? '11' : '10', status: '○' },
    { label: 'PENDING',   value: '07', status: '●' },
  ]

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={getCardChassisStyles(hovered, isMobile)}
    >
      <div style={{
        backgroundColor: '#050505',
        border: '1px solid rgba(0, 0, 0, 0.6)',
        borderBottomColor: 'rgba(255, 255, 255, 0.04)',
        borderRightColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '8px',
        padding: '1.25rem',
        marginBottom: '2rem',
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        lineHeight: 1.8,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.85)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,240,74,0.01) 2px, rgba(200,240,74,0.01) 4px)',
          pointerEvents: 'none',
        }} />
        <div style={{ color: active ? accent : 'var(--muted)', marginBottom: '0.5rem', letterSpacing: '0.12em', transition: 'color 0.3s', fontWeight: 600 }}>
          ▸ JOB SCANNER v1.0
        </div>
        {rows.map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
            <span style={{ color: active ? accent : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>{r.status} {r.label}</span>
            <span style={{ color: '#FFFFFF', opacity: 0.9 }}>{r.value}</span>
          </div>
        ))}
        <div style={{ color: 'rgba(255,255,255,0.2)', marginTop: '0.5rem', fontSize: '0.58rem' }}>
          AIRTABLE · NEXT.JS · GROQ {'█'.repeat(8)}{'░'.repeat(2)} 82%
        </div>
      </div>

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

      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 300,
        lineHeight: 1.1,
        color: '#FFFFFF',
        marginBottom: '0.75rem',
        fontStyle: 'italic',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        maxHeight: active ? '12rem' : '0',
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        transition: isMobile ? 'none' : 'max-height 0.4s ease, opacity 0.35s ease',
        marginBottom: active ? '2rem' : '0',
        flex: 1,
      }}>
        {description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginTop: 'auto',
        paddingTop: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? '#FFFFFF' : 'var(--muted)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.4)',
              borderBottomColor: 'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              padding: '0.25rem 0.5rem',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
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

// ── BRAND CARD (Editorial Image Tray) ─────────────────────────────────────────
function BrandCard({ index, title, subtitle, tags, description, link, linkLabel, year, accent = 'var(--amber)', image }: ProjectCardProps) {
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
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={getCardChassisStyles(hovered, isMobile)}
    >
      {/* Sunk Image Tray with A24 Movie Poster Filters */}
      <div style={{
        width: '100%',
        aspectRatio: '16 / 10', // Streamlined editorial horizontal scale
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#050505',
        border: '1px solid rgba(0, 0, 0, 0.6)',
        borderBottomColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '8px',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)',
      }}>
        {image ? (
          <>
            {/* A24 Matte Multiply Screen Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(8, 8, 8, 0.22)',
              mixBlendMode: 'multiply',
              zIndex: 2,
              pointerEvents: 'none',
            }} />
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                zIndex: 1,
                // Normalized highlights & contrast matrix to match across variants
                filter: hovered && !isMobile 
                  ? 'brightness(0.85) contrast(1.02) saturate(0.92)' 
                  : 'brightness(0.72) contrast(1.06) saturate(0.82)',
                transform: hovered && !isMobile ? 'scale(1.015)' : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </>
        ) : (
          <>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(ellipse at 60% 40%, rgba(255,180,60,0.05) 0%, transparent 65%)`,
              backgroundSize: 'cover',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: accent,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.4,
              }}>
                drop image here
              </span>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.4rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: accent,
                opacity: 0.15,
              }}>
                {title}
              </span>
            </div>
          </>
        )}
      </div>

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

      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        fontWeight: 300,
        lineHeight: 1.15,
        color: '#FFFFFF',
        marginBottom: '0.75rem',
        fontStyle: 'italic',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
      }}>
        {subtitle}
      </p>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        maxHeight: active ? '12rem' : '0',
        overflow: 'hidden',
        opacity: active ? 1 : 0,
        transition: isMobile ? 'none' : 'max-height 0.4s ease, opacity 0.35s ease',
        marginBottom: active ? '2rem' : '0',
        flex: 1,
      }}>
        {description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginTop: 'auto',
        paddingTop: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? '#FFFFFF' : 'var(--muted)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.4)',
              borderBottomColor: 'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              padding: '0.25rem 0.5rem',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
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

// ── ROUTER ─────────────────────────────────────────────────────────────────────
export default function ProjectCard(props: ProjectCardProps) {
  switch (props.variant) {
    case 'brand':   return <BrandCard {...props} />
    case 'product': return <ProductCard {...props} />
    default:        return <Web3Card {...props} />
  }
}