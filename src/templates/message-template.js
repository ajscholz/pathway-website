import React from "react"

import { graphql } from "gatsby"
import Header from "../components/header"

import { Container, Row, Col } from "reactstrap"
import YouTubePlayer from "react-player/lib/players/YouTube"
import BreadcrumbSection from "../components/BreadcrumbSection"
import MessageCard from "../components/cards/MessageCard"
import Metadata from "../components/Metadata"
import SEO from "../components/seo"

const MessageTemplate = ({ data: { message, series, otherMessages } }) => {
  return (
    <>
      <SEO
        title={message.title}
        description={`${message.title} is part ${message.part} of the series ${series.title}. It was given on ${message.date} by ${message.communicator} at Pathway Community Church in Marietta, Ohio.`}
        image={series.graphic.file.url}
        url={`https://pathwaymarietta.com/messages/series${series.fields.slug}${message.fields.slug}`}
      />
      {/* <Header background={series.graphic} xs={true} /> */}
      <Header xxs={true} background="solid" />

      <div className="section section-gray">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={10} className="px-0">
              <BreadcrumbSection
                crumbs={[
                  { name: "Messages", link: "/messages" },
                  { name: "Series", link: "/messages/series" },
                  {
                    name: `${series.title}`,
                    link: `/messages/series${series.fields.slug}`,
                  },
                  { name: message.title, link: "", active: true },
                ]}
              />
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col md="10">
              <h1 className="title text-capitalize h2">{message.title}</h1>
              <Metadata>
                {`${message.communicator}`}
                {`${message.date}`}
                {`Part ${message.part} of ${series.length}`}
              </Metadata>

              {/* <p className="author">{desc.desc}</p> */}

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
      </div>

      {/* other messages */}
      {otherMessages.all.length > 0 && (
        <div className="section px-5">
          <Container fluid className="px-5">
            <Row className="justify-content-md-center">
              <Col>
                <h2 className="title">More From This Series</h2>
              </Col>
            </Row>
            <Row className="justify-content-center mb-n4">
              {otherMessages.all.map(message => {
                return (
                  <Col md="6" lg="4" xl="3" key={message.id} className="mb-4">
                    <MessageCard messageData={message} />
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}

export const data = graphql`
  query($slug: String, $seriesId: String) {
    message: contentfulMessage(fields: { slug: { eq: $slug } }) {
      title: messageTitle
      date: messageDate(formatString: "MMMM DD, YYYY")
      communicator: communicatorName
      video: videoLink
      part: week
      fields {
        slug
      }
    }

    series: contentfulMessageSeries(contentful_id: { eq: $seriesId }) {
      title: seriesTitle
      length
      fields {
        slug
      }
      graphic: seriesGraphic {
        file {
          url
        }
      }
    }
    otherMessages: allContentfulMessage(
      filter: {
        messageSeries: { contentful_id: { eq: $seriesId } }
        fields: { slug: { ne: $slug } }
      }
      sort: { fields: messageDate, order: ASC }
    ) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

export default MessageTemplate
