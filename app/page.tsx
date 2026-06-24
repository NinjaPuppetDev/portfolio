import ProjectCard from './components/ProjectCard'
import HeroSection from './components/HeroSection'
import CardGrid from './components/CardGrid'
import ContactForm from './components/ContactForm'

const web3Projects = [
  { index: '01', year: '2026', title: 'QIE Neobank', subtitle: 'DeFi neobank · On-chain credit scoring · Soulbound NFTs · Lending', tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'], description: 'A full-stack DeFi neobank built for the QIE Blockchain Hackathon. Deployed smart contracts: vault, identity, lending, credit score.', link: '/work/qie-neobank', linkLabel: 'View case study', accent: 'var(--accent)', variant: 'web3' as const },
  { index: '02', year: '2026', title: 'Bruma Protocol', subtitle: 'Ethereum · Chainlink · DeFi · Rainfall Derivatives', tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'], description: 'A trustless protocol for hedging and trading rainfall risk on Ethereum. Positions settle automatically via Chainlink oracle feeds — no intermediaries.', link: 'https://bruma-protocol.vercel.app/', linkLabel: 'View protocol', accent: 'var(--accent)', variant: 'web3' as const },
  { index: '06', year: '2019–', title: 'GitHub', subtitle: 'Solidity · Next.js · Smart Contracts · Open Source', tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'], description: 'Active repo where the work lives. Smart contracts, protocol interfaces, and the codebase behind this site — version-controlled from first commit to mainnet deploy.', link: 'https://github.com/NinjaPuppetDev', linkLabel: 'View on GitHub', accent: 'var(--accent)', variant: 'web3' as const }
]

const productProjects = [
  { index: '03', year: '2026', title: 'Raigoza Job Scanner', subtitle: 'Next.js · Airtable · Groq · Job Search CRM', tags: ['Next.js', 'Airtable', 'Groq AI', 'No-code', 'Dashboard'], description: 'A personal job search CRM built on Airtable as the live backend, surfaced through a custom Next.js dashboard. Tracks application funnel stages, interview schedules, and follow-up cadences in real time.', link: 'https://raigoza-job-scanner.vercel.app/', linkLabel: 'View Job Scanner', accent: 'var(--accent)', variant: 'product' as const }
]

const brandProjects = [
  { index: '04', year: '2011–2016', title: 'Pepe Matilda', subtitle: 'Jewelry Design · Microcasting · Brand · Material Research', tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'], description: "Built 0→1: designed and hand-cast every piece, engineered a proprietary microcasting system, modeled products in 3D, and built the brand from identity to e-commerce UI. Won Colombia's Lápiz de Acero (2013). Exhibited at MAMM and Museo de Antioquia.", link: '/work/pepe-matilda', linkLabel: 'View project', accent: 'var(--amber)', variant: 'brand' as const, image: '/work/pepe-matilda/PepeMatilda.png' },
  { index: '05', year: '2024', title: 'NextStep', subtitle: 'Brand Identity · UI Design · 3D Rendering', tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'], description: 'Full brand and UI system for a 3D-printed custom footwear brand. Designed the visual identity, landing page, and email marketing — built around a high-contrast dark aesthetic with neon green accents, 3D-rendered product shots, and a customization-first UX flow.', link: '/work/next-step', linkLabel: 'View case study', accent: 'var(--amber)', variant: 'brand' as const, image: '/work/nextstep/NextStep.png' },
  { index: '06', year: '2024', title: 'Marigold Bloom', subtitle: 'Brand Identity · UI Design · Social Media', tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'], description: 'End-to-end brand and UI system for a botanical skincare brand. Developed the visual identity, e-commerce landing page, and Instagram content system — warm earthy tones, serif typography, and a ritual-driven narrative translated consistently from web to social.', link: '/work/marigold', linkLabel: 'View case study', accent: 'var(--amber)', variant: 'brand' as const, image: '/work/marigold/Marigold.png' }
]

function SectionLabel({ label, count, accent = 'var(--accent)' }: { label: string; count: number; accent?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: accent, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'var(--border-hi)', letterSpacing: '0.1em' }}>{String(count).padStart(2, '0')} projects</span>
    </div>
  )
}

export default function LandingPage() {
  return (
    <main>
      {/* Client interactive Hero with PromptBar and Glitch */}
      <HeroSection />

      {/* Semantic Work Grid Section */}
      <section id="work" style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)' }}>Selected Work</h2>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>
            {String(web3Projects.length + productProjects.length + brandProjects.length).padStart(2, '0')} projects
          </span>
        </div>

        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Protocol & Web3" count={web3Projects.length} accent="var(--accent)" />
          <CardGrid projects={web3Projects} cols={3} />
        </div>

        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Product & Tools" count={productProjects.length} accent="var(--accent)" />
          <div style={{ border: '1px solid var(--border)' }}>
            <ProjectCard {...productProjects[0]} />
          </div>
        </div>

        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <SectionLabel label="Brand & Craft" count={brandProjects.length} accent="var(--amber)" />
          <CardGrid projects={brandProjects} cols={3} />
        </div>
      </section>

      {/* Semantic About Section */}
      <section id="about" style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>About</p>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300, lineHeight: 1.35, color: 'var(--text)', fontStyle: 'italic' }}>
            "It's not only the technical that drives a project, it's also the emotional."
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>I'm a product designer-engineer from Medellín. I started casting metal, ended up writing smart contracts — and somewhere in between I dropped out of music school, won a design award, and built a stablecoin for my MA thesis.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>I use AI as a creative and technical amplifier. I research Web3 security competitively on Sherlock and Code4rena. I am fluent in both the language of materials and the language of protocols.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>Currently open to roles at the intersection of product, blockchain, and anything that requires someone who thinks with both hands.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {['Solidity', 'Ethereum', 'Chainlink', 'Figma', 'Blender', 'Next.js', 'Airtable', 'AI Tools', 'CAD / 3D'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid var(--border-hi)', color: 'var(--muted)', padding: '0.25rem 0.6rem' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic Contact Section */}
      <section id="contact" style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(200,240,74,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '4rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Contact</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.05, marginBottom: '1.5rem' }}>Let's build<br />something.</h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '36ch' }}>Open to remote roles, freelance projects, and interesting conversations. Based in Medellín — available EST hours.</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>raigoza.david.j@gmail.com</p>
          </div>
          {/* Isolated Client Contact Form */}
          <ContactForm />
        </div>
      </section>
    </main>
  )
}