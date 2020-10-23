import React, { useReducer } from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import { graphql } from "gatsby"
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
  Label,
} from "reactstrap"

const initialState = {
  contact: false,
  valid: false,
  accepted: false,
  submitting: false,
  data: { question: "", name: "", email: "", phone: "" },
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
    case "switchContact":
      return { ...state, contact: !state.contact }
    case "updateEmail":
      return { ...state, data: { ...data, email: action.payload } }
    case "updateName":
      return { ...state, data: { ...data, name: action.payload } }
    case "updatePhone":
      return { ...state, data: { ...data, phone: action.payload } }

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

  const [state, dispatch] = useReducer(reducer, initialState)

  // const [contact, setContact] = useState(false)
  // const [valid, isValid] = useState(false)
  // const [formData, setFormData] = useState(initialformData)
  // const [accepted, setAccepted] = useState(false)
  // console.log(formData)
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
                  <label htmlFor="questionArea">Question</label>
                  <Input
                    id="questionArea"
                    type="textarea"
                    rows="5"
                    onChange={e => {
                      if (state.valid && e.currentTarget.value === "") {
                        dispatch({ type: "invalid" })
                      } else {
                        if (!state.valid) dispatch({ type: "valid" })
                      }
                      dispatch({ payload: e.currentTarget.value })
                    }}
                    value={state.data.question}
                  />
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      defaultValue=""
                      type="checkbox"
                      onClick={() => dispatch({ type: "switchContact" })}
                      checked={state.contact}
                    />
                    I would like someone from Pathway to contact me regarding my
                    question
                    <span className="form-check-sign"></span>
                  </Label>
                </FormGroup>

                {state.contact && (
                  <>
                    <h6
                      style={{ textAlign: "center" }}
                      className="mt-4 text-info"
                    >
                      <span style={{ fontStyle: "italic" }}>
                        ** These questions are only necessary if you would like
                        someone from Pathway to contact you. **
                      </span>
                    </h6>
                    <Row form>
                      <Col md={6}>
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
                      <Col md={6}>
                        <FormGroup>
                          <label htmlFor="askPhone">Phone</label>
                          <Input
                            id="askPhone"
                            type="phone"
                            onChange={e => {
                              dispatch({
                                type: "updatePhone",
                                payload: e.currentTarget.value,
                              })
                            }}
                            value={state.data.phone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <label htmlFor="askEmail">Email</label>
                      <Input
                        id="askEmail"
                        type="email"
                        onChange={e =>
                          dispatch({
                            type: "updateEmail",
                            payload: e.currentTarget.value,
                          })
                        }
                        value={state.data.email}
                      />
                    </FormGroup>
                  </>
                )}

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
    page: contentfulPages(title: { eq: "Ask" }) {
      ...HeaderFragment
    }
  }
`
