// D:\Weather\Weather-app\src\Pages\Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import WeatherCard from '../Components/WeatherCard';
import { weatherApi } from '../services/api';
import { LogOut, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const weatherData = await weatherApi.getLiveWeather(city);
      setWeather(weatherData);
    } catch (err) {
      console.error("Error updating component payload data states", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("San Francisco, CA");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6 px-1">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Weather Workspace</h1>
          <p className="text-xs text-gray-400">Main Control Center Dashboard</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition">
          <LogOut size={16} /> Log Out
        </button>
      </header>

      <SearchBar onSearch={(city) => navigate(`/city/${encodeURIComponent(city)}`)} onGeolocation={() => fetchWeatherData("Current Location")} />

      {loading ? (
        <div className="text-center py-12 text-gray-500">Updating overview matrices...</div>
      ) : (
        weather && (
          <div className="w-full max-w-7xl mx-auto space-y-6">
            <WeatherCard data={weather} />
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Deep Dive Analysis Available</h3>
                <p className="text-xs text-gray-500 mt-0.5">Explore detailed extended forecasts and localized travel notifications metrics for {weather.name}.</p>
              </div>
              <button onClick={() => navigate(`/city/${encodeURIComponent(weather.name)}`)} className="bg-gray-900 text-white p-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition">
                View Deep Dive <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )
      )}
    </main>
  );
}