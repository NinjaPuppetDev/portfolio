'use client'

import ProjectCard from './ProjectCard'
import HeroSection from './HeroSection'
import CardGrid from './CardGrid'
import ContactForm from './ContactForm'
import EssaySection from './EssaySection'
import TechStackBanner from './TechStackBanner'

// ── RESTRUCTURED & REORDERED PROJECT TRACKS ───────────────────────────────────

// Track 01: High-Speed AI & Product Engineering
const productProjects = [
  {
    index: '01',
    year: '2026',
    title: 'Virtual Portfolio Hub',
    subtitle: 'Replacing static portfolio templates with real-time conversational intelligence',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    description:
      'Award-winning platform created during an AI bootcamp competition. Built to demonstrate high-velocity full-stack design engineering by combining conversational AI agents with dynamic project filtering and contextual telemetry.',
    link: 'https://aistudio.google.com/apps/a6a43dcb-0f83-4b02-aed2-169360546c3a?fullscreenApplet=true',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/portfolio-hub/hub-preview.png', // Add your image path here
  },
  {
    index: '02',
    year: '2026',
    title: 'SiftParity (ApplyIQ)',
    subtitle: 'Replacing sluggish database pipelines with sub-100ms real-time telemetry dashboards',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'Dashboard UI'],
    description:
      'When internal data tables are backed by slow, rigid databases, operations stall. We migrated an enterprise tracking platform from Airtable to Supabase, optimizing the relational schema to support sub-100ms interface updates and real-time telemetry.',
    link: 'https://applyiq-job-scanner.vercel.app/',
    linkLabel: 'View live app',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/siftparity/job-scanner-preview.png', // Add your image path here
  },
]

// Track 02: On-Chain Protocols & Web3 Friction
const web3Projects = [
  {
    index: '03',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'Solving the 99% bounce rate in decentralized banking with frictionless abstraction layers',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js'],
    description:
      'Web3 protocols bleed users during onboarding because non-custodial custody is intimidating. We designed a full-stack DeFi ecosystem that abstracts protocol friction—end-to-end UX architecture and matching smart contracts shortlisted out of 411 global submissions.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/qie/qie-preview.png', // Add your image path here
  },
  {
    index: '04',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Translating cryptic oracle payloads into human risk narratives during volatile settlement windows',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    description:
      'Most derivative platforms fail because users cannot decipher real-time contract states when volatility spikes. We integrated automated smart-contract telemetry with contextual AI summaries, turning raw blockchain streams into clear risk interfaces.',
    link: 'https://bruma-protocol.vercel.app/',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/bruma/bruma-preview.png', // Add your image path here
  },
  {
    index: '05',
    year: '2026',
    title: 'GitHub Core',
    subtitle: 'Immutable protocol infrastructure and state systems built for raw operational transparency',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    description:
      "We don't hide behind high-fidelity mockups. This is the active repository containing the production-grade smart contracts, protocol interfaces, and telemetry systems driving our shipped products—open for immediate architectural audit.",
    link: 'https://github.com/NinjaPuppetDev',
    linkLabel: 'View on GitHub',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/github/github-preview.png', // Optional: attach repo preview or architecture diagram
  },
]

// Track 03: Physical-to-Digital, 3D & Brand Systems
const brandProjects = [
  {
    index: '06',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Unifying custom physical manufacturing pipelines with high-end e-commerce experiences',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Brand Systems', 'E-commerce UI'],
    description:
      "Most premium physical brands fall flat because their digital presence lacks tactile craftsmanship. We engineered custom physical-to-digital manufacturing pipelines, modeled luxury consumer products in 3D, and designed a digital interface awarded Colombia's national Lápiz de Acero (2013).",
    link: '/work/pepe-matilda',
    linkLabel: 'View project',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/pepe-matilda/PepeMatilda.png',
  },
  {
    index: '07',
    year: '2024',
    title: 'NextStep',
    subtitle: 'Replacing generic e-commerce layouts with customization-first parametric workflows',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'Standard template checkout flows destroy conversion rates for bespoke, high-end products. For this custom 3D-printed footwear brand, we designed a parametric visual configuration flow—utilizing Blender 3D rendering to drive immediate user action.',
    link: '/work/next-step',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/nextstep/NextStep.png',
  },
  {
    index: '08',
    year: '2024',
    title: 'Marigold Bloom',
    subtitle: 'Translating tactile botanical experiences into expressive, high-conversion digital spaces',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'The biggest hurdle for clean cosmetics is establishing trust in a transactional store. We built a cohesive omnichannel identity and designed a ritual-driven digital interface combining warm editorial design systems with a storytelling purchase path.',
    link: '/work/marigold-bloom',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/marigold/Marigold.png',
  },
]

// ── SECTION LABEL COMPONENT ──────────────────────────────────────────────────
function SectionLabel({ label, count, accent = 'var(--accent)' }: { label: string; count: number; accent?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '1.25rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.6rem',
        color: accent,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.55rem',
        color: 'var(--border-hi)',
        letterSpacing: '0.1em',
      }}>
        {String(count).padStart(2, '0')} proof points
      </span>
    </div>
  )
}

