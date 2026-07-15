import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { User } from '../modules/users/user.model';

let transporter: nodemailer.Transporter | null = null;

const isPlaceholder = (val: string) => {
  return !val || val.includes('your_') || val.includes('placeholder') || val.includes('xxxxxx');
};

const isSmtpConfigured = env.SMTP_HOST && 
                        env.SMTP_USER && 
                        env.SMTP_PASS && 
                        !isPlaceholder(env.SMTP_PASS);

// Initialize Nodemailer transporter if configuration is present and valid
if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, // True for port 465, false for other ports (587, etc.)
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
  logger.info('📧 Nodemailer Email service configured.');
} else {
  logger.warn('📧 Email configuration missing, incomplete, or using placeholders. Emails will be logged to console in development.');
}

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions): Promise<void> {
  const mailOptions = {
    from: env.EMAIL_FROM || 'noreply@omastrologyamc.com',
    to,
    subject,
    text,
    html,
  };

  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      logger.info(`📧 Email sent successfully to ${to} | Subject: "${subject}"`);
      return;
    } catch (error) {
      logger.error(`❌ Failed to send email to ${to}:`, error);
      if (env.NODE_ENV !== 'development') {
        throw error;
      }
      logger.info('⚠️ Falling back to console logging in development.');
    }
  }

  // Development Fallback
  logger.info('╔════════════════ [DEVELOPMENT EMAIL OUTbox] ════════════════');
  logger.info(`║ FROM:    ${mailOptions.from}`);
  logger.info(`║ TO:      ${mailOptions.to}`);
  logger.info(`║ SUBJECT: ${mailOptions.subject}`);
  logger.info('╟────────────────────────────────────────────────────────────');
  if (html) {
    logger.info(`║ HTML Content:\n${html}`);
  } else if (text) {
    logger.info(`║ Text Content:\n${text}`);
  }
  logger.info('╚════════════════════════════════════════════════════════════');
}

/**
 * Sends a password reset OTP email.
 */
export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  if (env.NODE_ENV === 'development') {
    logger.info(`🔑 [DEVELOPMENT] Password Reset OTP for ${email} is: ${otp}`);
  }
  const subject = 'Reset Your Password — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">OM Astrology AMC</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste,</p>
      <p>You have requested to reset your password. Please use the following One-Time Password (OTP) to complete the reset process:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #cc8f33; background-color: #fcfcfc; padding: 10px 20px; border: 1px dashed #cc8f33; border-radius: 4px;">${otp}</span>
      </div>
      <p><strong>This OTP is valid for 3 minutes only.</strong></p>
      <p>If you did not make this request, please ignore this email or contact support if you have concerns.</p>
      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Sends a registration OTP email.
 */
