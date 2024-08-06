import { useState, useEffect } from "react"
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js"

export default function DataCard(view) {
  let infoCenter
  let infoExtent
  console.log(view)

  // Watch view's stationary property for becoming true.
  reactiveUtils.when(
    () => view.stationary === true,
    () => {
      // Get the new center of the view only when view is stationary.
      if (view.center) {
        infoCenter = `<br> <span> the view center changed. </span>
              x: ${view.center.x.toFixed(2)}
              y: ${view.center.y.toFixed(2)}`
        // displayMessage(info)
      }
      // Get the new extent of the view only when view is stationary.
      if (view.extent) {
        infoExtent = `<br> <span> the view extent changed: </span>
              <br> xmin: ${view.extent.xmin.toFixed(2)}
              xmax: ${view.extent.xmax.toFixed(2)}
              <br> ymin: ${view.extent.ymin.toFixed(2)}
              ymax: ${view.extent.ymax.toFixed(2)}`
        // displayMessage(info)
      }
    },
  )

  // function displayMessage(info) {
  //   outputMessages.innerHTML += info;
  //   outputMessages.scrollTop = outputMessages.scrollHeight;
  // }

  return (
    <div
      id="DataCardDiv"
      className="max-w-sm p-6 z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 absolute top-2 right-2">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Extent Finder Tool
      </h5>
      <section className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <h6>Center</h6>
        <div>{infoCenter}</div>
        <h6>Extent</h6>
        <div>{infoExtent}</div>
      </section>
    </div>
  )
}
// https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
// https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=featurelayerview-query
// https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/
