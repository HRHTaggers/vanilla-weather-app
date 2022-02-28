let now = new Date();
let weekdaynumber = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdaynumber[now.getDay()];

let monthnumber = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = monthnumber[now.getMonth()];

//Today's date and time//
document.getElementById("weekday").innerHTML = weekday;
document.getElementById("day").innerHTML = now.getDate();
document.getElementById("month").innerHTML = month;
document.getElementById("hours").innerHTML =
  (now.getHours() < 10 ? "0" : "") + now.getHours();
document.getElementById("minutes").innerHTML =
  (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

//API connector & variables//
function retrieveWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp-today"); 
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let weatherIconElement = document.querySelector("#weather-icon");

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
}

let apiKey = `72a4d6e3c49499c57e42e446cad198b6`;
let chosenUnits = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=${chosenUnits}&appid=${apiKey}`;

axios.get(apiUrl).then(retrieveWeather);