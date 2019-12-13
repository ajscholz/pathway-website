import React from "react"
import PropTypes from "prop-types"

import Image from "gatsby-image"

const Header = props => {
  const { title, subtitle, background, full } = props

  return (
    <>
      <div className={full ? "page-header" : "page-header page-header-small"}>
        <Image
          fluid={background.fluid}
          className={full ? "page-header" : "page-header page-header-small"}
        />

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
  background: PropTypes.object.isRequired,
}

Header.defaultProps = {
  title: `Page Title Here`,
}

export default Header
