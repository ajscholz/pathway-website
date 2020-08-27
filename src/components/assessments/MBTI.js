import React, { useReducer } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { mbtiData } from "../../utils/data/assessments"
import MBTIResults from "./MBTIResults"

const data = mbtiData()

const ResponseButton = ({ dispatch, data }) => {
  return (
    <Button
      className="mt-2 text-white"
      // color="info"
      onClick={() => dispatch({ type: { text: data[0], value: data[1] } })}
    >
      {data[0]}
    </Button>
  )
}

const reducer = (state, action) => {
  const { activeQ, questions, responses } = state
  const { text, value } = action.type
  switch (text) {
    case "confirm reset":
      return { ...state, view: "resetting" }
    case "cancel":
      return { ...state, view: "assessing" }
    case "reset":
      return initialState
    case "submit":
      return { ...state, view: "submitting" }
    case "present":
      return { ...state, view: "presenting", finalData: value }
    case "reject":
      return { ...state, view: "error" }
    default:
      return {
        ...state,
        view: activeQ === questions.length ? "submitting" : "assessing",
        activeQ: activeQ === questions.length ? activeQ : activeQ + 1,
        responses: [...responses, value],
      }
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
    ]),
    answered: false,
    answeredIndex: 0,
  })),
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

    dispatch({ type: { text: "present", value: counter } })
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
                onClick={() => dispatch({ type: { text: "reset" } })}
              >
                Reset
              </Button>
              <Button
                type="button"
                className="text-white"
                onClick={() => dispatch({ type: { text: "cancel" } })}
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
                    dispatch({ type: { text: "reset" } })
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
                onClick={() => dispatch({ type: { text: "submit" } })}
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
                onClick={() => dispatch({ type: { text: "confirm reset" } })}
                disabled={activeQ === 1}
              >
                Reset
              </Button>
              <Button
                // color="primary"
                className="text-white"
                type="button"
                onClick={() => setOpen(false)}
              >
                Exit
              </Button>
            </ModalFooter>
          </>
        )
    }
  }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   alert(`results: ${Object.entries(state.type)}`)
  // }

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      contentClassName=""
      className={className}
    >
      {/* <button
        aria-label="Close"
        className="close p-3 position-absolute"
        type="button"
        style={{ top: 0, right: 0, zIndex: 25 }}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden={true}>×</span>
      </button> */}
      <ModalContent />
    </Modal>
  )
}

export default MBTI
