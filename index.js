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

function CurrentWeather() {
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

        var city= $(".city")
    })
    
    
    })
}

}) 