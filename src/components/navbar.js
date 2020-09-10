import React, { useEffect, useState } from "react"
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
import BodyClick from "./BodyClick"
import { mainNav } from "../utils/links"

const Navigation = () => {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent")
  const [bodyClick, setBodyClick] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(false)

  useEffect(() => {
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

  const openNav = () => {
    document.documentElement.classList.toggle("nav-open")
    // const body = document.getElementsByName("body")
    setBodyClick(true)
    setCollapseOpen(true)
  }

  const closeNav = () => {
    document.documentElement.classList.toggle("nav-open")
    document.getElementById("bodyClick").classList.toggle("bodyClick-show")
    setTimeout(() => {
      setBodyClick(false)
      setCollapseOpen(false)
    }, 300)
  }

  return (
    <>
      {bodyClick ? <BodyClick closeNav={closeNav} /> : null}
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
                onClick={() => {
                  if (collapseOpen) {
                    closeNav()
                  }
                }}
              >
                <Image fluid={logo.fluid} alt="Pathway Community Church" />
              </NavbarBrand>
            </Col>
            <button
              className="navbar-toggler ml-auto"
              id="navigation"
              type="button"
              onClick={() => {
                if (collapseOpen) {
                  closeNav()
                } else {
                  openNav()
                }
              }}
              style={{ paddingRight: "15px" }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
            <Collapse navbar isOpen={collapseOpen} className="pt-4">
              <button
                color="black"
                className="text-muted pr-0 mb-0"
                style={{
                  zIndex: "3",
                  marginRight: "-5px",
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                }}
                onClick={() => closeNav()}
              >
                <i
                  className="nc-icon nc-simple-remove"
                  aria-label="close menu"
                />
              </button>
              <Nav navbar className="mx-0 ml-auto mt-4">
                {mainNav.map(link => (
                  <DrawerLink link={link} click={closeNav} key={link.link} />
                ))}

                <hr style={{ width: "100%" }} />

                <SecondaryLinks
                  click={() => closeNav()}
                  className="pr-0 secondary-nav"
                />
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

const DrawerLink = ({ link, click }) => (
  <NavItem className="pr-0 ">
    <NavLink className="py-2" to={link.link} tag={Link} onClick={() => click()}>
      {link.title}
    </NavLink>
  </NavItem>
)
