// app/hooks/useVeraMode.ts
'use client'

import { useEffect } from 'react'
import { useVeraStore, type VeraMode } from '../store/veraStore'

export function useVeraMode(mode: VeraMode, revertTo: VeraMode = 'dock') {
  const setMode = useVeraStore((s) => s.setMode)

  useEffect(() => {
    setMode(mode)
    return () => setMode(revertTo)
  }, [mode, revertTo, setMode])
}