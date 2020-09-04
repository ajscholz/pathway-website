import React from "react"
import { FormGroup, Label, Input } from "reactstrap"

const Checkbox = ({ children, tally, type }) => {
  const typeIndex = type - 1

  return (
    <FormGroup check>
      <Label check>
        <Input
          defaultValue=""
          type="checkbox"
          onChange={e => {
            if (e.target.checked)
              tally.current[typeIndex] = tally.current[typeIndex] + 1
            else if (!e.target.checked)
              tally.current[typeIndex] = tally.current[typeIndex] - 1
          }}
        />
        {children}
        <span className="form-check-sign"></span>
      </Label>
    </FormGroup>
  )
}

export default Checkbox
