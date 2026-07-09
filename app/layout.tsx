import type { Metadata } from 'next'
// @ts-ignore: allow global CSS import without type declarations
import './globals.css'
import Cursor from './components/Cursor'
import FloatingChat from './components/FloatingChat'
import Nav from './components/Nav' 
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
    // ─── THE FIX: Explicitly set dark color-scheme so browsers and Clarity match default dark mode ───
    <html lang="en" style={{ colorScheme: 'dark', backgroundColor: '#000000' }}>
      {/* ─── THE FIX: Inline a fallback black background so it renders dark even if CSS fails to stream in Clarity ─── */}
      <body style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        <Cursor />
        <ExperimentProvider>
          <FloatingChat />
          
          {/* ── GLOBAL HUD NAVIGATION HEADER ───────────────────── */}
          <Nav />
          
        </ExperimentProvider>
        
        {children}

        {/* ── GOOGLE TAGS MANAGEMENT ─────────────────────────── */}
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

        {/* ── MICROSOFT CLARITY HEATMAP TRACKING ──────────────── */}
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