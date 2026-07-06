'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const FIGMA_URL =
  'https://www.figma.com/design/vitqU8fVnqheh0gcxVjr4P/QIENeobank?node-id=0-1&t=eyZdLegUR4EbWgeY-1'
const LIVE_URL = 'https://qie-bank.vercel.app/'

const CONTRACTS = [
  { name: 'QIEVault', spec: 'ERC-4626 yield vault', role: 'Deposits, withdrawals, yield accrual' },
  { name: 'QIEIdentity', spec: 'Soulbound NFT', role: 'On-chain identity passport, non-transferable' },
  { name: 'QIELending', spec: 'Lending engine', role: 'Loan origination, repayment, health factor' },
  { name: 'CreditScore', spec: 'Behavioral scoring', role: '5-component 300–850 score with 7-day aging' },
  { name: 'QIENeobank', spec: 'Protocol orchestrator', role: 'Coordinates vault, identity, and lending' },
]

const SCORE_COMPONENTS = [
  { label: 'Accuracy', weight: '36.4%', note: 'On-time repayment rate — highest weight' },
  { label: 'Volume', weight: '18.2%', note: 'Total deposits over lifetime' },
  { label: 'Tenure', weight: '18.2%', note: 'Length of account history' },
  { label: 'Activity', weight: '18.2%', note: 'Deposit frequency' },
  { label: 'Consistency', weight: '9.1%', note: '7-day aging prevents score manipulation' },
]

