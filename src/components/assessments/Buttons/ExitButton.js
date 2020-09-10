import React from "react"
import { Button } from "reactstrap"

const ExitButton = ({ setOpen, dispatch }) => {
  return (
    <Button
      type="button"
      className="text-white"
      // color="primary"
      onClick={() => {
        setOpen(false)
        setTimeout(() => {
          dispatch({ type: "reset" })
        }, 1000)
      }}
    >
      Exit
    </Button>
  )
}

export default ExitButton
