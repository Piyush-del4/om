'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ShoppingBag, Search, ShoppingCart, Package } from 'lucide-react';
import { ShopItemSkeleton } from '@/components/ui/Skeleton';
import { CountdownTimer } from '@/components/shop/CountdownTimer';

import { FormattedText } from '@/components/ui/FormattedText';

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
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {filtered.map((item: any) => {
 const now = new Date();
 const hasActiveOffer = item.offerPrice !== undefined && item.offerPrice !== null &&
 (!item.offerExpiresAt || now < new Date(item.offerExpiresAt));

 const isOutOfStock = item.inStock === false || item.stockCount === 0;
 return (
 <GoldCard
 key={item._id}
 flush
 className="transition-spring group flex flex-col justify-between h-full relative cursor-pointer"
 onClick={() => router.push(`/shop/${item._id}`)}
 >
 <div className="block flex-grow flex flex-col">
 {item.imageUrl && (
 <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
 <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-spring group-hover:scale-105" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
 {isOutOfStock && (
 <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10">
 <span className="bg-red-600/95 text-gray-900 font-mono text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded border border-red-500 shadow-md">
 Out of Stock
 </span>
 </div>
 )}
 {hasActiveOffer && item.offerExpiresAt && !isOutOfStock && (
 <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
 <CountdownTimer expiresAt={item.offerExpiresAt} />
 </div>
 )}
 {hasActiveOffer && item.specialOfferTitle && !isOutOfStock && (
 <div className="absolute top-3 left-3 bg-red-600 text-gray-900 font-mono text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border border-red-500/40 shadow-[0_0_12px_rgba(220,38,38,0.45)]">
 {item.specialOfferTitle}
 </div>
 )}
 </div>
 )}
 <div className="p-6 flex-grow space-y-2">
 <div className="flex justify-between items-start gap-2">
 <h3 className="font-sans text-[28px] font-bold text-gray-900 transition-colors group-hover:text-[var(--gold)]">{item.title}</h3>
 {item.inStock !== false && item.stockCount !== undefined && item.stockCount > 0 && item.stockCount < 5 && (
 <span className="bg-orange-950/40 border border-orange-900/30 text-orange-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
 Only {item.stockCount} left
 </span>
 )}
 </div>
 <FormattedText text={item.description} className="text-gray-600 text-xs leading-relaxed font-light line-clamp-3" />
 </div>
 </div>
 <div className="p-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
 <div className="flex flex-col">
 {hasActiveOffer ? (
 <>
 <div className="flex items-baseline gap-2">
 <span className="text-[var(--gold)] font-bold text-[28px] font-sans">
 ₹{(item.offerPrice / 100).toLocaleString()}
 </span>
 <span className="text-neutral-500 line-through text-[22px] font-sans">
 ₹{(item.price / 100).toLocaleString()}
 </span>
 </div>
 {item.specialOfferTitle && (
 <span className="text-[10px] text-green-400 font-medium">
 Special Offer Active
 </span>
 )}
 </>
 ) : (
 <span className="text-[var(--gold)] font-bold text-[28px] font-sans">
 ₹{(item.price / 100).toLocaleString()}
 </span>
 )}
 </div>
 <div className="flex gap-2">
 <button
 title="Add to Cart"
 disabled={isOutOfStock}
 className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-transparent transition-colors"
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 addToCartMutation.mutate(item._id);
 }}
 >
 <ShoppingCart className="w-4 h-4" />
 </button>
 <GoldButton
 variant="filled"
 disabled={isOutOfStock}
 className="py-1.5 px-3 text-[10px] uppercase font-bold tracking-wider"
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 router.push(`/shop/checkout?itemId=${item._id}&quantity=1`);
 }}
 >
 Buy Now
 </GoldButton>
 </div>
 </div>
 </GoldCard>
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
