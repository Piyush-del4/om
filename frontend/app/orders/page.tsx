'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { ShoppingBag, Truck, Package, Clock, Eye } from 'lucide-react';
import { DownloadInvoiceButton } from '@/components/ui/DownloadInvoiceButton';

export default function OrdersPage() {
 const { isAuthenticated, isLoading } = useAuth();
 const router = useRouter();

 React.useEffect(() => {
 if (!isLoading && !isAuthenticated) router.push('/login');
 }, [isAuthenticated, isLoading, router]);

 const { data: orders, isLoading: loadingOrders } = useQuery({
 queryKey: ['my-orders'],
 queryFn: async () => {
 const res = await client.get('/shop/orders/me');
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 if (isLoading) return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Loading...</div>;

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-4xl mx-auto space-y-12 relative z-10">
 <div className="border-b border-[var(--gold-200)] pb-6 flex items-center justify-between">
 <div className="space-y-1">
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
 Alchemical Purchase Ledger
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
 <Package className="w-7 h-7 text-[var(--gold)]" /> My <span className="gold-gradient-text">Orders</span>
 </h1>
 </div>
 </div>

 {loadingOrders ? (
 <p className="text-gray-600 text-sm animate-pulse font-light">Loading transaction ledger...</p>
 ) : orders && orders.length > 0 ? (
 <div className="space-y-8">
 {orders.map((order: any) => {
 const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 });
 return (
 <GoldCard key={order._id} className="transition-spring">
 <div className="space-y-6">
 {/* Header: Order ID & Status */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200/60">
 <div>
 <p className="text-xs text-gray-450 font-light">Order ID: <span className="font-mono text-gray-900 text-xs">{order._id}</span></p>
 <p className="text-[11px] text-gray-500 font-mono mt-0.5">Placed on {orderDate}</p>
 </div>
 <div className="flex items-center gap-2.5">
 <DownloadInvoiceButton
    orderId={order._id}
    orderDate={order.createdAt}
    customerName="Customer"
    customerEmail=""
    address={typeof order.address === 'object' ? order.address : { street: order.address }}
    items={order.items.map((i: any) => ({
      title: i.itemId?.title || i.title || 'Product',
      quantity: i.quantity,
      price: i.price,
    }))}
    totalAmount={order.totalAmount}
    paymentId={order.razorpayPaymentId}
  />
 <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border ${
 order.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-500/20' : 'bg-yellow-50 text-yellow-600 border-yellow-500/20'
 }`}>
 Payment: {order.paymentStatus}
 </span>
 <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border ${
 order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600 border-green-500/20' :
 order.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-600 border-blue-500/20' :
 'bg-yellow-50 text-yellow-600 border-yellow-500/20'
 }`}>
 Status: {order.orderStatus}
 </span>
 </div>
 </div>

 {/* Order Items */}
 <div className="space-y-4">
 {order.items.map((item: any) => {
 const product = item.itemId;
 return (
 <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-100/40 border border-gray-200/60 rounded-xl transition-spring hover:border-[var(--gold-100)]">
 {product?.imageUrl ? (
 <img src={product.imageUrl} alt={product.title || 'Product'} className="w-12 h-12 rounded-lg object-cover bg-gray-50 flex-shrink-0 border border-gray-200" />
 ) : (
 <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-650 flex-shrink-0"><ShoppingBag className="w-5 h-5" /></div>
 )}
 <div className="flex-1 min-w-0">
 <h4 className="font-serif font-bold text-sm text-gray-900 truncate">{product?.title || 'Unknown Product'}</h4>
 <p className="text-gray-600 text-xs font-light mt-0.5">{item.quantity} x ₹{((item.price || 0) / 100).toLocaleString()}</p>
 </div>
 <p className="font-mono font-bold text-sm text-gray-900">₹{(((item.price || 0) * item.quantity) / 100).toLocaleString()}</p>
 </div>
 );
 })}
 </div>

 {/* Pricing and Shipping Details */}
 <div className="pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between gap-4 text-xs">
 <div className="space-y-1">
 <h5 className="font-bold text-gray-600 uppercase tracking-widest text-[10px] flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[var(--gold)]" /> Shipping Destination</h5>
 <p className="text-gray-600 max-w-xs leading-relaxed font-light">{order.address}</p>
 </div>
 <div className="text-right space-y-1 sm:self-end">
 <p className="text-gray-500 font-mono">Tax Details: ₹{(order.gstAmount / 100).toLocaleString()}</p>
 <p className="text-base font-bold text-gray-900">Total Value: <span className="text-[#e77600] font-mono">₹{(order.totalAmount / 100).toLocaleString()}</span></p>
 </div>
 </div>
 </div>
 </GoldCard>
 );
 })}
 </div>
 ) : (
 <div className="text-center py-24">
 <Package className="w-12 h-12 mx-auto mb-4 text-gray-600 animate-bounce" />
 <p className="text-gray-600 text-sm font-light">No order records located in our transaction ledger.</p>
 <Link href="/shop" className="text-[var(--gold)] hover:underline text-xs mt-3 inline-block uppercase font-bold tracking-wider">Explore Shop →</Link>
 </div>
 )}
 </div>
 </div>
 );
}
