var weatherAPIKey = bf19735f435ce22b8b0b5b013236e4cc;

var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


//fetch -- fetch(queryURL)

var url = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;