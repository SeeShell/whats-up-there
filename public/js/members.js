window.navigator.geolocation.getCurrentPosition(logLocation);

function logLocation(position) {
  const userLon = position.coords.longitude;
  const userLat = position.coords.latitude;
  console.log(position);
  localStorage.setItem("userLon", userLon);
  localStorage.setItem("userLat", userLat);
  satApi.getVisualPass(userLat, userLon, 25544, 5, 100);
  satApi.getAbove(userLon, userLat, 0, 15);
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

var select = $("select");
var searchBtn = $("#searchBtn");

searchBtn.on("click", function(event) {
  event.preventDefault();
  var selectedValue = select.val();
  console.log(selectedValue);
});

// $("#bookmark-icon").on("click", function(event) {
//     event.preventDefault();
//     getFavorites();
// });

// function getFavorites() {
//     $("#list").empty();
//     $.get("/api/user_favorites").then(function(data) {
//         for (let i = 0; i < data.length; i++) {
//             var list = $("<li>");
//             list.html(
//                 `
//             <a class="uk-accordion-title uk-text-center" data-id='1' href="#" style="font size=20px;">${data[i].satName}</a>
//             <div class="uk-accordion-content">
//               <p class="uk-text-left uk-align-center" style="font size=15px; font-weight:300;">ID: ${data[i].satID}</p>
//               <p class="uk-text-left uk-align-center" style="font size=15px; font-weight:300">Launch Date: ${data[i].launchDate}</p>
//             </div>
//             `
//             );
//             list.attr("data-id", data[i].id);
//             $("#fav-satellite").append(list);
//         }
//     });
// }

// $("#favoriteChoice").on("click", function(event) {
//     event.preventDefault();
//     var satChoice = $(this);
//     console.log(satChoice)
//         // $.post("/api/user_favorites", Post, function() {
//         //         .data("post");
//         //     window.location.href = "/members";
//         // });
// });
