import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
// nodejs library that concatenates strings
import classnames from "classnames"
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js"
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Col,
} from "reactstrap"
import SecondaryLinks from "./secondary-links"

const Navigation = () => {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent")
  const [bodyClick, setBodyClick] = React.useState(false)
  const [collapseOpen, setCollapseOpen] = React.useState(false)

  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"))
    // initialise
    headroom.init()
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("")
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent")
      }
    }
    window.addEventListener("scroll", updateNavbarColor)
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor)
    }
  })
  const {
    info: { logo },
  } = useStaticQuery(graphql`
    {
      info: contentfulChurchInformation {
        logo {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  `)

  const closeNav = () => {
    document.documentElement.classList.toggle("nav-open")
    setBodyClick(false)
    setCollapseOpen(false)
  }

  return (
    <>
      {bodyClick ? (
        <button
          className="btn-plain"
          id="bodyClick"
          type="button"
          aria-label="Close"
          onClick={() => closeNav()}
        />
      ) : null}
      <Navbar
        color="black-color"
        expand={false}
        className={classnames(
          "fixed-top px-2 position-sticky border-0",
          navbarColor
        )}
        id="navbar-main"
      >
        <Container className="px-0">
          <div className="row w-100 d-flex ml-0">
            <Col xs="6" className="px-0" style={{ maxWidth: "170px" }}>
              <NavbarBrand
                id="navbar-brand"
                to="/"
                tag={Link}
                className="w-100"
              >
                <Image fluid={logo.fluid} alt="Pathway Community Church" />
              </NavbarBrand>
            </Col>
            <button
              className="navbar-toggler ml-auto"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open")
                setBodyClick(true)
                setCollapseOpen(true)
              }}
              style={{ paddingRight: "15px" }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
            <Collapse navbar isOpen={collapseOpen}>
              <button
                color="black"
                className="text-muted pr-0 mb-3"
                style={{
                  zIndex: "3",
                  marginRight: "-5px",
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => closeNav()}
              >
                <i
                  className="nc-icon nc-simple-remove"
                  aria-label="close menu"
                />
              </button>
              <Nav navbar className="mx-0 ml-auto">
                <NavItem className="pr-0 ">
                  <NavLink
                    className="nav-link"
                    to="/start"
                    tag={Link}
                    onClick={() => closeNav()}
                  >
                    Start
                  </NavLink>
                </NavItem>

                <NavItem className="pr-0">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    tag={Link}
                    onClick={() => closeNav()}
                  >
                    About
                  </NavLink>
                </NavItem>

                <NavItem className="pr-0">
                  <NavLink
                    className="nav-link"
                    to="/messages"
                    tag={Link}
                    onClick={() => closeNav()}
                  >
                    Messages
                  </NavLink>
                </NavItem>

                <hr style={{ width: "100%" }} />

                <SecondaryLinks click={() => closeNav()} className="pr-0" />
              </Nav>
              <div
                className="d-lg-none mt-auto"
                style={{
                  zIndex: "3",
                  position: "relative",
                  paddingBottom: "30px",
                  width: "100%",
                }}
              >
                {/* <Button color="primary" type="button" className="m-0 ml-auto">
                Download App
              </Button> */}
              </div>
            </Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
