import React from "react"
import { Button } from "reactstrap"

const ResponseButton = ({ dispatch, data }) => {
  return (
    <Button
      color={`${data[2] === true && "primary"}`}
      className="mt-2 text-white"
      // color="info"
      onClick={() => dispatch({ type: "answer", payload: data })}
    >
      {data[0]}
    </Button>
  )
}

export default ResponseButton
