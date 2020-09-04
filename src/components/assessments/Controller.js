import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button } from "reactstrap"
import MBTI from "./MBTI"
import SpiritualGifts from "./SpiritualGifts"
import Enneagram from "./Enneagram"

const Controller = ({ children, type }) => {
  const [open, setOpen] = useState(false)

  let Component
  switch (type) {
    case "mbti":
      Component = MBTI
      break
    case "sg":
      Component = SpiritualGifts
      break
    case "enneagram":
      Component = Enneagram
      break
    default:
      Component = () => null
      console.log("Unknown Assessment Type")
  }

  return (
    <>
      <Component open={open} setOpen={setOpen} />

      <Button
        color="primary"
        className="mt-4 mx-auto"
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
    </>
  )
}

Controller.propTypes = {
  type: PropTypes.oneOf(["sg", "mbti", "enneagram"]),
}

export default Controller
