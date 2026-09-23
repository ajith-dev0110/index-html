import axios from 'axios';

const mapCode = (code, isDay = 1) => {
  const codes = {
    0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 61: 'Rain', 71: 'Snow',
    80: 'Rain Showers', 95: 'Thunderstorm'
  };
  return codes[code] || 'Partly Cloudy';
};

export const getWeather = async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;
    let targetLat = lat;
    let targetLon = lon;
    let cityName = city || '';
    let country = '';

    if (city) {
      const geo = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!geo.data.results || geo.data.results.length === 0) {
        return res.status(404).json({ success: false, message: `City '${city}' not found` });
      }
      targetLat = geo.data.results[0].latitude;
      targetLon = geo.data.results[0].longitude;
      cityName = geo.data.results[0].name;
      country = geo.data.results[0].country || '';
    }

    const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&timezone=auto&forecast_days=6`);

    const cur = weatherRes.data.current;
    const daily = weatherRes.data.daily;

    const forecast = [];
    for (let i = 0; i < Math.min(5, daily.time.length); i++) {
      forecast.push({
        date: daily.time[i],
        day: new Date(daily.time[i]).toLocaleDateString('en-US', { weekday: 'short' }),
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        condition: mapCode(daily.weather_code[i]),
        uvIndex: Math.round(daily.uv_index_max[i] || 3),
        precipitationProb: daily.precipitation_probability_max[i] || 0
      });
    }

    res.status(200).json({
      success: true,
      data: {
        city: cityName,
        country,
        lat: targetLat,
        lon: targetLon,
        temperature: Math.round(cur.temperature_2m),
        feelsLike: Math.round(cur.apparent_temperature),
        humidity: Math.round(cur.relative_humidity_2m),
        windSpeed: Math.round(cur.wind_speed_10m),
        uvIndex: Math.round(daily.uv_index_max[0] || 3),
        condition: mapCode(cur.weather_code, cur.is_day),
        forecast
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getForecast = async (req, res, next) => {
  return getWeather(req, res, next);
};
