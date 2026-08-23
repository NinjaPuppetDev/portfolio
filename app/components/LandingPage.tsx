'use client'

import HeroSection from './HeroSection'
import ProjectHorizontalTrack from './ProjectHorizontalTrack'
import ContactForm from './ContactForm'
import EssaySection from './EssaySection'
import TechStackBanner from './TechStackBanner'
import WhyOnePartner from './WhyOnePartner'
import Labs from './Labs'

// ── PROJECT TRACKS (unchanged content, metadata, tags, links, chronology) ─────

// Track 01: Rapid Validation & AI-Driven Products
const productProjects = [
  {
    index: '01',
    year: '2026',
    title: 'Virtual Portfolio Hub',
    subtitle: 'An AI-powered portfolio that turns a static showcase into an interactive conversation.',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    description:
      'An interactive portfolio that turns project work into a searchable professional profile.',
    link: 'work/virtual-portfolio-hub',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/virtual-portfolio-hub/hub-preview.png',
  },
  {
    index: '02',
    year: '2026',
    title: 'SiftParity (ApplyIQ)',
    subtitle: 'Turning a slow enterprise tracking system into a responsive, real-time workspace.',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'Dashboard UI'],
    description:
      'Migrated an enterprise tracking platform from Airtable to Supabase, restructuring the data layer to support faster interface updates, real-time telemetry, and a more responsive operational experience.',
    link: 'work/applyiq',
    linkLabel: 'View live app',
    accent: 'var(--accent)',
    variant: 'product' as const,
    image: '/work/siftparity/job-scanner-preview.png',
  },
]

// Track 02: Friction-Free Financial Systems
const web3Projects = [
  {
    index: '03',
    year: '2026',
    title: 'QIE Neobank',
    subtitle: 'Making decentralized finance feel understandable before it asks for trust.',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js'],
    description:
      'Designed a DeFi banking experience that hides protocol complexity behind a clearer product layer, connecting the user experience, system architecture, and smart-contract logic. The project was shortlisted from 411 global submissions.',
    link: '/work/qie-neobank',
    linkLabel: 'View case study',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/qie/qie-preview.png',
  },
  {
    index: '04',
    year: '2026',
    title: 'Bruma Protocol',
    subtitle: 'Making complex on-chain risk states understandable while markets move.',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    description:
      'Designed an interface for interpreting automated smart-contract and oracle data during volatile settlement conditions, translating technical blockchain states into clearer signals people can actually act on.',
    link: '/work/bruma-protocol',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/bruma/pool-overview.png',
  },
  {
    index: '05',
    year: '2026',
    title: 'GitHub Core',
    subtitle: 'The code behind the systems, not just the screenshots.',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    description:
      'An open repository containing the smart contracts, protocol interfaces, and supporting systems behind selected Web3 work. Built to make the architecture inspectable rather than hiding the implementation behind polished mockups.',
    link: 'https://github.com/NinjaPuppetDev',
    linkLabel: 'View on GitHub',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/github/github-preview.png',
  },
]

// Track 03: Digital Experiences for Physical Products
const brandProjects = [
  {
    index: '06',
    year: '2011–2016',
    title: 'Pepe Matilda',
    subtitle: 'Designing the connection between a physical product and the digital experience around it.',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Brand Systems', 'E-commerce UI'],
    description:
      "A jewelry brand built around custom manufacturing, 3D product development, e-commerce, and brand systems. The work connected physical production with a digital storefront and received Colombia's Lápiz de Acero award in 2013.",
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
    subtitle: 'Exploring what happens when a shoe becomes a digital product.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'A custom 3D-printed footwear concept combining product design, 3D modeling, AI-assisted prototyping, and an interactive digital experience. The project explores how customization can become part of the product itself rather than another form to complete.',
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
    subtitle: 'Building a digital ritual around a physical skincare product.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    description:
      'A cosmetics brand concept exploring how visual identity, product storytelling, and interaction can work together to make an online purchase feel more considered and tangible.',
    link: '/work/marigold-bloom',
    linkLabel: 'View case study',
    accent: 'var(--amber)',
    variant: 'brand' as const,
    image: '/work/marigold/Marigold.png',
  },
]

const tracks = [
  {
    number: '01',
    title: 'Rapid Validation & AI-Driven Products',
    question: 'How do we reduce uncertainty before people commit?',
    support: 'Credentials reveal where someone has been. These projects reveal what can be built today.',
    accent: 'var(--accent)',
    projects: productProjects,
  },
  {
    number: '02',
    title: 'Friction-Free Financial Systems',
    question: 'How do strangers learn to trust complex financial systems?',
    support: 'Translating the strengths of institutions and code into products ordinary people can actually use.',
    accent: 'var(--accent)',
    projects: web3Projects,
  },
  {
    number: '03',
    title: 'Digital Experiences for Physical Products',
    question: 'How can craftsmanship survive the transition into digital experiences?',
    support: 'Preserving the character of a physical product instead of reducing it to a transaction.',
    accent: 'var(--amber)',
    projects: brandProjects,
  },
]

// ── LANDING PAGE MAIN COMPONENT ────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg)',
        minHeight: '100vh',
      }}
    >
      {/* Solid gradient mask matching global background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '220px',
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(8, 8, 8, 0.7) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Subsurface ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1300px',
          height: '450px',
          background:
            'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 60%, transparent 100%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <HeroSection />
      <TechStackBanner />
      <WhyOnePartner />

      {/* ── SELECTED WORK ──────────────────────────────────────────────── */}
      {/* The viewport acts as a viewing frame: as the user scrolls vertically,
          the project sequence moves horizontally through the aperture. */}
      <section
        id="work"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem) 2rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: '2.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Selected Work
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                color: 'var(--text)',
                lineHeight: 1.6,
                maxWidth: '60ch',
                fontWeight: 300,
              }}
            >
              Different industries. One continuous design practice.
              <br />
              <br />
              The projects below explore a common objective: reducing the
              distance between an idea and the people it hopes to reach.
            </p>
          </div>
        </div>

        {/* Vertical scroll runway -> Sticky viewing frame -> Horizontal project track */}
        <ProjectHorizontalTrack tracks={tracks} />
      </section>

      <Labs />


      {/* ── CONVERSIONS (CONTACT) ─────────────────────────────────────── */}
      <section
        id="contact-form"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(200,240,74,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '4rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Inquiry
            </p>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              Let's continue
              <br />
              the conversation.
            </h2>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: '36ch',
              }}
            >
              Every product begins as an idea.

              The difficult part isn't building it.
              It's understanding what it wants to become.

              Whether you're exploring a new venture, improving an existing product, or trying to make sense of a complex problem, I'd be happy to think it through with you.

              Sometimes the outcome is a website.
              Sometimes it's a prototype.

              Sometimes it's realizing you don't need to build what you thought you needed.

              Every conversation starts somewhere.
            </p>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                marginTop: '1.5rem',
                opacity: 0.6,
              }}
            >
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