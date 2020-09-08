import React, { useReducer, useRef } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { enneagramQuestions } from "../../utils/data/assessments"
import CloseButton from "./Buttons/CloseButton"
import EnneagramResults from "./EnneagramResults"
import Checkbox from "./Checkbox"

const reducer = (state, action) => {
  const { type } = action
  const { activeQ } = state

  switch (type) {
    case "confirm reset":
      return { ...state, view: "resetting" }
    case "cancel":
      return { ...state, view: "assessing" }
    case "reset":
      return initialState
    case "present":
      return { ...state, view: "presenting" }
    case "next":
      return {
        ...state,
        view:
          activeQ === enneagramQuestions.length ? "submitting" : "assessing",
        activeQ: activeQ === enneagramQuestions.length ? activeQ : activeQ + 1,
      }

    default:
      return state
  }
}

const initialState = {
  view: "assessing",
  activeQ: 1,
}

const Enneagram = ({ open, setOpen, className }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // destructure state
  const { view, activeQ } = state

  // this is used to tally the question results & to minimize re-renders by not holding values in state
  const tally = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0])
  // this is used to store the index(es) of the highest values (which then gives my type numbers)
  const typeIndex = useRef()

  // set variables for easier access
  const questions = [...enneagramQuestions]
  const question = questions[activeQ - 1]

  // if we render and we're on the first question reset the tally counter
  if (activeQ === 1) {
    tally.current = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  // helper function to handle next vs submit logic
  const handleNext = () => {
    if (activeQ === questions.length) {
      score()
      dispatch({
        type: "present",
      })
    } else dispatch({ type: "next" })
  }

  // helper function to score the assessment
  const score = () => {
    let highIndex = [0]

    for (let [i, val] of tally.current.entries()) {
      const highVal = tally.current[highIndex[0]]

      if (i === 0 || val < highVal) {
        continue
      }
      if (val === highVal) {
        highIndex.push(i)
        continue
      }
      if (val > highVal) {
        highIndex = [i]
      }
    }
    typeIndex.current = highIndex
  }

  const ModalContent = () => {
    switch (view) {
      case "resetting":
        return (
          <>
            <ModalBody className="assessment px-5 mx-3 mt-0">
              <h1 className="my-auto h3 text-center">
                Are you sure you want to reset the assessment?
              </h1>
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-end">
              <Button
                color="danger"
                type="button"
                className="text-white"
                onClick={() => dispatch({ type: "reset" })}
              >
                Reset
              </Button>
              <Button
                type="button"
                className="text-white"
                onClick={() => dispatch({ type: "cancel" })}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )
      case "presenting":
        return (
          <>
            <ModalBody className="assessment my-auto">
              <EnneagramResults highIndex={typeIndex.current} />
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-end">
              <Button
                type="button"
                className="text-white"
                // color="primary"
                onClick={() => {
                  setOpen(false)
                  setTimeout(() => {
                    dispatch({ type: "reset" })
                  }, 500)
                }}
              >
                Exit
              </Button>
            </ModalFooter>
          </>
        )
      case "assessing":
      default:
        return (
          <>
            <ModalBody className="assessment">
              <p className="mb-2 h3 mt-0">{`Type ${question.type}`}</p>
              <p className="mb-4 text-muted">Please check all that apply...</p>
              <div className="d-block text-left">
                {question.questions.map(q => {
                  return (
                    <Checkbox key={q} type={question.type} tally={tally}>
                      {q}
                    </Checkbox>
                  )
                })}
              </div>
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-between">
              <p className="mr-auto ml-3">
                {activeQ} of {questions.length}
              </p>
              <Button
                color="danger"
                type="button"
                className="w-auto text-white"
                onClick={() => dispatch({ type: "confirm reset" })}
                disabled={activeQ === 1}
              >
                Reset
              </Button>
              <Button
                color="primary"
                className="text-white"
                type="button"
                onClick={() => handleNext()}
              >
                {activeQ === questions.length ? "Submit" : "Next"}
              </Button>
            </ModalFooter>
          </>
        )
    }
  }
  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      // contentClassName="mt-4 mb-auto d-fixed mt-0 d-md-block mt-md-3"
      className={className}
    >
      <CloseButton setOpen={setOpen} />
      <ModalContent />
    </Modal>
  )
}

export default Enneagram
