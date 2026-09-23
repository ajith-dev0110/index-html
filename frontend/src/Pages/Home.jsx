import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { weatherApi } from "../services/api";

function Home() {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadWeather = async (selectedCity) => {
    try {
      setLoading(true);

      const data = await weatherApi.getLiveWeather(
        selectedCity
      );

      setWeather(data);
    } catch (error) {
      console.error("Weather error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearch = (newCity) => {
    setCity(newCity);
    loadWeather(newCity);
  };

  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading weather...</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>

          <h3>{weather.temp}°F</h3>

          <p>{weather.condition}</p>

          <p>
            Humidity: {weather.humidity}%
          </p>

          <p>
            Wind: {weather.wind} mph
          </p>

          <p>
            Visibility: {weather.visibility} miles
          </p>

          <p>
            Pressure: {weather.pressure} hPa
          </p>

          <p>
            Feels Like: {weather.feelsLike}°F
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;