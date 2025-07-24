import GetUserLocation from "./GetUserLocation.js";
import FetchAPI from "./FetchAPI.js";
import WEATHER_API_KEY from "./apiKey.js";


/**
 * Class to initiate the GPS and weather data of the application.
 */
export default class App {
  /**
 * Start the application by getting user location and weather data.
 *
 * @async
 * @return {Promise<undefined>}
 */
  async start() {
    /**
     * @type {string} - Key for the openweathermap API
    */
    var apiK = WEATHER_API_KEY;
    /**
     * @type {GetUserLocation} - Instans of GetUserLocation 
    */
    var userLocation = new GetUserLocation();
    /**
     * @type {Element} - HTML element for the container 
    */
    const contentContainer = document.getElementById("content-container");


    try {
      contentContainer.innerHTML = "<p>Loading weather data...</p>";


      /**
       * @type {object} position - Instans of the GetUserLocation
       * @property {number} - Lat of the position
       * @property {number} - Lon of the position
       */
      const position = await userLocation.getLocation();
      const lat = position.lat;
      const lon = position.lon;


      new FetchAPI(lat, lon, apiK, contentContainer);
    } catch (err) {
      console.error("Error:", err);
      contentContainer.innerHTML = `
        <h2>Could not get your location</h2>
        <p>Please allow location access and refresh the page</p>
      `;
    }
  }
}
