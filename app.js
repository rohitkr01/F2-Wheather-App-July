const API_KEY = '6f999c61c59c8242ea86bf5a334c5144'; 
const weatherCardsElement = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const addCityBtn = document.getElementById('addCityBtn');
let cities = [];

addCityBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '' && !cities.find(item => item.city.toLowerCase() === city.toLowerCase())) {
    fetchWeatherData(city);
  }
  cityInput.value = '';
});

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const cityData = {
        city,
        temperature: data.main.temp,
        data
      };
      cities.push(cityData);
      cities.sort((a, b) => a.temperature - b.temperature);
      updateWeatherCards();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function updateWeatherCards() {
  weatherCardsElement.innerHTML = '';
  cities.forEach(cityData => {
    displayWeatherCard(cityData);
  });
}

function displayWeatherCard(cityData) {
  const weatherCard = document.createElement('div');
  weatherCard.className = 'weather-card';

  const weatherIcon = document.createElement('img');
  weatherIcon.className = 'weather-icon';
  weatherIcon.src = `http://openweathermap.org/img/wn/${cityData.data.weather[0].icon}.png`;

  const cityName = document.createElement('h2');
  cityName.textContent = cityData.city;

  const temperature = document.createElement('p');
  temperature.textContent = `Temperature: ${cityData.temperature}°C`;

  const weatherCondition = document.createElement('p');
  weatherCondition.textContent = `Weather: ${cityData.data.weather[0].description}`;

  // Add additional weather data
  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${cityData.data.main.humidity}%`;

  const pressure = document.createElement('p');
  pressure.textContent = `Pressure: ${cityData.data.main.pressure} hPa`;

  const wind = document.createElement('p');
  wind.textContent = `Wind Speed: ${cityData.data.wind.speed} m/s, Direction: ${cityData.data.wind.deg}°`;

  weatherCard.appendChild(weatherIcon);
  weatherCard.appendChild(cityName);
  weatherCard.appendChild(temperature);
  weatherCard.appendChild(weatherCondition);
  weatherCard.appendChild(humidity);
  weatherCard.appendChild(pressure);
  weatherCard.appendChild(wind);

  weatherCardsElement.appendChild(weatherCard);
}
