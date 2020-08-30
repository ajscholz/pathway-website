import React from "react"
import { Button } from "reactstrap"

const NextButton = ({ state, dispatch, question }) => {
  const { activeQ, questions } = state
  return (
    <Button
      color="primary"
      // className="text-white"
      disabled={!question.answered}
      type="button"
      onClick={() =>
        dispatch({
          type: activeQ === questions.length ? "submit" : "next",
        })
      }
    >
      {activeQ === questions.length ? "Submit" : "Next"}
    </Button>
  )
}

export default NextButton
