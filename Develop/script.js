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

//Search button

// searchBtn.addEventListener('click', function(event) {
// event.preventDefault();
// var city = textBox.value;
// displayWeather(city);

// })
// function displayWeather() {
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
    console.log(weatherData.list);
    var city = weatherData.city;
    for (var i = 0; i < weatherData.list.length; i++) {
      temp.textContent = "Temperature: " + weatherData.list[i].main.temp;
      wind.textContent = "Wind: " + weatherData.list[i].wind.speed;
      humidity.textContent = 'Humidity: ' + weatherData.list[i].main.humidity;

    }
   
    var currentDate = dayjs().format('MM/DD/YYYY');
    currentWeatherHeader.textContent = city + currentDate;
    console.log(currentWeatherHeader);
    futureWeatherHeader.textContent = '5 Day Forecast:';
    futureWeatherBox.innerHTML = ''; //reset info

    for (var i = 0; i < weatherData.list.length; i++) {
      var col = document.createElement('div');
      col.setAttribute('class', 'col');
      var fiveDays = document.createElement('div');
      fiveDays.setAttribute('class', 'fiveDaysBox');
      var fiveDaysContent = document.createElement('div');
      fiveDaysContent.setAttribute('class', 'fiveDaysContent');
      var h3 = document.createElement('h3');
      h3.textContent = dayjs(weatherData).format('MM/DD/YYYY');
      var futureTemp = document.createElement('p');
      futureTemp.textContent = 'Temp: ' + weatherData.list[i].main.temp;
      var futureWind = document.createElement('p');
      futureWind.textContent = 'Wind: ' + weatherData.list[i].wind.speed;
      var futureHumidity = document.createElement('p');
      futureHumidity.textContent = 'Humidity: ' + weatherData.list[i].main.humidity;
    }
  })




});

// }





