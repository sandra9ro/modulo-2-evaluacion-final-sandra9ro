'use strict';
console.log('>> Ready :)');

const button = document.querySelector(".js-button");
const ulSearch = document.querySelector('.js-search-result-container');
const ul = document.querySelector('.ul');
let series = {};

//Traer datos del servidor
function getServerData() {
  const input = document.querySelector('.input');
  const inputValue = input.value;
  
  fetch(
  `http://api.tvmaze.com/singlesearch/shows?q=${inputValue}`
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
  console.log('píntame algo');
  console.log('me estoy descargando', series.name);
  // paintSeries();
}
console.log('http://api.tvmaze.com/singlesearch/shows?q=girls');
  
 //Pintar 
function paintSeries() {  
  let htmlCode = "";

    htmlCode += '<li>';
    htmlCode += `<h3>${series.name}<h3>`;
    htmlCode += '<div>';
    if (series.url !== null){
    htmlCode += `<img src="${series.url}">`;
    }else{
    htmlCode += '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
    }
    htmlCode += '</div>'
    htmlCode += '</li>';
  // }
  ulSearch.innerHTML = htmlCode;
}


    
button.addEventListener('click', getServerData);

