// D:\Weather\Weather-app\src\Pages\CityDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WeatherCard from '../Components/WeatherCard';
import ForecastStrip from '../Components/ForecastStrip';
import TravelTipsPanel from '../Components/TravelTipsPanel';
import { weatherApi } from '../services/api';
import { generateTravelTips } from '../utils/travelTips';

export default function CityDetail() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailedData = async () => {
      setLoading(true);
      try {
        const decodedCity = decodeURIComponent(cityName);
        const weatherData = await weatherApi.getLiveWeather(decodedCity);
        const forecastData = await weatherApi.getForecast(decodedCity);
        
        weatherData.name = decodedCity;

        setWeather(weatherData);
        setForecast(forecastData);
        setTips(generateTravelTips(weatherData, forecastData));
      } catch (err) {
        console.error("Error evaluating breakdown analysis payloads", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailedData();
  }, [cityName]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto mb-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading complete city analysis...</div>
      ) : (
        <>
          <WeatherCard data={weather} />
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ForecastStrip forecast={forecast} />
            <TravelTipsPanel tips={tips} />
          </div>
        </>
      )}
    </main>
  );
}