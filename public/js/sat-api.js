const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = `&apiKey=${process.env.N2YO_KEY}`;
const userAlt = 0;
var currentUserID = [];
$.get("/api/user_data").then(function(data) {
  currentUserID.push(data.id);
});
window.satApi = {
  //for future development of sat trajectory visualization
  getPosition: (userLon, userLat, satID) => {
    let positionQuery = `/positions/${satID}/${userLat}/${userLon}/${userAlt}/50`;
    $(function() {
      $.ajax({
        url: queryN2YO + positionQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        console.log(result);
      });
    });
  },
  getAbove: (userLon, userLat, categoryID, searchRadius, source) => {
    let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
    $(function() {
      $.ajax({
        url: queryN2YO + aboveQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        let sats = result.above;
        if (source === "members") {
          getAboveHomePage(sats, 15);
        } else if (source === "maps") {
          sendAnswers(sats);
        } else if (source === "category") {
          getAboveHomePage(sats, 45);
        }
      });
      // window.satApi.getVisualPass(userLat, userLon, 25544, userAlt, 2, 100);
    });
  },
  getVisualPass: (userLat, userLon, satID, userAlt, days, minVisSeconds) => {
    let spinnerID = `#spinner-vis-pass-${satID}`;
    // if ($(spinnerID).is(":hidden")) {
    //   console.log("hidden");
    //   return;
    // } else {
    //   console.log("visible");
    const visPassQuery = `/visualpasses/${satID}/${userLat}/${userLon}/${userAlt}/${days}/${minVisSeconds}`;
    $(function() {
      $.ajax({
        url: queryN2YO + visPassQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        // console.log(result);
        displayVisPass(result);
      });
    });
    // }
  }
};

function getAboveHomePage(sats, searchRad) {
  if (sats === undefined) {
    numSatsMessage = `<p>There are 0 satellites above you in a ${searchRad}&#176; search radius</p>`;
    $("#num-sats").html(numSatsMessage);
    $("#spinner").hide();
    return;
  }
  numSats = sats.length;
  numSatsMessage = `<p>There are ${numSats} satellites above you in a ${searchRad}&#176; search radius</p>`;
  $("#num-sats").html(numSatsMessage);
  const aboveDataHome = sats;
  $("#spinner").hide();
  $("#satellite-display").empty();
  for (let i = 0; i < aboveDataHome.length; i++) {
    var percentage1 = Math.floor(Math.random() * 85) + 5;
    var percentage2 = Math.floor(Math.random() * 52) + 10;
    var add1 = Math.floor(Math.random() * 5) + 1;
    var add2 = Math.floor(Math.random() * 5) + 1;
    var markerLink = `<a href="#satellite${i +
      1}" uk-toggle class="uk-position-absolute uk-transform-center" style="left: 
        ${percentage1 + add1}%; bottom: 
        ${percentage2 + add2}%" href="#" uk-marker>
    <i class="fas fa-satellite"></i></a>
    <div id="satellite${i + 1}" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" id="satellite${i +
      1}">
      <button class="uk-modal-close-outside" type="button" uk-close></button>
      <p id="satellite-${i + 1}-name"style="font-weight: bold;">
      ${aboveDataHome[i].satname}</p>
      <p id="satellite-${i + 1}-launch">SAT ID : 
      ${aboveDataHome[i].satid}
      <p id="satellite-${i + 1}-launch">LAUNCH : 
      ${aboveDataHome[i].launchDate}</p>
      <button class="sat" 
      data-name="${aboveDataHome[i].satname}" 
      data-id="${aboveDataHome[i].satid}" 
      uk-icon="icon: bookmark; ratio: 2"></button>
      <br>
      <a href="/maps"> VIEW MAP</a>
      </div> </div>`;
    $("#satellite-display").append(markerLink);
  }
  $(".sat").on("click", function(event) {
    var satellite = $(this);
    $(this).hide();
    event.preventDefault();
    satData = {
      satName: satellite.attr("data-name"),
      satID: satellite.attr("data-id"),
      nickname: satellite.attr("data-name"),
      UserId: currentUserID[0]
    };
    $.post("/api/new_user_favorites", satData).then(function() {
      getFavorites();
    });
  });
}
getFavorites();

