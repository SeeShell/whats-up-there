// $(document).ready(function() {
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.email);
//   });
// });

window.navigator.geolocation.getCurrentPosition(logLocation);

function logLocation(position) {
  const userLon = position.coords.longitude;
  const userLat = position.coords.latitude;
  console.log(position);
  localStorage.setItem("userLon", userLon);
  localStorage.setItem("userLat", userLat);
  satApi.getVisualPass(userLat, userLon, 25544, 5, 100);
  satApi.getAbove(userLon, userLat, 0, 15).then(aboveData => {
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
  document.getElementById("time").innerText = time;
  document.getElementById("time").textContent = time;
  setTimeout(showTime, 1000);
}
showTime();

// CITY
var city = $("<p>").text("SAN DIEGO");
$("#favorite-city").append(city);

// USER
var user = $("<p>").text("Welcome up, John");
$("#user").append(user);
