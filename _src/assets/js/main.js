'use strict';
console.log('>> Ready :)');

const button = document.querySelector(".js-button");
const series = [];

function getServerData() {
  
  fetch(
    'http://api.tvmaze.com/search/shows?q=girls'
    )
    .then(function(response){
      return response.json();
    })
    .then(function(serverData){
      series = serverData.series;
      // línea para que se adapten los datos recibidos a lo que necesito.
      
    })
    .catch(function(err){
      console.log('Error al traer los datos del servidor', err);
    })
  console.log(series);
}
    
button.addEventListener('click', getServerData);

