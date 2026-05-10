export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prompt Gallery',
    description: 'Discover and share amazing AI image generation prompts',
    url: 'https://promptgalleryia.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://promptgalleryia.vercel.app/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePromptJsonLd(prompt: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: prompt.description,
    text: prompt.content,
    image: prompt.imageUrl,
    author: {
      '@type': 'Person',
      name: prompt.author || 'Prompt Gallery',
    },
    dateCreated: prompt.createdAt,
    keywords: prompt.tags.join(', '),
  };
}
