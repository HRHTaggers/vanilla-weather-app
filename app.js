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
