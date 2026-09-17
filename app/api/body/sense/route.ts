import { NextRequest, NextResponse } from 'next/server'
import { supabaseBody, type BodySignalInput } from '../../../../lib/supabaseBody'

// Receives batched signals from useBodySignals and writes them straight through.
// No interpretation happens here — this route is pure sensation, not cognition.
// The aggregator is where signals become a "state" worth reacting to.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const signals: BodySignalInput[] = body?.signals

    if (!Array.isArray(signals) || signals.length === 0) {
      return NextResponse.json({ error: 'No signals provided' }, { status: 400 })
    }

    // Basic shape validation — reject anything malformed rather than trusting the client.
    const rows = signals
      .filter(
        (s) =>
          typeof s?.session_id === 'string' &&
          typeof s?.section === 'string' &&
          typeof s?.signal_type === 'string' &&
          typeof s?.intensity === 'number'
      )
      .slice(0, 50) // hard cap per batch, defends against a malformed/malicious client

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid signals' }, { status: 400 })
    }

    const { error } = await supabaseBody.from('body_signals').insert(rows)

    if (error) {
      console.error('body_signals insert error:', error)
      return NextResponse.json({ error: 'Write failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, written: rows.length })
  } catch (err) {
    console.error('Sense route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}