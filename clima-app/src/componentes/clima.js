import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Error al obtener datos meteorológicos. Por favor, inténtelo de nuevo.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Clima</h2>
      <input
        type="text"
        placeholder="Ingrese una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={!city || loading}>
        {loading ? 'Cargando...' : 'Obtener el clima'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h3>Clima en {weatherData.ciudad}</h3>
          <p>Temperatura: {weatherData.temperatura}°C</p>
          <p>Descripción: {weatherData.descripción}</p>
          <p>Humedad: {weatherData.humedad}%</p>
          <p>Velocidad del viento: {weatherData["velocidad del viento"]} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;