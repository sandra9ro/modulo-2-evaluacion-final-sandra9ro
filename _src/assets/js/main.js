'use strict';
console.log('>> Ready :)');

const button = document.querySelector(".js-button");
const ulSearch = document.querySelector('.js-search-result-container');
const ul = document.querySelector('.ul');
let series = [];
let favoriteList = [];
// foo.includes('vaca')

const falseButton = document.querySelector('button');

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
  // línea para que se adapten los datos recibidos a lo que necesito.

  })
  .catch(function(err){
    console.log('Error al traer los datos del servidor', err);
  })
  console.log(`http://api.tvmaze.com/search/shows?q=${inputValue}`);
  
  paintSeries();
  listenSeries();
  console.log('tengo descargado', series);
}
  
 //Pintar 
function paintSeries() {  
  let htmlCode = "";
  for (let i=0; i<series.length; i++){
    const isFavorite = favoriteList.includes(parseInt(series[i].show.id));

    if (isFavorite){
      htmlCode += '<li class="li js-li favorites">';
      htmlCode += `<h3 class="title favorites">${series[i].show.name}</h3>`;
    }else{
      htmlCode += '<li class="li js-li">';
      htmlCode += `<h3 class="title">${series[i].show.name}</h3>`;
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
  listenSeries();
}

//Favoritos

//Escuchar
function foo() {
  console.log('funciona el click en series')
}
const li = document.querySelector('.js-li');

function listenSeries(){
  button.addEventListener('click', getServerData);
  
  // series.addEventListener('click', foo);
  // for (const serie of series) {
    //   // const shownImage = serie.show.image.medium;
    //   console.log("hasta aqui");
    // }
    // debugger;
    
  }    
  
  // almacenar en localStorage la búsqueda
 //favoritos 
function toggleFavorites(ev){
  const clickedItemId = ev.currentTarget/*.show.name*/;
  const isFavorite = () => {
    if(favoriteList.includes(parseInt(clickedItemId))){
console.log('después del if');
    }

  } 
  console.log('escucha el click de la serie')
}

listenSeries();

