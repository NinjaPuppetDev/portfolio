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
  'qie-neobank': {
    slug: 'qie-neobank',
    title: 'QIE Neobank',
    subtitle: 'Engineering a non-custodial decentralized liquidity layer and on-chain credit scoring architecture',
    fullDescription: 'A production-grade full-stack decentralized application built for the QIE Blockchain Hackathon. The platform functions as a non-custodial liquidity deployment layer that leverages advanced tokenized vault mechanics[cite: 2].',
    tags: ['Solidity', 'ERC-4626', 'Soulbound NFT', 'DeFi', 'Next.js', 'Figma'],
    metrics: ['6 deployed smart contracts to mainnet[cite: 2]', '300-850 credit scoring scoring engine[cite: 2]', 'Four loan tiers up to $50k at 8% APR[cite: 2]'],
    technicalBreakdown: 'Smart contracts engineered using Solidity 0.8.24 and OpenZeppelin 5[cite: 2]. Built a custom behavioral credit score engine derived from 5 distinct on-chain telemetry parameters with a built-in 7-day aging logical barrier to mathematically eliminate score manipulation loops[cite: 2]. Frontend uses Next.js, Tailwind CSS, RainbowKit, Wagmi, and Viem[cite: 2].'
  },
  'bruma-protocol': {
    slug: 'bruma-protocol',
    title: 'Bruma Protocol',
    subtitle: 'Architecting a trustless, oracle-driven derivative settlement engine for environmental risk management',
    fullDescription: 'Designed and built during the Chainlink Hackathon, Bruma Protocol is an Ethereum-based climatic rainfall derivatives framework that empowers stakeholders to hedge, transfer, and trade environmental risk cleanly[cite: 2].',
    tags: ['Solidity', 'Chainlink Oracles', 'DeFi', 'On-chain Settlement'],
    metrics: ['Chainlink Hackathon Project[cite: 2]', 'Trustless oracle data integration[cite: 2]'],
    technicalBreakdown: 'Developed the underlying smart contract protocol logic and modular decentralized app architecture[cite: 2]. Uses dedicated Chainlink decentral oracles to feed automated real-world precipitation analytics directly on-chain, eliminating intermediate counterparty verification risks and handling program automated settlements cleanly[cite: 2].'
  },
  'raigoza-job-scanner': {
    slug: 'raigoza-job-scanner',
    title: 'Raigoza Job Scanner',
    subtitle: 'Building a real-time data ingestion telemetry dashboard and serverless CRM pipeline',
    fullDescription: 'A highly functional personal CRM application designed to track operational outreach, interview phases, and application funnel telemetry in near real-time[cite: 2].',
    tags: ['Next.js', 'Airtable', 'Groq AI', 'No-code', 'Dashboard'],
    metrics: ['Real-time telemetry ingestion[cite: 2]', 'Automated pipeline tracking[cite: 2]'],
    technicalBreakdown: 'Built using Airtable as an decoupled relational data backend layer, seamlessly piped directly into a responsive Next.js analytics interface[cite: 2]. Leverages custom data mapping hooks and automation rules to model funnel status, metrics, and application state transitions fluidly[cite: 2].'
  },
  'pepe-matilda': {
    slug: 'pepe-matilda',
    title: 'Pepe Matilda',
    subtitle: 'Scaling a proprietary 0-to-1 microcasting manufacturing pipeline and physical-to-digital brand matrix',
    fullDescription: 'An award-winning precision silver jewelry venture built fully from zero[cite: 2]. Managed everything from initial collection engineering through distribution deals with elite art facilities[cite: 2].',
    tags: ['Industrial Design', 'Lápiz de Acero', 'Blender', 'MAMM'],
    metrics: ["Winner of Colombia's prestigious Lápiz de Acero 2013[cite: 2]", 'Secured selective Capital Semilla innovation grants[cite: 2]', 'Exhibited at Museo de Arte Moderno de Medellín & Museo de Antioquia[cite: 2]'],
    technicalBreakdown: 'Coded collection geometries directly inside Blender[cite: 2]. Designed and validated an advanced precision microcasting infrastructure system to run high-volume fabrication using additive 3D printing tech, training operational personnel directly on tight tolerance constraints and production parameters[cite: 2].'
  },
  'next-step': {
    slug: 'next-step',
    title: 'NextStep',
    subtitle: 'Developing a high-contrast parametric visual infrastructure and customization-first UX flow for physical manufacturing',
    fullDescription: 'An end-to-end visual system, architectural asset package, and customizable product interface designed for an innovative 3D-printed custom footwear project[cite: 2].',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Parametric customization logic[cite: 2]', 'High-contrast neon dark design system[cite: 2]'],
    technicalBreakdown: 'Engineered a deep visual identity, responsive web layouts, and tailored conversion funnels utilizing high-fidelity Figma specifications and detailed structural 3D asset renders compiled in Blender[cite: 2]. Focused on high-contrast neon styling and complex customization logic patterns[cite: 2].'
  },
  'marigold-bloom': {
    slug: 'marigold-bloom',
    title: 'Marigold Bloom',
    subtitle: 'Engineering a cohesive experiential omnichannel identity and ritual-driven digital interface',
    fullDescription: 'A holistic digital design system and identity deployment framework created for an artisanal botanical skincare product ecosystem[cite: 2].',
    tags: ['Figma', 'Blender', 'Brand Systems', 'UI Design'],
    metrics: ['Omnichannel design ecosystem[cite: 2]', 'Ritual-driven narrative logic[cite: 2]'],
    technicalBreakdown: 'Designed a fully aligned brand system translating earthy color spaces and elegant typography cleanly across physical web layouts and active social channels[cite: 2]. Built high-fidelity UI design flows and custom thematic product illustrations using Figma and spatial rendering suites[cite: 2].'
  }
}