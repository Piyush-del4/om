'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { Sparkles, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export function CheckoutUpsellWidget() {
  const queryClient = useQueryClient();

  const { data: items } = useQuery({
    queryKey: ['shop-items-upsell'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await client.post('/shop/cart/items', { itemId, quantity: 1 });
    },
    onSuccess: () => {
      toast.success('Add-on added to order!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (!items || items.length === 0) return null;

  // Show up to 3 complementary items
  const upsellItems = items.slice(0, 3);

  return (
    <div className="bg-gradient-to-r from-amber-50/80 via-amber-100/40 to-amber-50/80 border border-amber-300/80 rounded-2xl p-4 sm:p-5 space-y-3 my-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-700" />
        <h4 className="font-serif font-bold text-xs sm:text-sm text-amber-950 uppercase tracking-wider">
          Complete Your Spiritual Kit (Special Checkout Offers)
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {upsellItems.map((item: any) => {
          const priceRupees = ((item.offerPrice || item.price) / 100).toLocaleString();

          return (
            <div key={item._id} className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={item.imageUrl || '/images/logo.png'} 
                  alt={item.title} 
                  className="w-10 h-10 object-contain rounded-lg bg-gray-50 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-gray-900 truncate">{item.title}</h5>
                  <span className="font-bold text-xs text-amber-800">₹{priceRupees}</span>
                </div>
              </div>

              <button
                onClick={() => addToCartMutation.mutate(item._id)}
                disabled={addToCartMutation.isPending}
                className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition cursor-pointer flex-shrink-0"
                title="Add to Cart"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
