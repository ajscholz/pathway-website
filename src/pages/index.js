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

  const [day, setDay] = useState(new Date())

  useEffect(() => {
    let shouldUpdate = true
    if (shouldUpdate) {
      setTimeout(() => {
        setDay(new Date())
      }, 1000)
    }
    return () => (shouldUpdate = false)
  }, [day])

  let whiteSection = sections[0]
  whiteSection.background = ""

  // get the stream from graphql that is today
  const index = data.streams.all.findIndex(stream => {
    return new Date(stream.dateTime).getDay() === day.getDay() ? true : false
  })

  const stream = index === -1 ? {} : data.streams.all[index]

  return (
    <>
      <SEO title="Home" />
      <Header
        title={heading}
        subtitle={`Worship online beginning at 10:30am every Sunday`}
        background={image}
        full={true}
        countdown={true}
        override={
          day.getDay() === 0 &&
          day.getHours() >= 10 &&
          day.getMinutes() >= 25 &&
          index !== -1
        }
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
    streams: allContentfulStreamingVideo {
      all: nodes {
        videoUrl
        dateTime
      }
    }
  }
`

export default IndexPage
