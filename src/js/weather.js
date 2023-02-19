import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let refs = {};

function creatMarkupWeather() {
  const weatherWrap = document.querySelector('.wather-wrap');
  const weatherContainer = document.createElement('ul');
  weatherWrap.append(weatherContainer);
  const weatherWidget = document.createElement('li');
  weatherContainer.append(weatherWidget);
  weatherWidget.classList.add('weather__card');
  weatherWidget.insertAdjacentHTML(
    'beforeend',
    `<div class="weather__data">
          <div class="weather__temp">
            <span class="weather__temp-deg"></span>
          <span class="deg">&#176;</span>
          </div>
          <div class="weather__info">
            <span class="weather__condition"></span>
            <span class="weather__location"><svg class="location-icon" width="27" height="27"><use href="./images/icons.svg#icon-bx_search"></use></svg>
              <p class="weather__location-place"></p> </span>
          </div>
        </div>
        <img id="icon-weather">
        <p class="weather__date">
          <span class="weather__day-week"></span>
          <span class="weather__month"></span>
           </p>
       <div class="weather__link"> <a class="weather__link-site" target="_blank" rel = ”noopener” rel = ”noreferrer”>weather for week</a></div>`
  );
  refs = {
    deg: document.querySelector('.deg'),
    iconPlace: document.querySelector('#icon-place'),
    weatherTemp: document.querySelector('.weather__temp-deg'),
    weatherCondition: document.querySelector('.weather__condition'),
    weatherLocation: document.querySelector('.weather__location-place'),
    weatherIcon: document.querySelector('#icon-weather'),
    weatherDay: document.querySelector('.weather__day-week'),
    weatherFullDate: document.querySelector('.weather__month'),
    weatherLinkSite: document.querySelector('.weather__link-site'),
  };
  return refs;
}

// Отримання координат поточного місцязнаходження
let latitude = +localStorage.getItem('USER_LATITUDE');
let longitude = +localStorage.getItem('USER_LONGITUDE');

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findLocation, errorHandler);
    
  } else {
    Notiflix.Notify.failure('Sorry, browser does not support geolocation!');
  }
}

function errorHandler(error) {
  if (error.code == error.PERMISSION_DENIED) {
    //   функция дефолтного запиту
    markupWeatherCardDefault();
    Notiflix.Notify.failure('Error: Access is denied!');
  }
}

function findLocation(pos) {
  let crd = pos.coords;
  let userLatitude = crd.latitude;
  let userLongitude = crd.longitude;
  localStorage.setItem('USER_LATITUDE', userLatitude);
  localStorage.setItem('USER_LONGITUDE', userLongitude);
  markupWeatherCard();
}

const BASE_URL = 'https://api.openweathermap.org/';
const API_KEY = '26ee5cfba4c9a8162c8c1ca031ae1bc4';

// Запит на сервер погоди
async function fetchWeatherApi() {
  const res = await axios.get(
    `${BASE_URL}data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  console.log(res.data);
  return res.data;
}

// Запит на сервер для отриманная поточної назви міста
async function fetchWeatherApiGeo() {
  const res = await axios.get(
    `${BASE_URL}geo/1.0/reverse?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  console.log(res.data);
  return res.data;
}

// / Запит на сервер для отриманная погоди за замовчуванням (Київ)
async function fetchWeatherApiDefault() {
  const res = await axios.get(
    `${BASE_URL}data/2.5/weather?q=London&units=metric&appid=${API_KEY}`
  );
  console.log(res.data);
  return res.data;
}
fetchWeatherApiDefault();

// Функції для отримання поточної дати/місяця/року
let date = new Date();

function getCurrentWeekDay(date) {
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return days[date.getDay()];
}

function getCurrentFullDate(date) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let fullDate =
    date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  return fullDate;
}

//! Єдина функція для віджету погоди

function getWeatherWidget() {
  getCurrentLocation();
  
  // markupWeatherCard();
}

// Функція для дінамичного додавання даних з API до розмітки
async function markupWeatherCard() {
  const data = await fetchWeatherApi();
  const geo = await fetchWeatherApiGeo();
  creatMarkupWeather();
  refs.weatherTemp.textContent = Math.floor(data.main.temp);
  refs.weatherLocation.textContent = geo[0].name;
  refs.weatherCondition.textContent = data.weather[0].main;
  refs.weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  refs.weatherDay.textContent = getCurrentWeekDay(date);
  refs.weatherFullDate.textContent = getCurrentFullDate(date);
  refs.weatherLinkSite.setAttribute(
    'href',
    `https://www.wunderground.com/forecast/${geo[0].country}/${geo[0].name}`
  );
}

async function markupWeatherCardDefault() {
  const data = await fetchWeatherApiDefault();
  creatMarkupWeather();
  refs.weatherTemp.textContent = Math.floor(data.main.temp);
  refs.weatherLocation.textContent = data.name;
  refs.weatherCondition.textContent = data.weather[0].main;
  refs.weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  refs.weatherDay.textContent = getCurrentWeekDay(date);
  refs.weatherFullDate.textContent = getCurrentFullDate(date);
  refs.weatherLinkSite.setAttribute(
    'href',
    `https://www.wunderground.com/forecast/gb/London`
  );
}


export { getWeatherWidget };
