import type { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-root" style={{ background: '#FFFFFF', color: '#1A1A1A', minHeight: '100vh' }}>
      {children}
    </div>
  )
}