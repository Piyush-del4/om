'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ShoppingCart, Trash2, Minus, Plus, CreditCard } from 'lucide-react';
import { CartSkeleton } from '@/components/ui/Skeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CheckoutUpsellWidget } from '@/components/shop/CheckoutUpsellWidget';
import { env } from '@/lib/env';

declare global {
 interface Window { Razorpay: any; }
}

export default function CartPage() {
 const { isAuthenticated, isLoading, user } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();
 React.useEffect(() => {
 if (!isLoading && !isAuthenticated) router.push('/login');
 }, [isAuthenticated, isLoading, router]);

 const { data: cart, isLoading: loadingCart } = useQuery({
 queryKey: ['cart'],
 queryFn: async () => {
 const res = await client.get('/shop/cart/items');
 return res.data?.data || { items: [] };
 },
 enabled: isAuthenticated,
 });

 const updateQtyMutation = useMutation({
 mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
 return client.post('/shop/cart/items', { itemId, quantity });
 },
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
 });

 const removeItemMutation = useMutation({
 mutationFn: async (itemId: string) => {
 return client.delete(`/shop/cart/items/${itemId}`);
 },
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
 });

 const cartItems = cart?.items || [];
 const subtotal = cartItems.reduce((sum: number, item: any) => {
 const price = item.itemId?.price || 0;
 return sum + price * item.quantity;
 }, 0);
 const gst = Math.round(subtotal * 0.18);
 const total = subtotal + gst;
 
 const hasOutOfStockItem = cartItems.some((item: any) => {
 const product = item.itemId;
 return !product || product.inStock === false || product.stockCount === 0 || product.isDeleted === true;
 });
 
 if (isLoading) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Securing Connection...
 </p>
 </div>
 );
 }
 
 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto space-y-8">
 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <ShoppingCart className="w-7 h-7 text-[var(--gold)]" /> Your Cart
 </h1>
 
 {loadingCart ? (
 <CartSkeleton />
 ) : cartItems.length > 0 ? (
 <>
 <div className="space-y-4">
          {cartItems.map((item: any) => {
            const product = item.itemId;
            if (!product) {
              return (
                <GoldCard key={item._id} className="border border-red-200 bg-red-50/50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-red-800">Product Unavailable</h3>
                      <p className="text-xs text-red-600 mt-0.5">This item has been removed from our shop.</p>
                    </div>
                    <button 
                      onClick={() => removeItemMutation.mutate(item._id)} 
                      className="text-red-600 hover:text-red-700 p-2 bg-white rounded-lg border border-red-200 transition-colors"
                      title="Remove from Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GoldCard>
              );
            }
            const isOutOfStock = product.inStock === false || product.stockCount === 0 || product.isDeleted === true;
            return (
              <GoldCard key={product._id} className="border border-[var(--gold-100)] p-4">
 <div className="flex items-center gap-4">
 {product.imageUrl && (
 <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
 <img src={product.imageUrl} alt={product.title} className={`w-full h-full object-cover ${isOutOfStock ? 'opacity-40 blur-[0.5px]' : ''}`} />
 {isOutOfStock && (
 <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
 <span className="text-[8px] bg-red-600 px-1 py-0.5 rounded text-gray-900 font-mono font-bold">SOLD OUT</span>
 </div>
 )}
 </div>
 )}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <h3 className="font-bold text-sm text-gray-900 truncate">{product.title}</h3>
 {isOutOfStock && (
 <span className="bg-red-50 border border-red-200 text-red-600 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
 Out of Stock
 </span>
 )}
 </div>
 <p className="text-[#e77600] text-xs font-medium mt-0.5">₹{(product.price / 100).toLocaleString()} each</p>
 </div>
 <div className="flex items-center gap-2">
 <button
 onClick={() => updateQtyMutation.mutate({ itemId: product._id, quantity: Math.max(1, item.quantity - 1) })}
 disabled={isOutOfStock}
 className="w-7 h-7 flex items-center justify-center border border-neutral-700 disabled:opacity-30 rounded-md text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
 >
 <Minus className="w-3.5 h-3.5" />
 </button>
 <span className="text-sm font-bold w-6 text-center">{isOutOfStock ? 0 : item.quantity}</span>
 <button
 onClick={() => updateQtyMutation.mutate({ itemId: product._id, quantity: item.quantity + 1 })}
 disabled={isOutOfStock || (product.stockCount !== undefined && item.quantity >= product.stockCount)}
 className="w-7 h-7 flex items-center justify-center border border-neutral-700 disabled:opacity-30 rounded-md text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
 >
 <Plus className="w-3.5 h-3.5" />
 </button>
 </div>
 <p className="text-gray-900 font-bold text-sm w-20 text-right">₹{(isOutOfStock ? 0 : (product.price * item.quantity) / 100).toLocaleString()}</p>
 <button onClick={() => removeItemMutation.mutate(product._id)} className="text-red-600 hover:text-red-600 p-1">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </GoldCard>
 );
 })}
 </div>

  {/* Checkout Special Upsell Add-ons */}
  <CheckoutUpsellWidget />
 
 {/* Order Summary */}
 <GoldCard className="border border-[var(--gold-200)] p-6 space-y-4">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)]">Order Summary</h3>
 <div className="space-y-2 text-sm">
 <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{(subtotal / 100).toLocaleString()}</span></div>
 <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>₹{(gst / 100).toLocaleString()}</span></div>
 <div className="h-px bg-gray-200"></div>
 <div className="flex justify-between text-gray-900 font-bold text-base"><span>Total</span><span className="text-[#e77600]">₹{(total / 100).toLocaleString()}</span></div>
 </div>
 
 <GoldButton
 variant="filled"
 fullWidth
 disabled={hasOutOfStockItem}
 onClick={() => router.push('/shop/checkout')}
 className="py-3 text-base flex items-center justify-center gap-2"
 >
 <CreditCard className="w-5 h-5" /> Proceed to Checkout
 </GoldButton>
 {hasOutOfStockItem && (
 <p className="text-xs text-red-600 text-center font-mono mt-1">
 Please remove out-of-stock items to proceed with checkout.
 </p>
 )}
 </GoldCard>
 </>
 ) : (
 <div className="text-center py-16 text-gray-500 text-sm">
 <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
 <p>Your cart is empty.</p>
 <a href="/shop" className="text-[var(--gold)] hover:underline text-xs mt-2 inline-block">Browse our shop →</a>
 </div>
 )}
 </div>
 </div>
 );
}
