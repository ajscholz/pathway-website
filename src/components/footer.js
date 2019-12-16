/*eslint-disable*/
import React from "react"

import { Link, graphql, useStaticQuery } from "gatsby"

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap"
import SocialButtons from "src/components/buttons/social"
import ContactButton from "./buttons/contact"

// core components

const Footer = () => {
  const { info } = useStaticQuery(graphql`
    {
      info: contentfulChurchInformation {
        name
        street: streetAddress
        city
        state
        zip
      }
    }
  `)

  return (
    <>
      <footer className="footer footer-black footer-white pt-4">
        <Container>
          <Row className="align-items-start">
            <Col md="4" className="text-center text-md-left">
              <Button
                tag={Link}
                size="lg"
                to="/"
                className="btn-link text-white px-0 pt-0 mt-3 border-0 text-capitalize font-weight-light"
              >
                <strong>{info.name}</strong>
              </Button>
              <p>
                <small>
                  {info.street}
                  <br />
                  {info.city} {info.state} {info.zip}
                </small>
              </p>
            </Col>
            <Col md="4" className="d-flex justify-content-center my-4 my-md-0">
              <ContactButton
                color="primary"
                className="btn-outline-primary m-3"
              />
            </Col>
            <Col
              md="4"
              className="d-flex justify-content-center justify-content-md-end"
            >
              <SocialButtons className="m-3 align-self-center " />
            </Col>
          </Row>
          <Row>
            <div className="credits m-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                , made with <i className="fa fa-heart heart" /> by{" "}
                <a
                  href="https://ajsolutions.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AJSolutions
                </a>
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
