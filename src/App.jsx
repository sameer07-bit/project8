import React, { useState } from 'react';
import './App.css';

const API_KEY = "890b7a2bed582aefd3ab8c16adfe0d7c";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className='app'>
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="section">
        <div className="search">
          <input
            type='text'
            placeholder='Enter a city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type='submit' onClick={getWeather}>Submit</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
      <div className="footerf">
        <p>Copyright &copy; 2026 Weather App. All rights reserved.</p>
      </div>
    </div>
  );
}