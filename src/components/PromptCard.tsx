'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Prompt } from '@/data/prompts';

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  return (
    <Link href={`/prompts/${prompt.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
        <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '9 / 16' }}>
          <Image
            src={prompt.imageUrl}
            alt={prompt.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {prompt.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{prompt.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{prompt.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{prompt.tags.length - 3}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            {prompt.author && <span>{prompt.author}</span>}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleCopyPrompt();
            }}
            className={`w-full py-2 px-3 rounded font-semibold text-sm transition-colors ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy Prompt'}
          </button>
        </div>
      </div>
    </Link>
  );
}
