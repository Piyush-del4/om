'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ShoppingBag, Plus, Trash2, ArrowLeft, Package, Clock, CreditCard, ChevronRight, Upload, BarChart3, Download, DollarSign } from 'lucide-react';

export default function AdminShopPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
 
  // Create Product States
  const [title, setTitle] = useState('');
  const [priceInRupees, setPriceInRupees] = useState('');
  const [description, setDescription] = useState('');
  const [viewMode, setViewMode] = useState<'orders' | 'analytics'>('orders');
  const [images, setImages] = useState<string[]>([]);
  const [specialOfferTitle, setSpecialOfferTitle] = useState('');
  const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
  const [offerExpiresAt, setOfferExpiresAt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
 
    setIsUploading(true);
    setErrorMsg('');
    const uploadedUrls: string[] = [];
 
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'products');
 
        const res = await client.post('/uploads', formData);
        if (res.data?.success) {
          uploadedUrls.push(res.data.data.url);
        } else {
          setErrorMsg('Upload failed for one of the images');
        }
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };
 
  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) router.push('/login');
      else if (user?.role !== 'admin') router.push('/dashboard');
    }
  }, [user, isAuthenticated, isLoading, router]);
 
  // Fetch Inventory items
  const { data: items, isLoading: loadingItems } = useQuery({
    queryKey: ['admin-shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });
 
  // Fetch All Orders
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await client.get('/shop/orders/all');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });
 
  // Add Product Mutation
  const addProductMutation = useMutation({
    mutationFn: async (payload: any) => {
      return client.post('/shop', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shop-items'] });
      setSuccessMsg('Product added successfully!');
      handleCancelEdit();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to add product');
      setSuccessMsg('');
    },
  });
 
  // Edit Product Mutation
  const editProductMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return client.patch(`/shop/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shop-items'] });
      setSuccessMsg('Product updated successfully!');
      handleCancelEdit();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to update product');
      setSuccessMsg('');
    },
  });
 
  const handleStartEdit = (item: any) => {
    setEditingItemId(item._id);
    setTitle(item.title);
    setPriceInRupees((item.price / 100).toString());
    setDescription(item.description || '');
    setImages(item.images || (item.imageUrl ? [item.imageUrl] : []));
    setSpecialOfferTitle(item.specialOfferTitle || '');
    setOfferPriceInRupees(item.offerPrice ? (item.offerPrice / 100).toString() : '');
    setOfferExpiresAt(item.offerExpiresAt ? new Date(item.offerExpiresAt).toISOString().substring(0, 16) : '');
    setInStock(item.inStock !== undefined ? item.inStock : true);
    setStockCount(item.stockCount !== undefined && item.stockCount !== null ? item.stockCount.toString() : '');
    setErrorMsg('');
    setSuccessMsg('');
  };
 
  const handleCancelEdit = () => {
    setEditingItemId(null);
    setTitle('');
    setPriceInRupees('');
    setDescription('');
    setImages([]);
    setSpecialOfferTitle('');
    setOfferPriceInRupees('');
    setOfferExpiresAt('');
    setInStock(true);
    setStockCount('');
    setErrorMsg('');
    setSuccessMsg('');
  };
 
  // Delete Product Mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.delete(`/shop/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shop-items'] });
      alert('Product deleted successfully');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to delete product');
    },
  });
 
  // Update Order Status Mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return client.patch(`/shop/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      alert('Order status updated!');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to update order status');
    },
  });
 
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !priceInRupees) return;
    const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
    const offerPricePaise = offerPriceInRupees ? Math.round(parseFloat(offerPriceInRupees) * 100) : undefined;
    
    const payload = {
      title,
      price: pricePaise,
      description,
      imageUrl: images[0] || '',
      images,
      specialOfferTitle: specialOfferTitle || undefined,
      offerPrice: offerPricePaise,
      offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt).toISOString() : undefined,
      inStock,
      stockCount: stockCount.trim() !== '' ? parseInt(stockCount) : null,
    };
 
    if (editingItemId) {
      editProductMutation.mutate({ id: editingItemId, payload });
    } else {
      addProductMutation.mutate(payload);
    }
  };
 
  const activeItems = items?.filter((item: any) => !item.isDeleted) || [];

  // Calculate Shop Analytics
  const paidOrders = orders?.filter((order: any) => ['paid', 'shipped', 'delivered'].includes(order.status)) || [];
  const totalRevenuePaise = paidOrders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const totalRevenueRupees = totalRevenuePaise / 100;
  
  // Aggregate sales per product
  const productPerformanceMap: Record<string, { title: string; price: number; unitsSold: number; totalRevenue: number; hasOffer: boolean }> = {};
  
  items?.forEach((item: any) => {
    productPerformanceMap[item._id] = {
      title: item.title,
      price: item.price / 100,
      unitsSold: 0,
      totalRevenue: 0,
      hasOffer: !!item.offerPrice,
    };
  });

  paidOrders.forEach((order: any) => {
    order.items.forEach((item: any) => {
      // Find matching item by title or ID
      const matchingItem = items?.find((invItem: any) => invItem.title === item.title || invItem._id === item.itemId);
      const pid = matchingItem?._id || item.itemId || item.title;

      if (!productPerformanceMap[pid]) {
        productPerformanceMap[pid] = {
          title: item.title,
          price: item.price / 100,
          unitsSold: 0,
          totalRevenue: 0,
          hasOffer: false,
        };
      }
      productPerformanceMap[pid].unitsSold += item.quantity || 0;
      productPerformanceMap[pid].totalRevenue += ((item.price || 0) * (item.quantity || 0)) / 100;
    });
  });

  const productPerformanceList = Object.values(productPerformanceMap).sort((a, b) => b.unitsSold - a.unitsSold);

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">Verifying Admin Privileges...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={() => router.push('/admin/dashboard')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>

        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-[var(--gold)]" /> Shop & Inventory Control
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Product Form (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <GoldCard theme="dark" className="border border-[var(--gold-100)] p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-[var(--gold)] flex items-center gap-2">
                {editingItemId ? <Upload className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {editingItemId ? 'Edit Shop Product' : 'Add New Shop Product'}
              </h3>
 
              {successMsg && <div className="text-xs text-green-400 bg-green-950/20 p-3 border border-green-900/30 rounded-lg">{successMsg}</div>}
              {errorMsg && <div className="text-xs text-red-400 bg-red-950/20 p-3 border border-red-900/30 rounded-lg">{errorMsg}</div>}
 
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Product Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Shaligram Stone" className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Price (INR)</label>
                  <input type="number" value={priceInRupees} onChange={(e) => setPriceInRupees(e.target.value)} required placeholder="e.g. 500" className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Special Offer Title (Optional)</label>
                  <input type="text" value={specialOfferTitle} onChange={(e) => setSpecialOfferTitle(e.target.value)} placeholder="e.g. Diwali Sale" className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Offer Price (INR) (Optional)</label>
                  <input type="number" value={offerPriceInRupees} onChange={(e) => setOfferPriceInRupees(e.target.value)} placeholder="e.g. 350" className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Offer Expiry (Optional)</label>
                  <input type="datetime-local" value={offerExpiresAt} onChange={(e) => setOfferExpiresAt(e.target.value)} className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="space-y-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Product Images (Optional)</label>
                  
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {images.map((url, idx) => (
                        <div key={idx} className="relative group border border-neutral-800 rounded-lg overflow-hidden h-12 w-full bg-neutral-900 text-center">
                          <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 text-[9px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
 
                  <div className="relative border border-dashed border-[var(--gold-100)] hover:border-[var(--gold)] rounded-lg p-4 flex flex-col items-center justify-center bg-black/40 transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-[var(--gold)] transition-colors mb-2" />
                    <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors text-center">
                      {isUploading ? 'Uploading to Cloudinary...' : 'Click or Drag to Upload Images (Multiple)'}
                    </span>
                  </div>
                </div>
 
                {/* Stock Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="rounded border-[var(--gold-100)] text-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                    <label htmlFor="inStock" className="text-[10px] font-semibold uppercase tracking-wider text-gray-300 cursor-pointer">
                      In Stock
                    </label>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Pieces Left <span className="text-gray-500 normal-case">(optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      value={stockCount}
                      onChange={(e) => setStockCount(e.target.value)}
                      placeholder="Leave blank if unlimited"
                      className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
                    />
                  </div>
                </div>
 
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description..." rows={3} className="w-full bg-black/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
                </div>
 
                <div className="flex gap-2">
                  {editingItemId && (
                    <GoldButton type="button" variant="outlined" fullWidth onClick={handleCancelEdit} className="py-2 text-xs">
                      Cancel
                    </GoldButton>
                  )}
                  <GoldButton type="submit" variant="filled" fullWidth isLoading={addProductMutation.isPending || editProductMutation.isPending} className="py-2 text-xs">
                    {editingItemId ? 'Update Item' : 'Publish Item'}
                  </GoldButton>
                </div>
              </form>
            </GoldCard>
 
            {/* Inventory List */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-white">Inventory Items</h4>
              {loadingItems ? (
                <p className="text-gray-500 text-xs animate-pulse">Loading items...</p>
              ) : activeItems.length > 0 ? (
                <div className="space-y-2">
                  {activeItems.map((item: any) => {
                    const isOutOfStock = item.inStock === false || item.stockCount === 0;
                    return (
                      <div
                        key={item._id}
                        onClick={() => handleStartEdit(item)}
                        className={`p-3 border rounded-xl flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors ${
                          editingItemId === item._id
                            ? 'bg-[var(--gold-10)] border-[var(--gold)]'
                            : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white truncate">{item.title}</h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[var(--gold)]">₹{(item.price / 100).toLocaleString()}</span>
                            <span className="text-neutral-500 font-mono text-[9px]">•</span>
                            <span className={`font-semibold text-[9px] uppercase ${isOutOfStock ? 'text-red-500' : 'text-green-400'}`}>
                              {isOutOfStock
                                ? 'Out of Stock'
                                : item.stockCount !== undefined && item.stockCount !== null && item.stockCount > 0
                                  ? `In Stock (${item.stockCount} left)`
                                  : 'In Stock'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete product?')) deleteProductMutation.mutate(item._id);
                          }}
                          className="text-red-400 hover:text-red-300 p-1 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-[11px]">No products published.</p>
              )}
            </div>
          </div>          {/* Customer Orders & Analytics Section (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('orders')}
                  className={`flex items-center gap-1.5 py-2 px-4 text-xs font-semibold rounded-full border transition-all ${
                    viewMode === 'orders'
                      ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-10)]'
                      : 'border-neutral-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" /> Customer Orders
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('analytics')}
                  className={`flex items-center gap-1.5 py-2 px-4 text-xs font-semibold rounded-full border transition-all ${
                    viewMode === 'analytics'
                      ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-10)]'
                      : 'border-neutral-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" /> Alchemical Sales Sheet
                </button>
              </div>

              {viewMode === 'analytics' && (
                <div className="text-[10px] text-gray-500 font-mono">
                  Live Database Aggregations
                </div>
              )}
            </div>

            {viewMode === 'orders' ? (
              <>
                <h2 className="font-serif text-lg font-bold flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--gold)]" /> Customer Shop Orders
                </h2>
                {loadingOrders ? (
                  <p className="text-gray-400 text-xs animate-pulse">Loading orders...</p>
                ) : orders && orders.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/20">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-900/60 font-semibold text-gray-400">
                          <th className="py-3 px-4">Order Info</th>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">Items Ordered</th>
                          <th className="py-3 px-4">Delivery Address</th>
                          <th className="py-3 px-4">Payment</th>
                          <th className="py-3 px-4">Order Status</th>
                          <th className="py-3 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 text-gray-300">
                        {orders.map((order: any) => (
                          <tr key={order._id} className="hover:bg-neutral-900/20">
                            <td className="py-3.5 px-4 font-mono text-[10px] text-gray-400">
                              <div className="text-white font-bold">#{order._id.substring(order._id.length - 8)}</div>
                              <div className="text-[9px] text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">{order.userId?.name || 'Unknown'}</div>
                              <div className="text-[10px] text-gray-500 font-mono mt-0.5">{order.userId?.email || 'N/A'}</div>
                              <div className="text-[10px] text-[var(--gold)] font-mono">{order.userId?.phone || 'N/A'}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="space-y-1">
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="text-gray-300">
                                    {item.title || 'Unknown Product'} <strong className="text-white">x{item.quantity}</strong>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 min-w-[200px] whitespace-pre-line text-[11px] leading-relaxed">
                              {order.address}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                                ['paid', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-950/40 text-green-400 border border-green-900/30' : 'bg-yellow-950/40 text-yellow-400 border border-yellow-900/30'
                              }`}>
                                {['paid', 'shipped', 'delivered'].includes(order.status) ? 'PAID' : (order.status === 'failed' ? 'FAILED' : 'PENDING')}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={['shipped', 'delivered'].includes(order.status) ? order.status : 'pending'}
                                onChange={(e) => updateOrderStatusMutation.mutate({ orderId: order._id, status: e.target.value })}
                                className="bg-black border border-neutral-800 text-[10px] rounded-lg py-1 px-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--gold)] cursor-pointer"
                              >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right font-bold text-[var(--gold)]">
                              ₹{(order.totalAmount / 100).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs py-8 text-center bg-neutral-950/10 border border-dashed border-neutral-800 rounded-xl">No orders logs recorded.</p>
                )}
              </>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* Analytics Key Performance Indicators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-1">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Gross Revenues</p>
                    <p className="text-xl font-bold font-mono text-[var(--gold)]">
                      ₹{totalRevenueRupees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-1">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Completed Transactions</p>
                    <p className="text-xl font-bold font-mono text-white">
                      {paidOrders.length} Paid Orders
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-1">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Gross Items Sold</p>
                    <p className="text-xl font-bold font-mono text-white">
                      {paidOrders.reduce((sum: number, o: any) => sum + o.items.reduce((s: number, i: any) => s + (i.quantity || 0), 0), 0)} Units
                    </p>
                  </div>
                </div>

                {/* Spreadsheet View Container */}
                <div className="space-y-3">
                  <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                    Product Performance Sheet
                  </h3>
                  
                  <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/20">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-900/60 font-semibold text-gray-400">
                          <th className="py-2.5 px-4 font-mono">Row</th>
                          <th className="py-2.5 px-4">Product Title / Store Item</th>
                          <th className="py-2.5 px-4 text-right">Standard Price</th>
                          <th className="py-2.5 px-4 text-right">Total Units Sold</th>
                          <th className="py-2.5 px-4 text-right">Gross Revenues Generated</th>
                          <th className="py-2.5 px-4 text-center">Status / Promotion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 text-gray-300 font-mono text-[11px]">
                        {productPerformanceList.map((row: any, idx: number) => (
                          <tr key={idx} className="hover:bg-neutral-900/20">
                            <td className="py-3 px-4 text-gray-500">{idx + 1}</td>
                            <td className="py-3 px-4 font-sans font-semibold text-white">{row.title}</td>
                            <td className="py-3 px-4 text-right">₹{row.price.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-white font-bold">{row.unitsSold} units</td>
                            <td className="py-3 px-4 text-right text-[var(--gold)] font-bold">₹{row.totalRevenue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-center">
                              {row.hasOffer ? (
                                <span className="bg-red-950/40 text-red-400 border border-red-900/30 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Offer Active</span>
                              ) : (
                                <span className="text-gray-600 text-[10px]">Standard Store</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
