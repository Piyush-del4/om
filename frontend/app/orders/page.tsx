'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { UserPanelShell } from '@/components/user/UserPanelShell';
import { DownloadInvoiceButton } from '@/components/ui/DownloadInvoiceButton';
import { ShoppingBag, Truck, Package, Clock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();

  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const res = await client.get('/shop/orders/me');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  return (
    <UserPanelShell
      activeTab="orders"
      title="My Store Orders & Receipts"
      subtitle="Track shipment progress, view purchase details, and download tax invoices for your shop orders."
    >
      <div className="space-y-6 max-w-5xl">
        {loadingOrders ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center">
            <Package className="w-8 h-8 text-amber-500 mx-auto animate-bounce mb-3" />
            <p className="text-gray-500 text-xs animate-pulse font-mono">Loading purchase ledger...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: any) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              // Status step determination
              const statuses = ['processing', 'shipped', 'delivered'];
              const currentStep =
                order.orderStatus === 'delivered' ? 3 : order.orderStatus === 'shipped' ? 2 : 1;

              return (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 hover:border-amber-400/60 transition-colors"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{orderDate}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
                        {order.items?.length || 0} items • Total: ₹
                        {(order.totalAmount / 100).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
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

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        Payment: {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Stepper */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3 font-mono">
                      Shipment Tracking Status
                    </p>
                    <div className="flex items-center justify-between max-w-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <span className="text-xs font-bold text-gray-900">Order Placed</span>
                      </div>
                      <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} />

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {currentStep >= 2 ? '✓' : '2'}
                        </div>
                        <span className={`text-xs ${currentStep >= 2 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
                          Shipped
                        </span>
                      </div>
                      <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-200'}`} />

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {currentStep >= 3 ? '✓' : '3'}
                        </div>
                        <span className={`text-xs ${currentStep >= 3 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="space-y-3">
                    {order.items.map((item: any) => {
                      const product = item.itemId;
                      return (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                        >
                          {product?.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.title || 'Product'}
                              className="w-12 h-12 rounded-xl object-cover bg-white flex-shrink-0 border border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                              <ShoppingBag className="w-5 h-5 text-amber-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-gray-900 truncate">
                              {product?.title || item.title || 'Product Item'}
                            </h4>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {item.quantity} x ₹{((item.price || 0) / 100).toLocaleString()}
                            </p>
                          </div>
                          <p className="font-mono font-bold text-sm text-gray-900">
                            ₹{(((item.price || 0) * item.quantity) / 100).toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Shipping Destination */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="font-light">
                        Destination:{' '}
                        {typeof order.address === 'object'
                          ? `${order.address?.street || ''}, ${order.address?.townCity || ''} ${order.address?.pincode || ''}`
                          : order.address}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
            <Package className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-gray-800">No Orders Placed Yet</h3>
              <p className="text-gray-500 text-xs">Explore our spiritual shop for gemstones, yantras, and reports.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>Browse Shop Store</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </UserPanelShell>
  );
}
