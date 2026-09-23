import express from 'express';
import { getTravelTips } from '../controllers/travelTipsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, getTravelTips);
export default router;
