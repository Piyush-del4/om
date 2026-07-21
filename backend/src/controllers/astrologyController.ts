import { Request, Response } from 'express';
import axios from 'axios';

const API_BASE_URL = 'https://json.freeastrologyapi.com';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.FREE_ASTROLOGY_API_KEY,
  };
};

/**
 * Proxy request to FreeAstrologyAPI
 */
export const fetchAstrologyData = async (req: Request, res: Response) => {
  try {
    const { endpoint, data } = req.body;

    if (!endpoint || !data) {
      return res.status(400).json({ success: false, message: 'Endpoint and data are required.' });
    }

    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: getHeaders(),
    });

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
