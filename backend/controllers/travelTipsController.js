import { generateTravelTips } from '../utils/travelTipsLogic.js';

export const getTravelTips = async (req, res, next) => {
  try {
    const { temperature, condition, windSpeed, uvIndex, cityName } = req.body;
    if (temperature === undefined || !condition) {
      return res.status(400).json({ success: false, message: 'Temperature and condition are required' });
    }
    const tips = generateTravelTips({ temperature, condition, windSpeed, uvIndex, cityName });
    res.status(200).json({ success: true, data: tips });
  } catch (err) {
    next(err);
  }
};
