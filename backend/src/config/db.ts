import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

export async function connectDB(): Promise<void> {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('🔌 MongoDB connected successfully.');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('🔌 MongoDB disconnected.');
    });

    await mongoose.connect(env.MONGODB_URI);
    await seedDefaultAppointmentTypes();
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB on startup:', error);
    process.exit(1);
  }
}

async function seedDefaultAppointmentTypes(): Promise<void> {
  try {
    const { AppointmentType } = require('../modules/appointments/appointmentType.model');
    const defaults = [
      {
        name: 'Happy Profession & Career Guidance',
        category: 'Astrology',
        price: 150000, // in paise
        duration: 45,
        description: 'Specialized Vedic career chart reading mapping D1/D9 charts, Amatyakaraka placement, and dasha timelines for career growth.',
      },
      {
        name: 'Lucky Mobile Number Consultation',
        category: 'Numerology',
        price: 110000, // in paise
        duration: 30,
        description: 'Find your lucky mobile number aligned with your Driver/Conductor numbers to attract positive digital vibrations.',
      },
      {
        name: 'Corporate Numerology Consultation',
        category: 'Numerology',
        price: 310000, // in paise
        duration: 60,
        description: 'Corporate branding, spelling total optimization for company name, logo matching, and lucky incorporation date selection.',
      },
      {
        name: 'Marriage Matching Consultation',
        category: 'Astrology',
        price: 180000, // in paise
        duration: 45,
        description: 'Kundali Matching (Ashta Koota Milan) with deep 36 Gunas analysis, Manglik Dosha compatibility, and relationship longevity remedies.',
      },
    ];

    for (const item of defaults) {
      const exists = await AppointmentType.findOne({ name: item.name });
      if (!exists) {
        await AppointmentType.create(item);
        logger.info(`🌱 Seeded default appointment type: "${item.name}"`);
      }
    }
  } catch (err: any) {
    logger.error('⚠️ Failed to seed default appointment types:', err);
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('🔌 MongoDB disconnected gracefully.');
  } catch (error) {
    logger.error('❌ Error during MongoDB disconnection:', error);
  }
}
