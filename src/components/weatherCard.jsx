    // src/components/WeatherCard.jsx
    import React from "react";
    import { describe } from "../utils/weatherCodes";
    import "./styles/card.css";

    export default function WeatherCard({ place, weather }) {
    const weatherDesc = describe(weather.weathercode);

    return (
        <div className="weather-card">
        <h2>
            {place.name}
            {place.admin1 ? `, ${place.admin1}` : ""} — {place.country}
        </h2>
        <p className="condition">{weatherDesc.emoji} {weatherDesc.text}</p>
        <p className="temp">{weather.temperature}°C</p>
        <p>💨 Wind: {weather.windspeed} km/h</p>
        <p>🕒 Time: {weather.time}</p>
        </div>
    );
    }