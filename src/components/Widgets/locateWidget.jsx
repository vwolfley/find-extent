import Locate from "@arcgis/core/widgets/Locate"
import "./widgets.css"

function LocateWidget(view) {
  const locateBtn = new Locate({ view })
  view.ui.add(locateBtn, "bottom-right")
}
export default LocateWidget

// Widgets called in Map.js