const LOAN_TIERS = [
  { tier: 'Bronze', score: '300–549', limit: '$1,000', apr: '25%' },
  { tier: 'Silver', score: '550–649', limit: '$5,000', apr: '18%' },
  { tier: 'Gold', score: '650–749', limit: '$20,000', apr: '12%' },
  { tier: 'Platinum', score: '750–850', limit: '$50,000', apr: '8%' },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function QIENeobankCaseStudy() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── BACK NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--muted)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          ← Back
        </Link>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}>
          01 / 2026
        </span>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,240,74,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,240,74,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease 0.1s',
          }}>
            Case Study · QIE Blockchain Hackathon · 2026
          </p>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            QIE Neobank
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Design &amp; Protocol</span>
          </h1>

          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'var(--muted)',
            maxWidth: '52ch',
            lineHeight: 1.75,
            fontWeight: 300,
            marginBottom: '3rem',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.7s ease 0.4s',
          }}>
            A full-stack DeFi neobank on QIE Mainnet. The design challenge:
            make on-chain credit scoring — a 300–850 behavioral score derived
            from 5 smart contract components — feel as familiar as a banking app.
          </p>

          {/* CTA row */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '0.75rem 2rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)')}
            >
              View live app →
            </a>
            <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              padding: '0.75rem 2rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'var(--accent)'
                el.style.color = 'var(--bg)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.color = 'var(--accent)'
              }}
            >
              View Figma designs →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT SHIPPED ─────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Label>What shipped</Label>
        <SectionTitle>Live on QIE Mainnet</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '0',
          border: '1px solid var(--border)',
          marginTop: '2.5rem',
        }}>
          {CONTRACTS.map((c, i) => (
            <div key={c.name} style={{
              padding: '1.75rem',
              borderRight: i < CONTRACTS.length - 1 ? '1px solid var(--border)' : 'none',
              borderBottom: i < CONTRACTS.length - 2 ? '1px solid var(--border)' : 'none',
            }}>
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}>
                {c.name}
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                {c.spec}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
              }}>
                {c.role}
              </p>
            </div>
          ))}
        </div>

        {/* Live app screenshot — the sparse real state */}
        <div style={{ marginTop: '3rem' }}>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            color: 'var(--muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Live app — wallet connected, zero-state dashboard
          </p>
          <div style={{
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--surface)',
          }}>
            {/* We render a representative screenshot of the live sparse state */}
            <div style={{
              background: '#0a0a0a',
              padding: '2rem',
              textAlign: 'center',
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em',
            }}>
              <p style={{ color: '#7F00FE', fontSize: '1rem', marginBottom: '0.5rem' }}>QIE Bank</p>
              <p>qie-bank.vercel.app — requires wallet connection on QIE Mainnet (Chain ID 1990)</p>
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                marginTop: '1rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
              }}>
                Open live app →
              </a>
            </div>
          </div>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.58rem',
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            marginTop: '0.75rem',
            opacity: 0.6,
          }}>
            The live app is functional but sparse at zero state. The Figma designs below show the full product vision.
          </p>
        </div>
      </section>

      {/* ── THE DESIGN CHALLENGE ─────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Label>The design challenge</Label>
        <SectionTitle>Making on-chain credit legible</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '4rem',
          marginTop: '2.5rem',
        }}>
          <div>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--muted)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}>
              A behavioral credit score derived from 5 on-chain components with 7-day
              aging logic is genuinely complex. Users need to understand why their score
              is what it is, what moves it, and what they qualify for — without reading
              a whitepaper.
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--muted)',
              lineHeight: 1.8,
            }}>
              The design job was to make DeFi lending feel as familiar as a bank account,
              without hiding the on-chain mechanics that make it trustworthy. Three
              principles anchored every decision: Clarity, Trust, Efficiency.
            </p>
          </div>

          {/* Score components breakdown */}
          <div style={{ border: '1px solid var(--border)' }}>
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Credit score components
            </div>
            {SCORE_COMPONENTS.map((s, i) => (
              <div key={s.label} style={{
                padding: '1rem 1.5rem',
                borderBottom: i < SCORE_COMPONENTS.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text)',
                    letterSpacing: '0.08em',
                    marginBottom: '0.25rem',
                  }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {s.note}
                  </p>
                </div>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  whiteSpace: 'nowrap',
                }}>
                  {s.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM ────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Label>Foundation</Label>
        <SectionTitle>Design system</SectionTitle>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
          maxWidth: '52ch',
          marginTop: '1rem',
          marginBottom: '2.5rem',
        }}>
          Built a full design system before touching screens — typography scale,
          color tokens (primary purple, neutral dark, semantic states), spacing
          scale, and component library. This made the dashboard and lending flows
          consistent and fast to build.
        </p>

        <div style={{
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/case-studies/qie/design-system.png"
            alt="QIE Bank design system — typography, color palette, components"
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* ── SCREENS ──────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Label>The full vision</Label>
        <SectionTitle>Dashboard &amp; Lending flows</SectionTitle>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
          maxWidth: '52ch',
          marginTop: '1rem',
          marginBottom: '3rem',
        }}>
          The Figma designs show the complete product: a rich dashboard surfacing
          balance, borrow power, health factor, credit score, and loan exposure
          at a glance — then a dedicated lending flow for requesting loans and
          understanding tier eligibility.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Dashboard — full width */}
          <ScreenCard
            src="/images/case-studies/qie/dashboard.png"
            alt="QIE Bank dashboard — balance, credit score breakdown, loan exposure, recent activity"
            caption="Dashboard — balance, borrow power, health factor, credit score (750/850 Platinum), loan exposure, and recent activity in one view"
          />

          {/* Lending — two screens side by side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '1.5rem',
          }}>
            <ScreenCard
              src="/images/case-studies/qie/lending-score.png"
              alt="QIE Bank lending — credit score overview with score breakdown"
              caption="Lending overview — score at 750, max loan, interest rate, unsecured limit, score breakdown by component"
            />
            <ScreenCard
              src="/images/case-studies/qie/lending-request.png"
              alt="QIE Bank — loan request form with tier breakdown"
              caption="Request loan — amount, optional collateral, real-time terms, and full tier table (Bronze → Platinum)"
            />
          </div>
        </div>
      </section>

      {/* ── LOAN TIERS ───────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Label>System logic</Label>
        <SectionTitle>Four loan tiers</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '0',
          border: '1px solid var(--border)',
          marginTop: '2.5rem',
        }}>
          {LOAN_TIERS.map((t, i) => (
            <div key={t.tier} style={{
              padding: '2rem 1.5rem',
              borderRight: i < LOAN_TIERS.length - 1 ? '1px solid var(--border)' : 'none',
              position: 'relative',
            }}>
              {/* Purple accent for Platinum */}
              {t.tier === 'Platinum' && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #7F00FE, transparent)',
                }} />
              )}
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: t.tier === 'Platinum' ? '#9D38F4' : 'var(--muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                {t.tier}
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.6rem',
                fontStyle: 'italic',
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}>
                {t.limit}
              </p>
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: 'var(--accent)',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                {t.apr} APR
              </p>
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: 'var(--muted)',
                letterSpacing: '0.08em',
              }}>
                Score {t.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '3rem',
      }}>
        <div>
          <Label>Stack</Label>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Solidity 0.8.24', 'OpenZeppelin 5', 'ERC-4626', 'Soulbound NFT', 'Next.js 16', 'Wagmi + Viem', 'RainbowKit', 'Tailwind CSS', 'Figma', 'Certora'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid var(--border-hi)',
                color: 'var(--muted)',
                padding: '0.25rem 0.6rem',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <Label>Deployed to</Label>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.4rem',
            fontStyle: 'italic',
            color: 'var(--text)',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}>
            QIE Mainnet
          </p>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.08em',
          }}>
            Chain ID 1990 · 5 contracts verified on-chain
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(127,0,254,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Explore the work
        </p>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text)',
          marginBottom: '2.5rem',
          lineHeight: 1.1,
        }}>
          See the full design in Figma
          <br />
          <span style={{ color: 'var(--muted)', fontSize: '0.6em' }}>or connect a wallet to use the live protocol</span>
        </h2>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
            background: 'var(--accent)',
            padding: '1rem 2.5rem',
            textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--text)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)')}
          >
            Open Figma →
          </a>
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            padding: '1rem 2.5rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--accent)'
              el.style.color = 'var(--bg)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.color = 'var(--accent)'
            }}
          >
            Live app →
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          textDecoration: 'none',
        }}>
          ← All work
        </Link>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}>
          © {new Date().getFullYear()} David Raigoza
        </span>
      </footer>
    </main>
  )
}

// ─── SMALL SHARED COMPONENTS ─────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: 'var(--accent)',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      color: 'var(--text)',
      lineHeight: 1.1,
    }}>
      {children}
    </h2>
  )
}

function ScreenCard({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div>
      <div style={{
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={700}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.58rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        marginTop: '0.75rem',
        opacity: 0.6,
        lineHeight: 1.6,
      }}>
        {caption}
      </p>
    </div>
  )
}