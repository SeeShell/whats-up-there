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
          <a class="uk-accordion-title uk-light uk-text-center" style="font-size:15px;" href="#">${data[i].nickname}</a>
          <div class="uk-accordion-content uk-column-1-2 " style="text-align: center;">
            <p class="uk-text-left uk-align-center" style="margin-bottom: 0;font-size:12px;">ID: ${data[i].satID}<br>
            Name: ${data[i].satName}</p>
            <form>
              <div class="uk-margin">
                  <input id="nickname-input" class="uk-input uk-form-width-small" type="text" placeholder="new nickname">
              </div>
            </form>
            <button class='uk-button delete-button uk-button-small uk-align-center uk-text-center' data-id="${data[i].id}" id='delete'><span uk-icon="trash"></span></button>
            <button class='uk-button submit-button uk-button-small uk-align-center uk-text-center' data-id="${data[i].id}" id='submit'><span uk-icon="check"></span></button>
          </div>
          `
                );
                $("#list").append(list);
            }
            $(".submit-button").on("click", function(event) {
                event.preventDefault();
                properInput = $(this)
                    .parent("div")
                    .find("input")
                    .val()
                    .trim();
                var newNickname = {
                    nickname: properInput,
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

            $(".delete-button").on("click", function() {
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
    getUser();
    getFavorites();
});