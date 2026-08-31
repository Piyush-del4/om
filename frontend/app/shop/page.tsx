'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldButton } from '@/components/ui/GoldButton';
import { ShoppingBag, Search, ShoppingCart, Package, Heart } from 'lucide-react';
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
      className="w-full h-full bg-gray-50/60 rounded-xl overflow-hidden relative border border-amber-100/50 flex items-center justify-center bg-gray-100 min-h-[192px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={displayImage} 
        alt={title} 
        className="w-full h-full object-contain p-2 transition-all duration-500 ease-in-out group-hover:scale-105" 
      />
      
      {isOutOfStock && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10">
          <span className="bg-red-600/95 text-gray-900 font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded border border-red-500 shadow-md">
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
        <div className="absolute top-2 left-2 bg-red-600 text-gray-900 font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md border border-red-500/40 shadow-[0_0_10px_rgba(220,38,38,0.4)]">
          {specialOfferTitle}
        </div>
      )}

      {allImages.length > 1 && currentIdx !== -1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {allImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${currentIdx === idx ? 'bg-amber-500 w-2.5' : 'bg-neutral-400/50'}`}
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
  const [search, setSearch] = useState('');

  const { data: items, isLoading } = useQuery({
    queryKey: ['shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.post('/shop/cart/items', { itemId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Item added to cart!');
    },
    onError: (err: any) => {
      if (err.response?.status === 401) {
        alert('Please login to add items to cart.');
      } else {
        alert(err.response?.data?.error?.message || 'Failed to add to cart');
      }
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async (shopItemId: string) => {
      const res = await client.post('/shop/wishlist/toggle', { shopItemId });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Wishlist updated');
    },
  });

  const filtered = items?.filter((item: any) =>
    !item.isDeleted && item.title?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="border-b border-[var(--gold-200)] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
              Alchemical Supplies & Tools
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-7 h-7 text-[var(--gold)]" /> OM Astrology <span className="gold-gradient-text">Shop</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {isAuthenticated && (
              <Link href="/orders">
                <GoldButton variant="outlined" className="flex items-center gap-2 py-2 px-4 whitespace-nowrap">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </GoldButton>
              </Link>
            )}
            <Link href="/shop/cart">
              <GoldButton variant="outlined" className="flex items-center gap-2 py-2 px-4 whitespace-nowrap">
                <ShoppingCart className="w-4 h-4 text-[var(--gold)]" />
                <span>My Cart</span>
              </GoldButton>
            </Link>
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search alchemical items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50/60 border border-gray-200 focus:border-[var(--gold)] text-gray-900 text-xs py-2.5 pl-10 pr-4 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-[var(--gold)] placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <ShopItemSkeleton count={6} />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((item: any) => {
              const now = new Date();
              const hasActiveOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
                (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));

              const isOutOfStock = item.inStock === false || item.stockCount === 0;
              return (
                <div
                  key={item._id}
                  className="bg-white border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch relative cursor-pointer hover:border-amber-400 hover:shadow-md transition-all duration-300"
                  onClick={() => router.push(`/shop/${item._id}`)}
                >
                  {/* Left Side: Image */}
                  {item.imageUrl && (
                    <div className="w-full sm:w-64 h-64 flex-shrink-0">
                      <ShopItemImage 
                        imageUrl={item.imageUrl} 
                        images={item.images} 
                        title={item.title} 
                        isOutOfStock={isOutOfStock}
                        hasActiveOffer={hasActiveOffer}
                        offerExpiresAt={item.offerExpiresAt}
                        specialOfferTitle={item.specialOfferTitle}
                      />
                    </div>
                  )}

                  {/* Right Side: Content */}
                  <div className="flex-grow flex flex-col justify-between py-1 w-full">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-sans text-lg font-bold text-gray-900 transition-colors group-hover:text-[var(--gold)]">{item.title}</h3>
                        {item.inStock !== false && item.stockCount !== undefined && item.stockCount > 0 && item.stockCount < 5 && (
                          <span className="bg-orange-50 border border-orange-200 text-orange-600 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
                            Only {item.stockCount} left
                          </span>
                        )}
                      </div>
                      <FormattedText text={item.description} className="text-gray-500 text-xs leading-relaxed font-light line-clamp-3" />
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        {hasActiveOffer ? (
                          <>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[#e77600] font-sans font-bold text-3xl">
                                ₹{(item.offerPrice / 100).toLocaleString()}
                              </span>
                              <span className="text-neutral-400 line-through text-base font-sans">
                                ₹{(item.price / 100).toLocaleString()}
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-[#e77600] font-sans font-bold text-3xl">
                            ₹{(item.price / 100).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          title="Add to Cart"
                          disabled={isOutOfStock}
                          className="p-3 border border-amber-200 hover:border-amber-400 hover:bg-amber-50 rounded-xl text-amber-900 disabled:opacity-30 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCartMutation.mutate(item._id);
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button
                          disabled={isOutOfStock}
                          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold rounded-xl text-sm transition border border-amber-400/40"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/shop/checkout?itemId=${item._id}&quantity=1`);
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-600 animate-bounce" />
            <p className="text-gray-600 text-sm font-light">No products match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
