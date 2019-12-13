import React from "react"
import PropTypes from "prop-types"

import Image from "gatsby-image"

const Header = props => {
  const { title, subtitle, background } = props

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: `${!background &&
            "url(" + require("assets/img/cover.jpg") + ")"}`,
        }}
      >
        {background && (
          <Image fluid={background.fluid} style={{ position: "unset" }} />
        )}
        <div className="filter" />
        <div className="content-center">
          <div className="motto">
            <h1 className="text-center">{title}</h1>
            <h3 className="text-center">{subtitle}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  background: PropTypes.object,
}

Header.defaultProps = {
  title: `Page Title Here`,
}

export default Header
