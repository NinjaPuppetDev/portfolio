import type { Metadata } from 'next'
// @ts-ignore: allow global CSS import without type declarations
import './globals.css'
import Cursor from './components/Cursor'
import FloatingChat from './components/FloatingChat'
import Navigation from './components/Navigation'
import VeraCompanion from './components/VeraCompanion'
import Script from 'next/script'
import { ExperimentProvider } from './components/ExperimentProvider'

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
    <html lang="en" style={{ colorScheme: 'dark', backgroundColor: '#000000' }}>
      <body style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        <Cursor />
        <VeraCompanion />

        <ExperimentProvider>
          <FloatingChat />
          <Navigation />
        </ExperimentProvider>

        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQXEJSG71S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQXEJSG71S');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","xc7iqvsl54");
          `}
        </Script>
      </body>
    </html>
  )
}