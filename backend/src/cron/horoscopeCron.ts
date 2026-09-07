import cron from 'node-cron';
import { generateDailyHoroscopes } from '../services/horoscopeService';
import Horoscope from '../models/Horoscope';
import { logger } from '../utils/logger';

async function checkAndGenerateDailyHoroscope() {
  const today = new Date().toISOString().split('T')[0];
  try {
    const existing = await Horoscope.findOne({ date: today });
    if (!existing || !existing.data || Object.keys(existing.data).length === 0) {
      logger.info(`⚠️ Horoscope missing for today (${today}). Triggering background generation...`);
      generateDailyHoroscopes().catch(err => {
        logger.error(`❌ Error in background horoscope generation: ${err.message}`);
      });
    } else {
      logger.info(`✅ Horoscope for today (${today}) is already up to date.`);
    }
  } catch (err: any) {
    logger.error(`❌ Error checking daily horoscope: ${err.message}`);
  }
}

export function initHoroscopeCron() {
  logger.info('🕒 Initializing Horoscope Generation Cron Job (Runs daily at midnight + startup check)');

  // 1. Check immediately on server startup
  checkAndGenerateDailyHoroscope();

  // 2. Scheduled daily midnight run (00:00)
  cron.schedule('0 0 * * *', async () => {
    logger.info('🚀 Cron Triggered: Starting Daily Horoscope Generation (Midnight)');
    await generateDailyHoroscopes();
  });

  // 3. Hourly fallback check in case midnight trigger was missed (e.g. server down/reboot)
  cron.schedule('0 * * * *', async () => {
    await checkAndGenerateDailyHoroscope();
  });
}

