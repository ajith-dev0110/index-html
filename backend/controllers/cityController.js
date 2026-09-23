import SavedCity from '../models/SavedCity.js';
import axios from 'axios';

export const saveCity = async (req, res, next) => {
  try {
    const { city, country, lat, lon } = req.body;
    const existing = await SavedCity.findOne({ userId: req.user._id, city });
    if (existing) {
      return res.status(409).json({ success: false, message: 'City already saved in favorites' });
    }
    const saved = await SavedCity.create({ userId: req.user._id, city, country, lat, lon });
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
};

export const getSavedCities = async (req, res, next) => {
  try {
    const cities = await SavedCity.find({ userId: req.user._id });
    const snapshots = await Promise.all(cities.map(async (c) => {
      try {
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=auto`);
        return {
          ...c._doc,
          weather: {
            temperature: Math.round(res.data.current.temperature_2m),
            humidity: res.data.current.relative_humidity_2m,
            windSpeed: res.data.current.wind_speed_10m
          }
        };
      } catch (e) {
        return { ...c._doc, weather: null };
      }
    }));
    res.status(200).json({ success: true, data: snapshots });
  } catch (err) {
    next(err);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const city = await SavedCity.findOne({ _id: req.params.id, userId: req.user._id });
    if (!city) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    await city.deleteOne();
    res.status(200).json({ success: true, message: 'City removed' });
  } catch (err) {
    next(err);
  }
};
