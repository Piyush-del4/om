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
      toast.success('Add-on added to cart!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (!items || items.length === 0) return null;

  // Show up to 3 complementary items
  const upsellItems = items.slice(0, 3);

  return (
    <div className="bg-white border border-[#E7E0D4] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm my-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#A78652]" />
        <h4 className="font-serif font-bold text-sm text-[#1D1C1A]">
          Add to Your Collection
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {upsellItems.map((item: any) => {
          const priceRupees = ((item.offerPrice || item.price) / 100).toLocaleString();

          return (
            <div key={item._id} className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E7E0D4] flex items-center justify-between gap-3 group hover:border-[#A78652] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={item.imageUrl || '/images/logo.png'} 
                  alt={item.title} 
                  className="w-12 h-12 object-contain rounded-md bg-white p-1 border border-[#E7E0D4] shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-gray-900 truncate group-hover:text-[#6F2935] transition-colors">{item.title}</h5>
                  <span className="font-bold text-xs text-[#1D1C1A]">₹{priceRupees}</span>
                </div>
              </div>

              <button
                onClick={() => addToCartMutation.mutate(item._id)}
                disabled={addToCartMutation.isPending}
                className="p-2 rounded-md bg-white hover:bg-[#6F2935] text-gray-700 hover:text-white border border-[#E7E0D4] shadow-xs transition shrink-0 flex items-center justify-center cursor-pointer"
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
