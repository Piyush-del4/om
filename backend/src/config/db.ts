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

    await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
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
