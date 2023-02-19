<!-- Розмітка віджета погоди
<li class="weather__card">
        <div class="weather__data">
          <div class="weather__temp">${}</div>
          <div class="weather__info">
            <span class="weather__condition">${}</span>
            <span class="weather__location"><svg class="location-icon" width="27" height="27"><use href="./images/icons.svg#icon-location"></use></svg>
              <p class="weather__location-place">${}</p> </span>
          </div>
        </div>
        <img class="weather__icon" src="${}" alt="" width="165" height="156">
        <p class="weather__date">${}<br>
           </p>
       <div class="weather__link"> <a class="weather__link-site" href="https://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505" target="_blank" rel = ”noopener” rel = ”noreferrer”>weather for week</a></div>
      </li> -->

<!-- 
      // (() => {
//   const mobileMenu = document.querySelector('.js-menu-container');
//   const openMenuBtn = document.querySelector('.js-open-menu');
//   const closeMenuBtn = document.querySelector('.js-close-menu');

//   const toggleMenu = () => {
//     const isMenuOpen =
//       openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//     openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//     mobileMenu.classList.toggle('is-open');

//    //  const scrollLockMethod = !isMenuOpen
//    //    ? 'disableBodyScroll'
//    //    : 'enableBodyScroll';
//    //  bodyScrollLock[scrollLockMethod](document.body);
//   };

//   openMenuBtn.addEventListener('click', toggleMenu);
//   closeMenuBtn.addEventListener('click', toggleMenu);

//   // Close the mobile menu on wider screens if the device orientation changes
//   window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
//     if (!e.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     bodyScrollLock.enableBodyScroll(document.body);
//   });
// })();

// rendering
// const searchForm = document.getElementById('search-form');
// const wrapOfNewsCards = document.querySelector('.news__wrap');


// // Запит на сервер новин
// class NewsApi {
//   constructor() {
//     this.searchQuery = '';
//   }

//   async fetchNewsApi() {
//      const res = await fetch(
//        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.searchQuery}&api-key=Jskr64jvO4w6izGOo9c1R2Adr3zLD1Vs`
//      );
//       const data = await res.json();
//      return data;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

// const newsApi = new NewsApi();

// searchForm.addEventListener('submit', onSearchClick);

// async function onSearchClick(e) {
//   e.preventDefault();
//   newsApi.query = e.currentTarget.elements.searchQuery.value.trim();
   
//    const searchApi = await newsApi.fetchNewsApi();
//    const resultApi = await searchApi.response.docs;
//    console.log(resultApi);
//    appendNewsMarkup(resultApi);
// }

// function createMarkupNewsCards(docs) {
//    return docs.map(doc => {
//       const { headline, snippet, multimedia, pub_date, web_url } = doc;

//       return ` <div class="news__card">
//             <a href="${web_url}">
<!-- <!-- //                <img src="https://www.nytimes.com/${
//                  multimedia[0].url || ''
//                }" alt="" loading="lazy"></img>  -->
//                <div class="info">
//                   <h2 class="info__title">${headline.main}</h2>
//                   <h3 class="info__predesc">${snippet}</h3>
//                   <p class="info__date">${pub_date}</p>
//                </div>
//             </a>
//          </div>`;
//    }).join('');
// }

// function appendNewsMarkup(docs) {
//   wrapOfNewsCards.insertAdjacentHTML(
//     'beforeend',
//     createMarkupNewsCards(docs)
//   );
// } -->

 <!-- <header>
       <div class="nav">
      <a href="" class="nav__logo">News</a>
     
         <form class="search-form" id="search-form">
 <input type="text" id="search-input" name="searchQuery" autocomplete="off" placeholder="Search..." />     
                 <!-- <svg width="15" height="15"><use href="./img/icons.svg#icon-bx_search" ></use></svg> -->    

    <!-- </form>
     
       <button class="js-open-menu" type="button" aria-expanded="false" aria-controls="header__nav">
         <svg width="24" height="24">
            <use href="./images/icons.svg#icon-menu"></use>
         </svg>
       </button> -->
<!-- Mobile menu navigation -->
  <!-- <div class="menu-container js-menu-container" id="mobile-menu">
   <div class="nav">
      <a href="" class="nav__logo">News</a>
      <button type="button"
             class="menu-btn js-close-menu menu-toggle">
            <svg width="24" height="24">
               <use href="./images/icons.svg#icon-cross"></use>
            </svg>
          </button>
   </div>
    <ul class="menu-list">
      <li class="menu-list__item"><a class="menu-list__link" href=""><svg class="menu-list__icon-before" width="32" height="32"><use href="./images/icons.svg#icon-home"></use></svg>Home<svg class="menu-list__icon-after" width="32" height="32"><use href="./images/icons.svg#icon-chevron-right"></use></svg></a>
      </li>
      <li class="menu-list__item"><a class="menu-list__link" href=""><svg class="menu-list__icon-before" width="32" height="32"><use href="./images/icons.svg#icon-favorite"></use></svg>Favorite<svg class="menu-list__icon-after" width="32" height="32"><use href="./images/icons.svg#icon-chevron-right"></use></svg></a></li>
      <li class="menu-list__item"><a class="menu-list__link" href=""><svg class="menu-list__icon-before" width="32" height="32"><use href="./images/icons.svg#icon-read"></use></svg>Read<svg class="menu-list__icon-after" width="32" height="32"><use href="./images/icons.svg#icon-chevron-right"></use></svg></a></li>
    </ul>
  </div>
  </div>
   </header> -->

    <img src="https://www.nytimes.com/${multimedia[0].url}" alt="" loading="lazy"></img> 