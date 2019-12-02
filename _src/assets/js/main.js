'use strict';
console.log('>> Ready :)');

const button = document.querySelector(".js-button");
const ulSearch = document.querySelector('.js-search-result-container');
const ul = document.querySelector('.ul');

let series = [];


// function getServerData() {
  
  //   fetch(
    //     'http://api.tvmaze.com/singlesearch/shows?q=girls'
    //     )
    //     .then(function(response){
      //       return response.json();
      //     })
      //     .then(function(serverData){
        //       series = serverData.series;
//       // línea para que se adapten los datos recibidos a lo que necesito.

//     })
//     .catch(function(err){
  //       console.log('Error al traer los datos del servidor', err);
  //     })
  //   console.log(series);
  //   paintSeries();
  // }
  
  
function paintSeries() {
  
  let htmlCode = "";

// for (serie of series) {
  htmlCode += '<li>';
  htmlCode += '<h3>título serie<h3>';
  htmlCode += '<div>';
  htmlCode += '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">';
  htmlCode += '</div>'
  htmlCode += '</li>';
  // }
  ulSearch.innerHTML = htmlCode;
}
paintSeries();


    
// button.addEventListener('click', getServerData);

