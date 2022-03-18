//Date and Time variable//
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {hours = `0${hours}`};
  if(hours >=7 && hours <19) {document.body.classList.add("day-background"); document.body.classList.remove("night-background");
    } else {
      if(hours <7 || hours >=19) {document.body.classList.add("night-background"); document.body.classList.remove("day-background");
      } else {
        document.body.classList.remove("day-background"); document.body.classList.remove("night-background");
      }
    }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = weekdays[date.getDay()];
  let day = date.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  return `${weekday}, ${day} ${month}  ${hours}:${minutes}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}

function formatDay(timestamp) {
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

//API connector & variables//
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if(index < 6) {
  forecastHTML =
    forecastHTML +
    `
      <div class="col-md-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img 
          src="src/${
          forecastDay.weather[0].icon
          }.png";
          alt="${forecastDay.weather[0].description}
          width="100"
          height="100"
          class="img-fluid"
          />
          <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">  ${Math.round(
          forecastDay.temp.min
          )}°</span>
      </div>
    </div>
    `;
  };
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = `72a4d6e3c49499c57e42e446cad198b6`;
  let chosenUnits = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${chosenUnits}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function retrieveWeather(response) {
  let temperatureElement = document.querySelector("#temp-today"); 
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let weatherIconElement = document.querySelector("#weather-icon");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let dateElement = document.querySelector("#date");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = `Current Weather: ${response.data.name}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `src/${response.data.weather[0].icon}.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise*1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset*1000);
  dateElement.innerHTML = `Last updated: ${formatDate(response.data.dt*1000)}`;

  getForecast(response.data.coord);
}

//Search Engine//
function searchCity(city) {
let apiKey = `72a4d6e3c49499c57e42e446cad198b6`;
let chosenUnits = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${chosenUnits}&appid=${apiKey}`;

axios.get(apiUrl).then(retrieveWeather);
}

function findCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = fahrenheitTemperature;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", findCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity();
displayForecast();