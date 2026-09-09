import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omastrologyamc.com';

  // 1. Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // 2. Free Interactive Tools & Calculators
  const freeToolsRoutes: MetadataRoute.Sitemap = [
    '/free-tools',
    '/premium-personalized-kundli',
    '/free-tools/ascendant-calculator',
    '/free-tools/birth-chart-generator',
    '/free-tools/daily-horoscope',
    '/free-tools/dasha-calculator',
    '/free-tools/kundli-generator',
    '/free-tools/lucky-color-calculator',
    '/free-tools/lucky-number-calculator',
    '/free-tools/marriage-compatibility-checker',
    '/free-tools/moon-sign-calculator',
    '/free-tools/muhurat-calculator',
    '/free-tools/nakshatra-finder',
    '/free-tools/name-numerology-calculator',
    '/free-tools/numerology-calculator',
    '/free-tools/panchang',
    '/free-tools/zodiac-sign-finder',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95,
  }));

  // 3. Core Service & Feature Pages
  const serviceRoutes: MetadataRoute.Sitemap = [
    '/astrology',
    '/numerology',
    '/tarot-card',
    '/graphology',
    '/name-correction',
    '/marriage-matching',
    '/profession-career',
    '/lucky-mobile',
    '/corporate-numerology',
    '/numerology-2026',
    '/fean-ebook',
    '/horoscope',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4. Zodiac Horoscope Pages (Daily, Weekly, Monthly, Yearly for 12 Signs)
  const horoscopePeriods = ['daily', 'weekly', 'monthly', 'yearly'];
  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];
  const horoscopeRoutes: MetadataRoute.Sitemap = horoscopePeriods.flatMap((period) =>
    zodiacSigns.map((rashi) => ({
      url: `${baseUrl}/horoscope/${period}/${rashi}`,
      lastModified: new Date(),
      changeFrequency: period === 'daily' ? ('daily' as const) : ('weekly' as const),
      priority: period === 'daily' ? 0.9 : 0.8,
    }))
  );

  // 5. Numerology 2026 Sub-pages (Numbers 1-9)
  const numerology2026Routes: MetadataRoute.Sitemap = Array.from({ length: 9 }, (_, i) => i + 1).map((num) => ({
    url: `${baseUrl}/numerology-2026/${num}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 6. Life Path Numerology Sub-pages (1-9, 11, 22, 33)
  const lifePathNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];
  const lifePathRoutes: MetadataRoute.Sitemap = lifePathNumbers.map((num) => ({
    url: `${baseUrl}/numerology/life-path/${num}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 7. Planetary Transit Pages
  const transitPlanets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
  const transitRoutes: MetadataRoute.Sitemap = transitPlanets.map((planet) => ({
    url: `${baseUrl}/transit/${planet}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 8. Graphology Sub-pages
  const graphologyTopics = ['signature-analysis', 'handwriting-slant', 'graphotherapy', 'letter-formations', 'pressure-and-zones'];
  const graphologyRoutes: MetadataRoute.Sitemap = graphologyTopics.map((topic) => ({
    url: `${baseUrl}/graphology/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 9. Tarot Card Sub-pages
  const tarotTopics = ['major-arcana', 'three-card-spread', 'love-tarot', 'career-tarot', 'tarot-suits'];
  const tarotRoutes: MetadataRoute.Sitemap = tarotTopics.map((topic) => ({
    url: `${baseUrl}/tarot-card/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 10. Astrology Houses Sub-pages (1-12)
  const houseRoutes: MetadataRoute.Sitemap = Array.from({ length: 12 }, (_, i) => i + 1).map((h) => ({
    url: `${baseUrl}/astrology/houses/${h}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 11. Astrology Doshas & Remedies Sub-pages
  const doshaTopics = ['manglik-dosha', 'kaal-sarp-dosha', 'sade-sati', 'pitra-dosha', 'rahu-ketu-dosha'];
  const doshaRoutes: MetadataRoute.Sitemap = doshaTopics.map((dosha) => ({
    url: `${baseUrl}/astrology/doshas/${dosha}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 11b. Occult Synthesis Intersecting Guides
  const synthesisTopics = [
    'astrology-numerology-synthesis',
    'astrology-graphology-synthesis',
    'numerology-graphology-synthesis',
    'astrology-tarot-synthesis',
    'numerology-tarot-synthesis',
    'graphology-tarot-synthesis',
    'vedic-fean-synthesis',
    'fean-occult-synthesis-master',
    'astrology-numerology-compatibility',
    'signature-science-and-astrology-remedies',
    'tarot-and-zodiac-astrology-cards',
    'name-numerology-and-signature-correction',
    'planetary-elements-and-handwriting-pressure',
    'tarot-and-life-path-numerology',
    'kundli-doshas-and-tarot-remedies',
    'corporate-numerology-and-brand-graphology'
  ];
  const synthesisRoutes: MetadataRoute.Sitemap = [
    '/occult-synthesis',
    ...synthesisTopics.map((t) => `/occult-synthesis/${t}`)
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  // 12. Appointment & Team Pages
  const appointmentRoutes: MetadataRoute.Sitemap = [
    '/appointments',
    '/appointments/team-raajesh',
    '/appointments/team-kusum',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 13. E-commerce Shop
  const shopRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // 14. Secondary Information & Course Batches
  const secondaryRoutes: MetadataRoute.Sitemap = [
    '/about-us',
    '/batches',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 15. Legal / Utility
  const utilityRoutes: MetadataRoute.Sitemap = [
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [
    ...homepage,
    ...freeToolsRoutes,
    ...serviceRoutes,
    ...horoscopeRoutes,
    ...numerology2026Routes,
    ...lifePathRoutes,
    ...transitRoutes,
    ...graphologyRoutes,
    ...tarotRoutes,
    ...houseRoutes,
    ...doshaRoutes,
    ...synthesisRoutes,
    ...appointmentRoutes,
    ...shopRoutes,
    ...secondaryRoutes,
    ...utilityRoutes,
  ];
}
