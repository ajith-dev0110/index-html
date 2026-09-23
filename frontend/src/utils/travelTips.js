export const generateTravelTips = (weatherData, forecastData) => {
  const tips = [];

  // Check for Rain in Forecast
  const rainUpcoming = forecastData.some(f => f.condition === 'Rainy' || f.pop > 50);
  if (rainUpcoming || weatherData.condition.toLowerCase().includes('rain')) {
    tips.push({
      id: 'rain',
      type: 'danger',
      title: 'Rain Expected This Evening',
      message: 'Pack an umbrella if you are heading out after 6 PM. Rain chance increases to 60%.'
    });
  }

  // Temperature variance layered logic
  if (weatherData.temp > 60 && weatherData.temp < 75) {
    tips.push({
      id: 'layer',
      type: 'warning',
      title: 'Layer Up for Temperature Changes',
      message: 'Morning fog will give way to afternoon sun. Bring a light jacket you can remove.'
    });
  }

  // Outdoor activity checking
  if (!weatherData.condition.toLowerCase().includes('rain') && weatherData.temp > 65) {
    tips.push({
      id: 'outdoor',
      type: 'success',
      title: 'Perfect Day for Outdoor Activities',
      message: 'Morning and early afternoon are ideal for sightseeing before any evening transition.'
    });
  }

  // Visibility logic
  if (weatherData.visibility >= 9) {
    tips.push({
      id: 'visibility',
      type: 'info',
      title: 'Good Visibility',
      message: 'Clear views for photography and enjoying scenic spots throughout the day.'
    });
  }

  return tips;
};