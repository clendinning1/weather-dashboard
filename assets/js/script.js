// TO DO
//
// 1. WHEN I search for a city, THEN
//      a. I am presented with current and future conditions for that city
//      b. that city is added to the search history
//
// 4. WHEN I click on a city in the search history, THEN
//      a. I am again presented with current and future conditions for that city



// search functions
// var for user input in form
// userinput = city
// recieve user input of city
// then feed user input into pull city info
// run city info then feed it into All Weather
// then run All Weather to pull and display it


// openweathermap API
var APIKey = "fc7efc392867b6b77f021be757a566cf";

// URL for translating city names into coords
var cityInput = "austin"
var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey

// Declaring city coord vars for later
let cityLat = 0;
let cityLon = 0;






// USER INPUT STUFF

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchCity);

let cityHistory = ["search history:"];

function searchCity () {
    // grab search input
    let searchInput = document.getElementById("searchbar")[0].value;

    // add city to array
    cityHistory.push(searchInput);

    // translate to string and add to local storage
    localStorage.setItem("cityhistory", JSON.stringify(cityHistory));

    console.log(cityHistory);
}



//let userinit = ["initials:"];
//let userscore = ["scores:"];
//let hasScores = false;
//
//function submitBtnFunct() {
//    // grab initials
//    let playerInitials = document.getElementById("initials")[0].value;
//
//    // adds initials and score to arrays
//    userinit.push(playerInitials);
//    userscore.push(finalScore);
//
//    // translate to string and add to local storage
//    localStorage.setItem("userinit", JSON.stringify(userinit));
//    localStorage.setItem("userscore", JSON.stringify(userscore));
//
//    // tell the prgrm we have data now
//    hasScores = true;
//
//    // move to high score page
//    pagehsSwitch();
//}
//
//
//let scoreSpan = document.getElementById("scorespan");
//function displayScores() {
//    // resetting scoreboard
//    scoreSpan.innerText = "";
//
//    // pull data from local storage
//    var grabinit = localStorage.getItem("userinit");
//    var grabscore = localStorage.getItem("userscore");
//
//    // parse it back into an array from a string
//    var parseinit = JSON.parse(grabinit);
//    var parsescore = JSON.parse(grabscore);
//
//    // if we have no data, don't run this code
//    if (hasScores === false) { } else {
//        // for loop modified from stack overflow link in readme.
//        for (let i = 1; i < parseinit.length; i++) {
//            // starting at one; running as long as i < the number of values in the array; increasing by one each time the code is executed
//            let storedScores = document.createElement("p"); // ss creates a paragraph element
//            storedScores.innerText = ([i] + ". " + parseinit[i] + " - " + parsescore[i]);
//            // text in the p element = "i. initials - score" for each iteration.
//            scoreSpan.appendChild(storedScores); // attaches ss to the scorespan id in the html
//        }
//    }
//
//}
















// PULL CITY COORDS
async function pullCityInfo() {
    // fetch the info
    const cityResponse = await fetch(geocodeURL);
    const cityInfo = await cityResponse.json();

    cityLat = cityInfo["0"]["lat"];
    cityLon = cityInfo["0"]["lon"];


}


// Enter city coords in call
var cityCoords = "?lat=" + cityLat + "&lon=" + cityLon;
// URLs for weather and five day forecast
var weatherURL = "https://api.openweathermap.org/data/2.5/weather" + cityCoords + "&appid=" + APIKey + "&units=imperial";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast" + cityCoords + "&appid=" + APIKey + "&units=imperial";


async function pullAllWeather() {
    // CURRENT WEATHER
    async function pullCurrentWeather() {
        // fetch the info
        const weathResponse = await fetch(weatherURL);
        const weath = await weathResponse.json();
        console.log(weath);

        // grab the city name
        var currCity = weath["name"];
        var currCityPrint = document.getElementById("currentcity");
        currCityPrint.innerText = currCity + " ("

        // grab the current date 
        var dt = weath["dt"];
        var day = new Date(dt * 1000);
        // print it on the screen
        var dtPrint = document.getElementById("currentdate");
        dtPrint.innerText = (day.toDateString()) + ")";


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
        const foreResponse = await fetch(forecastURL);
        const forecast = await foreResponse.json();
        console.log(forecast);

        for (let i = 3; i < 36; i++) {
            if (i == 3 || i == 11 || i == 19 || i == 27 || i == 35) {
                // only applies if the iteration is one of those numbers.
                // those 5 numbers are noon for each upcoming day in the forecast.

                // grab dates
                var dtF = forecast["list"][[i]]["dt"];
                var dayF = new Date(dtF * 1000);
                // print it
                var dateEl = "date" + [i]
                var dtFPrint = document.getElementById(dateEl);
                dtFPrint.innerText = (dayF.toDateString());

                // grab the icons
                var iconIDF = forecast["list"][[i]]["weather"]["0"]["icon"];
                var iconURLF = "https://openweathermap.org/img/wn/" + iconIDF + ".png"
                // print them
                var iconDiv = "day" + [i] + "icon";
                var iconPrintF = document.getElementById(iconDiv);
                var iconF = document.createElement("img");
                iconF.src = iconURLF;
                iconPrintF.appendChild(iconF);


                // grab the temps
                var tempF = forecast["list"][[i]]["main"]["temp"];
                // print them
                var tempEl = "d" + [i] + "temp";
                var tempFPrint = document.getElementById(tempEl);
                tempFPrint.innerText = "Temp: " + tempF + " \u00B0F";


                // grab the wind speeds
                var windF = forecast["list"][[i]]["wind"]["speed"];
                // print them
                var windEl = "d" + [i] + "wind";
                var windFPrint = document.getElementById(windEl);
                windFPrint.innerText = "Wind: " + windF + " MPH";


                // grab the humids
                var humidF = forecast["list"][[i]]["main"]["humidity"];
                // print them
                var humidEl = "d" + [i] + "humid"
                var humidFPrint = document.getElementById(humidEl);
                humidFPrint.innerText = "Humidity: " + humidF + "%";
            }
        }
    }

    pullCurrentWeather();
    pullForecast();
}

pullAllWeather();

