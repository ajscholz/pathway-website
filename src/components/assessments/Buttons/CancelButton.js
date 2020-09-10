import React from "react"
import { Button } from "reactstrap"

const CancelButton = ({ dispatch }) => {
  return (
    <Button
      type="button"
      className="text-white mr-2"
      onClick={() => dispatch({ type: "cancel" })}
    >
      Cancel
    </Button>
  )
}

export default CancelButton
