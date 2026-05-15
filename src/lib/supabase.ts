import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PromptImage {
  id: string;
  prompt_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'chatgpt' | 'gemini' | 'other';
  tags: string[];
  author?: string;
  created_at: string;
  images?: PromptImage[];
}
