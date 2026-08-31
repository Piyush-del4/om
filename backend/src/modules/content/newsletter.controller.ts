import { Request, Response } from 'express';
import { Newsletter } from './newsletter.model';

export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, message: 'Valid email address is required.' });
      return;
    }

    await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), isActive: true },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to OM Astrology AMC Newsletter!',
    });
  } catch (error: any) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe.' });
  }
};
