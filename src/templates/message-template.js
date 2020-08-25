import React from "react"

import { graphql } from "gatsby"
import Header from "../components/header"

import { Container, Row, Col } from "reactstrap"
import YouTubePlayer from "react-player/lib/players/YouTube"
import BreadcrumbSection from "../components/BreadcrumbSection"
import MessageCard from "../components/cards/MessageCard"
import Metadata from "../components/Metadata"
import SEO from "../components/seo"

const MessageTemplate = ({ data, ...props }) => {
  const { message } = data
  const { series } = message
  const messages = series.message.filter(message => {
    return message.slug !== props.pageContext.slug
  })

  return (
    <>
      <SEO
        title={message.title}
        description={`${message.title} is part ${message.part} of the series ${message.series.title}. It was given on ${message.date} by ${message.communicator} at Pathway Community Church in Marietta, Ohio.`}
        image={message.series.graphic.file.url}
        url={`https://pathwaymarietta.com/messages/series/${message.series.slug}${message.slug}`}
      />
      <Header xxs={true} background={message.series.graphic} />

      <div className="section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Messages", link: "/messages" },
            { name: "Series", link: "/messages/series" },
            {
              name: `${message.series.title}`,
              link: `/messages/series/${message.series.slug}`,
            },
            { name: message.title, link: "", active: true },
          ]}
        />
      </div>
      <section className="section section-gray">
        <Container>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col md="10">
              <h1 className="title text-capitalize h2 mt-0">{message.title}</h1>
              <Metadata>
                {`${message.communicator}`}
                {`${message.date}`}
                {`Part ${message.part} of ${series.length}`}
              </Metadata>

              <div
                className="mt-5"
                style={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                }}
              >
                <YouTubePlayer
                  url={message.video}
                  config={{
                    youtube: {
                      playerVars: {
                        modestBranding: 1,
                        controls: 1,
                      },
                    },
                  }}
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* other messages */}
      {/* {messages.length > 0 && (
        <section className="section section-dark px-5">
          <Container fluid className="px-5">
            <Row className="justify-content-md-center">
              <Col>
                <h1 className="title h2">More From This Series</h1>
              </Col>
            </Row>
            <Row className="mb-n4">
              {messages.map(message => {
                return (
                  <Col md="6" lg="4" xl="3" key={message.id} className="mb-4">
                    <MessageCard messageData={message} />
                  </Col>
                )
              })}
            </Row>
          </Container>
        </section>
      )} */}
    </>
  )
}

export const data = graphql`
  query($slug: String!) {
    message: contentfulMessage(slug: { eq: $slug }) {
      title
      date: messageDate(formatString: "MMMM DD, YYYY")
      communicator: communicatorName
      video: videoLink
      part: week
      slug
      series: messageSeries {
        title: seriesTitle
        length
        slug
        graphic: seriesGraphic {
          fluid(maxWidth: 2000, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
          }
          file {
            url
          }
        }
        message {
          ...MessageCardFragment
        }
      }
    }
  }
`

export default MessageTemplate
