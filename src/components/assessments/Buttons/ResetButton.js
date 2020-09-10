import React from "react"
import { Button } from "reactstrap"

const ResetButton = ({ dispatch }) => {
  return (
    <Button
      color="danger"
      type="button"
      className="text-white"
      onClick={() => dispatch({ type: "reset" })}
    >
      Reset
    </Button>
  )
}

export default ResetButton
