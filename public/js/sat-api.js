const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
const userAlt = 0;
// const satelliteIDArray = {
//   18: "Amateur radio",
//   35: "Beidou Navigation System",
//   1: "Brightest",
//   45: "Celestis",
//   32: "CubeSats",
//   8: "Disaster monitoring",
//   6: "Earth resources",
//   29: "Education",
//   28: "Engineering",
//   19: "Experimental",
//   48: "Flock",
//   22: "Galileo",
//   27: "Geodetic",
//   10: "Geostationary",
//   50: "GPS Constellation",
//   20: "GPS Operational",
//   17: "Globalstar",
//   51: "Glonass Constellation",
//   21: "Glonass Operational",
//   5: "GOES",
//   40: "Gonets",
//   12: "Gorizont",
//   11: "Intelsat",
//   15: "Iridium",
//   46: "IRNSS",
//   2: "ISS",
//   49: "Lemur",
//   30: "Military",
//   14: "Molniya",
//   24: "Navy Navigation Satellite System",
//   4: "NOAA",
//   43: "O3B Networks",
//   53: "OneWeb",
//   16: "Orbcomm",
//   38: "Parus",
//   47: "QZSS",
//   31: "Radar Calibration",
//   13: "Raduga",
//   25: "Russian LEO Navigation",
//   23: "Augmentation System",
//   7: "Search & Rescue",
//   26: "Space & Earth Science",
//   52: "Starlink",
//   39: "Strela",
//   9: "Tracking & Data Relay",
//   44: "Tselina",
//   42: "Tsikada",
//   41: "Tsiklon",
//   34: "TV",
//   3: "Weather",
//   37: "Westford Needles",
//   33: "XM and Sirius",
//   36: "Yaogan"
// };
window.satApi = {
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
    // let searchRadius = 15;
    let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
    $(function() {
      $.ajax({
        url: queryN2YO + aboveQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        // console.log(result.above);
        let sats = result.above;
        if (source === "members") {
          getAboveHomePage(sats, 15);
        } else if (source === "maps") {
          sendAnswers(sats);
        } else if (source === "category") {
          // showCategory(sats);
          getAboveHomePage(sats, 45);
        }
      });
      // window.satApi.getVisualPass(userLat, userLon, 25544, userAlt, 2, 100);
    });
  },
  getVisualPass: (userLat, userLon, satID, userAlt, days, minVisSeconds) => {
    let spinnerID = `#spinner-vis-pass-${satID}`;
    console.log($(spinnerID).is(":hidden"));
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
  numSats = sats.length;
  numSatsMessage = `<p>There are ${numSats} satellites above you in a ${searchRad}&#176; search radius</p>`;
  $("#num-sats").html(numSatsMessage);
  //.append
  const aboveDataHome = sats;
  // console.log(aboveDataHome);
  $("#spinner").hide();
  $("#satellite-display").empty();
  var userID = "";
  $.get("/api/user_data").then(function(data) {
    userID = data.id;
  });
  for (let i = 0; i < aboveDataHome.length; i++) {
    var percentage1 = Math.floor(Math.random() * 100) + 1; //40
    var percentage2 = Math.floor(Math.random() * 100) + 1; //20
    var markerLink = `<a href="#satellite${i +
      1}" uk-toggle class="uk-position-absolute uk-transform-center" style="left: 
          ${i + percentage1 + 5}%; top: 
          ${i + percentage2 + 5}%" href="#" uk-marker>
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
      UserId: userID
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
                     <button class="uk-button uk-button-default" id="drop" class="button" tabindex="-1">
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
      console.log("spinnerID = " + spinnerID);
      console.log(satID);
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

function showCategory(sats) {
  console.log(sats);
  const numSats = sats.length;
  // $("#num-sat").append(``)
}

function displayVisPass(result) {
  console.log(result);
  const satName = result.info.satname;
  const satId = result.info.satid;
  const satDiv = `#nextGO-${satId}`;
  let spinnerID = `#spinner-vis-pass-${satId}`;
  console.log(spinnerID);
  // if ($(spinnerID).is(":visible")) {
  console.log($(spinnerID).is(":hidden"));
  if ($(spinnerID).is(":hidden")) {
    console.log("hidden");
    return;
  } else {
    console.log("visible");
    // console.log("visible");
    //
    $(spinnerID).hide();
    console.log(satDiv);
    // const satId = result.info.satid;
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
    console.log(passes);
    // console.log(numPassesText);
    if (passes === "") {
      let numPassesLine = $("<p>");
      numPassesLine.addClass("uk-text-left");
      numPassesLine.addClass("uk-padding-remove");
      // numPassesLine.addClass("uk-margin-remove-bottom");
      numPassesLine.text(numPassesText);
      $(satDiv).append(numPassesLine);
      console.log(numPassesText);
    } else {
      let numPassesLine = $("<p>");
      numPassesLine.addClass("uk-text-left");
      numPassesLine.addClass("uk-padding-remove");
      numPassesLine.text(numPassesText);
      $(satDiv).append(numPassesLine);
      console.log(numPassesText);
      passes.forEach(pass => {
        let passTime = $("<p>");
        passTime.addClass("uk-text-left");
        passTime.addClass("uk-padding-remove");
        passTimeText = `Start time(UTC): ${pass.startUTC}
        Duration(sec): ${pass.duration}`;
        passTime.text(passTimeText);
        $(satDiv).append(passTime);
      });
      //   }
      // } else {
      //   console.log("hidden");
      //   return;
      // }
    }
  }
}
