("use strict");
const button = document.querySelector(".js-button");
const ulSearch = document.querySelector(".js-search-result-container");
const ul = document.querySelector(".ul");
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
  console.log(`http://api.tvmaze.com/search/shows?q=${inputValue}`);

  paintSeries();
  listenSeries();
  paintFavorites();
  listenButton();
  console.log("tengo descargado", series);
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
    htmlCode += "<div>";
    if (series[i].show.image !== null) {
      htmlCode += `<img src="${series[i].show.image.medium}">`;
    } else {
      htmlCode +=
        '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
    }
    htmlCode += "</div>";
    htmlCode += "</li>";
    console.log("me estoy descargando", series[i].show.name);
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

//favoritos

function paintFavorites() {
  console.log("pintar favoritos");

  let htmlCode = "";
  const favoritesContainer = document.querySelector(".js-favorites-container");
  for (let favoriteItem of favoriteList) {
    htmlCode += '<li class="li">';
    htmlCode += `<h3 class="title">${favoriteItem.show.name}</h3>`;
    htmlCode += "<div>Esto es un a prueba";
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

function toggleFavorites() {
  console.log("funciona el click");
}

function toggleFavorites(ev) {
  const clickedItem = ev.currentTarget;
  console.log("clicado:", clickedItem);
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
        console.log("lo meto");
        favoriteList.push(series[i]);
      }
    }
  } else {
    console.log("Lo saco");
    favoriteList.splice(favIndex, 1);
  }

  console.log("id clicado: ", clickedItemId);
  console.log(favIndex);
  console.log(
    "clicked id:",
    clickedItemId,
    "fav index",
    favIndex,
    "lista: ",
    favoriteList
  );
  paintSeries();
  listenButton();
  setFavLocalStorage();
  paintFavorites();
}
getFavLocalStorage();
getServerData();
paintFavorites();
