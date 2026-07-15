import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omastrologyamc.com'; // Adjust this for your production domain
  
  // Core marketing pages
  const staticRoutes = [
    '',
    '/about-us',
    '/astrology',
    '/numerology',
    '/corporate-numerology',
    '/graphology',
    '/tarot-card',
    '/marriage-matching',
    '/profession-career',
    '/lucky-mobile',
    '/appointments',
    '/shop',
    '/batches',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
  ];
}
