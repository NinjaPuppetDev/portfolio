import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { essays, getEssay } from '../../../lib/essays'

export function generateStaticParams() {
  return essays.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const essay = getEssay(slug)
  if (!essay) return {}
  return {
    title: `${essay.title} — David Raigoza`,
    description: essay.dek,
    // Self-referencing canonical: this page is the original source.
    // When you import this piece to Medium, its canonical should point
    // back to this exact URL — not the other way around.
    alternates: {
      canonical: `https://davidraigoza.design/writing/${essay.slug}`,
    },
  }
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const essay = getEssay(slug)
  if (!essay) return notFound()

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
      }}
    >
      <article style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Link
          href="/writing"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '2.5rem',
          }}
        >
          ← All writing
        </Link>

        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            opacity: 0.7,
          }}
        >
          {essay.displayDate}
        </p>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.15,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          {essay.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1.1rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          {essay.dek}
        </p>

        {/* Body: replace with real Markdown rendering (e.g. next-mdx-remote)
            once essay.body holds actual content. Rendered as plain text here
            as a placeholder. */}
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--text)',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {essay.body}
        </div>

        {essay.mediumUrl && (
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            Also on{' '}
            <a href={essay.mediumUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              Medium
            </a>
          </p>
        )}
      </article>
    </main>
  )
}