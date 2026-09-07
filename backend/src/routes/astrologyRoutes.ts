import express from 'express';
import { 
  fetchAstrologyData,
  saveKundliSubmission,
  getKundliSubmissions,
  getKundliSubmissionById,
  deleteKundliSubmission,
  getAllKundliSubmissionsForAdmin,
  getLatestHoroscope,
  triggerHoroscopeGeneration
} from '../controllers/astrologyController';
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();

// Horoscope
router.get('/horoscope/latest', getLatestHoroscope);
router.post('/horoscope/generate', triggerHoroscopeGeneration);

// Proxy for calculations
router.post('/proxy', fetchAstrologyData);

// Saved Kundli management
router.post('/submissions', requireAuth, saveKundliSubmission);
router.get('/submissions', requireAuth, getKundliSubmissions);
router.get('/submissions/admin/all', requireAuth, requireAdmin, getAllKundliSubmissionsForAdmin);
router.get('/submissions/:id', requireAuth, getKundliSubmissionById);
router.delete('/submissions/:id', requireAuth, deleteKundliSubmission);

export default router;
