const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

// Master list of all public and private routes in OM Astrology AMC
const ALL_ROUTES = [
  // Core & Service Hubs
  '/',
  '/astrology',
  '/numerology',
  '/tarot-card',
  '/graphology',
  '/horoscope',
  '/blog',
  '/appointments',
  '/appointments/team-raajesh',
  '/appointments/team-kusum',
  '/about-us',
  '/marriage-matching',
  '/name-correction',
  '/corporate-numerology',
  '/profession-career',
  '/premium-personalized-kundli',
  '/lucky-mobile',
  '/fean-ebook',
  '/occult-synthesis',
  '/batches',
  '/privacy-policy',
  '/shop',

  // Free Tools
  '/free-tools',
  '/free-tools/kundli-generator',
  '/free-tools/birth-chart-generator',
  '/free-tools/daily-horoscope',
  '/free-tools/dasha-calculator',
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
  '/free-tools/ascendant-calculator',

  // Horoscopes (48 routes)
  ...['daily', 'weekly', 'monthly', 'yearly'].flatMap(period => 
    ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map(rashi => `/horoscope/${period}/${rashi}`)
  ),

  // Numerology 2026 (9 routes)
  ...Array.from({ length: 9 }, (_, i) => `/numerology-2026/${i + 1}`),

  // Life Path (12 routes)
  ...['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'].map(num => `/numerology/life-path/${num}`),

  // Transits (9 routes)
  ...['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'].map(planet => `/transit/${planet}`),

  // Houses (12 routes)
  ...Array.from({ length: 12 }, (_, i) => `/astrology/houses/${i + 1}`),

  // Doshas (5 routes)
  ...['manglik-dosha', 'kaal-sarp-dosha', 'sade-sati', 'pitra-dosha', 'rahu-ketu-dosha'].map(dosha => `/astrology/doshas/${dosha}`),

  // Graphology (5 routes)
  ...['signature-analysis', 'handwriting-slant', 'graphotherapy', 'letter-formations', 'pressure-and-zones'].map(t => `/graphology/${t}`),

  // Tarot (5 routes)
  ...['major-arcana', 'three-card-spread', 'love-tarot', 'career-tarot', 'tarot-suits'].map(t => `/tarot-card/${t}`),

  // Occult Synthesis (16 routes)
  ...[
    'astrology-numerology-synthesis', 'astrology-graphology-synthesis', 'numerology-graphology-synthesis',
    'astrology-tarot-synthesis', 'numerology-tarot-synthesis', 'graphology-tarot-synthesis',
    'vedic-fean-synthesis', 'fean-occult-synthesis-master', 'astrology-numerology-compatibility',
    'signature-science-and-astrology-remedies', 'tarot-and-zodiac-astrology-cards',
    'name-numerology-and-signature-correction', 'planetary-elements-and-handwriting-pressure',
    'tarot-and-life-path-numerology', 'kundli-doshas-and-tarot-remedies', 'corporate-numerology-and-brand-graphology'
  ].map(t => `/occult-synthesis/${t}`),

  // Private / Auth / Disallowed routes
  '/login',
  '/register',
  '/forgot-password',
  '/onboarding',
  '/dashboard',
  '/profile',
  '/orders',
  '/my-batches',
  '/saved-kundlis',
  '/shop/cart',
  '/shop/checkout',
  '/admin/dashboard',

  // Problematic / Test / Parameter URLs from GSC
  '/shop?q=%7Bsearch_term_string%7D'
];

function fetchUrl(routePath) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${routePath}`;
    http.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ routePath, statusCode: res.statusCode, headers: res.headers, html: data });
      });
    }).on('error', (err) => {
      resolve({ routePath, statusCode: 500, error: err.message, html: '' });
    });
  });
}

function extractMeta(html) {
  if (!html) return {};

  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1] : '';

  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  const h1s = h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim());

  // Extract all hrefs
  const linkMatches = html.match(/href=["']([^"']+)["']/gi) || [];
  const hrefs = linkMatches.map(l => l.replace(/href=["']/i, '').replace(/["']$/, ''));

  // Extract JSON-LD types
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  const schemas = [];
  jsonLdMatches.forEach(m => {
    try {
      const content = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      const parsed = JSON.parse(content);
      if (parsed['@type']) schemas.push(parsed['@type']);
    } catch(e) {}
  });

  // Calculate approximate text word count
  const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly ? textOnly.split(' ').length : 0;

  return { title, canonical, robots, description, h1s, hrefs, schemas, wordCount };
}

async function runAudit() {
  console.log(`Starting SEO Audit of ${ALL_ROUTES.length} routes...`);
  const results = [];
  const hrefMap = {}; // route -> set of incoming routes

  for (const route of ALL_ROUTES) {
    const res = await fetchUrl(route);
    const meta = extractMeta(res.html);

    // Track internal incoming links
    (meta.hrefs || []).forEach(link => {
      if (link.startsWith('/') || link.includes('omastrologyamc.com')) {
        const cleanPath = link.replace(/^https?:\/\/[^\/]+/, '').split('?')[0] || '/';
        if (!hrefMap[cleanPath]) hrefMap[cleanPath] = new Set();
        hrefMap[cleanPath].add(route);
      }
    });

    results.push({
      route,
      statusCode: res.statusCode,
      ...meta
    });
  }

  // Calculate incoming links and orphan status
  const auditReport = results.map(item => {
    const incomingCount = hrefMap[item.route] ? hrefMap[item.route].size : 0;
    const isPrivate = item.route.includes('/login') || item.route.includes('/dashboard') || item.route.includes('/admin') || item.route.includes('/orders') || item.route.includes('/profile') || item.route.includes('/cart') || item.route.includes('/checkout');
    
    let classification = 'INDEX';
    if (item.statusCode >= 400) classification = '404/410';
    else if (item.statusCode >= 300) classification = '301 REDIRECT';
    else if (isPrivate || (item.robots && item.robots.includes('noindex'))) classification = 'NOINDEX';
    else if (item.canonical && !item.canonical.includes(item.route)) classification = 'CANONICALIZED';

    return {
      route: item.route,
      statusCode: item.statusCode,
      title: item.title,
      description: item.description,
      canonical: item.canonical,
      robots: item.robots || 'index, follow (default)',
      h1Count: item.h1s ? item.h1s.length : 0,
      h1Text: item.h1s ? item.h1s.join(' | ') : '',
      wordCount: item.wordCount,
      incomingLinks: incomingCount,
      schemas: item.schemas ? item.schemas.join(', ') : 'None',
      isOrphan: incomingCount === 0 && !isPrivate && item.route !== '/',
      classification
    };
  });

  fs.writeFileSync(path.join(__dirname, 'seo_audit_report.json'), JSON.stringify(auditReport, null, 2));
  console.log('SEO Audit Complete! Saved to scripts/seo_audit_report.json');
}

runAudit();
