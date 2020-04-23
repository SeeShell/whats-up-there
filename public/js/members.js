$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

let userLon;
let userLat;
window.navigator.geolocation.getCurrentPosition(logLocation);

function logLocation(position) {
  const userLon = position.coords.longitude;
  const userLat = position.coords.latitude;

  localStorage.setItem("userLon", userLon);
  localStorage.setItem("userLat", userLat);
  return userLon, userLat;
}
console.log(userLon, userLat);
