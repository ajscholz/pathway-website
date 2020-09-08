import React from "react"
import { FormGroup, Label, Input } from "reactstrap"

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"]

const RadioButtons = () => {
  return (
    <div
      className="w-100"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 53px)",
        justifyContent: "space-between",
      }}
    >
      {options.map((option, index) => (
        <FormGroup
          check
          className="form-check-radio vertical d-flex justify-content-center mr-0"
          inline
          key={option}
        >
          <Label check className="vertical mx-0 mt-0">
            <Input
              defaultValue={option}
              id={`sgOptions${index + 1}`}
              name={`sg-options`}
              type="radio"
            ></Input>

            <span className="form-check-sign vertical d-flex flex-column">
              <small>{option}</small>
            </span>
          </Label>
        </FormGroup>
      ))}
    </div>
  )
}

export default RadioButtons
