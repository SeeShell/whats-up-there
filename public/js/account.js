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
          <a class="uk-accordion-title uk-light uk-text-center" href="#">${data[i].nickname}</a>
          <div class="uk-accordion-content uk-column-1-2 " style="text-align: center;">
            <p class="uk-text-left uk-align-center">ID: ${data[i].satID}<br>
            Name: ${data[i].satName}</p>
            <button class='uk-button delete-button uk-button-small uk-align-center uk-text-center' data-id="${data[i].id}" id='delete'><span uk-icon="trash"></span></button>
          </div>
          `
        );
        $("#list").append(list);
      }
      $("#delete").on("click", function() {
        const id = $(this).attr("data-id");
        $.ajax({
          method: "DELETE",
          url: `/api/user_favorites/${id}`
        }).then(function() {
          getFavorites();
        });
      });
    });
  }

  // $("#delete").on("click", function() {
  //   const id = $(this)
  //     .attr("data-id")
  //     .val();
  //   $.ajax({
  //     method: "DELETE",
  //     url: `/api/user_favorites/${id}`
  //   }).then(function() {
  //     getFavorites();
  //   });
  // });
  getUser();
  getFavorites();
});
