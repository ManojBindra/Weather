'use strict';
const weatherProperties = {};

//navigator.geolocation.getCurrentPosition(positionCallBack);
const apiKey = "5d0d5940219b27a2cf8466b1823d2573";

//navigator call
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function successCallback(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiCall(lat, lon);

}

function errorCallback() {
  console.log("not able to find position");

}
//API Calling

function apiCall(lat, lon) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(api)
    .then(res => res.json())
    .then(data => {
      weatherProperties.temp = data.main.temp;
      weatherProperties.humidity = data.main.humidity;
      weatherProperties.location = data.name;
      weatherProperties.icon = data.weather[0].icon;
    })
    .then(() => displayWeather())
};
//updating the DOM
function displayWeather() {
  let newTemp = document.querySelector(".temprature-value");
  let newHumid = document.querySelector(".humidity-value");
  let newNotification = document.querySelector(".notification");
  document.getElementById("image").src="http://openweathermap.org/img/wn/"+weatherProperties.icon+"@2x.png";
  newTemp.innerHTML = `Temprature ${weatherProperties.temp}<span>°C</span>`;
  newHumid.innerHTML= `<span>Humidity</span> ${weatherProperties.humidity} %`;
  newNotification.innerHTML = weatherProperties.location;
}



//DOM
// var newTemp = document.querySelector(".temprature-value");
// console.log(WeatherProperties.temp);
// newTemp.innerHTML =  `${WeatherProperties.temp}<span>C</span>`;
// console.log(document.querySelector(".temprature-value"));
