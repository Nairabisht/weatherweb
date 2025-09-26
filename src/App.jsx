// src/App.jsx
import React, { useState } from "react";
import { geocode, getCurrentWeather } from "./api/openMeteo";
import WeatherCard from "./components/weatherCard";
import "./components/styles/App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    setPlaces([]);
    setWeather(null);

    try {
      const results = await geocode(query);
      if (!results.length) setError("No locations found");
      else setPlaces(results);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSelect(place) {
    setSelected(place);
    setPlaces([]);
    setLoading(true);
    setError("");
    try {
      const r = await getCurrentWeather(place.latitude, place.longitude);
      if (r && r.current_weather) setWeather(r.current_weather);
      else setError("No weather data for this location");
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌍 Weather Now</h1>
        <p className="subtitle">Your quick weather update, anywhere in the world</p>
      </header>

      <form className="search" onSubmit={handleSearch}>
        <div className="search-wrapper">
          <input
            aria-label="City name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type city (e.g. London, Delhi)"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {loading && <div className="info">Loading…</div>}
      {error && <div className="error">{error}</div>}

      {places.length > 0 && (
        <ul className="places">
          {places.map((p) => (
            <li key={`${p.id}-${p.latitude}-${p.longitude}`} onClick={() => handleSelect(p)}>
              <strong>{p.name}</strong>
              {p.admin1 ? `, ${p.admin1}` : ""} {p.country ? ` — ${p.country}` : ""}
            </li>
          ))}
        </ul>
      )}

      {weather && selected && <WeatherCard place={selected} weather={weather} />}

      <footer className="footer">
        <small>Powered by Open-Meteo (no API key)</small>
      </footer>
    </div>
  );
}