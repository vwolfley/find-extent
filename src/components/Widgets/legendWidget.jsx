import Legend from "@arcgis/core/widgets/Legend"
import LayersConfig from "../../config/LayersConfig/layersConfig"
import "./Widgets.css"

function LegendWidget(map, view) {
  const layerInfos = LayersConfig.filter(({ legend }) => legend)
    .sort((a, b) => {
      return a.order > b.order ? 1 : -1
    })
    .map(({ id, legendTitle }) => {
      return {
        title: legendTitle,
        layer: map.findLayerById(id),
      }
    })

  const legend = new Legend({
    view: view,
    layerInfos: layerInfos,
    container: "legendDiv",
  })

  view.ui.add("infoDiv", "top-right")
}

export default LegendWidget

// Widgets called in Map.js