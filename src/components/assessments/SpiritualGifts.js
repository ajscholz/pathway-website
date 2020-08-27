import React, { useReducer } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { spiritualGiftsQuestions } from "../../utils/data/assessments"
import SGResults from "./SGResults"

const responseOptions = ["Almost Never", "Sometimes", "Almost Always"]

const gifts = [
  "Administration",
  "Apostleship",
  "Craftsmanship",
  "Discernment",
  "Evangelism",
  "Exhortation",
  "Faith",
  "Giving",
  "Healing",
  "Helps",
  "Hospitality",
  "Intercession",
  "Knowledge",
  "Leadership",
  "Mercy",
  "Miracles",
  "Missionary",
  "Music/Worship",
  "Pastor/Shepherd",
  "Prophecy",
  "Service",
  "Teaching",
  "Tongues",
  "Wisdom",
]

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
  questions: spiritualGiftsQuestions.map((question, qIndex) => ({
    text: question,
    options: responseOptions.map((option, oIndex) => [option, oIndex + 1]),
    answered: false,
    answeredIndex: 0,
  })),
  responses: [],
  finalData: {},
}

const SpiritualGifts = ({ open, setOpen, className }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ, questions, responses, finalData } = state
  const question = questions[activeQ - 1]

  if (view === "submitting") {
    const counter = new Array(gifts.length).fill(0)

    counter.forEach((count, i) => {
      counter[i] =
        responses[i] +
        responses[i + gifts.length] +
        responses[i + gifts.length * 2]
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
            <ModalHeader>
              <h5 className="">Your Top Spiritual Gifts</h5>
            </ModalHeader>
            <ModalBody className="d-flex flex-column align-items-center p-5">
              <SGResults data={[finalData, gifts]} />
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

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      contentClassName=""
      className={className}
    >
      <ModalContent />
    </Modal>
  )
}

export default SpiritualGifts
