import { GoogleGenAI } from '@google/genai';
import Blog from '../models/Blog';
import { logger } from '../utils/logger';
import { uploadToCloudinary } from './cloudinary.service';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// ── Internal Links Pool ────────────────────────────────────────────────────
// These are injected by AI into blog sections strategically
const INTERNAL_LINKS = [
  { text: 'Book a Personal Astrology Consultation', url: '/appointments' },
  { text: 'View All Consultation Packages', url: '/appointments' },
  { text: 'Shop for Spiritual Products', url: '/shop' },
  { text: 'Browse Rudraksha & Spiritual Gems', url: '/shop' },
  { text: 'Join Our Astrology Batches & Courses', url: '/batches' },
  { text: 'Enroll in FEAN Method Astrology Course', url: '/batches' },
  { text: 'Check Your Free Daily Horoscope', url: '/horoscope' },
  { text: 'Read Aries Horoscope', url: '/horoscope/daily/aries' },
  { text: 'Explore Vedic Astrology', url: '/astrology' },
  { text: 'Learn Numerology', url: '/numerology' },
  { text: 'Free Numerology Calculator', url: '/free-tools/numerology-calculator' },
  { text: 'Numerology 2026 Predictions', url: '/numerology-2026/1' },
  { text: 'Saturn Transit 2026', url: '/transit/saturn' },
  { text: 'Jupiter Transit 2026', url: '/transit/jupiter' },
  { text: 'Rahu Transit 2026', url: '/transit/rahu' },
  { text: 'Ketu Transit 2026', url: '/transit/ketu' },
  { text: 'Sun Transit 2026', url: '/transit/sun' },
  { text: 'Download Free FEAN Method Ebook', url: '/fean-ebook' },
  { text: 'Graphology & Signature Analysis', url: '/graphology' },
  { text: 'Tarot Card Reading', url: '/tarot-card' },
  { text: 'Marriage Matching & Compatibility', url: '/marriage-matching' },
  { text: 'Career & Profession Guidance', url: '/profession-career' },
  { text: 'Corporate Numerology for Business', url: '/corporate-numerology' },
  { text: 'Lucky Mobile Number Analysis', url: '/lucky-mobile' },
  { text: 'Premium Personalized Kundli', url: '/premium-personalized-kundli' },
  { text: 'Name Correction Numerology', url: '/name-correction' },
];

