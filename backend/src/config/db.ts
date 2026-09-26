import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';
import { logger } from '../utils/logger';

// Force Node to use Google/Cloudflare DNS for resolving mongodb+srv:// SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Fallback if system DNS lock exists
}

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

    try {
      await mongoose.connect(env.MONGODB_URI, { 
        serverSelectionTimeoutMS: 10000,
        tlsAllowInvalidCertificates: env.NODE_ENV === 'development',
      });
    } catch (primaryErr: any) {
      logger.warn(`⚠️ Primary MongoDB Atlas connection failed (${primaryErr.message}). Trying local MongoDB fallback...`);
      const localUri = process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/om-astrology';
      await mongoose.connect(localUri, { 
        serverSelectionTimeoutMS: 5000,
        tlsAllowInvalidCertificates: env.NODE_ENV === 'development',
      });
    }
    await seedDefaultAppointmentTypes();
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB on startup:', error);
    logger.warn('⚠️ Server will exit so it can restart properly.');
    process.exit(1);
  }
}

async function seedDefaultAppointmentTypes(): Promise<void> {
  try {
    const { AppointmentType } = require('../modules/appointments/appointmentType.model');
    const defaults = [
      {
        name: 'Corporate Numerology Consultation',
        category: 'Numerology',
        price: 310000, // in paise
        duration: 60,
        description: 'Corporate branding, spelling total optimization for company name, logo matching, and lucky incorporation date selection.',
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
