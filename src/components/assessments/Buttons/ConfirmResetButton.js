import React from "react"
import { Button } from "reactstrap"

const ConfirmResetButton = ({ state, dispatch }) => {
  const { activeQ } = state
  return (
    <Button
      color="danger"
      type="button"
      className="w-auto text-white"
      onClick={() => dispatch({ type: "confirm reset" })}
      disabled={activeQ === 1 ? true : false}
      // disabled={questions[activeQ - 1].answered === false}
    >
      Reset
    </Button>
  )
}

export default ConfirmResetButton
