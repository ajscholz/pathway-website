import React, { useState } from "react"
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

const AskPage = ({ data }) => {
  const {
    page: {
      banner: { heading, image },
    },
  } = data

  const [contact, setContact] = useState(false)
  const [valid, isValid] = useState(false)
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
                      console.log(e.currentTarget.value)
                      if (valid && e.currentTarget.value === "") {
                        isValid(false)
                      } else {
                        if (!valid) isValid(true)
                      }
                    }}
                  />
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      defaultValue=""
                      type="checkbox"
                      onClick={() => setContact(!contact)}
                    />
                    I would like someone from Pathway to contact me regarding my
                    question
                    <span className="form-check-sign"></span>
                  </Label>
                </FormGroup>

                {contact && (
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
                    <FormGroup>
                      <label htmlFor="askName">Name</label>
                      <Input
                        id="askName"
                        // placeholder="Enter email"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="askEmail">Email</label>
                      <Input
                        // aria-describedby="emailHelp"
                        id="askEmail"
                        // placeholder="Enter email"
                        type="email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="askPhone">Phone</label>
                      <Input
                        id="askPhone"
                        // placeholder="Phone"
                        type="phone"
                      ></Input>
                    </FormGroup>
                  </>
                )}

                <Button
                  color="primary"
                  type="submit"
                  className="mt-2 w-100"
                  disabled={!valid}
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
