import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">PG</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Prompt Gallery</span>
        </Link>
        
        <div className="flex items-center gap-6">
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
        </div>
      </nav>
    </header>
  );
}
