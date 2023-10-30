import magLogo from "@images/mag-logo-black.png"
import "./widgets.css"

const style = {
  display: "none",
  padding: "5px",
  width: "200px",
  alignItems: "center",
  justifyContent: "center",
}

function LogoWidget(view) {
  return (
    <div style={style} id="logoDiv" className="esri-widget">
      <img
        style={{
          width: "185px",
        }}
        src={magLogo}
        alt="MAG Logo"
      />
    </div>
  )
}

export default LogoWidget

// Widgets called in Map.js