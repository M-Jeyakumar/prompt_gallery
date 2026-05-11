'use client';

import { useState, useMemo } from 'react';
import PromptCard from './PromptCard';
import { Prompt, categories, allTags } from '@/data/prompts';
import Script from 'next/script';

interface GalleryProps {
  prompts: Prompt[];
}

const PROMPTS_PER_PAGE = 30;

export default function Gallery({ prompts }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPrompts = useMemo(() => {
    const filtered = prompts.filter((prompt) => {
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

    // Sort by ID numerically (prompt-1, prompt-2, ..., prompt-10, prompt-11)
    return filtered.sort((b, a) => {
      const numA = parseInt(a.id.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.id.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });
  }, [prompts, selectedCategory, selectedTags, searchQuery]);

  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROMPTS_PER_PAGE;
  const endIndex = startIndex + PROMPTS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery !== '';

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage > totalPages - 3) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Search & Filter</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 md:px-4 py-2 rounded-full font-semibold text-xs md:text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 md:px-4 py-2 rounded-full font-semibold text-xs md:text-sm transition-colors capitalize ${
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
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
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
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Gallery ({filteredPrompts.length})
        </h2>
        
        {/* Adsterra Native Banner Ad */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Script
              id="adsterra-native"
              async
              strategy="afterInteractive"
              data-cfasync="false"
              src="https://pl29410858.profitablecpmratenetwork.com/7875a152b319108cd2ad25a80301f480/invoke.js"
            />

            <div id="container-7875a152b319108cd2ad25a80301f480"></div>
          </div>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-base md:text-lg">
              No prompts found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {paginatedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-8">
                {/* Mobile-optimized pagination info */}
                <p className="text-sm md:text-base text-gray-600">
                  Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                </p>

                {/* Page numbers and navigation buttons */}
                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                  {/* Previous button */}
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    ← Prev
                  </button>

                  {/* Page numbers */}
                  <div className="flex flex-wrap gap-1">
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 md:px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
