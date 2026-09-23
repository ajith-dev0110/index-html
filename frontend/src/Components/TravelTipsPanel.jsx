// D:\Weather\Weather-app\src\Components\TravelTipsPanel.jsx
import React from 'react';
import { Umbrella, Shirt, Compass, Eye } from 'lucide-react';

export default function TravelTipsPanel({ tips }) {
  const getStyleClasses = (type) => {
    switch (type) {
      case 'danger': return 'bg-red-50 border-red-200 text-red-900';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      default: return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getTipIcon = (id) => {
    switch (id) {
      case 'rain': return <Umbrella className="text-red-500" size={18} />;
      case 'layer': return <Shirt className="text-amber-500" size={18} />;
      case 'outdoor': return <Compass className="text-emerald-500" size={18} />;
      default: return <Eye className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
      <h3 className="text-gray-800 font-bold mb-4 text-base">Personalized Travel Tips</h3>
      <div className="flex flex-col gap-3">
        {tips.length === 0 ? (
          <p className="text-xs text-gray-400">No special warnings or recommendations for today.</p>
        ) : (
          tips.map((tip) => (
            <div key={tip.id} className={`flex gap-3 p-4 rounded-lg border ${getStyleClasses(tip.type)}`}>
              <div className="mt-0.5">{getTipIcon(tip.id)}</div>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{tip.title}</h4>
                <p className="text-xs opacity-90 leading-relaxed">{tip.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}