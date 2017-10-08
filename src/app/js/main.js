/* ========================================================================
 * Find Extent Tool
 * @file main.js
 * @summary main javascript file for project
 * @version 1.3.1
 * @author Vern Wolfley
 * ========================================================================
 * @copyright 2017 Vern Wolfley
 * @license MIT
 * ========================================================================
 */

require([
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/parser",
  "dojo/query",
  "esri/map",
  "esri/dijit/Scalebar",
  "esri/dijit/HomeButton",
  "esri/layers/FeatureLayer",
  "esri/InfoTemplate",
  "dojo/_base/json",
  "dojo/domReady!"
], function(
  dom, dc, on, parser, query, Map, Scalebar, HomeButton, FeatureLayer, InfoTemplate) {

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

  on(map, "extent-change", showExtent);
  on(dom.byId("layer0CheckBox"), "change", updateLayerVisibility);
  on(dom.byId("layer1CheckBox"), "change", updateLayerVisibility);
  on(dom.byId("layer2CheckBox"), "change", updateLayerVisibility);

  var fLayer0 = new FeatureLayer("http://geo.azmag.gov/gismag/rest/services/maps/RegionalBoundaries/MapServer/0", {
    id: "mpo",
    mode: FeatureLayer.MODE_ONDEMAND,
    visible: true,
    outFields: ["*"]
  });

  var infoTemplate1 = new InfoTemplate("Counties", "${NAME} County");

  var fLayer1 = new FeatureLayer("http://geo.azmag.gov/gismag/rest/services/maps/RegionalBoundaries/MapServer/1", {
    id: "county",
    mode: FeatureLayer.MODE_ONDEMAND,
    visible: false,
    outFields: ["*"],
    infoTemplate: infoTemplate1
  });

  var infoTemplate2 = new InfoTemplate("MAG Region MPA's", "${MPA_FULLNAME} MPA Boundary");

  var fLayer2 = new FeatureLayer("http://geo.azmag.gov/gismag/rest/services/maps/RegionalBoundaries/MapServer/2", {
    id: "mpa",
    mode: FeatureLayer.MODE_ONDEMAND,
    visible: false,
    outFields: ["*"],
    infoTemplate: infoTemplate2
  });

  map.addLayers([fLayer0, fLayer1, fLayer2]);

  function showExtent(extent) {
    // console.log(map);

    var currentZoom = map.getZoom();
    var currentCenter = map.extent.getCenter();
    var centerLat = currentCenter.getLatitude();
    var centerLon = currentCenter.getLongitude();
    var currentScale = map.getScale();
    var currentResolution = map.getResolution();

    var s = "Extent:</br>" +
      "&nbsp;&nbsp;xmin: " + map.extent.xmin.toFixed(0) + ",</br>" +
      "&nbsp;&nbsp;ymin: " + map.extent.ymin.toFixed(0) + ",</br>" +
      "&nbsp;&nbsp;xmax: " + map.extent.xmax.toFixed(0) + ",</br>" +
      "&nbsp;&nbsp;ymax: " + map.extent.ymax.toFixed(0) + ",</br>" +
      "Spatial Reference: " + "wkid: " + map.spatialReference.wkid + "</br>" +
      "Center: " + "[" + centerLon.toFixed(3) + ", " + centerLat.toFixed(3) + "]" + "</br>" +
      "Map LOD Level: " + currentZoom + "</br>" +
      "Map Resolution: " + currentResolution.toFixed(3) + "</br>" +
      "Map Scale: " + currentScale.toFixed(3) + "</br>" +
      "Map Width: " + map.width + "px</br>" +
      "Map Height: " + map.height + "px";

    dom.byId("infoDiv").innerHTML = s;
  }

  function updateLayerVisibility() {
    var inputs = query(".list_item");
    var inputCount = inputs.length;

    for (var i = 0; i < inputCount; i++) {
      if (inputs[0].checked) {
        fLayer0.show();
      } else {
        fLayer0.hide();
      }
      if (inputs[1].checked) {
        fLayer1.show();
      } else {
        fLayer1.hide();
      }
      if (inputs[2].checked) {
        fLayer2.show();
      } else {
        fLayer2.hide();
      }
    }
  }



}); // end function

// End Main Function
//=====================================================================================================================>

//Click function used to open and close docked window
// $(document).ready(function() {
//   var r = 0,
//     dir = false;
//   $("#infoDiv").click(function() {
//     dir = !dir;
//     r = dir ? -525 : 0;
//     $(this).stop().animate({
//       left: r + 'px'
//     }, 500);
//   });
// });
