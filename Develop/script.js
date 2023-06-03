var searchLocation = document.querySelector('#searchLocation');
var textBox = document.querySelector('.textBox');
var searchBtn = document.querySelector('searchBtn');
var currentWeatherBox = document.querySelector('#currentWeatherBox');
var currentWeatherHeader = document.querySelector('.currentWeatherHeader');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var futureWeatherHeader = document.querySelector('#futureWeatherHeader');
var futureWeatherBox = document.querySelector('#futureWeatherBox');
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
var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
fetch(weatherUrl)
  .then(function(response) {return response.json();})
  .then(function(weatherData){
    console.log(weatherData);
    temp.textContent = "Temperature: " + weatherData.list.main.temp;
    console.log(weatherData.list.main);
    wind.textContent = "Wind: " + weatherData.list.wind.speed;
    humidity.textContent = 'Humidity: ' + weatherData.list.main.humidity;
    var currentDate = dayjs().format('MM/DD/YYYY');
    currentWeatherHeader.textContent = city + currentDate;
    console.log(currentWeatherHeader);
    futureWeatherHeader.textContent = '5 Day Forecast:';
    futureWeatherBox.innerHTML = ''; //reset info

    for (var i = 0; i < 5; i++) {
      var col = document.createElement('div');
      col.setAttribute('class', 'col');
      var fiveDays = document.createElement('div');
      fiveDays.setAttribute('class', 'fiveDaysBox');
      var fiveDaysContent = document.createElement('div');
      fiveDaysContent.setAttribute('class', 'fiveDaysContent');
      var h3 = document.createElement('h3');
      h3.textContent = dayjs(weatherData).format('MM/DD/YYYY');
      var futureTemp = document.createElement('p');
      futureTemp.textContent = 'Temp: ' + weatherData;
      var futureWind = document.createElement('p');
      var futureHumidity = document.createElement('p');
    }
  })




});



