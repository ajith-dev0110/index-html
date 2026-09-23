import express from 'express';
import { logSearch, getHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.route('/').post(logSearch).get(getHistory);
export default router;
