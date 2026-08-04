'use client'

import ProjectCard from './ProjectCard'
import HeroSection from './HeroSection'
import CardGrid from './CardGrid'
import ContactForm from './ContactForm'
import EssaySection from './EssaySection'
import TechStackBanner from './TechStackBanner'
import WhyOnePartner from './WhyOnePartner'
import Labs from './Labs'
import CTA from './CTA'

// ── PROJECT TRACKS (unchanged content, metadata, tags, links, chronology) ─────

// Track 01: Rapid Validation & AI-Driven Products
const productProjects = [
  {
    index: '01',
    year: '2026',
    title: 'Virtual Portfolio Hub',
    subtitle: 'Replacing static portfolio templates with real-time conversational intelligence',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    description:
      'Award-winning platform created during an AI bootcamp competition. Built to demonstrate high-velocity full-stack design engineering by combining conversational AI agents with dynamic project filtering and contextual telemetry.',
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
    subtitle: 'Replacing sluggish database pipelines with sub-100ms real-time telemetry dashboards',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'Dashboard UI'],
    description:
      'When internal data tables are backed by slow, rigid databases, operations stall. We migrated an enterprise tracking platform from Airtable to Supabase, optimizing the relational schema to support sub-100ms interface updates and real-time telemetry.',
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
    subtitle: 'Solving the 99% bounce rate in decentralized banking with frictionless abstraction layers',
    tags: ['Product Design', 'UX Architecture', 'Solidity', 'Next.js'],
    description:
      'Web3 protocols bleed users during onboarding because non-custodial custody is intimidating. We designed a full-stack DeFi ecosystem that abstracts protocol friction—end-to-end UX architecture and matching smart contracts shortlisted out of 411 global submissions.',
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
    subtitle: 'Translating cryptic oracle payloads into human risk narratives during volatile settlement windows',
    tags: ['UX Design', 'State Management', 'Solidity', 'Chainlink Oracles'],
    description:
      'Most derivative platforms fail because users cannot decipher real-time contract states when volatility spikes. We integrated automated smart-contract telemetry with contextual AI summaries, turning raw blockchain streams into clear risk interfaces.',
    link: '/work/bruma-protocol',
    linkLabel: 'View protocol',
    accent: 'var(--accent)',
    variant: 'web3' as const,
    image: '/work/bruma/bruma-preview.png',
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
    image: '/work/github/github-preview.png',
  },
]

// Track 03: Digital Experiences for Physical Products
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

// ── CATEGORY HEADER ────────────────────────────────────────────────────────
// Each category is framed as a question, not a stat block. No cards, no
// gradients, no icons — just typography and space, consistent with the
// editorial language established in "Why One Partner?".
function CategoryHeader({
  number,
  title,
  question,
  support,
  accent = 'var(--accent)',
}: {
  number: string
  title: string
  question: string
  support: string
  accent?: string
}) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1rem',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: accent,
            letterSpacing: '0.25em',
          }}
        >
          {number}
        </span>
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)',
            fontWeight: 300,
            color: 'var(--text)',
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          color: accent,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}
      >
        Question
      </p>
      <p
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text)',
          lineHeight: 1.3,
          maxWidth: '32ch',
          marginBottom: '0.9rem',
        }}
      >
        {question}
      </p>
      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--muted)',
          lineHeight: 1.65,
          maxWidth: '55ch',
        }}
      >
        {support}
      </p>
    </div>
  )
}

// ── LANDING PAGE MAIN COMPONENT ────────────────────────────────────────────
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
      {/* This section is the evidence for the philosophy laid out in
          "Why One Partner?". It should read as continuation, not a new
          argument — so the intro stays short and each category opens
          with a single framing question rather than an essay. */}
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
        {/* Section Header */}
        <div
          style={{
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2.5rem',
            marginBottom: '4.5rem',
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

        {/* Track 01: Rapid Validation & AI-Driven Products */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 6rem)' }}>
          <CategoryHeader
            number="01"
            title="Rapid Validation & AI-Driven Products"
            question="How do we reduce uncertainty before people commit?"
            support="Credentials reveal where someone has been. These projects reveal what can be built today."
            accent="var(--accent)"
          />
          <CardGrid projects={productProjects} cols={2} />
        </div>

        {/* Track 02: Friction-Free Financial Systems */}
        <div style={{ marginBottom: 'clamp(4rem, 7vw, 6rem)' }}>
          <CategoryHeader
            number="02"
            title="Friction-Free Financial Systems"
            question="How do strangers learn to trust complex financial systems?"
            support="Translating the strengths of institutions and code into products ordinary people can actually use."
            accent="var(--accent)"
          />
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        {/* Track 03: Digital Experiences for Physical Products */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <CategoryHeader
            number="03"
            title="Digital Experiences for Physical Products"
            question="How can craftsmanship survive the transition into digital experiences?"
            support="Preserving the character of a physical product instead of reducing it to a transaction."
            accent="var(--amber)"
          />
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      <Labs />

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '4rem',
            marginBottom: '5rem',
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
              04 / Operational Thesis
            </p>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--text)',
                fontStyle: 'italic',
              }}
            >
              "Every product is a conversation between an idea and the people it hopes to reach."
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>
              I know you're here because you have an idea.
              Maybe you don't have the time to build it. Maybe you don't have the team. Or maybe you're still figuring out what it should become.

              That's where I come in.

              I help turn ideas into products people can actually use. Together we'll decide what to build, how to build it, and how to reach the people it's meant for.

              But launching isn't the end of the conversation.

              I build products that observe how people use them, revealing patterns, friction, and opportunities so the next decision is informed by behavior instead of guesswork.
            </p>
          </div>
        </div>

        {/* 3-Column Execution Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--border)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              01 // Preserve the idea
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              Ideas change every time they're translated.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              I remove as many translations as possible by designing and building the product as one continuous process.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--border)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              02 // Learn from reality
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              Launching answers nothing.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              Watching how people actually use a product is where design begins.

              Every system I build is instrumented to help founders see what users are trying to tell them.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--border)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
              03 // Technology follows the problem
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', margin: '1rem 0 0.75rem' }}>
              I don't start with frameworks.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              I start with constraints.

              The stack changes.

              The questions usually don't.
            </p>
          </div>
        </div>
      </section>

      <CTA contactFormId="contact-form" />

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