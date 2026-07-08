import { NextRequest, NextResponse } from 'next/server'
import { supabaseBody } from '../../../../lib/supabaseBody'
import { generateBodyVoice, type BodyState } from '../../../../lib/Bodyvoice'
import { postToBluesky } from '../../../../lib/bluesky'

// Triggered by Vercel Cron every ~2 minutes. This is where signals become a
// decision: did anything cross a threshold worth reacting to, and has enough
// time passed since the body last spoke.
//
// vercel.json:
// { "crons": [{ "path": "/api/body/aggregate", "schedule": "*/2 * * * *" }] }
//
// Vercel automatically sends `Authorization: Bearer $CRON_SECRET` on cron
// invocations if you set a CRON_SECRET env var — this route checks for it so
// nobody can trigger a post by hitting the URL directly.

const COOLDOWN_MS = 45 * 60 * 1000 // don't post more than once per 45 min, regardless of signal volume
const LOOKBACK_MS = 5 * 60 * 1000 // only consider signals from the last 5 minutes

// Threshold per signal type: the minimum aggregated intensity to be worth reacting to.
// rage_click and form_abandon are inherently rarer/more meaningful, so their bar is lower.
const THRESHOLDS: Record<string, number> = {
  dwell: 30,
  idle: 25,
  rage_click: 4,
  form_abandon: 3,
  hover: 999999, // hover alone is too weak a signal to ever trigger on its own (reserved for future combination logic)
  scroll_stall: 15,
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true // no secret configured — fine for local dev, set one before deploying
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Cooldown check
    const { data: lastPost } = await supabaseBody
      .from('body_posts')
      .select('posted_at')
      .order('posted_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (lastPost?.posted_at) {
      const sinceLastPost = Date.now() - new Date(lastPost.posted_at).getTime()
      if (sinceLastPost < COOLDOWN_MS) {
        return NextResponse.json({ ok: true, skipped: 'cooldown' })
      }
    }

    // 2. Pull recent signals
    const since = new Date(Date.now() - LOOKBACK_MS).toISOString()
    const { data: signals, error } = await supabaseBody
      .from('body_signals')
      .select('*')
      .gte('created_at', since)

    if (error) throw error
    if (!signals || signals.length === 0) {
      return NextResponse.json({ ok: true, skipped: 'no signals' })
    }

    // 3. Aggregate by section + signal_type
    type Agg = { section: string; signal_type: string; total_intensity: number; sessions: Set<string> }
    const aggregates = new Map<string, Agg>()

    for (const s of signals) {
      const key = `${s.section}::${s.signal_type}`
      const existing = aggregates.get(key)
      if (existing) {
        existing.total_intensity += Number(s.intensity)
        existing.sessions.add(s.session_id)
      } else {
        aggregates.set(key, {
          section: s.section,
          signal_type: s.signal_type,
          total_intensity: Number(s.intensity),
          sessions: new Set([s.session_id]),
        })
      }
    }

    // 4. Find the strongest aggregate that crosses its threshold
    // "Strongest" = intensity relative to its own threshold, so a rage_click at
    // 2x its bar competes fairly against a dwell at 2x its bar.
    let winner: Agg | null = null
    let winnerScore = 0

    for (const agg of aggregates.values()) {
      const threshold = THRESHOLDS[agg.signal_type] ?? Infinity
      if (agg.total_intensity < threshold) continue
      const score = agg.total_intensity / threshold
      if (score > winnerScore) {
        winnerScore = score
        winner = agg
      }
    }

    if (!winner) {
      return NextResponse.json({ ok: true, skipped: 'no threshold crossed' })
    }

    // 5. Generate and post
    const state: BodyState = {
      section: winner.section,
      signal_type: winner.signal_type,
      intensity: Math.round(winner.total_intensity),
      session_count: winner.sessions.size,
    }

    const text = await generateBodyVoice(state)
    const posted = await postToBluesky(text)

    await supabaseBody.from('body_posts').insert({
      text,
      trigger_state: state,
      bluesky_uri: posted.uri,
    })

    // 6. Housekeeping: clear out the window we just consumed so it can't double-fire
    await supabaseBody.from('body_signals').delete().gte('created_at', since)

    return NextResponse.json({ ok: true, posted: text, state })
  } catch (err) {
    console.error('Aggregate route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}