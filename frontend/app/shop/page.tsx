'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  ShoppingBag, Search, ShoppingCart, Package, Heart, Filter, 
  ChevronDown, CheckCircle2, ShieldCheck, Truck, Phone, Sparkles, 
  X, ArrowRight, Star, Clock, Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ShopItemSkeleton } from '@/components/ui/Skeleton';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { FormattedText } from '@/components/ui/FormattedText';

function ShopItemImage({ 
  imageUrl, 
  images = [], 
  title, 
  isOutOfStock,
  hasActiveOffer,
  offerExpiresAt,
  specialOfferTitle
}: { 
  imageUrl: string; 
  images?: string[]; 
  title: string; 
  isOutOfStock: boolean;
  hasActiveOffer: boolean;
  offerExpiresAt?: string;
  specialOfferTitle?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const allImages = [imageUrl, ...images].filter(Boolean);

  const handleMouseEnter = () => {
    if (allImages.length <= 1) return;
    setCurrentIdx(0);
    const id = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % allImages.length);
    }, 1200);
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCurrentIdx(-1);
  };

  const displayImage = currentIdx === -1 ? imageUrl : allImages[currentIdx];

  return (
    <div 
      className="w-full aspect-square bg-[#FAF8F5] rounded-xl overflow-hidden relative border border-[#E7E0D4] flex items-center justify-center p-3 group-hover:border-[#A78652]/40 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayImage ? (
        <img 
          src={displayImage} 
          alt={title} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
        />
      ) : (
        <ShoppingBag className="w-12 h-12 text-[#A78652]/30" />
      )}
      
      {isOutOfStock && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10">
          <span className="bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
            Out of Stock
          </span>
        </div>
      )}
      
      {hasActiveOffer && offerExpiresAt && !isOutOfStock && (
        <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
          <CountdownTimer expiresAt={offerExpiresAt} />
        </div>
      )}
      
      {hasActiveOffer && specialOfferTitle && !isOutOfStock && (
        <div className="absolute top-2 left-2 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
          {specialOfferTitle}
        </div>
      )}

      {allImages.length > 1 && currentIdx !== -1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {allImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${currentIdx === idx ? 'bg-[#6F2935] w-2.5' : 'bg-gray-400/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Search, Filter & Sorting States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Record<string, boolean>>({});

  // Fetch shop items
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  // Fetch cart data for item count badge
  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await client.get('/shop/cart');
      return res.data?.data || null;
    },
    enabled: isAuthenticated,
  });

  const cartCount = useMemo(() => {
    if (!cartData || !cartData.items) return 0;
    return cartData.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  }, [cartData]);

  // Cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.post('/shop/cart/items', { itemId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item added to cart!');
    },
    onError: (err: any) => {
      if (err.response?.status === 401) {
        toast.error('Please log in to add items to cart.');
      } else {
        toast.error(err.response?.data?.error?.message || 'Failed to add to cart');
      }
    },
  });

  // Fetch user wishlist items on mount if authenticated
  useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await client.get('/shop/wishlist');
      const list = res.data?.data || [];
      const map: Record<string, boolean> = {};
      list.forEach((w: any) => {
        const id = w.shopItemId?._id || w.shopItemId;
        if (id) map[id] = true;
      });
      setWishlistItems(map);
      return list;
    },
    enabled: isAuthenticated,
  });

  // Wishlist mutation
  const toggleWishlistMutation = useMutation({
    mutationFn: async (shopItemId: string) => {
      if (!isAuthenticated) {
        throw new Error('UNAUTH');
      }
      const res = await client.post('/shop/wishlist/toggle', { shopItemId });
      return res.data;
    },
    onSuccess: (data, shopItemId) => {
      const isAdded = data?.isWishlisted ?? !wishlistItems[shopItemId];
      setWishlistItems(prev => ({ ...prev, [shopItemId]: isAdded }));
      toast.success(data?.message || (isAdded ? 'Saved to wishlist ❤️' : 'Removed from wishlist'));
    },
    onError: (err: any) => {
      if (err.message === 'UNAUTH' || err.response?.status === 401) {
        toast.error('Please log in to save items to your wishlist.');
        router.push('/login');
      } else {
        toast.error(err.response?.data?.error?.message || err.message || 'Could not update wishlist');
      }
    },
  });

  // Dynamic Categories derived from items
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item: any) => {
      if (item.title?.toLowerCase().includes('rudraksha')) set.add('Rudraksha');
      else if (item.title?.toLowerCase().includes('mala')) set.add('Sacred Malas');
      else set.add('Spiritual Essentials');
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filtered & Sorted items
  const filteredAndSortedItems = useMemo(() => {
    if (!items) return [];
    const now = new Date();

    let result = items.filter((item: any) => {
      if (item.isDeleted) return false;

      // Search match
      const matchesSearch = !search || 
        item.title?.toLowerCase().includes(search.toLowerCase()) || 
        item.description?.toLowerCase().includes(search.toLowerCase());

      // Category match
      let matchesCat = true;
      if (selectedCategory === 'Rudraksha') matchesCat = item.title?.toLowerCase().includes('rudraksha');
      else if (selectedCategory === 'Sacred Malas') matchesCat = item.title?.toLowerCase().includes('mala');
      else if (selectedCategory === 'Spiritual Essentials') matchesCat = !item.title?.toLowerCase().includes('rudraksha') && !item.title?.toLowerCase().includes('mala');

      // Stock filter
      const isOutOfStock = item.inStock === false || item.stockCount === 0;
      if (onlyInStock && isOutOfStock) return false;

      // Offer filter
      const hasOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
        (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));
      if (onlyOffers && !hasOffer) return false;

      return matchesSearch && matchesCat;
    });

    // Sorting
    return result.sort((a: any, b: any) => {
      const aPrice = (a.offerPrice ?? a.price);
      const bPrice = (b.offerPrice ?? b.price);

      if (sortBy === 'price-asc') return aPrice - bPrice;
      if (sortBy === 'price-desc') return bPrice - aPrice;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // default featured
    });
  }, [items, search, selectedCategory, sortBy, onlyInStock, onlyOffers]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('featured');
    setOnlyInStock(false);
    setOnlyOffers(false);
  };

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] overflow-x-hidden text-gray-900 pb-20">
      
      {/* ── 1. SHOP HERO HEADER ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#F3EEE6] via-[#FAF8F5] to-[#FAF8F5] pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6F2935]" /> Spiritual Essentials & Sacred Tools
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1C1A]">
                OM Astrology <span className="gold-gradient-text">Shop</span>
              </h1>
            </div>

            {/* Quick Header Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isAuthenticated && (
                <Link href="/orders">
                  <GoldButton variant="outlined" className="py-2 px-4 text-xs font-semibold flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#A78652]" />
                    <span>My Orders</span>
                  </GoldButton>
                </Link>
              )}

              <Link href="/shop/cart" className="relative">
                <GoldButton variant="burgundy" className="py-2 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <ShoppingCart className="w-4 h-4" />
                  <span>My Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-1 bg-[#A78652] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </GoldButton>
              </Link>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm max-w-2xl font-light leading-relaxed">
            Authentic Rudraksha beads, sacred malas, and energy tools traditionally selected for your spiritual journey and energetic alignment.
          </p>

        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 relative z-10">

        {/* ── 2. DISCOVERY & FILTER TOOLBAR ────────────────────────────────── */}
        <section className="bg-white border border-[#E7E0D4] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          
          {/* Top Row: Search & Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A78652]" />
              <input
                type="text"
                placeholder="Search Rudraksha, Malas, Spiritual Items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E7E0D4] focus:border-[#A78652] text-gray-900 text-xs py-2.5 pl-10 pr-9 rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-[#A78652] placeholder-gray-500"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Controls: In Stock toggle & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Quick Checkbox Filters */}
              <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none bg-[#FAF8F5] px-3 py-2 rounded-xl border border-[#E7E0D4] hover:border-[#A78652]">
                <input 
                  type="checkbox" 
                  checked={onlyInStock} 
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#6F2935] focus:ring-[#A78652] accent-[#6F2935]"
                />
                <span className="font-medium">In Stock Only</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none bg-[#FAF8F5] px-3 py-2 rounded-xl border border-[#E7E0D4] hover:border-[#A78652]">
                <input 
                  type="checkbox" 
                  checked={onlyOffers} 
                  onChange={(e) => setOnlyOffers(e.target.checked)}
                  className="rounded text-[#6F2935] focus:ring-[#A78652] accent-[#6F2935]"
                />
                <span className="font-medium">Offers Only</span>
              </label>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E7E0D4] text-gray-800 text-xs py-2.5 px-3 pr-8 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-[#A78652] appearance-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            </div>

          </div>

          {/* Bottom Row: Category Pills & Result Counter */}
          <div className="flex items-center justify-between gap-4 border-t border-[#FAF7F2] pt-3 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#6F2935] text-white font-bold shadow-sm'
                      : 'bg-[#FAF8F5] text-gray-700 border border-[#E7E0D4] hover:bg-[#F7F3EA] hover:border-[#A78652]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-mono">
              {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'product' : 'products'}
            </div>
          </div>

        </section>

        {/* ── 3. PRODUCT GRID ─────────────────────────────────────────────── */}
        {isLoading ? (
          <ShopItemSkeleton count={6} />
        ) : filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map((item: any) => {
              const now = new Date();
              const hasActiveOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
                (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));
              const priceVal = hasActiveOffer ? item.offerPrice : item.price;
              const originalPriceVal = item.price;
              const isOutOfStock = item.inStock === false || item.stockCount === 0;

              return (
                <div
                  key={item._id}
                  className="bg-white border border-[#E7E0D4] hover:border-[#A78652] rounded-2xl p-4 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-xl group relative cursor-pointer"
                  onClick={() => router.push(`/shop/${item._id}`)}
                >
                  <div className="space-y-3 flex-1 flex flex-col">
                    
                    {/* Image Container with Wishlist Button */}
                    <div className="relative">
                      <ShopItemImage 
                        imageUrl={item.imageUrl} 
                        images={item.images} 
                        title={item.title} 
                        isOutOfStock={isOutOfStock}
                        hasActiveOffer={hasActiveOffer}
                        offerExpiresAt={item.offerExpiresAt}
                        specialOfferTitle={item.specialOfferTitle}
                      />

                      <button
                        title="Add to Wishlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlistMutation.mutate(item._id);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow border border-[#E7E0D4] text-gray-400 hover:text-red-500 transition-colors z-20"
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlistItems[item._id] ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-2 flex-1 flex flex-col justify-between pt-1">
                      <div className="space-y-1.5">
                        
                        {/* Category Tag & Stock Status */}
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#6F2935] font-bold uppercase tracking-wider bg-[#6F2935]/10 px-2 py-0.5 rounded">
                            {item.title?.toLowerCase().includes('rudraksha') ? 'Rudraksha' : 'Sacred Essential'}
                          </span>

                          {!isOutOfStock && item.stockCount !== undefined && item.stockCount > 0 && item.stockCount < 5 && (
                            <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                              Only {item.stockCount} left
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors line-clamp-1 leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <FormattedText 
                          text={item.description || 'Authentic spiritual tool selected for energetic alignment.'} 
                          className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-light" 
                        />
                      </div>
                    </div>

                  </div>

                  {/* Price & Action Buttons Footer */}
                  <div className="pt-3 border-t border-[#FAF7F2] space-y-3">
                    
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-gray-400 text-[9px] font-mono uppercase block">Price</span>
                        <div className="flex items-baseline gap-1.5 font-sans">
                          <span className="text-[#1D1C1A] font-black text-2xl">
                            ₹{(priceVal / 100).toLocaleString()}
                          </span>
                          {hasActiveOffer && (
                            <span className="text-gray-400 line-through text-xs font-normal">
                              ₹{(originalPriceVal / 100).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold text-[#A78652] group-hover:underline flex items-center gap-0.5">
                        Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        disabled={isOutOfStock || addToCartMutation.isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCartMutation.mutate(item._id);
                        }}
                        className="py-2 px-2 border border-[#E7E0D4] hover:border-[#A78652] hover:bg-[#F7F3EA] text-gray-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 disabled:opacity-40"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-[#A78652]" /> Add
                      </button>

                      <button
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/shop/checkout?itemId=${item._id}&quantity=1`);
                        }}
                        className="py-2 px-2 bg-[#6F2935] hover:bg-[#8A3443] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center disabled:opacity-40"
                      >
                        Buy Now
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E0D4] p-8 space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#A78652] mx-auto opacity-50" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-gray-900">No products found</h3>
              <p className="text-gray-500 text-xs font-light max-w-sm mx-auto">
                No items match your search query or selected filters.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="py-2 px-5 text-xs font-bold bg-[#6F2935] text-white rounded-xl shadow transition-all hover:bg-[#8A3443]"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ── 4. TRUST & AUTHENTICITY SECTION ────────────────────────────── */}
        <section className="bg-white border border-[#E7E0D4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Shop With Confidence
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1D1C1A]">
              Our Assurance & Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#6F2935] mx-auto" />
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">100% Authentic</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Traditionally sourced, verified natural Rudraksha and spiritual essentials.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] text-center space-y-2">
              <Truck className="w-6 h-6 text-[#6F2935] mx-auto" />
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">Express Delivery</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Securely packaged and dispatched across India with tracking updates.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#6F2935] mx-auto" />
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">Razorpay Secured</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                100% encrypted online payments via UPI, Cards, Net Banking & Wallets.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] text-center space-y-2">
              <Phone className="w-6 h-6 text-[#6F2935] mx-auto" />
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">Pre-Purchase Help</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Contact our team on WhatsApp or phone for guidance on bead selection.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
