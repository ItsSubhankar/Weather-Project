async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = "Loading...";
  
    try {
      // Step 1: Geocoding (get lat/lon)
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoResponse.json();
  
      if (!geoData.results || geoData.results.length === 0) {
        resultDiv.innerHTML = "City not found.";
        return;
      }
  
      const { latitude, longitude, name, country } = geoData.results[0];
  
      // Step 2: Get current weather
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherResponse.json();
      const weather = weatherData.current_weather;
  
      resultDiv.innerHTML = `
        <strong>Weather in ${name}, ${country}</strong><br>
        🌡️ Temperature: ${weather.temperature}°C<br>
        💨 Wind Speed: ${weather.windspeed} km/h<br>
        📍 Time: ${weather.time}
      `;
    } catch (error) {
      console.error("Error fetching weather:", error);
      resultDiv.innerHTML = "Something went wrong. Please try again.";
    }
  }