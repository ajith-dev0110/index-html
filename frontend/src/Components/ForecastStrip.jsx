import React from 'react';
import { Sun, Cloud, CloudRain, CloudDrizzle } from 'lucide-react';

export default function ForecastStrip({ forecast }) {
  const getWeatherIcon = (cond) => {
    switch (cond) {
      case 'Sunny': return <Sun className="text-yellow-500" size={20} />;
      case 'Rainy': return <CloudRain className="text-blue-500" size={20} />;
      case 'Drizzle': return <CloudDrizzle className="text-blue-400" size={20} />;
      default: return <Cloud className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-gray-800 font-bold mb-4 text-base">7-Day Forecast</h3>
      <div className="divide-y divide-gray-100">
        {forecast.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 text-sm">
            <span className="w-24 text-gray-700 font-medium">{item.day}</span>
            <div className="flex items-center gap-2 w-28">
              {getWeatherIcon(item.condition)}
              <span className="text-gray-500 text-xs">{item.condition}</span>
            </div>
            <span className="text-blue-500 text-xs w-12 text-center font-medium">
              {item.pop > 0 ? `${item.pop}%` : ''}
            </span>
            <div className="text-right font-medium">
              <span className="text-gray-900">{item.high}°</span>
              <span className="text-gray-400 text-xs ml-2">{item.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}