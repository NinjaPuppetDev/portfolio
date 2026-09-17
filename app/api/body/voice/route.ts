import { NextRequest, NextResponse } from 'next/server'
import { generateBodyVoice, type BodyState } from '../../../../lib/Bodyvoice'

// Manual preview endpoint — not part of the live pipeline (the aggregator calls
// generateBodyVoice directly). Useful for tuning the prompt without waiting for
// real signals to accumulate.
//
// Example: POST { "section": "hero", "signal_type": "dwell", "intensity": 47 }

export async function POST(req: NextRequest) {
  try {
    const state: BodyState = await req.json()

    if (!state?.section || !state?.signal_type) {
      return NextResponse.json({ error: 'section and signal_type required' }, { status: 400 })
    }

    const text = await generateBodyVoice(state)
    return NextResponse.json({ text })
  } catch (err) {
    console.error('Voice preview error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}