'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const WALKTHROUGH_VIDEO_URL = '/work/common-ground/common-ground-walkthrough.mp4'
const LIVE_APP_URL = 'https://common-ground-studio-x66q.vercel.app/'

const TECH_STACK = [
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'OpenAI',
  'Vector Search',
  'Recharts',
]

const CONTENT = {
  en: {
    eyebrow: 'Market Positioning · Strategic Intelligence · Full-Stack Engineering',
    title: 'CommonGround.',
    subtitle: 'Building a shared operational space for market clarity.',
    heroDesc: 'CommonGround is an enterprise intelligence platform designed to analyze market positioning, map competitive landscapes, and give product teams a unified workspace for strategic decision-making.',
    watchWalkthrough: 'Watch Platform Walkthrough ↓',
    openLive: 'Open Live Application →',
    problemTag: '01 / The Problem',
    problemTitle: 'Strategic misalignment slows product momentum.',
    problemP1: 'Companies often struggle to maintain a accurate mental model of their market landscape. Product, design, and executive teams frequently operate with fragmented competitive assumptions, leading to feature duplication and missed opportunities.',
    problemP2: 'The challenge was to transform static slide decks into a live, collaborative positioning workspace.',
    solutionTag: '02 / The Solution',
    solutionTitle: 'AI-driven competitive telemetry & white-space mapping.',
    solutionP1: 'CommonGround continuously ingests product announcements, feature Matrix updates, and positioning signals across a defined market category. It automatically clusters competitors along customizable strategic axes.',
    solutionP2: 'Instead of guessing where differentiation lies, teams can visualize clear market white space in real time.',
    impactTag: '03 / Operational Impact',
    impactTitle: 'Bridging strategy and product execution.',
    impactP1: 'By establishing a central source of market truth, teams evaluate roadmap decisions against verified positioning data rather than subjective opinions.',
    impactP2: 'The platform connects strategic research directly to product requirements and feature prioritization.',
    walkthroughLabel: 'Live Walkthrough',
    walkthroughTitle: 'Market Analysis & Alignment Workspace',
    walkthroughNote: 'REAL-TIME POSITIONING MATRIX WITH SYNCHRONIZED TEAM TELEMETRY.',
    interfaceLabel: 'Product Interface',
    interfaceTitle: 'Market Matrix & Signal Insights',
    matrixTitle: 'Dynamic Competitive Matrix',
    matrixDesc: 'Maps competitors across dynamic axes, providing immediate visibility into market saturation and unserved positioning vectors.',
    telemetryTitle: 'Competitor Telemetry & Feature Tracking',
    telemetryDesc: 'Monitors feature releases, pricing changes, and market movement across key competitors from a consolidated dashboard view.',
    capabilitiesLabel: 'System Capabilities',
    capabilitiesTitle: 'What It Actually Does',
    whatItDoes: [
      {
        title: 'Automated Position Mapping',
        detail: 'Plots competitor feature sets, pricing vectors, and value propositions across a multi-dimensional matrix.',
      },
      {
        title: 'Market Signal Telemetry',
        detail: 'Monitors public product updates, customer sentiment shifts, and messaging changes across key market players.',
      },
      {
        title: 'White-Space Identification',
        detail: 'Highlights underserved market segments and uncaptured customer demands using cluster analysis.',
      },
      {
        title: 'Alignment Dashboards',
        detail: 'Translates strategic positioning maps into clear operational directives for product and engineering teams.',
      },
      {
        title: 'Real-Time Telemetry',
        detail: 'Keeps team members synchronized on live positioning changes and competitive benchmark updates.',
      },
    ],
    executionLabel: 'Full-Stack Execution',
    executionTitle: 'How We Built It',
    howWeBuiltIt: [
      {
        label: 'Competitive Intelligence Pipeline',
        description: 'Designed an ingestion and vector embedding workflow to categorize and evaluate competitor marketing and feature changes.',
      },
      {
        label: 'Positioning Matrix UI',
        description: 'Built an interactive visual canvas allowing teams to manipulate strategic axes and visualize market gaps in real time.',
      },
      {
        label: 'Database Schema & Real-Time Sync',
        description: 'Structured Supabase tables and Realtime channels to broadcast strategy state changes across active team sessions.',
      },
      {
        label: 'Signal Extraction Engine',
        description: 'Leveraged OpenAI models to summarize complex competitor changes into clear executive takeaways and actionable insights.',
      },
      {
        label: 'Analytics & Export Layer',
        description: 'Created custom visualization components with interactive filtering for executive reporting and strategic planning.',
      },
      {
        label: 'Performance & Architecture',
        description: 'Optimized server-side rendering in Next.js paired with vector indexing for sub-second query performance.',
      },
    ],
    visionLabel: 'Impact & Vision',
    visionTitle: 'Why This Project Matters',
    visionP1: 'CommonGround replaces guesswork and stale static presentations with living market intelligence.',
    visionP2: 'By integrating real-time vector search, multi-dimensional matrix plotting, and automated signal extraction, the tool gives product leaders immediate clarity on where to differentiate.',
    visionP3: 'It demonstrates how full-stack design engineering can transform abstract strategic concepts into an intuitive, highly functional digital product.',
    ctaReady: 'Ready to scale your product?',
    ctaTitle: 'One Team. Zero Handoffs. Full Stack.',
    startProject: 'Start a Project →',
    back: '← Back to All Case Studies',
  },
  es: {
    eyebrow: 'Posicionamiento de Mercado · Inteligencia Estratégica · Ingeniería Full-Stack',
    title: 'CommonGround.',
    subtitle: 'Construyendo un espacio operativo compartido para la claridad de mercado.',
    heroDesc: 'CommonGround es una plataforma de inteligencia empresarial concebida para analizar el posicionamiento competitivo, mapear el mercado y dotar a los equipos de producto de un entorno de trabajo unificado para la toma de decisiones estratégicas.',
    watchWalkthrough: 'Ver Demostración de la Plataforma ↓',
    openLive: 'Abrir Aplicación en Vivo →',
    problemTag: '01 / El Problema',
    problemTitle: 'La desalineación estratégica frena el ritmo del producto.',
    problemP1: 'Las organizaciones suelen operar con una visión fragmentada de su panorama competitivo. Producto, diseño y liderazgo manejan con frecuencia supuestos aislados, lo que genera duplicación de funciones y oportunidades perdidas.',
    problemP2: 'El reto consistió en transformar diapositivas estáticas en un espacio interactivo y colaborativo de posicionamiento en vivo.',
    solutionTag: '02 / La Solución',
    solutionTitle: 'Telemetría competitiva asistida por IA y detección de espacios en blanco.',
    solutionP1: 'CommonGround procesa continuamente anuncios de producto, matrices de funciones y señales de posicionamiento en una categoría definida. Agrupa automáticamente a los competidores a lo largo de ejes estratégicos personalizables.',
    solutionP2: 'En lugar de intuir dónde diferenciarse, los equipos visualizan vacíos de mercado reales en tiempo real.',
    impactTag: '03 / Impacto Operativo',
    impactTitle: 'Articulación entre estrategia y ejecución de producto.',
    impactP1: 'Al establecer una única fuente de verdad sobre el mercado, las decisiones de hoja de ruta se evalúan contra datos de posicionamiento verificados en vez de opiniones subjetivas.',
    impactP2: 'La plataforma conecta la investigación estratégica directamente con los requerimientos de producto y la priorización de características.',
    walkthroughLabel: 'Demostración en Vivo',
    walkthroughTitle: 'Espacio de Análisis de Mercado y Alineación',
    walkthroughNote: 'MATRIZ DE POSICIONAMIENTO EN TIEMPO REAL CON TELEMETRÍA DE EQUIPO SINCRONIZADA.',
    interfaceLabel: 'Interfaz del Producto',
    interfaceTitle: 'Matriz de Mercado y Detección de Señales',
    matrixTitle: 'Matriz Competitiva Dinámica',
    matrixDesc: 'Mapea competidores en ejes dinámicos, brindando visibilidad inmediata de la saturación del mercado y vectores de posicionamiento desatendidos.',
    telemetryTitle: 'Telemetría de Competidores y Seguimiento de Funciones',
    telemetryDesc: 'Monitorea lanzamientos de producto, cambios de precios y movimientos de mercado de competidores clave desde una vista consolidada.',
    capabilitiesLabel: 'Capacidades del Sistema',
    capabilitiesTitle: 'Qué Hace Realmente',
    whatItDoes: [
      {
        title: 'Mapeo Automatizado de Posiciones',
        detail: 'Traza matrices de funciones, vectores de precios y propuestas de valor en una matriz multidimensional.',
      },
      {
        title: 'Telemetría de Señales de Mercado',
        detail: 'Monitorea actualizaciones públicas, cambios en el sentimiento del cliente y evolución de mensajes en actores clave.',
      },
      {
        title: 'Detección de Espacios en Blanco',
        detail: 'Identifica segmentos de mercado desatendidos y demandas latentes mediante análisis de conglomerados.',
      },
      {
        title: 'Paneles de Alineación',
        detail: 'Traduce mapas de posicionamiento estratégico en directrices operativas claras para equipos de producto e ingeniería.',
      },
      {
        title: 'Telemetría en Tiempo Real',
        detail: 'Mantiene sincronizados a los colaboradores ante cambios en vivo y actualizaciones de benchmarks competitivos.',
      },
    ],
    executionLabel: 'Ejecución Full-Stack',
    executionTitle: 'Cómo lo Construimos',
    howWeBuiltIt: [
      {
        label: 'Pipeline de Inteligencia Competitiva',
        description: 'Diseñamos un flujo de ingestión e indexación vectorial para categorizar y evaluar cambios de marketing y producto.',
      },
      {
        label: 'Interfaz de Matriz de Posicionamiento',
        description: 'Lienzo visual interactivo que permite a los equipos manipular ejes estratégicos y visualizar brechas de mercado al instante.',
      },
      {
        label: 'Esquema de Base de Datos y Sincronización en Vivo',
        description: 'Tablas en Supabase y canales en tiempo real para transmitir cambios de estado entre sesiones activas.',
      },
      {
        label: 'Motor de Extracción de Señales',
        description: 'Modelos de OpenAI para sintetizar cambios complejos en conclusiones ejecutivas y perspectivas accionables.',
      },
      {
        label: 'Capa de Analítica y Exportación',
        description: 'Componentes de visualización personalizados con filtrado interactivo para planeación estratégica y reportes de liderazgo.',
      },
      {
        label: 'Rendimiento y Arquitectura',
        description: 'Renderizado del lado del servidor optimizado en Next.js con indexación vectorial para consultas en submilisegundos.',
      },
    ],
    visionLabel: 'Impacto y Visión',
    visionTitle: 'Por Qué Importa Este Proyecto',
    visionP1: 'CommonGround sustituye las conjeturas y las presentaciones estáticas obsoletas por inteligencia de mercado viva.',
    visionP2: 'Al integrar búsqueda vectorial en tiempo real, trazado multidimensional y extracción automatizada de señales, brinda a los líderes de producto claridad inmediata sobre dónde diferenciarse.',
    visionP3: 'Demuestra cómo la ingeniería de diseño full-stack transforma conceptos estratégicos abstractos en un producto digital intuitivo y de alto rendimiento.',
    ctaReady: '¿Listo para escalar tu producto?',
    ctaTitle: 'Un Equipo. Cero Fricciones. Full Stack.',
    startProject: 'Iniciar un Proyecto →',
    back: '← Volver a todos los proyectos',
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'CommonGround — Market Positioning & Competitive Intelligence Platform',
  description:
    'A software platform designed to analyze company market positioning, identify competitive white space, and streamline operational alignment.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
}

export default function CommonGroundCaseStudy() {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', position: 'relative' }}>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
            {t.eyebrow}
          </p>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '2.5rem',
            ...fadeIn(0.2)
          }}>
            {t.title}
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--text)', opacity: 0.9 }}>
              {t.subtitle}
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--text)', maxWidth: '58ch', lineHeight: 1.5, fontWeight: 400, marginBottom: '2rem', ...fadeIn(0.3) }}>
            {t.heroDesc}
          </p>

          {/* Surface Tech Stack Pill Strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem', ...fadeIn(0.35) }}>
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

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', ...fadeIn(0.4) }}>
            <a
              href="#walkthrough"
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
              {t.watchWalkthrough}
            </a>
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              {t.openLive}
            </a>
          </div>
        </section>

        {/* ── CORE STRATEGY & BUSINESS MODEL ─────────────────────── */}
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
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.problemTag}</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>{t.problemTitle}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
              {t.problemP1}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65, fontStyle: 'italic' }}>
              {t.problemP2}
            </p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.solutionTag}</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>{t.solutionTitle}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
              {t.solutionP1}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t.solutionP2}
            </p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.impactTag}</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0.5rem 0 1rem', fontWeight: 300 }}>{t.impactTitle}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.65 }}>
              {t.impactP1}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t.impactP2}
            </p>
          </div>
        </section>

        {/* ── WALKTHROUGH ─────────────────────────────────────────── */}
        <section id="walkthrough" style={{
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', maxWidth: '36ch', textAlign: 'right' }}>
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
              poster="/work/common-ground/common-ground-preview.png"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src={WALKTHROUGH_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* ── PRODUCT UI SCREENSHOTS ─────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>{t.interfaceLabel}</Label>
          <SectionTitle>{t.interfaceTitle}</SectionTitle>

          {/* Positioning Matrix Screenshot */}
          <div style={{ marginTop: '3rem', marginBottom: '5rem' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
              {t.matrixTitle}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 300 }}>
              {t.matrixDesc}
            </p>
            <div style={{
              border: '1px solid var(--border)',
              background: '#0a0a0a',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
           
            </div>
          </div>

          {/* Telemetry Dashboard Screenshot */}
          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--text)', fontWeight: 300, marginBottom: '1rem' }}>
              {t.telemetryTitle}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 300 }}>
              {t.telemetryDesc}
            </p>
            <div style={{
              border: '1px solid var(--border)',
              background: '#0a0a0a',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
              <img
                src="/work/common-ground/common-ground-preview.png"
                alt="CommonGround Telemetry and Competitor Dashboard Overview"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
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
          <Label>{t.capabilitiesLabel}</Label>
          <SectionTitle>{t.capabilitiesTitle}</SectionTitle>

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
          <Label>{t.executionLabel}</Label>
          <SectionTitle>{t.executionTitle}</SectionTitle>

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
        </section>

        {/* ── WHY THIS PROJECT MATTERS ─────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label>{t.visionLabel}</Label>
          <SectionTitle>{t.visionTitle}</SectionTitle>

          <div style={{ maxWidth: '68ch', marginTop: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300, marginBottom: '1.25rem' }}>
              {t.visionP1}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
              {t.visionP2}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
              {t.visionP3}
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
              href={`/${locale}/#contact`}
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
    </>
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