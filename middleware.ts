import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'portfolio_hero_variant'
const VARIANTS = ['control', 'chat-first'] as const

export function middleware(request: NextRequest) {
  // Only target the homepage to avoid running logic on static assets / api routes
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const hasVariant = request.cookies.has(COOKIE_NAME)

  if (!hasVariant) {
    // 50/50 split assignment
    const assignedVariant = Math.random() < 0.5 ? VARIANTS[0] : VARIANTS[1]
    
    // Set cookie to last 30 days so returning users don't flip variants
    response.cookies.set(COOKIE_NAME, assignedVariant, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, 
      httpOnly: false, // Set to false so PostHog can read it on the client side
    })
  }

  return response
}

export const config = {
  matcher: '/',
}