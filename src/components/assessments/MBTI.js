import React, { useReducer, useRef } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { mbtiQuestions } from "../../utils/data/assessments"
import CloseButton from "./Buttons/CloseButton"
import MBTIResults from "./MBTIResults"
import SubmitResults from "./SubmitResults"
import { randomizeArray } from "../../utils/functions"
import { Link } from "gatsby"

const questions = randomizeArray([...mbtiQuestions])

// FOR TESTING
// const pairs = [
//   { type: "E/I", scores: [48, 52], types: ["E", "I"], win: "I", winIndex: 1 },
//   { type: "S/N", scores: [27, 73], types: ["S", "N"], win: "N", winIndex: 1 },
//   { type: "T/F", scores: [32, 68], types: ["T", "F"], win: "F", winIndex: 1 },
//   { type: "J/P", scores: [8, 92], types: ["J", "P"], win: "P", winIndex: 1 },
// ]
// const initialState = {
//   view: "assessing",
//   activeQ: mbtiQuestions.length,
//   selected: null,
// }

// FOR DEPLOYING
const initialState = {
  view: "assessing",
  activeQ: 1,
  selected: null,
}

const pairs = [
  { type: "E/I", scores: [0, 0] },
  { type: "S/N", scores: [0, 0] },
  { type: "T/F", scores: [0, 0] },
  { type: "J/P", scores: [0, 0] },
]

const reducer = (state, action) => {
  const { type, payload } = action
  const { activeQ } = state
  switch (type) {
    case "confirm reset":
      return { ...state, view: "resetting" }
    case "cancel":
      return { ...state, view: "assessing" }
    case "reset":
      return initialState
    case "answer":
      return { ...state, selected: payload }
    case "submit":
      return { ...state, view: "submitting" }
    case "present":
      return { ...state, view: "presenting" }
    case "next":
      return {
        ...state,
        view: activeQ === questions.length ? "submitting" : "assessing",
        activeQ: activeQ === questions.length ? activeQ : activeQ + 1,
        selected: null,
      }

    default:
      return state
  }
}

const MBTI = ({ open, setOpen, className }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ, selected } = state

  // this is used to tally the question results & to minimize re-renders by not holding
  const tally = useRef([...pairs])

  // if we render and we're on the first question reset the tally counter
  if (activeQ === 1) {
    tally.current = [...pairs]
  }

  // get current question for easy access
  // const questions = [...mbtiQuestions]
  const question = questions[activeQ - 1]

  const tallyQuestion = () => {
    // determine which pair should be scored
    const whichTally = tally.current.findIndex(
      item => question.type === item.type
    )

    // get the current score of the item that needs to be tallied
    const curScore = tally.current[whichTally].scores[selected]
    // increase that score by 1
    tally.current[whichTally].scores[selected] = curScore + 1
  }

  const getFinalScores = () => {
    const results = [...tally.current]

    // map results to get percentages of pairs rather than counting numbers
    results.forEach(result => {
      const total = result.scores[0] + result.scores[1]
      result.scores = result.scores.map(score =>
        Math.round((score / total) * 100)
      )

      result.types = result.type.split("/")
      result.win = result.scores[0] > 50 ? result.types[0] : result.types[1]
      result.winIndex = result.scores[0] > 50 ? 0 : 1
    })

    tally.current = results
  }

  const handleNext = () => {
    tallyQuestion()
    if (activeQ === questions.length) {
      getFinalScores()
      dispatch({ type: "submit" })
    } else {
      dispatch({ type: "next" })
    }
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
      case "submitting":
        return (
          <SubmitResults
            dispatch={dispatch}
            type="Myers-Briggs"
            results={tally.current}
          />
        )
      case "presenting":
        const results = tally.current
        const dispResult = results
          .map(result => result.win)
          .toString()
          .replace(/,/g, "")

        // get core results based on dispResult string
        let core
        if (dispResult.charAt(1) === "N") {
          core = "N".concat(dispResult.charAt(2) === "T" ? "T" : "F")
        } else {
          core = "S".concat(dispResult.charAt(3) === "J" ? "J" : "P")
        }

        const corePage =
          core === "NF"
            ? "/resources/mbti/nf-idealists"
            : core === "NT"
            ? "/resources/mbti/nt-rationals"
            : core === "SJ"
            ? "/resources/mbti/sj-guardians"
            : "/resources/mbti/sp-artisans"

        return (
          <>
            <ModalBody className="assessment mt-0 py-5 justify-content-center">
              <MBTIResults results={tally.current} />
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
              <Button
                tag={Link}
                className="text-white"
                color="primary"
                to={corePage}
              >
                Learn About My Type
              </Button>
            </ModalFooter>
          </>
        )
      case "assessing":
      default:
        return (
          <>
            <ModalBody className="assessment mbti">
              <div style={{ height: "100px" }}>
                <p className="mb-4 h3 mt-0 text-center">{question.question}</p>
              </div>
              {question.options.map((option, index) => (
                <Button
                  key={option}
                  color={`${selected === index && "primary"}`}
                  className={`mt-2 text-white`}
                  onClick={() => dispatch({ type: "answer", payload: index })}
                >
                  {option}
                </Button>
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
                disabled={activeQ === 1}
              >
                Reset
              </Button>
              <Button
                color="primary"
                className="text-white"
                type="button"
                onClick={() => handleNext()}
                disabled={selected === null}
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
      <CloseButton setOpen={setOpen} />
      <ModalContent />
    </Modal>
  )
}

export default MBTI
