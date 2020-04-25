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
            <form>
              <div class="uk-margin">
                  <input id="nickname-input" class="uk-input uk-form-width-large" type="text" placeholder="new nickname">
                  <button class='uk-button submit-button uk-align-center uk-text-center' data-id="${data[i].id}" id='submit'><span uk-icon="check"></span></button>
              </div>
            </form>
            <button class='uk-button delete-button uk-button-small uk-align-center uk-text-center' data-id="${data[i].id}" id='delete'><span uk-icon="trash"></span></button>
          </div>
          `
        );
        $("#list").append(list);
      }
      $("#submit").on("click", function(event) {
        event.preventDefault();
        var newNickname = {
          nickname: $("#nickname-input")
            .val()
            .trim(),
          id: $(this).attr("data-id")
        };
        $.ajax({
          method: "PUT",
          url: "/api/user_favorites_new_nickname",
          data: newNickname
        }).then(function() {
          getFavorites();
        });
      });

      $("#delete").on("click", function() {
        const id = $(this).attr("data-id");
        $.ajax({
          method: "DELETE",
          url: `/api/remove_user_favorites/${id}`
        }).then(function() {
          getFavorites();
        });
      });
    });
  }

  function updateNickname(nickname) {
    $.ajax({
      method: "PUT",
      url: "/api/user_favorites_new_nickname",
      data: nickname
    }).then(function() {
      getFavorites();
    });
  }

  getUser();
  getFavorites();
});
