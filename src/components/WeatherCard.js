// WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherItem, isExtendedForecast }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const date = isExtendedForecast
    ? formatDate(weatherItem.dt_txt.split(' ')[0])
    : (weatherItem.dt_txt.split(' ')[1]);

  return (
    <li className="card">
      <h3 style={{ fontWeight: 'bold' }}>{date}</h3>

      <img
        src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`}
        alt="weather-icon"
      />
      <h6>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
      <h6>Wind: {weatherItem.wind.speed} M/S</h6>
      <h6>Humidity: {weatherItem.main.humidity}%</h6>
    </li>
  );
};

export default WeatherCard;
