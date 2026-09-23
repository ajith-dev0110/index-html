import SearchHistory from '../models/SearchHistory.js';

export const logSearch = async (req, res, next) => {
  try {
    const { query, city, country, lat, lon, temp, condition } = req.body;
    const item = await SearchHistory.create({
      userId: req.user._id,
      query: query || city,
      city: city || query,
      country, lat, lon, temp, condition
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id }).sort({ searchedAt: -1 }).limit(20);
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};
