'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { Sparkles, Plus, ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductBundleCardProps {
  currentProduct: any;
}

export function ProductBundleCard({ currentProduct }: ProductBundleCardProps) {
  const queryClient = useQueryClient();

  // Fetch all shop items to pick complementary bundle items
  const { data: allItems } = useQuery({
    queryKey: ['shop-items-all'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  // Mutation to add both products to cart (must be defined unconditionally at top level)
  const addBundleMutation = useMutation({
    mutationFn: async ({ currentId, bundleId }: { currentId: string; bundleId: string }) => {
      await client.post('/shop/cart/items', { itemId: currentId, quantity: 1 });
      await client.post('/shop/cart/items', { itemId: bundleId, quantity: 1 });
    },
    onSuccess: (_, variables) => {
      toast.success('Bundle added to Cart!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Failed to add bundle to cart.');
    },
  });

  if (!currentProduct || !allItems || allItems.length < 2) return null;

  // Pick 1 complementary item from the shop (excluding current item)
  const bundleItem = allItems.find((i: any) => i._id !== currentProduct._id) || allItems[0];
  if (!bundleItem) return null;

  const mainPrice = (currentProduct.offerPrice || currentProduct.price) / 100;
  const bundlePrice = (bundleItem.offerPrice || bundleItem.price) / 100;

  const totalOriginal = mainPrice + bundlePrice;
  const bundleDiscountPercentage = currentProduct.bundleDiscountPercentage || 15;
  const totalDiscounted = Math.round(totalOriginal * (1 - bundleDiscountPercentage / 100));
  const savings = Math.round(totalOriginal - totalDiscounted);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-5 my-8">
      
      {/* Bundle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-lg">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Frequently Bought Together</span>
        </div>
        <span className="bg-amber-600 text-white font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          Save {bundleDiscountPercentage}% Off Bundle
        </span>
      </div>

      {/* Products Row */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        
        {/* Main Product */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs flex-1 w-full">
          <img 
            src={currentProduct.imageUrl || '/images/logo.png'} 
            alt={currentProduct.title} 
            className="w-14 h-14 object-contain bg-gray-50 rounded-xl p-1 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">This Item</span>
            <h4 className="font-bold text-xs text-gray-900 truncate">{currentProduct.title}</h4>
            <span className="font-bold text-xs text-amber-900">₹{mainPrice.toLocaleString()}</span>
          </div>
        </div>

        <Plus className="w-6 h-6 text-amber-600 flex-shrink-0" />

        {/* Complementary Bundle Item */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs flex-1 w-full">
          <img 
            src={bundleItem.imageUrl || '/images/logo.png'} 
            alt={bundleItem.title} 
            className="w-14 h-14 object-contain bg-gray-50 rounded-xl p-1 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Recommended Add-on</span>
            <h4 className="font-bold text-xs text-gray-900 truncate">{bundleItem.title}</h4>
            <span className="font-bold text-xs text-amber-900">₹{bundlePrice.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Bundle Action & Savings Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-amber-200/80">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-amber-950">₹{totalDiscounted.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through font-mono">₹{totalOriginal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-emerald-700 font-semibold">
            ✨ You save ₹{savings.toLocaleString()} ({bundleDiscountPercentage}% discount applied)
          </p>
        </div>

        <button
          onClick={() => addBundleMutation.mutate({ currentId: currentProduct._id, bundleId: bundleItem._id })}
          disabled={addBundleMutation.isPending}
          className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{addBundleMutation.isPending ? 'Adding Bundle...' : 'Add Complete Bundle to Cart'}</span>
        </button>
      </div>

    </div>
  );
}
