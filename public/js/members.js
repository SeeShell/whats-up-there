// $(document).ready(function() {
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get("/api/user_data").then(function(data) {
//         $(".member-name").text(data.email);
//     });
// });

$(document).ready(function() {
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

    // SATELITTLES FOR FILL
    var satelliteName1 = $("<a>").text("CHARLOTTE SATELLITE");
    satelliteName1.attr("data-name", "CHARLOTTE SATELLITE");
    $("#satellite-1-name").append(satelliteName1);

    var satelliteName2 = $("<a>").text("SHELLEY SATELLITE");
    $("#satellite-2-name").append(satelliteName2);

    var satelliteName3 = $("<a>").text("SAM SATELLITE");
    $("#satellite-3-name").append(satelliteName3);

    var satelliteName4 = $("<a>").text("JOHN SATELLITE");
    $("#satellite-4-name").append(satelliteName4);

    var satelliteName5 = $("<a>").text("DEANNA SATELLITE");
    $("#satellite-5-name").append(satelliteName5);

    //SAT TO FAVORITES
    // var Fav = $("#sat-1");
    // sat1.on("click", function(event) {
    //     $("#sat-1").hide();
    //     event.preventDefault();
    //     sat1name = $("#satellite-1-name").text();
    //     localStorage.setItem("favSat1", sat1name);
    //     localStorage.getItem("favSat1");
    //     $("#fav-sat-1").append(sat1name);
    // });

    // Getting references to our form and input
    var categories = $("#categories");
    var select = $("select");
    var searchBtn = $("#searchBtn");

    searchBtn.on("click", function(event) {
        event.preventDefault();
        var selectedValue = select.val();
        console.log(selectedValue);
    });
});

// for (var i = 1; i < satellite.length; i++) {
//     var mainDiv = $("<div class = 'uk-container'>");
//     var markerLink = $(`<a href="#satellite${i}" uk-toggle class="uk-position-absolute uk-transform-center" style="left: 20%; top: 66%" href="#" uk-marker>
//     <i class="fas fa-satellite"></i></a>`);
//     var modalDiv = $(`<div id="satellite${i}" class="uk-flex-top" uk-modal>
//     <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" id="satellite1">
//         <button class="uk-modal-close-outside" type="button" uk-close></button>

//         <p id="satellite-${i}-name" style="font-weight: bold;"></p>
//         <p id="satellite-${i}-launch"></p>
//         <p id="satellite-${i}-class"></p>
//         <a href="" id="sat-${i}" uk-icon="icon: bookmark; ratio: 2"></a>
//     </div>
// </div>`);

//     mainDiv.append(markerLink);
//     mainDiv.append(modalDiv);
//     $("#aerial-image").append(mainDiv);
// }