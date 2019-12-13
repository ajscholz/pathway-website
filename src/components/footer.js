/*eslint-disable*/
import React from "react"

import { Link } from "gatsby"

// reactstrap components
import { Container, Row } from "reactstrap"
import SocialButtons from "src/components/buttons/social"
import ContactButton from "./buttons/contact"

// core components

const Footer = () => {
  return (
    <>
      <footer className="footer footer-black footer-white pt-4">
        <Container>
          <Row className="flex-column flex-md-row align-items-center justify-content-md-between">
            <nav className="footer-nav">
              <ul>
                <li className="mb-0">
                  <Link to="/">Pathway Community Church</Link>
                </li>
              </ul>
            </nav>
            <ContactButton color="primary" className="m-3" />
            <SocialButtons className="m-3 align-self-center " />
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
