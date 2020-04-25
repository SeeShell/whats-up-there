userLat = parseFloat(localStorage.getItem("userLat"));
userLon = parseFloat(localStorage.getItem("userLon"));
console.log(userLat, userLon);

satApi.getAbove(userLon, userLat, 0, 25, "maps");

function sendAnswers(data) {
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

        // map over sat names array and create text symbols
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

        // map over sat coordinates array and contruct a new graphic with sat coords
        const pointGraphics = mapCoords.map(point => {
            return new Graphic({
                geometry: new Point(point)
            });
        });

        // add sat names into pointGraphic obects
        for (let i = 0; i < satNameArray.length; i++) {
            pointGraphics[i].symbol = satNameArray[i];
        }
        // Add the graphics to the view's graphics layer
        view.graphics.addMany(pointGraphics);
    }
}