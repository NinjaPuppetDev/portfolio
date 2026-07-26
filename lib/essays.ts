export interface Essay {
  slug: string
  title: string
  dek: string
  date: string           // ISO, e.g. '2026-06-24'
  displayDate: string    // e.g. 'Jun 24, 2026'
  mediumUrl?: string      // set once imported to Medium with canonical pointed back here
  // Full essay body in Markdown. Paste your original text here — nothing
  // is pre-filled from Medium to avoid reproducing published text.
  body: string
}

export const essays: Essay[] = [
  {
    slug: 'i-thought-i-was-building-a-chatbot',
    title: 'I Thought I Was Building a Chatbot. I Ended Up Replacing Navigation.',
    dek: 'Menus are an answer to a problem we stopped questioning.',
    date: '2026-06-24',
    displayDate: 'Jun 24, 2026',
    // TODO: once this page is live and indexed, import it to Medium
    // (Stories → Import a story) so Medium's canonical points back here.
    // Then drop the Medium URL below for the "Also on Medium" link.
    mediumUrl: undefined,
    body: `
Paste the full essay here as Markdown or JSX. This is the original,
canonical version of the piece — it lives here first.

---

TODO: the other four pieces already live on Medium only
("The Show-and-Tell Economy", "If You Have a Business, I Feel for You",
"When Websites Develop an Interior Life", "How do we introduce agentic
interfaces...") with no canonical set. Decide per-piece whether to
backfill a site version and edit Medium's canonical after the fact,
or leave them Medium-native and start this discipline going forward.
    `.trim(),
  },
]

export function getEssay(slug: string) {
  return essays.find(e => e.slug === slug)
}