import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"


function getMAGAreaLayer() {
  const url = "./src/data/MAG_Planning_Area_Boundary.geojson"

  const renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      style: "solid",
      color: [0, 0, 0, 0],
      outline: {
        color: [110, 110, 110, 255],
        width: 2,
      },
    }
  };

  const magLayer = new GeoJSONLayer({
    title: "mag planning area",
    url: url,
    renderer: renderer,
    visible: true,
  })
  return magLayer
}
export default getMAGAreaLayer
