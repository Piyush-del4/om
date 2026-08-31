import app from './app';
import { env } from './config/env';
import { connectDB, disconnectDB } from './config/db';
import { logger } from './utils/logger';
import { initHoroscopeCron } from './cron/horoscopeCron';
import { initBlogCron } from './cron/blogCron';

let server: any;

async function bootstrap() {
  // Connect to database
  await connectDB();

  const port = env.PORT;
  server = app.listen(port, () => {
    logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${port}`);
    initHoroscopeCron();
    initBlogCron();
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: any) => {
    logger.error('💥 Unhandled Rejection at Promise:', err);
    gracefulShutdown(1);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    logger.error('💥 Uncaught Exception thrown:', err);
    gracefulShutdown(1);
  });
}

async function gracefulShutdown(code: number = 0) {
  logger.info('🛑 Shutting down server gracefully...');
  
  if (server) {
    server.close(async () => {
      logger.info('🚪 HTTP server closed.');
      await disconnectDB();
      process.exit(code);
    });
  } else {
    await disconnectDB();
    process.exit(code);
  }

  // Force close after 10s if graceful shutdown hangs
  setTimeout(() => {
    logger.error('💥 Forced shutdown due to timeout.');
    process.exit(code);
  }, 10000);
}

// Graceful shutdown signals
process.on('SIGTERM', () => {
  logger.info('📥 SIGTERM received.');
  gracefulShutdown(0);
});

process.on('SIGINT', () => {
  logger.info('📥 SIGINT received.');
  gracefulShutdown(0);
});

// Run bootstrap
bootstrap();
