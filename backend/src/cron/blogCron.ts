import cron from 'node-cron';
import { generateAndSaveBlog } from '../services/blogService';
import { logger } from '../utils/logger';

// Run Mon, Wed, Fri at 6:00 AM IST (00:30 UTC)
export function initBlogCron() {
  logger.info('📝 Initializing Blog Generation Cron Job (Runs Mon/Wed/Fri at 6AM IST)');

  cron.schedule('30 0 * * 1,3,5', async () => {
    logger.info('🚀 Blog Cron Triggered: Starting auto blog generation');
    try {
      await generateAndSaveBlog();
      logger.info('✅ Blog Cron: Blog generated successfully');
    } catch (err: any) {
      logger.error(`❌ Blog Cron: Error — ${err.message}`);
    }
  });
}
