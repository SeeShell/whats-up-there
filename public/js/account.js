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

    var list = $("<li>");
    list.html(
      `
      <a class="uk-accordion-title uk-text-left" href="#">Steve</a>
      <div class="uk-accordion-content">
        <p class="uk-text-center">10, satty 1, 02-24-2020</p>
        <button class='uk-button delete-button '>remove</button>
      </div>
      `
    );
    list.attr("data-id", "1");
    $("#list").append(list);

    // $.get("/api/user_favorites").then(function(data) {
    //   for (let i = 0; i < data.length; i++) {
    //     var list = $("<li>");
    //     list.html(
    //       `<a class="uk-accordion-title" href="#">${data[i].nickname}</a>
    //         <div class="uk-accordion-content">
    //         <p>${data[i].satID} ${data[i].satName} ${data[i].launchDate}</p>
    //       </div>
    //       <button class='uk-button delete-button'>remove</button>`
    //     );
    //     list.attr("data-id", data[i].id);
    //     $("#favorites-list").append(list);
    //   }
    // });

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
