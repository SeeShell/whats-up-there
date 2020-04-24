window.navigator.geolocation.getCurrentPosition(logLocation);

function logLocation(position) {
    const userLon = position.coords.longitude;
    const userLat = position.coords.latitude;
    localStorage.setItem("userLon", userLon);
    localStorage.setItem("userLat", userLat);
    satApi.getAbove(userLon, userLat, 0).then(aboveData => {
        satMap.renderPoints(aboveData);
    });
}

// CLOCK
function showTime() {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    var time = hr + ":" + min + ":" + sec;
    document.getElementById("time").textContent = time;
    setTimeout(showTime, 1000);
}

showTime();

// CITY
var city = $("<p>").text("SAN DIEGO");
$("#favorite-city").append(city);

//SAT TO FAVORITES
// var Fav = $("#sat-1");
// sat1.on("click", function(event) {
//     $("#sat-1").hide();
//     event.preventDefault();
//     sat1name = $("#satellite-1-name").text();
//     localStorage.setItem("favSat1", sat1name);
//     localStorage.getItem("favSat1");
//     $("#fav-sat-1").append(sat1name);
// });

// Getting references to our form and input

var select = $("select");
var searchBtn = $("#searchBtn");

searchBtn.on("click", function(event) {
    event.preventDefault();
    var selectedValue = select.val();
    console.log(selectedValue);
});