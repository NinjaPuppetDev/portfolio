import { createClient } from '@supabase/supabase-js'

// Dedicated service-role client for the body pipeline. Never import this into
// anything that runs client-side — the service role key bypasses RLS entirely.
// If you already have a server client from the ApplyIQ/Supabase migration,
// you can reuse it instead of this file; the important part is: service role,
// server-only, never bundled into client JS.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars for body pipeline'
  )
}

export const supabaseBody = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export type BodySignalType =
  | 'dwell'
  | 'hover'
  | 'rage_click'
  | 'idle'
  | 'scroll_stall'
  | 'form_abandon'

export interface BodySignalInput {
  session_id: string
  section: string
  signal_type: BodySignalType
  intensity: number
  metadata?: Record<string, unknown>
}