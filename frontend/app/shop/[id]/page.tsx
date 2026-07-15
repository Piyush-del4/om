'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ArrowLeft, ShoppingCart, ShoppingBag, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { useRouter } from 'next/navigation';

export default function ShopItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['shop-item', id],
    queryFn: async () => {
      const res = await client.get(`/shop/${id}`);
      return res.data?.data;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return client.post('/shop/cart/items', { itemId: id, quantity });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Revealing Artifact Details...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400 px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Artifact Not Found</h2>
        <p className="text-sm max-w-md font-light mb-6 text-gray-500">The item you are searching for does not exist in our store or may have been archived.</p>
        <Link href="/shop">
          <GoldButton variant="outlined" className="py-2.5 px-6 text-xs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </GoldButton>
        </Link>
      </div>
    );
  }

  // Determine current display image
  const displayImage = activeImage || item.imageUrl;
  // All images array (main image + any other images in item.images if available)
  const allImages = [item.imageUrl, ...(item.images || [])].filter(Boolean);

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Back Link */}
        <div className="flex justify-between items-center pb-4 border-b border-[var(--gold-200)]">
          <Link href="/shop" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
          <span className="text-[var(--gold)] text-xs font-mono uppercase tracking-widest font-semibold">
            Alchemical Specimen
          </span>
        </div>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Images Section */}
          <div className="md:col-span-5 space-y-4">
            <GoldCard theme="dark" flush className="overflow-hidden bg-neutral-950/40 border border-[var(--gold-200)] relative">
              <div className="w-full aspect-square bg-neutral-900 flex items-center justify-center overflow-hidden">
                {displayImage ? (
                  <img 
                    src={displayImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                ) : (
                  <ShoppingBag className="w-24 h-24 text-neutral-800" />
                )}
              </div>
            </GoldCard>

            {/* Thumbnail Gallery (if multiple images exist) */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin">
                {allImages.map((imgUrl, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border bg-neutral-900 transition-all flex-shrink-0 ${
                      displayImage === imgUrl ? 'border-[var(--gold)] shadow-[0_0_10px_rgba(204,143,51,0.25)]' : 'border-neutral-800 hover:border-gray-600'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Info Section */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {item.title}
              </h1>
              <div className="flex items-center gap-2 pt-1">
                <span className="bg-[var(--gold-100)] border border-[var(--gold-200)] text-[var(--gold)] text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full">
                  Authentic Artifact
                </span>
                {(() => {
                  const isOutOfStock = item.inStock === false || item.stockCount === 0;
                  const hasCount = item.stockCount !== undefined && item.stockCount !== null && item.stockCount > 0;
                  return (
                    <span className={`text-xs font-mono font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-400'}`}>
                      • {isOutOfStock ? 'OUT OF STOCK' : hasCount ? `IN STOCK (${item.stockCount} pieces left)` : 'IN STOCK'}
                    </span>
                  );
                })()}
              </div>
            </div>            {/* Pricing Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 space-y-4">
              {(() => {
                const now = new Date();
                const hasActiveOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
                  (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));

                return (
                  <>
                    {hasActiveOffer && item.offerExpiresAt && (
                      <div className="mb-2">
                        <CountdownTimer expiresAt={item.offerExpiresAt} />
                      </div>
                    )}
                    <div className="flex items-baseline gap-3 flex-wrap">
                      {hasActiveOffer ? (
                        <>
                          <span className="text-3xl sm:text-4xl font-bold font-mono text-[var(--gold)]">
                            ₹{(item.offerPrice / 100).toLocaleString()}
                          </span>
                          <span className="text-neutral-500 line-through text-lg font-mono">
                            ₹{(item.price / 100).toLocaleString()}
                          </span>
                          {item.specialOfferTitle && (
                            <span className="bg-red-600 text-white font-mono text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border border-red-500/40 shadow-[0_0_12px_rgba(220,38,38,0.45)]">
                              {item.specialOfferTitle}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-3xl sm:text-4xl font-bold font-mono text-[var(--gold)]">
                          ₹{(item.price / 100).toLocaleString()}
                        </span>
                      )}
                      <span className="text-gray-500 text-xs">INR (inclusive of all taxes)</span>
                    </div>
                  </>
                );
              })()}
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Handcrafted under astrological alignments. Contains natural elements configured to channel natural vibrations.
              </p>
              
              <div className="flex items-center gap-4 py-2 border-t border-neutral-900/60 pt-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-neutral-800 rounded-lg bg-black/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={item.inStock === false || item.stockCount === 0}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-bold text-white min-w-[32px] text-center">
                    {item.inStock === false || item.stockCount === 0 ? 0 : quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => {
                      if (item.stockCount !== undefined && q >= item.stockCount) return q;
                      return q + 1;
                    })}
                    disabled={item.inStock === false || item.stockCount === 0 || (item.stockCount !== undefined && quantity >= item.stockCount)}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <GoldButton
                  variant="outlined"
                  fullWidth
                  className="py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  onClick={() => addToCartMutation.mutate()}
                  isLoading={addToCartMutation.isPending}
                  disabled={item.inStock === false || item.stockCount === 0}
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </GoldButton>
                <GoldButton
                  variant="filled"
                  fullWidth
                  className="py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  onClick={() => {
                    router.push(`/shop/checkout?itemId=${item._id}&quantity=${quantity}`);
                  }}
                  disabled={item.inStock === false || item.stockCount === 0}
                >
                  <Sparkles className="w-4 h-4 text-black" /> Buy Now
                </GoldButton>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--gold)]" /> Sacred Description
              </h3>
              <div className="text-gray-300 text-sm leading-relaxed font-light space-y-4">
                {item.description ? (
                  item.description.split('\n').map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>No description provided for this alchemical tool.</p>
                )}
              </div>
            </div>

            {/* Features Info Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/20 border border-neutral-900">
                <ShieldCheck className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Energized Specimen</h4>
                  <p className="text-[11px] text-gray-500 font-light mt-0.5 leading-normal">Consecrated in full-moon rituals before dispatch.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/20 border border-neutral-900">
                <HelpCircle className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Usage & Guidance</h4>
                  <p className="text-[11px] text-gray-500 font-light mt-0.5 leading-normal">Includes instruction scroll on proper setup and placement.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
