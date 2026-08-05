/**
 * JSON-LD Structured Data for SEO
 * Renders Organization, LocalBusiness, Person, Service, and BreadcrumbList schemas
 * for Google Rich Results, Knowledge Panel, and Local Pack visibility.
 */

export function OrganizationSchema() {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'Organization',
 name: 'OM Astrology AMC',
 alternateName: 'OM Astrology',
 url: 'https://omastrologyamc.com',
 logo: 'https://omastrologyamc.com/images/logo.png',
 description:
 "India's trusted astrology consultancy offering Vedic Astrology, Numerology, Tarot Card readings, Graphology & handwriting analysis with 25+ years experienced master consultants.",
 foundingDate: '2000',
 contactPoint: [
 {
 '@type': 'ContactPoint',
 telephone: '+91-9922352666',
 contactType: 'customer service',
 areaServed: ['IN', 'US', 'GB', 'AE', 'CA', 'AU'],
 availableLanguage: ['English', 'Hindi'],
 },
 ],
 sameAs: [
 // Add your social media URLs here
 // 'https://www.facebook.com/omastrologyamc',
 // 'https://www.instagram.com/omastrologyamc',
 // 'https://www.youtube.com/@omastrologyamc',
 ],
 knowsAbout: [
 'Vedic Astrology',
 'Numerology',
 'Tarot Card Reading',
 'Graphology',
 'Handwriting Analysis',
 'Graphotherapy',
 'Career Guidance',
 'Marriage Matching',
 'Name Correction',
 'Kundali Analysis',
 'Birth Chart Reading',
 'Horoscope Reading',
 'Corporate Numerology',
 'Brand Numerology',
 'Lucky Mobile Number',
 'Rudraksha Consultation',
 'Spiritual Healing',
 'Vastu Consultation',
 ],
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function LocalBusinessSchema() {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'ProfessionalService',
 name: 'OM Astrology AMC',
 image: 'https://omastrologyamc.com/images/logo.png',
 url: 'https://omastrologyamc.com',
 telephone: '+91-9922352666',
 description:
 'Expert Vedic Astrology, Numerology, Tarot Card reading, and Graphology consultation services. Online and in-person sessions available.',
 priceRange: '₹₹',
 openingHoursSpecification: [
 {
 '@type': 'OpeningHoursSpecification',
 dayOfWeek: [
 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
 ],
 opens: '10:00',
 closes: '18:00',
 },
 ],
 hasOfferCatalog: {
 '@type': 'OfferCatalog',
 name: 'Consultation Services',
 itemListElement: [
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Vedic Astrology Consultation' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Numerology Analysis & Name Correction' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Tarot Card Reading' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Graphology & Handwriting Analysis' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Career & Profession Guidance' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Marriage Matching & Kundali Milan' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Corporate & Brand Numerology' },
 },
 {
 '@type': 'Offer',
 itemOffered: { '@type': 'Service', name: 'Lucky Mobile Number Selection' },
 },
 ],
 },
 aggregateRating: {
 '@type': 'AggregateRating',
 ratingValue: '4.9',
 reviewCount: '500',
 bestRating: '5',
 },
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function PersonSchema({
 name,
 role,
 description,
 image,
 experienceYears,
 specializations,
 url,
}: {
 name: string;
 role: string;
 description: string;
 image: string;
 experienceYears: number;
 specializations: string[];
 url: string;
}) {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'Person',
 name,
 jobTitle: role,
 description,
 image: `https://omastrologyamc.com${image}`,
 url: `https://omastrologyamc.com${url}`,
 worksFor: {
 '@type': 'Organization',
 name: 'OM Astrology AMC',
 },
 knowsAbout: specializations,
 hasCredential: {
 '@type': 'EducationalOccupationalCredential',
 credentialCategory: 'Professional Experience',
 description: `${experienceYears}+ years of professional experience`,
 },
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function ServiceSchema({
 name,
 description,
 url,
 category,
}: {
 name: string;
 description: string;
 url: string;
 category: string;
}) {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'Service',
 name,
 description,
 url: `https://omastrologyamc.com${url}`,
 provider: {
 '@type': 'Organization',
 name: 'OM Astrology AMC',
 url: 'https://omastrologyamc.com',
 },
 serviceType: category,
 areaServed: {
 '@type': 'Country',
 name: 'India',
 },
 hasOfferCatalog: {
 '@type': 'OfferCatalog',
 name: `${name} Packages`,
 },
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
 if (!faqs || faqs.length === 0) return null;

 const schema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: faqs.map((faq) => ({
 '@type': 'Question',
 name: faq.question,
 acceptedAnswer: {
 '@type': 'Answer',
 text: faq.answer,
 },
 })),
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: items.map((item, index) => ({
 '@type': 'ListItem',
 position: index + 1,
 name: item.name,
 item: `https://omastrologyamc.com${item.url}`,
 })),
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}

export function WebSiteSchema() {
 const schema = {
 '@context': 'https://schema.org',
 '@type': 'WebSite',
 name: 'OM Astrology AMC',
 url: 'https://omastrologyamc.com',
 description:
 "India's trusted astrology consultancy offering Vedic Astrology, Numerology, Tarot Card readings, and Graphology consultations.",
 potentialAction: {
 '@type': 'SearchAction',
 target: {
 '@type': 'EntryPoint',
 urlTemplate: 'https://omastrologyamc.com/shop?q={search_term_string}',
 },
 'query-input': 'required name=search_term_string',
 },
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}
