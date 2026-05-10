export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Prompt Gallery</h3>
            <p className="text-sm leading-relaxed">
              Discover and share amazing AI image generation prompts for ChatGPT, Gemini, and more.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="https://openai.com/chatgpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  ChatGPT
                </a>
              </li>
              <li>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Google Gemini
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/?category=chatgpt" className="hover:text-white transition-colors">
                  ChatGPT Prompts
                </a>
              </li>
              <li>
                <a href="/?category=gemini" className="hover:text-white transition-colors">
                  Gemini Prompts
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  All Prompts
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-sm">
            &copy; {currentYear} Prompt Gallery. All rights reserved. | Created with AI ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
