// $(document).ready(function() {
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get("/api/user_data").then(function(data) {
//         $(".member-name").text(data.email);
//     });
// });

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
