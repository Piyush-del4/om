'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  ShoppingCart, Trash2, Minus, Plus, CreditCard, ArrowLeft, 
  AlertCircle, ShoppingBag 
} from 'lucide-react';
import { CartSkeleton } from '@/components/ui/Skeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CheckoutUpsellWidget } from '@/components/shop/CheckoutUpsellWidget';
import toast from 'react-hot-toast';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login?redirect=/shop/cart');
  }, [isAuthenticated, authLoading, router]);

  // Query user cart
  const { data: cart, isLoading: loadingCart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await client.get('/shop/cart/items');
      return res.data?.data || { items: [] };
    },
    enabled: isAuthenticated,
  });

  // Quantity update mutation
  const updateQtyMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return client.post('/shop/cart/items', { itemId, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error?.message || 'Failed to update quantity');
    },
  });

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.delete(`/shop/cart/items/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item');
    },
  });

  const cartItems = cart?.items || [];
  
  // Calculate Subtotal & Taxes
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => {
      const price = item.itemId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  }, [cartItems]);
  
  const hasOutOfStockItem = useMemo(() => {
    return cartItems.some((item: any) => {
      const product = item.itemId;
      return !product || product.inStock === false || product.stockCount === 0 || product.isDeleted === true;
    });
  }, [cartItems]);
  
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Your Shopping Cart...
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] text-gray-900 pb-20">
      
      {/* ── 1. BREADCRUMB & NAVIGATION ───────────────────────────────────── */}
      <div className="border-b border-[#E7E0D4] bg-[#F3EEE6]/60 backdrop-blur-sm sticky top-0 z-30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 hover:text-[#6F2935] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78652]" />
            Continue Shopping
          </Link>

          <span className="text-[11px] font-mono text-[#A78652] uppercase tracking-widest font-semibold bg-white border border-[#E7E0D4] px-3 py-1 rounded-full">
            Checkout Step 1 of 2
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E7E0D4] pb-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A] flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-[#6F2935]" /> Your Cart
            <span className="text-sm font-sans font-normal text-gray-500">
              ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
            </span>
          </h1>

          <Link href="/shop" className="text-xs font-bold text-[#6F2935] hover:underline flex items-center gap-1">
            Browse Storefront →
          </Link>
        </div>
        
        {loadingCart ? (
          <CartSkeleton />
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN: CART ITEMS LIST (65% width) ───────────────── */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-4">
                {cartItems.map((item: any) => {
                  const product = item.itemId;
                  
                  if (!product) {
                    return (
                      <div key={item._id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-sm text-red-800">Product Unavailable</h3>
                          <p className="text-xs text-red-600 mt-0.5">This item has been removed from our catalog.</p>
                        </div>
                        <button 
                          onClick={() => removeItemMutation.mutate(item._id)} 
                          className="text-red-600 hover:text-red-700 p-2 bg-white rounded-xl border border-red-200 transition-colors"
                          title="Remove from Cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  }

                  const isOutOfStock = product.inStock === false || product.stockCount === 0 || product.isDeleted === true;
                  const itemPrice = (product.offerPrice ?? product.price) / 100;
                  const lineTotal = isOutOfStock ? 0 : itemPrice * item.quantity;

                  return (
                    <div 
                      key={product._id} 
                      className="bg-white border border-[#E7E0D4] hover:border-[#A78652] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md"
                    >
                      {/* Product Thumbnail & Basic Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-24 h-24 rounded-lg bg-[#FAF8F5] border border-[#E7E0D4] p-2 flex items-center justify-center shrink-0 relative overflow-hidden">
                          {product.imageUrl ? (
                            <img 
                              src={product.imageUrl} 
                              alt={product.title} 
                              className={`w-full h-full object-contain ${isOutOfStock ? 'opacity-40 blur-[0.5px]' : ''}`} 
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-[#A78652]/30" />
                          )}
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                              <span className="text-[9px] bg-red-600 text-white font-mono font-bold px-1.5 py-0.5 rounded">
                                SOLD OUT
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-base font-bold text-[#1D1C1A] truncate">
                              {product.title}
                            </h3>
                          </div>
                          
                          <span className="text-[10px] font-mono text-[#6F2935] bg-[#6F2935]/10 px-2 py-0.5 rounded uppercase font-bold inline-block">
                            {product.title?.toLowerCase().includes('rudraksha') ? 'Rudraksha' : 'Spiritual Item'}
                          </span>

                          <p className="text-[#1D1C1A] font-extrabold text-base font-sans pt-0.5">
                            ₹{itemPrice.toLocaleString()} <span className="text-gray-400 text-xs font-normal">each</span>
                          </p>

                          {isOutOfStock && (
                            <p className="text-xs text-red-600 font-mono font-bold">
                              • Out of Stock
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls, Line Total & Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#FAF7F2]">
                        
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-[#E7E0D4] rounded-lg bg-[#FAF8F5] overflow-hidden">
                          <button
                            onClick={() => updateQtyMutation.mutate({ itemId: product._id, quantity: Math.max(1, item.quantity - 1) })}
                            disabled={isOutOfStock || item.quantity <= 1 || updateQtyMutation.isPending}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#6F2935] hover:bg-[#F7F3EA] disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="w-8 text-center text-xs font-mono font-bold text-gray-900">
                            {isOutOfStock ? 0 : item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQtyMutation.mutate({ itemId: product._id, quantity: item.quantity + 1 })}
                            disabled={isOutOfStock || (product.stockCount !== undefined && item.quantity >= product.stockCount) || updateQtyMutation.isPending}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#6F2935] hover:bg-[#F7F3EA] disabled:opacity-30 transition-colors font-mono font-bold text-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right min-w-[75px]">
                          <span className="text-[10px] text-gray-400 font-mono uppercase block">Total</span>
                          <span className="font-black text-xl text-[#1D1C1A] font-sans">
                            ₹{lineTotal.toLocaleString()}
                          </span>
                        </div>

                        {/* Remove Action */}
                        <button 
                          onClick={() => removeItemMutation.mutate(product._id)} 
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-medium"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add to Collection Recommendation Module */}
              <CheckoutUpsellWidget />

            </div>

            {/* ── RIGHT COLUMN: STICKY ORDER SUMMARY (35% width) ─────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
              <div className="bg-white border border-[#A78652]/30 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
                
                <h3 className="font-serif text-xl font-bold text-[#1D1C1A] border-b border-[#E7E0D4] pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm font-sans">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-semibold text-gray-900">₹{(subtotal / 100).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>GST (18% tax)</span>
                    <span className="font-semibold text-gray-900">₹{(gst / 100).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery / Shipping</span>
                    <span className="font-semibold text-green-700">Free Express</span>
                  </div>

                  <div className="h-px bg-[#E7E0D4] my-2"></div>

                  <div className="flex justify-between text-[#1D1C1A] font-bold text-lg pt-1">
                    <span>Total Amount</span>
                    <span className="text-[#1D1C1A] text-3xl font-black">₹{(total / 100).toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Checkout CTA */}
                <button
                  disabled={hasOutOfStockItem}
                  onClick={() => router.push('/shop/checkout')}
                  className="w-full py-4 text-sm font-bold bg-[#6F2935] hover:bg-[#8A3443] disabled:opacity-40 text-white rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" /> Proceed to Checkout
                </button>

                {hasOutOfStockItem && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Please remove out-of-stock items to proceed to checkout.</span>
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-20 bg-white rounded-xl border border-[#E7E0D4] p-8 space-y-4 max-w-2xl mx-auto shadow-sm">
            <ShoppingBag className="w-16 h-16 text-[#A78652] mx-auto opacity-40 animate-bounce" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-[#1D1C1A]">Your Cart is Empty</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-light">
                Explore our authentic Rudraksha beads, sacred malas, and spiritual tools.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/shop">
                <GoldButton variant="burgundy" className="py-3 px-8 text-xs font-bold shadow-md">
                  Browse Shop Storefront
                </GoldButton>
              </Link>
            </div>
          </div>
        )}

        {/* SEO Breadcrumbs Schema */}
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/shop' },
          { name: 'Cart', url: '/shop/cart' }
        ]} />

      </div>
    </div>
  );
}
