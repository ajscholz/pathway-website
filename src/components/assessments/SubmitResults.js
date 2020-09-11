import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap"

const submitForm = async values => {
  try {
    const response = await fetch("/.netlify/functions/submitAssessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()

    if (!response.ok) {
      throw data.msg
    }
  } catch (err) {
    console.log(err)
  }
}

const SubmitResults = ({ dispatch, type, results }) => {
  const [part, setPart] = useState(true)
  const [emailMe, setEmailMe] = useState(true)
  const [info, setInfo] = useState({ name: "", email: "" })

  const handleClick = () => {
    if (part === true)
      submitForm({ ...info, to: "pathway", type: type, results: results })
    if (emailMe === true)
      submitForm({ ...info, to: "person", type: type, results: results })
    dispatch({ type: "present" })
  }

  return (
    <>
      <ModalBody className="assessment text-center py-5 mt-0 justify-content-center flex-grow-1">
        <p className="h3 mb-4 mt-2">Getting your results...</p>
        <div className="align-self-start w-100">
          <form>
            <Label for="part-of-pathway" className="mr-3 w-100 text-left">
              Are you part of Pathway?
            </Label>
            <div className="d-flex align-items-center justify-content-start mb-2">
              <FormGroup
                check
                className="form-check-radio d-flex justify-content-center ml-4"
                inline
              >
                <Label check className="mx-0 mt-0">
                  <Input
                    defaultChecked={true}
                    defaultValue={true}
                    id="part-of-pathway-yes"
                    name="part-of-pathway"
                    type="radio"
                    onClick={() => setPart(true)}
                  />

                  <span className="form-check-sign d-flex flex-column text-muted">
                    Yes
                  </span>
                </Label>
              </FormGroup>
              <FormGroup
                check
                className="form-check-radio d-flex justify-content-center mr-0"
                inline
              >
                <Label check className="mx-0 mt-0">
                  <Input
                    defaultValue={false}
                    id="part-of-pathway-no"
                    name="part-of-pathway"
                    type="radio"
                    onClick={() => setPart(false)}
                  />

                  <span className="form-check-sign d-flex flex-column text-muted">
                    No
                  </span>
                </Label>
              </FormGroup>
            </div>
            <Label for="email-my-results" className="mr-3 w-100 text-left">
              Would you like your results emailed to you?
            </Label>
            <div className="d-flex align-items-center justify-content-start ">
              <FormGroup
                check
                className="form-check-radio d-flex justify-content-center ml-4"
                inline
              >
                <Label check className="mx-0 mt-0">
                  <Input
                    defaultChecked={true}
                    defaultValue={true}
                    id="email-my-results-yes"
                    name="email-my-results"
                    type="radio"
                    onClick={() => setEmailMe(true)}
                  />

                  <span className="form-check-sign d-flex flex-column text-muted">
                    Yes
                  </span>
                </Label>
              </FormGroup>
              <FormGroup
                check
                className="form-check-radio d-flex justify-content-center mr-0"
                inline
              >
                <Label check className="mx-0 mt-0">
                  <Input
                    defaultValue={false}
                    id="email-my-results-no"
                    name="email-my-results"
                    type="radio"
                    onClick={() => setEmailMe(false)}
                  />

                  <span className="form-check-sign d-flex flex-column text-muted">
                    No
                  </span>
                </Label>
              </FormGroup>
            </div>
            <div className="assessment-submit-form">
              <FormGroup className="mb-0 mt-3">
                <div className="d-flex align-items-baseline">
                  <Label for="name" className="mr-3">
                    Name:
                  </Label>
                  <Input
                    type="name"
                    id="name"
                    value={info.name}
                    onChange={e => {
                      setInfo({ ...info, name: e.target.value })
                    }}
                  />
                </div>
              </FormGroup>
              <FormGroup className="mb-0 mt-3">
                <div className="d-flex align-items-baseline">
                  <Label for="email" className="mr-3">
                    Email:
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    onChange={e => {
                      setInfo({ ...info, email: e.target.value })
                    }}
                    value={info.email}
                  />
                </div>
              </FormGroup>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter className="p-4 d-flex justify-content-end">
        <Button
          type="button"
          className="text-white w-100"
          color="primary"
          onClick={() => handleClick()}
          disabled={
            (part === true && (info.name === "" || info.email === "")) ||
            (emailMe === true && (info.name === "" || info.email === ""))
          }
        >
          Get My Results
        </Button>
      </ModalFooter>
    </>
  )
}

SubmitResults.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["Enneagram", "Spiritual Gifts", "Myers-Briggs"])
    .isRequired,
}

export default SubmitResults
