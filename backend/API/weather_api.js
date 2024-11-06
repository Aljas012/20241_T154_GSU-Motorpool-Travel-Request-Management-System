const axios = require('axios');

// Coordinates for location
const longitude = 125.12487165341537;
const latitude = 8.157766560970508;

// Function to get weather data
const getWeatherData = async () => {
    const weatherAPI_link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=46ba9c63ee4979514f76bf5a5f64dfe4`;

    try {
        const response = await axios.get(weatherAPI_link);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to display weather data
const displayWeatherData = (weatherData) => {
    document.getElementById("location").textContent = `Location: ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C`;
        document.getElementById("weather").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
};

// Fetch and display weather data at intervals
const updateWeather = async () => {
    const weatherData = await getWeatherData();
    if (weatherData) displayWeatherData(weatherData);
};

// Fetch every 10 minutes (600,000 ms) and update display every second
setInterval(updateWeather, 600000);
setInterval(async () => {
    const weatherData = await getWeatherData();
    if (weatherData) displayWeatherData(weatherData);
})