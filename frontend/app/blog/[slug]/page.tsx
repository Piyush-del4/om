import { notFound } from 'next/navigation';
import Link from 'next/link';
import { KeyTakeawaysBox } from '../../../components/ui/blog/KeyTakeawaysBox';
import { TableOfContents } from '../../../components/ui/blog/TableOfContents';
import { BlogFAQAccordion } from '../../../components/ui/blog/BlogFAQAccordion';
import { BlogCard } from '../../../components/ui/blog/BlogCard';
import { ArrowLeft, Clock, Calendar, Tag, Phone, MessageSquare, BookOpen, ShoppingBag, GraduationCap, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch { return null; }
}

async function getRelated(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blogs/related/${slug}`, { next: { revalidate: 3600 } });
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

// Internal links to inject at footer of every article
const FOOTER_SERVICE_LINKS = [
  { label: 'Book a Personal Consultation', href: '/appointments', icon: '🔮', desc: 'Get personalized guidance from expert astrologers' },
  { label: 'Browse Our Shop', href: '/shop', icon: '🛍️', desc: 'Rudraksha, crystals & spiritual products' },
  { label: 'Join a Batch / Course', href: '/batches', icon: '🎓', desc: 'Learn FEAN Method Astrology & Numerology' },
  { label: 'Daily Horoscope', href: '/horoscope', icon: '⭐', desc: 'Check your daily, weekly & monthly predictions' },
  { label: 'Free Numerology Tool', href: '/free-tools/numerology-calculator', icon: '🔢', desc: 'Calculate your life path & destiny numbers free' },
  { label: 'Download Free Ebook', href: '/fean-ebook', icon: '📖', desc: 'Free FEAN Method Astrology ebook' },
  { label: 'Premium Kundli Report', href: '/premium-personalized-kundli', icon: '📜', desc: '20+ section Janam Kundli with remedies' },
  { label: 'Marriage Matching', href: '/marriage-matching', icon: '💍', desc: 'Vedic Guna Milan compatibility analysis' },
  { label: 'Career Guidance', href: '/profession-career', icon: '💼', desc: 'Astrology-based career & profession advice' },
  { label: 'Name Correction', href: '/name-correction', icon: '✍️', desc: 'Lucky name spelling using numerology' },
  { label: 'Lucky Mobile Number', href: '/lucky-mobile', icon: '📱', desc: 'Find your numerologically lucky phone number' },
  { label: 'Corporate Numerology', href: '/corporate-numerology', icon: '🏢', desc: 'Business name & launch date analysis' },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, related] = await Promise.all([getBlog(slug), getRelated(slug)]);
  if (!blog) notFound();

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 radial-mesh-bg sacred-geometry-bg">
      <div className="max-w-7xl mx-auto px-4 py-10 pt-24">

        {/* ── Breadcrumb ── */}
        <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-700 transition-colors">Blog</Link>
          <span>/</span>
          <Link href={`/blog?category=${blog.category}`} className="hover:text-amber-700 transition-colors">{blog.category}</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-[200px]">{blog.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Article Body ── */}
          <article className="flex-1 min-w-0">

            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold hover:underline mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>

            {/* Category + Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {blog.category}
              </span>
              {blog.tags?.slice(0, 4).map((tag: string) => (
                <span key={tag} className="text-[9px] font-mono uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                  <Tag className="w-2.5 h-2.5 inline mr-0.5" />{tag}
                </span>
              ))}
            </div>

            {/* H1 Title — front-loads primary keyword */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Meta line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 mb-6 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formattedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readingTime} min read</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />OM Astrology AMC</span>
            </div>

            {/* Hero Image */}
            {blog.heroImageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={blog.heroImageUrl}
                  alt={blog.heroImageAlt || blog.title}
                  title={blog.title}
                  loading="eager"
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
            )}
            {!blog.heroImageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-950 to-amber-900 p-10 flex items-center justify-center min-h-[200px]">
                <p className="text-amber-200 font-serif text-xl font-bold text-center max-w-lg">{blog.title}</p>
              </div>
            )}

            {/* Key Takeaways */}
            <KeyTakeawaysBox points={blog.keyTakeaways} />

            {/* Table of Contents */}
            <TableOfContents entries={blog.tableOfContents} />

            {/* Intro paragraph (excerpt used as intro — contains primary keyword front-loaded) */}
            <p className="text-gray-700 text-base leading-relaxed font-light mb-8 p-4 bg-amber-50/40 border-l-4 border-amber-400 rounded-r-xl">
              {blog.excerpt}
            </p>

            {/* ── Article Sections ── */}
            {blog.sections?.map((section: any, i: number) => (
              <section key={i} id={blog.tableOfContents?.[i]?.anchor || `section-${i}`} className="mb-10 scroll-mt-24">
                {/* H2 */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight border-b border-gray-100 pb-2">
                  {section.heading}
                </h2>

                {/* Optional H3 */}
                {section.subheading && (
                  <h3 className="font-serif text-lg font-semibold text-amber-800 mb-3">{section.subheading}</h3>
                )}

                {/* Section Image */}
                {section.imageUrl && (
                  <div className="my-5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={section.imageUrl}
                      alt={section.imageAlt || section.heading}
                      title={section.imageTitle || section.heading}
                      loading="lazy"
                      className="w-full h-auto max-h-[380px] object-cover"
                    />
                    {section.imageAlt && (
                      <p className="text-center text-[10px] text-gray-500 font-mono italic py-1.5 bg-gray-50">
                        {section.imageAlt}
                      </p>
                    )}
                  </div>
                )}

                {/* Short paragraphs (2-3 sentences max per paragraph) */}
                <div className="space-y-4">
                  {section.body?.map((para: string, j: number) => (
                    <p key={j} className="text-gray-700 text-[15px] leading-relaxed">{para}</p>
                  ))}
                </div>

                {/* Internal CTA link inside section */}
                {section.internalLinkUrl && section.internalLinkText && (
                  <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
                    <p className="text-xs text-gray-700 font-medium">Related:</p>
                    <Link
                      href={section.internalLinkUrl}
                      className="inline-flex items-center gap-1.5 text-amber-700 text-sm font-bold hover:underline shrink-0"
                    >
                      {section.internalLinkText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </section>
            ))}

            {/* ── FAQ Accordion ── */}
            <BlogFAQAccordion faqs={blog.faq} />

            {/* ── CTA Block ── */}
            <div className="my-12 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-8 text-center border border-amber-600 shadow-lg">
              <p className="text-amber-300 text-xs font-mono uppercase tracking-widest mb-2">Get Personal Guidance</p>
              <h3 className="font-serif text-white text-2xl font-bold mb-2">Ready to Transform Your Life?</h3>
              <p className="text-amber-100/80 text-sm mb-6 max-w-md mx-auto">
                Book a personalized consultation with our expert astrologers and discover your unique birth chart blueprint.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/appointments" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]">
                  🔮 Book Consultation
                </Link>
                <Link href="/shop" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all border border-white/20">
                  <ShoppingBag className="w-4 h-4" /> Visit Shop
                </Link>
                <Link href="/batches" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all border border-white/20">
                  <GraduationCap className="w-4 h-4" /> Join Batches
                </Link>
                <a href="tel:+919922352666" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-bold px-6 py-3 rounded-xl text-sm transition-all">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* ── All Service Links Footer Grid ── */}
            <div className="my-10 p-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl border border-amber-600 shadow-md">
              <h3 className="font-serif font-bold text-white text-lg mb-5 text-center">Explore More at OM Astrology AMC</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FOOTER_SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex flex-col gap-1 p-3 bg-white/10 rounded-xl border border-white/10 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02]"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 leading-tight transition-colors">{link.label}</span>
                    <span className="text-[10px] text-amber-100/70 leading-snug line-clamp-2">{link.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Tags Footer ── */}
            {blog.tags?.length > 0 && (
              <div className="my-6 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500 font-mono mr-1">Tags:</span>
                {blog.tags.map((tag: string) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="text-[10px] font-mono uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-800 px-2.5 py-1 rounded-full border border-gray-200 hover:border-amber-300 transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* ── Related Posts ── */}
            {related.length > 0 && (
              <section className="mt-12 border-t border-gray-200 pt-10">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((b: any) => (
                    <BlogCard key={b.slug} {...b} />
                  ))}
                </div>
              </section>
            )}

          </article>

          {/* ── Sticky Sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* Sidebar Premium CTA Card */}
              <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-5 text-center border border-amber-600 shadow-md">
                <p className="text-amber-300 text-[10px] font-mono uppercase tracking-widest mb-1">Get Personal Guidance</p>
                <h3 className="font-serif text-white text-lg font-bold mb-2">Ready to Transform Your Life?</h3>
                <p className="text-amber-100/80 text-xs mb-4 leading-relaxed">
                  Book a consultation and discover your birth chart blueprint.
                </p>
                <div className="space-y-2">
                  <Link href="/appointments" className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl text-xs transition-all hover:scale-[1.02]">
                    🔮 Book Consultation
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/shop" className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl text-[11px] border border-white/20 transition-all">
                      <ShoppingBag className="w-3.5 h-3.5" /> Visit Shop
                    </Link>
                    <Link href="/batches" className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl text-[11px] border border-white/20 transition-all">
                      <GraduationCap className="w-3.5 h-3.5" /> Join Batches
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a href="tel:+919922352666" className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl text-[11px] border border-white/20 transition-all">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-black font-bold py-2 rounded-xl text-[11px] transition-all">
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm space-y-2">
                <h3 className="font-serif font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">Quick Actions</h3>
                <Link href="/appointments" className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] bg-white border border-[var(--gold)] text-gray-900 hover:bg-amber-50/20 shadow-sm">
                  <span>🔮 Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                </Link>
                <Link href="/shop" className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] bg-white border border-[var(--gold)] text-gray-900 hover:bg-amber-50/20 shadow-sm">
                  <span className="flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5 text-[var(--gold)]" /> Shop Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                </Link>
                <Link href="/batches" className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] bg-white border border-[var(--gold)] text-gray-900 hover:bg-amber-50/20 shadow-sm">
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-[var(--gold)]" /> Join Batches</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                </Link>
                <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] bg-white border border-[var(--gold)] text-gray-900 hover:bg-amber-50/20 shadow-sm">
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-[var(--gold)]" /> Chat on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                </a>
              </div>

              {/* Planet Transits mini */}
              <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-4 border border-amber-600 shadow-md text-white">
                <h3 className="font-serif font-bold text-amber-300 text-xs uppercase tracking-wider mb-3">2026 Transits</h3>
                <div className="grid grid-cols-3 gap-1">
                  {['sun','moon','mars','mercury','jupiter','venus','saturn','rahu','ketu'].map((p) => (
                    <Link key={p} href={`/transit/${p}`} className="flex flex-col items-center gap-0.5 p-1 rounded-lg hover:bg-white/10 transition-colors">
                      <img src={`/images/planets/${p}.png?v=5`} alt={`${p} transit 2026`} className="w-15 h-15 object-contain rounded-2xl" />
                      <span className="text-xs font-bold capitalize text-amber-200">{p}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Numerology 2026 mini */}
              <div className="bg-white border border-[var(--gold)] rounded-2xl p-4 shadow-sm">
                <h3 className="font-serif font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">Numerology 2026</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1,2,3,4,5,6,7,8,9].map((num) => (
                    <Link key={num} href={`/numerology-2026/${num}`} className="flex items-center justify-center h-9 rounded-lg bg-white border border-[var(--gold)] hover:bg-amber-50/20 hover:border-amber-500 transition-all">
                      <span className="text-amber-800 font-serif font-bold">{num}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Free Tools */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
                <h3 className="font-serif font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">Free Tools</h3>
                {[
                  { label: 'Numerology Calculator', href: '/free-tools/numerology-calculator', icon: '🔢' },
                  { label: 'Daily Horoscope', href: '/horoscope', icon: '⭐' },
                  { label: 'FEAN Ebook (Free)', href: '/fean-ebook', icon: '📖' },
                  { label: 'Lucky Mobile Number', href: '/lucky-mobile', icon: '📱' },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="flex items-center gap-2 text-xs text-gray-700 hover:text-amber-700 font-medium py-1 hover:underline">
                    <span>{tool.icon}</span>{tool.label}
                  </Link>
                ))}
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
