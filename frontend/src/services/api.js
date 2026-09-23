import axios from "axios";

// Backend URL
const BACKEND_URL = "http://localhost:5000/api";

// OpenWeatherMap API key
const WEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY";

// 10 cities with mock weather data
const cityWeatherData = {
  Chennai: {
    temp: 88,
    condition: "Partly Cloudy",
    humidity: 72,
    wind: 14,
    visibility: 6,
    pressure: 1008,
    feelsLike: 94,
  },

  Bangalore: {
    temp: 77,
    condition: "Cloudy",
    humidity: 68,
    wind: 10,
    visibility: 8,
    pressure: 1012,
    feelsLike: 78,
  },

  Mumbai: {
    temp: 84,
    condition: "Rainy",
    humidity: 82,
    wind: 16,
    visibility: 5,
    pressure: 1006,
    feelsLike: 91,
  },

  Delhi: {
    temp: 86,
    condition: "Sunny",
    humidity: 45,
    wind: 9,
    visibility: 10,
    pressure: 1014,
    feelsLike: 88,
  },

  Hyderabad: {
    temp: 82,
    condition: "Clear",
    humidity: 52,
    wind: 11,
    visibility: 9,
    pressure: 1010,
    feelsLike: 84,
  },

  Kolkata: {
    temp: 87,
    condition: "Cloudy",
    humidity: 76,
    wind: 13,
    visibility: 7,
    pressure: 1007,
    feelsLike: 93,
  },

  Goa: {
    temp: 83,
    condition: "Rainy",
    humidity: 85,
    wind: 18,
    visibility: 6,
    pressure: 1005,
    feelsLike: 89,
  },

  Coimbatore: {
    temp: 80,
    condition: "Partly Cloudy",
    humidity: 64,
    wind: 12,
    visibility: 9,
    pressure: 1011,
    feelsLike: 82,
  },

  Kochi: {
    temp: 81,
    condition: "Rainy",
    humidity: 88,
    wind: 15,
    visibility: 5,
    pressure: 1004,
    feelsLike: 88,
  },

  Pune: {
    temp: 79,
    condition: "Sunny",
    humidity: 48,
    wind: 8,
    visibility: 10,
    pressure: 1013,
    feelsLike: 80,
  },
};

