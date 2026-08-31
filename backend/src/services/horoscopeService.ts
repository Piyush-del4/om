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
      logger.warn(`Quota exceeded for ${signName}, waiting 10 seconds before retrying...`);
      await delay(10000);
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

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const finalData: Record<string, any> = {};

  for (const sign of ZODIAC_SIGNS) {
    try {
      const generated = await generateForSign(ai, sign);
      finalData[sign] = generated;
      // Wait to avoid rate limiting
      await delay(4000);
    } catch (err: any) {
      logger.error(`Error processing ${sign}: ${err.message}`);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  
  // Fetch existing data to avoid overwriting successful signs if a quota error occurs midway
  const existing = await Horoscope.findOne({ date: today });
  const dataToSave = { ...(existing?.data || {}), ...finalData };

  // Upsert the daily horoscope
  await Horoscope.findOneAndUpdate(
    { date: today },
    { data: dataToSave },
    { upsert: true, new: true }
  );

  logger.info(`✅ Successfully generated and saved daily horoscopes for ${today}`);
}
