let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}  ${date}th  ${month}  ${hour}:${minutes}`;
//search
function showCurrentLocationData(response) {
  document.querySelector("#chosenCity").innerHTML = response.data.name;
  document.querySelector("#tempValue").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;

  console.log(response.data);
}

function search(event) {
  event.preventDefault();
  let apiKey = "9e215efc106c765d44690271c6c7636c";
  let citySelected = document.querySelector("#exampleInputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationData);
}
let button = document.querySelector("button");
button.addEventListener("click", search);

//Fahrenheit
function fahrenheit(event) {
  event.preventDefault();
  let degreeFahrenheit = document.querySelector("#tempValue");
  let temperature = degreeFahrenheit.innerHTML;
  degreeFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function celsius(event) {
  event.preventDefault();
  let degreeCelsius = document.querySelector("#tempValue");
  let temperature = degreeCelsius.innerHTML;
  degreeCelsius.innerHTML = Math.round((temperature - 32) * (5 / 9)); //(32°F − 32) × 5/9
}
let linkFahrentheit = document.querySelector("#degreeFahrenheit");
linkFahrentheit.addEventListener("click", fahrenheit);

let linkCelsius = document.querySelector("#degreeCelsius");
linkCelsius.addEventListener("click", celsius);

// get current location

//3
function searchCurrentLocation(position) {
  let apiKey = "9e215efc106c765d44690271c6c7636c";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentLocationData);
}

//2
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

//1
let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", showCurrentLocation);
