$(document).ready(function() {
  function getUser() {
    $.get("/api/user_data").then(function(data) {
      user.text(data.email);
      user.attr("data-id", data.id);
    });
  }

  function getFavorites() {
    $("#favorites-list-ul").empty();
    var list = $("<li>").html(
      "Test Friend <button class='uk-button delete-button' id='delete'>remove</button>"
    );
    list.attr("data-id", "1");
    $("#favorites-list").append(list);
    // $.get("/api/user_favorites").then(function(data) {
    //   list.text(
    //     `${data.nickname} <button class='uk-button delete-button'>remove</button>`
    //   );
    //   list.attr("data-id", data.id);
    // });
  }

  var user = $("<p>").text("Hello, World!");
  $("#user").append(user);

  $("#delete").on("click", function() {
    getFavorites();
    // $.ajax({
    //   method: "DELETE",
    //   url: "/api/user_favorites" + id
    // }).then(function() {
    //   getFavorites();
    // });
  });

  getUser();
  getFavorites();
});
