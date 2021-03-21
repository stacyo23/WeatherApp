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



}) 