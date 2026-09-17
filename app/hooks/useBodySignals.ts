'use client'

import { useEffect, useRef } from 'react'

// The body's nerve endings. Mount this once at the root layout level (or in
// HeroSection alongside your other client hydration). It never renders anything —
// it just listens, batches, and flushes signals to /api/body/sense.
//
// Design choices:
// - Batched every FLUSH_INTERVAL_MS, not per-event. A body that reports every
//   twitch is a spreadsheet, not a body.
// - Uses sendBeacon on unload so a visitor closing the tab mid-dwell still lands.
// - session_id is anonymous and ephemeral (sessionStorage, not localStorage) —
//   it dies when the tab closes. No cross-session identity, no PII.

const FLUSH_INTERVAL_MS = 6000
const RAGE_CLICK_WINDOW_MS = 1200
const RAGE_CLICK_THRESHOLD = 4
const IDLE_THRESHOLD_MS = 20000
const DWELL_TICK_MS = 1000

type QueuedSignal = {
  session_id: string
  section: string
  signal_type: 'dwell' | 'hover' | 'rage_click' | 'idle' | 'scroll_stall' | 'form_abandon'
  intensity: number
  metadata?: Record<string, unknown>
}

function getSessionId(): string {
  const key = 'body_session_id'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
  }
  return id
}

export function useBodySignals() {
  const queueRef = useRef<QueuedSignal[]>([])
  const sessionIdRef = useRef<string>('')
  const dwellStartRef = useRef<Record<string, number>>({})
  const lastActivityRef = useRef<number>(0)
  const clickTimestampsRef = useRef<Record<string, number[]>>({})

  useEffect(() => {
    sessionIdRef.current = getSessionId()
    lastActivityRef.current = Date.now()

    function push(signal: Omit<QueuedSignal, 'session_id'>) {
      queueRef.current.push({ session_id: sessionIdRef.current, ...signal })
    }

    // ── Section dwell time via IntersectionObserver ──────────────────────
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[id]'))
      .filter((el) => ['hero', 'work', 'about', 'contact'].includes(el.id))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            dwellStartRef.current[id] = Date.now()
          } else if (dwellStartRef.current[id]) {
            const dwelledMs = Date.now() - dwellStartRef.current[id]
            delete dwellStartRef.current[id]
            if (dwelledMs > 4000) {
              push({ section: id, signal_type: 'dwell', intensity: Math.round(dwelledMs / 1000) })
            }
          }
        }
      },
      { threshold: 0.4 }
    )
    sections.forEach((el) => observer.observe(el))

    // Periodically flush dwell time for sections still in view (long lingers
    // shouldn't wait for the visitor to scroll away to register).
    const dwellTick = setInterval(() => {
      const now = Date.now()
      for (const [id, start] of Object.entries(dwellStartRef.current)) {
        const dwelledMs = now - start
        if (dwelledMs > 0 && dwelledMs % 8000 < DWELL_TICK_MS) {
          push({ section: id, signal_type: 'dwell', intensity: Math.round(dwelledMs / 1000) })
        }
      }
    }, DWELL_TICK_MS)

    // ── Rage clicks: N+ clicks on the same element within a short window ──
    function onClick(e: MouseEvent) {
      lastActivityRef.current = Date.now()
      const target = e.target as HTMLElement
      const key = target.tagName + (target.id ? `#${target.id}` : '') + (target.className ? `.${target.className}` : '')
      const now = Date.now()
      const stamps = (clickTimestampsRef.current[key] ?? []).filter((t) => now - t < RAGE_CLICK_WINDOW_MS)
      stamps.push(now)
      clickTimestampsRef.current[key] = stamps

      if (stamps.length >= RAGE_CLICK_THRESHOLD) {
        const section = target.closest('[id]')?.id ?? 'unknown'
        push({
          section,
          signal_type: 'rage_click',
          intensity: stamps.length,
          metadata: { element: key },
        })
        clickTimestampsRef.current[key] = []
      }
    }

    // ── Idle detection ────────────────────────────────────────────────────
    function markActivity() {
      lastActivityRef.current = Date.now()
    }

    const idleTick = setInterval(() => {
      const idleMs = Date.now() - lastActivityRef.current
      if (idleMs > IDLE_THRESHOLD_MS && idleMs % IDLE_THRESHOLD_MS < DWELL_TICK_MS) {
        const visibleSection = sections.find((el) => dwellStartRef.current[el.id])?.id ?? 'unknown'
        push({ section: visibleSection, signal_type: 'idle', intensity: Math.round(idleMs / 1000) })
      }
    }, DWELL_TICK_MS)

    // ── Contact form abandon: focused an input, then blurred without submit ──
    function onFocusIn(e: FocusEvent) {
      const target = e.target as HTMLElement
      if (target.closest('#contact') && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        target.dataset.bodyFocusedAt = String(Date.now())
      }
    }
    function onFocusOut(e: FocusEvent) {
      const target = e.target as HTMLElement
      const focusedAt = target.dataset.bodyFocusedAt
      if (focusedAt) {
        const heldMs = Date.now() - Number(focusedAt)
        if (heldMs > 3000) {
          push({ section: 'contact', signal_type: 'form_abandon', intensity: Math.round(heldMs / 1000) })
        }
        delete target.dataset.bodyFocusedAt
      }
    }

    window.addEventListener('click', onClick, { passive: true })
    window.addEventListener('mousemove', markActivity, { passive: true })
    window.addEventListener('scroll', markActivity, { passive: true })
    window.addEventListener('keydown', markActivity)
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)

    // ── Flush loop ─────────────────────────────────────────────────────────
    function flush(useBeacon = false) {
      if (queueRef.current.length === 0) return
      const payload = JSON.stringify({ signals: queueRef.current })
      queueRef.current = []

      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon('/api/body/sense', new Blob([payload], { type: 'application/json' }))
      } else {
        fetch('/api/body/sense', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Best-effort. A dropped signal is fine, the body doesn't need to be omniscient.
        })
      }
    }

    const flushInterval = setInterval(() => flush(false), FLUSH_INTERVAL_MS)
    const onUnload = () => flush(true)
    window.addEventListener('pagehide', onUnload)

    return () => {
      observer.disconnect()
      clearInterval(dwellTick)
      clearInterval(idleTick)
      clearInterval(flushInterval)
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', markActivity)
      window.removeEventListener('scroll', markActivity)
      window.removeEventListener('keydown', markActivity)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('pagehide', onUnload)
    }
  }, [])
}