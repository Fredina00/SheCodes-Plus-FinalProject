function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minute = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];

  let day = days[date.getDay()];

  if (minute < 10) {
    minutes = `0${minute}`;
  }

  return `${day} ${hours}:${minute}`;
}

function searchCity(city) {
  let apiKey = "2ocb7acd896tf43b0e5f09484729f44d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "2ocb7acd896tf43b0e5f09484729f44d";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
    let forecast = document.querySelector("#forecast");

    let days = ["Tue","Wed","Thu","Fri","Sat"];
    let forecastHtml = "";

    days.forEach(function(day){
         forecastHtml = forecastHtml + `
 <div class="forecast-date">
                <div class="forecast-day">${day}</div>
                <div class="forecast-icon">🌥️</div>
                <div class="forecast-temp-day">
                   <div class="forecast-temperature">
                   <strong>15°</strong></div>
                   <div class="forecast-temperature">9°</div>
                </div>
            </div>
`;
    });

   forecast.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Accra");


