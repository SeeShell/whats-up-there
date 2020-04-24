const mapProps = {
  center: { latitude: 32, longitude: -117 },
  points: [
    { latitude: 34.05, longitude: -117.19 },
    { longitude: -124.63, latitude: 41.88 }
  ]
};

require([
  "esri/Map",
  "esri/PopupTemplate",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/geometry/Point"
], constructInitSatMap(mapProps));

function constructInitSatMap({ center, points }) {
  return function initSatMap(Map, PopupTemplate, MapView, Graphic, Point) {
    const map = new Map({
      basemap: "satellite"
    });

    const view = new MapView({
      center: new Point(center),
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

    const pointGraphics = points.map(point => {
      return new Graphic({
        geometry: new Point(point),
        symbol: textSymbol
      });
    });

    // Add the graphics to the view's graphics layer
    view.graphics.addMany(pointGraphics);
  };
}
