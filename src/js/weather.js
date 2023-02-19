import axios from 'axios';

const weatherContainer = document.querySelector('.weather__card');

// Отримання координат поточного місцязнаходження
let latitude = +localStorage.getItem('USER_LATITUDE');
let longitude = +localStorage.getItem('USER_LONGITUDE');

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findLocation, errorHandler);
  } else {
    alert('Sorry, browser does not support geolocation!');
  }
}

function errorHandler(err) {
  if (err.code == 1) {
    alert('Error: Access is denied!');
  } else if (err.code == 2) {
    alert('Error: Position is unavailable!');
  }
}

function findLocation(pos) {
  let crd = pos.coords;
  let userLatitude = crd.latitude;
  let userLongitude = crd.longitude;
  localStorage.setItem('USER_LATITUDE', userLatitude);
  localStorage.setItem('USER_LONGITUDE', userLongitude);
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '26ee5cfba4c9a8162c8c1ca031ae1bc4';

// Запит на сервер погоди
async function fetchWeatherApi() {
  const res = await axios.get(
    `${BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  console.log(res.data);
  return res.data;
}

// Запит на сервер для отриманная поточної назви міста
async function fetchWeatherApiGeo() {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  console.log(res.data);
  return res.data;
}

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

function markup() {
  weatherContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="weather__data">
          <div class="weather__temp">
            <span class="weather__temp-deg"></span>
          <span>&deg</span>
          </div>
          <div class="weather__info">
            <span class="weather__condition"></span>
            <span class="weather__location"><svg class="location-icon" width="27" height="27"><use href="./images/icons.svg#icon-location"></use></svg>
              <p class="weather__location-place"></p> </span>
          </div>
        </div>
        <img class="weather__icon" alt="" width="165" height="156">
        <p class="weather__date">
          <span class="weather__day-week"></span>
          <span class="weather__month"></span>
           </p>
       <div class="weather__link"> <a class="weather__link-site" target="_blank" rel = ”noopener” rel = ”noreferrer”>weather for week</a></div>`
  );
}
markup();

let refs = { 
  weatherTemp: document.querySelector('.weather__temp-deg'),
  weatherCondition: document.querySelector('.weather__condition'),
  weatherLocation: document.querySelector('.weather__location-place'),
  weatherIcon: document.querySelector('.weather__icon'),
  weatherDay: document.querySelector('.weather__day-week'),
  weatherFullDate: document.querySelector('.weather__month'),
  weatherLinkSite: document.querySelector('.weather__link-site'),
};

// function createMarkup() {
//    const weatherData = document.createElement("div");
//    weatherData.classList.add('weather__data');
//    weatherContainer.append(weatherData);

//    const tempContainer = document.createElement("div");
//    tempContainer.classList.add('weather__temp');
//    weatherData.append(tempContainer);

//    const temp = document.createElement("span");
//    temp.classList.add('weather__temp-deg');
//    tempContainer.append(temp);

//    const deg = document.createElement('span');
//    tempContainer.append(deg);

//    const infoContainer = document.createElement('div');
//    infoContainer.classList.add('weather__info');
//    weatherData.append(infoContainer);

//    const temp = document.createElement('span');
//    temp.classList.add('weather__temp-deg');
//    tempContainer.append(temp);

//     const temp = document.createElement('span');
//     temp.classList.add('weather__temp-deg');
//    tempContainer.append(temp);
   
//     const temp = document.createElement('span');
//     temp.classList.add('weather__temp-deg');
//     tempContainer.append(temp);
// }

// Функція для дінамичного додавання даних з API до розмітки
async function markupWeatherCard() {
  const data = await fetchWeatherApi();
   const geo = await fetchWeatherApiGeo();
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

//! Єдина функція для віджету погоди

function getWeatherWidget() {
  getCurrentLocation();
  markupWeatherCard();
}

export { getWeatherWidget };