export const weatherApi = {
  getLiveWeather: async (city) => {
    // Use real OpenWeather API if API key is added
    if (WEATHER_API_KEY && WEATHER_API_KEY !== "YOUR_OPENWEATHER_API_KEY") {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`,
      );

      return {
        name: response.data.name,
        temp: Math.round(response.data.main.temp),
        condition: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        wind: Math.round(response.data.wind.speed),
        visibility: Math.round(response.data.visibility / 1609.34),
        pressure: response.data.main.pressure,
        feelsLike: Math.round(response.data.main.feels_like),
      };
    }

    // Otherwise use mock data
    return getMockWeatherData(city);
  },

  getForecast: async (city) => {
    return getMockForecastData(city);
  },
};

// Get weather for selected city
function getMockWeatherData(city) {
  const cityName = city ? city.trim() : "Chennai";

  // Case-insensitive city search
  const matchedCity = Object.keys(cityWeatherData).find(
    (item) => item.toLowerCase() === cityName.toLowerCase(),
  );

  if (matchedCity) {
    return {
      name: matchedCity,
      ...cityWeatherData[matchedCity],
    };
  }

  // Default city
  return {
    name: cityName,
    temp: 80,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    visibility: 8,
    pressure: 1012,
    feelsLike: 82,
  };
}

// Forecast data
function getMockForecastData(city) {
  const forecasts = {
    Chennai: [
      { day: "Today", condition: "Sunny", pop: 10, high: 91, low: 78 },
      { day: "Tomorrow", condition: "Cloudy", pop: 20, high: 89, low: 77 },
      { day: "Friday", condition: "Sunny", pop: 5, high: 92, low: 79 },
      { day: "Saturday", condition: "Rainy", pop: 60, high: 86, low: 76 },
      { day: "Sunday", condition: "Cloudy", pop: 30, high: 88, low: 77 },
    ],

    Bangalore: [
      { day: "Today", condition: "Cloudy", pop: 30, high: 79, low: 67 },
      { day: "Tomorrow", condition: "Rainy", pop: 60, high: 76, low: 65 },
      { day: "Friday", condition: "Cloudy", pop: 40, high: 78, low: 66 },
      { day: "Saturday", condition: "Sunny", pop: 10, high: 81, low: 67 },
      { day: "Sunday", condition: "Sunny", pop: 5, high: 82, low: 68 },
    ],

    Mumbai: [
      { day: "Today", condition: "Rainy", pop: 80, high: 86, low: 78 },
      { day: "Tomorrow", condition: "Rainy", pop: 70, high: 85, low: 77 },
      { day: "Friday", condition: "Cloudy", pop: 50, high: 87, low: 78 },
      { day: "Saturday", condition: "Rainy", pop: 75, high: 84, low: 76 },
      { day: "Sunday", condition: "Cloudy", pop: 40, high: 86, low: 77 },
    ],

    Delhi: [
      { day: "Today", condition: "Sunny", pop: 5, high: 91, low: 75 },
      { day: "Tomorrow", condition: "Sunny", pop: 5, high: 93, low: 76 },
      { day: "Friday", condition: "Clear", pop: 0, high: 94, low: 77 },
      { day: "Saturday", condition: "Sunny", pop: 5, high: 92, low: 76 },
      { day: "Sunday", condition: "Cloudy", pop: 20, high: 89, low: 74 },
    ],

    Hyderabad: [
      { day: "Today", condition: "Clear", pop: 5, high: 87, low: 70 },
      { day: "Tomorrow", condition: "Sunny", pop: 5, high: 89, low: 71 },
      { day: "Friday", condition: "Cloudy", pop: 20, high: 86, low: 70 },
      { day: "Saturday", condition: "Rainy", pop: 50, high: 82, low: 68 },
      { day: "Sunday", condition: "Cloudy", pop: 30, high: 84, low: 69 },
    ],

    Kolkata: [
      { day: "Today", condition: "Cloudy", pop: 30, high: 90, low: 78 },
      { day: "Tomorrow", condition: "Rainy", pop: 70, high: 87, low: 77 },
      { day: "Friday", condition: "Rainy", pop: 60, high: 86, low: 76 },
      { day: "Saturday", condition: "Cloudy", pop: 40, high: 89, low: 77 },
      { day: "Sunday", condition: "Sunny", pop: 15, high: 91, low: 78 },
    ],

    Goa: [
      { day: "Today", condition: "Rainy", pop: 80, high: 86, low: 76 },
      { day: "Tomorrow", condition: "Rainy", pop: 75, high: 84, low: 75 },
      { day: "Friday", condition: "Cloudy", pop: 50, high: 85, low: 76 },
      { day: "Saturday", condition: "Rainy", pop: 70, high: 83, low: 74 },
      { day: "Sunday", condition: "Sunny", pop: 20, high: 87, low: 76 },
    ],

    Coimbatore: [
      { day: "Today", condition: "Sunny", pop: 10, high: 84, low: 68 },
      { day: "Tomorrow", condition: "Cloudy", pop: 20, high: 82, low: 67 },
      { day: "Friday", condition: "Sunny", pop: 10, high: 85, low: 68 },
      { day: "Saturday", condition: "Rainy", pop: 50, high: 80, low: 66 },
      { day: "Sunday", condition: "Cloudy", pop: 30, high: 82, low: 67 },
    ],

    Kochi: [
      { day: "Today", condition: "Rainy", pop: 80, high: 84, low: 76 },
      { day: "Tomorrow", condition: "Rainy", pop: 75, high: 83, low: 75 },
      { day: "Friday", condition: "Cloudy", pop: 50, high: 85, low: 76 },
      { day: "Saturday", condition: "Rainy", pop: 80, high: 82, low: 74 },
      { day: "Sunday", condition: "Cloudy", pop: 40, high: 84, low: 75 },
    ],

    Pune: [
      { day: "Today", condition: "Sunny", pop: 5, high: 82, low: 65 },
      { day: "Tomorrow", condition: "Sunny", pop: 5, high: 83, low: 64 },
      { day: "Friday", condition: "Cloudy", pop: 20, high: 81, low: 65 },
      { day: "Saturday", condition: "Rainy", pop: 50, high: 78, low: 63 },
      { day: "Sunday", condition: "Sunny", pop: 10, high: 82, low: 64 },
    ],
  };

  const matchedCity = Object.keys(forecasts).find(
    (item) => item.toLowerCase() === (city || "").trim().toLowerCase(),
  );

  return forecasts[matchedCity] || forecasts.Chennai;
}
