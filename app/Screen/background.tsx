/**
 * Returns a background image URL based on weather condition, temperature, and optionally time of day.
 * @param {number} temp - Temperature in Celsius.
 * @param {string} [description] - Main weather condition from API (e.g., "Rain", "Snow", "Clouds", "Clear").
 * @param {Date} [time] - Optional JavaScript Date object to determine day/night.
 * @returns {string} Background image URL.
 */
export function background(temp: number, description?: string, time: Date = new Date()): string {
  const normalized = description?.toLowerCase();
  const hour = time.getHours();
  const isNight = hour < 6 || hour > 18;

  // 🌧️ Rain
  if (normalized?.includes("rain")) {
    return "https://cdn.pixabay.com/animation/2023/03/05/12/04/12-04-53-685_512.gif";
  }

  // ☁️ Clouds / Overcast
  if (normalized?.includes("cloud")) {
    return isNight
      ? "https://media.tenor.com/bpk2yCnpPSwAAAAM/night-sky-night.gif" // 🌙 cloudy night
      : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXo3Yml2eWFjbzlsdmljc3p2N3k4bnk4ZG14Z215amdoM3phcXI4YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G1T5M0qT6ZJlu/giphy.gif";
  }

  // ❄️ Snow
  if (normalized?.includes("snow")) {
    return "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnozNWQyYnNicWpxYTNpaHhubzdmOGIxeDV6Z2prM2U0cWNmNWdpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BDucPOizdZ5AI/giphy.gif";
  }

  // ⛈️ Thunderstorm
  if (normalized?.includes("thunder")) {
    return "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTYzOG91dGpmcWlneHlieHVoZWpicWlsN2kzMDNldWwwYW1kdG1uNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CKlafeh1NAxz35KTq4/giphy.gif";
  }

  // 🌫️ Mist / Fog / Haze
  if (["mist", "fog", "haze", "smoke"].some((term) => normalized?.includes(term))) {
    return "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFvbWx0NnI0NjY1ZjJlN282MGZzcHcxb3E3Mjl2ZTR3NXlraWJveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZWRCWdUymIGNW/giphy.gif";
  }

  // 🌞 Clear weather
  if (normalized?.includes("clear")) {
    return isNight
      ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fanimation%2F2022%2F12%2F01%2F02%2F15%2F02-15-40-69_512.gif&f=1&nofb=1&ipt=d456c857e5e710669ae8c22055920b610c3ed7efb2572a6e6d4149c1583626c7" // ⭐ clear night
      : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.giphy.com%2Fmedia%2FrLPMETupldhNm%2Fgiphy.gif&f=1&nofb=1&ipt=b128b04012e715ac66b77d5162a472e510c1718f066d2485b9a730b92e91c20e"; // sunny day
  }

  // 🌡️ Fallback by temperature
  if (temp <= 5) {
    return "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHAwZmxnbXpraXEwdXJlejNoOTZvaWNpZTl5a3RvaTBsdmU4b29uciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BDucPOizdZ5AI/giphy.gif";
  } else if (temp <= 15) {
    return isNight
      ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.icegif.com%2Fwp-content%2Fuploads%2F2022%2F11%2Ficegif-886.gif&f=1&nofb=1&ipt=2d984a5dd1c104aa3c5751e011fdba991c7fea3da9479c85ddfbee558b74328a" // ❄️ cold night
      : "https://i.makeagif.com/media/11-06-2015/bs4ZRd.gif";
  } else if (temp <= 25) {
    return isNight
      ? "https://i.pinimg.com/originals/27/24/3a/27243a6de7158c306eb396c946b56984.gif" // 🌃 warm night
      : "https://i.gifer.com/embedded/download/CZx.gif";
  } else {
    return isNight
      ? "https://cdn.outsideonline.com/wp-content/uploads/2017/06/22/scorching-camping_h.jpg" // 🔥 hot night
      : "";
  }
}
