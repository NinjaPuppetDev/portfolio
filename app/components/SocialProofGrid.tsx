'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Award, Trophy, Quote, Sparkles } from 'lucide-react'

export default function SocialProofGrid() {
  const t = useTranslations('home.socialProof')

  return (
    <section
      id="social-proof"
      aria-labelledby="social-proof-heading"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(1rem, 2.5vw, 2rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 5vw, 4.5rem)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <style>{`
        .social-proof-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }

        @media (max-width: 768px) {
          .social-proof-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .social-proof-card {
          background-color: var(--surface, #0f0f0f);
          border: 1px solid var(--border, #1e1e1e);
          border-radius: 12px;
          padding: clamp(1.5rem, 2.5vw, 2rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .social-proof-card:hover {
          border-color: var(--border-hi, #2e2e2e);
          background-color: #121212;
          transform: translateY(-2px);
        }

        .award-image-wrap {
          position: relative;
          width: 88px;
          height: 88px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .award-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          z-index: 2;
          background: #111;
        }
      `}</style>

      {/* Section Eyebrow Header */}
      <div
        style={{
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span
          id="social-proof-heading"
          style={{
            fontFamily: 'var(--mono, monospace)',
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--muted, #8a857d)',
          }}
        >
          {t('eyebrow')}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
          }}
        />
      </div>

      <div className="social-proof-grid" role="list">
        {/* ── CARD 1: Client Success (Direct Human Social Proof) ────────── */}
        <article
          id="social-proof-card-1"
          className="social-proof-card"
          role="listitem"
          aria-label={t('card1.tag')}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent, #c8f04a)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8a857d)',
                }}
              >
                {t('card1.tag')}
              </span>
            </div>

            <blockquote style={{ margin: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--serif, Georgia, serif)',
                  fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.55,
                  color: 'var(--text, #e8e2d9)',
                  margin: 0,
                }}
              >
                &ldquo;{t('card1.quote')}&rdquo;
              </p>
            </blockquote>
          </div>

          <footer
            style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--sans, sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text, #e8e2d9)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                — {t('card1.author')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  color: 'var(--muted, #736d65)',
                  margin: '0.2rem 0 0 0',
                  letterSpacing: '0.04em',
                }}
              >
                {t('card1.role')}
              </p>
            </div>
            <Quote
              size={18}
              strokeWidth={1.5}
              style={{ color: 'var(--muted, #5a5650)', opacity: 0.5 }}
              aria-hidden="true"
            />
          </footer>
        </article>

        {/* ── CARD 2: Technical Validation (Direct Human Social Proof) ─── */}
        <article
          id="social-proof-card-2"
          className="social-proof-card"
          role="listitem"
          aria-label={t('card2.tag')}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber, #f0a020)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8a857d)',
                }}
              >
                {t('card2.tag')}
              </span>
            </div>

            <blockquote style={{ margin: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--serif, Georgia, serif)',
                  fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.55,
                  color: 'var(--text, #e8e2d9)',
                  margin: 0,
                }}
              >
                &ldquo;{t('card2.quote')}&rdquo;
              </p>
            </blockquote>
          </div>

          <footer
            style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--sans, sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text, #e8e2d9)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                — {t('card2.author')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  color: 'var(--muted, #736d65)',
                  margin: '0.2rem 0 0 0',
                  letterSpacing: '0.04em',
                }}
              >
                {t('card2.role')}
              </p>
            </div>
            <Sparkles
              size={18}
              strokeWidth={1.5}
              style={{ color: 'var(--muted, #5a5650)', opacity: 0.5 }}
              aria-hidden="true"
            />
          </footer>
        </article>

        {/* ── CARD 3: Design Pedigree (Lápiz de Acero Award) ──────────── */}
        <article
          id="social-proof-card-3"
          className="social-proof-card"
          role="listitem"
          aria-label={t('card3.tag')}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#7a9420',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8a857d)',
                }}
              >
                {t('card3.tag')}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--serif, Georgia, serif)',
                fontSize: 'clamp(1.25rem, 1.5vw, 1.45rem)',
                color: 'var(--text, #e8e2d9)',
                fontWeight: 400,
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.01em',
              }}
            >
              {t('card3.title')}
            </h3>
            <p
              style={{
                fontFamily: 'var(--sans, sans-serif)',
                fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
                lineHeight: 1.6,
                color: 'var(--text-muted, rgba(255, 255, 255, 0.65))',
                fontWeight: 300,
                margin: 0,
              }}
            >
              {t('card3.description')}
            </p>
          </div>

          <footer
            style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div className="award-image-wrap">
                <img
                  id="award-img-lapiz-de-acero"
                  src="/awards/lapiz-de-acero.jpg"
                  alt={t('card3.title')}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.dataset.retried) {
                      target.dataset.retried = 'true'
                      target.src = '/awards/lapiz-de-acero.png'
                    } else {
                      target.style.display = 'none'
                    }
                  }}
                  className="award-img"
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--sans, sans-serif)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--text, #e8e2d9)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('card3.subtitle')}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--mono, monospace)',
                    fontSize: '0.625rem',
                    color: 'var(--muted, #736d65)',
                    margin: '0.15rem 0 0 0',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Premio Nacional de Diseño
                </p>
              </div>
            </div>
            <Trophy
              size={18}
              strokeWidth={1.5}
              style={{ color: 'var(--muted, #5a5650)', opacity: 0.5, flexShrink: 0 }}
              aria-hidden="true"
            />
          </footer>
        </article>

        {/* ── CARD 4: Entrepreneurship Pedigree (Capital Semilla) ─────── */}
        <article
          id="social-proof-card-4"
          className="social-proof-card"
          role="listitem"
          aria-label={t('card4.tag')}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber, #f0a020)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8a857d)',
                }}
              >
                {t('card4.tag')}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--serif, Georgia, serif)',
                fontSize: 'clamp(1.25rem, 1.5vw, 1.45rem)',
                color: 'var(--text, #e8e2d9)',
                fontWeight: 400,
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.01em',
              }}
            >
              {t('card4.title')}
            </h3>
            <p
              style={{
                fontFamily: 'var(--sans, sans-serif)',
                fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
                lineHeight: 1.6,
                color: 'var(--text-muted, rgba(255, 255, 255, 0.65))',
                fontWeight: 300,
                margin: 0,
              }}
            >
              {t('card4.description')}
            </p>
          </div>

          <footer
            style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div className="award-image-wrap">
                <img
                  id="award-img-capital-semilla"
                  src="/awards/capital-semilla.png"
                  alt={t('card4.title')}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.dataset.retried) {
                      target.dataset.retried = 'true'
                      target.src = '/awards/capital-semilla.jpg'
                    } else {
                      target.style.display = 'none'
                    }
                  }}
                  className="award-img"
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--sans, sans-serif)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--text, #e8e2d9)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('card4.subtitle')}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--mono, monospace)',
                    fontSize: '0.625rem',
                    color: 'var(--muted, #736d65)',
                    margin: '0.15rem 0 0 0',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Fondo de Innovación
                </p>
              </div>
            </div>
            <Award
              size={18}
              strokeWidth={1.5}
              style={{ color: 'var(--muted, #5a5650)', opacity: 0.5, flexShrink: 0 }}
              aria-hidden="true"
            />
          </footer>
        </article>
      </div>
    </section>
  )
}