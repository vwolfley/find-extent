import Expand from "@arcgis/core/widgets/Expand"
import "./widgets.css"

function ExpandWidget(view) {
  const ExpandWidget = new Expand({
    view: view,
    content: document.getElementById("infoDiv"),
    expanded: true,
    expandIconClass: "esri-icon-settings2",
  })
  view.ui.add(ExpandWidget, "top-right")
}

export default ExpandWidget

// Widgets called in Map.js