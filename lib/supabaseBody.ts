import { createClient } from '@supabase/supabase-js'

// Dedicated service-role client for the body pipeline. Never import this into
// anything that runs client-side — the service role key bypasses RLS entirely.
// If you already have a server client from the ApplyIQ/Supabase migration,
// you can reuse it instead of this file; the important part is: service role,
// server-only, never bundled into client JS.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>

function createMockSupabase() {
  const inMemorySignals: AnyObject[] = []
  const inMemoryPosts: AnyObject[] = []

  const createQueryChain = (table: string): AnyObject => {
    const chain: AnyObject = {
      select: () => chain,
      order: () => chain,
      limit: () => chain,
      gte: () => chain,
      lte: () => chain,
      maybeSingle: async () => ({
        data: table === 'body_posts' ? inMemoryPosts[inMemoryPosts.length - 1] ?? null : null,
        error: null,
      }),
      single: async () => ({
        data: table === 'body_posts' ? inMemoryPosts[inMemoryPosts.length - 1] ?? null : null,
        error: null,
      }),
      insert: async (rows: AnyObject | AnyObject[]) => {
        const arr = Array.isArray(rows) ? rows : [rows]
        if (table === 'body_signals') {
          inMemorySignals.push(...arr.map(r => ({ ...r, created_at: new Date().toISOString() })))
        } else if (table === 'body_posts') {
          inMemoryPosts.push(...arr.map(r => ({ ...r, posted_at: new Date().toISOString() })))
        }
        return { data: arr, error: null }
      },
      delete: () => chain,
      then: (resolve: (value: unknown) => unknown, reject: (reason?: unknown) => unknown) => {
        const result = {
          data: table === 'body_signals' ? inMemorySignals : inMemoryPosts,
          error: null,
        }
        return Promise.resolve(result).then(resolve, reject)
      },
    }

    return chain
  }

  return {
    from: (tableName: string) => createQueryChain(tableName),
    auth: { persistSession: false, autoRefreshToken: false },
  } as unknown as ReturnType<typeof createClient>
}

export const supabaseBody = (supabaseUrl && serviceRoleKey)
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : createMockSupabase()

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