import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { id } = await params;
  
  // Default metadata - dynamic metadata will be better implemented on client side
  // since we're fetching prompts dynamically now
  return {
    title: `Prompt - Prompt Gallery`,
    description: 'View this AI prompt and images in the Prompt Gallery',
  };
}

export function generateStaticParams() {
  // Return empty array to use on-demand ISR
  return [];
}

export default function PromptLayout({ children, params }: Props) {
  return <>{children}</>;
}
