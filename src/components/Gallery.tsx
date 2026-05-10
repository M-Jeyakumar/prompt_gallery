'use client';

import { useState, useMemo } from 'react';
import PromptCard from './PromptCard';
import { Prompt, categories, allTags } from '@/data/prompts';

interface GalleryProps {
  prompts: Prompt[];
}

export default function Gallery({ prompts }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const categoryMatch =
        selectedCategory === 'all' || prompt.category === selectedCategory;
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => prompt.tags.includes(tag));
      const searchMatch =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && tagsMatch && searchMatch;
    });
  }, [prompts, selectedCategory, selectedTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery !== '';

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Search & Filter</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search prompts by title, description, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filter by Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Gallery ({filteredPrompts.length})
        </h2>
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No prompts found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
