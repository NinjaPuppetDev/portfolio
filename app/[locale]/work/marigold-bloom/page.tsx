'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const V2_VIDEO_URL    = '/work/marigold/marigold-bloom-video.mp4'
const V2_LIVE_URL     = 'https://marigold-bloom-pi.vercel.app'

// ─── PALETTE — locked to Marigold's warm botanical palette ───────────────────
const MG = {
  bg:      '#F5EFE6',   // warm cream
  surface: '#EDE4D8',   // slightly deeper warm
  border:  '#D9CEBA',   // soft tan
  text:    '#1C1410',   // near-black warm
  muted:   '#7A6A58',   // warm brown-grey
  rust:    '#C4713A',   // terracotta / marigold orange accent
  sage:    '#5C6B4E',   // botanical sage green (secondary)
  serif:   'var(--serif)',
  sans:    'var(--sans)',
  mono:    'var(--mono)',
}

const CONTENT = {
  en: {
    eyebrow: 'Case Study · Brand, UI & AI-Assisted Build · 2024–2025',
    heroSummary: 'From a static botanical concept to a live, clinically-voiced storefront. The original brand and UI system, then a written brief carried through Antigravity and Google AI Studio into a fully deployed bio-apothecary e-commerce build.',
    techStack: 'Blender · Antigravity · Google AI Studio · Brand Systems · UI Design',
    viewLiveSite: 'View Live Site →',
    deliverables: [
      { label: 'Brand Identity', note: 'Logo system, serif + script pairing, warm botanical color language, custom iconography' },
      { label: 'Landing Page', note: 'Full e-commerce UI — hero, product grid, ingredients section, ritual steps, testimonial, brand story' },
      { label: 'Social Media', note: 'Instagram grid system, brand mission doc, visual direction guide, and content tile set' },
      { label: '3D Rendering', note: 'Product packaging renders — serum, cream jar, and cleanser tube — in warm natural-light style' },
    ],
    platformStrategyLabel: 'Platform Strategy',
    platformStrategyTitle: 'V1 concept, V2 clinical rebuild.',
    platformStrategyDesc: 'The original concept sold Marigold Bloom on warmth and ritual. The rebuild keeps the botanical world but repositions the brand around clinical transparency — bio-fermentation data, active percentages, and pH values placed where a buyer needs proof, not just mood — then ships it as a real, live storefront.',
    dimension: 'Dimension',
    v1Header: 'V1 / Concept',
    v2Header: 'V2 / AI-Built Production',
    tradeoffs: [
      {
        dimension: 'Core Objective',
        v1: 'Warm, ritual-driven brand storytelling — botanical mood over proof.',
        v2: 'Clinical credibility built to justify premium pricing through transparency.',
      },
      {
        dimension: 'Positioning & Voice',
        v1: 'Soft botanical language: gentle, small-batch, ethically sourced.',
        v2: 'Bio-apothecary science: active %, pH values, bio-fermentation data, molecular weights.',
      },
      {
        dimension: 'Architecture & Engine',
        v1: 'Static layout design — a single scrollable concept, no live pages.',
        v2: 'Fully deployed production build with live, navigable product and cart pages.',
      },
      {
        dimension: 'Build Process',
        v1: 'Hand-built screen-by-screen vector layout.',
        v2: 'Written brief prompted through Antigravity and Google AI Studio, shipped live.',
      },
      {
        dimension: 'Conversion Strategy',
        v1: 'Passive lifestyle imagery, no proof points ahead of purchase.',
        v2: 'Ingredient-matrix comparisons and formulation data placed right before add-to-cart.',
      },
    ],
    walkthroughLabel: 'V2 Build Walkthrough',
    walkthroughTitle: 'The Bio-Apothecary Storefront',
    viewLiveBuild: 'View Live Build →',
    walkthroughDesc: 'Built from a written brief and shipped through Antigravity and Google AI Studio: a live product catalog, a formulation-by-formulation Botanical Matrix comparing raw extracts to their bio-fermented actives, and a shoppable four-step routine — all running on a real storefront, not a static prototype.',
    v1ConceptLabel: 'V1 Concept',
    v1LandingTitle: 'The original landing page',
    v1LandingDesc: 'Full e-commerce UI concept — botanical hero with product photography, featured collection grid, ingredients section, ritual steps, customer testimonial, brand story, and newsletter signup. Static, single-scroll, and the starting point for the V2 rebuild.',
    supersededTag: 'Superseded V1 Concept',
    brandSystemLabel: 'Brand system',
    brandValuesTitle: 'Rooted in values.',
    brandValues: [
      { icon: '✦', label: 'Botanical', note: 'Every formula grounded in plant-derived ingredients.' },
      { icon: '✦', label: 'Gentle', note: 'Designed for sensitive skin and everyday rituals.' },
      { icon: '✦', label: 'Effective', note: 'Science-backed botanicals, not just aesthetics.' },
      { icon: '✦', label: 'Made for you', note: 'Small-batch, ethically sourced, sustainable packaging.' },
    ],
    dailyRitualLabel: 'Your daily ritual — V1',
    dailyRitualTitle: 'Simple steps. Radiant results.',
    ritualSteps: [
      { step: '01', label: 'Cleanse', note: 'Remove impurities without stripping.' },
      { step: '02', label: 'Hydrate', note: 'Restore moisture and prepare skin.' },
      { step: '03', label: 'Restore', note: 'Nourish with potent botanical actives.' },
      { step: '04', label: 'Protect', note: 'Shield and support all day long.' },
    ],
    ritualV2Note: 'In V2, this sequence ships as a shoppable routine — bundle price and an add-to-bag action live under the steps.',
    socialLabel: 'Social media & identity — V1',
    socialTitle: 'Brand in every touchpoint.',
    socialDesc: 'Brand mission, visual direction guide, Instagram profile and content grid — six tile variants covering product, testimonial, ingredient education, and new arrival. The warm earthy palette and serif typography carry through into the V2 build.',
    howBuiltLabel: 'AI-Assisted Build',
    howBuiltTitle: 'How V2 got built.',
    v2Process: [
      {
        label: 'Brief Definition',
        description: 'Wrote a structured creative and technical brief translating the V1 botanical concept into a clinical bio-apothecary direction — positioning, copy voice, ingredient science, and page-by-page scope.',
      },
      {
        label: 'AI-Assisted Build',
        description: 'Handed the brief to Antigravity and Google AI Studio to generate and iterate the production frontend — full navigation, product catalog, formulation pages, and cart logic.',
      },
      {
        label: 'Botanical-to-Clinical Data Layer',
        description: 'Rebuilt the ingredients story as an interactive comparison matrix — raw botanical extract mapped against its bio-fermented, clinically synthesized active for each formulation.',
      },
      {
        label: 'Ritual-to-Routine Conversion Path',
        description: 'Converted the original four-step ritual concept into a shoppable routine — bundle pricing and an add-4-step-routine action sitting directly beneath the steps.',
      },
      {
        label: 'Live Deployment',
        description: 'Shipped as a fully live, browsable storefront rather than a static prototype — every formulation has its own working product page.',
      },
    ],
    ctaEyebrow: 'See the full system',
    ctaLine1: 'Rooted in care.',
    ctaLine2: 'Built with precision.',
    ctaButton: 'View Live Build →',
    allWork: '← All work',
  },
  es: {
    eyebrow: 'Caso de Estudio · Marca, UI y Construcción con IA · 2024–2025',
    heroSummary: 'De un concepto botánico estático a una tienda en vivo con narrativa clínica. La identidad y UI originales, seguidas por un brief estructurado implementado con Antigravity y Google AI Studio en una plataforma de e-commerce bio-boticaria desplegada.',
    techStack: 'Blender · Antigravity · Google AI Studio · Sistemas de Marca · Diseño UI',
    viewLiveSite: 'Ver Sitio en Vivo →',
    deliverables: [
      { label: 'Identidad de Marca', note: 'Sistema de logo, combinación serif + script, lenguaje cromático botánico e iconografía personalizada' },
      { label: 'Landing Page', note: 'Interfaz integral de e-commerce: hero, grilla de productos, sección de ingredientes, ritual, testimonios e historia de marca' },
      { label: 'Redes Sociales', note: 'Sistema de grilla para Instagram, misión de marca, guía de dirección visual y set de contenidos' },
      { label: 'Renderizado 3D', note: 'Renders de packaging de producto (serum, pote de crema y tubo limpiador) bajo luz natural cálida' },
    ],
    platformStrategyLabel: 'Estrategia de Plataforma',
    platformStrategyTitle: 'Concepto V1, reconstrucción clínica V2.',
    platformStrategyDesc: 'El concepto original posicionó a Marigold Bloom desde la calidez y el ritual. La reconstrucción preserva el universo botánico pero reposiciona la marca sobre la transparencia clínica: datos de bio-fermentación, porcentajes de activos y niveles de pH dispuestos donde el comprador exige evidencia y no solo atmósfera; luego lo lleva a una tienda real en producción.',
    dimension: 'Dimensión',
    v1Header: 'V1 / Concepto',
    v2Header: 'V2 / Producción con IA',
    tradeoffs: [
      {
        dimension: 'Objetivo Central',
        v1: 'Narrativa de marca cálida basada en rituales: primacía del ambiente botánico sobre la prueba técnica.',
        v2: 'Credibilidad clínica diseñada para respaldar precios premium a través de una rigurosa transparencia.',
      },
      {
        dimension: 'Posicionamiento y Tono',
        v1: 'Lenguaje botánico suave: delicado, lotes pequeños, abastecimiento ético.',
        v2: 'Ciencia bio-boticaria: porcentaje de activos, valores de pH, datos de biofermentación y pesos moleculares.',
      },
      {
        dimension: 'Arquitectura y Motor',
        v1: 'Diseño de maquetación estática: concepto de desplazamiento único sin páginas activas.',
        v2: 'Despliegue completo de producción con catálogo explorable, páginas de producto y carrito en vivo.',
      },
      {
        dimension: 'Proceso de Construcción',
        v1: 'Diagramación vectorial pantalla por pantalla.',
        v2: 'Brief estructurado desarrollado con Antigravity y Google AI Studio, puesto en producción.',
      },
      {
        dimension: 'Estrategia de Conversión',
        v1: 'Imágenes pasivas de estilo de vida sin puntos de validación antes de la compra.',
        v2: 'Matrices comparativas de ingredientes y datos de formulación justo antes de añadir al carrito.',
      },
    ],
    walkthroughLabel: 'Recorrido del Despliegue V2',
    walkthroughTitle: 'La Tienda Bio-Boticaria',
    viewLiveBuild: 'Ver Despliegue en Vivo →',
    walkthroughDesc: 'Desarrollado a partir de un brief escrito y producido mediante Antigravity y Google AI Studio: catálogo interactivo de productos, matriz botánica formulación por formulación comparando extractos crudos frente a activos biofermentados, y una rutina de cuatro pasos adquirible: todo operando en una tienda real, no en un prototipo estático.',
    v1ConceptLabel: 'Concepto V1',
    v1LandingTitle: 'La landing page original',
    v1LandingDesc: 'Concepto completo de interfaz de e-commerce: hero botánico con fotografía de producto, grilla de colección destacada, sección de ingredientes, pasos del ritual, testimonio de clientes, historia de marca y suscripción a newsletter. Estático, de desplazamiento continuo y punto de partida de la versión V2.',
    supersededTag: 'Concepto V1 superado',
    brandSystemLabel: 'Sistema de marca',
    brandValuesTitle: 'Arraigado en valores.',
    brandValues: [
      { icon: '✦', label: 'Botánico', note: 'Cada fórmula fundamentada en ingredientes de origen vegetal.' },
      { icon: '✦', label: 'Suave', note: 'Diseñado para pieles sensibles y rituales diarios.' },
      { icon: '✦', label: 'Eficaz', note: 'Botánicos respaldados por ciencia, no solo estética.' },
      { icon: '✦', label: 'Hecho para ti', note: 'Pequeñas tandas, abastecimiento ético y empaques sostenibles.' },
    ],
    dailyRitualLabel: 'Tu ritual diario — V1',
    dailyRitualTitle: 'Pasos simples. Resultados radiantes.',
    ritualSteps: [
      { step: '01', label: 'Limpiar', note: 'Elimina impurezas sin agredir la barrera cutánea.' },
      { step: '02', label: 'Hidratar', note: 'Restaura la hidratación y prepara la piel.' },
      { step: '03', label: 'Reparar', note: 'Nutre profundamente con activos botánicos concentrados.' },
      { step: '04', label: 'Proteger', note: 'Protege y fortalece la piel a lo largo del día.' },
    ],
    ritualV2Note: 'En V2, esta secuencia se distribuye como una rutina adquirible: precio especial por paquete y acción de compra directa bajo los pasos.',
    socialLabel: 'Redes sociales e identidad — V1',
    socialTitle: 'Marca en cada punto de contacto.',
    socialDesc: 'Misión de marca, guía de dirección visual, perfil de Instagram y grilla de contenidos: seis variantes de publicaciones que cubren producto, testimonios, divulgación de ingredientes y lanzamientos. La paleta terrosa y la tipografía serif persisten en el desarrollo V2.',
    howBuiltLabel: 'Construcción Asistida por IA',
    howBuiltTitle: 'Cómo se construyó V2.',
    v2Process: [
      {
        label: 'Definición del Brief',
        description: 'Redacción de un brief técnico y creativo estructurado traduciendo el concepto V1 hacia una orientación bio-boticaria clínica: posicionamiento, tono de voz, ciencia de formulación y alcance página a página.',
      },
      {
        label: 'Construcción con IA',
        description: 'Implementación del brief con Antigravity y Google AI Studio para generar e iterar el frontend en producción: navegación completa, catálogo de productos, fichas técnicas de formulación y lógica del carrito.',
      },
      {
        label: 'Capa de Datos Botánico-Clínica',
        description: 'Reestructuración de la historia de ingredientes en una matriz comparativa interactiva que contrasta extractos naturales crudos con su activo sintetizado y biofermentado.',
      },
      {
        label: 'Ruta de Conversión Ritual a Rutina',
        description: 'Transformación del ritual de cuatro pasos en una rutina comprable directamente en bloque, con precios por paquete y acción de compra en un clic.',
      },
      {
        label: 'Despliegue en Producción',
        description: 'Puesta en producción como tienda virtual activa y navegable: cada formulación cuenta con su propia página de producto funcional.',
      },
    ],
    ctaEyebrow: 'Conoce el sistema completo',
    ctaLine1: 'Arraigado en el cuidado.',
    ctaLine2: 'Construido con precisión.',
    ctaButton: 'Ver Despliegue en Vivo →',
    allWork: '← Todos los proyectos',
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Marigold Bloom — Brand & UI Design',
  description: 'End-to-end brand identity and UI design for Marigold Bloom, a botanical skincare brand. Designed by David Raigoza.',
  creator: { '@type': 'Person', name: 'David Raigoza', url: 'https://davidraigoza.design' },
  dateCreated: '2024',
  keywords: 'Marigold Bloom, David Raigoza, brand design, skincare UI, Blender, botanical, portfolio',
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function MarigoldBloomCaseStudy() {
  const locale = useLocale()
  const t = locale === 'es' ? CONTENT.es : CONTENT.en
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const fade = (delay = 0): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  })

  const section = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    ...extra,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: MG.bg, color: MG.text, minHeight: '100vh' }}>


        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle botanical warmth glow */}
          <div style={{
            position: 'absolute', top: 0, right: '-10%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(196,113,58,0.07) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(80px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem', ...fade(0.1) }}>
              {t.eyebrow}
            </p>

            {/* Logotype — mirrors the brand's own serif + script pairing feel */}
            <h1 style={{ fontFamily: MG.serif, fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: '0.5rem', ...fade(0.2) }}>
              Marigold
            </h1>
            <h1 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, color: MG.rust, marginBottom: '2.25rem', ...fade(0.3) }}>
              Bloom
            </h1>

            <p style={{ fontFamily: MG.sans, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: MG.muted, maxWidth: '54ch', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.25rem', ...fade(0.4) }}>
              {t.heroSummary}
            </p>

            <p style={{ fontFamily: MG.mono, fontSize: '0.68rem', color: MG.muted, letterSpacing: '0.1em', marginBottom: '3rem', opacity: 0.7, ...fade(0.45) }}>
              {t.techStack}
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fade(0.55) }}>
              <a
                href={V2_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: MG.mono, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', background: MG.rust, padding: '0.85rem 2.25rem', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.text)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.rust)}
              >
                {t.viewLiveSite}
              </a>
            </div>
          </div>
        </section>

        {/* ── DELIVERABLES STRIP ───────────────────────────────────── */}
        <div style={{ borderTop: `1px solid ${MG.border}`, borderBottom: `1px solid ${MG.border}`, background: MG.surface }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          }}>
            {t.deliverables.map((d, i) => (
              <div key={d.label} style={{
                padding: '1.5rem 1.75rem',
                borderRight: i < t.deliverables.length - 1 ? `1px solid ${MG.border}` : 'none',
              }}>
                <p style={{ fontFamily: MG.mono, fontSize: '0.55rem', color: MG.rust, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p style={{ fontFamily: MG.serif, fontSize: '1rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.35rem' }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: MG.sans, fontSize: '0.75rem', color: MG.muted, lineHeight: 1.6 }}>
                  {d.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PLATFORM STRATEGY & TRADE-OFFS ──────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <MGLabel>{t.platformStrategyLabel}</MGLabel>
          <MGSectionTitle>{t.platformStrategyTitle}</MGSectionTitle>

          <p style={{ fontFamily: MG.sans, fontSize: '0.95rem', color: MG.muted, maxWidth: '62ch', lineHeight: 1.8, marginTop: '1rem', marginBottom: '2.5rem' }}>
            {t.platformStrategyDesc}
          </p>

          <div style={{ border: `1px solid ${MG.border}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 2fr 2fr',
              padding: '1.25rem 1.5rem',
              background: MG.surface,
              borderBottom: `1px solid ${MG.border}`,
              fontFamily: MG.mono,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: MG.muted,
            }}>
              <div>{t.dimension}</div>
              <div>{t.v1Header}</div>
              <div style={{ color: MG.rust }}>{t.v2Header}</div>
            </div>

            {t.tradeoffs.map((row, idx) => (
              <div
                key={row.dimension}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 2fr',
                  padding: '1.5rem',
                  borderBottom: idx < t.tradeoffs.length - 1 ? `1px solid ${MG.border}` : 'none',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  alignItems: 'start',
                  background: MG.bg,
                }}
              >
                <div style={{ fontFamily: MG.mono, fontSize: '0.75rem', color: MG.text }}>
                  {row.dimension}
                </div>
                <div style={{ color: MG.muted, paddingRight: '1rem', fontWeight: 300 }}>
                  {row.v1}
                </div>
                <div style={{ color: MG.text, fontWeight: 400 }}>
                  {row.v2}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── V2 LIVE BUILD WALKTHROUGH ───────────────────────────── */}
        <section id="walkthrough" style={{ ...section(), borderBottom: `1px solid ${MG.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <MGLabel>{t.walkthroughLabel}</MGLabel>
              <MGSectionTitle>{t.walkthroughTitle}</MGSectionTitle>
            </div>
            <a
              href={V2_LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', maxWidth: '36ch', textAlign: 'right' }}
            >
              {t.viewLiveBuild}
            </a>
          </div>

          <p style={{ fontFamily: MG.sans, fontSize: '0.9rem', color: MG.muted, maxWidth: '60ch', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            {t.walkthroughDesc}
          </p>

          <div style={{
            position: 'relative',
            width: '100%',
            border: `1px solid ${MG.border}`,
            background: '#0a0a0a',
            overflow: 'hidden',
          }}>
            <video
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src={V2_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* ── LANDING PAGE SCREENSHOT (V1) ─────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <MGLabel>{t.v1ConceptLabel}</MGLabel>
              <MGSectionTitle>{t.v1LandingTitle}</MGSectionTitle>
            </div>
          </div>

          <p style={{ fontFamily: MG.sans, fontSize: '0.9rem', color: MG.muted, maxWidth: '56ch', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            {t.v1LandingDesc}
          </p>

          <div style={{ border: `1px solid ${MG.border}`, overflow: 'hidden', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              fontFamily: MG.mono,
              fontSize: '0.55rem',
              color: MG.muted,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'rgba(245,239,230,0.9)',
              padding: '0.3rem 0.6rem',
              border: `1px solid ${MG.border}`,
              zIndex: 1,
            }}>
              {t.supersededTag}
            </span>
            <Image
              src="/work/marigold/MarigoldLandingPage.png"
              alt="Marigold Bloom landing page — Skincare rooted in gentle rituals, full e-commerce page mockup"
              width={1440}
              height={2400}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </section>

        {/* ── BRAND VALUES ─────────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${MG.border}`, background: MG.surface }}>
          <div style={section()}>
            <MGLabel>{t.brandSystemLabel}</MGLabel>
            <MGSectionTitle>{t.brandValuesTitle}</MGSectionTitle>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '0',
              border: `1px solid ${MG.border}`,
              marginTop: '2.5rem',
              overflow: 'hidden',
            }}>
              {t.brandValues.map((v, i) => (
                <div key={v.label} style={{
                  padding: '2rem 1.75rem',
                  borderRight: i < t.brandValues.length - 1 ? `1px solid ${MG.border}` : 'none',
                  background: MG.bg,
                }}>
                  <p style={{ fontFamily: MG.serif, fontSize: '1.5rem', color: MG.rust, marginBottom: '0.75rem' }}>✦</p>
                  <p style={{ fontFamily: MG.serif, fontSize: '1.05rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.4rem' }}>
                    {v.label}
                  </p>
                  <p style={{ fontFamily: MG.sans, fontSize: '0.8rem', color: MG.muted, lineHeight: 1.65 }}>
                    {v.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Ritual steps */}
            <div style={{ marginTop: '3rem' }}>
              <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {t.dailyRitualLabel}
              </p>
              <p style={{ fontFamily: MG.serif, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic', color: MG.text, marginBottom: '2rem' }}>
                {t.dailyRitualTitle}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0',
                border: `1px solid ${MG.border}`,
                overflow: 'hidden',
              }}>
                {t.ritualSteps.map((r, i) => (
                  <div key={r.step} style={{
                    padding: '1.75rem',
                    borderRight: i < t.ritualSteps.length - 1 ? `1px solid ${MG.border}` : 'none',
                    background: MG.bg,
                  }}>
                    <p style={{ fontFamily: MG.mono, fontSize: '0.55rem', color: MG.rust, letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.7 }}>
                      {r.step}
                    </p>
                    <p style={{ fontFamily: MG.serif, fontSize: '1rem', fontStyle: 'italic', color: MG.text, marginBottom: '0.35rem' }}>
                      {r.label}
                    </p>
                    <p style={{ fontFamily: MG.sans, fontSize: '0.78rem', color: MG.muted, lineHeight: 1.6 }}>
                      {r.note}
                    </p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.05em', marginTop: '0.85rem', opacity: 0.7 }}>
                {t.ritualV2Note}
              </p>
            </div>
          </div>
        </section>

        {/* ── SOCIAL MEDIA / BRAND DOC ─────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <MGLabel>{t.socialLabel}</MGLabel>
          <MGSectionTitle>{t.socialTitle}</MGSectionTitle>

          <p style={{ fontFamily: MG.sans, fontSize: '0.9rem', color: MG.muted, maxWidth: '56ch', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '2.5rem' }}>
            {t.socialDesc}
          </p>

          <div style={{ border: `1px solid ${MG.border}`, overflow: 'hidden' }}>
            <Image
              src="/work/marigold/MarigoldSocialMedia.png"
              alt="Marigold Bloom social media brand system — Instagram grid, brand mission, visual direction, content tiles"
              width={1200}
              height={1800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* ── HOW WE BUILT V2 ──────────────────────────────────────── */}
        <section style={section({ borderBottom: `1px solid ${MG.border}` })}>
          <MGLabel>{t.howBuiltLabel}</MGLabel>
          <MGSectionTitle>{t.howBuiltTitle}</MGSectionTitle>

          <div style={{ border: `1px solid ${MG.border}`, marginTop: '2.5rem', overflow: 'hidden' }}>
            {t.v2Process.map((step, i) => (
              <div key={step.label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '2rem',
                padding: '2rem',
                borderBottom: i < t.v2Process.length - 1 ? `1px solid ${MG.border}` : 'none',
                alignItems: 'start',
                background: MG.bg,
              }}>
                <div>
                  <span style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.rust, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    0{i + 1}
                  </span>
                  <p style={{ fontFamily: MG.serif, fontSize: '1.1rem', color: MG.text, lineHeight: 1.3, fontStyle: 'italic' }}>
                    {step.label}
                  </p>
                </div>
                <p style={{ fontSize: '0.9rem', color: MG.muted, lineHeight: 1.7, fontWeight: 300 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: MG.surface,
          borderTop: `1px solid ${MG.border}`,
        }}>
          {/* Warm glow */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '280px',
            background: 'radial-gradient(ellipse, rgba(196,113,58,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <p style={{ fontFamily: MG.mono, fontSize: '0.65rem', color: MG.rust, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            {t.ctaEyebrow}
          </p>

          <h2 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: MG.text, marginBottom: '0.5rem', lineHeight: 1.1 }}>
            {t.ctaLine1}
          </h2>
          <h2 style={{ fontFamily: MG.serif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', color: MG.rust, marginBottom: '3rem', lineHeight: 1.1 }}>
            {t.ctaLine2}
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={V2_LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: MG.mono, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', background: MG.rust, padding: '1.1rem 3rem', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.text)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = MG.rust)}
            >
              {t.ctaButton}
            </a>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${MG.border}`,
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: MG.bg,
        }}>
          <Link
            href={`/${locale}`}
            style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = MG.rust)}
            onMouseLeave={e => (e.currentTarget.style.color = MG.muted)}
          >
            {t.allWork}
          </Link>
          <span style={{ fontFamily: MG.mono, fontSize: '0.6rem', color: MG.muted, letterSpacing: '0.1em', opacity: 0.6 }}>
            © {new Date().getFullYear()} David Raigoza
          </span>
        </footer>
      </main>
    </>
  )
}

// ─── LOCAL SHARED COMPONENTS ──────────────────────────────────────────────────
function MGLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)',
      fontSize: '0.65rem',
      color: '#C4713A',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function MGSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      color: '#1C1410',
      lineHeight: 1.1,
    }}>
      {children}
    </h2>
  )
}