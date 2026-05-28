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

const LIKED_KEY = "liked_prompts";

function getLikedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveLiked(set: Set<string>) {
  localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
}

export default function PromptPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleCopyPrompt = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = async () => {
    if (!prompt || liked || liking) return;
    setLiking(true);
    try {
      const res = await fetch(`/api/prompts/${prompt.id}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        const set = getLikedSet();
        set.add(prompt.id);
        saveLiked(set);
        setLiked(true);
      }
    } finally {
      setLiking(false);
    }
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompts`);
        if (!response.ok) throw new Error("Failed to fetch prompts");
        const allPrompts = await response.json();

        let found = allPrompts.find((p: Prompt) => p.slug === slug);

        if (!found) {
          found = allPrompts.find((p: Prompt) => p.id === slug);
          if (found) {
            const computedSlug = found.slug || generateSlug(found.title);
            router.replace(`/prompts/${computedSlug}`);
            return; // keep loading=true so spinner shows during redirect
          }
        }

        if (!found) {
          found = allPrompts.find(
            (p: Prompt) => generateSlug(p.title) === slug
          );
        }

        if (!found) {
          notFound();
        }

        setPrompt(found);
        setLikes(found.likes || 0);
        setLiked(getLikedSet().has(found.id));

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prompt:", error);
        setLoading(false);
        notFound();
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
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(
    `Check out this AI prompt: ${prompt.title}`
  );
  const shareUrl = encodeURIComponent(pageUrl);

  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-green-500 hover:bg-green-600",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Twitter/X",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: `https://www.instagram.com/`,
      bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: `mailto:?subject=${shareText}&body=${shareText}%20${shareUrl}`,
      bg: "bg-gray-600 hover:bg-gray-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

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
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold capitalize shrink-0 ml-4">
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

              {/* Like & Share */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                <button
                  onClick={handleLike}
                  disabled={liked || liking}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    liked
                      ? "bg-red-100 text-red-500 cursor-default"
                      : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>
                    {likes} {likes === 1 ? "Like" : "Likes"}
                  </span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShareOpen((v) => !v)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>

                  {shareOpen && (
                    <div className="absolute left-0 top-12 z-20 bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex flex-col gap-2 min-w-[180px]">
                      {shareLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShareOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity ${s.bg}`}
                        >
                          {s.icon}
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
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
