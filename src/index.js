function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
    <div class="col-1">
      <div class="weather-forecast-day">${day}</div>
      <div class="weather-forecast-icon">
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png"
          alt=""
          width="50"
          class="weather-forecast-icon"
        />
      </div>
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-high">22°</span>
        <span class="weather-forecast-temperature-low">12°</span>
      </div>
    </div>
  </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
              src="${response.data.condition.icon_url}" class="weather-data-current-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${minutes}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dates = date.getDate();

  if (dates < 10) {
    dates = `0${dates}`;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let year = date.getFullYear();

  return `${day} ${dates} ${month} ${year}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "13da71b4bebee18bac0t70ddd06fbo9b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input-search");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("Lisbon");

displayForecast();
