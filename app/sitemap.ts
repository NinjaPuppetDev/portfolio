import { MetadataRoute } from 'next';
import { ALL_PROJECTS } from './data/projects'; // Adjusted based on your app/data folder structure

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://davidraigoza.design';

  // Base routing paths
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    // Add other static pages here if you have them (e.g., '/about')
  ];

  // Dynamic project paths matching your /work/[slug] directory structure
  const projectPages = Object.keys(ALL_PROJECTS).map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}