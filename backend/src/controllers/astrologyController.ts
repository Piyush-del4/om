import { Request, Response } from 'express';
import axios from 'axios';

const GENERAL_API_BASE_URL = 'https://json.freeastrologyapi.com';
const DASHA_API_BASE_URL = 'https://api.freeastroapi.com/api/v2';

const getGeneralHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.FREE_ASTROLOGY_API_KEY,
  };
};

const getDashaHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.FREE_ASTRO_DASHA_API_KEY,
  };
};

/**
 * Helper to handle Rate Limiting gracefully with retry
 */
const postWithRateLimitRetry = async (url: string, payload: any, headers: any, retries = 3): Promise<any> => {
  try {
    return await axios.post(url, payload, { headers });
  } catch (error: any) {
    const errData = error.response?.data;
    const isRateLimit = error.response?.status === 429 || errData?.error === 'rps_limit_exceeded';
    if (retries > 0 && isRateLimit) {
      const waitMs = (errData?.retry_after_ms ?? 1000) + 100;
      console.log(`[Astrology API] Rate limited. Pausing ${waitMs}ms before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      return postWithRateLimitRetry(url, payload, headers, retries - 1);
    }
    throw error;
  }
};

/**
 * Proxy request to Astrology API
 */
export const fetchAstrologyData = async (req: Request, res: Response) => {
  try {
    const { endpoint, data } = req.body;

    if (!endpoint || !data) {
      return res.status(400).json({ success: false, message: 'Endpoint and data are required.' });
    }

    // 1. Mahadasha & Antardasha -> Calls FreeAstroAPI V2 with FREE_ASTRO_DASHA_API_KEY
    if (endpoint === 'vimsottari/maha-dasas-and-antar-dasas') {
      const v2Endpoint = 'vedic/dasha';
      const payload = { 
        year: data.year,
        month: data.month,
        day: data.date,
        hour: data.hours,
        minute: data.minutes,
        lat: data.latitude,
        lng: data.longitude,
        levels: 2 
      };
      if (data.timezone === 5.5) {
         (payload as any).tz_str = "Asia/Kolkata";
      } else if (data.timezone) {
         (payload as any).tz_str = "AUTO";
      }

      const response = await postWithRateLimitRetry(`${DASHA_API_BASE_URL}/${v2Endpoint}`, payload, getDashaHeaders());
      const dashaData = response.data;
      
      const mappedDasha: any = {};
      if (dashaData.timeline) {
         dashaData.timeline.forEach((maha: any) => {
            mappedDasha[maha.lord] = {};
            if (maha.sub_periods) {
               maha.sub_periods.forEach((antar: any) => {
                  mappedDasha[maha.lord][antar.lord] = {
                     start_time: antar.start,
                     end_time: antar.end
                  };
               });
            } else {
               mappedDasha[maha.lord][maha.lord] = {
                  start_time: maha.start,
                  end_time: maha.end
               };
            }
         });
      }
      return res.status(200).json({ success: true, data: { statusCode: 200, output: mappedDasha } });
    }

    // 2. All other tools (planets, panchang, match-making, etc.) -> Calls json.freeastrologyapi.com with FREE_ASTROLOGY_API_KEY
    const response = await postWithRateLimitRetry(`${GENERAL_API_BASE_URL}/${endpoint}`, data, getGeneralHeaders());

    return res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Astrology API Error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch astrological data',
      error: error.response?.data || error.message,
    });
  }
};
