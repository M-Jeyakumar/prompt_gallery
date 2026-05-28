import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Use anon key — requires RLS policy allowing public updates on likes column
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: current, error: fetchError } = await adminSupabase
    .from('prompts')
    .select('likes')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Like fetch error:', fetchError);
    return NextResponse.json({ error: 'Not found', detail: fetchError.message }, { status: 404 });
  }

  const { data: updated, error: updateError } = await adminSupabase
    .from('prompts')
    .update({ likes: (current.likes || 0) + 1 })
    .eq('id', id)
    .select('likes')
    .single();

  if (updateError) {
    console.error('Like update error:', updateError);
    return NextResponse.json({ error: 'Failed to like' }, { status: 500 });
  }

  return NextResponse.json({ likes: updated.likes });
}
