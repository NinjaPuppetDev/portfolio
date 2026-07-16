'use client'

import ProjectCard from './ProjectCard'
import HeroSection from './HeroSection'
import CardGrid from './CardGrid'
import ContactForm from './ContactForm'

// ── PAS PROJECT DATA MAPS ───────────────────────────────────────────────────────
const web3Projects = [
  {
    index: '01',
    year: '2026',
    title: 'QIE Neobank',
    // SUBTITLE: Agitates the onboarding barrier of Web3
    subtitle: 'Solving the 99% bounce rate in decentralized banking with frictionless abstraction layers',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js', 'Figma'],
    // DESCRIPTION: Framed as Problem ➔ Agitation ➔ Solution
    description:
      'Web3 protocols bleed users during onboarding because non-custodial custody is intimidating. We designed a full-stack DeFi ecosystem that abstracts protocol friction—end-to-end UX architecture and matching smart contracts, mapping a seamless account-abstraction flow that was shortlisted out of 411 global submissions.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '02',
    year: '2026',
    title: 'Bruma Protocol',
    // SUBTITLE: Agitates the complexity of reading volatile smart contract data
    subtitle: 'Translating cryptic oracle payloads into human risk narratives during volatile settlement windows',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    // DESCRIPTION: Framed as Problem ➔ Agitation ➔ Solution
    description:
      'Most derivative platforms fail because users cannot decipher real-time contract states when volatility spikes. We integrated automated smart-contract telemetry with contextual AI summaries (via Groq API), turning raw, complex blockchain data streams into clear, actionable risk visualization interfaces.',
    link: 'https://bruma-protocol.vercel.app/',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '06',
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
  },
]

const productProjects = [
  {
    index: '03',
    year: '2026',
    title: 'ApplyIQ',
    // SUBTITLE: Agitates sluggish database bottlenecks and delayed interfaces
    subtitle: 'Replacing sluggish database pipelines with sub-100ms real-time telemetry dashboards',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'Dashboard UI'],
    // DESCRIPTION: Framed as Problem ➔ Agitation ➔ Solution
    description:
      'When internal data tables are backed by slow, rigid databases, operations stall. We migrated an enterprise tracking platform from Airtable to Supabase, optimizing the schema to support sub-100ms interface updates, and built custom, reactive telemetry dashboards to monitor live data funnels without operational lag.',
    link: 'https://applyiq-job-scanner.vercel.app/',
    linkLabel: 'View Job Scanner',
    accent: 'var(--accent)',
    variant: 'product' as const,
  },
]

const brandProjects = [
  {
    index: '04',
    year: '2011–2016',
    title: 'Pepe Matilda',
    // SUBTITLE: Agitates the fragmentation of premium brands ignoring physical-to-digital cohesion
    subtitle: 'Unifying custom physical manufacturing pipelines with high-end e-commerce experiences',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Brand Systems', 'E-commerce UI'],
    description:
      "Most premium physical brands fall flat because their digital presence lacks tactile craftsmanship. We engineered custom physical-to-digital manufacturing pipelines, modeled luxury consumer products in 3D, and designed a comprehensive digital interface. Awarded Colombia's national Lápiz de Acero (2013).",
    link: '/work/pepe-matilda',
    linkLabel: 'View project',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/pepe-matilda/PepeMatilda.png',
  },
  {
    index: '05',
    year: '2024',
    title: 'NextStep',
    // SUBTITLE: Agitates generic web commerce UX
    subtitle: 'Replacing generic e-commerce layouts with customization-first parametric workflows',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'Standard template checkout flows destroy conversion rates for bespoke, high-end products. For this custom 3D-printed footwear brand, we designed a parametric, visual-first configuration flow—utilizing Blender 3D rendering and a high-contrast dark visual framework to drive immediate user action.',
    link: '/work/next-step',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/nextstep/NextStep.png',
  },
  {
    index: '06',
    year: '2024',
    title: 'Marigold Bloom',
    subtitle: 'Translating tactile botanical experiences into expressive, high-conversion digital spaces',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'The biggest hurdle for clean cosmetics is establishing trust in a dry, transactional web store. We built a cohesive omnichannel identity and designed a ritual-driven digital interface, combining warm editorial design systems with a storytelling purchase path that mirrors the offline product experience.',
    link: '/work/marigold-bloom',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/marigold/Marigold.png',
  },
]

// ── SECTION LABELS ─────────────────────────────────────────────────────────────
function SectionLabel({ label, count, accent = 'var(--accent)' }: { label: string; count: number; accent?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '1.25rem',
      marginBottom: '0',
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
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1.5rem',
          marginBottom: '3rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text)',
          }}>
            Selected Solutions
          </h2>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.15em',
          }}>
            {String(web3Projects.length + productProjects.length + brandProjects.length).padStart(2, '0')} case studies
          </span>
        </div>

        {/* Web3 Track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="01 / Decentralized Protocols & Web3 Friction" count={web3Projects.length} accent="var(--accent)" />
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        {/* Product Track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="02 / Latency, Speed & Systemic Interface Bottlenecks" count={productProjects.length} accent="var(--accent)" />
          <div style={{
            backgroundColor: '#0A0A0A',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.04)',
            borderRight: '1px solid rgba(0, 0, 0, 0.6)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.9)',
            borderRadius: '16px',
            boxShadow: '0 16px 32px -12px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
            overflow: 'hidden'
          }}>
            <ProjectCard {...productProjects[0]} />
          </div>
        </div>

        {/* Brand Track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="03 / Visual Storytelling & Experience Engineering" count={brandProjects.length} accent="var(--amber)" />
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      {/* ── OPERATIONAL STRATEGY (ABOUT) ───────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '4rem',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Strategy
          </p>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 300,
            lineHeight: 1.35,
            color: 'var(--text)',
            fontStyle: 'italic',
          }}>
            "Building technical infrastructure is empty if the user interface forces dropoff."
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            We operate at the friction point where advanced technical architecture meets direct business conversion.
            By designing and coding under one roof, we eliminate the traditional, broken handoff model between
            external creative agencies and internal developer teams.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Our approach treats UI performance, reactive state engines, and visual storytelling as unified mechanisms
            engineered to decrease user churn. Whether designing complex on-chain transaction flows, deploying highly
            optimized Supabase relational databases, or styling high-contrast parametric web structures, we build
            products that speak clearly to humans.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Currently working with founders and technical leaders who need a partner capable of owning the product
            lifecycle from first sketch to live, production-grade code—no juniors, no handoff, one point of contact
            from kickoff to launch.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {['Product Design', 'Design Systems', 'Next.js', 'Solidity', 'Supabase', 'Figma', 'Blender / 3D', 'Agentic UX', 'Telemetry Architecture'].map(s => (
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
    </main>
  )
}