function getFavorites() {
  $("#fav-satellite").empty();
  $.get("/api/user_favorites").then(function(data) {
    for (let i = 0; i < data.length; i++) {
      var satFav = $("<p>");
      satFav.text(`${data[i].nickname}`);
      let visPass = $("<span>");
      visPass.html(
        `<a href="#satellite-favorite-${data[i].satID}" uk-toggle id='${data[i].satID}' class='uk-margin-small-left fave-visPass' uk-icon='rss'></a>
      <div id="satellite-favorite-${data[i].satID}" class="uk-flex-top" uk-modal>
     <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
         <button class="uk-modal-close-outside" type="button" uk-close></button>
                     <button class="vis-pass-text uk-button uk-button-default" id="drop" class="button" tabindex="-1">
                     <div id = "nextGO-${data[i].satID}"><span id="spinner-vis-pass-${data[i].satID}" style="display: block">Fetching data...<i class="fas fa-satellite rotate uk-margin-small-left"></i></div>
                 </button>
         </form>
         </div>
         <br>
         </div>
     </div>
 </div>`
      );
      satFav.append(visPass);
      $("#fav-satellite").append(satFav);
    }
    $(".fave-visPass").on("click", function(event) {
      event.preventDefault();
      var sat = $(this);
      let satID = sat.attr("id");
      let spinnerID = `#spinner-vis-pass-${satID}`;
      // if ($(spinnerID).is(":hidden")) {
      //   console.log("hidden");
      //   return;
      // } else {
      //   console.log("visible");
      //   window.satApi.getVisualPass(userLat, userLon, satID, userAlt, 2, 100);
      // }
      window.satApi.getVisualPass(userLat, userLon, satID, userAlt, 2, 100);
    });
  });
}

function displayVisPass(result) {
  const satName = result.info.satname;
  const satId = result.info.satid;
  const satDiv = `#nextGO-${satId}`;
  let spinnerID = `#spinner-vis-pass-${satId}`;
  if ($(spinnerID).is(":hidden")) {
    console.log("hidden");
    return;
  } else {
    console.log("visible");
    $(spinnerID).hide();
    let numPasses = "";
    let passes = "";
    if (!result.hasOwnProperty("passes")) {
      numPasses = 0;
      numPassesText = `${satName} will pass ${numPasses} times in the next 2 days`;
    } else if (result.passes.length > 0) {
      numPasses = result.passes.length;
      passes = result.passes.map(pass => {
        return {
          startUTC: pass.startUTC,
          endUTC: pass.endUTC,
          duration: pass.duration
        };
      });
      numPassesText = `${satName} will pass ${numPasses} times in the next 2 days`;
    }
    if (passes === "") {
      let numPassesLine = $("<p>");
      numPassesLine.addClass("uk-text-left");
      numPassesLine.addClass("uk-padding-remove");
      numPassesLine.addClass("vis-pass-title");
      numPassesLine.text(numPassesText);
      $(satDiv).append(numPassesLine);
      console.log(numPassesText);
    } else {
      let userDate = new Date();
      let userTimeZoneOffsetHour = userDate.getTimezoneOffset() / 60;
      console.log(userTimeZoneOffsetHour);
      let numPassesLine = $("<p>");
      numPassesLine.addClass("uk-text-left");
      numPassesLine.addClass("uk-padding-remove");
      numPassesLine.addClass("vis-pass-title");
      numPassesLine.text(numPassesText);
      $(satDiv).append(numPassesLine);
      console.log(numPassesText);
      passes.forEach(pass => {
        let timestamp = pass.startUTC;
        let date = new Date(timestamp * 1000);
        let dateValues = [
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        ];
        let visPassHour = dateValues[2] - userTimeZoneOffsetHour;
        if (visPassHour < 0) {
          let yesterdaysHour = 24 + visPassHour;
          let yesterdaysDate = dateValues[1] - 1;
          let passTime = $("<p>");
          passTime.addClass("uk-text-left");
          passTime.addClass("uk-margin-remove");
          passTimeText = `Date: ${dateValues[0]}/${yesterdaysDate} 
          | Start time: ${yesterdaysHour}h${dateValues[3]}m${dateValues[4]}s
        | Duration(sec): ${pass.duration}`;
          passTime.text(passTimeText);
          $(satDiv).append(passTime);
        } else {
          console.log(dateValues);
          let passTime = $("<p>");
          passTime.addClass("uk-text-left");
          passTime.addClass("uk-margin-remove");
          passTimeText = `Date: ${dateValues[0]}/${dateValues[1]} 
          | Start time: ${visPassHour}h${dateValues[3]}m${dateValues[4]}s
          | Duration(sec): ${pass.duration}`;
          passTime.text(passTimeText);
          $(satDiv).append(passTime);
        }
      });
    }
  }
}
