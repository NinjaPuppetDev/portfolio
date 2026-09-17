'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NegociosCursor from '@/app/components/NegociosCursor'
import NegociosHeroVisual from '@/app/components/NegociosHeroVisual'

export default function NegociosPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFooterIntersecting, setIsFooterIntersecting] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-active')
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale')
    elements.forEach((el) => observer.observe(el))

    let rafId: number | null = null

    const checkFooterIntersection = () => {
      const footer = document.getElementById('negocios-footer')
      const action = document.getElementById('floating-whatsapp-action')
      if (!footer || !action) return

      const footerRect = footer.getBoundingClientRect()
      const actionRect = action.getBoundingClientRect()

      // The WhatsApp icon changes to white when it enters the footer area
      setIsFooterIntersecting(footerRect.top <= actionRect.bottom)
    }

    const onScrollOrResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkFooterIntersection)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    checkFooterIntersection()

    return () => {
      observer.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <div
      id="negocios-page-container"
      className="negocios-page"
      style={{
        backgroundColor: '#F8F8F6',
        color: '#121210',
        minHeight: '100vh',
        fontFamily: 'var(--sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <NegociosCursor />

      {/* Bauhaus Methodology Styles: Structural Grid, Rigorous Typography, Purposeful Motion */}
      <style jsx global>{`
        /* Mathematical Typography Scale & Hierarchy */
        .bauhaus-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
        }

        /* Purposeful Transitions */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .scroll-reveal.animate-active {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-reveal-left {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .scroll-reveal-left.animate-active {
          opacity: 1;
          transform: translateX(0);
        }

        .scroll-reveal-scale {
          opacity: 0;
          transform: scale(0.98) translateY(20px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .scroll-reveal-scale.animate-active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Functional Card Interaction: Communicates Actionability */
        .card-hover {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          border-color: #121210 !important;
          background-color: #FFFFFF;
        }

        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .floating-mockup {
          animation: floatSubtle 6s ease-in-out infinite;
        }

        /* Responsive Layout Grid */
        .negocios-header {
          padding: 1.1rem 2rem;
          border-bottom: 1px solid #E2E2DE;
        }
        .negocios-nav-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .negocios-main-content {
          padding: 3.5rem 2rem 5rem;
        }
        .negocios-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }

        /* Bauhaus Editorial Layout Frameworks */
        .essentials-mosaic {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }
        .essentials-cell-lead {
          grid-column: span 7;
        }
        .essentials-cell-secondary {
          grid-column: span 5;
        }
        .essentials-cell-action-contact {
          grid-column: span 6;
        }
        .essentials-cell-action-wa {
          grid-column: span 6;
        }
        .essentials-cell-infra {
          grid-column: span 3;
        }

        .respaldo-editorial-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .economic-ledger-split {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .colaboracion-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .craft-editorial-layout {
          display: grid;
          grid-template-columns: 1fr 1.45fr;
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .journey-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .process-workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background-color: #E2E2DE;
          border: 1px solid #E2E2DE;
        }

        .negocios-cta-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .essentials-cell-lead,
          .essentials-cell-secondary,
          .essentials-cell-action-contact,
          .essentials-cell-action-wa {
            grid-column: span 6;
          }
          .essentials-cell-infra {
            grid-column: span 6;
          }
          .respaldo-editorial-layout,
          .economic-ledger-split,
          .colaboracion-split,
          .craft-editorial-layout {
            grid-template-columns: 1fr;
          }
          .journey-grid-container,
          .process-workflow-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .negocios-header {
            padding: 0.85rem 1.25rem;
          }
          .negocios-nav-links a:not(.whatsapp-header-btn):not(.instagram-header-btn) {
            display: none !important;
          }
          .negocios-main-content {
            padding: 2rem 1.25rem 4rem !important;
          }
          .negocios-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 1.5rem 0 3.5rem !important;
          }
          .floating-mockup {
            animation: none !important;
          }
          .essentials-cell-lead,
          .essentials-cell-secondary,
          .essentials-cell-action-contact,
          .essentials-cell-action-wa,
          .essentials-cell-infra {
            grid-column: span 12;
          }
          .journey-grid-container,
          .process-workflow-grid {
            grid-template-columns: 1fr !important;
          }
          .floating-whatsapp-tooltip {
            display: none !important;
          }
          .floating-whatsapp-container {
            bottom: 1.25rem !important;
            right: 1.25rem !important;
          }
          .negocios-btn-mobile-full {
            width: 100% !important;
            text-align: center !important;
            display: block !important;
          }
          .negocios-cta-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .negocios-cta-actions a {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* 1. Systematic Navigation Bar */}
      <header
        id="negocios-header-nav"
        className="negocios-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(248, 248, 246, 0.94)',
          backdropFilter: 'blur(12px)',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link
            id="nav-brand-link"
            href="/"
            style={{
              textDecoration: 'none',
              fontWeight: 600,
              color: '#121210',
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
            }}
          >
            David Raigoza
          </Link>
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.65rem',
              padding: '0.15rem 0.45rem',
              backgroundColor: '#121210',
              color: '#F8F8F6',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Negocios
          </span>
        </div>

        <nav className="negocios-nav-links" style={{ fontSize: '0.85rem' }}>
          <a href="#que-incluye" style={{ color: '#555550', textDecoration: 'none', transition: 'color 0.15s' }}>
            Qué incluye
          </a>
          <a href="#respaldo" style={{ color: '#555550', textDecoration: 'none', transition: 'color 0.15s' }}>
            Respaldo
          </a>
          <a href="#transparencia" style={{ color: '#555550', textDecoration: 'none', transition: 'color 0.15s' }}>
            Inversión
          </a>
          <a href="#proceso" style={{ color: '#555550', textDecoration: 'none', transition: 'color 0.15s' }}>
            Proceso
          </a>
          <a
            id="negocios-header-instagram-btn"
            className="instagram-header-btn"
            href="https://www.instagram.com/raigoza_david_design/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            style={{
              color: '#121210',
              textDecoration: 'none',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              fontWeight: 500,
              fontSize: '0.82rem',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              justifyContent: 'center',
              border: '1px solid #D4D4D0',
              backgroundColor: '#FFFFFF',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F4F4F2'
              e.currentTarget.style.borderColor = '#121210'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF'
              e.currentTarget.style.borderColor = '#D4D4D0'
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: 'inline-block' }}
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Instagram
          </a>
          <a
            id="nav-whatsapp-cta"
            className="whatsapp-header-btn"
            href="https://wa.me/573007747638?text=Hola%20David,%20estoy%20interesado%20en%20una%20solución%20digital%20para%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#121210',
              color: '#FFFFFF',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.82rem',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              justifyContent: 'center',
              border: '1px solid #121210',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }} />
            WhatsApp directo
          </a>
        </nav>
      </header>

      {/* Main Structural Layout */}
      <main id="negocios-main" className="negocios-main-content" style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>

        {/* 2. Hero Section: Utility & Value First */}
        <section id="negocios-hero" className="negocios-hero-grid" style={{ padding: '2.5rem 0 4.5rem', position: 'relative' }}>
          {/* Preserved Three.js Generative Visual Field */}
          <NegociosHeroVisual mockupId="hero-browser-mockup" />

          <div
            id="hero-content-block"
            style={{
              position: 'relative',
              zIndex: 2,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Functional Index Marker */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <span style={{ width: '6px', height: '6px', backgroundColor: '#2563EB', display: 'inline-block' }} />
              Ingeniería de diseño de producto · Medellín, Colombia
            </div>

            <h1
              id="hero-heading"
              style={{
                fontSize: 'clamp(2.35rem, 4.7vw, 3.4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                color: '#121210',
                marginBottom: '1.75rem',
                letterSpacing: '-0.028em',
                textWrap: 'balance',
                maxWidth: '22ch',
              }}
            >
              <span style={{ display: 'block' }}>Una presencia digital</span>
              <span style={{ display: 'block' }}>
                que trabaja para tu&nbsp;negocio
              </span>
            </h1>

            {/* Bauhaus Editorial Typography Structure: Structured Lead & Functional Foundation */}
            <div
              id="hero-editorial-body"
              style={{
                marginBottom: '2.25rem',
                maxWidth: '46ch',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <p
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 500,
                  color: '#1A1A18',
                  lineHeight: 1.48,
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textWrap: 'pretty',
                }}
              >
                Una página profesional para que tus clientes te encuentren, entiendan lo que haces y puedan contactarte&nbsp;fácilmente.
              </p>

              <p
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: '#5A5A54',
                  lineHeight: 1.6,
                  margin: 0,
                  textWrap: 'pretty',
                }}
              >
                Sitios web pensados para negocios que buscan una presencia sólida en internet, sin complicaciones&nbsp;innecesarias.
              </p>
            </div>

            {/* Economic Clarity: Structured Ledger Tile */}
            <div
              id="hero-pricing-tile"
              style={{
                borderLeft: '2px solid #121210',
                paddingLeft: '1.25rem',
                marginBottom: '2.25rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'ui-monospace, monospace',
                  color: '#666660',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ width: '4px', height: '4px', backgroundColor: '#D97706', display: 'inline-block' }} />
                Inversión inicial transparente
              </span>
              <span
                className="bauhaus-num"
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: '#121210',
                  letterSpacing: '-0.02em',
                }}
              >
                Desde $650.000 COP
              </span>
            </div>

            <div>
              <a
                id="hero-primary-cta"
                href="#contacto"
                className="negocios-btn-mobile-full"
                style={{
                  backgroundColor: '#121210',
                  color: '#FFFFFF',
                  padding: '0.9rem 1.95rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minHeight: '48px',
                  border: '1px solid #121210',
                  transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                Cuéntame qué necesita tu negocio <span>→</span>
              </a>
            </div>
          </div>

          {/* Functional Browser Mockup: Demonstrates Structure & Instrument */}
          <div
            id="hero-browser-mockup"
            className="floating-mockup"
            style={{
              position: 'relative',
              zIndex: 2,
              border: '1px solid #D8D8D4',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 18px 40px -12px rgba(18, 18, 16, 0.09)',
              overflow: 'hidden',
            }}
          >
            {/* Window Chrome */}
            <div
              style={{
                backgroundColor: '#F0F0EC',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #E2E2DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EF4444', border: '1px solid #DC2626' }}></div>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F59E0B', border: '1px solid #D97706' }}></div>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981', border: '1px solid #059669' }}></div>
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'ui-monospace, monospace',
                  color: '#666660',
                  backgroundColor: '#FFFFFF',
                  padding: '0.2rem 0.75rem',
                  border: '1px solid #E2E2DE',
                  borderRadius: '4px',
                }}
              >
                tudominio.co
              </div>
              <div style={{ width: '28px' }} />
            </div>

            {/* Viewport Content Instrument */}
            <div style={{ padding: 'clamp(1.25rem, 3vw, 1.85rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.15rem', color: '#121210', letterSpacing: '-0.01em' }}>
                    Tu Negocio Profesional
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#666660', marginTop: '0.2rem' }}>
                    Presencia digital clara, rápida y efectiva
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'ui-monospace, monospace',
                    padding: '0.2rem 0.55rem',
                    border: '1px solid #A7F3D0',
                    borderRadius: '999px',
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  LIVE
                </span>
              </div>

              {/* Structural Modules */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    background: '#F8F8F6',
                    border: '1px solid #E2E2DE',
                    borderRadius: '6px',
                    padding: '0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#222220',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#666660', fontFamily: 'ui-monospace, monospace', marginBottom: '0.2rem' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                    [MÓDULO 01]
                  </span>
                  <div>Servicios o Productos</div>
                </div>
                <div
                  style={{
                    background: '#F8F8F6',
                    border: '1px solid #E2E2DE',
                    borderRadius: '6px',
                    padding: '0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#222220',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#666660', fontFamily: 'ui-monospace, monospace', marginBottom: '0.2rem' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                    [MÓDULO 02]
                  </span>
                  <div>Analítica Web</div>
                </div>
              </div>

              {/* Action Triggers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div
                  style={{
                    background: '#121210',
                    color: '#FFFFFF',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  Contacto
                </div>
                <div
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                  }}
                >
                  WhatsApp
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Systematic Architecture: Lo que necesitas para empezar (8 Functional Essentials) */}
        <section id="que-incluye" className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              01 / ESTRUCTURA ESENCIAL
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)',
                fontWeight: 500,
                color: '#121210',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
                textWrap: 'balance',
                maxWidth: '24ch',
              }}
            >
              Todo lo esencial para estar en internet
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', maxWidth: '64ch', lineHeight: 1.6, textWrap: 'pretty' }}>
              Por $650.000 COP desarrollamos una presencia digital sólida y funcional, pensada para transmitir confianza y comenzar a convertir visitas en&nbsp;contactos.
            </p>
          </div>

          {/* Asymmetrical Bauhaus Architectural Mosaic: Hierarchy Controls Composition */}
          <div className="essentials-mosaic">
            {/* 01: Lead Cornerstone */}
            <div
              id="feature-card-01"
              className="essentials-cell-lead card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#121210', lineHeight: 1 }}>
                    01
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: '#F0F0EC',
                      color: '#121210',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    PUNTO DE ENTRADA
                  </span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', fontWeight: 600, color: '#121210', marginBottom: '0.75rem', letterSpacing: '-0.02em', textWrap: 'balance' }}>
                  Inicio
                </h3>
              </div>
              <p style={{ fontSize: '0.98rem', color: '#444440', lineHeight: 1.6, margin: 0, maxWidth: '48ch', textWrap: 'pretty' }}>
                Una página principal clara, diseñada para explicar rápidamente quién eres, qué haces y por qué un cliente debería&nbsp;elegirte.
              </p>
            </div>

            {/* 02: Commercial Offer Anchor */}
            <div
              id="feature-card-02"
              className="essentials-cell-secondary card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                transitionDelay: '40ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#121210' }}>
                    02
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: '#F0F0EC',
                      color: '#121210',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    OFERTA
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#121210', marginBottom: '0.75rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  Servicios o productos
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#444440', lineHeight: 1.58, margin: 0, textWrap: 'pretty' }}>
                Presenta tu oferta de manera organizada, clara y fácil de&nbsp;entender.
              </p>
            </div>

            {/* 03: Conversion Capture Hub */}
            <div
              id="feature-card-03"
              className="essentials-cell-action-contact card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.75rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px',
                transitionDelay: '70ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666660' }}>
                    03
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: '#F0F0EC',
                      color: '#121210',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    CAPTACIÓN
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#121210', marginBottom: '0.6rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                  Contacto
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#444440', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
                Información de contacto, formulario y las herramientas que necesites para facilitar la conversación con tus&nbsp;clientes.
              </p>
            </div>

            {/* 04: Real-time Communication Bridge - Active Green Destination Field */}
            <div
              id="feature-card-04"
              className="essentials-cell-action-wa card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                padding: '1.75rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px',
                transitionDelay: '100ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)' }}>
                    04
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.2rem 0.55rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#86EFAC' }} />
                    RESPUESTA INMEDIATA
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.6rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                  WhatsApp
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#DCFCE7', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
                Un acceso directo para que tus visitantes puedan hablar contigo desde el&nbsp;sitio.
              </p>
            </div>

            {/* Engineering Baseline Band: 05, 06, 07, 08 */}
            {[
              { num: '05', title: 'Diseño y desarrollo', desc: 'Diseño y desarrollo a la medida de tu negocio, sin que tengas que preocuparte por la parte técnica.' },
              { num: '06', title: 'Adaptación móvil', desc: 'Tu sitio se adapta y funciona con fluidez en celulares, tablets y computadores.' },
              { num: '07', title: 'Publicación', desc: 'Configuración y puesta en marcha para que tu sitio quede en internet y listo para operar.' },
              { num: '08', title: 'Analítica', desc: 'Conectamos tu sitio con Microsoft Clarity para entender cómo interactúan tus visitantes, qué consultan y cómo navegan.', accent: '#2563EB' },
            ].map((item, idx) => (
              <div
                key={item.num}
                id={`feature-card-${item.num}`}
                className="essentials-cell-infra card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem 1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '185px',
                  borderTop: item.num === '08' ? '2px solid #2563EB' : 'none',
                  transitionDelay: `${(idx + 4) * 30}ms`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                    {item.accent && (
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: item.accent }} />
                    )}
                    <span className="bauhaus-num" style={{ fontSize: '0.75rem', color: item.num === '08' ? '#2563EB' : '#666660', fontWeight: item.num === '08' ? 600 : 400 }}>
                      {item.num}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#121210', marginBottom: '0.55rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.835rem', color: '#555550', lineHeight: 1.5, margin: 0, textWrap: 'pretty' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Conversion Journey: De conocerte a contactarte (Step-by-Step Functional Funnel) */}
        <section className="scroll-reveal-left" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              02 / RECORRIDO DEL CLIENTE
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              De conocerte a contactarte
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '64ch', textWrap: 'pretty' }}>
              Tu presencia digital cumple un objetivo claro en cada etapa:
            </p>
          </div>

          {/* Unified 4-Step Journey Matrix */}
          <div className="journey-grid-container" style={{ marginBottom: '2rem' }}>
            {[
              { step: '01', label: 'Te encuentran', role: 'Visibilidad en buscadores y enlaces directos' },
              { step: '02', label: 'Te conocen', role: 'Identidad, propuesta y autoridad profesional' },
              { step: '03', label: 'Entienden lo que haces', role: 'Servicios explicados sin ambigüedad' },
              { step: '04', label: 'Te contactan', role: 'Conversación directa por WhatsApp y correo' },
            ].map((st, i) => (
              <div
                key={st.step}
                id={`journey-step-${st.step}`}
                style={{
                  backgroundColor: i === 3 ? '#121210' : '#FAFAFA',
                  color: i === 3 ? '#FFFFFF' : '#121210',
                  padding: '1.75rem 1.5rem',
                  borderTop: i === 3 ? '2px solid #16A34A' : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.8rem', fontWeight: 600, color: i === 3 ? '#A3A39E' : '#888880' }}>
                    PASO {st.step}
                  </span>
                  {i < 3 ? (
                    <span style={{ color: '#AAAAA0', fontSize: '0.85rem' }}>→</span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontFamily: 'ui-monospace, monospace',
                        padding: '0.15rem 0.5rem',
                        backgroundColor: '#16A34A',
                        color: '#FFFFFF',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#86EFAC' }} />
                      OBJETIVO
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: i === 3 ? '#FFFFFF' : '#121210', marginBottom: '0.4rem', textWrap: 'balance' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: i === 3 ? '#D4D4D0' : '#555550', lineHeight: 1.45, textWrap: 'pretty' }}>
                  {st.role}
                </div>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: '68ch' }}>
            <p style={{ color: '#444440', fontSize: '1rem', marginBottom: '0.75rem', lineHeight: 1.6, textWrap: 'pretty' }}>
              El sitio se construye alrededor de ese&nbsp;recorrido.
            </p>
            <p style={{ color: '#444440', fontSize: '1rem', marginBottom: '0.75rem', lineHeight: 1.6, textWrap: 'pretty' }}>
              No todos los negocios requieren las mismas herramientas. Por eso partimos de tus necesidades reales y añadimos funcionalidades cuando aportan valor&nbsp;concreto.
            </p>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#555550',
                fontFamily: 'ui-monospace, monospace',
                marginTop: '1.25rem',
                padding: '0.85rem 1.15rem',
                borderLeft: '3px solid #D97706',
                borderTop: '1px solid #E2E2DE',
                borderRight: '1px solid #E2E2DE',
                borderBottom: '1px solid #E2E2DE',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}
            >
              <span style={{ color: '#D97706', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.4 }}>ℹ</span>
              <span style={{ lineHeight: 1.5, textWrap: 'pretty' }}>
                Reservas, formularios, pagos, catálogos, integraciones y otras funcionalidades pueden incorporarse según el alcance del&nbsp;proyecto.
              </span>
            </div>
          </div>
        </section>

        {/* 5. Proof & Rigor: Calidad comprobada y rigor técnico (4 Credibility Quadrants) */}
        <section id="respaldo" className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              03 / RESPALDO Y RECONOCIMIENTOS
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              Calidad comprobada y rigor técnico
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', maxWidth: '64ch', lineHeight: 1.6, textWrap: 'pretty' }}>
              Lo que dicen quienes ya han trabajado conmigo y los reconocimientos que respaldan mi&nbsp;trayectoria.
            </p>
          </div>

          <div className="respaldo-editorial-layout">
            {/* Left Column: Client Endorsements & Peer Validation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Quadrant 1: Melissa Rendón */}
              <div
                id="testimonial-melissa"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(2rem, 3.5vw, 2.5rem) clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  minHeight: '230px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: '#16A34A',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                      [01 / ÉXITO DE CLIENTE]
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: '#888880' }}>
                      CASO REAL
                    </span>
                  </div>
                  <blockquote
                    style={{
                      fontSize: 'clamp(1.1rem, 2vw, 1.22rem)',
                      color: '#121210',
                      lineHeight: 1.5,
                      fontStyle: 'normal',
                      margin: '0 0 1.75rem 0',
                      letterSpacing: '-0.015em',
                      fontWeight: 450,
                      textWrap: 'pretty',
                    }}
                  >
                    “Fue un proceso fluido: David me entregó un sitio web completamente alineado con mi marca e&nbsp;identidad.”
                  </blockquote>
                </div>
                <div style={{ borderTop: '1px solid #E2E2DE', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.96rem', color: '#121210' }}>Melissa Rendón</div>
                    <div style={{ fontSize: '0.82rem', color: '#666660' }}>Artista Reborn</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'ui-monospace, monospace', color: '#999990' }}>
                    PROYECTO ACTIVO
                  </span>
                </div>
              </div>

              {/* Quadrant 2: Carlos Mariño */}
              <div
                id="testimonial-carlos"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  transitionDelay: '60ms',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: '#2563EB',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                      [02 / VALIDACIÓN TÉCNICA]
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: '#888880' }}>
                      PEER REVIEW
                    </span>
                  </div>
                  <blockquote
                    style={{
                      fontSize: '1.08rem',
                      color: '#121210',
                      lineHeight: 1.55,
                      fontStyle: 'normal',
                      margin: '0 0 1.5rem 0',
                      letterSpacing: '-0.01em',
                      textWrap: 'pretty',
                    }}
                  >
                    “Hombre, este sistema es impecable. ¿Cómo lo&nbsp;haces?”
                  </blockquote>
                </div>
                <div style={{ borderTop: '1px solid #E2E2DE', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.94rem', color: '#121210' }}>Carlos Mariño</div>
                    <div style={{ fontSize: '0.82rem', color: '#666660' }}>Virtual Latinos</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'ui-monospace, monospace', color: '#999990' }}>
                    TALENTO GLOBAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Institutional Distinctions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Quadrant 3: Lápiz de Acero - Active Bauhaus Cadmium Yellow Block */}
              <div
                id="award-lapiz-acero"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FDE047',
                  color: '#121210',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #EAB308',
                  transitionDelay: '120ms',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: '#121210',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#121210', display: 'inline-block' }} />
                      [03 / LINAJE DE DISEÑO]
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: '#121210', fontWeight: 700 }}>
                      COLOMBIA
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#121210', margin: '0 0 0.65rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                    Lápiz de Acero
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#262624', lineHeight: 1.6, marginBottom: '1.75rem', textWrap: 'pretty' }}>
                    Reconocido por la excelencia en diseño industrial nacional y oficio de producto en&nbsp;Colombia.
                  </p>
                </div>
                <div
                  style={{
                    borderTop: '1px solid rgba(18, 18, 16, 0.2)',
                    paddingTop: '1rem',
                    fontSize: '0.78rem',
                    fontFamily: 'ui-monospace, monospace',
                    color: '#121210',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                  }}
                >
                  PREMIO NACIONAL DE DISEÑO · COLOMBIA
                </div>
              </div>

              {/* Quadrant 4: Capital Semilla */}
              <div
                id="award-capital-semilla"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  transitionDelay: '180ms',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: '#2563EB',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#2563EB', display: 'inline-block' }} />
                      [04 / LINAJE EMPRENDEDOR]
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: '#121210', fontWeight: 600 }}>
                      MEDELLÍN
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#121210', margin: '0 0 0.65rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                    Capital Semilla
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#444440', lineHeight: 1.6, marginBottom: '1.75rem', textWrap: 'pretty' }}>
                    Galardonado por innovación y emprendimiento tecnológico por la Alcaldía de&nbsp;Medellín.
                  </p>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #E2E2DE',
                    paddingTop: '1rem',
                    fontSize: '0.78rem',
                    fontFamily: 'ui-monospace, monospace',
                    color: '#121210',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                  }}
                >
                  ALCALDÍA DE MEDELLÍN · FONDO DE INNOVACIÓN
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Economic Transparency: Claridad desde el principio (Ledger System) */}
        <section id="transparencia" className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              04 / TRANSPARENCIA ECONÓMICA
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.5rem', textWrap: 'balance' }}>
              Construimos desde la claridad
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', lineHeight: 1.6, textWrap: 'pretty' }}>
              Sabes con precisión qué estás pagando. La inversión principal se define desde el inicio y los recursos externos se muestran con total transparencia.
            </p>
          </div>

          <div className="economic-ledger-split">
            {/* Primary Ledger Card: Direct Design & Development Investment - Dominant Black Ledger */}
            <div
              id="cost-base-investment"
              className="card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#121210',
                color: '#FFFFFF',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #121210',
                minHeight: '260px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'ui-monospace, monospace', color: '#999990', fontWeight: 600, textTransform: 'uppercase' }}>
                    CONCEPTO 01 · TARIFA PRINCIPAL
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    PAGO ÚNICO
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  Inversión base
                </h3>
                <p className="bauhaus-num" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.5rem)', fontWeight: 600, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                  $650.000 COP
                </p>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#D4D4D0', lineHeight: 1.6, margin: 0, borderTop: '1px solid #282824', paddingTop: '1.25rem', textWrap: 'pretty' }}>
                Cubre el diseño y desarrollo completo del sitio dentro del alcance&nbsp;acordado.
              </p>
            </div>

            {/* Ancillary External Costs Ledger: Dominio & Hosting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div
                id="cost-domain"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  transitionDelay: '60ms',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace', color: '#666660', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    CONCEPTO 02 · RECURSO EXTERNO
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#121210', marginBottom: '0.4rem', textWrap: 'balance' }}>
                    Dominio
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#444440', marginBottom: '0.75rem', lineHeight: 1.5, textWrap: 'pretty' }}>
                    Pertenece a tu negocio y se registra a tu&nbsp;nombre.
                  </p>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#666660', lineHeight: 1.5, margin: 0, borderTop: '1px solid #E2E2DE', paddingTop: '0.85rem', textWrap: 'pretty' }}>
                  Un dominio .com o .co suele costar entre $75.000 y $150.000 COP al año según el proveedor y nombre&nbsp;elegido.
                </p>
              </div>

              <div
                id="cost-hosting"
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  borderTop: '3px solid #EF4444',
                  transitionDelay: '120ms',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'ui-monospace, monospace', color: '#666660', textTransform: 'uppercase' }}>
                      CONCEPTO 03 · INFRAESTRUCTURA
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: '#B91C1C',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        padding: '0.1rem 0.4rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                      SIN ATADURAS
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#121210', marginBottom: '0.4rem', textWrap: 'balance' }}>
                    Hosting & Mantenimiento
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#444440', marginBottom: '0.75rem', lineHeight: 1.5, textWrap: 'pretty' }}>
                    Sin mensualidades&nbsp;obligatorias.
                  </p>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#666660', lineHeight: 1.5, margin: 0, borderTop: '1px solid #E2E2DE', paddingTop: '0.85rem', textWrap: 'pretty' }}>
                  Alojamos tu sitio de manera eficiente para que no tengas costos recurrentes innecesarios. Mantenimiento opcional solo cuando requieras cambios o&nbsp;actualizaciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Iteration Model: Lo construimos contigo (Defined Review Rounds) */}
        <section className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              05 / METODOLOGÍA COLECTIVA
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              Lo construimos contigo
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '64ch', textWrap: 'pretty' }}>
              No entregamos una primera versión sin dar seguimiento. Trabajamos contigo paso a paso hasta llegar a un resultado que funcione para tu&nbsp;negocio.
            </p>
          </div>

          <div
            id="review-rounds-container"
            className="colaboracion-split"
          >
            <div
              className="card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E2DE',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.68rem',
                    fontFamily: 'ui-monospace, monospace',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: '#F0F0EC',
                    color: '#121210',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                  CALIDAD CONTROLADA
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#121210', marginBottom: '0.85rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  3 rondas de revisión incluidas
                </h3>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#444440', lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                Durante el desarrollo cuentas con tres sesiones de revisión, de hasta una hora cada una, para evaluar avances, solicitar ajustes y tomar decisiones sobre el&nbsp;resultado.
              </p>
            </div>

            <div
              className="card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E2DE',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.68rem',
                    fontFamily: 'ui-monospace, monospace',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: '#121210',
                    color: '#FFFFFF',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  ALCANCE DEFINIDO
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#121210', marginBottom: '0.85rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  Claridad desde el primer día
                </h3>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#444440', lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                Definimos el alcance del proyecto antes de comenzar para que ambas partes tengamos certeza sobre lo que está&nbsp;incluido.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Integrated Craft: Diseño, desarrollo y experiencia */}
        <section className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              06 / OFICIO INTEGRADO
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.5rem', textWrap: 'balance' }}>
              Una forma diferente de hacer presencia digital
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', lineHeight: 1.6, textWrap: 'pretty' }}>
              Soy Product Design Engineer y trabajo de forma integral en el diseño y la ingeniería de cada producto que&nbsp;construyo.
            </p>
          </div>

          <div className="craft-editorial-layout">
            {/* Cell 1: 15+ Años de Trayectoria (Anchor Lead - Active Cobalt Blue Field connecting to Hero) */}
            <div
              id="craft-card-01"
              className="craft-cell-experience card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#1D4ED8',
                color: '#FFFFFF',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #1E40AF',
                minHeight: '230px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)' }}>
                    01
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                    }}
                  >
                    TRAYECTORIA
                  </span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  15+ años de experiencia
                </h3>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#DBEAFE', lineHeight: 1.6, margin: 0, maxWidth: '44ch', textWrap: 'pretty' }}>
                Trayectoria construyendo productos e interfaces digitales, desde sitios web hasta sistemas interactivos de alta&nbsp;precisión.
              </p>
            </div>

            {/* Cell 2: Diseño + Desarrollo Unificado */}
            <div
              id="craft-card-02"
              className="craft-cell-unified card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #E2E2DE',
                minHeight: '230px',
                transitionDelay: '50ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666660' }}>
                    02
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: '#F0F0EC',
                      color: '#121210',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                    DISCIPLINA DUAL
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#121210', marginBottom: '0.65rem', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                  Diseño + desarrollo
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#444440', lineHeight: 1.58, margin: 0, textWrap: 'pretty' }}>
                No necesitas coordinar diseñadores y programadores por separado. El proyecto se concibe, diseña y programa con una visión&nbsp;unificada.
              </p>
            </div>

            {/* Cell 3: Reconocimientos */}
            <div
              id="craft-card-03"
              className="craft-cell-awards card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #E2E2DE',
                minHeight: '200px',
                transitionDelay: '100ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.75rem', color: '#666660' }}>
                    03
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'ui-monospace, monospace',
                      color: '#666660',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                    DISTINCIÓN
                  </span>
                </div>
                <h3 style={{ fontSize: '1.12rem', fontWeight: 600, color: '#121210', marginBottom: '0.55rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                  Reconocimientos
                </h3>
              </div>
              <p style={{ fontSize: '0.865rem', color: '#444440', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
                Trabajo distinguido en proyectos de diseño e innovación digital, incluyendo un premio Lápiz de Acero, uno de los máximos galardones de diseño en&nbsp;Colombia.
              </p>
            </div>

            {/* Cell 4: Proceso Directo */}
            <div
              id="craft-card-04"
              className="craft-cell-direct card-hover scroll-reveal-scale"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #E2E2DE',
                minHeight: '200px',
                transitionDelay: '150ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="bauhaus-num" style={{ fontSize: '0.75rem', color: '#666660' }}>
                    04
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'ui-monospace, monospace', color: '#666660' }}>
                    RELACIÓN
                  </span>
                </div>
                <h3 style={{ fontSize: '1.12rem', fontWeight: 600, color: '#121210', marginBottom: '0.55rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                  Proceso directo
                </h3>
              </div>
              <p style={{ fontSize: '0.865rem', color: '#444440', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
                Trabajas directamente conmigo durante todo el proceso, sin intermediarios ni pérdidas de&nbsp;información.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Evolution & Post-Launch: Tu sitio después del lanzamiento */}
        <section className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              07 / EVOLUCIÓN CONTINUA
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              Tu sitio después del lanzamiento
            </h2>
          </div>

          <div
            id="post-launch-framework"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E2DE',
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              maxWidth: '820px',
            }}
          >
            <p style={{ color: '#121210', fontSize: '1.05rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.5, textWrap: 'pretty' }}>
              Un sitio web no tiene que quedarse estático.
            </p>
            <p style={{ color: '#444440', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6, textWrap: 'pretty' }}>
              Con la analítica instalada puedes observar cómo interactúan tus visitantes y tomar decisiones fundamentadas sobre tu presencia digital. Si más adelante necesitas nuevas funcionalidades, ampliamos el&nbsp;sitio.
            </p>
            <div
              style={{
                borderLeft: '3px solid #2563EB',
                paddingLeft: '1.15rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#121210',
                lineHeight: 1.5,
                textWrap: 'pretty',
              }}
            >
              El objetivo no es acumular tecnología: es construir exactamente lo que tu negocio&nbsp;necesita.
            </div>
          </div>
        </section>

        {/* 10. Modular Extensions: ¿Qué puede incluir tu proyecto? (Modular Components) */}
        <section className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              08 / MODULARIDAD
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              ¿Qué puede incluir tu proyecto?
            </h2>
            <p style={{ color: '#444440', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '64ch', textWrap: 'pretty' }}>
              La presencia esencial cubre las necesidades fundamentales de un negocio. Si tu operación requiere herramientas específicas, las incorporamos de manera&nbsp;modular:
            </p>
          </div>

          {/* Modular Badges Framework */}
          <div
            id="modular-features-grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.75rem',
            }}
          >
            {[
              'Reservas y agenda',
              'Formularios personalizados',
              'Catálogos de productos',
              'Pasarelas de pago',
              'Integraciones de datos',
              'Automatizaciones',
              'Funcionalidades con IA',
              'Sitios bilingües',
              'Herramientas a la medida',
            ].map((feat) => (
              <span
                key={feat}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D8D8D4',
                  padding: '0.55rem 0.95rem',
                  fontSize: '0.82rem',
                  color: '#121210',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {feat}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '0.85rem', color: '#666660', fontFamily: 'ui-monospace, monospace', margin: 0, display: 'flex', alignItems: 'flex-start', gap: '0.45rem', textWrap: 'pretty' }}>
            <span style={{ color: '#D97706', fontWeight: 700 }}>*</span>
            <span>Estas funcionalidades pueden modificar el alcance y la cotización del proyecto. Siempre se definen y acuerdan antes de&nbsp;comenzar.</span>
          </p>
        </section>

        {/* 11. Investment Synthesis Tile */}
        <section className="scroll-reveal" style={{ padding: '3rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div
            id="investment-summary-tile"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #121210',
              padding: 'clamp(2rem, 4vw, 3.25rem) clamp(1.5rem, 3.5vw, 3rem)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.75rem',
              }}
            >
              <span style={{ width: '4px', height: '4px', backgroundColor: '#D97706', display: 'inline-block' }} />
              SÍNTESIS DE PROPUESTA
            </span>
            <h2
              className="bauhaus-num"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)',
                fontWeight: 600,
                color: '#121210',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
            >
              Proyectos desde $650.000 COP
            </h2>
            <p
              style={{
                color: '#444440',
                fontSize: '0.98rem',
                maxWidth: '60ch',
                margin: '0 auto 1.25rem',
                lineHeight: 1.6,
                textWrap: 'pretty',
              }}
            >
              La inversión base cubre el trabajo de diseño y desarrollo dentro del alcance pactado. Los recursos externos, como dominio o infraestructura según se requiera, se presentan con total&nbsp;independencia.
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#121210',
                fontWeight: 600,
                marginBottom: '2rem',
                lineHeight: 1.5,
                textWrap: 'pretty',
              }}
            >
              Sin costos ocultos ni mensualidades forzadas para mantener tu presencia&nbsp;activa.
            </p>
            <a
              id="investment-summary-cta"
              href="#contacto"
              className="negocios-btn-mobile-full"
              style={{
                backgroundColor: '#121210',
                color: '#FFFFFF',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                minHeight: '48px',
                border: '1px solid #121210',
              }}
            >
              Cuéntame qué necesita tu negocio <span>→</span>
            </a>
          </div>
        </section>

        {/* 12. Systematic Process: ¿Cómo funciona? (4 Explicit Phases) */}
        <section id="proceso" className="scroll-reveal" style={{ padding: '4rem 0 3.5rem', borderTop: '1px solid #E2E2DE' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'ui-monospace, monospace',
                color: '#666660',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              09 / METODOLOGÍA DE TRABAJO
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.75rem', textWrap: 'balance' }}>
              ¿Cómo funciona?
            </h2>
          </div>

          <div className="process-workflow-grid">
            {[
              { num: '01', title: 'Diagnóstico y conversación', desc: 'Hablamos sobre tu negocio, tus objetivos y lo que necesitas lograr con tu presencia digital.', tag: 'DIAGNÓSTICO' },
              { num: '02', title: 'Definición de alcance', desc: 'Estructuramos la propuesta con lo que vamos a construir, qué incluye y los tiempos de entrega.', tag: 'PROPUESTA' },
              { num: '03', title: 'Diseño y desarrollo', desc: 'Diseñamos y programamos el sitio con entregas progresivas y comunicación directa contigo.', tag: 'EJECUCIÓN', accent: '#2563EB' },
              { num: '04', title: 'Revisión y lanzamiento', desc: 'Contamos con tres sesiones de revisión para calibrar detalles. Publicamos el sitio y dejamos la analítica y canales de contacto activos.', tag: 'ENTREGA', accent: '#16A34A' },
            ].map((p, idx) => (
              <div
                key={p.num}
                id={`process-step-${p.num}`}
                className="card-hover scroll-reveal-scale"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(1.75rem, 2.5vw, 2.25rem) clamp(1.5rem, 2vw, 1.85rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #E2E2DE',
                  minHeight: '230px',
                  transitionDelay: `${idx * 50}ms`,
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="bauhaus-num" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#121210' }}>
                      FASE {p.num}
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'ui-monospace, monospace',
                        color: p.accent || '#666660',
                        letterSpacing: '0.05em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: p.accent ? 600 : 400,
                      }}
                    >
                      {p.accent && (
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: p.accent }} />
                      )}
                      {p.tag}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '1.15rem', marginBottom: '0.75rem', color: '#121210', letterSpacing: '-0.015em', textWrap: 'balance' }}>
                    {p.title}
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#444440', lineHeight: 1.58, margin: 0, borderTop: '1px solid #F0F0EC', paddingTop: '1rem', textWrap: 'pretty' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Decisive Action Hub: Contacto */}
        <section id="contacto" className="scroll-reveal" style={{ padding: '4.5rem 0 3.5rem', borderTop: '1px solid #E2E2DE', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontFamily: 'ui-monospace, monospace',
              color: '#666660',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            10 / PUNTO DE ACCIÓN
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.35rem)', fontWeight: 500, color: '#121210', letterSpacing: '-0.02em', marginBottom: '0.85rem', textWrap: 'balance' }}>
            Tu negocio merece una presencia digital clara
          </h2>
          <p style={{ color: '#444440', fontSize: '1.02rem', marginBottom: '2.25rem', maxWidth: '58ch', margin: '0 auto 2.25rem', lineHeight: 1.6, textWrap: 'pretty' }}>
            No necesitas comenzar con un proyecto sobredimensionado. Necesitas una presencia profesional que comunique con claridad lo que haces, facilite el contacto con tus clientes y pueda crecer con tu&nbsp;negocio.
          </p>

          <div className="negocios-cta-actions" style={{ justifyContent: 'center' }}>
            <a
              id="cta-direct-email"
              href="mailto:david@davidraigoza.online?subject=Consulta%20Negocio"
              style={{
                backgroundColor: '#121210',
                color: '#FFFFFF',
                padding: '0.9rem 1.85rem',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.92rem',
                minHeight: '48px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: '1px solid #121210',
              }}
            >
              Cuéntame qué necesita tu negocio <span>→</span>
            </a>
            <a
              id="cta-direct-whatsapp"
              href="https://wa.me/573007747638?text=Hola%20David,%20quiero%20mejorar%20la%20presencia%20digital%20de%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                padding: '0.9rem 1.85rem',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.92rem',
                minHeight: '48px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: '1px solid #15803D',
                boxShadow: '0 4px 12px rgba(21, 128, 61, 0.22)',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#86EFAC', display: 'inline-block' }} />
              Escríbeme por WhatsApp
            </a>
          </div>
        </section>

      </main>

      {/* 14. Clear Architectural Footer */}
      <footer
        id="negocios-footer"
        style={{
          backgroundColor: '#121210',
          color: '#FAFAFA',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid #222220',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
            davidraigoza.design
          </div>
          <p style={{ color: '#888880', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
            Product Design Engineering · Diseño · Desarrollo web
          </p>
          <Link
            id="footer-work-link"
            href="/"
            style={{
              display: 'inline-block',
              border: '1px solid #333330',
              color: '#FAFAFA',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 500,
              marginBottom: '1.75rem',
              minHeight: '40px',
              lineHeight: '1.6',
            }}
          >
            Ver portafolio principal →
          </Link>
          <div style={{ color: '#555550', fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace' }}>
            © David Raigoza
          </div>
        </div>
      </footer>

      {/* Preserved Floating WhatsApp Circular Button with Playful Hover & Microcopy */}
      <div
        id="floating-whatsapp-trigger"
        className="floating-whatsapp-container"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <span
          className="floating-whatsapp-tooltip"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#121210',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid #E2E2DE',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          Habla conmigo 👋
        </span>

        <a
          id="floating-whatsapp-action"
          href="https://wa.me/573007747638?text=Hola%20David%2C%20vi%20davidraigoza.design%20y%20quiero%20hablar%20de%20un%20proyecto"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`dr-wa ${isFooterIntersecting ? 'dr-wa-footer' : ''}`}
          style={{
            width: '56px',
            height: '56px',
            backgroundColor: isFooterIntersecting ? '#FFFFFF' : '#121210',
            color: isFooterIntersecting ? '#121210' : '#FFFFFF',
            borderRadius: '999px',
            display: 'grid',
            placeItems: 'center',
            border: isFooterIntersecting ? '1px solid #FFFFFF' : '1px solid #262626',
            boxShadow: isFooterIntersecting
              ? '0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)'
              : '0 12px 32px rgba(0,0,0,0.25)',
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)'
            e.currentTarget.style.backgroundColor = isFooterIntersecting ? '#EAEAE6' : '#222220'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.backgroundColor = isFooterIntersecting ? '#FFFFFF' : '#121210'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.96)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)'
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M19.05 4.93A9.9 9.9 0 0 0 12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.76.46 3.48 1.33 5L2 22l5.18-1.36A9.86 9.86 0 0 0 12.04 22c5.52 0 10-4.48 10-10a9.86 9.86 0 0 0-2.99-7.07ZM12.04 20.04a8 8 0 0 1-4.08-1.12l-.29-.17-3.08.81.82-3-.19-.31A8.04 8.04 0 0 1 4 12c0-4.42 3.6-8.02 8.04-8.02 2.14 0 4.16.84 5.67 2.36A7.97 7.97 0 0 1 20.06 12c0 4.42-3.6 8.04-8.02 8.04Zm4.41-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </a>
      </div>

      <style>{`
        .dr-wa {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
        }
        .dr-wa-footer {
          background-color: #FFFFFF !important;
          color: #121210 !important;
          border-color: #FFFFFF !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3) !important;
        }
        .dr-wa-footer:hover {
          background-color: #EAEAE6 !important;
        }
        @media (max-width: 640px) {
          .floating-whatsapp-container {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          .dr-wa {
            width: 50px !important;
            height: 50px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dr-wa {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
