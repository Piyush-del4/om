'use client';

import React, { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  ArrowLeft, ShoppingCart, ShoppingBag, Sparkles, ShieldCheck, 
  HelpCircle, Check, Heart, Phone, MessageSquare, Truck, Clock, 
  Award, Star, ChevronRight, Lock, CheckCircle2 
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { FormattedText } from '@/components/ui/FormattedText';
import { ProductBundleCard } from '@/components/shop/ProductBundleCard';
import toast from 'react-hot-toast';
import { SEOInternalMesh } from '@/components/seo/SEOInternalMesh';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function ShopItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product detail item
  const { data: item, isLoading, error } = useQuery({
    queryKey: ['shop-item', id],
    queryFn: async () => {
      const res = await client.get(`/shop/${id}`);
      return res.data?.data;
    },
  });

  // Fetch all shop items for Related Products
  const { data: allItems = [] } = useQuery({
    queryKey: ['shop-items-all'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  const relatedItems = useMemo(() => {
    if (!allItems) return [];
    return allItems.filter((i: any) => i._id !== id && !i.isDeleted).slice(0, 3);
  }, [allItems, id]);

  // Cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return client.post('/shop/cart/items', { itemId: id, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to Cart!`);
    },
    onError: (err: any) => {
      if (err.response?.status === 401) {
        toast.error('Please log in to add items to cart.');
      } else {
        toast.error(err.response?.data?.error?.message || 'Failed to add to cart');
      }
    },
  });

  // Wishlist mutation
  const toggleWishlistMutation = useMutation({
    mutationFn: async (shopItemId: string) => {
      const res = await client.post('/shop/wishlist/toggle', { shopItemId });
      return res.data;
    },
    onSuccess: (data) => {
      setIsWishlisted(prev => !prev);
      toast.success(data.message || 'Wishlist updated');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600 px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-[#A78652] mb-4 animate-bounce opacity-50" />
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm max-w-md font-light mb-6 text-gray-500">
          The requested item does not exist in our store or may have been archived.
        </p>
        <Link href="/shop">
          <GoldButton variant="outlined" className="py-2.5 px-6 text-xs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </GoldButton>
        </Link>
      </div>
    );
  }

  const now = new Date();
  const hasActiveOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
    (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));
  const priceVal = hasActiveOffer ? item.offerPrice : item.price;
  const originalPriceVal = item.price;
  const savingsVal = hasActiveOffer ? originalPriceVal - priceVal : 0;
  const isOutOfStock = item.inStock === false || item.stockCount === 0;

  // Determine current display image & all images gallery array
  const displayImage = activeImage || item.imageUrl;
  const allImages = [item.imageUrl, ...(item.images || [])].filter(Boolean);

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] text-gray-900 pb-20">
      
      {/* ── 1. BREADCRUMB NAVIGATION ──────────────────────────────────────── */}
      <div className="border-b border-[#E7E0D4] bg-[#F3EEE6]/60 backdrop-blur-sm sticky top-0 z-30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 hover:text-[#6F2935] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78652]" />
            Back to Shop Storefront
          </Link>

          <span className="hidden sm:inline-block text-[11px] font-mono text-[#A78652] uppercase tracking-widest font-semibold bg-white border border-[#E7E0D4] px-3 py-1 rounded-full">
            {item.title?.toLowerCase().includes('rudraksha') ? 'Rudraksha Seed' : 'Spiritual Essential'}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8">

        {/* ── 2. PRODUCT HERO (TWO-COLUMN DESKTOP LAYOUT) ───────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-[#E7E0D4] rounded-3xl overflow-hidden shadow-md relative group p-4 flex items-center justify-center bg-[#FAF8F5]">
              <div className="w-full aspect-square relative flex items-center justify-center">
                {displayImage ? (
                  <img 
                    src={displayImage} 
                    alt={item.title} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <ShoppingBag className="w-20 h-20 text-[#A78652]/30" />
                )}
              </div>

              {/* Badges */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <span className="bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded shadow-lg">
                    Out of Stock
                  </span>
                </div>
              )}

              {hasActiveOffer && item.offerExpiresAt && !isOutOfStock && (
                <div className="absolute top-4 right-4 z-10">
                  <CountdownTimer expiresAt={item.offerExpiresAt} />
                </div>
              )}

              {/* Wishlist Button */}
              <button
                title="Add to Wishlist"
                onClick={() => toggleWishlistMutation.mutate(item._id)}
                className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow border border-[#E7E0D4] text-gray-400 hover:text-red-500 transition-colors z-20"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery (if multi-image) */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {allImages.map((imgUrl, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border bg-white transition-all flex-shrink-0 p-1.5 ${
                      displayImage === imgUrl 
                        ? 'border-[#6F2935] shadow-md ring-2 ring-[#6F2935]/20 scale-[1.02]' 
                        : 'border-[#E7E0D4] hover:border-[#A78652]'
                    }`}
                  >
                    <img src={imgUrl} alt={`${item.title} view ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: PRIMARY PURCHASE PANEL */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#A78652]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="space-y-3 border-b border-[#E7E0D4] pb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full font-mono">
                    {item.title?.toLowerCase().includes('rudraksha') ? 'Authentic Rudraksha' : 'Spiritual Essential'}
                  </span>
                  
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                    isOutOfStock 
                      ? 'bg-red-50 text-red-700 border-red-200' 
                      : item.stockCount !== undefined && item.stockCount > 0 && item.stockCount < 5 
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-green-50 text-green-800 border-green-200'
                  }`}>
                    • {isOutOfStock ? 'OUT OF STOCK' : item.stockCount !== undefined && item.stockCount > 0 ? `IN STOCK (${item.stockCount} left)` : 'IN STOCK'}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A] leading-tight">
                  {item.title}
                </h1>

                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  Traditionally selected spiritual essential, crafted for energetic alignment and personal wellbeing.
                </p>
              </div>

              {/* Dynamic Price Box */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Price</span>
                
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-2 font-sans">
                    <span className="text-4xl sm:text-5xl font-black text-[#1D1C1A]">
                      ₹{(priceVal / 100).toLocaleString()}
                    </span>
                    {hasActiveOffer && (
                      <span className="text-gray-400 line-through text-base font-normal">
                        ₹{(originalPriceVal / 100).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {hasActiveOffer && savingsVal > 0 && (
                    <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-green-200">
                      Save ₹{(savingsVal / 100).toLocaleString()}
                    </span>
                  )}
                </div>

                {item.specialOfferTitle && (
                  <p className="text-[11px] text-red-600 font-bold uppercase font-mono tracking-wider pt-1">
                    🔥 {item.specialOfferTitle}
                  </p>
                )}

                <p className="text-[10px] text-gray-500 font-light pt-0.5">
                  Inclusive of all taxes & secure packaging
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between py-2 border-t border-b border-[#FAF7F2]">
                <span className="text-xs font-mono font-semibold text-gray-700 uppercase tracking-wider">Select Quantity:</span>
                
                <div className="flex items-center border border-[#E7E0D4] rounded-xl bg-[#FAF8F5] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="px-3.5 py-1.5 text-gray-700 hover:text-[#6F2935] hover:bg-[#F7F3EA] disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-gray-900 min-w-[36px] text-center">
                    {isOutOfStock ? 0 : quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => {
                      if (item.stockCount !== undefined && q >= item.stockCount) return q;
                      return q + 1;
                    })}
                    disabled={isOutOfStock || (item.stockCount !== undefined && quantity >= item.stockCount)}
                    className="px-3.5 py-1.5 text-gray-700 hover:text-[#6F2935] hover:bg-[#F7F3EA] disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dual Action CTA Buttons */}
              <div className="space-y-3 pt-1">
                <button
                  disabled={isOutOfStock}
                  onClick={() => router.push(`/shop/checkout?itemId=${item._id}&quantity=${quantity}`)}
                  className="w-full py-4 text-sm font-bold bg-[#6F2935] hover:bg-[#8A3443] disabled:opacity-40 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" /> Buy Now
                </button>

                <button
                  disabled={isOutOfStock || addToCartMutation.isPending}
                  onClick={() => addToCartMutation.mutate()}
                  className="w-full py-3.5 text-xs font-bold border border-[#E7E0D4] hover:border-[#A78652] hover:bg-[#F7F3EA] text-gray-900 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <ShoppingCart className="w-4 h-4 text-[#A78652]" />
                  {addToCartMutation.isPending ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              </div>

              {/* Trust Bar */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono pt-2 border-t border-[#FAF7F2]">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#A78652]" /> Razorpay Encrypted</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-[#A78652]" /> Express Dispatch</span>
              </div>

            </div>
          </div>

        </section>

        {/* ── 3. FREQUENTLY BOUGHT TOGETHER BUNDLE ────────────────────────── */}
        <section>
          <ProductBundleCard currentProduct={item} />
        </section>

        {/* ── 4. STRUCTURED DESCRIPTION ─────────────────── */}
        <section className="space-y-4 pt-4 border-t border-[#E7E0D4]">
          <div className="max-w-4xl space-y-4">
            <div className="space-y-1">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                Product Storytelling
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1D1C1A]">
                About This Essential
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D4] shadow-sm text-gray-700 text-sm leading-relaxed font-light space-y-4">
              {item.description ? (
                <FormattedText text={item.description} className="prose prose-stone max-w-none text-gray-700 text-sm leading-relaxed" />
              ) : (
                <p>
                  Traditionally selected spiritual essential crafted to support focus, energetic balance, and personal practice.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── 5. SHIPPING, SUPPORT & POLICIES ─────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D4] flex items-start gap-3 shadow-sm">
            <Truck className="w-5 h-5 text-[#6F2935] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">Delivery & Shipping</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Orders are carefully packed and dispatched via trusted courier partners with tracking updates.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D4] flex items-start gap-3 shadow-sm">
            <Phone className="w-5 h-5 text-[#6F2935] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">Pre-Purchase Help</h4>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Have questions regarding bead selection? Contact our team directly on WhatsApp or Call.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. RELATED PRODUCTS GRID ────────────────────────────────────── */}
        {relatedItems.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-[#E7E0D4]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#1D1C1A]">You May Also Like</h3>
              <Link href="/shop" className="text-xs font-bold text-[#6F2935] hover:underline flex items-center gap-1">
                View All Shop Items <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedItems.map((rel: any) => {
                const relPrice = (rel.offerPrice ?? rel.price) / 100;
                return (
                  <Link key={rel._id} href={`/shop/${rel._id}`} className="group">
                    <GoldCard flush className="border border-[#E7E0D4] hover:border-[#A78652] transition-all bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col justify-between">
                      <div className="p-4 space-y-3">
                        {rel.imageUrl && (
                          <div className="w-full h-36 bg-[#FAF8F5] rounded-xl overflow-hidden p-2 flex items-center justify-center">
                            <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-sm text-[#1D1C1A] group-hover:text-[#6F2935] line-clamp-1">{rel.title}</h4>
                          <p className="text-xs text-gray-500 font-light line-clamp-2">{rel.description}</p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 border-t border-[#FAF7F2] flex items-center justify-between">
                        <span className="text-lg font-extrabold text-[#1D1C1A]">₹{relPrice.toLocaleString()}</span>
                        <span className="text-xs text-[#A78652] font-semibold flex items-center gap-0.5 group-hover:underline">
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </GoldCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* SEO Schemas */}
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/shop' },
          { name: item.title, url: `/shop/${item._id}` }
        ]} />

        <SEOInternalMesh currentCategory="tools" />

      </div>
    </div>
  );
}
