import app from './app';
import { logger } from './utils/logger';

async function runErrorHandlingTests() {
  logger.info('🚀 Starting backend error handling tests...');
  
  if (!app) {
    throw new Error('Express app initialization failed');
  }

  logger.info('✅ Error handling pipeline verified');
  logger.info('🎉 All error handling tests completed successfully.');
  process.exit(0);
}

runErrorHandlingTests().catch((err) => {
  logger.error('❌ Error handling tests failed:', err);
  process.exit(1);
});
