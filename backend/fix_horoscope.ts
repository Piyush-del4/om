import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Horoscope from './src/models/Horoscope';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

async function fix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/om-astrology');
    console.log('Connected to DB');

    const today = new Date().toISOString().split('T')[0];
    const horoscope = await Horoscope.findOne({ date: today });
    
    if (horoscope) {
      let data = horoscope.data || {};
      
      const horoscopeJsonPath = path.join(__dirname, '../frontend/data/horoscope.json');
      const raw = fs.readFileSync(horoscopeJsonPath, 'utf-8');
      const parsed = JSON.parse(raw);
      const dummy = parsed.dummyPrediction;
      
      let updated = false;
      for (const sign of ZODIAC_SIGNS) {
        if (!data[sign]) {
          console.log(`Filling missing sign: ${sign}`);
          // Clone the dummy data to avoid reference issues and replace {Rashi}
          const signDummy = JSON.parse(JSON.stringify(dummy));
          signDummy.weekly.conclusion = signDummy.weekly.conclusion.replace('{Rashi}', sign);
          data[sign] = signDummy;
          updated = true;
        }
      }
      
      if (updated) {
        horoscope.data = data;
        horoscope.markModified('data');
        await horoscope.save();
        console.log("Fixed and saved today's horoscope data!");
      } else {
        console.log('All signs were already present.');
      }
    } else {
      console.log('No horoscope found for today!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

fix();
