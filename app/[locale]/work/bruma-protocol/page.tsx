'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const LIVE_URL = 'https://bruma-protocol.vercel.app/'
const WALKTHROUGH_VIDEO_URL = '/work/bruma/bruma.mp4'

const TECH_STACK = [
  'Solidity', 'Chainlink Functions', 'Chainlink Automation', 'Chainlink CRE', 'ERC-4626', 'ERC-721', 'Next.js', 'Wagmi', 'Viem', 'Ethereum Sepolia', 'Avalanche Fuji',
]

const CONTENT = {
  en: {
    eyebrow: 'Parametric Rainfall Derivatives · Smart Contracts · Product UX',
    title: 'Bruma Protocol',
    subtitle: 'Price the rain. Transfer the risk.',
    heroDesc: 'Built for the Chainlink Convergence hackathon in Medellín, Bruma turns rainfall — the oldest unpriced risk in agriculture and outdoor business — into a structured financial position. Priced by Chainlink oracles against a decade of historical data, settled automatically, owned as an NFT. No counterparty negotiations, no intermediaries.',
    recognitionTag: 'Chainlink Convergence',
    recognitionSub: 'Medellín, Colombia · 2026',
    viewLive: 'View Live App →',
    challengeLabel: '01 / The Challenge',
    challengeTitle: 'Rainfall is the oldest risk nobody prices.',
    challengeP1: 'Farmers, event operators, and anyone running an outdoor business absorb weather risk every season with no structured way to hedge it. Institutional weather derivatives exist, but they were never built for an individual operator.',
    challengeQuote: 'The idea came from a conversation with a woman in Medellín who checked the weather every morning — not as a ritual, but as a necessity.',
    challengeP2: 'The challenge wasn’t building another DeFi protocol. It was turning that daily act of reading the sky into a financial instrument — priced transparently, with no intermediary standing between the risk and the person carrying it.',
    solutionLabel: '02 / The Solution',
    solutionTitle: 'An index, not an insurance claim.',
    solutionP1: 'Bruma structures rainfall as a bilateral index contract instead of a policy. A Call or Put settles purely on what a Chainlink oracle reports against a chosen strike — never on an assessment of actual loss.',
    solutionP2: 'A buyer may be hedging real exposure, or simply taking a financial position on rainfall. The protocol doesn’t distinguish between the two — it only reads the index.',
    solutionP3: 'Pricing, settlement, and payout all run through Chainlink Functions and Automation, so no one — including the protocol’s own builder — holds discretion over the outcome.',
    walkthroughLabel: 'Live Walkthrough',
    walkthroughTitle: 'An index priced, held, and settled on-chain.',
    walkthroughNote: 'DEPLOYED ON ETHEREUM SEPOLIA & AVALANCHE FUJI · CONNECT WALLET TO PRICE A POSITION.',
    archLabel: '03 / Product Architecture',
    archTitle: 'Six layers. One verifiable settlement.',
    archDesc: 'Pricing, automation, and custody are split across independent layers so no single party — oracle, vault, or builder — can move an outcome alone.',
    workflowLayers: [
      { name: 'Chainlink Functions', spec: 'Oracle Layer', role: 'Prices premiums and settles positions by fetching and computing rainfall data on-chain' },
      { name: 'Chainlink Automation', spec: 'Automation Layer', role: 'Keepers monitor option expiry and trigger settlement — no claims process, no manual step' },
      { name: 'Chainlink CRE', spec: 'Workflow Layer', role: 'Vault Risk Guardian fetches 7-day forecasts and tightens utilization limits ahead of adverse rainfall' },
      { name: 'ERC-721 Position NFT', spec: 'Asset Layer', role: 'Every position is a transferable, self-custodied token — full ownership, no intermediary' },
      { name: 'ERC-4626 Vault', spec: 'Liquidity Layer', role: 'Standard vault with virtual share offset; 80% max utilization, 20% per-location cap' },
      { name: 'Pull Payment Pattern', spec: 'Security', role: 'CEI-pattern settlement with manual claim fallback if an auto-transfer fails' },
    ],
    systemMechanicsLabel: 'System Mechanics',
    howItWorksTitle: 'Four steps from exposure to position',
    howItWorksDesc: 'Fully automated via Chainlink Functions and Automation. Settlement is determined by oracle data, not by any assessment of actual loss.',
    howItWorks: [
      { label: 'Define the index', description: 'Choose location, observation window, strike rainfall in millimeters, spread, and Call or Put. The protocol takes no position on why you’re entering the trade.' },
      { label: 'Receive a Chainlink-priced quote', description: 'Chainlink Functions computes a fair premium from 10 years of historical rainfall data for the exact coordinates. Pricing is deterministic — no human sets it, and the quote holds for one hour.' },
      { label: 'Pay the premium, hold the position', description: 'The position mints as an ERC-721 NFT. Collateral locks in the ERC-4626 vault at a maximum 80% utilization rate, with a 20% cap per location.' },
      { label: 'Settlement runs on its own', description: 'At expiry, Chainlink Automation fetches the actual rainfall reading and transfers the payout if the index condition is met. No adjuster, no claims form — the oracle decides.' },
    ],
    riskFrameworkLabel: 'Risk Framework',
    instrumentsTitle: 'Two instruments, one liquidity pool.',
    instruments: [
      { title: 'Call Option', tag: 'Long Rainfall', detail: 'Pays out when oracle-reported rainfall exceeds the strike during the observation window, scaling linearly up to the spread cap. Built for exposure to excess rainfall — harvest operations, event venues, infrastructure.' },
      { title: 'Put Option', tag: 'Short Rainfall', detail: 'Pays out when oracle-reported rainfall falls below the strike, scaling down to the spread cap. Built for exposure to dry conditions — irrigated farms, seasonal tourism, water-dependent production.' },
      { title: 'Liquidity Pool', tag: 'Risk Counterparty', detail: 'Depositors act as the counterparty to option buyers and earn a share of every premium collected, governed by the same utilization and per-location caps that protect the vault.' },
    ],
    productConsoleLabel: 'Product Console',
    consoleTitle: 'Every position, priced and monitored in one place.',
    consoleDesc: 'The console covers the full lifecycle of a position — from choosing a location and strike, to watching the historical rainfall context behind a quote, to tracking vault health and the automation runs that settle it.',
    machineryTitle: 'The machinery behind settlement, made visible.',
    machineryDesc: 'A Pool view tracks vault TVL, utilization, and liquidity provider positions. A Workflow view surfaces the same three automation runs — settlement, vault risk guardian, reinsurance pool monitor — that operate the protocol on-chain, with a live execution log.',
    fullStackLabel: 'Full-Stack Execution',
    howWeBuiltItTitle: 'How We Built It',
    howWeBuiltIt: [
      { label: 'Parametric Pricing Engine', description: 'Chainlink Functions computes premiums from a decade of historical rainfall data at the moment of quote, so no party sets the price by hand.' },
      { label: 'Three-Workflow Orchestration', description: 'Settlement, a Vault Risk Guardian, and a Reinsurance Pool Monitor run as independent Chainlink CRE and Automation workflows, each on its own schedule.' },
      { label: 'Vault & Collateral Design', description: 'An ERC-4626 vault with virtual share offset protection backs every open position, capped at 80% utilization and 20% per location to keep the protocol solvent.' },
      { label: 'Position Ownership', description: 'Every option mints as an ERC-721 NFT — fully on-chain, self-custodied, and transferable, with transfers locked during the settlement window to prevent front-running.' },
      { label: 'Frontend Application', description: 'Built a full protocol console in Next.js — Create, Options, Pool, and Workflow views — for pricing positions, managing liquidity, and monitoring live automation runs.' },
    ],
    techUsedLabel: 'Technologies Used',
    recognitionSectionLabel: 'Recognition',
    recognitionSectionTitle: 'Built for the Chainlink Convergence.',
    recognitionP1: 'Bruma Protocol was conceived, designed, and built solo over an intense sprint for the Chainlink Convergence hackathon in Medellín — with a little help from AI companions across architecture, interface, and code.',
    recognitionP2: 'The protocol is designed to be autonomous: admin keys move to a timelock before any mainnet deployment, so the builder retains no ongoing discretion over settlement, pricing, or payouts — only the oracle and the vault parameters govern outcomes.',
    ctaReady: 'Ready to build products that make complex systems understandable?',
    ctaTitle: 'One Team. Zero Handoffs. Full-Stack Product Engineering.',
    startProject: 'Start a Project →',
    back: '← Back to All Case Studies',
  },
  es: {
    eyebrow: 'Derivados Paramétricos de Lluvia · Smart Contracts · UX de Producto',
    title: 'Bruma Protocol',
    subtitle: 'Ponle precio a la lluvia. Transfiere el riesgo.',
    heroDesc: 'Desarrollado para el hackathon Chainlink Convergence en Medellín, Bruma convierte las precipitaciones —el riesgo más antiguo no valorado en la agricultura y negocios al aire libre— en una posición financiera estructurada. Cotizado por oráculos de Chainlink a partir de una década de datos históricos, liquidado automáticamente y custodiado como NFT. Sin negociaciones bilaterales ni intermediarios.',
    recognitionTag: 'Chainlink Convergence',
    recognitionSub: 'Medellín, Colombia · 2026',
    viewLive: 'Ver Aplicación en Vivo →',
    challengeLabel: '01 / El Reto',
    challengeTitle: 'La lluvia es el riesgo más antiguo que nadie cotiza.',
    challengeP1: 'Agricultores, organizadores de eventos y operadores al aire libre absorben el riesgo climático cada temporada sin un mecanismo estructurado de cobertura. Existen derivados climáticos institucionales, pero nunca fueron concebidos para operadores individuales.',
    challengeQuote: 'La idea surgió de una conversación con una mujer en Medellín que revisaba el clima cada mañana: no por hábito, sino por necesidad vital.',
    challengeP2: 'El reto no radicaba en diseñar otro protocolo DeFi, sino en transformar el acto diario de leer el cielo en un instrumento financiero: cotizado con transparencia y sin intermediarios entre el riesgo y quien lo asume.',
    solutionLabel: '02 / La Solución',
    solutionTitle: 'Un índice paramétrico, no una reclamación de seguro.',
    solutionP1: 'Bruma estructura la lluvia como un contrato indexado bilateral en vez de una póliza tradicional. Un Call o Put se liquida exclusivamente según lo que reporta el oráculo de Chainlink respecto a un strike predeterminado, sin auditorías de pérdidas reales.',
    solutionP2: 'El comprador puede estar cubriendo un riesgo operativo real o simplemente tomando una posición financiera ante las lluvias. El protocolo no discrimina la motivación: solo lee el índice.',
    solutionP3: 'La cotización, liquidación y pago se ejecutan de forma autónoma mediante Chainlink Functions y Automation, garantizando que nadie —ni siquiera el creador del protocolo— tenga discrecionalidad sobre los resultados.',
    walkthroughLabel: 'Demostración en Vivo',
    walkthroughTitle: 'Un índice cotizado, custodiado y liquidado on-chain.',
    walkthroughNote: 'DESPLEGADO EN ETHEREUM SEPOLIA Y AVALANCHE FUJI · CONECTA TU BILLETERA PARA COTIZAR UNA POSICIÓN.',
    archLabel: '03 / Arquitectura de Producto',
    archTitle: 'Seis capas. Una liquidación verificable.',
    archDesc: 'La cotización, automatización y custodia se dividen en capas independientes para que ninguna entidad aislada —oráculo, bóveda o desarrollador— pueda alterar el desenlace.',
    workflowLayers: [
      { name: 'Chainlink Functions', spec: 'Capa de Oráculo', role: 'Cotiza primas y liquida posiciones calculando datos históricos de lluvia en la cadena' },
      { name: 'Chainlink Automation', spec: 'Capa de Automatización', role: 'Keepers monitorean el vencimiento y activan la liquidación sin procesos manuales' },
      { name: 'Chainlink CRE', spec: 'Capa de Flujos (Workflows)', role: 'Vault Risk Guardian consulta pronósticos a 7 días y restringe utilización ante lluvias extremas' },
      { name: 'NFT de Posición ERC-721', spec: 'Capa de Activos', role: 'Cada posición es un token transferible de autocustodia con propiedad total e inmutable' },
      { name: 'Bóveda ERC-4626', spec: 'Capa de Liquidez', role: 'Bóveda estandarizada con protección de share offset; 80% utilización máxima y tope de 20% por locación' },
      { name: 'Patrón Pull Payment', spec: 'Seguridad', role: 'Liquidación bajo patrón CEI con reclamo manual en caso de fallo en transferencias automáticas' },
    ],
    systemMechanicsLabel: 'Mecánicas del Sistema',
    howItWorksTitle: 'Cuatro pasos desde la exposición hasta la posición',
    howItWorksDesc: 'Totalmente automatizado mediante Chainlink Functions y Automation. La liquidación se define por datos del oráculo, sin evaluaciones subjetivas de daños.',
    howItWorks: [
      { label: 'Definir el índice', description: 'Selecciona locación, ventana de observación, umbral de lluvia en milímetros, dispersión y opción Call o Put.' },
      { label: 'Recibir cotización de Chainlink', description: 'Chainlink Functions calcula la prima a partir de 10 años de registros pluviométricos exactos. El precio es determinista y válido por 1 hora.' },
      { label: 'Pagar prima y custodiar posición', description: 'La posición se acuña como un NFT ERC-721. El colateral se bloquea en la bóveda ERC-4626 respetando los límites de liquidez.' },
      { label: 'Liquidación autónoma', description: 'Al vencimiento, Chainlink Automation obtiene la lectura pluviométrica real y transfiere el pago si se cumple el índice pactado.' },
    ],
    riskFrameworkLabel: 'Marco de Riesgo',
    instrumentsTitle: 'Dos instrumentos, un pool de liquidez.',
    instruments: [
      { title: 'Opción Call', tag: 'Exposición a Exceso de Lluvia', detail: 'Paga cuando la lluvia reportada por el oráculo supera el umbral pactado. Diseñada para proteger cosechas, logística al aire libre e infraestructura ante inundaciones.' },
      { title: 'Opción Put', tag: 'Exposición a Sequía', detail: 'Paga cuando la lluvia registrada cae por debajo del umbral mínimo. Concebida para cultivos dependientes de riego, turismo de temporada y generación hídrica.' },
      { title: 'Pool de Liquidez', tag: 'Contraparte de Riesgo', detail: 'Los depositantes actúan como contraparte de los compradores de opciones y obtienen una fracción de cada prima cobrada, protegidos por los límites de solvencia de la bóveda.' },
    ],
    productConsoleLabel: 'Consola de Producto',
    consoleTitle: 'Cada posición, cotizada y monitoreada en un solo lugar.',
    consoleDesc: 'La consola cubre el ciclo de vida completo de cada posición: desde seleccionar coordenadas y strike, hasta analizar el contexto pluviométrico histórico tras la cotización, monitorear la salud de la bóveda y auditar las ejecuciones automatizadas.',
    machineryTitle: 'La maquinaria tras la liquidación, totalmente visible.',
    machineryDesc: 'La vista Pool monitoriza el TVL de la bóveda, utilización y posiciones de proveedores de liquidez. La vista Workflow transparenta las tres rutinas de automatización —liquidación, guardián de riesgo y monitor de reaseguro— con un registro de ejecuciones en tiempo real.',
    fullStackLabel: 'Ejecución Full-Stack',
    howWeBuiltItTitle: 'Cómo lo Construimos',
    howWeBuiltIt: [
      { label: 'Motor de Cotización Paramétrica', description: 'Chainlink Functions procesa una década de precipitaciones históricas en el instante de la solicitud para que ninguna persona fije precios a mano.' },
      { label: 'Orquestación de Tres Flujos', description: 'Liquidación, guardián de riesgo y monitoreo de reaseguro operan como flujos CRE y Automation independientes con su propio cronograma.' },
      { label: 'Diseño de Bóvedas y Colateral', description: 'Una bóveda ERC-4626 respalda cada posición abierta, con un tope del 80% de utilización y 20% por región geográfica para proteger la solvencia.' },
      { label: 'Titularidad de Posiciones', description: 'Cada opción se acuña como un NFT ERC-721 en autocustodia, con transferencias restringidas durante la ventana de liquidación para evitar arbitrajes maliciosos.' },
      { label: 'Aplicación Frontend', description: 'Consola completa en Next.js con interfaces para creación, opciones, pool y monitoreo en vivo de flujos de automatización.' },
    ],
    techUsedLabel: 'Tecnologías Utilizadas',
    recognitionSectionLabel: 'Reconocimiento',
    recognitionSectionTitle: 'Desarrollado para el Chainlink Convergence.',
    recognitionP1: 'Bruma Protocol fue concebido, diseñado y desarrollado en solitario durante un sprint intensivo para el hackathon Chainlink Convergence en Medellín — apoyado por asistentes de IA en arquitectura, interfaz y código.',
    recognitionP2: 'El protocolo está diseñado para ser autónomo: las claves de administración se asignan a un timelock antes de cualquier despliegue en red principal, de modo que el creador no retiene discrecionalidad alguna sobre liquidaciones, precios ni desembolsos.',
    ctaReady: '¿Listo para construir productos que hagan comprensibles sistemas complejos?',
    ctaTitle: 'Un Equipo. Cero Fricciones. Ingeniería de Producto Full-Stack.',
    startProject: 'Iniciar un Proyecto →',
    back: '← Volver a todos los proyectos',
  },
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BrumaProtocolCaseStudy() {
  const locale = useLocale()
  const t = locale === 'es' ? CONTENT.es : CONTENT.en
  const [mounted, setMounted] = useState(false)

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
            poster="/work/bruma/pool-overview.png"
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
          {t.workflowLayers.map((c, i) => (
            <div key={c.name} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)' }}>0{i + 1} / {c.spec}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0.5rem 0', color: 'var(--text)' }}>{c.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{c.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.systemMechanicsLabel}</Label>
        <SectionTitle>{t.howItWorksTitle}</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '60ch', marginTop: '1rem', fontWeight: 300 }}>
          {t.howItWorksDesc}
        </p>

        <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
          {t.howItWorks.map((s, i) => (
            <div key={s.label} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 3fr',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              borderBottom: i < t.howItWorks.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                {i + 1}. {s.label}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300 }}>
                {s.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTRUMENTS ──────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.riskFrameworkLabel}</Label>
        <SectionTitle>{t.instrumentsTitle}</SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
        }}>
          {t.instruments.map(tItem => (
            <div key={tItem.title} style={{
              border: '1px solid var(--border)',
              padding: '1.75rem',
              background: 'rgba(255,255,255,0.01)',
              position: 'relative',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {tItem.tag}
              </p>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, margin: '0.5rem 0 0.75rem', color: 'var(--text)' }}>
                {tItem.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                {tItem.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROTOCOL CONSOLE ─────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Label>{t.productConsoleLabel}</Label>
        <SectionTitle>{t.consoleTitle}</SectionTitle>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginTop: '1rem', lineHeight: 1.6, fontWeight: 300 }}>
          {t.consoleDesc}
        </p>

        <div style={{ marginTop: '3rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/bruma/create-protection.png"
            alt="Bruma Protocol — Create weather protection screen"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '1.5rem', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
          <Image
            src="/work/bruma/option-pricing.png"
            alt="Bruma Protocol — Option parameters and historical rainfall context"
            width={1300}
            height={700}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
            {t.machineryTitle}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '65ch', marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}>
            {t.machineryDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px' }}>
              <Image
                src="/work/bruma/pool-overview.png"
                alt="Bruma Protocol — Vault and liquidity pool overview"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', borderRadius: '4px', alignSelf: 'start' }}>
              <Image
                src="/work/bruma/workflow-monitor.png"
                alt="Bruma Protocol — Workflow monitor and execution log"
                width={650}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
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
            href="/#contact"
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