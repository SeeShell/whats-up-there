window.navigator.geolocation.getCurrentPosition(logLocation);

function logLocation(position) {
  const userLon = position.coords.longitude;
  const userLat = position.coords.latitude;
  localStorage.setItem("userLon", userLon);
  localStorage.setItem("userLat", userLat);
  satApi.getAbove(userLon, userLat, 0, 15, "members");
  showCity(userLat, userLon);
}

function showCity(userLat, userLon) {
  var APIKey = "82fdd99a86105b66de45ae6fa55be58f";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    userLat +
    "&lon=" +
    userLon +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(result) {
    var city = result.name;
    var userLatFix = userLat.toFixed(2);
    var userLonFix = userLon.toFixed(2);
    $("#favorite-city").append(city);
    $("#latlon").append(
      "COORDINATES: " + userLatFix + "°, " + userLonFix + "°"
    );
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

var select = $("select");
var searchBtn = $("#searchBtn");

searchBtn.on("click", function(event) {
  event.preventDefault();
  let selection = select.val();
  let selectionArr = selection.split(" ");
  var selectedValue = selectionArr[0];
  let selectedCat = selectionArr[1];
  $("#num-sats").empty();
  $("#spinner").show();
  $("#satellite-display").empty();
  satApi.getAbove(userLon, userLat, selectedValue, 45, "category");
});
