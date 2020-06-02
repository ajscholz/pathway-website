/*eslint-disable*/
import React from "react"

import { Link, graphql, useStaticQuery } from "gatsby"

// reactstrap components
import { Container, Row, Col, Button, Nav } from "reactstrap"
import SocialButtons from "./buttons/social"
import ContactButton from "./buttons/contact"
import SecondaryLinks from "./secondary-links"

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
            {/* left col */}
            <Col md="4" className="text-center text-md-left">
              <Link
                to="/"
                className="btn-link text-white px-0 pt-0 mt-3 border-0 text-capitalize font-weight-light"
              >
                <strong>{info.name}</strong>
              </Link>
              <p>
                <small>
                  {info.street}
                  <br />
                  {info.city} {info.state} {info.zip}
                </small>
              </p>
            </Col>

            {/* middle column */}
            <Col
              md="4"
              className="d-flex flex-column align-items-center my-4 my-md-0"
            >
              <Nav navbar className="align-items-center">
                <SecondaryLinks className="text-white" click={() => {}} />
              </Nav>
            </Col>

            {/* right col */}
            <Col
              md="4"
              className="d-flex flex-column align-items-center align-items-md-end"
            >
              <ContactButton
                color="primary"
                className="btn-outline-primary mt-2"
                size="sm"
              />
              <SocialButtons className="mt-2" />
            </Col>
          </Row>
          <Row>
            <div className="credits m-auto text-small">
              <p className="copyright">
                <small>
                  © {new Date().getFullYear()}
                  , made with <i className="fa fa-heart heart" /> by{" "}
                  <a
                    href="https://ajsolutions.netlify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AJSolutions
                  </a>
                </small>
              </p>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
