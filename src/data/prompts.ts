export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: 'chatgpt' | 'gemini' | 'other';
  tags: string[];
  author?: string;
  createdAt: string;
}

export const prompts: Prompt[] = [
  {
    id: "prompt-1",
    title: "Watercolor Indian Couple Portrait",
    description: "A dreamy, watercolor-style portrait of a young Indian couple in traditional attire, featuring soft florals and soft lighting.",
    content: "Watercolor-style portrait of a young Indian couple sitting gracefully in a white outfit with a pink dupatta, loose braid, small bindi, jhumka earrings. Calm expression, looking slightly upward, soft glowing skin. Pink floral splashes and green leaves on a clean white background, paint splatter effect, soft lighting, dreamy, high detail, no text. \n\nNegative Prompt: blurry, low quality, distorted face, extra fingers, harsh shadows, overexposed, text watermark.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428248/ChatGPT_Image_May_8_2026_01_33_09_PM_cgoguu.png",
    category: "chatgpt",
    tags: ["indian couple", "watercolor", "portrait", "indian fashion", "dreamy", "soft lighting", "floral"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
}
,
{
    id: "prompt-2",
    title: "Watercolor Indian Couple Portrait",
    description: "A dreamy, watercolor-style portrait of a young Indian couple in traditional attire, featuring soft florals and soft lighting.",
    content: "Watercolor-style portrait of a young Indian couple sitting gracefully in a white outfit with a pink dupatta, loose braid, small bindi, jhumka earrings. Calm expression, looking slightly upward, soft glowing skin. Pink floral splashes and green leaves on a clean white background, paint splatter effect, soft lighting, dreamy, high detail, no text. \n\nNegative Prompt: blurry, low quality, distorted face, extra fingers, harsh shadows, overexposed, text watermark.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428164/ChatGPT_Image_May_8_2026_01_26_54_PM_lwud6d.png",
    category: "chatgpt",
    tags: ["indian couple", "watercolor", "portrait", "indian fashion", "dreamy", "soft lighting", "floral"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
  {
    id: "prompt-3",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428214/ChatGPT_Image_May_6_2026_09_17_00_PM_lgunod.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
}
,
  {
    id: "prompt-4",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428190/ChatGPT_Image_May_6_2026_09_36_56_PM_qfmhlx.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
  {
    id: "prompt-5",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428185/ChatGPT_Image_May_6_2026_09_28_40_PM_fhe6ez.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-6",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428173/ChatGPT_Image_May_6_2026_09_37_20_PM_loujm9.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-7",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428157/ChatGPT_Image_May_6_2026_09_28_50_PM_ojeutd.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-8",
    title: "Aesthetic Collage Portrait: Chibi & Pastel Blend",
    description: "A vibrant, layered collage portrait of a girl in various poses, blending photorealism with cute anime chibi doodles and soft neon aesthetics.",
    content: "Create a vibrant aesthetic collage portrait using the reference image. Preserve the girl’s exact facial features, skin tone, hairstyle, expression, and outfit. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the girl (sleeping, laughing, smiling, shy, walking) with small stars, sparkles, hearts, arrows, and clouds. Include handwritten text: “just being me”, “in my own world”, “soft chaos, soft glow”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428127/ChatGPT_Image_May_6_2026_09_31_29_PM_ekxblt.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-9",
    title: "Aesthetic Chibi Collage Portrait",
    description: "A layered, vibrant collage portrait featuring multiple poses of a couple, blended with chibi doodles, pastel colors, and neon accents.",
    content: "Create a vibrant aesthetic collage portrait of a couple using the reference image. Preserve their exact facial features, skin tone, hairstyles, expressions, and outfits. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the couple (sleeping, laughing, smiling, shy, walking) with stars, sparkles, hearts, arrows, and tiny clouds. Include handwritten text: “just being us” and “in our own world”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428259/ChatGPT_Image_May_6_2026_09_03_28_PM_bjioxp.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait", "couple"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-10",
    title: "Aesthetic Chibi Collage Portrait",
    description: "A layered, vibrant collage portrait featuring multiple poses of a couple, blended with chibi doodles, pastel colors, and neon accents.",
    content: "Create a vibrant aesthetic collage portrait of a couple using the reference image. Preserve their exact facial features, skin tone, hairstyles, expressions, and outfits. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the couple (sleeping, laughing, smiling, shy, walking) with stars, sparkles, hearts, arrows, and tiny clouds. Include handwritten text: “just being us” and “in our own world”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428240/ChatGPT_Image_May_6_2026_09_03_17_PM_wtrnqj.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait", "couple"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-11",
    title: "Aesthetic Chibi Collage Portrait",
    description: "A layered, vibrant collage portrait featuring multiple poses of a couple, blended with chibi doodles, pastel colors, and neon accents.",
    content: "Create a vibrant aesthetic collage portrait of a couple using the reference image. Preserve their exact facial features, skin tone, hairstyles, expressions, and outfits. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the couple (sleeping, laughing, smiling, shy, walking) with stars, sparkles, hearts, arrows, and tiny clouds. Include handwritten text: “just being us” and “in our own world”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428235/ChatGPT_Image_May_6_2026_09_03_23_PM_nwtph7.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait", "couple"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
{
    id: "prompt-12",
    title: "Aesthetic Chibi Collage Portrait",
    description: "A layered, vibrant collage portrait featuring multiple poses of a couple, blended with chibi doodles, pastel colors, and neon accents.",
    content: "Create a vibrant aesthetic collage portrait of a couple using the reference image. Preserve their exact facial features, skin tone, hairstyles, expressions, and outfits. Include multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Arrange in a layered collage with soft overlaps and a subtle neon glow around the main subject. Add minimal chibi doodles of the couple (sleeping, laughing, smiling, shy, walking) with stars, sparkles, hearts, arrows, and tiny clouds. Include handwritten text: “just being us” and “in our own world”. Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
    imageUrl: "https://res.cloudinary.com/duze3mdjt/image/upload/q_auto/f_auto/v1778428228/ChatGPT_Image_May_6_2026_09_04_20_PM_k6j0h2.png",
    category: "chatgpt",
    tags: ["collage", "chibi", "pastel", "anime style", "aesthetic", "layered", "pastel colors", "neon glow", "portrait", "couple"],
    author: "Avalin Rasigan 💜",
    createdAt: "2026-05-10"
},
// {
//     id: "prompt-5",
//     title: "Romantic Aesthetic Poster with Chibi Elements",
//     description: "A warm, soft, and aesthetic digital illustration poster featuring a couple, blended with soft cartoon elements, custom typography, and a pastel, cozy aesthetic.",
//     content: "Transform the uploaded photo into a warm, aesthetic digital illustration poster. Keep their original pose, expressions, hairstyle, and outfits unchanged. Apply a soft, smooth cartoon/illustration style with clean outlines and subtle shading. Use a warm beige / pastel brown background with a minimal, cozy vibe. Add cute hand-drawn elements like small hearts, sparkles, and doodles around them. Place stylish typography on the left/top side with a mix of cursive and bold fonts. The text should read: \"she's my\", \"'Mudhal Nee Mudivum Nee\", \"Moondru kaalam nee..\". Make \"Mudhal Nee Mudivum Nee\" bigger in a handwritten cursive style, and keep the rest in a simple elegant font. Maintain a romantic, best-friend comfort vibe. Ensure the composition is balanced with enough empty space for the text. High quality, Instagram poster style. 9:16 ratio.",
//     imageUrl: "[INSERT REFERENCE IMAGE HERE]",
//     category: "chatgpt",
//     tags: ["poster", "aesthetic", "anime hybrid", "pastel", "romantic", "chibi", "typography", "warm tones", "9:16"],
//     author: "Avalin Rasigan 💜",
//     createdAt: "2026-05-10"
// },
// {
//     id: "prompt-6",
//     title: "3D Chibi Aesthetic Transformation",
//     description: "Transform a reference photo into a layered, vibrant, 3D chibi collage featuring multiple poses, handwritten text, and a soft pastel aesthetic.",
//     content: "Use the provided reference image. Preserve their exact facial features, skin tone, hairstyles, expressions, and outfits. Create a layered collage featuring multiple natural poses: central confident portrait, laughing candid, side profile, walking shot, and relaxed sitting pose. Add minimal chibi doodles of the couple (sleeping, laughing, smiling, shy, walking) with stars, sparkles, hearts, arrows, and tiny clouds. Include handwritten text overlays: \"just being us\" and \"in our own world\". Use soft diffused lighting and a pastel palette of pink, lavender, blue, and cream with gentle neon accents. Style: Instagram aesthetic, anime + realistic hybrid, dreamy, playful, cozy confidence. 9:16 vertical.",
//     imageUrl: "[INSERT REFERENCE IMAGE HERE]",
//     category: "chatgpt",
//     tags: ["chibi", "3D art", "korean aesthetic", "doodle", "pastel", "poster", "aesthetic", "layered", "neon", "portrait"],
//     author: "Avalin Rasigan 💜",
//     createdAt: "2026-05-10"
// }



//   {
//     id: "prompt-2",
//     title: "3D Chibi Aesthetic Transformation",
//     description: "Transform a reference photo into a cute, high-detail, Korean-style 3D chibi aesthetic, overlaid with aesthetic doodles and soft pastel colors.",
//     content: "Use a real face as a reference photo. The background is the same as in the photo. The lighting is warm, soft, and clean, with subtle shadows. Around the image, add several mini chibi (3D cute style) versions of the character, while maintaining the original facial features.Chibi characters have various poses and expressions: jumping cheerfully waving sitting relaxed holding a drink cute and playful expressions Add hand-drawn white doodle elements: outline around the main body stars, hearts, sparkles motion lines small cute icons Add aesthetic handwriting such as: 'shine,' 'bright day,' 'happy,' 'smile,' etc. (casual doodle font) Overall style: clean & aesthetic composition white sticker outline soft pastel color tone high detail 3D chibi glossy look cute Korean",
//     imageUrl: "[INSERT REFERENCE IMAGE HERE]",
//     category: "chatgpt",
//     tags: ["chibi", "3D art", "korean aesthetic", "doodle", "pastel", "glossy", "sticker outline"],
//     author: "Avalin Rasigan 💜",
//     createdAt: "2024-05-23"
// }
// ,
];

export const categories = ['chatgpt', 'gemini', 'other'] as const;
export const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));
