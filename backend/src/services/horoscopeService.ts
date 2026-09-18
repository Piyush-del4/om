import { GoogleGenAI } from '@google/genai';
import Horoscope from '../models/Horoscope';
import { logger } from '../utils/logger';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const FALLBACK_MODELS = [
  process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite'
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function generateBatchWithFallback(ai: any, signNames: string[], attempt = 0): Promise<Record<string, any>> {
  const model = FALLBACK_MODELS[attempt % FALLBACK_MODELS.length];
  logger.info(`🔮 Generating horoscope batch for [${signNames.join(', ').toUpperCase()}] using model: ${model}...`);

  const schemaSample = signNames.reduce((acc, sign) => {
    acc[sign] = {
      daily: {
        married_life: "1-2 sentences",
        career: "1-2 sentences",
        family: "1-2 sentences",
        love_life: "1-2 sentences",
        finances: "1-2 sentences",
        health: "1-2 sentences"
      },
      weekly: {
        education: "3-4 sentences",
        career: "3-4 sentences",
        family: "3-4 sentences",
        finance: "3-4 sentences",
        health: "3-4 sentences",
        lucky_colours: "Red and Yellow",
        remedies: "1-2 sentences detailing a specific astrological remedy",
        conclusion: `Perform ${sign} lagna puja for courage, confidence, and success.`
      },
      monthly: [
        "Paragraph 1 of monthly overview",
        "Paragraph 2 of monthly overview",
        "Paragraph 3 of monthly overview",
        "Paragraph 4 of monthly overview"
      ],
      yearly: {
        intro: "3-4 sentences about 2026 overall",
        career: "3-4 sentences",
        finance: "3-4 sentences",
        health: "3-4 sentences",
        family_life: "3-4 sentences",
        love_and_relationship: "3-4 sentences",
        conclusion: "3-4 sentences concluding 2026"
      }
    };
    return acc;
  }, {} as any);

  const prompt = `You are an expert Vedic Astrologer. Generate detailed horoscope predictions for the following zodiac signs: ${signNames.join(', ')} for the current date.
  
You MUST return ONLY a valid JSON object where keys are the sign names: [${signNames.join(', ')}]. Follow this structure:
${JSON.stringify(schemaSample, null, 2)}
Return ONLY JSON without markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const textResponse = response.text || '';
    const cleanedText = textResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    try {
      return JSON.parse(cleanedText);
    } catch (e) {
      const match = cleanedText.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw e;
    }
  } catch (err: any) {
    const status = err.status || err.statusCode;
    const errMessage = err.message || '';

    if (attempt < FALLBACK_MODELS.length * 3) {
      const nextModel = FALLBACK_MODELS[(attempt + 1) % FALLBACK_MODELS.length];
      const isRateOrDemand = status === 503 || status === 429 || errMessage.includes('high demand') || errMessage.includes('quota') || errMessage.includes('UNAVAILABLE');
      const isNotFound = status === 404;

      const waitTime = isRateOrDemand
        ? Math.min(30000, 3000 * Math.pow(1.5, attempt))
        : isNotFound ? 500 : 2000;

      logger.warn(`⚠️ Model ${model} returned status ${status || 'error'} (${errMessage.substring(0, 80)}...). Switching to ${nextModel} (waiting ${(waitTime / 1000).toFixed(1)}s)...`);
      await delay(waitTime);
      return generateBatchWithFallback(ai, signNames, attempt + 1);
    }

    logger.error(`❌ Batch generation failed for [${signNames.join(', ')}]: ${err.message}`);
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

  let existingDoc = await Horoscope.findOne({ date: today });

  // Filter missing signs that are not generated yet
  const missingSigns = ZODIAC_SIGNS.filter(sign => !existingDoc?.data?.[sign]);

  if (missingSigns.length === 0) {
    logger.info(`✅ Horoscope for today (${today}) is already complete for all 12 signs.`);
    return;
  }

  logger.info(`📋 Missing ${missingSigns.length} signs for ${today}. Processing in resilient batches...`);

  // Process in batches of 6 to minimize API calls (2 API calls total instead of 12)
  const batchSize = 6;
  for (let i = 0; i < missingSigns.length; i += batchSize) {
    const currentBatch = missingSigns.slice(i, i + batchSize);
    try {
      const batchResult = await generateBatchWithFallback(ai, currentBatch);

      // Build update payload
      const updatePayload: Record<string, any> = {};
      for (const sign of currentBatch) {
        if (batchResult[sign]) {
          updatePayload[`data.${sign}`] = batchResult[sign];
        }
      }

      if (Object.keys(updatePayload).length > 0) {
        existingDoc = await Horoscope.findOneAndUpdate(
          { date: today },
          { $set: updatePayload },
          { upsert: true, new: true }
        );
        logger.info(`💾 Batch saved successfully for [${Object.keys(batchResult).join(', ').toUpperCase()}] (${today})`);
      }

      await delay(2000);
    } catch (err: any) {
      logger.error(`❌ Failed to process batch [${currentBatch.join(', ')}]: ${err.message}`);
    }
  }

  logger.info(`✅ Daily horoscope generation complete for ${today}`);
}
