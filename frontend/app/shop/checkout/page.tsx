'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { AddressForm, AddressFormValues } from '@/components/shop/AddressForm';
import { ShoppingBag, CreditCard, ArrowLeft } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { env } from '@/lib/env';

declare global {
 interface Window { Razorpay: any; }
}

function CheckoutContent() {
 const { isAuthenticated, isLoading: authLoading, user, refreshUser } = useAuth();
 const router = useRouter();
 const searchParams = useSearchParams();
 const queryClient = useQueryClient();

 const itemId = searchParams.get('itemId');
 const quantityParam = searchParams.get('quantity');
 const quantity = quantityParam ? parseInt(quantityParam, 10) : 1;
 const isDirect = !!itemId;

 const [checkingOut, setCheckingOut] = useState(false);

 useEffect(() => {
 if (!authLoading && !isAuthenticated) {
 router.push('/login');
 }
 }, [isAuthenticated, authLoading, router]);

 // Fetch Direct Shop Item Details if in Direct Mode
 const { data: directItem, isLoading: loadingDirectItem } = useQuery({
 queryKey: ['shop-item', itemId],
 queryFn: async () => {
 if (!itemId) return null;
 const res = await client.get(`/shop/${itemId}`);
 return res.data?.data;
 },
 enabled: isDirect,
 });

 // Fetch Cart Details if in Cart Mode
 const { data: cart, isLoading: loadingCart } = useQuery({
 queryKey: ['cart'],
 queryFn: async () => {
 if (isDirect) return null;
 const res = await client.get('/shop/cart/items');
 return res.data?.data || { items: [] };
 },
 enabled: !isDirect && isAuthenticated,
 });

 if (authLoading || (isDirect && loadingDirectItem) || (!isDirect && loadingCart)) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Preparing Order...
 </p>
 </div>
 );
 }

 // Get items, calculate pricing
 const items = isDirect 
 ? (directItem ? [{ product: directItem, quantity }] : [])
 : (cart?.items || []).map((item: any) => ({ product: item.itemId, quantity: item.quantity })).filter((i: any) => i.product);

 if (items.length === 0) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600 px-4 text-center">
 <ShoppingBag className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
 <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">No Items For Checkout</h2>
 <p className="text-sm max-w-md font-light mb-6 text-gray-500">Your checkout ledger is currently empty. Please select an item to buy.</p>
 <button onClick={() => router.push('/shop')} className="py-2.5 px-6 bg-[var(--gold)] text-black rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[var(--gold-light)] transition-colors">
 Browse Shop
 </button>
 </div>
 );
 }

 const subtotal = items.reduce((sum: number, item: any) => {
 // Resolve active price (offer price if active, otherwise normal price)
 let price = item.product.price;
 if (item.product.offerPrice !== undefined && item.product.offerPrice !== null) {
 const now = new Date();
 if (!item.product.offerExpiresAt || now < new Date(item.product.offerExpiresAt)) {
 price = item.product.offerPrice;
 }
 }
 return sum + price * item.quantity;
 }, 0);

 const gst = Math.round(subtotal * 0.18);
 const total = subtotal + gst;

 const loadRazorpayScript = (): Promise<boolean> => {
 return new Promise((resolve) => {
 if (window.Razorpay) { resolve(true); return; }
 const script = document.createElement('script');
 script.src = 'https://checkout.razorpay.com/v1/checkout.js';
 script.onload = () => resolve(true);
 script.onerror = () => resolve(false);
 document.body.appendChild(script);
 });
 };

 const handleCheckoutSubmit = async (values: AddressFormValues) => {
 setCheckingOut(true);
 try {
 const loaded = await loadRazorpayScript();
 if (!loaded) {
 alert('Failed to load Razorpay SDK. Please check your connection and try again.');
 setCheckingOut(false);
 return;
 }

 // 1. Format the multi-line address string
 const formattedAddress = [
 values.fullName,
 values.phone,
 values.flatHouse,
 values.areaStreet,
 values.landmark ? `Landmark: ${values.landmark}` : null,
 `${values.townCity}, ${values.state} - ${values.pincode}`,
 ].filter(Boolean).join('\n');

 // 2. Save address to user profile for future autofill
 await client.patch('/users/me', { defaultAddress: values });

 // 3. Initiate Checkout Order on the backend
 const endpoint = isDirect ? '/shop/payments/direct-checkout' : '/shop/payments/checkout';
 const payload = isDirect 
 ? { itemId, quantity, address: formattedAddress }
 : { address: formattedAddress };

 const { data } = await client.post(endpoint, payload);
 const orderData = data.data;

 // 4. Configure & Open Razorpay SDK
 const options = {
 key: orderData.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
 amount: orderData.amount,
 currency: orderData.currency || 'INR',
 name: 'OM Astrology AMC',
 description: isDirect ? `Direct Purchase: ${directItem.title}` : 'Cart Purchase',
 order_id: orderData.razorpayOrderId,
 handler: async (response: any) => {
 try {
 await client.post('/shop/payments/verify', {
 razorpayOrderId: response.razorpay_order_id,
 razorpayPaymentId: response.razorpay_payment_id,
 razorpaySignature: response.razorpay_signature,
 });
 
 // Invalidate queries to refresh cart/purchased item states
 queryClient.invalidateQueries({ queryKey: ['cart'] });
 queryClient.invalidateQueries({ queryKey: ['orders'] });
 
 alert('🎉 Payment successful! Your order has been placed.');
 router.push('/orders');
 } catch (err) {
 alert('Payment verification failed. Please contact support with your payment ID.');
 }
 },
 prefill: {
 name: user?.name || values.fullName || '',
 email: user?.email || '',
 contact: values.phone || '',
 },
 theme: { color: '#cc8f33' },
 };

 const rzp = new window.Razorpay(options);
 rzp.open();
 } catch (err: any) {
 alert(err.response?.data?.error?.message || 'Checkout request failed. Try again.');
 } finally {
 setCheckingOut(false);
 }
 };

 return (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 {/* Left Column: Address Details Form */}
 <div className="lg:col-span-7 space-y-6">
 <GoldCard className="border border-[var(--gold-200)]/30 p-6 sm:p-8">
 <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--gold)] mb-6 flex items-center gap-2 pb-3 border-b border-neutral-900">
 <CreditCard className="w-5 h-5" /> Delivery & Billing Coordinates
 </h2>
 <AddressForm
 onSubmit={handleCheckoutSubmit}
 isLoading={checkingOut}
 buttonText={checkingOut ? 'Initializing Secure Payment...' : 'Proceed to Pay'}
 />
 </GoldCard>
 </div>

 {/* Right Column: Order Ledger Summary */}
 <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-6">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)] pb-2 border-b border-neutral-900">
 Order Ledger Summary
 </h3>

 {/* List of items */}
 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
 {items.map((item: any) => {
 const product = item.product;
 let itemPrice = product.price;
 let isSpecialPrice = false;
 if (product.offerPrice !== undefined && product.offerPrice !== null) {
 const now = new Date();
 if (!product.offerExpiresAt || now < new Date(product.offerExpiresAt)) {
 itemPrice = product.offerPrice;
 isSpecialPrice = true;
 }
 }

 return (
 <div key={product._id} className="flex gap-4 items-center">
 {product.imageUrl && (
 <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200/80">
 <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
 </div>
 )}
 <div className="flex-1 min-w-0">
 <h4 className="font-bold text-xs text-gray-900 truncate">{product.title}</h4>
 <p className="text-gray-600 text-[10px] font-mono">Qty: {item.quantity}</p>
 </div>
 <div className="text-right flex-shrink-0">
 <p className="text-gray-900 font-bold text-xs font-mono">
 ₹{((itemPrice * item.quantity) / 100).toLocaleString()}
 </p>
 {isSpecialPrice && (
 <span className="text-[9px] text-[var(--gold)] block font-mono">
 (Special offer applied)
 </span>
 )}
 </div>
 </div>
 );
 })}
 </div>

 <div className="h-px bg-gray-100"></div>

 {/* Totals */}
 <div className="space-y-2 text-xs font-mono">
 <div className="flex justify-between text-gray-600">
 <span>Subtotal</span>
 <span>₹{(subtotal / 100).toLocaleString()}</span>
 </div>
 <div className="flex justify-between text-gray-600">
 <span>GST (18%)</span>
 <span>₹{(gst / 100).toLocaleString()}</span>
 </div>
 <div className="h-px bg-gray-100/60 my-2"></div>
 <div className="flex justify-between text-gray-900 font-bold text-sm">
 <span>Grand Total</span>
 <span className="text-[#e77600]">₹{(total / 100).toLocaleString()}</span>
 </div>
 </div>

 <p className="text-[10px] text-gray-500 font-light leading-relaxed">
 By proceeding, you agree to our Terms of Service & Privacy Policy. All transactions are securely routed through Razorpay.
 </p>
 </GoldCard>
 </div>
 </div>
 );
}

export default function CheckoutPage() {
 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-6xl mx-auto space-y-8 relative z-10 animate-fade-in">
 
 {/* Header Back Link */}
 <div className="flex justify-between items-center pb-4 border-b border-[var(--gold-200)]">
 <button onClick={() => window.history.back()} className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 hover:text-[var(--gold)] transition-colors">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 Back
 </button>
 <span className="text-[var(--gold)] text-xs font-mono uppercase tracking-widest font-semibold">
 SECURE CHECKOUT
 </span>
 </div>

 {/* Suspense wrapper to handle useSearchParams safe client-side loading */}
 <Suspense fallback={<div className="text-center text-gray-500 text-sm animate-pulse py-24">Synchronizing checkout params...</div>}>
 <CheckoutContent />
 </Suspense>

 </div>
 </div>
 );
}
