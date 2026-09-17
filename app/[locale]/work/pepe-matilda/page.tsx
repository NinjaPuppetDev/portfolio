'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const SQUARESPACE_VIDEO_URL = '/work/pepe-matilda/pepe-matilda-squarespace-walkthrough.mp4'
const FIGMA_URL             = 'https://www.figma.com/design/trenZxWmblUoBeGEJtZbG4/PepeMatilda?node-id=0-1&t=rWBl0OKgxzvjJfYO-1'

const CONTENT = {
  en: {
    eyebrow: 'Industrial Design · Brand Identity · E-Commerce Architecture',
    title: 'Pepe Matilda.',
    subtitle: 'From physical craft to digital scale.',
    heroDesc: 'Building an award-winning silver jewelry brand from scratch—custom 3D parametric engineering, a proprietary microcasting system, and an omnichannel storefront built to balance brand narrative with commercial velocity.',
    watchWalkthrough: 'Watch Build Walkthrough ↓',
    lapizWinner: 'Premio Lápiz de Acero Winner',
    agitationLabel: '01 / The Business Agitation',
    agitationDesc: 'Luxury physical goods often collapse online when translated into standard cookie-cutter e-commerce grids. Premium price tags require deep storytelling, yet dense storytelling increases buyer friction and hurts conversion.',
    techExecLabel: '02 / Technical Execution',
    techExecDesc: 'Eliminated middleman manufacturing by designing proprietary microcasting hardware and parametric CAD master files in Blender. Every physical ring is a direct 1:1 translation of digital geometry.',
    operationalScaleLabel: '03 / Operational Scale',
    operationalScaleDesc: 'Shifted from a custom, developer-dependent static platform to a high-converting, zero-maintenance Squarespace engine—giving the brand instant inventory management without sacrificing luxury visual punch.',
    platformArchLabel: 'Platform Architecture Strategy',
    tradeoffsTitle: 'The Trade-offs: Custom Vision vs. Production Scale',
    tradeoffsDesc: 'Every platform decision comes with friction. A custom static site allows total visual freedom, but creates operational debt. Rebuilding on a hosted engine removes maintenance, but forces you to engineer high-craft interactions inside rigid template parameters.',
    tableHeaderDimension: 'Dimension',
    tableHeaderV1: 'V1 / Custom Concept (Figma)',
    tableHeaderV2: 'V2 / Production Build (Squarespace Engine)',
    tradeoffs: [
      {
        dimension: 'Core Objective',
        v1: 'Unconstrained editorial lore & high-craft brand narrative.',
        v2: 'Operational efficiency, inventory velocity & conversion.',
      },
      {
        dimension: 'Architecture & Engine',
        v1: 'Custom prototype (Light, editorial serif layout, bespoke grids).',
        v2: 'Production Squarespace Engine (Brutalist dark luxury, custom CSS/video injections).',
      },
      {
        dimension: 'Operational Friction',
        v1: 'High developer overhead per product drop; zero native e-com logic.',
        v2: 'Zero-overhead client updates, automated inventory & native checkout.',
      },
      {
        dimension: 'Conversion Strategy',
        v1: 'Passive exploration, buried purchase pathways.',
        v2: 'High-contrast 3D process visualizers right before add-to-cart.',
      },
    ],
    walkthroughLabel: 'V2 Storefront Walkthrough',
    walkthroughTitle: 'High-Contrast Brutalist E-Commerce',
    walkthroughNote: 'ENGINEERED TO PRESERVE HIGH-CRAFT BRAND LORE WHILE LOWERING CONVERSION FRICTION.',
    conversionStrategyLabel: 'Conversion Design Strategy',
    conversionTitle: 'Justifying High Price Points via Process Transparency',
    conversionDesc: 'Without process transparency, bespoke microcast jewelry looks like mass-produced metal. By placing an interactive 5-stage digital process pipeline right before the add-to-cart module, we turn raw manufacturing parameters into perceived value.',
    pipelineSteps: [
      { step: '01', name: 'High-Res Scan', detail: '3D anatomical capture of organic forms.' },
      { step: '02', name: 'Parametric Topology', detail: 'Converting raw scans into wearable geometry.' },
      { step: '03', name: 'Wax Prototyping', detail: 'Validating real-world proportion and scale.' },
      { step: '04', name: 'Metal Flow Simulation', detail: 'Predicting liquid silver alloy behavior.' },
      { step: '05', name: 'Hand Polish & Finish', detail: 'Revealing high-contrast surface detail.' },
    ],
    identityArchLabel: 'Identity Architecture',
    identityTitle: 'Interlocking Logotype & Spatial Layering',
    anatomyLabel: 'Anatomy & Typographic Play',
    anatomyP1: 'The structural core of the identity balances organic fluidity with structured serif terminal elements. The interlocking P and M monogram utilizes high-contrast variable strokes that mirror liquid metal flow during microcasting cycles.',
    framingLabel: 'Spatial Boundary Framing',
    framingP1: 'By framing the minimal hippo silhouette partially behind the primary logotype boundary, the composition mirrors physical depth and relief carving, anchoring the brand in natural sculpture.',
    v1Label: 'V1 Archival Concept (2016)',
    v1Title: 'The Original Editorial Layout',
    openFigma: 'Open Figma Master File →',
    v1Desc: 'Originally conceptualized as a light-mode editorial showcase. While visually striking, it required custom development for every inventory update—a key lesson that informed our shift to modular design systems.',
    superseded: 'Superseded V1 Prototype',
    fullStackLabel: 'Full-Stack Execution',
    howWeBuiltItTitle: 'How We Built It',
    process: [
      {
        label: 'Material Architecture & Tolerances',
        description:
          'Evaluated silver alloy casting shrinkages and surface finishing tolerances. Silver was engineered to balance luxury weight with high-precision structural integrity.',
      },
      {
        label: 'Proprietary Microcasting Pipeline',
        description:
          'Bypassed off-the-shelf industrial manufacturing by engineering a custom 0-to-1 microcasting workflow, unlocking organic geometric detail previously impossible at scale.',
      },
      {
        label: 'Parametric Master Schemas',
        description:
          'Established high-fidelity 3D CAD blueprints in Blender as an absolute single source of truth, outputting directly to master molds to kill physical iteration cycles.',
      },
      {
        label: 'Omnichannel Brand System',
        description:
          'Designed an integrated identity—spanning physical packaging vectors, custom logotype typography, and high-contrast digital e-commerce surfaces.',
      },
      {
        label: 'Cultural & Retail Placement',
        description:
          'Engineered brand positioning to secure placement in premier art and cultural networks (MAMM and Museo de Antioquia).',
      },
    ],
    institutionalImpactLabel: 'Institutional Impact',
    recognitionArchivesTitle: 'Recognition & Archives',
    press: [
      {
        outlet: 'Lápiz de Acero',
        year: '2013',
        note: "Official award recognition — Premio Lápiz de Acero, Colombia's premier industrial design honor.",
      },
      {
        outlet: 'El Colombiano',
        year: '2013',
        note: 'National print archive coverage.',
      },
      {
        outlet: 'Universidad EAFIT',
        year: '2013',
        note: 'Institutional recognition & design archive documentation.',
      },
    ],
    ctaReady: 'Ready to scale your product?',
    ctaTitle: 'One Team. Zero Handoffs. Full Stack.',
    startProject: 'Start a Project →',
    back: '← Back to All Case Studies',
  },
  es: {
    eyebrow: 'Diseño Industrial · Identidad de Marca · Arquitectura E-Commerce',
    title: 'Pepe Matilda.',
    subtitle: 'Del oficio físico a la escala digital.',
    heroDesc: 'Creación desde cero de una marca de joyería en plata galardonada: ingeniería paramétrica 3D a medida, sistema propio de microfundición y una tienda omnicanal diseñada para equilibrar narrativa de marca con velocidad comercial.',
    watchWalkthrough: 'Ver Demostración de Construcción ↓',
    lapizWinner: 'Ganador Premio Lápiz de Acero',
    agitationLabel: '01 / El Dilema de Negocio',
    agitationDesc: 'Los artículos físicos de lujo suelen perder valor online al trasladarse a plantillas estándar de e-commerce. Los precios premium exigen narrativa profunda, pero una narrativa densa suele elevar la fricción y reducir la conversión.',
    techExecLabel: '02 / Ejecución Técnica',
    techExecDesc: 'Se eliminaron intermediarios de manufactura diseñando hardware de microfundición propio y archivos maestros paramétricos en Blender. Cada anillo físico es una traducción 1:1 de su geometría digital.',
    operationalScaleLabel: '03 / Escala Operativa',
    operationalScaleDesc: 'Transición desde una plataforma estática dependiente de desarrolladores hacia un motor Squarespace de alta conversión y cero mantenimiento, brindando gestión de inventario instantánea sin sacrificar impacto visual de lujo.',
    platformArchLabel: 'Estrategia de Arquitectura de Plataforma',
    tradeoffsTitle: 'Los Trade-offs: Visión a Medida vs. Escala en Producción',
    tradeoffsDesc: 'Cada decisión de plataforma conlleva fricciones. Un desarrollo a medida permite libertad visual total pero acumula deuda operativa. Reconstruir sobre un motor hospedado elimina el mantenimiento, pero exige programar interacciones de alto nivel dentro de plantillas rígidas.',
    tableHeaderDimension: 'Dimensión',
    tableHeaderV1: 'V1 / Concepto a Medida (Figma)',
    tableHeaderV2: 'V2 / Producción (Motor Squarespace)',
    tradeoffs: [
      {
        dimension: 'Objetivo Principal',
        v1: 'Narrativa de marca de alto oficio y exploración editorial libre.',
        v2: 'Eficiencia operativa, rotación de inventario y conversión.',
      },
      {
        dimension: 'Arquitectura y Motor',
        v1: 'Prototipo a medida (Layout editorial claro, tipografía serif, grillas artesanales).',
        v2: 'Motor Squarespace en producción (Lujo oscuro brutalista, inyecciones de CSS y video).',
      },
      {
        dimension: 'Fricción Operativa',
        v1: 'Alta dependencia de desarrollo para cada lanzamiento; sin lógica de comercio nativa.',
        v2: 'Actualizaciones sin fricción técnica, inventario automatizado y checkout integrado.',
      },
      {
        dimension: 'Estrategia de Conversión',
        v1: 'Navegación pasiva con rutas de compra dispersas.',
        v2: 'Visualizadores de proceso 3D de alto contraste inmediatamente antes de agregar al carrito.',
      },
    ],
    walkthroughLabel: 'Demostración Tienda V2',
    walkthroughTitle: 'E-Commerce Brutalista de Alto Contraste',
    walkthroughNote: 'DISEÑADO PARA PRESERVAR LA NARRATIVA ARTESANAL REDUCIENDO LA FRICCIÓN DE CONVERSIÓN.',
    conversionStrategyLabel: 'Estrategia de Diseño para Conversión',
    conversionTitle: 'Justificando Precios Premium Mediante Transparencia de Proceso',
    conversionDesc: 'Sin transparencia en el proceso, la joyería artesanal microfundida parece metal fabricado en masa. Ubicando un visualizador de proceso interactivo de 5 fases justo antes del carrito de compras, transformamos parámetros de manufactura en valor percibido.',
    pipelineSteps: [
      { step: '01', name: 'Escaneo de Alta Resolución', detail: 'Captura anatómica 3D de estructuras orgánicas.' },
      { step: '02', name: 'Topología Paramétrica', detail: 'Conversión de mallas densas en geometría ergonómica.' },
      { step: '03', name: 'Prototipado en Cera', detail: 'Validación de proporciones físicas y escala real.' },
      { step: '04', name: 'Simulación de Flujo', detail: 'Predicción del comportamiento de aleación de plata líquida.' },
      { step: '05', name: 'Pulido y Acabado Manual', detail: 'Realce de contrastes y texturas superficiales.' },
    ],
    identityArchLabel: 'Arquitectura de Identidad',
    identityTitle: 'Logotipo Entrelazado y Superposición Espacial',
    anatomyLabel: 'Anatomía y Juego Tipográfico',
    anatomyP1: 'El núcleo estructural de la identidad balancea la fluidez orgánica con terminaciones serif estructuradas. El monograma entrelazado de las letras P y M utiliza trazos variables de alto contraste que reflejan el flujo del metal líquido durante la microfundición.',
    framingLabel: 'Enmarcado de Límites Espaciales',
    framingP1: 'Al enmarcar la silueta minimalista del hipopótamo parcialmente detrás de la silueta del monograma principal, la composición replica la profundidad física y el tallado en relieve, arraigando la marca en la escultura natural.',
    v1Label: 'V1 Concepto de Archivo (2016)',
    v1Title: 'La Maquetación Editorial Original',
    openFigma: 'Abrir Archivo Maestro en Figma →',
    v1Desc: 'Concebido originalmente como una vitrina editorial en modo claro. Aunque visualmente memorable, requería desarrollo a medida ante cada actualización de inventario: un aprendizaje crucial que impulsó nuestra transición a sistemas modulares.',
    superseded: 'Prototipo V1 Reemplazado',
    fullStackLabel: 'Ejecución Full-Stack',
    howWeBuiltItTitle: 'Cómo lo Construimos',
    process: [
      {
        label: 'Arquitectura de Materiales y Tolerancias',
        description:
          'Evaluación rigurosa de contracciones en colada de plata y tolerancias de acabado superficial. La aleación se calibró para balancear sensación de peso noble con integridad estructural.',
      },
      {
        label: 'Tubería Propia de Microfundición',
        description:
          'Se superó la manufactura industrial convencional mediante un flujo de microfundición propio desde cero, permitiendo detalles geométricos orgánicos imposibles de replicar a escala.',
      },
      {
        label: 'Esquemas Maestros Paramétricos',
        description:
          'Se crearon planos CAD 3D de alta fidelidad en Blender como única fuente de verdad técnica, exportando directamente a moldes maestros para eliminar ciclos físicos innecesarios.',
      },
      {
        label: 'Sistema de Marca Omnicanal',
        description:
          'Diseño de identidad integral: desde planos vectoriales de empaques físicos y logotipos tipográficos personalizados, hasta interfaces web de alto contraste.',
      },
      {
        label: 'Posicionamiento Cultural y Comercial',
        description:
          'Estrategia de posicionamiento que aseguró presencia en las principales tiendas y redes de arte de la ciudad (MAMM y Museo de Antioquia).',
      },
    ],
    institutionalImpactLabel: 'Impacto Institucional',
    recognitionArchivesTitle: 'Reconocimiento y Archivos',
    press: [
      {
        outlet: 'Lápiz de Acero',
        year: '2013',
        note: 'Reconocimiento oficial — Premio Lápiz de Acero, máxima distinción del diseño industrial en Colombia.',
      },
      {
        outlet: 'El Colombiano',
        year: '2013',
        note: 'Cobertura en el archivo periodístico nacional impreso.',
      },
      {
        outlet: 'Universidad EAFIT',
        year: '2013',
        note: 'Distinción institucional y documentación en el archivo de diseño.',
      },
    ],
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
  name: 'Pepe Matilda — Case Study',
  description:
    'Award-winning silver jewelry brand designed and built by David Raigoza. Winner of the Premio Lápiz de Acero 2013.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
  award: 'Premio Lápiz de Acero 2013',
}

export default function PepeMatildaCaseStudy() {
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
        
        {/* Neutral Grid Overlay */}
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
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
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

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--text)', maxWidth: '52ch', lineHeight: 1.5, fontWeight: 400, marginBottom: '2.5rem', ...fadeIn(0.3) }}>
            {t.heroDesc}
          </p>

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
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {t.lapizWinner}
            </span>
          </div>
        </section>

        {/* ── STRATEGIC FRAMEWORK ─────────────────────────────────── */}
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
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.agitationLabel}</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t.agitationDesc}
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.techExecLabel}</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t.techExecDesc}
            </p>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.operationalScaleLabel}</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text)', marginTop: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
              {t.operationalScaleDesc}
            </p>
          </div>
        </section>

        {/* ── PLATFORM STRATEGY & TRADE-OFFS ──────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label amber>{t.platformArchLabel}</Label>
          <SectionTitle>{t.tradeoffsTitle}</SectionTitle>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '64ch', lineHeight: 1.7, marginTop: '1rem', marginBottom: '3rem', fontWeight: 300 }}>
            {t.tradeoffsDesc}
          </p>

          <div style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 2fr 2fr',
              padding: '1.25rem 1.5rem',
              background: 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              <div>{t.tableHeaderDimension}</div>
              <div>{t.tableHeaderV1}</div>
              <div style={{ color: 'var(--amber)' }}>{t.tableHeaderV2}</div>
            </div>

            {t.tradeoffs.map((row, idx) => (
              <div
                key={row.dimension}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 2fr',
                  padding: '1.5rem',
                  borderBottom: idx < t.tradeoffs.length - 1 ? '1px solid var(--border)' : 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  alignItems: 'start',
                }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text)' }}>
                  {row.dimension}
                </div>
                <div style={{ color: 'var(--muted)', paddingRight: '1rem', fontWeight: 300 }}>
                  {row.v1}
                </div>
                <div style={{ color: 'var(--text)', fontWeight: 400 }}>
                  {row.v2}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LIVE STOREFRONT WALKTHROUGH ─────────────────────────── */}
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
              <Label amber>{t.walkthroughLabel}</Label>
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
          }}>
            <video
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src={SQUARESPACE_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* ── DIGITAL PROCESS VISUALIZER (WHY IT CONVERTS) ─────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label amber>{t.conversionStrategyLabel}</Label>
          <SectionTitle>{t.conversionTitle}</SectionTitle>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.7, marginTop: '1rem', marginBottom: '3rem', fontWeight: 300 }}>
            {t.conversionDesc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {t.pipelineSteps.map(item => (
              <div key={item.step} style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)' }}>{item.step}</span>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--text)' }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 300 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── IDENTITY & BRAND SYSTEM ──────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label amber>{t.identityArchLabel}</Label>
          <SectionTitle>{t.identityTitle}</SectionTitle>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            marginTop: '3rem',
            alignItems: 'center'
          }}>
            <div style={{
              border: '1px solid var(--border)',
              padding: '3rem 2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255, 180, 60, 0.01)',
              minHeight: '360px',
            }}>
              <div style={{ width: '100%', maxWidth: '280px', filter: 'invert(var(--dark-mode-invert, 0))' }}>
                <Image
                  src="/work/pepe-matilda/LogoPepeMatilda.png"
                  alt="Pepe Matilda Interlocking Logotype"
                  width={400}
                  height={400}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {t.anatomyLabel}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  {t.anatomyP1}
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {t.framingLabel}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  {t.framingP1}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HISTORICAL PROTOTYPE COMPARISON (V1) ───────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <Label>{t.v1Label}</Label>
              <SectionTitle>{t.v1Title}</SectionTitle>
            </div>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              {t.openFigma}
            </a>
          </div>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '56ch', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 300 }}>
            {t.v1Desc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              opacity: 0.85,
            }}>
              <span style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.55rem',
                color: 'var(--muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'rgba(0,0,0,0.8)',
                padding: '0.3rem 0.6rem',
                border: '1px solid var(--border)',
                zIndex: 1,
              }}>
                {t.superseded}
              </span>
              <Image
                src="/work/pepe-matilda/PepeMatildaLandingPage.png"
                alt="Original Figma prototype"
                width={1200}
                height={1800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── PROCESS & METHODOLOGY ───────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label amber>{t.fullStackLabel}</Label>
          <SectionTitle>{t.howWeBuiltItTitle}</SectionTitle>

          <div style={{ border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
            {t.process.map((step, i) => (
              <div key={step.label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '2rem',
                padding: '2rem',
                borderBottom: i < t.process.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
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

        {/* ── RECOGNITION ─────────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <Label amber>{t.institutionalImpactLabel}</Label>
          <SectionTitle>{t.recognitionArchivesTitle}</SectionTitle>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', border: '1px solid var(--border)', marginTop: '2.5rem', overflow: 'hidden' }}>
            {t.press.map((p, i) => (
              <div key={p.outlet} style={{ padding: '2rem', borderRight: i < t.press.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {p.year}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--text)', marginBottom: '0.6rem' }}>
                  {p.outlet}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                  {p.note}
                </p>
              </div>
            ))}
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
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
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
    </>
  )
}

// ─── SHARED HELPER COMPONENTS ──────────────────────────────────────────────
function Label({ children, amber }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: amber ? 'var(--amber)' : 'var(--accent)',
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