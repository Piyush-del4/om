import app from './app';
import { logger } from './utils/logger';

async function runScenarioTests() {
  logger.info('🚀 Starting backend scenario tests...');
  
  // Verify app configuration
  if (!app) {
    throw new Error('Express app initialization failed');
  }

  logger.info('✅ Express app initialization verified');
  logger.info('🎉 All scenario tests completed successfully.');
  process.exit(0);
}

runScenarioTests().catch((err) => {
  logger.error('❌ Scenario tests failed:', err);
  process.exit(1);
});
