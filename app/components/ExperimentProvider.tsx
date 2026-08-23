'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Variant = 'A' | 'B' | null
const ExperimentContext = createContext<{ variant: Variant }>({ variant: null })

export function ExperimentProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<Variant>(null)

  useEffect(() => {
    // Lightweight inline helper to grab a cookie by name
    const getCookie = (name: string): Variant => {
      if (typeof document === 'undefined') return null
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift() as Variant || null
      return null
    }

    const assignedVariant = getCookie('portfolio_ab_variant')
    setVariant(assignedVariant)

    if (assignedVariant && typeof window !== 'undefined') {
      // 1. Log assignment group to Google Tag / Analytics tracker
      if ((window as any).gtag) {
        (window as any).gtag('event', 'experiment_view', { experiment_group: assignedVariant })
      }

      // 2. Send the variant straight to Microsoft Clarity natively
      if ((window as any).clarity) {
        (window as any).clarity("set", "portfolio_ab_variant", assignedVariant)
      }
    }
  }, [])

  return (
    <ExperimentContext.Provider value={{ variant }}>
      <div className={`exp-group-${variant || 'loading'}`}>
        {children}
      </div>
    </ExperimentContext.Provider>
  )
}

export const useExperiment = () => useContext(ExperimentContext)