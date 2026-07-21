import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omastrologyamc.com';

  // Homepage — highest priority
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Free Interactive Tools — high priority
  const freeToolsRoutes: MetadataRoute.Sitemap = [
    '/free-tools',
    '/free-tools/kundli-generator',
    '/free-tools/birth-chart-generator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95,
  }));

  // Core service pages — high priority, change weekly
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Appointment & team pages — high priority
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

  // Shop — updates frequently with new products
  const shopRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Secondary pages — moderate priority
  const secondaryRoutes: MetadataRoute.Sitemap = [
    '/about-us',
    '/batches',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Legal/utility pages — lower priority
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
    ...appointmentRoutes,
    ...shopRoutes,
    ...secondaryRoutes,
    ...utilityRoutes,
  ];
}
