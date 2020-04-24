const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
const userAlt = 0;

// const satelliteIDArray = {
//     18: "Amateur radio",
//     35: "Beidou Navigation System",
//     1: "Brightest",
//     45: "Celestis",
//     32: "CubeSats",
//     8: "Disaster monitoring",
//     6: "Earth resources",
//     29: "Education",
//     Engineering 28
//     Experimental 19
//     Flock 48
//     Galileo 22
//     Geodetic 27
//     Geostationary 10
//     Global Positioning System(GPS) Constellation 50
//     Global Positioning System(GPS) Operational 20
//     Globalstar 17
//     Glonass Constellation 51
//     Glonass Operational 21
//     GOES 5
//     Gonets 40
//     Gorizont 12
//     Intelsat 11
//     Iridium 15
//     IRNSS 46
//     Catgory id
//     ISS 2
//     Lemur 49
//     Military 30
//     Molniya 14
//     Navy Navigation Satellite System 24
//     NOAA 4
//     O3B Networks 43
//     OneWeb 53
//     Orbcomm 16
//     Parus 38
//     QZSS 47
//     Radar Calibration 31
//     Raduga 13
//     Russian LEO Navigation 25
//     Satellite - Based Augmentation System 23
//     Search & rescue 7
//     Space & Earth Science 26
//     Starlink 52
//     Strela 39
//     Tracking and Data Relay Satellite System 9
//     Tselina 44
//     Tsikada 42
//     Tsiklon 41
//     TV 34
//     Weather 3
//     Westford Needles 37
//     XM and Sirius 33
//     Yaogan 36
// }

window.satApi = {
    getPosition: (userLon, userLat) => {
        let positionQuery = `/positions/${satID}/${userLat}/${userLon}/${userAlt}/50`;
        $(function() {
            $.ajax({
                url: queryN2YO + positionQuery + apiKeyN2YO,
                method: "GET"
            }).then(result => {
                // console.log(result);
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
                // console.log(aboveData.length);
                // console.log(aboveData);
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
                let mapDisplayData = `require([
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
        view.graphics.addMany([${pointGraphics}]);`;
                // console.log(mapDisplayData);
                return points;
            });
            getAboveHomePage(userLon, userLat, categoryID);
        });
    }
};



function getAboveHomePage(userLon, userLat, categoryID) {
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
            const aboveDataHome = result.above;
            console.log(aboveDataHome)

            for (let i = 0; i < aboveDataHome.length; i++) {
                var percentage1 = Math.floor(Math.random() * 21) + 20
                var percentage2 = Math.floor(Math.random() * 21) + 20
                var markerLink = `<a href="#satellite${i+1}" uk-toggle class="uk-position-absolute uk-transform-center" style="left: ${i+percentage1}%; top: ${i+percentage2}%" href="#" uk-marker>
    <i class="fas fa-satellite"></i></a>
    <div id="satellite${i+1}" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" id="satellite${i+1}">
        <button class="uk-modal-close-outside" type="button" uk-close></button>

        <p id="satellite-${i+1}-name" style="font-weight: bold;">${aboveDataHome[i].satname}</p>
        <p id="satellite-${i+1}-launch">LAUNCH : ${aboveDataHome[i].launchDate}</p>
        <p id="satellite-${i+1}-class">CLASSIFICATION : </p>
        <a href="" id="sat-${i+1}" uk-icon="icon: bookmark; ratio: 2"></a>
    </div>
</div>`;

                $("#aerial-image").append(markerLink);
            }

        });
    })
}