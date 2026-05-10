import { Metadata } from 'next';
import { prompts } from '@/data/prompts';
import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { id } = await params;
  const prompt = prompts.find((p) => p.id === id);

  if (!prompt) {
    return {
      title: 'Prompt Not Found - Prompt Gallery',
    };
  }

  return {
    title: `${prompt.title} - Prompt Gallery`,
    description: prompt.description,
    keywords: [...prompt.tags, prompt.category, 'AI prompt', 'image generation'],
    authors: prompt.author ? [{ name: prompt.author }] : undefined,
    openGraph: {
      title: `${prompt.title} - Prompt Gallery`,
      description: prompt.description,
      type: 'article',
      url: `https://promptgallery.com/prompts/${prompt.id}`,
      images: [
        {
          url: prompt.imageUrl,
          width: 800,
          height: 600,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${prompt.title} - Prompt Gallery`,
      description: prompt.description,
      images: [prompt.imageUrl],
    },
  };
}

export function generateStaticParams() {
  return prompts.map((prompt) => ({
    id: prompt.id,
  }));
}

export default function PromptLayout({ children, params }: Props) {
  return <>{children}</>;
}
