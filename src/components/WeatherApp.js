
import React, { useState } from 'react';
import WeatherInput from './WeatherInput';
import WeatherData from './WeatherData';
import { getWeatherDetails, getCityCoordinates, getUserCoordinates } from './WeatherServices';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (cityName, latitude, longitude) => {
    try {
      const data = await getWeatherDetails(cityName, latitude, longitude);
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getCityAndFetchWeather = async (cityName) => {
    try {
      const { lat, lon } = await getCityCoordinates(cityName);
      fetchWeatherData(cityName, lat, lon);
    } catch (error) {
      alert(error.message);
    }
  };

  const getUserAndFetchWeather = async () => {
    try {
      const { name, latitude, longitude } = await getUserCoordinates();
      fetchWeatherData(name, latitude, longitude);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <WeatherInput
          getCityCoordinates={getCityAndFetchWeather}
          getUserCoordinates={getUserAndFetchWeather}
        />
        <WeatherData weatherData={weatherData} />
      </div>
    </div>
  );
};

export default WeatherApp;

