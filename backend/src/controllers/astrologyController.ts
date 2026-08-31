import { Request, Response } from 'express';
import axios from 'axios';
import KundliSubmission from '../models/KundliSubmission';
import Horoscope from '../models/Horoscope';

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
      message: 'Try after some time',
      error: error.response?.data || error.message,
    });
  }
};

export const saveKundliSubmission = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const { name, date, time, location, country, latitude, longitude, timezone } = req.body;

    if (!name || !date || !time || !location || latitude === undefined || longitude === undefined || timezone === undefined) {
      return res.status(400).json({ success: false, message: 'All birth details are required.' });
    }

    const submission = await KundliSubmission.create({
      userId,
      name,
      date,
      time,
      location,
      country: country || 'India',
      latitude,
      longitude,
      timezone,
    });

    return res.status(201).json({ success: true, data: submission });
  } catch (error: any) {
    console.error('Save Kundli Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to save Kundli details.', error: error.message });
  }
};

export const getKundliSubmissions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const submissions = await KundliSubmission.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: submissions });
  } catch (error: any) {
    console.error('Get Saved Kundlis Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch saved Kundlis.', error: error.message });
  }
};

export const getKundliSubmissionById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const isAdmin = req.user?.role === 'admin';
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const query = isAdmin ? { _id: id } : { _id: id, userId };
    const submission = await KundliSubmission.findOne(query).populate('userId', 'name email phone');
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Saved Kundli details not found.' });
    }

    return res.status(200).json({ success: true, data: submission });
  } catch (error: any) {
    console.error('Get Saved Kundli By Id Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch saved Kundli details.', error: error.message });
  }
};

export const deleteKundliSubmission = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const isAdmin = req.user?.role === 'admin';
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const query = isAdmin ? { _id: id } : { _id: id, userId };
    const result = await KundliSubmission.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Saved Kundli not found or unauthorized.' });
    }

    return res.status(200).json({ success: true, message: 'Saved Kundli deleted successfully.' });
  } catch (error: any) {
    console.error('Delete Saved Kundli Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to delete saved Kundli.', error: error.message });
  }
};

export const getAllKundliSubmissionsForAdmin = async (req: Request, res: Response) => {
  try {
    const submissions = await KundliSubmission.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: submissions });
  } catch (error: any) {
    console.error('Get All Saved Kundlis For Admin Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch all saved Kundlis.', error: error.message });
  }
};

export const getLatestHoroscope = async (req: Request, res: Response) => {
  try {
    const latest = (await Horoscope.findOne().sort({ createdAt: -1 }).lean()) as any;
    if (!latest) {
      return res.status(404).json({ success: false, message: 'No horoscope found' });
    }
    return res.status(200).json({ success: true, data: latest.data });
  } catch (error: any) {
    console.error('Get Latest Horoscope Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch latest horoscope.', error: error.message });
  }
};

