'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BlogCard } from '../../components/ui/blog/BlogCard';
import { Search, BookOpen, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Phone, MessageSquare, ShoppingBag, GraduationCap } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

const CATEGORIES = ['All', 'Astrology', 'Numerology', 'Vedic', 'FEAN Method', 'Tarot', 'Graphology', 'Remedies'];

// Internal links panel — appointments, shop, batches + others
const QUICK_LINKS = [
  { label: 'Book Consultation', href: '/appointments', color: 'bg-amber-500 text-black' },
  { label: 'Shop', href: '/shop', color: 'bg-purple-600 text-white' },
  { label: 'Batches & Courses', href: '/batches', color: 'bg-blue-600 text-white' },
  { label: 'Daily Horoscope', href: '/horoscope', color: 'bg-rose-500 text-white' },
  { label: 'Free Numerology Tool', href: '/free-tools/numerology-calculator', color: 'bg-green-600 text-white' },
  { label: 'Free FEAN Ebook', href: '/fean-ebook', color: 'bg-amber-700 text-white' },
  { label: 'Kundli Report', href: '/premium-personalized-kundli', color: 'bg-gray-800 text-white' },
  { label: 'Marriage Matching', href: '/marriage-matching', color: 'bg-pink-600 text-white' },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '9' });
      if (category !== 'All') params.set('category', category);
      if (search) params.set('search', search);
      const res = await fetch(`${API_BASE}/blogs?${params}`);
      const json = await res.json();
      setBlogs(json.data || []);
      setTotalPages(json.pagination?.totalPages || 1);
      setTotal(json.pagination?.total || 0);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, category, search]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
    setSearch('');
    setSearchInput('');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 radial-mesh-bg">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 py-20 px-4 text-center">
        <span className="text-amber-300 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> OM Astrology AMC — Knowledge Hub
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
          Astrology, Numerology &amp; <span className="text-amber-300">FEAN Method</span> Blog
        </h1>
        <p className="text-amber-100/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Expert articles on Vedic Astrology, Numerology, Planetary Transits, and the FEAN Method to guide your life decisions.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="search"
              placeholder="Search articles... e.g. Saturn transit 2026"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white/10 backdrop-blur border border-amber-500/40 text-white placeholder-amber-200/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15"
            />
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors">
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">




            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No articles found. New posts are published Mon, Wed &amp; Fri.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.slug} {...blog} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                      p === page
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'border border-gray-300 text-gray-600 hover:border-amber-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>

          {/* ── Sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
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

            {/* Quick Links */}
            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">Our Services</h3>
              <div className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] bg-white border border-[var(--gold)] text-gray-900 hover:bg-amber-50/20 shadow-sm"
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Planet Transits */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-4 text-white border border-amber-600 shadow-md">
              <h3 className="font-serif font-bold text-amber-300 text-sm mb-3 uppercase tracking-wider">2026 Planet Transits</h3>
              <div className="grid grid-cols-3 gap-1">
                {['sun','moon','mars','mercury','jupiter','venus','saturn','rahu','ketu'].map((p) => (
                  <Link key={p} href={`/transit/${p}`} className="flex flex-col items-center gap-0.5 p-1 rounded-xl hover:bg-white/10 transition-colors text-center">
                    <img src={`/images/planets/${p}.png?v=5`} alt={`${p} transit 2026`} className="w-16 h-16 object-contain rounded-2xl" />
                    <span className="text-xs font-bold capitalize text-amber-200">{p}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Numerology 2026 */}
            <div className="bg-white border border-[var(--gold)] rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider">Numerology 2026</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map((num) => (
                  <Link key={num} href={`/numerology-2026/${num}`} className="flex items-center justify-center w-full h-10 rounded-xl bg-white border border-[var(--gold)] hover:bg-amber-50/20 hover:border-amber-500 transition-all hover:scale-105">
                    <span className="text-amber-800 font-serif font-bold text-base">{num}</span>
                  </Link>
                ))}
              </div>
              <Link href="/numerology" className="mt-3 flex items-center justify-center gap-1 text-xs text-purple-700 font-bold hover:underline">
                Learn Numerology <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-5 text-center border border-amber-600">
              <p className="text-amber-200 text-xs font-mono uppercase tracking-widest mb-2">Personal Guidance</p>
              <h3 className="font-serif font-bold text-white text-base mb-3">Talk to an Expert Astrologer</h3>
              <Link href="/appointments" className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs py-2.5 rounded-xl transition-colors">
                Book Consultation →
              </Link>
              <Link href="/shop" className="block w-full mt-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-colors border border-white/20">
                Visit Shop →
              </Link>
              <Link href="/batches" className="block w-full mt-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-colors border border-white/20">
                Join Batches →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
