debugger;
'use strict';
console.log('>> Ready :)');
const button = document.querySelector(".js-button");
const ulSearch = document.querySelector('.js-search-result-container');
const ul = document.querySelector('.ul');
let series = [];
let favoriteList = [5,3,98
  // {"score": 17.240387,
  // "show":{
  //   "id": 139,
  //   "url": "http://www.tvmaze.com/shows/139/girls",
  //   "name": "Girls",
  //   "type": "Scripted",
  //   "language": "English",
  //   "genres": ["Drama","Romance"],
  //   "image": {
  //     "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
  //     "original": "http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg"}
//   }
// }
];


//localStorage

function setFavLocalStorage() {
  localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}

function getFavLocalStorage() {
  const localStorageFavListJSON = localStorage.getItem('favoriteList');
  const localStorageFavList = JSON.parse(localStorageFavListJSON);
  if (localStorageFavList !== null){
    favoriteList = localStorageFavList;
    paintFavorites();
    listenSeries();
    paintSeries();
  }else{
    getServerData();
  }
}


//Traer datos del servidor

function getServerData() {
  const input = document.querySelector('.input');
  const inputValue = input.value;
  
  fetch(
  `http://api.tvmaze.com/search/shows?q=${inputValue}`
  )
  .then(function(response){
    return response.json();
  })
  .then(function(serverData){
    series = serverData;
  // series es el array que me he descargado
  })
  .catch(function(err){
    console.log('Error al traer los datos del servidor', err);
  })
  console.log(`http://api.tvmaze.com/search/shows?q=${inputValue}`);
  
  paintSeries();
  listenSeries();
  paintFavorites();
  console.log('tengo descargado', series);
}
// // Almaceno durante la sesión

// function setSessionStorage() {
//   sessionStorage.setItem('series', JSON.stringify(series));
// }

// function getSessionStorage() {
//   const sessionStoragePalettesJSON = sessionStorage.getItem('palettes');
//   const sessionStoragePalettes = JSON.parse(sessionStoragePalettesJSON);
//   if (sessionStoragePalettes !== null){
//     palettes = sessionStoragePalettes;
//     paintSeries();
//     listenSeries();
//     }else{
//     getServerData();
//   }
// }


  
 //Pintar 
function paintSeries() {  
  let htmlCode = "";
  for (let i=0; i<series.length; i++){
    const isFavorite = favoriteList.includes(parseInt(series[i].show.id));

    if (isFavorite){
      htmlCode += '<li class="li js-li">';
      htmlCode += `<h3 class="title">${series[i].show.name}</h3>`;
    }else{
      htmlCode += '<li class="li js-li favorites">';
      htmlCode += `<h3 class="title favorites">${series[i].show.name}</h3>`;
    }
    htmlCode += '<div>';
    if (series[i].show.image !== null){
    htmlCode += `<img src="${series[i].show.image.medium}">`;
    }else{
    htmlCode += '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
    }
    htmlCode += '</div>'
    htmlCode += '</li>';
    console.log('me estoy descargando', series[i].show.name);
  }
  ulSearch.innerHTML = htmlCode;
  setFavLocalStorage();
  listenSeries();
}

//Escuchar
function foo() {
  console.log('funciona el click en series')
}
const li = document.querySelector('.js-li');

function listenSeries(){
  button.addEventListener('click', getServerData);
  
  ulSearch.addEventListener('click', foo);
  // for (const serie of series) {
    //   // const shownImage = serie.show.image.medium;
    //   console.log("hasta aqui");
    // }
    // debugger;
    // ===================>>>>>>>>>>>escuchar el ul
  // } 
  toggleFavorites();   
}



//favoritos 

function paintFavorites() {
  let htmlCode = '';
  const favoritesContainer = document.querySelector('.js-favorites-container');
  for (const favoriteItem of favoriteList){
  htmlCode += '<li class="li">';
  htmlCode += `<h3 class="title">${favoriteItem.show.name}</h3>`;
  htmlCode += '<div>Esto es un a prueba';
  if (favoriteItem.show.image !== null){
    htmlCode += `<img src="${favoriteItem.show.image.medium}">`;
  }else{
    htmlCode += '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
  // }
  htmlCode += '</div>';
  htmlCode += '</li>';
  }
  favoritesContainer.innerHTML = htmlCode;
}

function toggleFavorites(ev){
    const clickedItem = ev.target;
    const clickedItemId = parseInt(ev.target.show.id);/*.show.name*/;

    // for (const favoriteItem of favoriteList) {
    //   const favoriteItemId = parseInt(favoriteItem.show.id);
    //     // const isFavorite = favoriteList.includes(parseInt(clickedItemId));
    if (favoriteList.includes(clickedItemId)) {
        favoriteList.splice(clickedItem, 1);
      } else {
          favoriteList.push(parseInt(clickedItem));
          // foo.includes('vaca')
        }    
}
setFavLocalStorage();        
paintFavorites();
listenSeries();
// function arreglandoEsto() {
//   return 3*3
// };
// arreglandoEsto();