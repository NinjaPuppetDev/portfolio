import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'raigoza.david.j@gmail.com',
      subject: `Portfolio contact from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 2rem; background: #0a0a0a; color: #ffffff;">
          <p style="color: #c8f04a; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;">
            New message · davidraigoza.design
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: rgba(255,255,255,0.45); font-size: 0.75rem; padding: 0.5rem 0; width: 80px;">From</td>
              <td style="color: #ffffff; font-size: 0.875rem; padding: 0.5rem 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.45); font-size: 0.75rem; padding: 0.5rem 0;">Email</td>
              <td style="color: #ffffff; font-size: 0.875rem; padding: 0.5rem 0;">
                <a href="mailto:${email}" style="color: #c8f04a;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #1e1e1e;">
            <p style="color: rgba(255,255,255,0.45); font-size: 0.75rem; margin-bottom: 0.75rem;">Message</p>
            <p style="color: #ffffff; font-size: 0.9rem; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}