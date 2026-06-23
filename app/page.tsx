import type { Metadata } from 'next'
import Nav from './components/Nav'
import LandingPage from './components/LandingPage'

export const metadata: Metadata = {
  // Add this line to fix the terminal warning:
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://davidraigoza.design' : 'http://localhost:3000'),
  
  title: 'David Raigoza | Product Designer & Protocol Architect',
  description: 'Portfolio of David Raigoza, an award-winning product designer-engineer and protocol architect based in Medellín, Colombia. Specializing in Solidity, UI/UX, and Web3 systems.',
  keywords: ['Product Design', 'Solidity Developer', 'Smart Contracts', 'Lápiz de Acero', 'Medellín Designer', 'Web3 Architect', 'UX UI Portfolio'],
  openGraph: {
    title: 'David Raigoza | Product Designer & Protocol Architect',
    description: 'Product designer-engineer turned protocol architect. From physical craftsmanship to Ethereum smart contracts.',
    url: 'https://davidraigoza.design',
    siteName: 'David Raigoza Portfolio',
    images: [
      {
        url: '/images/hero/finalmall.png', 
        width: 1200,
        height: 630,
        alt: 'David Raigoza Design Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Nav />
      <LandingPage />
    </>
  )
}