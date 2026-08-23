// app/store/veraStore.ts
import { create } from 'zustand'

export type VeraMode = 'hero' | 'dock' | 'transition' | 'loading'

interface VeraStore {
  mode: VeraMode
  locked: boolean
  pendingMode: VeraMode | null
  setMode: (mode: VeraMode) => void
  setLocked: (locked: boolean) => void
}

export const useVeraStore = create<VeraStore>((set, get) => ({
  mode: 'dock',
  locked: false,
  pendingMode: null,
  setMode: (mode) => {
    if (get().locked) {
      set({ pendingMode: mode })
      return
    }
    set({ mode })
  },
  setLocked: (locked) => {
    set((state) =>
      !locked && state.pendingMode
        ? { locked, mode: state.pendingMode, pendingMode: null }
        : { locked }
    )
  },
}))