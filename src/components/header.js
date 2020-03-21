import React from "react"
import PropTypes from "prop-types"

import Image from "gatsby-image"
import Countdown from "./countdown"

const Header = props => {
  const {
    title,
    subtitle,
    background,
    full,
    xs,
    countdown,
    override,
    children,
  } = props
  return (
    <>
      <div
        className={
          full
            ? "page-header"
            : xs
            ? "page-header page-header-xs"
            : "page-header page-header-small"
        }
      >
        <Image
          fluid={background.fluid}
          className={
            full
              ? "page-header"
              : xs
              ? "page-header page-header-xs"
              : "page-header page-header-small"
          }
        />

        <div className="filter" />
        {title && (
          <>
            {/* {countdown === true ? ( */}
            {/* <Countdown /> */}
            {/* ) : ( */}

            {override === true ? (
              <>{children}</>
            ) : (
              <div className="content-center">
                <div className="motto">
                  <h1 className="text-center">{title}</h1>
                  <h3 className="text-center">{subtitle}</h3>
                </div>
              </div>
            )}
            {/* )} */}
          </>
        )}
      </div>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // background: PropTypes.object.isRequired,
}

export default Header
