import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"
// import Countdown from "./countdown"
// import SundayVideo from "./sunday-video"

const Header = ({
  title,
  subtitle,
  background,
  full,
  xs,
  xxs,
  children,
  ...props
}) => {
  return (
    <>
      <div
        className={`bg-dark${
          full
            ? " page-header"
            : xs
            ? " page-header page-header-xs"
            : xxs
            ? " page-header page-header-xxs"
            : " page-header page-header-small"
        }`}
      >
        {background !== "solid" && (
          <>
            <Image
              {...props}
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
          </>
        )}

        {title && (
          <>
            <div className="content-center">
              <div className="motto">
                <h1 className="text-center display-2 sm-display-4">{title}</h1>
                <h3 className="text-center">{subtitle}</h3>
                {children}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  full: PropTypes.bool.isRequired,
  xs: PropTypes.bool.isRequired,
  xxs: PropTypes.bool.isRequired,
  // background: PropTypes.object.isRequired,
}

Header.defaultProps = {
  full: false,
  xs: false,
  xxs: false,
}

export default Header

export const query = graphql`
  fragment HeaderFragment on ContentfulPages {
    banner {
      heading
      subHeading
      image {
        fluid(maxWidth: 2000, quality: 80) {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
        }
      }
    }
  }
`
