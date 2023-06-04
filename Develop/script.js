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
var searchHistoryContent = document.querySelector('.searchHistoryContent');
var searchHistory = JSON.parse(localStorage.getItem('searchHistoryData')) || [];
// var city = 'Toronto';


//Search button

searchLocation.addEventListener('submit', function(event) {
  event.preventDefault();
  var city = textBox.value;
  displayWeather(city);
  storeWeatherData(city);
});
function displayWeather(city) {
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
    console.log(weatherData.list);

    //var city = textBox.value;
    for (var i = 0; i < weatherData.list.length; i++) {
      temp.textContent = "Temperature: " + weatherData.list[i].main.temp;
      wind.textContent = "Wind: " + weatherData.list[i].wind.speed;
      humidity.textContent = 'Humidity: ' + weatherData.list[i].main.humidity;

    }
   
    var currentDate = dayjs().format('MM/DD/YYYY');
    currentWeatherHeader.textContent = city + '\n' + currentDate;
    document.getElementById('icon').innerHTML =`
    <img src="http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png"/>
    ` 
    console.log(currentWeatherHeader);
    futureWeatherHeader.textContent = '5 Day Forecast:';
    futureWeatherBox.innerHTML = ''; //reset info

      for (var i = 2; i < 40; i=i+8) {
      var col = document.createElement('div');
      col.setAttribute('class', 'col');
      var fiveDays = document.createElement('div');
      fiveDays.setAttribute('class', 'fiveDaysBox');
      var fiveDaysContent = document.createElement('div');
      fiveDaysContent.setAttribute('class', 'fiveDaysContent');
      var h3 = document.createElement('h3');
     // h3.textContent = dayjs(weatherData).format('MM/DD/YYYY');
      h3.textContent =weatherData.list[i].dt_txt.substring(0,10)
      var futureTemp = document.createElement('p');
      futureTemp.textContent = 'Temp: ' + weatherData.list[i].main.temp;
      var futureWind = document.createElement('p');
      futureWind.textContent = 'Wind: ' + weatherData.list[i].wind.speed;
      var futureHumidity = document.createElement('p');
      futureHumidity.textContent = 'Humidity: ' + weatherData.list[i].main.humidity;
      var icon = document.createElement('div');
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png"/>`
      fiveDaysContent.append(h3, icon, futureTemp, futureWind, futureHumidity);
      fiveDays.append(fiveDaysContent);
      col.append(fiveDays);
      futureWeatherBox.append(col);
    
    }

  })




});

}

// save data in local storage
function storeWeatherData(city) {
  searchHistory.push(city);
  localStorage.setItem('searchHistoryData', JSON.stringify(searchHistory));
  searchHistoryContent.innerHTML = '';
  for (var i =0; i < searchHistory.length; i++) { 
    var searchHistorybtn = document.createElement('button');
    searchHistorybtn.textContent = searchHistory[i];
    searchHistorybtn.classList.add('searchHistory');
    searchHistorybtn.setAttribute('weatherDataCity', searchHistory[i]);
    searchHistoryContent.append(searchHistorybtn);
  }

};



searchHistoryContent.addEventListener('click', function(event) {

var city = event.target.getAttribute('weatherDataCity');
displayWeather(city);
})



