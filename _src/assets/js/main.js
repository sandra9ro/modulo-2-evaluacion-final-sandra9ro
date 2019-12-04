("use strict");
const button = document.querySelector(".js-button");
const ulSearch = document.querySelector(".js-search-result-container");
const ul = document.querySelector(".ul");
const logBtn = document.querySelector(".js-log");
let series = [];
let favoriteList = [];

//localStorage

function setFavLocalStorage() {
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
}

function getFavLocalStorage() {
  const localStorageFavListJSON = localStorage.getItem("favoriteList");
  const localStorageFavList = JSON.parse(localStorageFavListJSON);
  if (localStorageFavList !== null) {
    favoriteList = localStorageFavList;
    paintFavorites();
    listenSeries();
    paintSeries();
  } else {
    getServerData();
  }
}

//Traer datos del servidor

function getServerData() {
  const input = document.querySelector(".input");
  const inputValue = input.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;
      // series es el array que me he descargado
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });

  paintSeries();
  listenSeries();
  paintFavorites();
  listenButton();
}

//Pintar
function paintSeries() {
  let htmlCode = "";
  for (let i = 0; i < series.length; i++) {
    let isFav = false;
    for (const fav of favoriteList) {
      if (series[i].show.id === fav.show.id) {
        isFav = true;
      }
    }

    if (isFav === true) {
      htmlCode += `<li class="li js-li favorites" id="${series[i].show.id}">`;
      htmlCode += `<h3 class="title favorites">${series[i].show.name}</h3>`;
    } else {
      htmlCode += `<li class="li js-li" id="${series[i].show.id}">`;
      htmlCode += `<h3 class="title">${series[i].show.name}</h3>`;
    }
    htmlCode += `<h4 class='js-time'>${series[i].show.schedule.time}</4>`;
    htmlCode += "<div>";
    if (series[i].show.image !== null) {
      htmlCode += `<img src="${series[i].show.image.medium}">`;
    } else {
      htmlCode +=
        '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
    }
    htmlCode += "</div>";
    htmlCode += "</li>";
  }
  ulSearch.innerHTML = htmlCode;
  listenSeries();
  setFavLocalStorage();
  listenButton();
}

//Escuchar
function listenButton() {
  button.addEventListener("click", getServerData);
}

function listenSeries() {
  const seriesCards = document.querySelectorAll(".js-li");
  for (const seriesCard of seriesCards) {
    seriesCard.addEventListener("click", toggleFavorites);
  }
}

function titles() {
  for (let i = 0; i < series.length; i++) {
    console.log(series[i].show.name);
  }
}

logBtn.addEventListener("click", titles);

//favoritos

function paintFavorites() {
  let htmlCode = "";
  const favoritesContainer = document.querySelector(".js-favorites-container");
  for (let favoriteItem of favoriteList) {
    htmlCode += '<li class="li">';
    htmlCode += `<h3 class="title">${favoriteItem.show.name}</h3>`;
    if (favoriteItem.show.image !== null) {
      htmlCode += `<img src="${favoriteItem.show.image.medium}">`;
    } else {
      htmlCode +=
        '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
    }
    htmlCode += "</div>";
    htmlCode += "</li>";
  }
  favoritesContainer.innerHTML = htmlCode;
  listenButton();
}

function toggleFavorites(ev) {
  const clickedItem = ev.currentTarget;
  const clickedItemId = parseInt(ev.currentTarget.id);
  let favIndex = -1;
  for (let i = 0; i < favoriteList.length; i++) {
    if (clickedItemId === favoriteList[i].show.id) {
      favIndex = i;
    }
  }
  if (favIndex === -1) {
    for (let i = 0; i < series.length; i++) {
      if (clickedItemId === series[i].show.id) {
        favoriteList.push(series[i]);
      }
    }
  } else {
    favoriteList.splice(favIndex, 1);
  }
  paintSeries();
  listenButton();
  setFavLocalStorage();
  paintFavorites();
}
getFavLocalStorage();
getServerData();
paintFavorites();
