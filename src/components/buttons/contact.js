import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Button, Modal, FormGroup, Input, Label } from "reactstrap"

const ContactButton = props => {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)
  const [accepted, setAccepted] = useState(null)

  const resetForm = () => {
    setName("")
    setEmail("")
    setMessage("")
    setAccepted(null)
    setSubmitting(false)
  }

  const submitForm = async values => {
    try {
      const response = await fetch("/.netlify/functions/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          // siteEmail: siteEmail,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        setAccepted(true)
      } else {
        setAccepted(false)
        throw data.msg
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button {...props} type="button" onClick={() => setShowModal(true)}>
        Contact Us
      </Button>

      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          {accepted === null && (
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", top: "10px", right: "15px" }}
            >
              <span aria-hidden={true}>×</span>
            </button>
          )}
          {/* <h6 className="text-muted">Welcome</h6> */}
          <h3 className="modal-title text-center mb-2">{`Contact Us`}</h3>
          <p>{`We'd love to hear from you. Take a moment to let us know how we can help and a team member will get back to you as soon as possible!`}</p>
        </div>
        <div className="modal-body">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              defaultValue=""
              type="name"
              id="name"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              defaultValue=""
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              id="message"
              rows="3"
              style={{ padding: "7px 12px" }}
              value={message}
              onChange={e => setMessage(e.currentTarget.value)}
            ></Input>
          </FormGroup>
          <Button
            block
            className="btn mt-4"
            color="primary"
            type="submit"
            onClick={e => {
              e.preventDefault()
              setSubmitting(true)
              const values = { name: name, email: email, message: message }
              submitForm(values)
            }}
            disabled={name === "" || email === "" || message === ""}
          >
            {isSubmitting ? (
              <>
                <i className="nc-icon nc-settings-gear-65 spin" />
                &nbsp;&nbsp;Sending
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
        <div className="modal-footer no-border-footer p-0" />
        {accepted === null ? null : accepted === true ? (
          <div className="modal-overlay-message">
            <div style={{ margin: "auto 0" }}>
              <i
                className="nc-icon nc-check-2 text-success"
                style={{ fontSize: "4em" }}
              />
              <h3 className="modal-title text-center mb-2">Thank You!</h3>
              <p>Your message was submitted successfully.</p>
            </div>
            <Button
              color="danger"
              size="lg"
              style={{ color: "white", position: "relative", bottom: 0 }}
              block
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              <i className="nc-icon nc-simple-remove" />
              &nbsp;&nbsp;Close
            </Button>
          </div>
        ) : (
          <div className="modal-overlay-message">
            <div style={{ margin: "auto 0" }}>
              <i
                className="nc-icon nc-alert-circle-i text-warning"
                style={{ fontSize: "4em" }}
              />
              <h3 className="modal-title text-center mb-2">Uh Oh!</h3>
              <p>
                There was a problem submitting your message.
                <br />
                Please try again.
              </p>
            </div>
            <Button
              size="lg"
              style={{ color: "white", position: "relative", bottom: 0 }}
              block
              onClick={() => {
                setAccepted(null)
              }}
            >
              <i className="nc-icon nc-minimal-left" />
              &nbsp;&nbsp;Go Back
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ContactButton
