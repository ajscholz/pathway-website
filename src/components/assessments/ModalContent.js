import React from "react"
import { ModalBody, Button } from "reactstrap"
import AssessmentFooter from "./AssessmentFooter"
import ResponseButton from "./Buttons/ResponseButton"
import NextButton from "./Buttons/NextButton"
import ConfirmResetButton from "./Buttons/ConfirmResetButton"
import ExitButton from "./Buttons/ExitButton"
import CancelButton from "./Buttons/CancelButton"
import ResetButton from "./Buttons/ResetButton"

const ModalContent = ({ state, dispatch, setOpen, question, children }) => {
  const { activeQ, questions, view } = state

  switch (view) {
    case "resetting":
      return (
        <>
          <ModalBody className="d-flex flex-column align-items-center p-5">
            <p className="lead mb-1">
              Are you sure you want to reset the assessment?
            </p>
          </ModalBody>
          <AssessmentFooter>
            <div className="ml-auto d-flex justify-content-between">
              <CancelButton dispatch={dispatch} />
              <ResetButton dispatch={dispatch} />
            </div>
          </AssessmentFooter>
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
            {children}
          </ModalBody>
          <AssessmentFooter>
            <ExitButton setOpen={setOpen} dispatch={dispatch} />
          </AssessmentFooter>
        </>
      )
    case "error":
      return (
        <>
          <ModalBody className="d-flex flex-column align-items-center p-5">
            <p className="lead mb-1">So sorry, there's been an error</p>
          </ModalBody>
          <AssessmentFooter>
            <Button type="button" onClick={() => dispatch({ type: "submit" })}>
              Try again
            </Button>
          </AssessmentFooter>
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
          <AssessmentFooter>
            <p className="mr-auto ml-3">
              {activeQ} of {questions.length}
            </p>
            <ConfirmResetButton state={state} dispatch={dispatch} />
            <NextButton state={state} dispatch={dispatch} question={question} />
          </AssessmentFooter>
        </>
      )
  }
}

export default ModalContent
