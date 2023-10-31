import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"

function getCountyLayer() {

    const maricopaCountyLayer = new GeoJSONLayer({
      title: "maricopa-county-boundary",
      url: "../../data/maricopaCounty.json",
      visible: true,
    })
    return maricopaCountyLayer
  }
  export default getCountyLayer
  