import Search from "@arcgis/core/widgets/Search"
import "./widgets.css"

function SearchWidget(view) {
  const SearchWidget = new Search({ view })
  view.ui.add(SearchWidget, "top-right")
}

export default SearchWidget

// Widgets called in Map.js