import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';
import Horoscope from '../models/Horoscope';
import { logger } from '../utils/logger';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function generateForSign(ai: any, signName: string, retries = 3) {
  logger.info(`Generating horoscope for ${signName.toUpperCase()}...`);
  
  const prompt = `You are an expert Vedic Astrologer. Generate a highly detailed horoscope prediction for the zodiac sign ${signName} for the current date.
  
You MUST return ONLY a valid JSON object following this EXACT schema, with no markdown formatting, no code blocks, and no extra text.

{
  "daily": {
    "married_life": "String (1-2 sentences)",
    "career": "String (1-2 sentences)",
    "family": "String (1-2 sentences)",
    "love_life": "String (1-2 sentences)",
    "finances": "String (1-2 sentences)",
    "health": "String (1-2 sentences)"
  },
  "weekly": {
    "education": "String (3-4 sentences)",
    "career": "String (3-4 sentences)",
    "family": "String (3-4 sentences)",
    "finance": "String (3-4 sentences)",
    "health": "String (3-4 sentences)",
    "lucky_colours": "String (e.g., 'Red and Yellow')",
    "remedies": "String (1-2 sentences detailing a specific astrological remedy)",
    "conclusion": "Perform ${signName} lagna puja for courage, confidence, and success."
  },
  "monthly": [
    "String (Paragraph 1 of monthly overview)",
    "String (Paragraph 2 of monthly overview)",
    "String (Paragraph 3 of monthly overview)",
    "String (Paragraph 4 of monthly overview)"
  ],
  "yearly": {
    "intro": "String (3-4 sentences about 2026 overall)",
    "career": "String (3-4 sentences)",
    "finance": "String (3-4 sentences)",
    "health": "String (3-4 sentences)",
    "family_life": "String (3-4 sentences)",
    "love_and_relationship": "String (3-4 sentences)",
    "conclusion": "String (3-4 sentences concluding the year 2026)"
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const textResponse = response.text;
    return JSON.parse(textResponse);
  } catch (err: any) {
    if (err.status === 429 && retries > 0) {
      logger.warn(`Quota/Rate limit hit for ${signName}, pausing 30s before retry (${retries} retries left)...`);
      await delay(30000);
      return generateForSign(ai, signName, retries - 1);
    }
    logger.error(`Failed for ${signName}`, err);
    throw err;
  }
}

export async function generateDailyHoroscopes() {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    logger.error("ERROR: GEMINI_API_KEY is not set in backend .env");
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Fetch existing document to check which signs are already generated
  let existingDoc = await Horoscope.findOne({ date: today });

  for (const sign of ZODIAC_SIGNS) {
    // If sign already generated for today, skip it
    if (existingDoc?.data?.[sign]) {
      logger.info(`⏩ Horoscope for ${sign.toUpperCase()} already generated for ${today}. Skipping.`);
      continue;
    }

    try {
      const generated = await generateForSign(ai, sign);
      
      // Incrementally save each sign immediately so progress is preserved and live UI gets data fast
      existingDoc = await Horoscope.findOneAndUpdate(
        { date: today },
        { $set: { [`data.${sign}`]: generated } },
        { upsert: true, new: true }
      );
      logger.info(`💾 Saved horoscope for ${sign.toUpperCase()} (${today})`);

      // Wait 3s to respect Gemini API rate limits
      await delay(3000);
    } catch (err: any) {
      logger.error(`Error processing ${sign}: ${err.message}`);
    }
  }

  logger.info(`✅ Daily horoscope generation check complete for ${today}`);
}
