import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'portfolio_ab_variant'
const VARIANTS = ['A', 'B'] as const

// 1. Function name updated from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const hasVariant = request.cookies.has(COOKIE_NAME)

  if (!hasVariant) {
    const assignedVariant = Math.random() < 0.5 ? VARIANTS[0] : VARIANTS[1]
    
    response.cookies.set(COOKIE_NAME, assignedVariant, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, 
      httpOnly: false, 
    })
  }

  return response
}

export const config = {
  matcher: '/',
}