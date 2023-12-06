import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js"

export default function DataCard(view) {
  // Watch for changes in an object using optional chaining
  // whenever the map's extent changes
  reactiveUtils.watch(
    () => view?.extent?.xmin,
    (xmin) => {
      console.log(`Extent change xmin = ${xmin}`)
    },
  )

  const xminChange = view?.extent?.xmin

  return (
    <div
      id="DataCardDiv"
      className="max-w-sm p-6 z-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Extent Finder Tool
      </h5>
      <section className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <h6>Extent</h6>
        <div>xmin: {xminChange}</div>
      </section>
    </div>
  )
}
// https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils