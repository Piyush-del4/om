import { generateDailyHoroscopes } from './src/services/horoscopeService';
import { connectDB, disconnectDB } from './src/config/db';
import { env } from './src/config/env';

async function run() {
  await connectDB();
  console.log("Generating horoscopes manually...");
  await generateDailyHoroscopes();
  await disconnectDB();
  console.log("Done!");
}

run();
