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
  UncontrolledTooltip,
} from "reactstrap"

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
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("")
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
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

  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open")
            setBodyClick(false)
            setCollapseOpen(false)
          }}
        />
      ) : null}
      <Navbar
        color="black-color"
        className={classnames("fixed-top", navbarColor)}
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              id="navbar-brand"
              to="/"
              tag={Link}
              style={{ width: "180px" }}
            >
              <Image fluid={logo.fluid} alt="Pathway Community Church" />
            </NavbarBrand>
            {/* <UncontrolledTooltip placement="bottom" target="navbar-brand">
              Pathway Community Church
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open")
                setBodyClick(true)
                setCollapseOpen(true)
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/about" tag={Link}>
                  About
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/messages" tag={Link}>
                  Messages
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/events" tag={Link}>
                  Events
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/start" tag={Link}>
                  Start
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <Button
                  className="btn-round"
                  color="danger"
                  href="https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkpr-color-navbar"
                  target="_blank"
                >
                  <i className="nc-icon nc-cart-simple" /> Buy Now
                </Button>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
