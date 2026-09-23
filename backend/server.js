import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import travelTipsRoutes from './routes/travelTipsRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/travel-tips', travelTipsRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Weather App API' }));

// Centralized error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
