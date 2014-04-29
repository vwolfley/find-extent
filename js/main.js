/*! main.js | Tools-Find Extent */

 require([
      "dojo/dom",
      "dojo/dom-construct",
      "dojo/on",
      "dojo/parser",
      "esri/map",
      "esri/geometry/Extent",
      "esri/dijit/Scalebar",
      "esri/dijit/HomeButton",
      "esri/layers/ArcGISDynamicMapServiceLayer",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/layers/FeatureLayer",
      "esri/graphic",
      "dijit/form/CheckBox",
      "dijit/form/RadioButton",
      "dijit/form/Form",
      "dijit/form/Button",
      "dojo/_base/json",
      "dojo/domReady!"
    ], function(
      dom, dc, on, parser, Map, Extent, Scalebar, HomeButton, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, FeatureLayer, Graphic, CheckBox, RadioButton)  {

      parser.parse();

        var map = new Map("mapDiv", {
            basemap: "streets",
            center: [-112.354, 33.308],
            zoom: 9,
            showAttribution: false,
            logo: false,
            sliderPosition: "top-right"
        });

        // create scale-bar
        var scalebar = new Scalebar({
          map: map,
          scalebarUnit: "english"
        });

        // create div for home-button
        var homeButton = new HomeButton({
            map: map,
            visible: true //show the button
        }, dc.create("div", {
            id: "HomeButton"
        }, "mapDiv", "last"));
        homeButton._homeNode.title = "Original Extent";
        homeButton.startup();

        var coBoundaryURL = "http://geo.azmag.gov/GISMAG/rest/services/maps/MaricopaCountyBoundary/MapServer";
        var coBoundary = map.addLayer(new ArcGISDynamicMapServiceLayer(coBoundaryURL, {
            id: "coBoundary",
            visible: true,
            opacity: 1
        }));

        // var coBoundaryJson = "data/maricopaCounty.json";
        // var boundary = new FeatureLayer(coBoundaryJson, {
        //     id: "Maricopa County",
        //     mode: FeatureLayer.Mode_SNAPSHOT,
        //     outFields: ["*"],
        //     opacity: 1
        // });
        // map.addLayer(boundary);



      function showExtent(extent) {
        // console.log(map);;
        var currentZoom = map.getZoom();
        var currentCenter = map.extent.getCenter();
        var centerLat = currentCenter.getLatitude();
        var centerLon = currentCenter.getLongitude();
          var s = "";
          s = "Extent: " + "XMin: "+ map.extent.xmin.toFixed(0) + ",&nbsp;"
             +"YMin: " + map.extent.ymin.toFixed(0) + ",&nbsp;"
             +"XMax: " + map.extent.xmax.toFixed(0) + ",&nbsp;"
             +"YMax: " + map.extent.ymax.toFixed(0) + "</br>"
             +"Spatial Reference: " + "wkid: " + map.spatialReference.wkid + "</br>"
             +"Center: "  + "["+ centerLon.toFixed(3) + ", " + centerLat.toFixed(3) + "]" + "</br>"
             +"Map Level: " + currentZoom;
          // dom.byId("infoDiv").innerHTML = s + "</br>Map extent json: " + dojo.toJson(map.extent.toJson());
          dom.byId("infoDiv").innerHTML = s ;
        }
      on(map, "extent-change", showExtent);






       }); // end function

// End Main Function
//=====================================================================================================================>
// function changeProjection(map){
//     var switchTo = dijit.byId('projectionForm').getValues();
//     map.destroy();
//     createMap(switchTo.prj);
// }


// function createMap(prj){
//     switch (prj) {
//         case 'wgs84':
//             map = new Map("mapDiv");
//             var basemap = new ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
//             map.addLayer(basemap);
//             connectMap();
//             break;
//         case 'webmercator':
//             map = new Map("mapDiv");
//             var basemap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
//             map.addLayer(basemap);
//             connectMap();
//             break;
//     }
// }

$(document).ready(function(){
    var r = 0, dir = false;
    $("#infoDiv").click(function() {
        dir =! dir;
       r = dir? -525 : 0;
        $(this).stop().animate({left: r + 'px'}, 500);
    });
});