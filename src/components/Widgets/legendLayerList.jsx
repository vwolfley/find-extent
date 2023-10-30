import LayerList from "@arcgis/core/widgets/LayerList"
import LayersConfig from "../../config/LayersConfig/layersConfig"
import "./widgets.css"
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils"

function LayerListWidget(view) {
  const layerInfos = LayersConfig.filter(({ legend }) => {
    // console.log(legend)
    return legend
  }).sort((a, b) => {
    return a.order > b.order ? 1 : -1
  })

  const layerList = new LayerList({
    view: view,
    layerInfos: layerInfos,
    container: "legendDiv",

    listItemCreatedFunction: (event) => {
      //   console.log(event.item.layer.visible)
      const item = event.item

      if (item.layer.type !== "group") {
        // don't show legend twice
        item.panel = {
          content: "legend",
          open: false,
        }
        if (item.layer.id === "graphicsLayer") {
          item.hidden = true
        }
      }
    },
  })
  reactiveUtils.watch(
    () => {
      return layerList.operationalItems.map((item) => item.layer.visible)
    },
    (item) => {
      layerList.operationalItems.forEach((item) => {
        item.panel.open = item.layer.visible
        // console.log(item)
      })
    },
  )

  view.ui.add("infoDiv", "top-right")
}
export default LayerListWidget

// Widgets called in Map.js