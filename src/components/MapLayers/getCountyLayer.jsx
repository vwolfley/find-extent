import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"


function getCountyLayer() {
  const url = "https://github.com/vwolfley/find-extent/blob/update-react-vite/src/data/maricopaCounty.json"

  const maricopaCountyLayer = new GeoJSONLayer({
    title: "maricopa-county-boundary",
    url: url,
    visible: true,
  })
  return maricopaCountyLayer
}
export default getCountyLayer
