const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
const userAlt = 0;

window.satApi = {
  getPosition: (userLon, userLat) => {
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

  getAbove: (userLon, userLat, categoryID) => {
    let searchRadius = 15;
    let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
    $(function() {
      $.ajax({
        url: queryN2YO + aboveQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        // let aboveData = result.above.map(sat => {
        //   return `${sat.satid}, ${sat.satname}, ${sat.launchDate}, ${sat.satlat}, ${sat.satlng}, ${sat.satalt}, \n`;
        // });
        const aboveData = result.above;
        console.log(aboveData.length);
        console.log(aboveData);
        let points = "";
        let pointGraphics = [];
        for (let i = 0; i < aboveData.length; i++) {
          points += `
          const point${i} = new Point({
            longitude: ${aboveData[i].satlng},
            latitude: ${aboveData[i].satlat}
          });
          const pointGraphic${i} = new Graphic({
            geometry: point${i},
            symbol: textSymbol
          });`;
          pointGraphics += `pointGraphic${i}, `;
        }
        let mapDisplayData = `<script>require([
          "esri/Map",
          "esri/PopupTemplate",
          "esri/views/MapView",
          "esri/Graphic",
          "esri/geometry/Point"
        ], function (Map, PopupTemplate, MapView, Graphic, Point) {
          const map = new Map({
            basemap: "satellite"
          });
  
          const view = new MapView({
            center: [${userLon}, ${userLat}],
            container: "viewDiv",
            map: map,
            zoom: 4
          });
        ${points}
        const textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "#7A003C",
          text: "\ue680",
          font: {
            size: 24,
            family: "CalciteWebCoreIcons"
          }
        };
        view.graphics.addMany([${pointGraphics}]);</script>`;
        console.log(mapDisplayData);
        $("#mapdata").text(mapDisplayData);
        return mapDisplayData;
      });
    });
  }
};
