//show the current  date and time
function findDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat"];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//show city temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#dayGrad");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#newCity");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  // Angaben zum wetter
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  //date element
  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = findDate(response.data.dt * 1000);

  // show the icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let key = "1989ce48f0ddeb9155d07cad2fe7cac2";
let city = "greifswald";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric  `;

axios.get(apiUrl).then(displayTemperature);

/*
// display the city search result
function searchTheCity(event) {
  event.preventDefault();

  let newCity = document.querySelector("#cityinput");
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${key}&units=metric  `;
  axios.get(urlApi).then(displayCityTemperature);

  let city = document.querySelector("#newCity");

  if (city.value.length >= 3) {
    newCity.innerHTML = `${cityInput.value}`;
  } else {
    alert(`Please enter a city …`);
  }

  /*
let city = document.querySelector("#newCity");
city.addEventListener("submit", Search);
}else {
    alert(`Please enter a city …`);*/

//display currentposition
/*
function currentPosition(position) {
  // let temperature = Math.round(response.data.main.temp);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let positionApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(positionApi).then(displayCityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);

  let currentCityLocation = ` https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${key} `;
  if (currentCityLocation.length !== 0) {
    let currentCity = document.querySelector(".cityname");
    currentCity.innerHTML = `${currentCity} `;
  } 
}
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", getCurrentLocation);

//display date and time
function displayDate(event) {
  event.preventDefault();

  let currentDate = new Date();

  let days = ["Sonday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if (hours < 10 && minutes < 10) {
    hours = `0${hours}`;
    minutes = `0${minutes}`;
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
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];

  let newDate = document.querySelector("#currentDate");
  newDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minute}`;
}

//convert the degrees
let degreeElement = document.querySelector("#dayGrad");
function convertDegrees(event) {
  event.preventDefault();
  //remove the link effect on fahrenheit
  if (fahrenheitLink.classList.add("active")) {
    celciusLink.classList.remove("active");
    let convertInFahrenheit = (celciusTemp + 9) / 5 + 32;
    degreeElement.innerHTML = Math.round(convertInFahrenheit);
  } else {
    //remove the link effect on celcius
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    //convert celcius by selecting the celcius id and changing the day temperature
    let convertInCelcius = (convertInFahrenheit - 32) / 1.8;
    degreeElement.innerHTML = Math.round(convertInCelcius);
  }
}

let fahrenheitLink = document.querySelector("#fahrenheitDay");
fahrenheitLink.addEventListener("click", convertDegrees);

let celciusLink = document.querySelector("#celciusDay");
celciusLink.addEventListener("click", convertDegrees);

//display the temperature
function displayCityTemperature(weatherData) {
  let degrees = Math.round(weatherData.main.temp);
  degreeElement.innerHTML = `${degrees}`;

  //wind, precipitation, humidity
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(weatherData.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `Precipitation: ${precipitation.value}%`;

  //icon and temperature

  displayDate(weatherData.dt * 1000);

  let iconElement = document.querySelector("#icon");

  //change the value of icon attribute to...
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
  );

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = weatherData.weather[0].description;

   searchForCity(cityInput.value);
}
*/
