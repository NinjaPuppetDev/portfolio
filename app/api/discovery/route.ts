import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis Rate Limiter: Max 3 submissions per 5 minutes per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '5 m'),
  analytics: true,
})

export async function POST(req: NextRequest) {
  try {
    // 1. Get client IP address
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

    // 2. Perform global Redis rate limit check
    const { success, limit, remaining, reset } = await ratelimit.limit(`discovery_${ip}`)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }

    // 3. Parse JSON request body
    const data = await req.json()
    const {
      name,
      email,
      businessDesc,
      goals,
      importance,
      successCriteria,
      targetCustomer,
      customerGoals,
      customerObstacles,
      discoveryChannels = [],
      discoveryOtherText,
      workingWell,
      notWorkingWell,
      brandFeeling,
      brandAvoidFeeling,
      brandReferences,
      existingAssets = [],
      existingAssetsOtherText,
      requirementsAndDeadlines,
      additionalInfo,
    } = data

    // 4. Input validations
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // 5. Send notification email via Resend
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const resend = new Resend(apiKey)

      const renderSection = (title: string, items: { q: string; a?: string | string[] }[]) => `
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #1e1e1e;">
          <h3 style="color: #c8f04a; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;">
            ${title}
          </h3>
          ${items
            .filter((item) => item.a && (Array.isArray(item.a) ? item.a.length > 0 : item.a.trim() !== ''))
            .map(
              (item) => `
            <div style="margin-bottom: 1.25rem;">
              <p style="color: rgba(255,255,255,0.5); font-size: 0.75rem; margin: 0 0 0.35rem 0;">${item.q}</p>
              <p style="color: #ffffff; font-size: 0.875rem; line-height: 1.6; margin: 0; white-space: pre-wrap;">
                ${Array.isArray(item.a) ? item.a.join(', ') : item.a}
              </p>
            </div>
          `
            )
            .join('')}
        </div>
      `

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 680px; padding: 2.5rem; background: #0a0a0a; color: #ffffff;">
          <p style="color: #c8f04a; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.5rem;">
            New Client Discovery Questionnaire
          </p>
          <h1 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 1.5rem 0; color: #ffffff;">
            ${name}
          </h1>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
            <tr>
              <td style="color: rgba(255,255,255,0.45); font-size: 0.8rem; padding: 0.4rem 0; width: 100px;">Email</td>
              <td style="color: #ffffff; font-size: 0.875rem; padding: 0.4rem 0;">
                <a href="mailto:${email}" style="color: #c8f04a; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>

          ${renderSection('01. The Business', [
            { q: 'Business Description', a: businessDesc },
            { q: 'Goals / What to Build', a: goals },
            { q: 'Importance Right Now', a: importance },
            { q: 'Success Criteria', a: successCriteria },
          ])}

          ${renderSection('02. Your Customers', [
            { q: 'Target Customer', a: targetCustomer },
            { q: 'Customer Goals', a: customerGoals },
            { q: 'Customer Obstacles & Doubts', a: customerObstacles },
          ])}

          ${renderSection('03. Current Experience', [
            { q: 'Discovery Channels', a: discoveryChannels },
            { q: 'Discovery Details', a: discoveryOtherText },
            { q: 'Working Well Today', a: workingWell },
            { q: 'Not Working Well / Pain Points', a: notWorkingWell },
          ])}

          ${renderSection('04. Brand & Perception', [
            { q: 'Desired Brand Feeling', a: brandFeeling },
            { q: 'Brand Feeling to Avoid', a: brandAvoidFeeling },
            { q: 'References & Inspiration', a: brandReferences },
          ])}

          ${renderSection('05. Project & Assets', [
            { q: 'Existing Assets', a: existingAssets },
            { q: 'Asset Details', a: existingAssetsOtherText },
            { q: 'Requirements, Limitations & Deadlines', a: requirementsAndDeadlines },
            { q: 'Additional Info', a: additionalInfo },
          ])}
        </div>
      `

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'raigoza.david.j@gmail.com',
        subject: `Discovery Questionnaire from ${name}`,
        html: htmlContent,
      })
    } else {
      console.log(`[Discovery Submission Received] From: ${name} <${email}>`, data)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Discovery API route error:', err)
    return NextResponse.json({ error: 'Failed to process questionnaire submission.' }, { status: 500 })
  }
}