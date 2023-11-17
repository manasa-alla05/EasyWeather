// WeatherData.js
import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
// import Loader from './Loader';
import { getWeatherDetails, getCityCoordinates } from './WeatherServices';
const WeatherData = ({ weatherData }) => {
  const [defaultWeather, setDefaultWeather] = useState(null);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      try {
        const delhiCoordinates = await getCityCoordinates('Hyderabad');
        const defaultData = await getWeatherDetails('Hyderabad', delhiCoordinates.lat, delhiCoordinates.lon);
        setDefaultWeather(defaultData);
      } catch (error) {
        console.error('Error fetching default weather:', error);
      }
    };

    if (!weatherData) {
      fetchDefaultWeather();
    }
  }, [weatherData]);

  const displayData = weatherData || defaultWeather;

  // if (!displayData) {
  //   return <div className="weather-data"><Loader /></div>;
  // }
  
  if (!displayData) {
    return <div className="weather-data"></div>;
  }

  const { cityName, currentWeather, forecast, hourforecast } = displayData;

  return (
    <div className="weather-data">
      <div className="current-weather">
        <div className="details">
          <h2>{cityName} ({currentWeather.dt_txt.split(' ')[0]})</h2>
          <h6>Temperature: {(currentWeather.main.temp - 273.15).toFixed(2)}°C</h6>
          <h6>Wind: {currentWeather.wind.speed} M/S</h6>
          <h6>Humidity: {currentWeather.main.humidity}%</h6>
        </div>
        <div className="icon">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
            alt="weather-icon"
          />
          <h6>{currentWeather.weather[0].description}</h6>
        </div>
      </div>
      <div className="days-forecast">
        <h2>Hourly Forecast ⏰</h2>
        <ul className="weather-cards">
          {hourforecast.map((weatherItem, index) => (
            <WeatherCard key={index} weatherItem={weatherItem} isExtendedForecast={false} />
          ))}
        </ul>
      </div>
      <div className="days-forecast">
      <h2>Extended Forecast 📅</h2>
        <ul className="weather-cards">
          {forecast.map((weatherItem, index) => (
            <WeatherCard key={index} weatherItem={weatherItem} isExtendedForecast={true} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherData;
