import express from 'express';
import { fetchAstrologyData } from '../controllers/astrologyController';

const router = express.Router();

router.post('/proxy', fetchAstrologyData);

export default router;
