// src/weatherCodes.js
const weatherCodes = {
  0: { text: "Clear sky", emoji: "☀️" },
  1: { text: "Mainly clear", emoji: "🌤️" },
  2: { text: "Partly cloudy", emoji: "⛅" },
  3: { text: "Overcast", emoji: "☁️" },
  45: { text: "Fog", emoji: "🌫️" },
  51: { text: "Light drizzle", emoji: "🌦️" },
  61: { text: "Slight rain", emoji: "🌧️" },
  65: { text: "Heavy rain", emoji: "⛈️" },
  71: { text: "Snowfall", emoji: "❄️" },
  80: { text: "Rain showers", emoji: "🌦️" },
  95: { text: "Thunderstorm", emoji: "⛈️" },
};

export function describe(code) {
  return weatherCodes[code] || { text: "Unknown weather", emoji: "🌍" };
}

export default weatherCodes;