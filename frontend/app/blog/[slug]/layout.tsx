import { Metadata } from 'next';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiaraastroamb.com';

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: 'Blog Post Not Found | OM Astrology AMC' };
  }

  const ogImage = blog.heroImageUrl || blog.ogImage || `${SITE_URL}/images/og-default.jpg`;

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.tags?.join(', '),
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'OM Astrology AMC',
      images: [{ url: ogImage, alt: blog.heroImageAlt || blog.title }],
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: ['OM Astrology AMC'],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [ogImage],
    },
  };
}

export default function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      {/* JSON-LD Article Schema — injected inline for SSR SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            publisher: {
              '@type': 'Organization',
              name: 'OM Astrology AMC',
              url: SITE_URL,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
            },
          }),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
