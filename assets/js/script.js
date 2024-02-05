// TO DO
//
// 1. WHEN I search for a city, THEN
//      a. I am presented with current and future conditions for that city
//      b. that city is added to the search history
//
// 2. WHEN I view current weather conditions for that city THEN
//      a. I am presented with the city name,
//      b. the date,
//      c. an icon representation of weather conditions,
//      d. the temperature,
//      e. the humidity,
//      f. the wind speed
//
// 3. WHEN I view future weather conditions for that city THEN
//      a. I am presented with a 5-day forecast
//      b. that displays the date,
//      c. an icon representation of weather conditions,
//      d. the temperature,
//      e. the wind speed,
//      f. the humidity
//
// 4. WHEN I click on a city in the search history, THEN
//      a. I am again presented with current and future conditions for that city
//
// 5. Hint: Using the 5 Day Weather Forecast API, you'll notice that you will need
//    to pass in coordinates instead of just a city name. Using the OpenWeatherMap
//    APIs, how could we retrieve geographical coordinates given a city name?


// API
// site: https://home.openweathermap.org/api_keys
var APIKey = "fc7efc392867b6b77f021be757a566cf";
var city = "austin";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var newTest = "https://api.openweathermap.org/data/2.5/weather?lat=" + "30.26715000" + "&lon=" + "-97.74306000" + "&appid=" + APIKey;


async function pullWeather() {
    // fetch the info
    const response = await fetch(newTest);
    const weath = await response.json();
    console.log(weath);

    
    // grab the current date 
    var dt = weath["dt"];
    var day = new Date(dt * 1000);
    // print it on the screen
    var dtPrint = document.getElementById("currentdate");
    dtPrint.innerText = (day.toDateString());


    // grab the icon for current conditions
    var iconID = weath["weather"]["0"]["icon"];
    var iconURL = "https://openweathermap.org/img/wn/" + iconID + ".png"
    // print it
    var iconPrint = document.getElementById("currenticon");
    var img = document.createElement("img");
    img.src = iconURL;
    iconPrint.appendChild(img);


    // temperature = Object > main > temp

    // wind speed = Object > wind > speed

    // humidity = Object > main > humidity
}

pullWeather();

// search functions
// var for user input in form
// userinput = city
// run queryurl
// pull relevant info from the query by setting it to various vars
// display vars onto page (date, icon, temp, etc)