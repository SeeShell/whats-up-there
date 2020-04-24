$(document).ready(function() {
  function getUser() {
    $("#user").empty();
    $.get("/api/user_data").then(function(data) {
      var user = $("<p>");
      user.text(data.email);
      user.attr("data-id", data.id);
      $("#user").append(user);
    });
  }

  function getFavorites() {
    $("#list").empty();
    $.get("/api/user_favorites").then(function(data) {
      for (let i = 0; i < data.length; i++) {
        var list = $("<li>");
        list.html(
          `
          <a class="uk-accordion-title uk-text-center" data-id='1' href="#">${data[i].nickname}</a>
          <div class="uk-accordion-content">
            <p class="uk-text-left uk-align-center">ID: ${data[i].satID}</p>
            <p class="uk-text-left uk-align-center">Name: ${data[i].satName}</p>
            <p class="uk-text-left uk-align-center">Launch Date: ${data[i].launchDate}</p>
            <button class='uk-button delete-button uk-align-center uk-text-center' id='delete'><span uk-icon="trash"></span></button>
          </div>
          `
        );
        list.attr("data-id", data[i].id);
        $("#favorites-list").append(list);
      }
    });
  }

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
  getUser();
  getFavorites();
});
