const express = require('express');
const axios = require('axios');
const router = express.Router();
const SearchHistory = require('../modelos/historial');

const API_KEY = '054b06cbdc280d1965eebba0a076c66d';

const weatherDescriptions = {
    "clear sky": "cielo despejado", 
    "few clouds": "pocas nubes",
    "scattered clouds": "nubes dispersas",
    "broken clouds": "nubes rotas",
    "shower rain": "lluvia ligera",
    "rain": "lluvia",
    "thunderstorm": "tormenta",
    "snow": "nieve",
    "mist": "neblina",
    "overcast clouds" : "nubes nubladas"
};

const propertyTranslations = {
    city: "ciudad",
    temperature: "temperatura",
    description: "descripción",
    humidity: "humedad",
    windSpeed: "velocidad del viento"
};

router.get('/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherData = response.data;

        const windSpeedKmh = weatherData.wind.speed * 3.6;

        const translatedWeather = {
            [propertyTranslations.city]: weatherData.name,
            [propertyTranslations.temperature]: weatherData.main.temp,
            [propertyTranslations.description]: weatherDescriptions[weatherData.weather[0].description] || weatherData.weather[0].description,
            [propertyTranslations.humidity]: weatherData.main.humidity,
            [propertyTranslations.windSpeed]: windSpeedKmh.toFixed(2),
        };

    const searchEntry = new SearchHistory({ city: weatherData.name });
    await searchEntry.save();
    
        res.json(translatedWeather);
    } catch (error) {
        console.error('Error al recuperar datos meteorológicos', error);
        res.status(500).json({ error: 'Error al recuperar datos meteorológicos' });
    }
});

module.exports = router;