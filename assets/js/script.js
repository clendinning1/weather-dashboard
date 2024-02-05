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
var city = "austin"; // take in user input for city
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

// CURRENT WEATHER
async function pullCurrentWeather() {
    // fetch the info
    const response = await fetch(weatherURL);
    const weath = await response.json();


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
    var icon = document.createElement("img");
    icon.src = iconURL;
    iconPrint.appendChild(icon);


    // grab the current temp 
    var temp = weath["main"]["temp"];
    // print it
    var tempPrint = document.getElementById("currenttemp");
    tempPrint.innerText = "Temp: " + temp + " \u00B0F";


    // grab the current wind speed
    var wind = weath["wind"]["speed"];
    // print it
    var windPrint = document.getElementById("currentwind");
    windPrint.innerText = "Wind: " + wind + " MPH";


    // grab the current humidity
    var humid = weath["main"]["humidity"];
    // print it
    var humidPrint = document.getElementById("currenthumid");
    humidPrint.innerText = "Humidity: " + humid + "%";
}

// 5-DAY FORECAST
async function pullForecast() {
    // fetch the info
    const response = await fetch(forecastURL);
    const forecast = await response.json();
    console.log(forecast);


    // grab the current date 
    var dt1 = forecast["list"]["1"]["dt"];
    var day1 = new Date(dt1 * 1000);
    // print it on the screen
    var dt1Print = document.getElementById("date1");
    dt1Print.innerText = (day1.toDateString());


    // grab the icon for current conditions
    var iconID1 = forecast["list"]["1"]["weather"]["0"]["icon"];
    var iconURL1 = "https://openweathermap.org/img/wn/" + iconID1 + ".png"
    // print it
    var iconPrint1 = document.getElementById("day1icon");
    var icon1 = document.createElement("img");
    icon1.src = iconURL1;
    iconPrint1.appendChild(icon1);
    //
    //
    //// grab the current temp 
    //var temp = weath["main"]["temp"];
    //// print it
    //var tempPrint = document.getElementById("currenttemp");
    //tempPrint.innerText = "Temp: " + temp + " \u00B0F";
    //
    //
    //// grab the current wind speed
    //var wind = weath["wind"]["speed"];
    //// print it
    //var windPrint = document.getElementById("currentwind");
    //windPrint.innerText = "Wind: " + wind + " MPH";
    //
    //
    //// grab the current humidity
    //var humid = weath["main"]["humidity"];
    //// print it
    //var humidPrint = document.getElementById("currenthumid");
    //humidPrint.innerText = "Humidity: " + humid + "%";

}

pullCurrentWeather();
pullForecast();


// search functions
// var for user input in form
// userinput = city
// run queryurl
// pull relevant info from the query by setting it to various vars
// display vars onto page (date, icon, temp, etc)