import cron from 'node-cron';
import { generateAndSaveBlog } from '../services/blogService';
import Blog from '../models/Blog';
import { logger } from '../utils/logger';

async function checkAndGenerateBlog() {
  try {
    const totalBlogs = await Blog.countDocuments({ isPublished: true });
    if (totalBlogs === 0) {
      logger.info('⚠️ No published blogs found on startup. Triggering initial blog generation...');
      generateAndSaveBlog().catch(err => {
        logger.error(`❌ Error in background blog generation: ${err.message}`);
      });
      return;
    }

    const latestBlog = await Blog.findOne({ isPublished: true }).sort({ publishedAt: -1 });
    if (latestBlog && latestBlog.publishedAt) {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      if (new Date(latestBlog.publishedAt) < threeDaysAgo) {
        logger.info(`⚠️ Latest blog is older than 3 days (${latestBlog.publishedAt}). Triggering auto blog generation...`);
        generateAndSaveBlog().catch(err => {
          logger.error(`❌ Error in background blog generation: ${err.message}`);
        });
      } else {
        logger.info(`✅ Blog content is up to date (Total: ${totalBlogs}, Latest: "${latestBlog.title}").`);
      }
    }
  } catch (err: any) {
    logger.error(`❌ Error checking blog status: ${err.message}`);
  }
}

export function initBlogCron() {
  logger.info('📝 Initializing Blog Generation Cron Job (Runs Mon/Wed/Fri at 6AM IST + startup check)');

  // 1. Check immediately on startup
  checkAndGenerateBlog();

  // 2. Scheduled Mon, Wed, Fri at 6:00 AM IST (00:30 UTC)
  cron.schedule('30 0 * * 1,3,5', async () => {
    logger.info('🚀 Blog Cron Triggered: Starting auto blog generation');
    try {
      await generateAndSaveBlog();
      logger.info('✅ Blog Cron: Blog generated successfully');
    } catch (err: any) {
      logger.error(`❌ Blog Cron: Error — ${err.message}`);
    }
  });

  // 3. Daily backup check (every 12 hours) to ensure blog content never stagnates
  cron.schedule('0 */12 * * *', async () => {
    await checkAndGenerateBlog();
  });
}

