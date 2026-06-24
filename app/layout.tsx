import type { Metadata } from 'next'
// @ts-ignore: allow global CSS import without type declarations
import './globals.css'
import Cursor from './components/Cursor'
import FloatingChat from './components/FloatingChat'




export const metadata: Metadata = {
  title: 'David Raigoza',
  description: 'Product Designer · Engineer · Web3 Builder. Medellín, Colombia.',
  openGraph: {
    title: 'David Raigoza',
    description: 'Product Designer · Engineer · Web3 Builder',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <FloatingChat />
        {children}
      </body>
    </html>
  )
}