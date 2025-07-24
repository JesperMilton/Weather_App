/**
 * Class to get user location.
 */
export default class GetUserLocation {
  /**
* Start the application by getting user location and weather data.
*
* @async
* @returns {Promise<{lat: number, lon: number}>}
*/
  async getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          resolve({ lat: this.lat, lon: this.lon });
        },
        (error) => {
          console.error("Error fetching position:", error);
          reject(error);
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    });
  }
}