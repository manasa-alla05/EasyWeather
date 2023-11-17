
import React, { useState } from 'react';
import searchdownimg from "../assests/searchdown.gif";

const WeatherInput = ({ getCityCoordinates, getUserCoordinates }) => {
  const [cityInput, setCityInput] = useState('');

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    getCityCoordinates(cityInput);
  };

  const handleLocationClick = () => {
    getUserCoordinates();
  };

  return (
   
    <div className="weather-input">
       <h1>🌤️ Easy Weather 🌤️</h1>
      <input
        className="city-input"
        type="text"
        placeholder="Enter city name"
        value={cityInput}
        onChange={handleInputChange}
        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      <div className="separator"></div>
      <button className="location-btn" onClick={handleLocationClick}>
        Use Current Location
      </button>
      <br></br>
      <img src={searchdownimg} alt="Background" />
    </div>
  );
};

export default WeatherInput;
