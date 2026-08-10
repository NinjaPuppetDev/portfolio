// stores/veraStore.ts
import { create } from 'zustand'

export type VeraMode = 'hero' | 'dock' | 'transition' | 'loading'

interface VeraStore {
  mode: VeraMode
  setMode: (mode: VeraMode) => void
}

export const useVeraStore = create<VeraStore>((set) => ({
  mode: 'hero',
  setMode: (mode) => set({ mode }),
}))