'use client';

import React from 'react';
import { Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface InvoiceProps {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: any;
  items: OrderItem[];
  totalAmount: number; // in paise
  paymentId?: string;
  className?: string;
}

export function DownloadInvoiceButton({
  orderId,
  orderDate,
  customerName,
  customerEmail,
  customerPhone = '',
  address,
  items,
  totalAmount,
  paymentId = '',
  className = '',
}: InvoiceProps) {

  const handlePrintInvoice = () => {
    try {
      const invoiceWindow = window.open('', '_blank', 'width=800,height=900');
      if (!invoiceWindow) {
        toast.error('Please allow popups to download invoice.');
        return;
      }

      const totalRupees = (totalAmount / 100).toFixed(2);
      const subtotalRupees = ((totalAmount / 100) * 0.82).toFixed(2); // 18% GST calculation
      const gstRupees = ((totalAmount / 100) * 0.18).toFixed(2);

      const itemsHtml = items.map((item, idx) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-size: 13px;">${idx + 1}</td>
          <td style="padding: 10px; font-size: 13px; font-weight: 600;">${item.title}</td>
          <td style="padding: 10px; font-size: 13px; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; font-size: 13px; text-align: right;">₹${(item.price / 100).toFixed(2)}</td>
          <td style="padding: 10px; font-size: 13px; text-align: right; font-weight: 600;">₹${((item.price * item.quantity) / 100).toFixed(2)}</td>
        </tr>
      `).join('');

      const formattedAddress = address ? `
        ${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}<br/>
        <strong>Phone:</strong> ${address.phone || customerPhone || 'N/A'}
      ` : `${customerEmail}`;

      const invoiceContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Tax Invoice - ${orderId.slice(-6).toUpperCase()}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 0; padding: 40px; background: #fff; }
            .invoice-box { max-w-700px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .05); border-radius: 12px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-text { font-family: Georgia, serif; font-size: 22px; font-weight: bold; color: #5A3815; text-transform: uppercase; }
            .tax-badge { background: #fef9c3; border: 1px solid #fde047; color: #854d0e; padding: 4px 8px; font-size: 10px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
            .info-grid { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 13px; line-height: 1.6; }
            .table-box { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table-box th { background: #f8fafc; color: #475569; padding: 10px; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
            .totals { width: 250px; margin-left: auto; font-size: 13px; line-height: 1.8; }
            .totals div { display: flex; justify-content: space-between; }
            .totals .grand-total { font-size: 16px; font-weight: bold; color: #5A3815; border-top: 2px solid #b8860b; padding-top: 8px; margin-top: 8px; }
            .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <div>
                <div class="logo-text">OM ASTROLOGY AMC</div>
                <div style="font-size: 11px; color: #64748b;">Occult Science Web Platform</div>
              </div>
              <div style="text-align: right;">
                <span class="tax-badge">TAX INVOICE</span>
                <div style="font-size: 12px; font-weight: bold; margin-top: 6px;">#INV-${orderId.slice(-8).toUpperCase()}</div>
                <div style="font-size: 11px; color: #64748b;">Date: ${new Date(orderDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div class="info-grid">
              <div>
                <strong style="color: #5A3815;">Billed To:</strong><br/>
                ${customerName}<br/>
                ${customerEmail}<br/>
                ${formattedAddress}
              </div>
              <div style="text-align: right;">
                <strong style="color: #5A3815;">Payment Details:</strong><br/>
                <strong>Gateway:</strong> Razorpay Online<br/>
                <strong>Payment ID:</strong> ${paymentId || 'pay_' + orderId.slice(-10)}<br/>
                <strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">PAID</span>
              </div>
            </div>

            <table class="table-box">
              <thead>
                <tr>
                  <th>#</th>
                  <th style="text-align: left;">Item Description</th>
                  <th>Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="totals">
              <div><span>Subtotal (Excl. Tax):</span> <span>₹${subtotalRupees}</span></div>
              <div><span>GST (18% Included):</span> <span>₹${gstRupees}</span></div>
              <div class="grand-total"><span>Total Paid:</span> <span>₹${totalRupees}</span></div>
            </div>

            <div class="footer">
              This is a computer-generated digital tax invoice. Thank you for choosing OM Astrology AMC.
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `;

      invoiceWindow.document.write(invoiceContent);
      invoiceWindow.document.close();
    } catch (err) {
      console.error('Invoice generation error:', err);
      toast.error('Failed to generate invoice.');
    }
  };

  return (
    <button
      onClick={handlePrintInvoice}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition cursor-pointer shadow-xs ${className}`}
    >
      <FileText className="w-3.5 h-3.5 text-amber-700" />
      <span>Download Tax Invoice</span>
    </button>
  );
}
