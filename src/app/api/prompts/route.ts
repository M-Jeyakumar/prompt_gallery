import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all prompts with their images
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (promptsError) throw promptsError;

    // Fetch all images
    const { data: images, error: imagesError } = await supabase
      .from('prompt_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (imagesError) throw imagesError;

    // Fetch all tags
    const { data: tags, error: tagsError } = await supabase
      .from('prompt_tags')
      .select('*');

    if (tagsError) throw tagsError;

    // Map images and tags to prompts
    const promptsWithImages = prompts.map((prompt) => ({
      ...prompt,
      images: images.filter((img) => img.prompt_id === prompt.id),
      tags: tags
        .filter((tagRow) => tagRow.prompt_id === prompt.id)
        .map((tagRow) => tagRow.tag),
    }));

    return NextResponse.json(promptsWithImages);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
  }
}
