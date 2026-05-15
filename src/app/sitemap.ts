import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promptgalleryia.vercel.app';

  try {
    const { data: prompts } = await supabase
      .from('prompts')
      .select('id, created_at')
      .order('created_at', { ascending: false });

    const promptRoutes = (prompts || []).map((prompt) => ({
      url: `${baseUrl}/prompts/${prompt.id}`,
      lastModified: new Date(prompt.created_at),
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
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return base URLs if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];
  }
}
