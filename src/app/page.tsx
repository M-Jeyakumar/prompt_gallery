import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import { supabase, Prompt } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Prompt Gallery - Discover Amazing AI Image Generation Prompts',
  description:
    'Browse and copy high-quality AI image generation prompts for ChatGPT, Google Gemini, and more. Find the perfect prompt for your creative projects.',
  keywords: [
    'AI prompts',
    'image generation',
    'ChatGPT prompts',
    'Gemini prompts',
    'creative prompts',
    'AI art',
    'prompt engineering',
  ],
  authors: [{ name: 'Prompt Gallery' }],
  openGraph: {
    title: 'Prompt Gallery - Discover Amazing AI Image Generation Prompts',
    description:
      'Browse and copy high-quality AI image generation prompts for ChatGPT, Google Gemini, and more.',
    type: 'website',
    url: 'https://promptgalleryia.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Prompt Gallery Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Gallery - Discover Amazing AI Image Generation Prompts',
    description:
      'Browse and copy high-quality AI image generation prompts for ChatGPT, Google Gemini, and more.',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=630',
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://promptgalleryia.vercel.app',
  },
};

export default async function Home() {
  let initialPrompts: Prompt[] = [];
  
  try {
    const { data: prompts, error } = await supabase
      .from('prompts')
      .select(`
        id,
        title,
        description,
        content,
        category,
        author,
        created_at,
        prompt_images (
          id,
          image_url,
          display_order
        ),
        prompt_tags (
          tag
        )
      `)
      .order('created_at', { ascending: false });

    if (!error && prompts) {
      initialPrompts = prompts.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        content: p.content,
        category: p.category,
        author: p.author,
        created_at: p.created_at,
        tags: (p.prompt_tags || []).map((tagRow: any) => tagRow.tag),
        images: (p.prompt_images || []).sort(
          (a: any, b: any) => a.display_order - b.display_order
        ),
      }));
    }
  } catch (error) {
    console.error('Error fetching initial prompts:', error);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prompt Gallery
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Discover and share amazing AI image generation prompts for ChatGPT, Google Gemini,
              and other AI tools. Browse thousands of creative prompts, copy them instantly, and
              create stunning AI-generated artwork.
            </p>
            <div className="flex gap-4">
              <a
                href="#gallery"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Prompts
              </a>
              <a
                href="#gallery"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Curated Prompts
              </h3>
              <p className="text-gray-600">
                Handpicked collection of high-quality AI image generation prompts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Copy
              </h3>
              <p className="text-gray-600">
                One-click copy to clipboard. Use prompts directly in your AI tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Advanced Search
              </h3>
              <p className="text-gray-600">
                Filter by category, tags, and keywords to find exactly what you need.
              </p>
            </div>
          </div>

          <div id="gallery">
            <Gallery initialPrompts={initialPrompts} />
          </div>
        </section>

        <section className="bg-blue-50 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { num: '1', title: 'Browse', desc: 'Explore our collection of AI prompts' },
                { num: '2', title: 'Select', desc: 'Choose a prompt you like' },
                { num: '3', title: 'Copy', desc: 'Click to copy to clipboard' },
                { num: '4', title: 'Create', desc: 'Use in ChatGPT or Gemini' },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
