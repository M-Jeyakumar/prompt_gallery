'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { SUPPORT_ME_LINK } from '@/lib/adsterra';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const applyTheme = (nextTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(nextTheme === 'dark' ? 'theme-dark' : 'theme-light');
    root.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (preferredDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200/40 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-600/20 bg-[var(--surface)]">
              <Image src="/logo.png" alt="Prompt Gallery logo" width={40} height={40} className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-bold text-gray-900">Prompt Gallery</span>
          </Link>
        </div>

        <div className="flex items-center gap-5 flex-wrap justify-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold">
            Home
          </Link>
          <Link href="/#gallery" className="text-gray-700 hover:text-blue-600 font-semibold">
            Gallery
          </Link>
          <a
            href="https://openai.com/chatgpt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            About
          </a>
          <a
            href={SUPPORT_ME_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-700 hover:text-blue-600 font-semibold'
          >
            Support Me
          </a>
          
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--border)] text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--surface-muted)] transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
