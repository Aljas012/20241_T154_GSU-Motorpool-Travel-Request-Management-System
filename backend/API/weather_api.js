const express = require('express');
const fetch = require('node-fetch'); // Ensure 'node-fetch' is installed

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Main function to get the weather data
const weatherAPI = async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('received latitude', latitude);
  console.log('received longitude', longitude);

  try {
    const apiKey = "46ba9c63ee4979514f76bf5a5f64dfe4"; // Replace with your actual API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const weatherData = await response.json();

    if (!weatherData || !weatherData.sys || !weatherData.main || !weatherData.weather) {
      throw new Error("Incomplete weather data received from API");
    }

    const filteredData = {
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      temperature: (weatherData.main.temp - 273.15).toFixed(2), // Convert from Kelvin to Celsius
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error fetching weather data" });
  }
};

app.post('/user/api/weather', weatherAPI); // Your route

module.exports = weatherAPI;