// ── LANDING PAGE MAIN COMPONENT ────────────────────────────────────────────────
export default function LandingPage() {
  const totalCount = productProjects.length + web3Projects.length + brandProjects.length

  return (
    <main 
      style={{ 
        position: 'relative', 
        backgroundColor: 'var(--bg)', 
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Solid gradient mask matching global background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '220px',
        background: 'linear-gradient(180deg, var(--bg) 0%, rgba(8, 8, 8, 0.7) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* Subsurface ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-180px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1300px',
        height: '450px',
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 60%, transparent 100%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <HeroSection />
      <TechStackBanner />

      {/* ── SELECTED SOLUTIONS (WORK) ─────────────────────────────────── */}
      <section
        id="work"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header & Founder Pitch */}
        <div style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2.5rem',
          marginBottom: '4.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '1.25rem',
          }}>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text)',
            }}>
              Selected Solutions
            </h2>
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              {String(totalCount).padStart(2, '0')} De-Risked Proof Points
            </span>
          </div>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            color: 'var(--text)',
            lineHeight: 1.6,
            maxWidth: '75ch',
            fontWeight: 300,
          }}>
            Engineered to help founders test fast, learn what clients actually want, and iterate without headaches. 
            We replace heavy agency timelines and AWS surprise bills with lean Next.js + Supabase architectures, sub-100ms UI performance, and AI-driven automated test suites.
          </p>
        </div>

        {/* Track 01: High-Speed AI & SaaS Systems */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 6rem)' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <SectionLabel label="01 / Rapid Validation & AI-Driven SaaS Engines" count={productProjects.length} accent="var(--accent)" />
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '-0.75rem', marginBottom: '2rem', maxWidth: '70ch', lineHeight: 1.65 }}>
              Launch in days, not months. We combine Next.js and Supabase into lean, predictable stacks, leveraging AI agents to build comprehensive test suites and telemetry before your first customer onboards.
            </p>
          </div>
          <CardGrid projects={productProjects} cols={2} />
        </div>

        {/* Track 02: On-Chain Protocols & Web3 Friction */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 6rem)' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <SectionLabel label="02 / Friction-Free Onboarding & Protocol Telemetry" count={web3Projects.length} accent="var(--accent)" />
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '-0.75rem', marginBottom: '2rem', maxWidth: '70ch', lineHeight: 1.65 }}>
              Eliminating onboarding dropoff. We translate complex smart-contract payloads into clean, human-readable risk interfaces so non-crypto users actually convert and stay.
            </p>
          </div>
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        {/* Track 03: High-Conversion Web Architecture & Brand Systems */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <SectionLabel label="03 / High-Conversion Web Architecture & Systems" count={brandProjects.length} accent="var(--amber)" />
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '-0.75rem', marginBottom: '2rem', maxWidth: '70ch', lineHeight: 1.65 }}>
              Zero heavy asset bloat or sluggish templates. We build fast, responsive digital spaces designed to capture immediate user feedback, test messaging, and turn visitors into active customers.
            </p>
          </div>
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      {/* ── OPERATIONAL STRATEGY (ABOUT) ───────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '4rem',
          marginBottom: '5rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--accent)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              04 / Operational Thesis
            </p>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: 'var(--text)',
              fontStyle: 'italic',
            }}>
              "Complex backend power is useless if the interface forces user dropoff."
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>
              I operate at the intersection of high-fidelity product design and full-stack frontend architecture. By owning both the Figma design systems and the production Next.js codebase, I eliminate the broken agency-to-developer handoff entirely.
            </p>
          </div>
        </div>

        {/* 3-Column Execution Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem',
        }}>
          {/* Pillar 1 */}
          <div style={{
            padding: '2rem',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              01 // ZERO-HANDOFF
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              Figma to Production
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              One contact. One architect. Direct translation of complex UI components, interactive states, and parametric 3D models into clean Next.js/React code.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{
            padding: '2rem',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              02 // SPEED & TELEMETRY
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              Sub-100ms Dashboards
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              Optimized relational schemas (Supabase), reactive state logic, and conversational AI agents designed to handle live data streams with zero UI lag.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{
            padding: '2rem',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              03 // DOMAIN AGNOSTIC
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              SaaS, Web3 & E-Com
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              From abstracting crypto onboarding friction to designing high-conversion parametric e-commerce flows for physical luxury goods.
            </p>
          </div>
        </div>

        {/* Stack Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.6rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', marginRight: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Capabilities ::
          </span>
          {['Product Design', 'Design Systems', 'Next.js', 'Solidity', 'Supabase', 'Figma', 'Blender / 3D', 'Agentic UX', 'Telemetry Architecture'].map(s => (
            <span key={s} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid var(--border-hi)',
              color: 'var(--text)',
              padding: '0.3rem 0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── CONVERSIONS (CONTACT) ─────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(200,240,74,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '4rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Inquiry
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Let's build your<br />first launch.
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '36ch' }}>
              Tell us where the launch is stuck—design, code, or the funnel between them. We'll tell you exactly what it takes to ship it.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>
              raigoza.david.j@gmail.com
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <EssaySection />

    </main>
  )
}