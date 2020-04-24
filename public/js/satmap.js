// const mapProps = {
//   center: { latitude: 32, longitude: -117 }, // get from local storage
//   // get the points using satApi.getAbove
//   points: [
//     { latitude: 34.05, longitude: -117.19 },
//     { longitude: -124.63, latitude: 41.88 }
//   ]
// };

// const points = satApi.getAbove(userLon, userLat, 0, 15);

// const mapProps = {
//   center: { userLat, userLon }, // get from local storage
//   // get the points using satApi.getAbove
//   points: []
// };
// $(document).ready(function() {
//   userLat = localStorage.getItem("userLon");
//   userLon = localStorage.getItem("userLat");
//   console.log(userLat, userLon);
//   const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
//   const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
//   const userAlt = 0;
//   const searchRadiusHere = 15;
//   const categoryID = 0;
//   let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadiusHere}/${categoryID}`;
//   $(function() {
//     $.ajax({
//       url: queryN2YO + aboveQuery + apiKeyN2YO,
//       method: "GET"
//     }).then(result => {
//       console.log(result.above);
//       // let mapCoords = result.above.map(sat => {
//       //   return {
//       //     latitude: sat.satlat,
//       //     longitude: sat.satlng
//       //   };
//     });
//     // return mapCoords;
//   });
// });
userLat = parseFloat(localStorage.getItem("userLat"));
userLon = parseFloat(localStorage.getItem("userLon"));
// const userAlt = 0;
// const searchRadius = 15;
// const categoryID = 0;
console.log(userLat, userLon);

satApi.getAbove(userLon, userLat, 0, 15);
// .then(result => {
//   console.log(result);
// });
function sendAnswers(data) {
  console.log(data);
  const mapCoords = data.map(sat => {
    return {
      latitude: sat.satlat,
      longitude: sat.satlng
    };
  });

  initSatMap(mapCoords);
}

//       .then(mapCoords => {
//         const mapProps = {
//           center: { userLat, userLon }, // get from local storage
//           // get the points using satApi.getAbove
//           points: mapCoords
//         };
//         console.log(mapProps);
//         initSatMap(mapProps);
//       });
//   });
// });

function initSatMap(mapCoords) {
  require([
    "esri/Map",
    "esri/PopupTemplate",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/geometry/Point"
  ], initEsriMapView);

  // arcGIS esri map
  function initEsriMapView(Map, PopupTemplate, MapView, Graphic, Point) {
    const map = new Map({
      basemap: "satellite"
    });

    const view = new MapView({
      center: [userLon, userLat],
      container: "viewDiv",
      map: map,
      zoom: 4
    });

    // Create a symbol for drawing the point
    const textSymbol = {
      type: "text", // autocasts as new TextSymbol()
      color: "#7A003C",
      text: "\ue680", // esri-icon-map-pin
      font: {
        // autocasts as new Font()
        size: 24,
        family: "CalciteWebCoreIcons"
      }
    };

    // const textSat = {
    //   type: "text", // autocasts as new TextSymbol()
    //   color: "white",
    //   haloColor: "black",
    //   haloSize: "1px",
    //   text: "sat name",
    //   xoffset: 3,
    //   yoffset: 3,
    //   font: {
    //     // autocasts as new Font()
    //     size: 12,
    //     family: "Josefin Slab",
    //     weight: "bold"
    //   }
    // };

    const pointGraphics = mapCoords.map(point => {
      return new Graphic({
        geometry: new Point(point),
        symbol: textSymbol
      });
    });

    // Add the graphics to the view's graphics layer
    view.graphics.addMany(pointGraphics);
  }
}
