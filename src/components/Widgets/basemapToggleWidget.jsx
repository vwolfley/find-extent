import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import "./widgets.css"

function BasemapToggleWidget(view) {
  const basemapToggle = new BasemapToggle({
    view,
    nextBasemap: "satellite",
    visibleElements: {
      title: true,
    },
  });
  view.ui.add(basemapToggle, "bottom-right");

}

export default BasemapToggleWidget

// Widgets called in Map.js