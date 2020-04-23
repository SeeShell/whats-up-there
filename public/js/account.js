$(document).ready(function() {
  function getUser() {
    $.get("/api/user_data").then(function(data) {
      user.text(data.email);
      user.attr("data-id", data.id);
    });
  }

  function getFavorites() {
    $("#favorites-list-ul").empty();
    $.get("/api/user_favorites").then(function(data) {
      for (let i = 0; i < data.length; i++) {
        list.text(
          `${data[i].nickname} <button class='uk-button delete-button'>remove</button>`
        );
        list.attr("data-id", data[i].id);
        $("#favorites-list").append(list);
      }
    });
  }

  var user = $("<p>").text("Hello, World!");
  $("#user").append(user);
  const id = $(this)
    .parent()
    .attr("data-id");
  console.log(id);
  $("#delete").on("click", function() {
    $.ajax({
      method: "DELETE",
      url: "/api/user_favorites" + id
    }).then(function() {
      getFavorites();
    });
  });

  getUser();
  getFavorites();
});
