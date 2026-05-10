import { MetadataRoute } from 'next';
import { prompts } from '@/data/prompts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://promptgalleryia.vercel.app';

  const promptRoutes = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.id}`,
    lastModified: new Date(prompt.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...promptRoutes,
  ];
}
