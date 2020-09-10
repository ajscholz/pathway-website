import React, { useState } from "react"
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
  const [info, setInfo] = useState({ name: "", email: "" })

  return (
    <>
      <ModalBody className="assessment text-center justify-content-center mt-0">
        <p className="h3 mb-4">Are you part of Pathway Community Church?</p>
        <div className="align-self-start w-100">
          <form>
            <div className="d-flex align-items-center justify-content-center">
              <FormGroup
                check
                className="form-check-radio d-flex justify-content-center mr-4"
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
            <div
              className={`mt-4 assessment-submit-form${
                part === false ? " hide" : " show"
              }`}
            >
              <FormGroup>
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
              <FormGroup>
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
          onClick={() => {
            submitForm({ ...info, type: type, results: results })
            dispatch({ type: "present" })
          }}
          disabled={info.name === "" || info.email === ""}
        >
          Get My Results
        </Button>
      </ModalFooter>
    </>
  )
}

export default SubmitResults
