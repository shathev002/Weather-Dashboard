var weatherAPIKey = 'bf19735f435ce22b8b0b5b013236e4cc';

var city = 'Toronto';
var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherAPIKey}`;


fetch(locationUrl) 
  .then(function(response) {
    console.log(response);
    return response.json();

  })
.then(function(locationData) {
var lat = locationData[0].lat;
var lon = locationData[0].lon;
console.log(lat, lon);
var weatherURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
fetch(weatherURL)
  .then(function(response) {return response.json();})
  .then(function(weatherData){
    console.log(weatherData);

  })




});



