import React from 'react';
import { Cloud, Droplets, Wind, Eye, Gauge, MapPin } from 'lucide-react';

export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div className="w-full max-w-7xl mx-auto bg-blue-600 text-white rounded-xl p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm font-medium tracking-wide">
          <MapPin size={16} /> {data.name.toUpperCase()}
        </div>
        <div className="flex items-center gap-6">
          <h1 className="text-7xl font-light">{data.temp}°</h1>
          <div className="flex flex-col">
            <Cloud size={40} className="mb-1" />
            <span className="text-xl font-medium">{data.condition}</span>
          </div>
        </div>
        <p className="text-sm opacity-80 mt-2">Feels like {data.feelsLike}°</p>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-6 md:mt-0 text-sm border-t border-blue-400 border-opacity-30 pt-4 md:pt-0 md:border-none w-full md:w-auto">
        <div className="flex items-center gap-3">
          <Droplets size={20} className="opacity-80" />
          <div>
            <p className="opacity-70 text-xs">Humidity</p>
            <p className="font-semibold text-base">{data.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Wind size={20} className="opacity-80" />
          <div>
            <p className="opacity-70 text-xs">Wind</p>
            <p className="font-semibold text-base">{data.wind} mph</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Eye size={20} className="opacity-80" />
          <div>
            <p className="opacity-70 text-xs">Visibility</p>
            <p className="font-semibold text-base">{data.visibility} mi</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Gauge size={20} className="opacity-80" />
          <div>
            <p className="opacity-70 text-xs">Pressure</p>
            <p className="font-semibold text-base">{data.pressure} mb</p>
          </div>
        </div>
      </div>
    </div>
  );
}