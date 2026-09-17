import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const COOKIE_NAME = 'portfolio_ab_variant'
const VARIANTS = ['A', 'B'] as const
const localeCookie = 'NEXT_LOCALE'
const locales = ['en', 'es'] as const
const defaultLocale = 'en'

// ISO 3166-1 alpha-2 country codes for Spanish-speaking countries and territories
const SPANISH_COUNTRIES = new Set([
  'AR', // Argentina
  'BO', // Bolivia
  'CL', // Chile
  'CO', // Colombia
  'CR', // Costa Rica
  'CU', // Cuba
  'DO', // Dominican Republic
  'EC', // Ecuador
  'ES', // Spain
  'GQ', // Equatorial Guinea
  'GT', // Guatemala
  'HN', // Honduras
  'MX', // Mexico
  'NI', // Nicaragua
  'PA', // Panama
  'PE', // Peru
  'PR', // Puerto Rico
  'PY', // Paraguay
  'SV', // El Salvador
  'UY', // Uruguay
  'VE', // Venezuela
])

function getCountryCode(request: NextRequest): string | null {
  const headerCountry =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    request.headers.get('x-client-geo-location') ||
    request.headers.get('cloudfront-viewer-country') ||
    // @ts-expect-error - Next.js request.geo may exist on edge/Vercel runtimes
    request.geo?.country

  if (headerCountry && typeof headerCountry === 'string' && headerCountry.trim().length === 2) {
    return headerCountry.trim().toUpperCase()
  }
  return null
}

function prefersSpanish(acceptLanguage: string | null): boolean {
  if (!acceptLanguage) return false

  const entries = acceptLanguage.split(',').map((item) => {
    const [tag, qValue] = item.trim().split(';q=')
    const lang = tag.toLowerCase().split('-')[0]
    const q = qValue ? parseFloat(qValue) : 1.0
    return { lang, q: isNaN(q) ? 0 : q }
  })

  let spanishScore = -1
  let englishScore = -1

  for (const entry of entries) {
    if (entry.lang === 'es' && entry.q > spanishScore) {
      spanishScore = entry.q
    }
    if (entry.lang === 'en' && entry.q > englishScore) {
      englishScore = entry.q
    }
  }

  return spanishScore > 0 && spanishScore >= englishScore
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function proxy(request: NextRequest) {
  const pathLocale = request.nextUrl.pathname.match(/^\/(en|es)(?:\/|$)/)?.[1]
  const rawCookieLocale = request.cookies.get(localeCookie)?.value
  const hasValidCookie =
    rawCookieLocale && locales.includes(rawCookieLocale as (typeof locales)[number])

  // Determine user's target locale if no valid explicit cookie is set
  let effectiveLocale: (typeof locales)[number]

  if (hasValidCookie) {
    // Priority 1: User explicitly chose a locale previously
    effectiveLocale = rawCookieLocale as (typeof locales)[number]
  } else {
    // Priority 2: Geographic country check
    const country = getCountryCode(request)
    if (country && SPANISH_COUNTRIES.has(country)) {
      effectiveLocale = 'es'
    } else if (prefersSpanish(request.headers.get('accept-language'))) {
      // Priority 3: Browser Accept-Language header
      effectiveLocale = 'es'
    } else {
      // Priority 4: Default global language (English)
      effectiveLocale = defaultLocale
    }

    // Inform next-intl of the resolved locale so root redirects route silently
    request.cookies.set(localeCookie, effectiveLocale)
  }

  const response = intlMiddleware(request)

  const activeLocale =
    pathLocale && locales.includes(pathLocale as (typeof locales)[number])
      ? (pathLocale as (typeof locales)[number])
      : effectiveLocale

  response.cookies.set(localeCookie, activeLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  if (request.nextUrl.pathname === '/') {
    const hasVariant = request.cookies.has(COOKIE_NAME)

    if (!hasVariant) {
      const assignedVariant = Math.random() < 0.5 ? VARIANTS[0] : VARIANTS[1]
      response.cookies.set(COOKIE_NAME, assignedVariant, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}