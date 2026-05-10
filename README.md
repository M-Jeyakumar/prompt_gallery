# Prompt Gallery - AI Image Generation Prompts

A modern, SEO-optimized Next.js website for discovering, sharing, and copying high-quality AI image generation prompts for ChatGPT, Google Gemini, and other AI tools.

## Features

✨ **Key Features:**

- **Browse Prompts**: Browse a curated collection of AI image generation prompts
- **Copy to Clipboard**: One-click copy functionality for easy prompt sharing
- **Advanced Filtering**: Filter by category (ChatGPT, Gemini) and tags
- **Search**: Full-text search across titles, descriptions, and prompt content
- **Responsive Design**: Beautiful, mobile-friendly interface using Tailwind CSS
- **SEO Optimized**:
  - Dynamic metadata for each prompt
  - XML sitemap generation
  - Robots.txt configuration
  - JSON-LD schema markup
  - Open Graph tags for social sharing
  - Twitter Card support
- **Image Optimization**: Next.js Image component for automatic WebP conversion and lazy loading
- **Performance**: Built with Next.js for optimal performance and SEO

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Handling**: Next.js Image component
- **SEO**: Dynamic metadata, Sitemap, Robots.txt, JSON-LD

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with global metadata
│   ├── page.tsx                # Home page with gallery
│   ├── sitemap.ts              # Dynamic XML sitemap
│   ├── prompts/
│   │   └── [id]/
│   │       └── page.tsx        # Individual prompt page with dynamic metadata
│   └── api/                    # API routes (future expansion)
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer with links
│   ├── Gallery.tsx             # Gallery grid with filters
│   └── PromptCard.tsx          # Individual prompt card
├── data/
│   └── prompts.ts              # Sample prompts data with TypeScript interfaces
├── lib/
│   └── schema.ts               # JSON-LD schema generation
└── styles/
    └── globals.css             # Global styles

public/
└── robots.txt                  # SEO robots configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Navigate to the project:**

   ```bash
   cd PromptGallery
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## SEO Features

### Dynamic Metadata

Each prompt page automatically generates SEO-friendly metadata including:

- Custom title and description
- Open Graph tags for social sharing
- Twitter Card support
- Structured keywords and tags

### Sitemap

- Auto-generated XML sitemap at `/sitemap.xml`
- Updated with all prompt pages
- Includes change frequency and priority

### Robots.txt

- Allows search engine crawling
- Blocks sensitive routes
- Points to sitemap for better indexing

### JSON-LD Schema

- CreativeWork schema for individual prompts
- WebSite schema for the main site
- Helps search engines understand content structure

### Image Optimization

- Automatic WebP conversion
- Lazy loading with Next.js Image component
- Responsive image sizes
- Reduced file sizes

## Adding New Prompts

To add new prompts to the gallery:

1. Edit `src/data/prompts.ts`
2. Add a new prompt object following the `Prompt` interface
3. The gallery will automatically include it
4. The sitemap will be regenerated automatically

Example:

```typescript
{
  id: 'prompt-unique-id',
  title: 'Your Prompt Title',
  description: 'Short description of the prompt',
  content: 'Full prompt text...',
  imageUrl: 'https://example.com/image.jpg',
  category: 'chatgpt',
  tags: ['tag1', 'tag2'],
  author: 'Your Name',
  createdAt: '2024-01-15',
  views: 0,
}
```

## Customization

### Colors & Branding

- Edit Tailwind classes in components
- Update site name in `Header.tsx` and `Footer.tsx`
- Modify primary color: change `blue-600` to your preferred color

### Metadata

- Update default metadata in `src/app/layout.tsx`
- Change site URL from `promptgallery.com` to your domain
- Update Open Graph image

### Image Sources

- Replace image URLs in `prompts.ts` with your own
- Update `next.config.ts` for additional image domains

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms

1. Build: `npm run build`
2. Deploy the `.next` folder
3. Set Node version to 18+

## Performance Optimizations

- ✅ Image optimization with WebP
- ✅ Lazy loading for images
- ✅ Automatic code splitting
- ✅ CSS optimization with Tailwind
- ✅ SEO-friendly HTML structure
- ✅ Meta tags for social sharing

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers

## Future Enhancements

- [ ] API endpoints for external integrations
- [ ] User accounts and favorites
- [ ] Prompt submissions/contributions
- [ ] Comments and ratings
- [ ] Advanced analytics
- [ ] Multiple language support
- [ ] Dark mode toggle
- [ ] Category pages

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Happy prompting! 🎨✨**
