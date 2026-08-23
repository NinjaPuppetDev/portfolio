'use client'

import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  index: string
  year: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  link: string
  linkLabel: string
  accent: string
  variant: 'web3' | 'product' | 'brand'
  image?: string
}

export default function CardGrid({ projects, cols = 3 }: { projects: Project[]; cols?: number }) {
  const [activeCols, setActiveCols] = useState(cols)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setActiveCols(1)
      else if (window.innerWidth < 900) setActiveCols(2)
      else setActiveCols(cols)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [cols])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${activeCols}, 1fr)`, gap: '0' }}>
      {projects.map((p, i) => {
        const col = (i % activeCols) + 1
        const row = Math.floor(i / activeCols) + 1
        return (
          <div
            key={p.index}
            style={{
              borderTop: row === 1 ? '1px solid var(--border)' : 'none',
              borderBottom: '1px solid var(--border)',
              borderLeft: col === 1 ? '1px solid var(--border)' : 'none',
              borderRight: '1px solid var(--border)',
              backgroundColor: '#0A0A0A', // Deep premium chassis color
            }}
          >
            <ProjectCard {...p} />
          </div>
        )
      })}
    </div>
  )
}