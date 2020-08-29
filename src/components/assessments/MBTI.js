import React, { useReducer } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { mbtiData } from "../../utils/data/assessments"
import MBTIResults from "./MBTIResults"

// const data = mbtiData()
const data2 = mbtiData()
const data = [data2[0], data2[1]]

const reducer = (state, action) => {
  const { type, payload } = action
  const { activeQ, questions, responses, currentVal } = state
  const index = activeQ - 1
  switch (type) {
    case "confirm reset":
      return { ...state, view: "resetting" }
    case "cancel":
      return { ...state, view: "assessing" }
    case "reset":
      return initialState
    case "submit":
      return {
        ...state,
        responses: [...responses, [currentVal]],
        view: "submitting",
      }
    case "present":
      return { ...state, view: "presenting", finalData: payload }
    case "reject":
      return { ...state, view: "error" }
    case "next":
      return {
        view: activeQ === questions.length ? "submitting" : "assessing",
        ...state,
        activeQ: activeQ === questions.length ? activeQ : activeQ + 1,
        responses: [...responses, [currentVal]],
      }
    case "answer":
      // BUILD IN CASE FOR CHANGE
      const newQuestions = [...questions]
      const options = newQuestions[index].options.map(option => [
        option[0],
        option[1],
        false,
      ])

      newQuestions[index] = {
        ...questions[index],
        options: [...options],
        answered: true,
      }
      newQuestions[index].options[payload[3]] = [payload[0], payload[1], true]

      return {
        ...state,
        questions: newQuestions,
        currentVal: payload[1],
      }

    default:
      return state
  }
}

const initialState = {
  view: "assessing",
  activeQ: 1,
  questions: data.map(question => ({
    text: question.question,
    options: question.type.map((type, tIndex) => [
      question.options[tIndex],
      type,
      false,
    ]),
    answered: false,
  })),
  currentVal: null,
  responses: [],
  finalData: {},
}

const MBTI = ({ open, setOpen, className }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ, questions, responses, finalData } = state
  const question = questions[activeQ - 1]

  let possibles = []

  if (view === "submitting") {
    // get all the possible options for scoring
    let allPossibles = []
    questions.forEach(question => {
      const options = question.options.map(option => option[1])

      if (!allPossibles.toString().includes(options.toString()))
        allPossibles.push(options)
    })

    const reducedPossibles = new Set(allPossibles)
    possibles = [...reducedPossibles]

    // create counting object to tally scores
    const counter = Object.fromEntries(
      possibles
        .toString()
        .split(",")
        .map(possible => [possible, 0])
    )

    // tally responses to each letter
    responses.forEach(response => {
      counter[response] = counter[response] + 1
    })

    dispatch({ type: "present", payload: counter })
  }

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

  const ModalContent = () => {
    switch (view) {
      case "resetting":
        return (
          <>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <p className="lead mb-1">
                Are you sure you want to reset the assessment?
              </p>
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
      case "submitting":
        return (
          <>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <p className="lead mb-1">
                Submitting and scoring your responses...
              </p>
            </ModalBody>
          </>
        )
      case "presenting":
        return (
          <>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <p className="lead mb-1">Here are your results!</p>
              <MBTIResults data={finalData} />
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
                  }, 1000)
                }}
              >
                Exit
              </Button>
            </ModalFooter>
          </>
        )
      case "error":
        return (
          <>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <p className="lead mb-1">So sorry, there's been an error</p>
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-end">
              <Button
                type="button"
                onClick={() => dispatch({ type: "submit" })}
              >
                Try again
              </Button>
            </ModalFooter>
          </>
        )
      case "assessing":
      default:
        return (
          <>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <p className="lead mb-3">{question.text}</p>
              {question.options.map((option, index) => (
                <ResponseButton
                  key={option[0]}
                  dispatch={dispatch}
                  data={[...option, index]}
                />
              ))}
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
                disabled={questions[activeQ - 1].answered === false}
              >
                Reset
              </Button>
              {/* <Button
                // color="primary"
                className="text-white"
                type="button"
                onClick={() => setOpen(false)}
              >
                Exit
              </Button> */}
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
            </ModalFooter>
          </>
        )
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      contentClassName=""
      className={className}
    >
      <button
        aria-label="Close"
        className="close p-3 position-absolute"
        type="button"
        style={{ top: 0, right: 0, zIndex: 25 }}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden={true}>×</span>
      </button>
      <ModalContent />
    </Modal>
  )
}

export default MBTI