// ── SEO Blog Topic Rotation ─────────────────────────────────────────────────
const BLOG_TOPICS = [
  { topic: 'Saturn Transit 2026 Effects on All 12 Zodiac Signs', keyword: 'Saturn transit 2026', category: 'Astrology', tags: ['Saturn', 'Transit', '2026', 'Zodiac', 'Vedic Astrology'] },
  { topic: 'Jupiter Transit 2026 Complete Guide — Career, Wealth & Marriage', keyword: 'Jupiter transit 2026', category: 'Astrology', tags: ['Jupiter', 'Transit', '2026', 'Career', 'Marriage'] },
  { topic: 'Life Path Number Meaning — Complete Numerology Guide', keyword: 'life path number meaning', category: 'Numerology', tags: ['Life Path Number', 'Numerology', 'Birth Date', 'Destiny'] },
  { topic: 'Name Correction Numerology — Does Changing Spelling Really Work?', keyword: 'name correction numerology', category: 'Numerology', tags: ['Name Correction', 'Numerology', 'Lucky Name', 'Chaldean'] },
  { topic: 'What Is FEAN Method Astrology? — Complete Explanation', keyword: 'FEAN Method Astrology', category: 'FEAN Method', tags: ['FEAN Method', 'Five Elements', 'Astrology', 'Numerology'] },
  { topic: 'Rahu Ketu Transit 2025–26 — Which Zodiac Signs Are Most Affected?', keyword: 'Rahu Ketu transit 2025 2026', category: 'Astrology', tags: ['Rahu', 'Ketu', 'Transit', '2026', 'Shadow Planets'] },
  { topic: 'Sade Sati 2026 — Which Zodiac Signs Face Saturn\'s 7.5 Year Cycle?', keyword: 'Sade Sati 2026', category: 'Vedic', tags: ['Sade Sati', 'Saturn', '2026', 'Saturn Return', 'Vedic Astrology'] },
  { topic: 'Kundli Matching for Marriage — What Guna Milan Really Means', keyword: 'kundli matching for marriage', category: 'Vedic', tags: ['Kundli Matching', 'Marriage', 'Guna Milan', 'Compatibility'] },
  { topic: '5 Powerful Vedic Remedies for Career Problems & Job Obstacles', keyword: 'Vedic remedies for career problems', category: 'Remedies', tags: ['Vedic Remedies', 'Career', 'Saturn Remedies', 'Job', 'Mantras'] },
  { topic: 'Lucky Mobile Number by Birth Date — Complete Numerology Guide 2026', keyword: 'lucky mobile number by birth date', category: 'Numerology', tags: ['Lucky Mobile Number', 'Numerology', 'Birth Date', 'Life Path'] },
  { topic: 'Chaldean vs Pythagorean Numerology — Which System Is More Accurate?', keyword: 'Chaldean vs Pythagorean numerology', category: 'Numerology', tags: ['Chaldean Numerology', 'Pythagorean', 'Name Number', 'Life Path'] },
  { topic: 'How to Read Your Janam Kundli — A Beginner\'s Complete Guide', keyword: 'how to read Janam Kundli', category: 'Vedic', tags: ['Janam Kundli', 'Birth Chart', 'Vedic Astrology', 'Lagna', 'Houses'] },
  { topic: 'Graphology — What Your Handwriting Reveals About Your Personality', keyword: 'graphology handwriting personality', category: 'Graphology', tags: ['Graphology', 'Handwriting Analysis', 'Signature', 'Personality'] },
  { topic: 'Master Number 11, 22 and 33 — What They Mean in Numerology', keyword: 'master numbers numerology', category: 'Numerology', tags: ['Master Numbers', '11', '22', '33', 'Numerology'] },
  { topic: 'Best Muhurat Dates for Marriage in 2026 — Auspicious Dates Guide', keyword: 'best muhurat for marriage 2026', category: 'Vedic', tags: ['Muhurat', 'Marriage', '2026', 'Auspicious Dates', 'Shubh Vivah'] },
  { topic: 'Tarot Card Reading for Beginners — How It Works and What to Expect', keyword: 'tarot card reading for beginners', category: 'Tarot', tags: ['Tarot', 'Tarot Reading', 'Major Arcana', 'Beginner Tarot'] },
  { topic: 'Five Elements in Vedic Astrology — Earth, Water, Fire, Air & Space', keyword: 'five elements Vedic astrology', category: 'FEAN Method', tags: ['Five Elements', 'Pancha Tattva', 'Vedic Astrology', 'FEAN'] },
  { topic: 'Venus Transit 2026 — Love, Relationships & Marriage Predictions', keyword: 'Venus transit 2026', category: 'Astrology', tags: ['Venus', 'Transit', '2026', 'Love', 'Relationships', 'Marriage'] },
  { topic: 'Corporate Numerology — How Your Business Name Affects Success', keyword: 'corporate numerology business name', category: 'Numerology', tags: ['Corporate Numerology', 'Business Name', 'Lucky Number', 'Company'] },
  { topic: 'Mercury Transit 2026 — Communication, Business & Education Effects', keyword: 'Mercury transit 2026', category: 'Astrology', tags: ['Mercury', 'Transit', '2026', 'Business', 'Communication'] },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

function computeReadingTime(sections: any[]): number {
  const totalWords = sections.reduce((acc, s) => {
    const bodyText = (s.body || []).join(' ');
    return acc + bodyText.split(/\s+/).length;
  }, 0);
  return Math.max(3, Math.ceil(totalWords / 200));
}

async function generateBlogContent(ai: any, topicData: typeof BLOG_TOPICS[0], retries = 2): Promise<any> {
  const { topic, keyword, category, tags } = topicData;

  // Pick 6 relevant internal links from pool to inject
  const relevantLinks = INTERNAL_LINKS
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const prompt = `You are an expert SEO content writer and Vedic Astrology specialist for OM Astrology AMC — a professional astrology consultation website.

Write a comprehensive, SEO-optimized blog post in JSON format. Follow ALL rules below strictly.

## Topic: "${topic}"
## Primary Keyword: "${keyword}"
## Category: ${category}
## Tags: ${tags.join(', ')}

## STRICT SEO RULES:
1. Front-load the primary keyword "${keyword}" in the very first sentence of the intro paragraph
2. Use "${keyword}" naturally in H1 title and at least 2 H2 subheadings
3. Write ONLY short paragraphs — MAXIMUM 3 sentences per paragraph
4. Keep slug SHORT: 3-6 words, use primary keyword, no filler words
5. Include 5-8 specific, high-value FAQ questions that real users would Google
6. Make every section heading clear and descriptive (tells users exactly what they'll learn)
7. Meta description must be exactly 140-165 characters and include the primary keyword

## INTERNAL LINKS TO INCLUDE (inject naturally into section internalLinkText+internalLinkUrl):
${relevantLinks.map((l, i) => `${i + 1}. Text: "${l.text}" → URL: "${l.url}"`).join('\n')}
Distribute these links across different sections (1 link per section maximum).

## REQUIRED JSON STRUCTURE (return ONLY valid JSON, no markdown):
{
  "title": "string — H1 title, front-load primary keyword, max 65 chars",
  "slug": "string — 3-6 word slug with keyword, e.g. saturn-transit-2026-guide",
  "metaTitle": "string — SEO title tag, max 70 chars, include keyword",
  "metaDescription": "string — 140-165 chars, include keyword, compelling CTR text",
  "primaryKeyword": "${keyword}",
  "category": "${category}",
  "tags": ${JSON.stringify(tags)},
  "excerpt": "string — 1-2 sentence summary for listing cards, max 200 chars",
  "keyTakeaways": ["string — 5 bullet points, scannable, specific insights"],
  "tableOfContents": [
    { "anchor": "string — kebab-case id", "label": "string — readable section name" }
  ],
  "heroImageAlt": "string — descriptive alt text for hero image",
  "heroImagePrompt": "string — detailed prompt for Imagen 3 model to generate a beautiful Vedic astrology background or celestial art representing this blog title, style: digital art, high resolution, spiritual, cosmic",
  "sections": [
    {
      "heading": "string — H2 subheading, include keyword variation",
      "subheading": "string or null — optional H3",
      "body": ["string — paragraph 1 (max 3 sentences)", "string — paragraph 2 (max 3 sentences)", "string — paragraph 3 optional"],
      "imageAlt": "string — descriptive alt text for this section's image",
      "imageTitle": "string — image title attribute",
      "imagePrompt": "string — detailed prompt for Imagen 3 model to generate an illustration for this specific section, style: digital art, spiritual, cosmic, matching the theme",
      "internalLinkText": "string — from the links list above",
      "internalLinkUrl": "string — matching URL from list above"
    }
  ],
  "faq": [
    { "question": "string — real user search question", "answer": "string — 2-4 sentences, helpful answer" }
  ]
}

Write 5-7 sections. Make the content genuinely helpful, accurate about Vedic astrology and FEAN Method, and engaging. Include practical advice, specific predictions, and remedy suggestions where relevant.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    const textResponse = response.text || '';
    const cleanedText = textResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (err: any) {
    if (err.status === 429 && retries > 0) {
      logger.warn(`Rate limited generating blog for "${topic}", retrying in 15s...`);
      await delay(15000);
      return generateBlogContent(ai, topicData, retries - 1);
    }
    throw err;
  }
}

function getSEOImage(category: string, titleOrKeyword: string): string {
  const text = titleOrKeyword.toLowerCase();
  
  if (text.includes('saturn') || text.includes('sade sati')) return '/images/planets/saturn.png';
  if (text.includes('jupiter')) return '/images/planets/jupiter.png';
  if (text.includes('rahu')) return '/images/planets/rahu.png';
  if (text.includes('ketu')) return '/images/planets/ketu.png';
  if (text.includes('venus')) return '/images/planets/venus.png';
  if (text.includes('mercury')) return '/images/planets/mercury.png';
  if (text.includes('sun')) return '/images/planets/sun.png';
  if (text.includes('moon')) return '/images/planets/moon.png';
  if (text.includes('mars')) return '/images/planets/mars.png';
  
  if (text.includes('marriage') || text.includes('match') || text.includes('guna milan') || text.includes('couple')) return '/images/marriage_matching_realistic.png';
  if (text.includes('career') || text.includes('job') || text.includes('profession') || text.includes('work')) return '/images/career_blueprint_realistic.png';
  if (text.includes('corporate') || text.includes('business') || text.includes('company') || text.includes('brand')) return '/images/corporate_numerology_realistic.png';
  if (text.includes('mobile') || text.includes('phone') || text.includes('number')) return '/images/mobile_numerology_realistic.png';
  if (text.includes('fean')) return '/images/cosmic_synthesis_realistic.png';
  
  if (category === 'Numerology') return '/images/numerology_vibration_realistic.png';
  if (category === 'Astrology') return '/images/astrology_zodiac_realistic.png';
  if (category === 'Tarot') return '/images/tarot_card_hero.png';
  if (category === 'Graphology') return '/images/graphology_analysis.png';
  
  return '/images/astrology_card_hero.png';
}

export async function generateAndSaveBlog(): Promise<void> {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    logger.error('GEMINI_API_KEY is not set — cannot generate blog');
    return;
  }

  // Pick a topic that hasn't been used recently
  const existingSlugs = await Blog.distinct('slug');
  const usedTopicSlugs = new Set(existingSlugs);

  const availableTopics = BLOG_TOPICS.filter(
    t => !usedTopicSlugs.has(slugify(t.topic))
  );

  // If all topics used, reset and start over
  const topicPool = availableTopics.length > 0 ? availableTopics : BLOG_TOPICS;
  const topicData = topicPool[Math.floor(Math.random() * topicPool.length)];

  logger.info(`📝 Generating blog: "${topicData.topic}"`);

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const generated = await generateBlogContent(ai, topicData);

    // Ensure unique slug
    let slug = generated.slug || slugify(generated.title);
    const existing = await Blog.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const readingTime = computeReadingTime(generated.sections || []);
    const blogCategory = generated.category || topicData.category;
    const blogTitle = generated.title;
    let heroImageUrl = getSEOImage(blogCategory, blogTitle);

    // 1. Call Imagen 3 to generate Hero Image
    if (API_KEY && generated.heroImagePrompt) {
      try {
        logger.info(`🎨 Generating AI Hero Image for: "${blogTitle}"...`);
        const imgResponse = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: generated.heroImagePrompt,
          config: {
            numberOfImages: 1,
            aspectRatio: '16:9',
            outputMimeType: 'image/jpeg',
          },
        });
        const imageBytes = imgResponse.generatedImages?.[0]?.image?.imageBytes;
        if (imageBytes) {
          const buffer = Buffer.from(imageBytes, 'base64');
          const uploadRes = await uploadToCloudinary(buffer, 'blogs', slugify(blogTitle));
          heroImageUrl = uploadRes.secure_url;
          logger.info(`✅ AI Hero Image uploaded to Cloudinary: ${heroImageUrl}`);
        }
      } catch (err: any) {
        logger.warn(`⚠️ Failed to generate AI Hero Image: ${err.message}. Falling back to default.`);
      }
    }

    // 2. Call Imagen 3 to generate Section Images
    const processedSections = [];
    for (const sec of (generated.sections || [])) {
      let secImageUrl = getSEOImage(blogCategory, sec.heading);
      if (API_KEY && sec.imagePrompt) {
        try {
          logger.info(`🎨 Generating AI Section Image for: "${sec.heading}"...`);
          const imgResponse = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: sec.imagePrompt,
            config: {
              numberOfImages: 1,
              aspectRatio: '16:9',
              outputMimeType: 'image/jpeg',
            },
          });
          const imageBytes = imgResponse.generatedImages?.[0]?.image?.imageBytes;
          if (imageBytes) {
            const buffer = Buffer.from(imageBytes, 'base64');
            const uploadRes = await uploadToCloudinary(buffer, 'blogs', slugify(sec.heading));
            secImageUrl = uploadRes.secure_url;
            logger.info(`✅ AI Section Image uploaded to Cloudinary: ${secImageUrl}`);
          }
        } catch (err: any) {
          logger.warn(`⚠️ Failed to generate AI Section Image: ${err.message}. Falling back to default.`);
        }
      }
      processedSections.push({
        ...sec,
        imageUrl: secImageUrl,
      });
    }

    const blog = new Blog({
      title: blogTitle,
      slug,
      metaTitle: generated.metaTitle,
      metaDescription: generated.metaDescription,
      primaryKeyword: generated.primaryKeyword || topicData.keyword,
      category: blogCategory,
      tags: generated.tags || topicData.tags,
      excerpt: generated.excerpt,
      readingTime,
      keyTakeaways: generated.keyTakeaways || [],
      tableOfContents: generated.tableOfContents || [],
      sections: processedSections,
      faq: generated.faq || [],
      heroImageAlt: generated.heroImageAlt || `${topicData.keyword} - OM Astrology AMC`,
      heroImageUrl: heroImageUrl,
      ogImage: heroImageUrl,
      isPublished: true,
      publishedAt: new Date(),
    });

    await blog.save();
    logger.info(`✅ Blog saved: "${slug}" (${readingTime} min read, ${processedSections.length} sections)`);
  } catch (err: any) {
    logger.error(`❌ Failed to generate blog: ${err.message}`);
    throw err;
  }
}
