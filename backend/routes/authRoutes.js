import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validateRequest.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
export default router;
