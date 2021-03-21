$(document).ready(function() {

var API ="cbd25a82071ff67745266b182975cba0";
var city= [];
var date = new Date(); 
var longitude ="";
var latitude ="";
var pushSearch = [];

//function searching previous search hx
function searchHistory() {
    pushSearch= [];
    var pastSearch =localStorage.getItem("pastSearch")

if (pastSearch !==null ) {
    for (var i =0; i <pastSearch.length; i++) {
        var prevHistory =pastSearch.split(",").reverse()


        if (i <3 && prevHistory[i] !==undefined) {
            var  getHistoryList = $("<div class='historylist' city=" + prevHistory[i].replace(" ", "-") + ">" + prevHistory[i]+ "</div>")
            $(".search").append(getHistoryList)
            pushSearch.push(prevHistory[i])
        }
    }
}

}

//function to get current user location weather

function currentWeather() {
    navigator.geolocation.getCurrentPosition( function (position) {
        latitude = position.coords.latitude;
        longitude =position.coords.longitude; 

        var queryURL ="https://api.openweathermap.org/data/2.5/weather?lat=" +latitude + "&lon=" +longitude + "&appid=" +API; 
    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function (response) {
        var iconcode = response.weather[0].icon; 
        var iconurl = "http://openweathermap.org/img/w/" +iconcode +".png";

        console.log(response);

        var city= $(".city").html("<strong>" +"Currentlocation: " + response.name + "</strong" + "( " + (date.getMonth() +1) + "-" + date.getDate() + "-" + date.getFullYear() +")");
        city.append(("<img id='wicon' src='' alt='Weather icon'>"));
        $(".temp").text("Temperature(F): " + ((response.main.temp- 273.15) *1.80 +32).toFixed(2));
        $(".wind").text("Wind Speed:" + response.wind.speed);
        $(".humidity").text("Humidity:" + response.main.humidity);
        $(".uvIndex").text("UV Index:");
        $('#wicon').attr('src', iconurl);

        var cityLat = response.coord.lat;
        var cityLng = response.coord.lon;

        //get UV Index
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + cityLat + "&lon=" + cityLng,
            method: "GET"
        })
        .then (function(response) {
            $(".uvIndex").text("UV Index:" +response.value); 

            console.log(response)
        })
    })
    
    
    })
}

currentWeather()
searchHistory()

function showResults() {
    if (city !== "") {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API; 

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response); 
        })

    }
}

}) 