export const generateTravelTips = (weather) => {
  const temp = Number(weather.temperature) || 20;
  const cond = (weather.condition || '').toLowerCase();
  const wind = Number(weather.windSpeed) || 10;
  const uv = Number(weather.uvIndex) || 0;
  const city = weather.cityName || 'your destination';

  const packing = [];
  const activities = [];
  const safety = [];

  const isRain = cond.includes('rain') || cond.includes('drizzle') || cond.includes('storm');
  const isSnow = cond.includes('snow') || cond.includes('blizzard');
  const isSunny = cond.includes('clear') || cond.includes('sun');
  const umbrellaNeeded = isRain || isSnow;

  if (temp < 0) {
    packing.push('Heavy winter coat / thermal parka', 'Thermal base layers & wool socks', 'Insulated gloves, beanie & scarf', 'Waterproof snow boots');
  } else if (temp < 10) {
    packing.push('Warm layered clothing & sweaters', 'Light jacket / windbreaker', 'Comfortable closed-toe walking shoes');
  } else if (temp < 22) {
    packing.push('Comfortable layers, long sleeves & denim', 'Versatile light cardigan or jacket for evenings', 'Sneakers / walking shoes');
  } else if (temp < 30) {
    packing.push('Lightweight breathable cotton / linen apparel', 'Shorts, t-shirts and summer wear', 'Sunglasses with UV protection');
  } else {
    packing.push('Ultra-light loose UV-protective clothing', 'Wide-brim sun hat & sunglasses', 'Insulated refillable water bottle', 'Electrolyte packets');
  }

  if (umbrellaNeeded) {
    packing.push('Compact windproof umbrella', 'Waterproof jacket or poncho');
  }
  if (uv >= 3) {
    packing.push(`Broad-spectrum SPF 30+ sunscreen (UV Index: ${uv})`);
  }
  if (wind >= 25) {
    packing.push('Wind-resistant outer shell jacket');
  }

  if (isRain || isSnow) {
    activities.push('Explore indoor museums and world-class art galleries', 'Visit local covered markets and boutique food halls', 'Enjoy cozy cafe culture and culinary tasting tours');
  } else if (isSunny) {
    activities.push('Scenic city walking tours, parks and botanical gardens', 'Sightseeing landmarks and open-air viewpoints', 'Waterfront promenade walks and outdoor dining');
  } else {
    activities.push('Architectural walking exploration with soft diffused light', 'Street photography and neighborhood discovery', 'Local markets and historical sites');
  }

  if (uv >= 8) {
    safety.push(`⚠️ Very High UV Alert (Index: ${uv}): Seek shade between 11 AM - 3 PM, reapply sunscreen.`);
  } else if (uv >= 6) {
    safety.push(`☀️ High UV Alert (${uv}): Wear sunglasses and protective hat outdoors.`);
  } else {
    safety.push(`🟢 Low/Moderate UV (${uv}): Standard sun protection.`);
  }

  if (temp >= 35) {
    safety.push(`🔥 Extreme Heat Warning (${temp}°C): Drink plenty of fluids and limit strenuous exertion.`);
  } else if (temp <= -5) {
    safety.push(`❄️ Extreme Cold Advisory (${temp}°C): Limit prolonged skin exposure.`);
  }

  if (wind >= 35) {
    safety.push(`💨 High Wind Advisory (${wind} km/h gusts): Be careful with loose items.`);
  }

  return {
    packing: Array.from(new Set(packing)),
    activities: Array.from(new Set(activities)),
    safety: Array.from(new Set(safety)),
    umbrellaNeeded,
    clothingAdvice: temp < 12 ? `Chilly weather in ${city}, dress warmly in layers.` : `Comfortable weather in ${city}.`,
    outdoorSuitability: isRain || temp > 35 || temp < -5 ? 'Moderate/Indoor Preferred' : 'Excellent for Outdoor Activities'
  };
};
