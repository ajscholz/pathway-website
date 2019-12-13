import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => {
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/cover.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <div className="motto">
            <h1 className="text-center">Paper Kit PRO React</h1>
            <h3 className="text-center">Components</h3>
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
