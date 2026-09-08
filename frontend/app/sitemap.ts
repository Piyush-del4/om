import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omastrologyamc.com';

  // 1. Homepage — highest priority
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // 2. Free Interactive Tools & Calculators — highest SEO priority
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

  // 3. Core Service & Feature Pages — high priority
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

  // 6. Planetary Transit Pages
  const transitPlanets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
  const transitRoutes: MetadataRoute.Sitemap = transitPlanets.map((planet) => ({
    url: `${baseUrl}/transit/${planet}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 7. Appointment & Team Pages
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

  // 8. E-commerce Shop
  const shopRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // 9. Secondary Information & Course Batches
  const secondaryRoutes: MetadataRoute.Sitemap = [
    '/about-us',
    '/batches',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 10. Legal / Utility
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
    ...transitRoutes,
    ...appointmentRoutes,
    ...shopRoutes,
    ...secondaryRoutes,
    ...utilityRoutes,
  ];
}
