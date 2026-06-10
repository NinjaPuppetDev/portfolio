import type { Metadata } from 'next'
import './globals.css'
import Cursor from './components/Cursor'

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
        {children}
      </body>
    </html>
  )
}