import React, { useRef, useEffect } from "react"
import esriConfig from "@arcgis/core/config"
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"

import ZoomWidget from "../Widgets/zoomWidget"
import HomeWidget from "../Widgets/homeWidget"
import LocateWidget from "../Widgets/locateWidget"
import BasemapToggleWidget from "../Widgets/basemapToggleWidget"

import DataCard from "../Layout/dataCard"

import DocConfig from "../../config/DocConfig"
const ESRI_apiKEY = import.meta.env.VITE_esri_apiKey

import getMAGAreaLayer from "../MapLayers/getMAGAreaLayer"



let map
let view

function MainMap() {
  const mapDiv = useRef(null)

  // DataCard(view)

  function callWidgets() {
    ZoomWidget(view)
    HomeWidget(view)
    LocateWidget(view)
    BasemapToggleWidget(view)
    DataCard(view)
  }

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = ESRI_apiKEY
      // basemap info
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap

      const MAGAreaLayer = getMAGAreaLayer()  

      map = new ArcGISMap({
        basemap: "streets-vector",
        layers: [MAGAreaLayer],
      })

      view = new MapView({
        map,
        container: mapDiv.current,
        center: [-112.354, 33.308],
        zoom: 8,
        constraints: {
          rotationEnabled: false,
          minZoom: 6,
          maxZoom: 20,
        },
        ui: {
          components: [],
        },
        popup: {
          dockEnabled: false,
          collapseEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
        },
      })
    }
    callWidgets()

    // view.ui.add("DataCardDiv", "top-right")

    // addLayers(map).then(async () => {
    //   // Call Widgets
    //     callWidgets();
    // });
  }, [])

  return <div id="map" className="h-full w-full m-auto" ref={mapDiv}></div>
}

function getMapRef() {
  return { map, view }
}

function displayMessage(info) {
  console.log(info)
}

export { getMapRef, MainMap }
