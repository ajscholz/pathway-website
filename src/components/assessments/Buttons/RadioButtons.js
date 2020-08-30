import React from "react"
import { FormGroup, Label, Input } from "reactstrap"

const RadioButtons = () => {
  return (
    <div id="inputs">
      <FormGroup check className="form-check-radio vertical" inline>
        <Label check className="vertical">
          <Input
            defaultValue="option1"
            id="exampleRadios1"
            name="exampleRadios"
            type="radio"
          ></Input>
          <span className="form-check-sign vertical"></span>1
        </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio vertical" inline>
        <Label check className="vertical">
          <Input
            defaultChecked
            defaultValue="option2"
            id="exampleRadios2"
            name="exampleRadios"
            type="radio"
          ></Input>
          <span className="form-check-sign vertical"></span>2
        </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio vertical" inline>
        <Label check className="vertical">
          <Input
            defaultValue="option1"
            disabled
            id="exampleRadios1"
            name="exampleRadios1"
            type="radio"
          ></Input>
          <span className="form-check-sign vertical"></span>3
        </Label>
      </FormGroup>
    </div>
  )
}

export default RadioButtons
