"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import { Prompt } from "@/lib/supabase";
import { generateSlug } from "@/lib/slugify";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PromptPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompts`);
        if (!response.ok) throw new Error("Failed to fetch prompts");
        const allPrompts = await response.json();

        // Try to find by slug first (new format)
        let found = allPrompts.find((p: Prompt) => p.slug === slug);

        // Fallback to ID for backward compatibility (old format)
        if (!found) {
          found = allPrompts.find((p: Prompt) => p.id === slug);
          if (found) {
            const computedSlug = found.slug || generateSlug(found.title);
            router.replace(`/prompts/${computedSlug}`);
            return;
          }
        }

        // Fallback: match by generated slug for rows where slug column is null
        if (!found) {
          found = allPrompts.find(
            (p: Prompt) => generateSlug(p.title) === slug
          );
        }

        if (!found) {
          notFound();
        }

        setPrompt(found);

        // Get related prompts
        const foundTags = found.tags || [];
        const related = allPrompts
          .filter((p: Prompt) => {
            const pTags = p.tags || [];
            return (
              p.id !== found.id &&
              (p.category === found.category ||
                pTags.some((tag: string) => foundTags.includes(tag)))
            );
          })
          .slice(0, 3);

        setRelatedPrompts(related);
      } catch (error) {
        console.error("Error fetching prompt:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [slug, router]);

  if (loading || !prompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading prompt...
          </p>
        </div>
      </div>
    );
  }

  const tags = prompt.tags || [];
  const images = prompt.images || [];
  const createdAt = prompt.created_at || "";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-8 inline-block"
          >
            ← Back to Gallery
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="p-8">
                <ImageCarousel images={images} title={prompt.title} />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {prompt.title}
                  </h1>
                  <p className="text-gray-600 text-lg">{prompt.description}</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold capitalize">
                  {prompt.category}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b">
                <div>
                  <p className="text-gray-600 text-sm">Created</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                {prompt.author && (
                  <div>
                    <p className="text-gray-600 text-sm">Author</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {prompt.author}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 text-sm">Tags</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {tags.length}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Prompt
                </h2>
                <div className="bg-gray-100 p-6 rounded-lg mb-4 border-l-4 border-blue-600">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {prompt.content}
                  </p>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {copied ? "✓ Copied to Clipboard!" : "Copy Prompt"}
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  How to Use
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Copy the prompt using the button above</li>
                  <li>
                    Open ChatGPT, Google Gemini, or another AI image generator
                  </li>
                  <li>Paste the prompt into the input field</li>
                  <li>Generate your image and enjoy!</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  💡 Pro Tips
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>
                    • Feel free to modify the prompt to suit your specific needs
                  </li>
                  <li>
                    • Experiment with different AI tools for varied results
                  </li>
                  <li>
                    • Add more details to the prompt for higher quality results
                  </li>
                  <li>
                    • Use negative prompts to exclude unwanted elements (some
                    tools support this)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {relatedPrompts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Prompts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPrompts.map((relatedPrompt) => {
                  const relatedImages = relatedPrompt.images || [];
                  const imageUrl =
                    relatedImages.length > 0
                      ? relatedImages[0].image_url
                      : "/placeholder.jpg";

                  return (
                    <Link
                      key={relatedPrompt.id}
                      href={`/prompts/${
                        relatedPrompt.slug || relatedPrompt.id
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                        <div
                          className="relative w-full bg-gray-100 flex items-center justify-center"
                          style={{ aspectRatio: "9 / 16" }}
                        >
                          <Image
                            src={imageUrl}
                            alt={relatedPrompt.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 truncate">
                            {relatedPrompt.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
