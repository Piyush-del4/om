'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Package,
  Clock,
  Upload,
  BarChart3,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Pencil,
  X,
  Layers,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function AdminShopPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Active Tab View: 'products' | 'orders' | 'analytics'
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');

  // Selected Order for Detail Modal (Phase 32 Customer Data Privacy)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Product Form States
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [priceInRupees, setPriceInRupees] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [specialOfferTitle, setSpecialOfferTitle] = useState('');
  const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
  const [offerExpiresAt, setOfferExpiresAt] = useState('');
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Handle Image Upload
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

  // Queries
  const { data: items, isLoading: loadingItems } = useQuery({
    queryKey: ['admin-shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await client.get('/shop/orders/all');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Mutations
  const addProductMutation = useMutation({
    mutationFn: async (payload: any) => client.post('/shop', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shop-items'] });
      setSuccessMsg('Product published successfully!');
      handleCancelEdit();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to add product');
      setSuccessMsg('');
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
      client.patch(`/shop/${id}`, payload),
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

  const deleteProductMutation = useMutation({
    mutationFn: async (itemId: string) => client.delete(`/shop/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shop-items'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to delete product');
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) =>
      client.patch(`/shop/orders/${orderId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      if (selectedOrder) {
        setSelectedOrder((prev: any) => (prev ? { ...prev, status } : null));
      }
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to update order status');
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
    setOfferExpiresAt(
      item.offerExpiresAt ? new Date(item.offerExpiresAt).toISOString().substring(0, 16) : ''
    );
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

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !priceInRupees) return;
    const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
    const offerPricePaise = offerPriceInRupees
      ? Math.round(parseFloat(offerPriceInRupees) * 100)
      : undefined;

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

  const filteredOrders =
    orders?.filter((order: any) => {
      const matchesStatus =
        orderStatusFilter === 'all'
          ? true
          : orderStatusFilter === 'paid'
          ? ['paid', 'shipped', 'delivered'].includes(order.status)
          : order.status === orderStatusFilter;

      const q = orderSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        order._id?.toLowerCase().includes(q) ||
        order.userId?.name?.toLowerCase().includes(q) ||
        order.userId?.email?.toLowerCase().includes(q) ||
        order.address?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    }) || [];

  const paidOrders = orders?.filter((order: any) => ['paid', 'shipped', 'delivered'].includes(order.status)) || [];
  const totalRevenuePaise = paidOrders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const totalRevenueRupees = totalRevenuePaise / 100;

  const productPerformanceMap: Record<
    string,
    { title: string; price: number; unitsSold: number; totalRevenue: number; hasOffer: boolean }
  > = {};

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
    order.items?.forEach((item: any) => {
      const matchingItem = items?.find(
        (invItem: any) => invItem.title === item.title || invItem._id === item.itemId
      );
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

  const productPerformanceList = Object.values(productPerformanceMap).sort(
    (a, b) => b.unitsSold - a.unitsSold
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in min-w-0">
      {/* Page Title & Responsive Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" /> Shop & Inventory Control
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage product catalog, inventory counts, customer orders, and sales performance.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" /> Products ({activeItems.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-600" /> Orders ({orders?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-600" /> Sales Sheet
          </button>
        </div>
      </div>

      {/* TAB 1: PRODUCTS & INVENTORY */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Product Form (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                  {editingItemId ? (
                    <Pencil className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Plus className="w-4 h-4 text-amber-600" />
                  )}
                  {editingItemId ? 'Edit Shop Product' : 'Add New Product'}
                </h3>
                {editingItemId && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
              </div>

              {successMsg && (
                <div className="p-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleCreateProduct} className="space-y-4">
                {/* Basic Info */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                    Basic Information
                  </span>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Product Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Energized Shaligram Stone"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Product details, origin & usage..."
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                    Pricing & Offers
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-gray-700">Price (INR) *</label>
                      <input
                        type="number"
                        value={priceInRupees}
                        onChange={(e) => setPriceInRupees(e.target.value)}
                        required
                        placeholder="e.g. 500"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-gray-700">Offer Price (INR)</label>
                      <input
                        type="number"
                        value={offerPriceInRupees}
                        onChange={(e) => setOfferPriceInRupees(e.target.value)}
                        placeholder="e.g. 350"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-gray-700">Offer Title</label>
                      <input
                        type="text"
                        value={specialOfferTitle}
                        onChange={(e) => setSpecialOfferTitle(e.target.value)}
                        placeholder="Festive Discount"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-gray-700">Offer Expiry</label>
                      <input
                        type="datetime-local"
                        value={offerExpiresAt}
                        onChange={(e) => setOfferExpiresAt(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                    Inventory & Availability
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-gray-800">In Stock</span>
                    </label>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-gray-700">Pieces Left</label>
                      <input
                        type="number"
                        min="0"
                        value={stockCount}
                        onChange={(e) => setStockCount(e.target.value)}
                        placeholder="Unlimited if blank"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                    Product Images
                  </span>
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {images.map((url, idx) => (
                        <div key={idx} className="relative group border border-gray-200 rounded-xl overflow-hidden h-14 w-full bg-gray-100">
                          <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative border border-dashed border-gray-300 hover:border-amber-500 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-amber-50/30 transition-colors cursor-pointer group text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors mb-1" />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900">
                      {isUploading ? 'Uploading...' : 'Click to Upload Product Images'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={addProductMutation.isPending || editProductMutation.isPending}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {editingItemId ? 'Update Product' : 'Publish Product'}
                </button>
              </form>
            </div>
          </div>

          {/* Catalog List (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-base font-bold text-gray-900">Catalog ({activeItems.length})</h3>

            {loadingItems ? (
              <p className="text-xs text-gray-600 animate-pulse">Loading catalog...</p>
            ) : activeItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeItems.map((item: any) => {
                  const isOutOfStock = item.inStock === false || item.stockCount === 0;
                  return (
                    <div
                      key={item._id}
                      onClick={() => handleStartEdit(item)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between space-y-3 ${
                        editingItemId === item._id
                          ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-500/20'
                          : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{item.title}</h4>
                          <p className="text-[11px] text-amber-600 font-bold">
                            ₹{(item.price / 100).toLocaleString()}
                          </p>
                          <span
                            className={`inline-block text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                              isOutOfStock
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                        <span className="text-[10px] text-gray-500 font-mono">
                          {item.images?.length || 1} media
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(item);
                            }}
                            className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-gray-100"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete product "${item.title}"?`)) {
                                deleteProductMutation.mutate(item._id);
                              }
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl space-y-2">
                <ShoppingBag className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs font-semibold text-gray-700">No products published</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Order Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by Order ID or customer name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="w-full sm:w-auto py-1.5 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid Orders</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Desktop Table + Mobile Cards */}
          {loadingOrders ? (
            <p className="text-xs text-gray-600 animate-pulse">Loading orders list...</p>
          ) : filteredOrders.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-600 font-mono text-[10px] uppercase tracking-wider">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {filteredOrders.map((order: any) => (
                      <tr key={order._id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-xs font-bold text-gray-900">
                          #{order._id.substring(order._id.length - 8).toUpperCase()}
                          <div className="text-[10px] text-gray-500 font-normal font-sans mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          {order.userId?.name || 'Customer'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-gray-800">
                            {order.items?.map((i: any) => i.title).join(', ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[9px] font-bold uppercase py-0.5 px-2.5 rounded-full ${
                              ['paid', 'shipped', 'delivered'].includes(order.status)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-amber-600 font-serif text-sm">
                          ₹{(order.totalAmount / 100).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-xl text-xs font-semibold transition-colors"
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Card View */}
              <div className="md:hidden space-y-3">
                {filteredOrders.map((order: any) => (
                  <div
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-3 cursor-pointer hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-gray-900">
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                          ['paid', 'shipped', 'delivered'].includes(order.status)
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-bold text-gray-900">{order.userId?.name || 'Customer'}</p>
                      <p className="text-gray-600 truncate">
                        {order.items?.map((i: any) => `${i.title} (x${i.quantity})`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-serif font-bold text-amber-600 text-sm">
                        ₹{(order.totalAmount / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl space-y-2">
              <Package className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-xs font-semibold text-gray-700">No shop orders found</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SALES SHEET */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                Gross Shop Revenues
              </span>
              <p className="text-2xl font-serif font-bold text-amber-600">
                ₹{totalRevenueRupees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                Paid Transactions
              </span>
              <p className="text-2xl font-serif font-bold text-gray-900">{paidOrders.length} Orders</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                Gross Units Sold
              </span>
              <p className="text-2xl font-serif font-bold text-gray-900">
                {paidOrders.reduce((sum: number, o: any) => sum + o.items.reduce((s: number, i: any) => s + (i.quantity || 0), 0), 0)} Units
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-gray-900">Product Performance Sheet</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-600 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Product Title</th>
                    <th className="py-3 px-4 text-right">Standard Price</th>
                    <th className="py-3 px-4 text-right">Units Sold</th>
                    <th className="py-3 px-4 text-right">Gross Revenues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-mono">
                  {productPerformanceList.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-4 text-gray-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-gray-900">{row.title}</td>
                      <td className="py-3 px-4 text-right">₹{row.price.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-bold text-gray-900">{row.unitsSold} units</td>
                      <td className="py-3 px-4 text-right font-bold text-amber-600">₹{row.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal (Phase 32 Customer Data Privacy) */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-fade-in border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="font-serif font-bold text-base text-gray-900">
                  #{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer PII Section */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200">
              <h4 className="font-bold text-xs text-gray-900 font-mono uppercase tracking-wider">
                Customer Information
              </h4>
              <p className="text-xs font-semibold text-gray-900">{selectedOrder.userId?.name || 'Customer'}</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{selectedOrder.userId?.email || 'N/A'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="font-mono">{selectedOrder.userId?.phone || 'N/A'}</span>
                </p>
                <p className="flex items-start gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line leading-relaxed">{selectedOrder.address}</span>
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-gray-900 font-mono uppercase tracking-wider">
                Items Purchased
              </h4>
              <div className="space-y-2 divide-y divide-gray-100">
                {selectedOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="pt-2 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-gray-900">{item.title}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-amber-600 font-serif">
                      ₹{(((item.price || 0) * (item.quantity || 1)) / 100).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfillment Status Control */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-900">Update Order Fulfillment Status</label>
              <select
                value={['shipped', 'delivered'].includes(selectedOrder.status) ? selectedOrder.status : 'pending'}
                onChange={(e) =>
                  updateOrderStatusMutation.mutate({ orderId: selectedOrder._id, status: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
