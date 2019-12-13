/*eslint-disable*/
import React from "react"

import { Link } from "gatsby"

// reactstrap components
import { Container, Row } from "reactstrap"

// core components

const Footer = () => {
  return (
    <>
      <footer className="footer footer-black footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <Link to="/">Pathway Community Church</Link>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
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
