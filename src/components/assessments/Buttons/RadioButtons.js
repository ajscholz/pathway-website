import React from "react"
import { FormGroup, Label, Input } from "reactstrap"

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"]

const RadioButtons = ({ currentSelection }) => {
  // currentSelection.current = Math.floor(Math.random() * 5) + 1 - 1 // FOR TESTING ONLY

  return (
    <div
      className="mt-auto w-100"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 53px)",
        justifyContent: "space-between",
        maxWidth: "360px",
      }}
    >
      {options.map((option, i) => (
        <FormGroup
          check
          className="form-check-radio vertical d-flex justify-content-center mr-0"
          inline
          key={option}
        >
          <Label check className="vertical mx-0 mt-0">
            <Input
              defaultChecked={i === currentSelection.current}
              defaultValue={option}
              id={`sgOptions${i + 1}`}
              name={`sg-options`}
              type="radio"
              onClick={() => {
                currentSelection.current = i
              }}
            />

            <span className="form-check-sign vertical d-flex flex-column text-muted">
              <small>{option}</small>
            </span>
          </Label>
        </FormGroup>
      ))}
    </div>
  )
}

export default React.memo(RadioButtons)
