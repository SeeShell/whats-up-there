userLat = parseFloat(localStorage.getItem("userLat"));
userLon = parseFloat(localStorage.getItem("userLon"));
console.log(userLat, userLon);

satApi.getAbove(userLon, userLat, 0, 25);

function sendAnswers(data) {
  console.log(data);
  const mapCoords = data.map(sat => {
    return {
      latitude: sat.satlat,
      longitude: sat.satlng
    };
  });
  const satNames = data.map(sat => {
    return {
      satname: sat.satname
    };
  });

  initSatMap(mapCoords, satNames);
}

function initSatMap(mapCoords, satNames) {
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

    const satNameArray = satNames.map(name => {
      return {
        type: "text", // autocasts as new TextSymbol()
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        text: name.satname,
        xoffset: 3,
        yoffset: 3,
        font: {
          // autocasts as new Font()
          size: 12,
          family: "Josefin Slab",
          weight: "bold"
        }
      };
    });
    console.log(satNameArray);

    const pointGraphics = mapCoords.map(point => {
      return new Graphic({
        geometry: new Point(point),
        symbol: textSymbol
      });
    });
    console.log(pointGraphics);
    // Add the graphics to the view's graphics layer
    view.graphics.addMany(pointGraphics);
  }
}
