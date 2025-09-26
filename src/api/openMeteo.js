// Functions to fetch location and weather data from Open-Meteo API

// Search city name
export async function geocode(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch locations")
  const data = await res.json()
  return data.results || []
}

// Get current weather by latitude & longitude
export async function getCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch weather")
  return await res.json()
}
    