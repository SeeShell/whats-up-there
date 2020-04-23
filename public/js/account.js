$(document).ready(function() {
  function getUser() {
    $("#user").empty();
    $.get("/api/user_data").then(function(data) {
      var user = $("<p>").text("Hello, World!");
      user.text(data.email);
      user.attr("data-id", data.id);
    });
  }

  function getFavorites() {
    $("#favorites-list-ul").empty();
    $.get("/api/user_favorites").then(function(data) {
      for (let i = 0; i < data.length; i++) {
        var list = $("<li>");
        list.text(
          `${data[i].nickname} <button class='uk-button delete-button'>remove</button>`
        );
        list.attr("data-id", data[i].id);
        $("#favorites-list").append(list);
      }
    });

    $("#delete").on("click", function() {
      const id = $(this)
        .parent()
        .attr("data-id");
      $.ajax({
        method: "DELETE",
        url: "/api/user_favorites" + id
      }).then(function() {
        getFavorites();
      });
    });
  }

  getUser();
  getFavorites();
});
