("use strict");
console.log(">> Ready :)");
const button = document.querySelector(".js-button");
const ulSearch = document.querySelector(".js-search-result-container");
const ul = document.querySelector(".ul");
let series = [];
let favoriteList = ["casa", "piano", "vaca"];

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
    const isFavorite = favoriteList.includes(parseInt(series[i].show.id));

    if (isFavorite) {
      htmlCode += '<li class="li js-li">';
      htmlCode += `<h3 class="title">${series[i].show.name}</h3>`;
    } else {
      htmlCode += '<li class="li js-li favorites">';
      htmlCode += `<h3 class="title favorites">${series[i].show.name}</h3>`;
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
  favoritesContainer.innerHTML = favoriteList;
  // for (const favoriteItem of favoriteList) {
  htmlCode += '<li class="li">';
  htmlCode += `<h3 class="title">favoriteItem.show.name}</h3>`;
  htmlCode += "<div>Esto es un a prueba";
  // if (favoriteItem.show.image !== null) {
  //   htmlCode += `<img src="${favoriteItem.show.image.medium}">`;
  // } else {
  htmlCode +=
    '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
  // }
  htmlCode += "</div>";
  htmlCode += "</li>";
  // }
  favoritesContainer.innerHTML = htmlCode;
  listenButton();
}

function toggleFavorites() {
  console.log("funciona el click");
}

function toggleFavorites(ev) {
  const clickedItem = ev.target;
  console.log("clicado:", clickedItem);
  // const clickedItemId = parseInt(ev.target.show.id); /*.show.name*/

  // for (const favoriteItem of favoriteList) {
  //   const favoriteItemId = parseInt(favoriteItem.show.id);
  //     // const isFavorite = favoriteList.includes(parseInt(clickedItemId));
  // if (favoriteList.includes(clickedItemId)) {
  //   favoriteList.splice(clickedItem, 1);
  // } else {
  //   favoriteList.push(parseInt(clickedItem));
  // foo.includes('vaca')
  // }
}
listenButton();
getServerData();
setFavLocalStorage();
paintFavorites();
