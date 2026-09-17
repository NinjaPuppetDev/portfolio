'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const FIGMA_URL =
  'https://www.figma.com/design/vitqU8fVnqheh0gcxVjr4P/QIENeobank?node-id=0-1&t=eyZdLegUR4EbWgeY-1'
const LIVE_URL = 'https://qie-bank.vercel.app/'
const WALKTHROUGH_VIDEO_URL = '/work/qie/qie-walkthrough.mp4'

const TECH_STACK = [
  'Solidity 0.8.24', 'OpenZeppelin', 'ERC-4626', 'Soulbound NFTs', 'Next.js', 'Wagmi', 'Viem', 'RainbowKit', 'Tailwind CSS', 'Figma', 'Certora'
]

const CONTENT = {
  en: {
    eyebrow: 'Blockchain Protocol Design · Smart Contracts · Product UX',
    title: 'QIE Neobank',
    subtitle: 'Designing trust for decentralized lending.',
    heroDesc: 'Built during the QIE Blockchain Hackathon, QIE Neobank explores how complex on-chain lending can become as intuitive as a traditional banking experience. The project combines smart contracts, behavioral credit scoring, and a modern financial interface to help users understand why they qualify for a loan, not just whether they do.',
    recognitionTag: 'Top 26 Project',
    recognitionSub: 'Selected out of 411 submissions',
    viewLive: 'View Live App →',
    viewFigma: 'View Figma Designs →',
    challengeLabel: '01 / The Challenge',
    challengeTitle: "DeFi is transparent. Understanding it isn't.",
    challengeP1: 'Most decentralized lending protocols expose users to collateral ratios, liquidation thresholds, vault mechanics, and smart contract interactions. While technically transparent, these systems often leave people wondering one simple question:',
    challengeQuote: '"Why can I borrow this amount?"',
    challengeP2: "The challenge wasn't building another lending protocol. It was designing an experience that made complex financial logic understandable without hiding the blockchain mechanics that make the system trustworthy.",
    solutionLabel: '02 / The Solution',
    solutionTitle: 'A behavioral credit system instead of collateral alone.',
    solutionP1: 'Rather than relying exclusively on collateral, QIE Neobank evaluates borrower behavior over time.',
    solutionP2: 'Five on-chain signals contribute to a dynamic credit score ranging from 300 to 850, directly influencing borrowing limits, loan tiers, and interest rates.',
    solutionP3: 'Instead of reading documentation or protocol specifications, users immediately understand what improves their financial reputation and borrowing power.',
    walkthroughLabel: 'Live Walkthrough',
    walkthroughTitle: 'Banking UX powered by smart contracts.',
    walkthroughNote: 'DEPLOYED ON QIE MAINNET · CONNECT WALLET TO INTERACT WITH CORE LENDING WORKFLOW.',
    archLabel: '03 / Product Architecture',
    archTitle: 'Five smart contracts. One banking experience.',
    archDesc: 'The protocol is composed of specialized contracts that work together to provide lending, identity, and credit scoring through a single interface.',
    contracts: [
      { name: 'QIEVault', spec: 'ERC-4626 Yield Vault', role: 'Manages deposits, withdrawals, and yield accrual' },
      { name: 'QIEIdentity', spec: 'Soulbound NFT', role: 'Establishes non-transferable on-chain identity' },
      { name: 'QIELending', spec: 'Lending Engine', role: 'Handles origination, repayments, collateral & health factor' },
      { name: 'CreditScore Engine', spec: 'Behavioral Scoring', role: 'Calculates 300–850 score using 5 weighted metrics' },
      { name: 'QIENeobank', spec: 'Protocol Orchestrator', role: 'Coordinates all contracts through a single banking interface' },
    ],
    systemMechanicsLabel: 'System Mechanics',
    creditScoreTitle: 'Credit Score Components',
    creditScoreDesc: 'The behavioral score is calculated from five weighted signals:',
    scoreComponents: [
      { label: 'Repayment Accuracy', weight: '36.4%', note: 'Measures on-time loan repayments — highest weight' },
      { label: 'Deposit Volume', weight: '18.2%', note: 'Rewards long-term capital participation' },
      { label: 'Account Tenure', weight: '18.2%', note: 'Increases confidence through account history' },
      { label: 'Activity Frequency', weight: '18.2%', note: 'Encourages consistent protocol usage' },
      { label: 'Score Aging', weight: '9.1%', note: '7-day decay model prevents short-term manipulation' },
    ],
    riskFrameworkLabel: 'Risk Framework',
    tieredLendingTitle: 'Tiered Lending System',
    loanTiers: [
      { tier: 'Bronze', score: '300–549', limit: '$1,000', apr: '25%' },
      { tier: 'Silver', score: '550–649', limit: '$5,000', apr: '18%' },
      { tier: 'Gold', score: '650–749', limit: '$20,000', apr: '12%' },
      { tier: 'Platinum', score: '750–850', limit: '$50,000', apr: '8%' },
    ],
    designSystemLabel: 'Design System & Product Vision',
    designSystemTitle: 'Designing consistency before features.',
    designSystemDesc: 'Before designing application screens, the project established a complete design system covering typography, spacing, semantic colors, component patterns, and interaction states. This foundation allowed complex financial information to remain visually consistent across dashboards, lending flows, and onboarding experiences.',
    beyondProtoTitle: 'Beyond the hackathon prototype.',
    beyondProtoDesc: 'The deployed application demonstrates the working protocol. The accompanying Figma designs explore the broader product vision, including richer dashboards, credit explanations, lending flows, onboarding, and financial management features that extended beyond the hackathon timeline.',
    protocolCapabilityLabel: 'Protocol Capability',
    whatItDoesTitle: 'What It Actually Does',
    whatItDoes: [
      { title: 'Behavioral Credit Score', detail: 'Generates a 300–850 credit score based on five weighted on-chain metrics.' },
      { title: 'Lending Dashboard', detail: 'Surfaces balances, borrowing power, loan exposure, health factor, and activity.' },
      { title: 'Loan Eligibility', detail: 'Calculates borrowing limits and interest rates dynamically according to behavioral score.' },
      { title: 'Tiered Lending System', detail: 'Supports four lending tiers, each with different borrowing limits and APRs.' },
      { title: 'Wallet Integration', detail: 'Users interact directly with deployed smart contracts through a familiar web application.' },
    ],
    fullStackLabel: 'Full-Stack Execution',
    howWeBuiltItTitle: 'How We Built It',
    howWeBuiltIt: [
      { label: 'Smart Contract Architecture', description: 'Developed five interoperable Solidity contracts responsible for identity, vault management, lending, behavioral scoring, and protocol orchestration.' },
      { label: 'Behavioral Credit Engine', description: 'Designed a weighted scoring model that rewards long-term participation and responsible borrowing behavior instead of evaluating collateral alone.' },
      { label: 'Frontend Application', description: 'Built a responsive banking interface in Next.js using Wagmi and Viem for wallet connectivity and on-chain state management.' },
      { label: 'Wallet Experience', description: 'Integrated RainbowKit to simplify wallet onboarding while maintaining direct interaction with deployed contracts.' },
      { label: 'Security & Verification', description: 'Leveraged OpenZeppelin standards and Certora verification to improve contract reliability and adherence to established security practices.' },
    ],
    techUsedLabel: 'Technologies Used',
    recognitionSectionLabel: 'Recognition',
    recognitionSectionTitle: 'Top 26 of 411 hackathon submissions.',
    recognitionP1: 'Built during the QIE Blockchain Hackathon, the project was selected among the Top 26 submissions out of 411 teams, demonstrating both technical execution and product thinking under competitive time constraints.',
    recognitionP2: 'Five smart contracts were deployed and verified on QIE Mainnet, providing a fully functional blockchain implementation beyond static prototypes.',
    ctaReady: 'Ready to build products that make complex systems understandable?',
    ctaTitle: 'One Team. Zero Handoffs. Full-Stack Product Engineering.',
    startProject: 'Start a Project →',
    back: '← Back to All Case Studies',
  },
  es: {
    eyebrow: 'Diseño de Protocolos Blockchain · Smart Contracts · UX de Producto',
    title: 'QIE Neobank',
    subtitle: 'Diseñando confianza para préstamos descentralizados.',
    heroDesc: 'Construido durante el Hackathon de Blockchain QIE, QIE Neobank investiga cómo los préstamos on-chain de alta complejidad pueden volverse tan intuitivos como la banca tradicional. Combina smart contracts, evaluación crediticia por comportamiento y una interfaz financiera moderna para que los usuarios comprendan por qué califican a un crédito, no solo si lo hacen.',
    recognitionTag: 'Proyecto Top 26',
    recognitionSub: 'Seleccionado entre 411 propuestas',
    viewLive: 'Ver Aplicación en Vivo →',
    viewFigma: 'Ver Diseños en Figma →',
    challengeLabel: '01 / El Reto',
    challengeTitle: 'DeFi es transparente. Entenderlo no lo es.',
    challengeP1: 'La mayoría de los protocolos de préstamos descentralizados exponen ratios de colateral, umbrales de liquidación, mecánicas de bóvedas e interacciones con contratos inteligentes. Aunque técnicamente transparentes, estos sistemas suelen dejar a los usuarios con una duda esencial:',
    challengeQuote: '“¿Por qué puedo solicitar este monto?”',
    challengeP2: 'El reto no era construir otro protocolo de préstamos, sino diseñar una experiencia que hiciera comprensible la lógica financiera compleja sin ocultar las mecánicas de la cadena que otorgan confianza al sistema.',
    solutionLabel: '02 / La Solución',
    solutionTitle: 'Un sistema crediticio por comportamiento en lugar de solo colateral.',
    solutionP1: 'En vez de depender exclusivamente del colateral, QIE Neobank evalúa el historial y comportamiento del prestatario a lo largo del tiempo.',
    solutionP2: 'Cinco señales on-chain alimentan un puntaje crediticio dinámico de 300 a 850, influyendo directamente en los límites de crédito, niveles de préstamo y tasas de interés.',
    solutionP3: 'En lugar de leer especificaciones técnicas o documentación extensa, los usuarios comprenden de inmediato qué factores mejoran su reputación financiera y poder de endeudamiento.',
    walkthroughLabel: 'Demostración en Vivo',
    walkthroughTitle: 'UX bancaria impulsada por contratos inteligentes.',
    walkthroughNote: 'DESPLEGADO EN QIE MAINNET · CONECTA TU BILLETERA PARA INTERACTUAR CON EL FLUJO DE CRÉDITO.',
    archLabel: '03 / Arquitectura de Producto',
    archTitle: 'Cinco contratos inteligentes. Una experiencia bancaria unificada.',
    archDesc: 'El protocolo se compone de contratos especializados que operan coordinados para ofrecer préstamos, identidad y scoring crediticio a través de una sola interfaz.',
    contracts: [
      { name: 'QIEVault', spec: 'Bóveda de Rendimiento ERC-4626', role: 'Administra depósitos, retiros y acumulación de rendimientos' },
      { name: 'QIEIdentity', spec: 'NFT Soulbound', role: 'Establece una identidad on-chain intransferible y verificable' },
      { name: 'QIELending', spec: 'Motor de Préstamos', role: 'Gestiona originación, repagos, colateral y factor de salud' },
      { name: 'CreditScore Engine', spec: 'Scoring por Comportamiento', role: 'Calcula el puntaje de 300 a 850 con 5 métricas ponderadas' },
      { name: 'QIENeobank', spec: 'Orquestador del Protocolo', role: 'Coordina todos los contratos mediante una interfaz bancaria única' },
    ],
    systemMechanicsLabel: 'Mecánicas del Sistema',
    creditScoreTitle: 'Componentes del Puntaje Crediticio',
    creditScoreDesc: 'El puntaje por comportamiento se calcula a partir de cinco señales ponderadas:',
    scoreComponents: [
      { label: 'Puntualidad en Repagos', weight: '36.4%', note: 'Mide el cumplimiento a tiempo de préstamos — máxima ponderación' },
      { label: 'Volumen de Depósito', weight: '18.2%', note: 'Premia la participación de capital a largo plazo' },
      { label: 'Antigüedad de la Cuenta', weight: '18.2%', note: 'Aumenta la confianza a través del historial de uso' },
      { label: 'Frecuencia de Actividad', weight: '18.2%', note: 'Incentiva el uso constante y responsable del protocolo' },
      { label: 'Decaimiento Temporal', weight: '9.1%', note: 'Modelo de depreciación a 7 días que previene manipulaciones transitorias' },
    ],
    riskFrameworkLabel: 'Marco de Riesgo',
    tieredLendingTitle: 'Sistema de Préstamos Escalonados',
    loanTiers: [
      { tier: 'Bronce', score: '300–549', limit: '$1,000', apr: '25%' },
      { tier: 'Plata', score: '550–649', limit: '$5,000', apr: '18%' },
      { tier: 'Oro', score: '650–749', limit: '$20,000', apr: '12%' },
      { tier: 'Platino', score: '750–850', limit: '$50,000', apr: '8%' },
    ],
    designSystemLabel: 'Sistema de Diseño y Visión de Producto',
    designSystemTitle: 'Diseñar consistencia antes que funcionalidades.',
    designSystemDesc: 'Antes de diseñar pantallas, el proyecto estableció un sistema de diseño integral que abarca tipografía, espaciado, paleta semántica, patrones de componentes y estados interactivos. Esta base permitió que la información financiera densa mantuviera coherencia visual en paneles, flujos de crédito e incorporación.',
    beyondProtoTitle: 'Más allá del prototipo del hackathon.',
    beyondProtoDesc: 'La aplicación desplegada demuestra el protocolo operativo. Los diseños complementarios en Figma exploran una visión de producto más amplia: paneles analíticos avanzados, explicaciones del puntaje, flujos de solicitud y herramientas de gestión financiera que trascienden los límites de tiempo del hackathon.',
    protocolCapabilityLabel: 'Capacidad del Protocolo',
    whatItDoesTitle: 'Qué Hace Realmente',
    whatItDoes: [
      { title: 'Score Crediticio por Comportamiento', detail: 'Genera un puntaje de 300 a 850 basado en cinco métricas on-chain ponderadas.' },
      { title: 'Panel de Control de Préstamos', detail: 'Presenta balances, capacidad de endeudamiento, exposición crediticia y factor de salud.' },
      { title: 'Elegibilidad Crediticia Dinámica', detail: 'Calcula límites de crédito y tasas de interés según el comportamiento financiero del usuario.' },
      { title: 'Niveles de Crédito Escalonados', detail: 'Soporta cuatro niveles de préstamo con límites progresivos y tasas de interés preferenciales.' },
      { title: 'Integración Directa con Billetera', detail: 'Permite interactuar directamente con contratos inteligentes desde una experiencia web amigable.' },
    ],
    fullStackLabel: 'Ejecución Full-Stack',
    howWeBuiltItTitle: 'Cómo lo Construimos',
    howWeBuiltIt: [
      { label: 'Arquitectura de Smart Contracts', description: 'Desarrollamos cinco contratos en Solidity para identidad, custodia, préstamos, scoring y orquestación integral.' },
      { label: 'Motor de Crédito por Comportamiento', description: 'Diseñamos un modelo ponderado que recompensa la fidelidad y la solvencia en vez de evaluar colateral pasivo únicamente.' },
      { label: 'Aplicación Frontend', description: 'Construimos una interfaz bancaria en Next.js utilizando Wagmi y Viem para conectividad Web3 y estado on-chain.' },
      { label: 'Experiencia de Onboarding', description: 'Integramos RainbowKit para simplificar el acceso a billeteras manteniendo interacción directa con contratos desplegados.' },
      { label: 'Seguridad y Verificación', description: 'Implementamos estándares de OpenZeppelin y verificación formal con Certora para garantizar confiabilidad y solidez.' },
    ],
    techUsedLabel: 'Tecnologías Utilizadas',
    recognitionSectionLabel: 'Reconocimiento',
    recognitionSectionTitle: 'Top 26 entre 411 propuestas del hackathon.',
    recognitionP1: 'Creado durante el Hackathon de Blockchain QIE, el proyecto fue seleccionado entre los 26 mejores entre 411 equipos, demostrando rigor técnico y visión de producto bajo plazos competitivos exigentes.',
    recognitionP2: 'Se desplegaron y verificaron cinco contratos inteligentes en QIE Mainnet, ofreciendo una implementación blockchain completamente funcional más allá de prototipos estáticos.',
    ctaReady: '¿Listo para construir productos que hagan comprensibles sistemas complejos?',
    ctaTitle: 'Un Equipo. Cero Fricciones. Ingeniería de Producto Full-Stack.',
    startProject: 'Iniciar un Proyecto →',
    back: '← Volver a todos los proyectos',
  },
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function QIENeobankCaseStudy() {
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const t = locale === 'es' ? CONTENT.es : CONTENT.en

  useEffect(() => { setMounted(true) }, [])

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(200,240,74,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,74,0.02) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          ...fadeIn(0.1)
        }}>
          {t.eyebrow}
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          marginBottom: '2rem',
          ...fadeIn(0.2)
        }}>
          {t.title}
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
            {t.subtitle}
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'var(--text)',
          maxWidth: '58ch',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: '2.5rem',
          ...fadeIn(0.3)
        }}>
          {t.heroDesc}
        </p>

        {/* Recognition Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.02)',
          padding: '0.5rem 1rem',
          borderRadius: '2px',
          marginBottom: '2.5rem',
          ...fadeIn(0.35)
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {t.recognitionTag}
          </span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            {t.recognitionSub}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--text)',
              padding: '0.85rem 2rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t.viewLive}
          </a>
          <a
            href={FIGMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {t.viewFigma}
          </a>
        </div>
      </section>

      {/* ── CORE STRATEGY & PROBLEM ──────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: '4rem clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <Label>{t.challengeLabel}</Label>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>{t.challengeTitle}</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            {t.challengeP1}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--accent)', marginTop: '0.75rem', fontWeight: 400, fontStyle: 'italic' }}>
            {t.challengeQuote}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            {t.challengeP2}
          </p>
        </div>

        <div>
          <Label>{t.solutionLabel}</Label>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>{t.solutionTitle}</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
            {t.solutionP1}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            {t.solutionP2}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
            {t.solutionP3}
          </p>
        </div>
      </section>

      {/* ── WALKTHROUGH VIDEO ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <Label>{t.walkthroughLabel}</Label>
            <SectionTitle>{t.walkthroughTitle}</SectionTitle>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '38ch', textAlign: 'right' }}>
            {t.walkthroughNote}
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          border: '1px solid var(--border)',
          background: '#0a0a0a',
          overflow: 'hidden',
          borderRadius: '4px',
        }}>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/work/qie/qie-preview.png"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <source src={WALKTHROUGH_VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ── PRODUCT ARCHITECTURE ─────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.archLabel}</Label>
        <SectionTitle>{t.archTitle}</SectionTitle>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          {t.archDesc}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {t.contracts.map((c, i) => (
            <div key={c.name} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{i + 1} / {c.spec}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0.5rem 0', color: 'var(--text)' }}>{c.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{c.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREDIT SCORE COMPONENTS ────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.systemMechanicsLabel}</Label>
        <SectionTitle>{t.creditScoreTitle}</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          {t.creditScoreDesc}
        </p>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {t.scoreComponents.map((s, i) => (
            <div key={s.label} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 3fr',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              borderBottom: i < t.scoreComponents.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                {s.label}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                {s.weight}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300 }}>
                {s.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIERED LENDING SYSTEM ────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.riskFrameworkLabel}</Label>
        <SectionTitle>{t.tieredLendingTitle}</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
        }}>
          {t.loanTiers.map(tierItem => (
            <div key={tierItem.tier} style={{
              border: '1px solid var(--border)',
              padding: '1.75rem',
              background: 'rgba(255,255,255,0.01)',
              position: 'relative',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {tierItem.tier} Tier
              </p>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 300, margin: '0.5rem 0', color: 'var(--text)' }}>
                {tierItem.limit}
              </h4>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                {tierItem.apr} APR
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
                Score: {tierItem.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESIGN SYSTEM & PRODUCT VISION ───────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.designSystemLabel}</Label>
        <SectionTitle>{t.designSystemTitle}</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginTop: '1rem', lineHeight: 1.6, fontWeight: 300 }}>
          {t.designSystemDesc}
        </p>

        <div style={{ marginTop: '3rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/qie/design-system.png"
            alt="QIE Neobank Design System"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
            {t.beyondProtoTitle}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}>
            {t.beyondProtoDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
              <Image
                src="/work/qie/dashboard.png"
                alt="QIE Neobank Dashboard Interface"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            {/* Right Card: Lending & Score */}
            <div style={{ 
              border: '1px solid var(--border)', 
              overflow: 'hidden', 
              borderRadius: '4px',
              alignSelf: 'start'
            }}>
              <Image
                src="/work/qie/lending-score.png"
                alt="QIE Neobank Lending & Score Interface"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT ACTUALLY DOES ────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.protocolCapabilityLabel}</Label>
        <SectionTitle>{t.whatItDoesTitle}</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {t.whatItDoes.map((item, idx) => (
            <div key={item.title} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{idx + 1}</span>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--text)' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE BUILT IT ─────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.fullStackLabel}</Label>
        <SectionTitle>{t.howWeBuiltItTitle}</SectionTitle>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {t.howWeBuiltIt.map((step, i) => (
            <div key={step.label} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2rem',
              padding: '2rem',
              borderBottom: i < t.howWeBuiltIt.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'start',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  0{i + 1}
                </span>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.3 }}>
                  {step.label}
                </p>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div style={{ marginTop: '3rem' }}>
          <Label>{t.techUsedLabel}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {TECH_STACK.map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.65rem',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.75rem',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOGNITION ────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.recognitionSectionLabel}</Label>
        <SectionTitle>{t.recognitionSectionTitle}</SectionTitle>
        <div style={{ maxWidth: '65ch', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
            {t.recognitionP1}
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
            {t.recognitionP2}
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          {t.ctaReady}
        </p>

        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '2.5rem', lineHeight: 1.05 }}>
          {t.ctaTitle}
        </h2>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}#contact`}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--text)',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.2s ease',
            }}
          >
            {t.startProject}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href={`/${locale}`} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>
          {t.back}
        </Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} David Raigoza Studio
        </span>
      </footer>
    </main>
  )
}

// ─── SHARED HELPER COMPONENTS ──────────────────────────────────────────────
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
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 300,
      color: 'var(--text)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    }}>
      {children}
    </h2>
  )
}