import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to verify admin password
async function verifyAdmin() {
  const cookieStore = cookies();
  const adminSession = (await cookieStore).get('admin_session');
  return !!adminSession?.value;
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin - just check authentication without returning data
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Error verifying admin:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const tags = JSON.parse((formData.get('tags') as string) || '[]');

    // Generate ID
    const timestamp = Date.now();
    const id = `prompt-${timestamp}`;

    // Insert prompt
    const { data: prompt, error: promptError } = await supabase
      .from('prompts')
      .insert([
        {
          id,
          title,
          description,
          content,
          category,
          author,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (promptError) throw promptError;

    // Handle image uploads to Cloudinary
    const imageFiles = formData.getAll('images') as File[];
    const uploadedImages = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.size === 0) continue;

      try {
        // Convert file to buffer for Cloudinary upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        // Compress + optimize
        const optimizedBuffer = await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer();

        // Upload optimized image
        const result = await cloudinary.uploader.upload(
        `data:image/webp;base64,${optimizedBuffer.toString('base64')}`,
        {
            folder: 'prompt-gallery',
            public_id: `${id}-${timestamp}-${i}`,
            resource_type: 'image',
            format: 'webp',
        }
        );

        uploadedImages.push(result.secure_url);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        continue;
      }
    }

    // Insert images into database
    if (uploadedImages.length > 0) {
      const imagesToInsert = uploadedImages.map((url, index) => ({
        prompt_id: id,
        image_url: url,
        display_order: index,
      }));

      const { error: imagesError } = await supabase
        .from('prompt_images')
        .insert(imagesToInsert);

      if (imagesError) console.error('Error inserting images:', imagesError);
    }

    // Insert tags
    if (tags.length > 0) {
      const tagsToInsert = tags.map((tag: string) => ({
        prompt_id: id,
        tag,
      }));

      const { error: tagsError } = await supabase
        .from('prompt_tags')
        .insert(tagsToInsert);

      if (tagsError) console.error('Error inserting tags:', tagsError);
    }

    return NextResponse.json({
      success: true,
      prompt: { ...prompt, images: uploadedImages },
    });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}
