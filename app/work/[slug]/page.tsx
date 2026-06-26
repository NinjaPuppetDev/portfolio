import { ALL_PROJECTS } from '../../data/projects'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

// 1. Tell Next.js exactly what routes exist at build time for 100% SEO indexability
export async function generateStaticParams() {
  return Object.keys(ALL_PROJECTS).map((slug) => ({ slug }))
}

// 2. Render normal, static, crawlable semantic HTML
export default function WorkPage({ params }: Props) {
  const project = ALL_PROJECTS[params.slug]
  
  if (!project) notFound()

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{project.title}</h1>
      <p className="subtitle">{project.subtitle}</p>
      <div className="tags">{project.tags.join(', ')}</div>
      
      <article>
        <h2>Project Overview</h2>
        <p>{project.fullDescription}</p>
        
        <h2>Technical Architecture</h2>
        <p>{project.technicalBreakdown}</p>
      </article>
    </main>
  )
}