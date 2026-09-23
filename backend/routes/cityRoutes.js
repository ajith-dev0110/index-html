import express from 'express';
import { saveCity, getSavedCities, deleteCity } from '../controllers/cityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.route('/').post(saveCity).get(getSavedCities);
router.route('/:id').delete(deleteCity);
export default router;
