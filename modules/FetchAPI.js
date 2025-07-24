/**
 * Class to get and display weather inforamtion based in users location.
 */
export default class FetchAPI {
    /**
   * Creates an instance of FetchAPI.
   * 
   * @param {number} lat - Lat of user location.
   * @param {number} lon - Lon of user location.
   * @param {string} apiKey - API-key for openweathermap.
   * @param {Element} container - Container for the weather information.
   * @returns {undefined}
   */
  constructor(lat, lon, apiKey, container) {
    this.container = container;
    this.m_fetchWeather(lat, lon, apiKey);
  }
   /**
   * Fetches weather data from the API.
   * @private
   * @async
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} apiKey - API key
   * @returns {Promise<undefined>}
   */
  async m_fetchWeather(lat, lon, apiKey) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      this.m_createBox(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.m_showError();
    }
  }

  /**
   * Creates the displays the weather information based on user     location.
   * @private
   * @param {object} data - Weather data from the API.
   * @returns {undefined}
   */
  m_createBox(data) {
    this.container.innerHTML = `
        <h1 class="pixelify-sans-normal"><img id="locationIcon" src="svg/utils/Location.svg" alt="LocationIcon">${data.city.name}</h1>
        <h1 class="pixelify-sans-normal">${data.list[0].main.temp}°C</h1>
        <h2>${data.list[0].weather[0].main}</h2>
        <p>${data.list[0].dt_txt}</p>
        <div class="stats-container">
        <div id="wind"><img class="icon" src="svg/utils/Wind.svg" alt="Wind">${data.list[0].wind.speed} M/S</div>
        <div id="humidity"><img class="icon" src="svg/utils/Humidity.svg" alt="Humidity">${data.list[0].main.humidity} %</div>
      </div>
      `;
    this.m_changeBaseOnTime(data); 
  }

  /**
   * Displays an error message when weather data fail to load.
   * @private
   * @returns {undefined}
   */
  m_showError() {
    this.container.innerHTML = `
        <h2>Could not load weather data</h2>
        <p>Please check your Wifi-connection and location settings</p>
      `;
  }

  /**
   * Changes and displays images based on weahter data.
   * @private
   * @param {object} data - Weather data from the API.
   * @returns {undefined}
   */
  m_changeWeather(data, time) {
    /**@type {Element} - HTML element for the img container */
    let imgsrc = document.getElementById("weatherIcon");
    switch (data.list[0].weather[0].main) {
      case "Clear":
        imgsrc.src = `svg/${time}/Clear.svg`;
        break;
      case "Clouds":
        imgsrc.src = `svg/${time}/Clouds.svg`;
        break;
      case "Rain":
        imgsrc.src = "svg/Rain.svg";
        break;
      case "Snow":
        imgsrc.src = "svg/Snow.svg";
        break;
      case "Thunderstorm":
        imgsrc.src = "svg/Thunder.gif";
        break;
      case "Drizzle":
        imgsrc.src = "svg/Rain.svg";
        break;
      case "Fog":
        imgsrc.src = "svg/Fog.svg";
        break;
      case "Mist":
        imgsrc.src = "svg/Fog.svg";
        break;
    }
  }

  /**
   * Changes tha background based on time of day.
   * @private
   * @param {object} data - Weather data from the API.
   * @returns {undefined}
   */
  m_changeBaseOnTime(data) {
    /**@type {Element} - HTML element for the background container */
    const background = document.getElementById("weather-container");
    switch (data.list[0].sys.pod) {
      case "d":
        background.style.backgroundColor = "#4f959d";
        this.m_changeWeather(data, "day");
        break;
      case "n":
        background.style.backgroundColor = "#1b3a3d";
        this.m_changeWeather(data, "night");
        break;
    }
  }

}
