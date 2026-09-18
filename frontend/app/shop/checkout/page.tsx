'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { AddressForm, AddressFormValues } from '@/components/shop/AddressForm';
import { ShoppingBag, Lock, Package, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { env } from '@/lib/env';

declare global {
  interface Window { Razorpay: any; }
}

function CheckoutContent() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#77736D]">
        <LoadingSpinner size="lg" />
        <p className="text-xs font-mono tracking-widest uppercase animate-pulse mt-4 text-[#77736D]">
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#1D1C1A] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E7E0D4] flex items-center justify-center mb-4 text-[#A78652]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1D1C1A] mb-2">Item Unavailable</h2>
        <p className="text-sm max-w-md font-light mb-6 text-[#77736D]">
          The item you are trying to purchase is no longer available or your checkout cart is empty.
        </p>
        <button
          onClick={() => router.push('/shop')}
          className="py-3 px-8 bg-[#1D1C1A] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#6F2935] transition-all cursor-pointer shadow-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const subtotal = items.reduce((sum: number, item: any) => {
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
  const formattedTotalInRupees = (total / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
        alert('Failed to load Razorpay SDK. Please check your internet connection and try again.');
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

      // 2. Save address & phone to user profile for future autofill
      await client.patch('/users/me', { defaultAddress: values });

      // 3. Initiate Checkout Order on backend
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
        description: isDirect ? `Order #${orderData.orderId?.slice(-6) || ''}` : 'Cart Purchase',
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

            router.push('/orders');
          } catch (err: any) {
            alert('Payment verification failed. Please contact support with your payment ID.');
          }
        },
        prefill: {
          name: user?.name || values.fullName || '',
          email: values.email || user?.email || '',
          contact: values.phone || '',
        },
        theme: { color: '#6F2935' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Checkout request failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  const initialFormDefaults: Partial<AddressFormValues> = {
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    ...(user?.defaultAddress || {}),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Delivery Information Form */}
      <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-[#E7E0D4] p-6 sm:p-8">
        <AddressForm
          initialValues={initialFormDefaults}
          onSubmit={handleCheckoutSubmit}
          isLoading={checkingOut}
          userEmail={user?.email}
          userName={user?.name}
        />
      </div>

      {/* Right Column: Order Summary & Secure Payment */}
      <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-[#E7E0D4] p-6 space-y-6 lg:sticky lg:top-24">
        <div className="border-b border-[#E7E0D4] pb-3">
          <h3 className="font-serif text-xl font-bold text-[#1D1C1A]">
            Order Summary
          </h3>
        </div>

        {/* List of Items */}
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
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

            const formattedItemPrice = ((itemPrice * item.quantity) / 100).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return (
              <div key={product._id} className="flex gap-4 items-center">
                {/* 72px Thumbnail */}
                <div className="w-18 h-18 rounded-lg bg-[#FAF7F2] overflow-hidden flex-shrink-0 border border-[#E7E0D4] flex items-center justify-center">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-8 h-8 text-[#A78652]" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#1D1C1A] leading-snug">
                    {product.title}
                  </h4>
                  <p className="text-[#77736D] text-xs font-light mt-0.5">
                    Qty: {item.quantity}
                  </p>
                  {isSpecialPrice && (
                    <span className="text-[10px] text-[#6F2935] font-semibold block mt-0.5">
                      Special offer applied
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-sans font-bold text-sm text-[#1D1C1A]">
                    ₹{formattedItemPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#E7E0D4] pt-4 space-y-2.5 text-xs text-[#77736D]">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span className="font-medium text-[#1D1C1A]">
              ₹{(subtotal / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>GST (18%)</span>
            <span className="font-medium text-[#1D1C1A]">
              ₹{(gst / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="border-t border-[#E7E0D4] pt-3 flex justify-between items-baseline">
            <span className="font-serif font-bold text-base text-[#1D1C1A]">Total</span>
            <span className="font-sans font-bold text-2xl text-[#1D1C1A]">
              ₹{formattedTotalInRupees}
            </span>
          </div>
        </div>

        {/* Dynamic Payment CTA Button */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            onClick={() => {
              const formEl = document.querySelector('form');
              if (formEl) {
                formEl.requestSubmit();
              }
            }}
            disabled={checkingOut}
            className="w-full py-3.5 px-6 bg-[#1D1C1A] hover:bg-[#6F2935] text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {checkingOut ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" variant="current" />
                <span>Processing...</span>
              </span>
            ) : (
              <span>Pay ₹{formattedTotalInRupees} Securely →</span>
            )}
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#77736D] font-medium pt-1">
            <Lock className="w-3.5 h-3.5 text-[#A78652]" />
            <span>Secure payment powered by Razorpay</span>
          </div>
        </div>

        {/* Terms Disclaimer */}
        <div className="border-t border-[#E7E0D4] pt-4 text-center">
          <p className="text-[11px] text-[#77736D] font-light leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/privacy-policy" className="underline hover:text-[#1D1C1A] transition-colors">
              Terms of Service
            </Link>{' '}
            &{' '}
            <Link href="/privacy-policy" className="underline hover:text-[#1D1C1A] transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#1D1C1A]">
      {/* Simplified Focused Header */}
      <header className="bg-white border-b border-[#E7E0D4] py-4 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="OM Astrology AMC Logo" className="w-8 h-8 object-contain" />
            <span className="font-serif text-lg font-bold text-[#1D1C1A]">
              OM Astrology AMC
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-xs text-[#77736D] hover:text-[#1D1C1A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-[#E7E0D4]" />
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#77736D]">
              <Lock className="w-3.5 h-3.5 text-[#A78652]" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-[#77736D] text-sm animate-pulse">
              Initializing checkout session...
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}
