/**
 * Returns a background image URL based on the provided temperature.
 * @param {number} temp - The temperature in Celsius.
 * @returns {string} - A URL of background image.
 */
export function background(temp: number): string {
  if (temp <= 5) {
    return "https://images.pexels.com/photos/32136799/pexels-photo-32136799/free-photo-of-sunny-winter-day-on-baku-snowy-slopes.jpeg"; // snow
  } else if (temp <= 15) {
    return "https://images.pexels.com/photos/52531/way-clouds-seat-belts-direction-52531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // cloudy
  } else if (temp <= 25) {
    return "https://images.pexels.com/photos/20822535/pexels-photo-20822535/free-photo-of-amanecer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // sunny
  } else {
    return "https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // hot
  }
}
