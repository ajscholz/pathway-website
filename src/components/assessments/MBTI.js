import React, { useReducer } from "react"
import { Modal } from "reactstrap"
import { mbtiData } from "../../utils/data/assessments"
import CloseButton from "./Buttons/CloseButton"
import ModalContent from "./ModalContent"
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

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      contentClassName=""
      className={className}
    >
      <CloseButton setOpen={setOpen} />
      <ModalContent
        dispatch={dispatch}
        state={state}
        setOpen={setOpen}
        question={question}
      >
        <MBTIResults data={finalData} />
      </ModalContent>
    </Modal>
  )
}

export default MBTI
