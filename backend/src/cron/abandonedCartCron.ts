import { Cart } from '../modules/shop/cart.model';
import { User } from '../modules/users/user.model';
import { sendEmail } from '../services/email.service';
import { logger } from '../utils/logger';

export const processAbandonedCarts = async (): Promise<void> => {
  try {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    // Find carts modified > 2h ago with items that haven't received recovery email
    const abandonedCarts = await Cart.find({
      updatedAt: { $lt: twoHoursAgo },
      abandonedEmailSent: { $ne: true },
      'items.0': { $exists: true }, // Cart has at least 1 item
    }).populate('userId', 'name email').populate('items.itemId', 'title price');

    for (const cart of abandonedCarts) {
      const user = cart.userId as any;
      if (!user || !user.email) continue;

      const itemTitles = cart.items.map((i: any) => i.itemId?.title || 'Spiritual Item').join(', ');

      const subject = `🛒 You left items in your cart at OM Astrology AMC!`;
      const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAD5B8; border-radius: 12px;">
          <h2 style="color: #5A3815;">Namaste ${user.name || 'Seeker'},</h2>
          <p>We noticed you left <strong>${itemTitles}</strong> in your cart.</p>
          <p>Your spiritual items are reserved for a limited time. Complete your order today!</p>
          <div style="margin: 25px 0;">
            <a href="http://localhost:3000/shop/cart" style="background: #5A3815; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px;">Complete Order Now →</a>
          </div>
          <p style="font-size: 11px; color: #888;">If you need assistance, simply reply to this email.</p>
        </div>
      `;

      await sendEmail({ to: user.email, subject, html });
      cart.abandonedEmailSent = true;
      await cart.save();

      logger.info(`📧 Abandoned cart recovery email sent to ${user.email}`);
    }
  } catch (error) {
    logger.error('❌ Error processing abandoned carts:', error);
  }
};
