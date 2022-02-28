//Date and Time variable//
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {hours = `0${hours}`}
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

//API connector & variables//
function retrieveWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp-today"); 
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let weatherIconElement = document.querySelector("#weather-icon");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );
  dateElement.innerHTML = formatDate(response.data.dt*1000)
}

function searchCity(city) {
let apiKey = `72a4d6e3c49499c57e42e446cad198b6`;
let chosenUnits = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={${city}&units=${chosenUnits}&appid=${apiKey}`;

axios.get(apiUrl).then(retrieveWeather);
}

function findCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

searchCity();

//Search Engine//
let form = document.querySelector("#search-engine");
form.addEventListener("submit", findCity);