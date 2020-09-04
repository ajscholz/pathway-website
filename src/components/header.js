import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
// import Countdown from "./countdown"
import SundayVideo from "./sunday-video"

const Header = ({ title, subtitle, background, full, xs, xxs, ...props }) => {
  const { stream } = useStaticQuery(graphql`
    # {
    #   streams: allContentfulStreamingVideo(
    #     sort: { fields: dateTime, order: ASC }
    #   ) {
    #     all: nodes {
    #       videoUrl
    #       dateTime
    #     }
    #   }
    # }
    {
      stream: contentfulStreamingVideo {
        videoUrl
        dateTime
      }
    }
  `)

  const [showVideo, setShowVideo] = useState(false)

  // sets up an interval to minimize re-rendering
  useEffect(() => {
    // set start time to 6am in minutes
    const minutesStart = 6 * 60
    const interval = setInterval(() => {
      let d = new Date()
      const minutesNow = d.getHours() * 60 + d.getMinutes()

      // check if it's Sunday and after 6a
      if (d.getDay() === 0 && minutesNow >= minutesStart) {
        // if yes, update state and clear the interval
        setShowVideo(true)
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // get the stream from graphql that is today, or give me an empty object if there isn't one
  // let index = -1
  // if (showVideo === true) {
  //   const today = new Date().toDateString()
  //   index = streams.all.findIndex(stream =>
  //     new Date(stream.dateTime).toDateString() === today ? true : false
  //   )
  // }
  // const stream = index === -1 ? {} : streams.all[index]

  console.log("stream", stream)

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
            {/* {countdown === true ? ( */}
            {/* <Countdown /> */}
            {/* ) : ( */}

            {showVideo === true ? (
              <SundayVideo stream={stream} />
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
