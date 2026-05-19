'use client';

import { useState, useMemo, useEffect } from 'react';
import PromptCard from './PromptCard';
import Script from 'next/script';
import { Prompt } from '@/lib/supabase';

const PROMPTS_PER_PAGE = 30;
const categories = ['chatgpt', 'gemini', 'other'];
interface GalleryProps {
  initialPrompts?: Prompt[];
}

export default function Gallery({ initialPrompts = [] }: GalleryProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [loading, setLoading] = useState(initialPrompts.length === 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch prompts from API on mount or if initial prompts are empty
  useEffect(() => {
    if (initialPrompts.length === 0) {
      fetchPrompts();
    }
  }, [initialPrompts.length]);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/prompts');
      if (!response.ok) throw new Error('Failed to fetch prompts');
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrompts = useMemo(() => {
    const filtered = prompts.filter((prompt) => {
      const categoryMatch =
        selectedCategory === 'all' || prompt.category === selectedCategory;
      const searchMatch =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });

    // Sort by ID numerically (prompt-1, prompt-2, ..., prompt-10, prompt-11)
    return filtered.sort((b, a) => {
      const numA = parseInt(a.id.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.id.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROMPTS_PER_PAGE;
  const endIndex = startIndex + PROMPTS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSelectedCategory('all');
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
    selectedCategory !== 'all' || searchQuery !== '';

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
