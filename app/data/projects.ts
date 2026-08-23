export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  tags: string[];
  metrics: string[];
  technicalBreakdown: string;
}

export const ALL_PROJECTS: Record<string, ProjectDetail> = {
  'virtual-portfolio-hub': {
    slug: 'virtual-portfolio-hub',
    title: 'Virtual Portfolio Hub',
    subtitle: 'An AI-powered portfolio that turns a static showcase into an interactive conversation.',
    fullDescription: 'Built during an AI bootcamp competition, Virtual Portfolio Hub combines conversational AI, dynamic project discovery, and contextual interfaces to help people understand a portfolio through interaction rather than browsing alone.',
    tags: ['Next.js', 'Google AI', 'Tailwind CSS', 'UX Architecture'],
    metrics: ['Award-winning AI bootcamp competition entry', 'Conversational agent + dynamic project filtering', 'Contextual telemetry layer'],
    technicalBreakdown: 'Built with Next.js and Tailwind CSS, integrating Google AI agents directly into the portfolio navigation layer. Replaces static case-study browsing with a conversational interface that routes visitors dynamically based on stated intent.'
  },
  'qie-neobank': {
    slug: 'qie-neobank',
    title: 'QIE Neobank',
    subtitle: 'Making decentralized finance feel understandable before it asks for trust.',
    fullDescription: 'Designed a DeFi banking experience that hides protocol complexity behind a clearer product layer, connecting the user experience, system architecture, and smart-contract logic. The project was shortlisted from 411 global submissions.',
    tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'],
    metrics: ['6 deployed smart contracts to mainnet[cite: 2]', '300-850 credit scoring scoring engine[cite: 2]', 'Four loan tiers up to $50k at 8% APR[cite: 2]', 'Shortlisted out of 411 global submissions'],
    technicalBreakdown: 'Smart contracts engineered using Solidity 0.8.24 and OpenZeppelin 5[cite: 2]. Built a custom behavioral credit score engine derived from 5 distinct on-chain telemetry parameters with a built-in 7-day aging logical barrier to mathematically eliminate score manipulation loops[cite: 2]. Frontend uses Next.js, Tailwind CSS, RainbowKit, Wagmi, and Viem[cite: 2].'
  },
  'bruma-protocol': {
    slug: 'bruma-protocol',
    title: 'Bruma Protocol',
    subtitle: 'Making complex on-chain risk states understandable while markets move.',
    fullDescription: 'Designed an interface for interpreting automated smart-contract and oracle data during volatile settlement conditions, translating technical blockchain states into clearer signals people can actually act on.',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    metrics: ['Chainlink Hackathon Project[cite: 2]', 'Trustless oracle data integration[cite: 2]'],
    technicalBreakdown: 'Developed the underlying smart contract protocol logic and modular decentralized app architecture[cite: 2]. Uses dedicated Chainlink decentral oracles to feed automated real-world precipitation analytics directly on-chain, eliminating intermediate counterparty verification risks and handling program automated settlements cleanly[cite: 2].'
  },
  'github-core': {
    slug: 'github-core',
    title: 'GitHub Core',
    subtitle: 'The code behind the systems, not just the screenshots.',
    fullDescription: 'An open repository containing the smart contracts, protocol interfaces, and supporting systems behind selected Web3 work. Built to make the architecture inspectable rather than hiding the implementation behind polished mockups.',
    tags: ['Solidity', 'Next.js', 'Smart Contracts', 'Web3'],
    metrics: ['Open, auditable production repository', 'Live protocol interfaces and telemetry systems'],
    technicalBreakdown: 'Direct source access for technical evaluators and diligence — Solidity contracts, Next.js interfaces, and telemetry systems as actually deployed, not staged demos.'
  },
  'applyiq': {
    slug: 'applyiq',
    title: 'ApplyIQ (SiftParity)',
    subtitle: 'Turning a slow enterprise tracking system into a responsive, real-time workspace.',
    fullDescription: 'Migrated an enterprise tracking platform from Airtable to Supabase, restructuring the data layer to support faster interface updates, real-time telemetry, and a more responsive operational experience.',
    tags: ['Next.js', 'Supabase', 'Groq AI', 'Dashboard'],
    metrics: ['Real-time telemetry ingestion[cite: 2]', 'Automated pipeline tracking[cite: 2]', 'Sub-100ms interface updates'],
    technicalBreakdown: 'Migrated from an Airtable relational backend to Supabase, optimizing schema design to support sub-100ms real-time interface updates. Leverages custom data mapping hooks and automation rules to model funnel status, metrics, and application state transitions fluidly[cite: 2].'
  },
  'pepe-matilda': {
    slug: 'pepe-matilda',
    title: 'Pepe Matilda',
    subtitle: 'Designing the connection between a physical product and the digital experience around it.',
    fullDescription: "A jewelry brand built around custom manufacturing, 3D product development, e-commerce, and brand systems. The work connected physical production with a digital storefront and received Colombia's Lápiz de Acero award in 2013.",
    tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'],
    metrics: ["Winner of Colombia's prestigious Lápiz de Acero 2013[cite: 2]", 'Secured selective Capital Semilla innovation grants[cite: 2]', 'Exhibited at Museo de Arte Moderno de Medellín & Museo de Antioquia[cite: 2]'],
    technicalBreakdown: 'Coded collection geometries directly inside Blender[cite: 2]. Designed and validated an advanced precision microcasting infrastructure system to run high-volume fabrication using additive 3D printing tech, training operational personnel directly on tight tolerance constraints and production parameters[cite: 2].'
  },
  'next-step': {
    slug: 'next-step',
    title: 'NextStep',
    subtitle: 'Exploring what happens when a shoe becomes a digital product.',
    fullDescription: 'A custom 3D-printed footwear concept combining product design, 3D modeling, AI-assisted prototyping, and an interactive digital experience. The project explores how customization can become part of the product itself rather than another form to complete.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Parametric customization logic[cite: 2]', 'High-contrast neon dark design system[cite: 2]'],
    technicalBreakdown: 'Engineered a deep visual identity, responsive web layouts, and tailored conversion funnels utilizing high-fidelity Figma specifications and detailed structural 3D asset renders compiled in Blender[cite: 2]. Focused on high-contrast neon styling and complex customization logic patterns[cite: 2].'
  },
  'marigold-bloom': {
    slug: 'marigold-bloom',
    title: 'Marigold Bloom',
    subtitle: 'Building a digital ritual around a physical skincare product.',
    fullDescription: 'A cosmetics brand concept exploring how visual identity, product storytelling, and interaction can work together to make an online purchase feel more considered and tangible.',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Omnichannel design ecosystem[cite: 2]', 'Ritual-driven narrative logic[cite: 2]'],
    technicalBreakdown: 'Designed a fully aligned brand system translating earthy color spaces and elegant typography cleanly across physical web layouts and active social channels[cite: 2]. Built high-fidelity UI design flows and custom thematic product illustrations using Figma and spatial rendering suites[cite: 2].'
  }
}