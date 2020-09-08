import React, { useEffect } from "react"
import NoUiSlider from "nouislider"

const Slider = () => {
  useEffect(() => {
    if (
      !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {
      NoUiSlider.create(document.getElementById("sliderRegular"), {
        start: [3],
        // connect: [true, false],
        step: 1,
        range: { min: 1, max: 5 },
        // tooltips: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        tooltips: true,
        format: {
          // 'to' the formatted value. Receives a number.
          to: function(value) {
            switch (value) {
              case 1:
                return "Never"
              case 2:
                return "Rarely"
              case 3:
                return "Sometimes"
              case 4:
                return "Often"
              case 5:
                return "Always"
              default:
                return
            }
          },
          // 'from' the formatted value.
          // Receives a string, should return a number.
          from: function(value) {
            return Number(value.replace(",-", ""))
          },
        },
      })
    }
  })
  return (
    <div style={{ width: "90%" }}>
      <div className="slider slider-primary" id="sliderRegular" />
    </div>
  )
}

export default Slider
