export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  overview?: string;
  challenges?: string[];
  results?: string[];
  tags: string[];
  metrics: string[];
  technicalBreakdown: string;
  locales?: Partial<Record<'en' | 'es', Partial<Omit<ProjectDetail, 'locales'>>>>;
}

export const ALL_PROJECTS: Record<string, ProjectDetail> = {
  'virtual-portfolio-hub': {
    slug: 'virtual-portfolio-hub',
    title: 'Virtual Portfolio Hub',
    subtitle: 'An AI-powered portfolio that turns a static showcase into an interactive conversation.',
    fullDescription: 'Built during an AI bootcamp competition, Virtual Portfolio Hub combines conversational AI, dynamic project discovery, and contextual interfaces to help people understand a portfolio through interaction rather than browsing alone.',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    metrics: ['Award-winning AI bootcamp competition entry', 'Conversational agent + dynamic project filtering', 'Contextual telemetry layer'],
    technicalBreakdown: 'Built with Next.js and Tailwind CSS, integrating Google AI agents directly into the portfolio navigation layer. Replaces static case-study browsing with a conversational interface that routes visitors dynamically based on stated intent.',
    locales: {
      es: {
        title: 'Virtual Portfolio Hub',
        subtitle: 'Un portafolio impulsado por IA que convierte una muestra estática en una conversación interactiva.',
        overview: 'Virtual Portfolio Hub explora una nueva relación entre portafolio, navegación y criterio profesional: una experiencia conversacional que permite descubrir proyectos por intención, no solo recorrer una galería.',
        fullDescription: 'Construido durante una competencia de bootcamp de IA, Virtual Portfolio Hub combina IA conversacional, descubrimiento dinámico de proyectos e interfaces contextuales para ayudar a las personas a comprender un portafolio mediante la interacción, en lugar de limitarse a navegarlo.',
        challenges: [
          'Traducir una trayectoria profesional amplia en un sistema que pudiera orientar a cada visitante sin convertir la experiencia en un cuestionario.',
          'Diseñar una arquitectura donde el modelo pudiera operar la interfaz, no solo redactar respuestas sobre ella.',
          'Mantener el juicio humano y la trazabilidad del contenido mientras se experimentaba con una interfaz asistida por IA.'
        ],
        results: [
          'Una navegación conversacional capaz de llevar a cada visitante hacia proyectos relevantes según su intención.',
          'Un artefacto de cámara oscura: la interfaz revela relaciones que normalmente permanecen ocultas detrás del portafolio, proyectando señales de experiencia y contexto sobre una superficie legible.',
          'Una demostración de ingeniería de producto en la que estrategia, diseño, arquitectura y experimentación con IA evolucionan como un solo sistema.'
        ],
        technicalBreakdown: 'Construido con Next.js y Tailwind CSS, integrando agentes de Google AI directamente en la capa de navegación del portafolio. El sistema reemplaza el recorrido estático por una interfaz que interpreta la intención y dirige la experiencia dinámicamente. El proyecto funciona como un pequeño manifiesto de un renacimiento de la ingeniería: volver a conectar criterio de producto, diseño de interacción y ejecución técnica en una misma práctica.'
      }
    }
  },
  'common-ground': {
    slug: 'common-ground',
    title: 'Common Ground',
    subtitle: 'Building a shared operational space for seamless alignment and real-time collaboration.',
    fullDescription: 'A real-time workspace designed to align teams, information, and decisions in one place. Integrates vector search, multi-dimensional matrix plotting, and automated signal extraction for strategic clarity.',
    tags: ['Product Architecture', 'Next.js', 'Supabase', 'UX Architecture'],
    metrics: ['Real-time multi-agent sync', 'Semantic vector matrix', 'Sub-50ms reactive state'],
    technicalBreakdown: 'Engineered with Next.js App Router, Supabase real-time subscriptions, and vector similarity indexing to plot organizational signals dynamically.',
    locales: {
      es: {
        title: 'Common Ground',
        subtitle: 'Construir un espacio operativo compartido para lograr alineación y colaboración en tiempo real.',
        overview: 'Common Ground reemplaza la incertidumbre y las presentaciones estáticas con inteligencia de mercado viva, permitiendo a equipos de producto identificar de inmediato dónde diferenciarse.',
        fullDescription: 'Un espacio de trabajo en tiempo real diseñado para alinear equipos, información y decisiones en un solo lugar. Integra búsqueda vectorial, matrices de posicionamiento multidimensional y extracción automatizada de señales para brindar claridad estratégica.',
        challenges: [
          'Transformar conceptos estratégicos abstractos en interfaces operativas e intuitivas sin sobrecargar al usuario.',
          'Sincronizar estados complejos en tiempo real entre múltiples colaboradores con latencia inferior a 50ms.',
          'Estructurar señales de mercado no estructuradas dentro de un modelo ontológico navegable.'
        ],
        results: [
          'Un entorno operativo interactivo donde la estrategia se evalúa sobre datos dinámicos en vez de documentos estáticos.',
          'Trazado multidimensional que revela vacíos de mercado y vectores de diferenciación en segundos.',
          'Demostración de ingeniería de producto de ciclo completo: de la ontología del problema a la ejecución técnica desplegada.'
        ],
        technicalBreakdown: 'Construido con Next.js App Router, suscripciones en tiempo real con Supabase y búsqueda vectorial semántica. Transforma el análisis estático en una herramienta viva de inteligencia competitiva.'
      }
    }
  },
  'qie-neobank': {
    slug: 'qie-neobank',
    title: 'QIE Neobank',
    subtitle: 'Making decentralized finance feel understandable before it asks for trust.',
    fullDescription: 'Designed a DeFi banking experience that hides protocol complexity behind a clearer product layer, connecting the user experience, system architecture, and smart-contract logic. The project was shortlisted from 411 global submissions.',
    tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'],
    metrics: ['6 deployed smart contracts to mainnet', '300-850 credit scoring scoring engine', 'Four loan tiers up to $50k at 8% APR', 'Shortlisted out of 411 global submissions'],
    technicalBreakdown: 'Smart contracts engineered using Solidity 0.8.24 and OpenZeppelin 5. Built a custom behavioral credit score engine derived from 5 distinct on-chain telemetry parameters with a built-in 7-day aging logical barrier to mathematically eliminate score manipulation loops. Frontend uses Next.js, Tailwind CSS, RainbowKit, Wagmi, and Viem.',
    locales: {
      es: {
        title: 'QIE Neobank',
        subtitle: 'Hacer que las finanzas descentralizadas sean comprensibles antes de pedir confianza.',
        overview: 'Construido durante el Hackathon de Blockchain de QIE y seleccionado en el Top 26 de 411 postulaciones globales. QIE Neobank aborda la opacidad de los préstamos on-chain mediante un sistema de calificación crediticia conductual y una interfaz bancaria intuitiva.',
        fullDescription: 'Diseñó una experiencia bancaria DeFi que oculta la complejidad del protocolo detrás de una capa de producto clara y confiable, articulando experiencia de usuario, arquitectura de sistemas y contratos inteligentes verificados.',
        challenges: [
          'DeFi es transparente a nivel de código, pero incomprensible a nivel de usuario: los ratios de colateral y liquidación no explican por qué un usuario califica para un crédito.',
          'Diseñar un sistema de scoring crediticio dinámico on-chain (300–850) matemáticamente resistente a manipulaciones y bucles de juego.',
          'Orquestar cinco contratos inteligentes especializados (Vault, Scoring, Identity, Engine, Governance) en un flujo bancario fluido.'
        ],
        results: [
          'Proyecto seleccionado en el Top 26 entre 411 propuestas internacionales en el QIE Blockchain Hackathon.',
          'Cinco smart contracts desplegados y verificados en la red principal (Mainnet) de QIE.',
          'Un modelo de riesgo escalonado con cuatro niveles de préstamo de hasta $50,000 al 8% APR fundamentado en reputación conductual.'
        ],
        technicalBreakdown: 'Contratos inteligentes desarrollados en Solidity 0.8.24 y estándares OpenZeppelin 5. Motor de crédito conductual derivado de 5 métricas de telemetría on-chain con barrera de envejecimiento de 7 días. Frontend reactivo en Next.js, RainbowKit, Wagmi y Viem.'
      }
    }
  },
  'bruma-protocol': {
    slug: 'bruma-protocol',
    title: 'Bruma Protocol',
    subtitle: 'Making complex on-chain risk states understandable while markets move.',
    fullDescription: 'Designed an interface for interpreting automated smart-contract and oracle data during volatile settlement conditions, translating technical blockchain states into clearer signals people can actually act on.',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    metrics: ['Chainlink Hackathon Project', 'Trustless oracle data integration'],
    technicalBreakdown: 'Developed the underlying smart contract protocol logic and modular decentralized app architecture. Uses dedicated Chainlink decentral oracles to feed automated real-world precipitation analytics directly on-chain, eliminating intermediate counterparty verification risks and handling program automated settlements cleanly.',
    locales: {
      es: {
        title: 'Bruma Protocol',
        subtitle: 'Hacer comprensibles los estados de riesgo on-chain mientras los mercados se mueven.',
        overview: 'Desarrollado para el hackathon Chainlink Convergence en Medellín. Bruma transforma la precipitación pluvial —el riesgo no asegurado más antiguo en la agricultura y negocios al aire libre— en una posición financiera estructurada y liquidada autónomamente por oráculos.',
        fullDescription: 'Diseñó una interfaz para interpretar contratos inteligentes automatizados y datos de oráculos durante condiciones volátiles de liquidación, traduciendo estados técnicos de la cadena de bloques en señales accionables sin intermediarios.',
        challenges: [
          'Los derivados climáticos tradicionales son inaccesibles para productores individuales debido a costos burocráticos y evaluaciones subjetivas de siniestros.',
          'Estructurar un índice paramétrico bilateral donde la liquidación dependa con absoluta certeza de datos meteorológicos verificados y no de peritajes humanos.',
          'Crear una interfaz de consola financiera que transparente la volatilidad histórica, la salud del vault y la ejecución de contratos en tiempo real.'
        ],
        results: [
          'Contratos y flujos desplegados en Ethereum Sepolia y Avalanche Fuji para el Chainlink Convergence Hackathon.',
          'Liquidación automática sin intermediarios ni disputas, respaldada por Chainlink Functions y Chainlink Automation.',
          'Representación de posiciones de cobertura mediante tokens no fungibles (NFTs) transferibles y auditables.'
        ],
        technicalBreakdown: 'Arquitectura modular de seis capas descentralizadas impulsada por Solidity y oráculos Chainlink. Las posiciones Call y Put se liquidan de forma determinista contra series históricas de precipitación pluvial de 10 años, eliminando el arbitrio de contraparte.'
      }
    }
  },
  'github-core': {
    slug: 'github-core',
    title: 'GitHub Core',
    subtitle: 'The code behind the systems, not just the screenshots.',
    fullDescription: 'An open repository containing the smart contracts, protocol interfaces, and supporting systems behind selected Web3 work. Built to make the architecture inspectable rather than hiding the implementation behind polished mockups.',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    metrics: ['Open, auditable production repository', 'Live protocol interfaces and telemetry systems'],
    technicalBreakdown: 'Direct source access for technical evaluators and diligence — Solidity contracts, Next.js interfaces, and telemetry systems as actually deployed, not staged demos.',
    locales: {
      es: {
        title: 'GitHub Core',
        subtitle: 'El código detrás de los sistemas, no solo de las capturas de pantalla.',
        overview: 'Un repositorio de acceso abierto que reúne los contratos inteligentes, interfaces de protocolo y sistemas de soporte detrás del trabajo Web3 seleccionado, permitiendo evaluar la arquitectura real sin intermediarios.',
        fullDescription: 'Un repositorio abierto con los smart contracts, interfaces y sistemas de telemetría de producción, diseñado para que evaluadores técnicos auditen la arquitectura directamente en código vivo.',
        challenges: [
          'Hacer que la arquitectura sea directamente inspeccionable en vez de depender de prototipos cosméticos o capturas estáticas.',
          'Documentar sistemas complejos de Web3 con código limpio, modular y completamente testeable.',
          'Mantener paridad entre los despliegues en mainnet y los repositorios públicos de referencia.'
        ],
        results: [
          'Repositorio de producción abierto y completamente auditable.',
          'Interfaces de protocolo funcionales y telemetría de contratos inteligentes verificada.',
          'Acceso directo al código fuente para diligencia técnica y evaluación de pares.'
        ],
        technicalBreakdown: 'Acceso directo para evaluación técnica y diligencia: contratos en Solidity, interfaces en Next.js y sistemas de telemetría tal como fueron desplegados en producción.'
      }
    }
  },
  'applyiq': {
    slug: 'applyiq',
    title: 'ApplyIQ (SiftParity)',
    subtitle: 'Turning a slow enterprise tracking system into a responsive, real-time workspace.',
    fullDescription: 'Migrated an enterprise tracking platform from Airtable to Supabase, restructuring the data layer to support faster interface updates, real-time telemetry, and a more responsive operational experience.',
    tags: ['Next.js', 'Supabase', 'Groq AI', 'Dashboard'],
    metrics: ['Real-time telemetry ingestion', 'Automated pipeline tracking', 'Sub-100ms interface updates'],
    technicalBreakdown: 'Migrated from an Airtable relational backend to Supabase, optimizing schema design to support sub-100ms real-time interface updates. Leverages custom data mapping hooks and automation rules to model funnel status, metrics, and application state transitions fluidly.',
    locales: {
      es: {
        title: 'ApplyIQ (SiftParity)',
        subtitle: 'Transformar un sistema lento de seguimiento empresarial en un espacio de trabajo reactivo en tiempo real.',
        overview: 'Migración y reingeniería integral de una plataforma corporativa de seguimiento operativo desde Airtable hacia una arquitectura dedicada en Supabase, reduciendo la latencia de interfaz y dotándola de telemetría en tiempo real.',
        fullDescription: 'Migró una plataforma empresarial de seguimiento de Airtable a Supabase, reestructurando la capa de datos para permitir actualizaciones de interfaz en menos de 100ms, telemetría en vivo y una experiencia operativa ágil y confiable.',
        challenges: [
          'Airtable generaba cuellos de botella operativos severos y límites de tasa en equipos con alto volumen de transiciones de estado.',
          'Diseñar un esquema relacional escalable preservando la flexibilidad de campos personalizados sin penalizar el rendimiento.',
          'Implementar un motor de sincronización que garantice consistencia inmediata entre múltiples operadores simultáneos.'
        ],
        results: [
          'Actualizaciones de interfaz de usuario en menos de 100ms gracias a suscripciones en tiempo real y caché local optimizada.',
          'Canalización automatizada de estados de embudo y telemetría de eventos operativos sin fallas de concurrencia.',
          'Reducción radical de costos operativos y eliminación de la dependencia de herramientas no escalables.'
        ],
        technicalBreakdown: 'Arquitectura de datos relacional sobre PostgreSQL en Supabase, combinada con Next.js, Server Actions y modelos de IA para clasificación asistida. Pipeline optimizado con consultas indexadas y políticas de seguridad RLS.'
      }
    }
  },
  'pepe-matilda': {
    slug: 'pepe-matilda',
    title: 'Pepe Matilda',
    subtitle: 'Designing the connection between a physical product and the digital experience around it.',
    fullDescription: "A jewelry brand built around custom manufacturing, 3D product development, e-commerce, and brand systems. The work connected physical production with a digital storefront and received Colombia's Lápiz de Acero award in 2013.",
    tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'],
    metrics: ["Winner of Colombia's prestigious Lápiz de Acero 2013", 'Secured selective Capital Semilla innovation grants', 'Exhibited at Museo de Arte Moderno de Medellín & Museo de Antioquia'],
    technicalBreakdown: 'Coded collection geometries directly inside Blender. Designed and validated an advanced precision microcasting infrastructure system to run high-volume fabrication using additive 3D printing tech, training operational personnel directly on tight tolerance constraints and production parameters.',
    locales: {
      es: {
        title: 'Pepe Matilda',
        subtitle: 'Diseñar la conexión entre un producto físico y la experiencia digital que lo rodea.',
        overview: 'Creación integral de una marca de joyería contemporánea en plata galardonada con el Premio Lápiz de Acero 2013 y respaldada por Capital Semilla. Conexión directa entre ingeniería 3D, microfundición propia y arquitectura de comercio electrónico de alta conversión.',
        fullDescription: 'Una marca de joyería construida desde cero: manufactura personalizada, desarrollo paramétrico en 3D, comercio digital y sistema de marca omnicanal. Conectó la precisión industrial del taller físico con una experiencia digital que honra la artesanía.',
        challenges: [
          'Los bienes de lujo físico pierden valor percibido al traducirse a tiendas en línea genéricas si no se transmite el rigor artesanal detrás de cada pieza.',
          'Superar los métodos de fundición tradicionales para lograr geometrías orgánicas complejas con tolerancias milimétricas a escala.',
          'Equilibrar el impacto editorial de alta costura con un embudo de compra ágil y libre de fricciones de inventario.'
        ],
        results: [
          'Ganador del prestigioso Premio Nacional de Diseño Lápiz de Acero 2013 en Colombia.',
          'Beneficiario del fondo de innovación empresarial Capital Semilla de la Alcaldía de Medellín.',
          'Presencia y exhibición en las tiendas y redes culturales del Museo de Arte Moderno de Medellín (MAMM) y el Museo de Antioquia.'
        ],
        technicalBreakdown: 'Modelado paramétrico de colecciones en Blender, transferido directamente a moldes maestros de cera para microfundición por inyección de plata 950. Plataforma digital optimizada que combina transparencia en el proceso de manufactura en 5 etapas con gestión ágil de inventario.'
      }
    }
  },
  'next-step': {
    slug: 'next-step',
    title: 'NextStep',
    subtitle: 'Exploring what happens when a shoe becomes a digital product.',
    fullDescription: 'A custom 3D-printed footwear concept combining product design, 3D modeling, AI-assisted prototyping, and an interactive digital experience. The project explores how customization can become part of the product itself rather than another form to complete.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Parametric customization logic', 'High-contrast neon dark design system'],
    technicalBreakdown: 'Engineered a deep visual identity, responsive web layouts, and tailored conversion funnels utilizing high-fidelity Figma specifications and detailed structural 3D asset renders compiled in Blender. Focused on high-contrast neon styling and complex customization logic patterns.',
    locales: {
      es: {
        title: 'NextStep',
        subtitle: 'Explorar qué ocurre cuando un zapato se convierte en un producto digital.',
        overview: 'Sistema integral de marca y producto interactivo para calzado personalizado impreso en 3D. Evolucionó de un concepto estático en Figma a un configurador WebGL/Three.js interactivo en tiempo real con detección de contacto, materiales e iluminación dinámica.',
        fullDescription: 'Un concepto de calzado a medida mediante manufactura aditiva que articula diseño industrial, modelado 3D, prototipado asistido por IA y una experiencia digital interactiva donde la personalización es el producto mismo.',
        challenges: [
          'Los configuradores convencionales suelen ser formularios estáticos y desarticulados que no transmiten la materialidad tridimensional del producto.',
          'Optimizar mallas 3D complejas generadas mediante IA y Blender para lograr 60 FPS fluidos en navegadores móviles y de escritorio.',
          'Sostener un lenguaje visual de alto contraste en modo oscuro (neón y negro puro) coherente a través del calzado, la web, newsletters y campañas en redes.'
        ],
        results: [
          'Configurador Three.js / WebGL totalmente funcional con rotación de cámara en 360°, raycasting de zonas e intercambio instantáneo de colores.',
          'Ecosistema completo de diseño: identidad de marca, filme publicitario, landing page de conversión, boletines y estrategia social PAC.',
          'Validación de un flujo de trabajo moderno que une prototipado asistido por IA con refinamiento técnico en código de producción.'
        ],
        technicalBreakdown: 'Pipeline de visualización con Three.js, shaders WebGL y modelos generados con IA y optimizados para web. Interfaz construida con principios de alto contraste, tipografía modular y estados de transición reactivos.'
      }
    }
  },
  'marigold-bloom': {
    slug: 'marigold-bloom',
    title: 'Marigold Bloom',
    subtitle: 'Building a digital ritual around a physical skincare product.',
    fullDescription: 'A cosmetics brand concept exploring how visual identity, product storytelling, and interaction can work together to make an online purchase feel more considered and tangible.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Omnichannel design ecosystem', 'Ritual-driven narrative logic'],
    technicalBreakdown: 'Designed a fully aligned brand system translating earthy color spaces and elegant typography cleanly across physical web layouts and active social channels. Built high-fidelity UI design flows and custom thematic product illustrations using Figma and spatial rendering suites.',
    locales: {
      es: {
        title: 'Marigold Bloom',
        subtitle: 'Construir un ritual digital alrededor de un producto físico de cuidado de la piel.',
        overview: 'Transformación de un concepto cosmético estático hacia un storefront interactivo con enfoque de bio-boticario clínico. Justifica precios premium sustituyendo el discurso poético genérico por transparencia en ingredientes activos, porcentajes y valores de pH.',
        fullDescription: 'Un concepto de cosmética botánica que explora cómo la identidad visual, la ciencia de formulación y la interacción digital se articulan para que una compra en línea se sienta reflexiva, tangible y fundamentada.',
        challenges: [
          'La narrativa de cosmética natural suele carecer de sustento clínico verificable, erosionando la confianza y la justificación de precios elevados.',
          'Traducir un concepto visual sereno y cálido en un sistema de compra ágil con páginas de formulación independientes y carrito interactivo.',
          'Diseñar una matriz comparativa interactiva que contraste extractos botánicos crudos con sus activos bio-fermentados de alta eficacia.'
        ],
        results: [
          'Tienda digital desplegada y operativa con catálogo vivo, matriz botánica clínica y carrito interactivo.',
          'Ruta de conversión optimizada que transforma el ritual de 4 pasos en una rutina de compra en un solo clic con descuento por paquete.',
          'Sistema de diseño coherente en identidad, empaques modelados en 3D, fotografía editorial y presencia en canales sociales.'
        ],
        technicalBreakdown: 'Storefront desarrollado con tipografía editorial de alto contraste, paleta cálida y arquitectura orientada a la conversión. Integra matrices interactivas de ingredientes activos, cálculo dinámico de rutinas y prototipado asistido por IA.'
      }
    }
  }
}

export function getProject(slug: string, locale: string = 'en') {
  const project = ALL_PROJECTS[slug]
  if (!project) return undefined

  const localizedProject = project.locales?.[locale as 'en' | 'es']
  return localizedProject ? { ...project, ...localizedProject } : project
}