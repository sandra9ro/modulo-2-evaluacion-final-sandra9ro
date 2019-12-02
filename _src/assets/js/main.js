'use strict';
console.log('>> Ready :)');

const button = document.querySelector(".js-button");
const ulSearch = document.querySelector('.js-search-result-container');
const ul = document.querySelector('.ul');
let series = [];

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
  console.log('http://api.tvmaze.com/search/shows?q=girls');
  paintSeries();
}
  
 //Pintar 
function paintSeries() {  
  let htmlCode = "";
  for (let i=0; i<series.length; i++){
    htmlCode += '<li>';
    htmlCode += `<h3>${series[i].show.name}<h3>`;
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
}


    
button.addEventListener('click', getServerData);

