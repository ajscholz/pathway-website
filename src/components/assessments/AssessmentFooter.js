import React from "react"
import { ModalFooter } from "reactstrap"

const AssessmentFooter = ({ children }) => {
  return (
    <ModalFooter
      className={`p-4 d-flex ${
        typeof (children.length === undefined)
          ? "justify-content-end"
          : "justify-content-between"
      }`}
    >
      {children}
    </ModalFooter>
  )
}

export default AssessmentFooter
