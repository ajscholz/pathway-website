import React, { useReducer, useRef } from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import { graphql } from "gatsby"
import { Button, FormGroup, Form, Input, Row, Col, Container } from "reactstrap"

const initialState = {
  valid: false,
  accepted: false,
  submitting: false,
  data: { question: "", name: "", email: "" },
}

const reducer = (state, action) => {
  const { data } = state
  switch (action.type) {
    case "accepted":
      return initialState
    case "invalid":
      return { ...state, valid: false }
    case "valid":
      return { ...state, valid: true }
    case "updateEmail":
      return { ...state, data: { ...data, email: action.payload } }
    case "updateName":
      return { ...state, data: { ...data, name: action.payload } }

    default:
      return { ...state, data: { ...data, question: action.payload } }
  }
}

const AskPage = ({ data }) => {
  const {
    page: {
      banner: { heading, image },
    },
  } = data

  const emailRef = useRef(null)

  // console.log(emailRef.current.validity.valid)

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch("/.netlify/functions/submitAskQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.data),
      })
      const data = await response.json()

      if (response.ok) {
        dispatch({ type: "accepted" })
      } else {
        throw data.msg
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <SEO
        title="Ask"
        image={image.file.url}
        url="https://pathwaymarietta.com/ask"
      >
        <meta name="robots" content="noindex" />
      </SEO>
      <Header title={heading} background={image} xs />
      <section className="team-1">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <Form>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <label htmlFor="questionArea">Question</label>
                    <span>* required</span>
                  </div>

                  <Input
                    id="questionArea"
                    type="textarea"
                    rows="5"
                    onChange={e => {
                      if (state.valid && e.currentTarget.value === "") {
                        dispatch({ type: "invalid" })
                      } else {
                        if (!state.valid && emailRef !== null) {
                          console.log(emailRef.current.validity)
                          if (emailRef.current.validity.valid)
                            dispatch({
                              type: "valid",
                            })
                        }
                      }
                      dispatch({ payload: e.currentTarget.value })
                    }}
                    value={state.data.question}
                  />
                </FormGroup>

                <Row form>
                  <Col>
                    <FormGroup>
                      <label htmlFor="askName">Name</label>
                      <Input
                        id="askName"
                        // placeholder="Enter email"
                        type="text"
                        onChange={e => {
                          dispatch({
                            type: "updateName",
                            payload: e.currentTarget.value,
                          })
                        }}
                        value={state.data.name}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <label htmlFor="askEmail">Email</label>
                    <span>* required</span>
                  </div>

                  <Input
                    innerRef={emailRef}
                    id="askEmail"
                    type="email"
                    required
                    onChange={e => {
                      dispatch({
                        type: "updateEmail",
                        payload: e.currentTarget.value,
                      })
                      if (
                        emailRef.current.validity.valid &&
                        state.data.question !== ""
                      ) {
                        dispatch({ type: "valid" })
                      } else if (!emailRef.current.validity.valid) {
                        dispatch({ type: "invalid" })
                      }
                    }}
                    value={state.data.email}
                  />
                </FormGroup>

                <Button
                  color="primary"
                  type="submit"
                  onClick={e => handleSubmit(e)}
                  className="mt-2 w-100"
                  disabled={!state.valid}
                >
                  Submit Question
                  <i className="nc-icon nc-send ml-2" />
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default AskPage

export const data = graphql`
  {
    page: contentfulPage(slug: { eq: "ask" }) {
      ...HeaderFragment
    }
  }
`
