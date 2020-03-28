import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import ButtonCard from "../components/cards/button-card"
import ReactPlayer from "react-player/lib/players/Vimeo"

import { Container, Col, Row } from "reactstrap"

const IndexPage = props => {
  let { data } = props
  const { banner, sections } = data.page
  const { heading, subHeading, image } = banner

  const [showVideo, setShowVideo] = useState(false)

  // sets up an interval to minimize re-rendering
  useEffect(() => {
    // set start time to 10:30am in minutes
    const minutesStart = 10 * 60 + 30
    const interval = setInterval(() => {
      let d = new Date()
      const minutesNow = d.getHours() * 60 + d.getMinutes()
      if (d.getDay() === 0 && minutesNow >= minutesStart) {
        setShowVideo(true)
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // get the stream from graphql that is today
  let index = -1
  if (showVideo === true) {
    const today = new Date().toDateString()
    index = data.streams.all.findIndex(stream =>
      new Date(
        new Date(stream.dateTime).setDate(new Date(stream.dateTime).getDate())
      ).toDateString() === today
        ? true
        : false
    )
  }
  const stream = index === -1 ? {} : data.streams.all[index]

  // set background of first section
  let whiteSection = sections[0]
  whiteSection.background = ""

  return (
    <>
      <SEO title="Home" />
      <Header
        title={heading}
        subtitle={`Worship online beginning at 10:30am every Sunday`}
        background={image}
        full={true}
        countdown={true}
        override={showVideo}
      >
        <div
          className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
          }}
        >
          <Container>
            <Row>
              <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                <h2 className="text-center mt-0">Worship online today</h2>
                <div
                  className="mt-5"
                  style={{
                    position: "relative",
                    paddingTop: "56.25%",
                    width: "100%",
                  }}
                >
                  <ReactPlayer
                    url={stream.videoUrl}
                    style={{
                      position: "absolute",
                      // border: "6px solid rgba(256,256,256,.5",
                      top: 0,
                      left: 0,
                    }}
                    width="100%"
                    height="100%"
                    controls={true}
                    // light={true}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Header>
      <section>
        <Container fluid style={{ padding: "0", margin: "0" }}>
          <div className="row no-gutters">
            <Col>
              <ButtonCard
                sectionData={sections[0]}
                className="mb-0"
                button="solid"
                buttonSize="lg"
              />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md="6">
              <ButtonCard sectionData={sections[1]} className="mb-0" />
            </Col>
            <Col md="6">
              <ButtonCard sectionData={sections[2]} className="mb-0" />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md={8} className="mx-auto">
              <ButtonCard
                sectionData={sections[3]}
                className="mb-0"
                button="solid"
              />
            </Col>
          </div>
        </Container>
      </section>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Index" }) {
      banner {
        heading
        subHeading
        image {
          fluid(maxWidth: 2000, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      sections {
        ... on ContentfulInformationSection {
          title
          subtitle
          description {
            childMdx {
              body
            }
          }
          button: callToAction {
            text
            link
          }
          background {
            fluid(maxWidth: 1000, quality: 60) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    streams: allContentfulStreamingVideo(
      sort: { fields: dateTime, order: ASC }
    ) {
      all: nodes {
        videoUrl
        dateTime
      }
    }
  }
`

export default IndexPage
