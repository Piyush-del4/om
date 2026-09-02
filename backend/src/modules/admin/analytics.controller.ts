import { Request, Response } from 'express';
import { Order } from '../shop/order.model';
import { Appointment } from '../appointments/appointment.model';
import { Enrolment } from '../batches/enrolment.model';
import { User } from '../users/user.model';
import KundliSubmission from '../../models/KundliSubmission';

export const getRevenueAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch IDs of all admin accounts so admin test actions/submissions are excluded from earnings
    const adminUserIds = await User.find({ role: 'admin' }).distinct('_id');

    // 1. Shop Orders Revenue (excluding admin test orders)
    const paidOrders = await Order.find({ status: 'paid', userId: { $nin: adminUserIds } });
    const shopRevenuePaise = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // 2. Appointments Revenue (excluding admin appointments)
    const paidAppointments = await Appointment.find({ status: { $in: ['confirmed', 'completed'] }, userId: { $nin: adminUserIds } });
    const appointmentRevenuePaise = paidAppointments.reduce((sum, a) => sum + ((a as any).pricePaid || (a as any).amount || 0), 0);

    // 3. Batch Enrollments Revenue (excluding admin enrollments)
    const paidEnrolments = await Enrolment.find({ method: 'payment', userId: { $nin: adminUserIds } }).populate('batchId', 'price offerPrice');
    const batchRevenuePaise = paidEnrolments.reduce((sum, e: any) => {
      const b = e.batchId;
      const activePrice = b ? (b.offerPrice || b.price || 0) : 0;
      return sum + activePrice;
    }, 0);

    // 4. Premium Kundli Generation Purchases (Standard ₹50 / ₹99 per Kundli report, excluding Admin Kundlis)
    const kundliSubmissions = await KundliSubmission.find({ userId: { $nin: adminUserIds } });
    const KUNDLI_REPORT_PRICE_PAISE = 5000; // ₹50 per report
    const kundliRevenuePaise = kundliSubmissions.length * KUNDLI_REPORT_PRICE_PAISE;

    // 5. Overall Totals
    const totalRevenuePaise = shopRevenuePaise + appointmentRevenuePaise + batchRevenuePaise + kundliRevenuePaise;

    // 6. Monthly Trend Data (Last 6 Months) for all streams
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth();

      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

      // Monthly Shop
      const monthOrders = await Order.find({
        status: 'paid',
        userId: { $nin: adminUserIds },
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });
      const shopSales = Math.round(monthOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / 100);

      // Monthly Consultations
      const monthAppointments = await Appointment.find({
        status: { $in: ['confirmed', 'completed'] },
        userId: { $nin: adminUserIds },
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });
      const appointments = Math.round(monthAppointments.reduce((sum, a) => sum + ((a as any).pricePaid || 0), 0) / 100);

      // Monthly Batches
      const monthEnrolments = await Enrolment.find({
        method: 'payment',
        userId: { $nin: adminUserIds },
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }).populate('batchId', 'price offerPrice');
      const batches = Math.round(monthEnrolments.reduce((sum, e: any) => sum + (e.batchId ? (e.batchId.offerPrice || e.batchId.price || 0) : 0), 0) / 100);

      // Monthly Kundlis (excluding admin submissions)
      const monthKundlis = await KundliSubmission.find({
        userId: { $nin: adminUserIds },
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });
      const kundlis = Math.round((monthKundlis.length * KUNDLI_REPORT_PRICE_PAISE) / 100);

      const monthName = d.toLocaleString('en-US', { month: 'short' });

      monthlyTrend.push({
        month: `${monthName} ${year}`,
        shopSales,
        appointments,
        batches,
        kundlis,
        total: shopSales + appointments + batches + kundlis,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalRevenueRupees: Math.round(totalRevenuePaise / 100),
        shopRevenueRupees: Math.round(shopRevenuePaise / 100),
        appointmentRevenueRupees: Math.round(appointmentRevenuePaise / 100),
        batchRevenueRupees: Math.round(batchRevenuePaise / 100),
        kundliRevenueRupees: Math.round(kundliRevenuePaise / 100),
        totalOrdersCount: paidOrders.length,
        totalAppointmentsCount: paidAppointments.length,
        totalEnrolmentsCount: paidEnrolments.length,
        totalKundliCount: kundliSubmissions.length,
        monthlyTrend,
      },
    });
  } catch (error: any) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Failed to compute revenue analytics.' });
  }
};

export const exportAccountingCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminUserIds = await User.find({ role: 'admin' }).distinct('_id');
    const paidOrders = await Order.find({ status: 'paid', userId: { $nin: adminUserIds } }).populate('userId', 'name email');

    let csvContent = 'Order ID,Customer Name,Customer Email,Total Amount (INR),Payment ID,Date,Status\n';

    paidOrders.forEach((o: any) => {
      const id = o._id.toString();
      const name = `"${o.userId?.name || 'Customer'}"`;
      const email = o.userId?.email || 'N/A';
      const amount = (o.totalAmount / 100).toFixed(2);
      const paymentId = o.razorpayPaymentId || 'N/A';
      const date = new Date(o.createdAt).toISOString().split('T')[0];
      const status = o.status;

      csvContent += `${id},${name},${email},${amount},${paymentId},${date},${status}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="financial_accounting_report.csv"');
    res.status(200).send(csvContent);
  } catch (error: any) {
    console.error('CSV Export Error:', error);
    res.status(500).json({ success: false, message: 'Failed to export accounting report.' });
  }
};
