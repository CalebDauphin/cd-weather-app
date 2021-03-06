function dateAndTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (hour < 12) {
    hour = `${hour}:${minutes} AM EST`;
  } else {
    hour = `${hour}:${minutes} PM EST`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}`;
}

function search(city) {
  let apiKey = "f4d989e0a37469e143375a913c800d40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function cityName(event) {
  event.preventDefault();
  let cityInputEl = document.querySelector("#city-input");
  search(cityInputEl.value); 
}

search("New York");

// // Feature 3
// let temp = document.querySelector("#temp");
// let celsius = document.querySelector("#celsius");
// let fahrenheit = document.querySelector("#fahrenheit");

// function celsiusTemp(event) {
//   event.preventDefault();
//   temp.innerHTML = 25;
// }

// function fahrenheitTemp(event) {
//   event.preventDefault();
//   temp.innerHTML = 10;
// }
// fahrenheit.addEventListener("click", fahrenheitTemp);
// celsius.addEventListener("click", celsiusTemp);

function displayTemperature(response) {
  let temperatureEl = document.getElementById("temperature");
  temperatureEl.innerHTML = Math.round(response.data.main.temp);
  let cityEl = document.getElementById("city");
  cityEl.innerHTML = response.data.name;

  let descriptionEl = document.getElementById("description");
  descriptionEl.innerHTML = response.data.weather[0].description;
  let humidityEl = document.getElementById("humidity");
  humidityEl.innerHTML = response.data.main.humidity;
  let windEl = document.getElementById("wind");
  windEl.innerHTML = Math.round(response.data.wind.speed);
  let dateEl = document.getElementById("date");
  dateEl.innerHTML = dateAndTime(response.data.dt * 1000);
  let iconEl = document.getElementById("icon");
  iconEl.setAttribute("src", ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconEl.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);