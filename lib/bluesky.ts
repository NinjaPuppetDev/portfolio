import { AtpAgent } from '@atproto/api'

// One login per invocation. This runs inside a cron-triggered serverless function,
// not a long-lived process, so there's no persistent session to manage — cheap
// to re-auth each time given how infrequently this fires (cooldown-gated in the
// aggregator, realistically a handful of times a day at most).

let cachedAgent: AtpAgent | null = null

async function getAgent(): Promise<AtpAgent> {
  if (cachedAgent) return cachedAgent

  const identifier = process.env.BLUESKY_HANDLE
  const password = process.env.BLUESKY_APP_PASSWORD

  if (!identifier || !password) {
    throw new Error('Missing BLUESKY_HANDLE or BLUESKY_APP_PASSWORD env vars')
  }

  const agent = new AtpAgent({ service: 'https://bsky.social' })
  await agent.login({ identifier, password })
  cachedAgent = agent
  return agent
}

export async function postToBluesky(text: string): Promise<{ uri: string; cid: string }> {
  const agent = await getAgent()
  const result = await agent.post({
    text,
    createdAt: new Date().toISOString(),
  })
  return result
}