import React from "react"
import { Link } from "gatsby"
import { NavItem, NavLink } from "reactstrap"

const SecondaryLinks = ({ click, className }) => {
  return (
    <>
      <NavItem className={className}>
        <NavLink
          className="nav-link"
          to="/about/events"
          tag={Link}
          // onClick={() => click()}
        >
          Events
        </NavLink>
      </NavItem>

      <NavItem className={className}>
        <NavLink className="nav-link" href="/resources" onClick={() => click()}>
          Resources
        </NavLink>
      </NavItem>

      <NavItem className={className}>
        <NavLink
          className="nav-link"
          href="https://pathway-community-church.myshopify.com/collections/all"
          target="_blank"
          rel="noopener noreferrer"
          // onClick={() => click()}
        >
          Buy Merch
        </NavLink>
      </NavItem>

      <NavItem className={className}>
        <NavLink
          className="nav-link"
          href="https://pathwaymarietta.churchcenter.com/giving?open-in-church-center-modal=true"
          onClick={() => click()}
        >
          Give Now
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
    </>
  )
}

export default SecondaryLinks