export async function sendRegisterOtpEmail(email: string, otp: string): Promise<void> {
  if (env.NODE_ENV === 'development') {
    logger.info(`🔑 [DEVELOPMENT] Registration OTP for ${email} is: ${otp}`);
  }
  const subject = 'Verify Your Email Address — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">OM Astrology AMC</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste,</p>
      <p>Thank you for creating an account with OM Astrology AMC. Please use the following One-Time Password (OTP) to complete the registration process:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #cc8f33; background-color: #fcfcfc; padding: 10px 20px; border: 1px dashed #cc8f33; border-radius: 4px;">${otp}</span>
      </div>
      <p><strong>This OTP is valid for 3 minutes only.</strong></p>
      <p>If you did not initiate this request, please ignore this email.</p>
      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Sends a booking confirmation email.
 */
export async function sendAppointmentEmail(email: string, details: { name: string; typeName: string; scheduledAt: Date }): Promise<void> {
  const subject = 'Appointment Confirmed — OM Astrology AMC';
  const localTime = new Date(details.scheduledAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">Appointment Confirmed</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste ${details.name},</p>
      <p>Your appointment has been successfully scheduled. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.typeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Date & Time:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${localTime} (IST)</td>
        </tr>
      </table>

      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Sends an email when an appointment's status is changed (e.g. cancelled/confirmed).
 */
export async function sendAppointmentStatusEmail(email: string, details: { name: string; typeName: string; scheduledAt: Date; status: string }): Promise<void> {
  const subject = `Appointment ${details.status.toUpperCase()} — OM Astrology AMC`;
  const localTime = new Date(details.scheduledAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">Appointment Status Update</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste ${details.name},</p>
      <p>The status of your appointment for <strong>${details.typeName}</strong> on <strong>${localTime} (IST)</strong> has been updated to:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 20px; font-weight: bold; text-transform: uppercase; color: ${details.status === 'confirmed' ? 'green' : 'red'}; background-color: #fdfdfd; padding: 8px 16px; border: 1px solid ${details.status === 'confirmed' ? 'green' : 'red'}; border-radius: 4px;">${details.status}</span>
      </div>
      <p>If you have any questions or did not authorize this change, please contact our support team immediately.</p>
      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Sends a batch enrollment confirmation email.
 */
export async function sendEnrollmentEmail(email: string, details: { name: string; batchTitle: string; method: string }): Promise<void> {
  const subject = 'Batch Enrollment Confirmed — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">Batch Enrollment Confirmed</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste ${details.name},</p>
      <p>Congratulations! You have been successfully enrolled in the batch: <strong>${details.batchTitle}</strong>.</p>
      <p>Enrollment Method: <strong>${details.method === 'payment' ? 'Online Payment' : details.method === 'join' ? 'Direct Join' : 'Access Code'}</strong></p>
      <p>You can now access all lectures and PDF notes from your Student Dashboard.</p>
      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Sends a shop order invoice receipt.
 */
export async function sendOrderReceiptEmail(email: string, details: { name: string; orderId: string; totalAmount: number; items: any[] }): Promise<void> {
  const subject = 'Order Invoice — OM Astrology AMC';
  const amountInRupees = (details.totalAmount / 100).toFixed(2);
  const itemsHtml = details.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price / 100).toFixed(2)}</td>
    </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cc8f33; border-radius: 8px;">
      <h2 style="color: #cc8f33; text-align: center;">OM Astrology AMC Invoice</h2>
      <hr style="border-top: 1px solid #cc8f33;" />
      <p>Namaste ${details.name},</p>
      <p>Thank you for shopping with us! Your order <strong>#${details.orderId}</strong> has been confirmed. Here is your invoice:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f9f9f9;">
            <th style="padding: 8px; border-bottom: 2px solid #cc8f33; text-align: left;">Item</th>
            <th style="padding: 8px; border-bottom: 2px solid #cc8f33; text-align: center;">Qty</th>
            <th style="padding: 8px; border-bottom: 2px solid #cc8f33; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding: 8px; font-weight: bold; text-align: right;">Grand Total:</td>
            <td style="padding: 8px; font-weight: bold; text-align: right; color: #cc8f33;">₹${amountInRupees}</td>
          </tr>
        </tbody>
      </table>
      
      <p>We will dispatch your order soon and send tracking details once shipped.</p>
      <br />
      <p>Warm regards,<br />OM Astrology AMC Team</p>
    </div>
  `;
  await sendEmail({ to: email, subject, html });
}

/**
 * Gets all registered admin emails.
 */
async function getAdminEmails(): Promise<string[]> {
  try {
    const admins = await User.find({ role: 'admin' }, 'email');
    return admins.map(admin => admin.email);
  } catch (error) {
    logger.error('❌ Failed to retrieve admin emails:', error);
    return [];
  }
}

/**
 * Sends a notification email to all admins when a new appointment is booked.
 */
export async function sendAppointmentAdminNotification(details: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  typeName: string;
  scheduledAt: Date;
}): Promise<void> {
  const adminEmails = await getAdminEmails();
  if (adminEmails.length === 0) return;

  const localTime = new Date(details.scheduledAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subject = '🔔 [ALERT] New Appointment Booked — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #d9534f; border-radius: 8px;">
      <h2 style="color: #d9534f; text-align: center; margin-top: 0;">New Appointment Booking Alert</h2>
      <hr style="border-top: 1px solid #d9534f;" />
      <p>A new appointment has been scheduled on the platform. Details below:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Client Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userPhone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.typeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Date & Time:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${localTime} (IST)</td>
        </tr>
      </table>
      <div style="background-color: #fcf8e3; border: 1px solid #faebcc; color: #8a6d3b; padding: 10px; border-radius: 4px; font-size: 14px; text-align: center;">
        Please make sure the consultant/astrologer is notified and ready at the scheduled time.
      </div>
    </div>
  `;

  for (const email of adminEmails) {
    await sendEmail({ to: email, subject, html });
  }
}

/**
 * Sends a notification email to all admins when a shop purchase is finalized.
 */
export async function sendPurchaseAdminNotification(details: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  orderId: string;
  totalAmount: number;
  items: any[];
  address: any;
}): Promise<void> {
  const adminEmails = await getAdminEmails();
  if (adminEmails.length === 0) return;

  const amountInRupees = (details.totalAmount / 100).toFixed(2);
  const itemsHtml = details.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price / 100).toFixed(2)}</td>
    </tr>`
    )
    .join('');

  const addr = details.address || {};
  const shippingAddressHtml = `
    ${addr.fullName || details.userName}<br/>
    ${addr.flatHouse || ''}, ${addr.areaStreet || ''}<br/>
    ${addr.landmark ? `Landmark: ${addr.landmark}<br/>` : ''}
    ${addr.townCity || ''}, ${addr.state || ''} - ${addr.pincode || ''}<br/>
    Country: ${addr.country || 'India'}<br/>
    Phone: ${addr.phone || details.userPhone || 'Not provided'}
  `;

  const subject = '🔔 [ALERT] New Shop Purchase Order — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #5cb85c; border-radius: 8px;">
      <h2 style="color: #5cb85c; text-align: center; margin-top: 0;">New Order Invoice Alert</h2>
      <hr style="border-top: 1px solid #5cb85c;" />
      <p>A new shop order has been paid and confirmed. Order details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Order ID:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #5cb85c;">#${details.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Buyer Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userName} (${details.userEmail})</td>
        </tr>
      </table>

      <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;">Shipping & Delivery Address</h3>
      <p style="background-color: #f9f9f9; padding: 12px; border-left: 4px solid #5cb85c; line-height: 1.5; font-size: 14px; margin: 10px 0;">
        ${shippingAddressHtml}
      </p>

      <h3 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;">Ordered Items</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <thead>
          <tr style="background-color: #f9f9f9;">
            <th style="padding: 8px; border-bottom: 2px solid #5cb85c; text-align: left;">Item</th>
            <th style="padding: 8px; border-bottom: 2px solid #5cb85c; text-align: center;">Qty</th>
            <th style="padding: 8px; border-bottom: 2px solid #5cb85c; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding: 8px; font-weight: bold; text-align: right;">Grand Total Paid:</td>
            <td style="padding: 8px; font-weight: bold; text-align: right; color: #5cb85c; font-size: 16px;">₹${amountInRupees}</td>
          </tr>
        </tbody>
      </table>
      
      <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #31708f; padding: 10px; border-radius: 4px; font-size: 14px; text-align: center; margin-top: 20px;">
        Please prepare this order for shipping and update the status in the Admin dashboard once dispatched.
      </div>
    </div>
  `;

  for (const email of adminEmails) {
    await sendEmail({ to: email, subject, html });
  }
}

/**
 * Sends a notification email to all admins when a new user enrolls in a batch.
 */
export async function sendBatchEnrollmentAdminNotification(details: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  batchTitle: string;
  method: string;
}): Promise<void> {
  const adminEmails = await getAdminEmails();
  if (adminEmails.length === 0) return;

  const subject = '🔔 [ALERT] New Batch Enrollment — OM Astrology AMC';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #5bc0de; border-radius: 8px;">
      <h2 style="color: #5bc0de; text-align: center; margin-top: 0;">New Batch Enrollment Alert</h2>
      <hr style="border-top: 1px solid #5bc0de;" />
      <p>A user has successfully enrolled in a batch. Details below:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Student Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Student Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Student Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.userPhone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Batch Title:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.batchTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Enrollment Method:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${details.method === 'payment' ? 'Online Payment' : details.method === 'join' ? 'Direct Join' : 'Access Code'}</td>
        </tr>
      </table>
    </div>
  `;

  for (const email of adminEmails) {
    await sendEmail({ to: email, subject, html });
  }
}

