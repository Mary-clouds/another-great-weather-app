// api key as a global variable
let key = `a43564c91a6c605aeb564c9ed02e3858`;
//my apikey hier did not work"1989ce48f0ddeb9155d07cad2fe7cac2";

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
//display the forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast-card");

  // make a html code repeat with new variables
  let forecastHTML = `<div class="row"> `;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class = "column"> 
            <div class="card">
            <h5 class="card-title">${day}</h5>
            <h6 class="card-subtitle mb-3 text-muted" id="forecast-date">
              23 Mai <span id="forecast-icon">🌨</span>
            </h6>
            <p class="card-text">
              <span id="forecast-temperature-max">25°</span>|<span
                id="forecast-temperature-min"
                >15°</span
              >
            </p>
            </div>
            </div>
           
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//implement the daily forecast
function getForecast(coordinates) {
  console.log(coordinates);

  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric `;

  console.log(forecastApiUrl);
  axios.get(forecastApiUrl).then(displayForecast);
}
//show city temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#dayGrad");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#newCity");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  // variable für temperature conversion
  celcius = response.data.main.temp;

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

  // call a function to implement weather forecast
  getForecast(response.data.coord);
}

//search the city
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric  `;
  axios.get(apiUrl).then(displayTemperature);
}

//show the city
function formSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");

  if (cityInputElement.value.length <= 2) {
    alert(`Please enter a cityname!`);
  } else {
    search(cityInputElement.value);
  }
}
//convert in fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  let dayGradElement = document.querySelector("#dayGrad");

  //add the active class for fahrenheit link
  celciusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");

  //fahrenheit convertion formula
  let fahrenheitTemperature = (celcius * 9) / 5 + 32;
  dayGradElement.innerHTML = Math.round(fahrenheitTemperature);
}
// convert in celcius
function displayCelcius(event) {
  event.preventDefault();
  //add the active class for celcius
  celciusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  //celcius conversion code
  let dayGradElement = document.querySelector("#dayGrad");
  dayGradElement.innerHTML = Math.round(celcius);
}
let celcius = null;

//Display  your current location temperature

function currentPosition(position) {
  // let temperature = Math.round(response.data.main.temp);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let positionApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(positionApi).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);

  let currentCityLocation = ` api.openweathermap.org/geo/1.0/weather?${city}&appid=${key}`;
  if (currentCityLocation.length !== 0) {
    let currentCity = document.querySelector("#newCity");
    currentCity.innerHTML = `${currentCity} `;
  }
}

//for the default city
http: https: search("Paris");

//search-Form id
let formElement = document.querySelector("#citySearch");
formElement.addEventListener("submit", formSubmit);

//select the fahrenheit id and excecute the displayFahrenheit function
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);
//select the celcius id and excecute the displayCelcius function
let celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", displayCelcius);
// show your current location temp
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", getCurrentLocation);

/*


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
