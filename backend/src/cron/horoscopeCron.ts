import cron from 'node-cron';
import { generateDailyHoroscopes } from '../services/horoscopeService';
import { logger } from '../utils/logger';

// Run every midnight (00:00)
export function initHoroscopeCron() {
  logger.info('🕒 Initializing Horoscope Generation Cron Job (Runs daily at midnight)');
  
  cron.schedule('0 0 * * *', async () => {
    logger.info('🚀 Cron Triggered: Starting Daily Horoscope Generation');
    await generateDailyHoroscopes();
  });
}
