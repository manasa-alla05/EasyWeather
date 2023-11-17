const apikey = process.env.REACT_APP_WEATHER_API_KEY;

const getWeatherDetails = async (cityName, latitude, longitude) => {
   
  
    try {
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      const response = await fetch(WEATHER_API_URL);
      const data = await response.json();
  
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
         // eslint-disable-next-line
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
  
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
  
      const hourlyForecast = data.list.filter((hourForecast) => {
        const forecastDate = new Date(hourForecast.dt_txt).getDate();
        const forecastHours = new Date(hourForecast.dt_txt).getHours();
       // eslint-disable-next-line
        return forecastDate === currentDate.getDate() && forecastHours >= currentHours || forecastDate > currentDate.getDate();
        // eslint-disable-next-line
      });
  // eslint-disable-next-line
      return {
        cityName,
        currentWeather: fiveDaysForecast[0],
        forecast: fiveDaysForecast.slice(1),
        hourforecast: hourlyForecast.slice(0, 5),
      };
    } catch (error) {
      throw new Error('An error occurred while fetching the weather forecast!');
    }
  };
  
  const getCityCoordinates = async (cityName) => {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apikey}`;
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      if (!data.length) {
        throw new Error(`No coordinates found for ${cityName}`);
      }
  
      const { lat, lon } = data[0];
      return { lat, lon };
    } catch (error) {
      throw new Error('An error occurred while fetching the coordinates!');
    }
  };
  
  const getUserCoordinates = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apikey}`;
  
          fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
              const { name } = data[0];
              resolve({ name, latitude, longitude });
            })
            .catch(() => {
              reject(new Error('An error occurred while fetching the city name!'));
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            reject(new Error('Geolocation request denied. Please reset location permission to grant access again.'));
          } else {
            reject(new Error('Geolocation request error. Please reset location permission.'));
          }
        }
      );
    });
  };
  
  export { getWeatherDetails, getCityCoordinates, getUserCoordinates };
  