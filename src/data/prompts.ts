export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: 'chatgpt' | 'gemini' | 'other';
  tags: string[];
  author?: string;
  createdAt: string;
}

export const prompts: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Cyberpunk City at Night',
    description: 'A stunning futuristic cityscape with neon lights and flying vehicles',
    content: 'A cyberpunk city at night, neon lights reflecting off wet streets, flying vehicles in the sky, towering holographic billboards, rain, cinematic lighting, ultra-detailed, 8k',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    category: 'chatgpt',
    tags: ['cyberpunk', 'city', 'night', 'futuristic', 'digital-art'],
    author: 'AI Artist',
    createdAt: '2024-01-15',
  },
  {
    id: 'prompt-2',
    title: 'Enchanted Forest Portal',
    description: 'A magical fantasy forest with a glowing portal in the center',
    content: 'An enchanted forest with ancient trees, magical glowing portal in center, mystical light rays, fantasy elements, ethereal atmosphere, oil painting style, highly detailed, 4k',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    category: 'gemini',
    tags: ['fantasy', 'forest', 'magic', 'portal', 'nature'],
    author: 'Fantasy Creator',
    createdAt: '2024-01-10',
  },
  {
    id: 'prompt-3',
    title: 'Underwater Kingdom',
    description: 'A breathtaking underwater city with coral architecture',
    content: 'Underwater kingdom with bioluminescent coral buildings, sea creatures, atlantis-like architecture, deep blue waters, god rays from above, cinematic, photorealistic, 8k',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    category: 'chatgpt',
    tags: ['underwater', 'fantasy', 'architecture', 'creatures', 'ocean'],
    author: 'Ocean Lover',
    createdAt: '2024-01-05',
  },
  {
    id: 'prompt-4',
    title: 'Space Station Interior',
    description: 'A detailed sci-fi space station with advanced technology',
    content: 'Interior of a futuristic space station, sleek metallic walls, advanced holographic interfaces, large viewport showing planets, realistic lighting, detailed, 8k, concept art',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800',
    category: 'gemini',
    tags: ['space', 'sci-fi', 'technology', 'interior', 'futuristic'],
    author: 'Sci-Fi Fan',
    createdAt: '2024-01-01',
  },
  {
    id: 'prompt-5',
    title: 'Ancient Temple Discovery',
    description: 'An explorer discovers a hidden ancient temple in the jungle',
    content: 'Ancient temple ruins hidden in dense jungle, overgrown with vines, dramatic lighting from cracks in stone, adventurer exploring, golden artifacts, archaeological, cinematic, 4k',
    imageUrl: 'https://images.unsplash.com/photo-1516850991387-51e609a57ce9?w=800',
    category: 'chatgpt',
    tags: ['adventure', 'ancient', 'temple', 'jungle', 'exploration'],
    author: 'Adventure Seeker',
    createdAt: '2023-12-28',
  },
  {
    id: 'prompt-6',
    title: 'Steampunk Airship',
    description: 'A massive Victorian-era airship with intricate machinery',
    content: 'Massive steampunk airship, Victorian-era design, intricate brass and copper machinery, floating in clouds, steam vents, detailed gears and clockwork, fantasy, 8k',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    category: 'gemini',
    tags: ['steampunk', 'airship', 'Victorian', 'machinery', 'fantasy'],
    author: 'Tech Enthusiast',
    createdAt: '2023-12-20',
  },
];

export const categories = ['chatgpt', 'gemini', 'other'] as const;
export const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));
