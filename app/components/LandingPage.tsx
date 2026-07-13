'use client'

import ProjectCard from './ProjectCard'
import HeroSection from './HeroSection'
import CardGrid from './CardGrid'
import ContactForm from './ContactForm'

// ── PROJECT DATA ───────────────────────────────────────────────────────────────
const web3Projects = [
  {
    index: '01',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'Designing mass onboarding layers and non-custodial liquidity interfaces for decentralized banking',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js', 'Figma'],
    description:
      'A full-stack DeFi banking ecosystem built to abstract protocol friction. Shortlisted out of 411 global submissions. Developed end-to-end UX architecture and matching smart contracts, mapping a seamless next-generation onboarding roadmap using account abstraction.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '02',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Translating complex oracle logic into intuitive, real-time derivative risk visualization interfaces',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    description:
      'A trustless protocol and interface designed to trade environmental risk. Integrated automated contract states with contextual AI descriptions (via Groq API), translating raw blockchain telemetry into clear human narratives during highly volatile settlement windows.',
    link: 'https://bruma-protocol.vercel.app/',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
  },
  {
    index: '06',
    year: '2026',
    title: 'GitHub',
    subtitle: 'Open-source immutable protocol repositories, state systems, and deployment infrastructure',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    description:
      'Active repository where the work lives. Smart contracts, protocol interfaces, and the reactive telemetry backend driving this site — version-controlled from first commit to production.',
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
    subtitle: 'Architecting a real-time data ingestion dashboard and serverless automation CRM',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'Dashboard UI'],
    description:
      'Engineered an internal production tracking CRM, migrating the foundational layer from Airtable to Supabase to support sub-100ms interface reactivity. Built custom telemetry dashboards to track data streams, user funnels, and real-time scheduling hooks.',
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
    subtitle: 'Structuring premium e-commerce systems, physical-to-digital brand matrixes, and high-craft industrial pipelines',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Brand Systems', 'E-commerce UI'],
    description:
      "Built from 0 to 1: engineered custom physical-to-digital manufacturing pipelines, modeled luxury consumer products in 3D, and designed the comprehensive e-commerce layout. Awarded Colombia's national Lápiz de Acero (2013) and exhibited at MAMM.",
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
    subtitle: 'Developing a high-contrast parametric visual infrastructure and customization-first UX flow for physical manufacturing',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'Full brand and UI system for a 3D-printed custom footwear brand. Designed the visual identity, landing page, and email marketing — built around a high-contrast dark aesthetic with neon green accents, 3D-rendered product shots, and a customization-first UX flow.',
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
    subtitle: 'Engineering a cohesive experiential omnichannel identity and ritual-driven digital interface',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'End-to-end brand and UI system for a botanical skincare brand. Developed the visual identity, e-commerce landing page, and Instagram content system — warm earthy tones, serif typography, and a ritual-driven narrative translated consistently from web to social.',
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
        {String(count).padStart(2, '0')} projects
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
      {/* ── SOLID GRADIENT MASK MATCHING GLOBAL BACKGROUND ── */}
      {/* Uses var(--bg) (#080808) to dissolve any background layout grid lines from the hero section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '220px',
        background: 'linear-gradient(180deg, var(--bg) 0%, rgba(8, 8, 8, 0.7) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 3, // Sits cleanly under your global noise/scanlines but masks the hero grid template
      }} />

      {/* ── SUBSURFACE WHITE AMBIENT GLOW ── */}
      {/* Soft, low-intensity white blur giving top fold depth around your navigation capsule */}
      <div style={{
        position: 'absolute',
        top: '-180px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1300px',
        height: '450px',
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0.005) 60%, transparent 100%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <HeroSection />

      {/* ── WORK ──────────────────────────────────────────────────────── */}
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
            Selected Work
          </h2>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.15em',
          }}>
            {String(web3Projects.length + productProjects.length + brandProjects.length).padStart(2, '0')} projects
          </span>
        </div>

        {/* Web3 Track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Protocol & Web3 Architecture" count={web3Projects.length} accent="var(--accent)" />
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        {/* Product Track */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Product Interfaces & Systems" count={productProjects.length} accent="var(--accent)" />
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
          <SectionLabel label="Brand Storytelling & Craft" count={brandProjects.length} accent="var(--amber)" />
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
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
            About
          </p>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 300,
            lineHeight: 1.35,
            color: 'var(--text)',
            fontStyle: 'italic',
          }}>
            "It's not only the technical that drives a project, it's also the emotional."
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            I am a product designer-engineer operating at the thin line where 
            complex technology meets human story. My work ranges from physical high-craft 
            manufacturing to deploying trustless smart contracts — leveraging an unconventional 
            background to build interfaces that feel intuitive, seamless, and emotionally resonant.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            I treat code, AI, and design systems not as separate skills, but as unified mechanisms 
            for disruption. Whether optimizing sub-100ms dashboards on relational data pipelines, 
            abstracting away the onboarding friction of Web3 protocols, or utilizing language models to 
            turn raw user telemetry into expressive experiences, I build systems that tell a story.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Currently open to high-agency product roles, design-engineering tracks, and spaces 
            looking for someone who solves hard systemic problems by designing with both hands.
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

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
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
              Contact
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Let's build<br />something.
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '36ch' }}>
              Open to remote roles, freelance projects, and interesting conversations. Available EST hours.
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