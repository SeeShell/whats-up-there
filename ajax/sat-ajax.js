const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
const userAlt = 0;
let satID = 25544;

function getPosition(userLon, userLat) {
  let positionQuery = `/positions/${satID}/${userLat}/${userLon}/${userAlt}/50`;
  $(function() {
    $.ajax({
      url: queryN2YO + positionQuery + apiKeyN2YO,
      method: "GET"
    }).then(result => {
      console.log(result);
    });
  });
}

function getAbove(userLon, userLat) {
  let searchRadius = 45;
  let categoryID = 0;
  let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
  $(function() {
    $.ajax({
      url: queryN2YO + aboveQuery + apiKeyN2YO,
      method: "GET"
    }).then(result => {
      console.log(result);
      let aboveData = result.above.map(sat => {
        return `${sat.satid}, ${sat.satname}, ${sat.launchDate}, ${sat.satlat}, ${sat.satlng}, ${sat.satalt}, \n`;
      });
      return aboveData;
    });
  });
}
