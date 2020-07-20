import React from "react"
import PropTypes from "prop-types"

import { graphql, Link } from "gatsby"
import Header from "components/header"

import { Button, Container, Row, Col } from "reactstrap"
import YouTubePlayer from "react-player/lib/players/YouTube"
import BreadcrumbSection from "../components/BreadcrumbSection"

const MessageTemplate = props => {
  const { data } = props
  const { message, series } = data

  return (
    <>
      <Header background={series.graphic} xs={true} />
      <div className="section">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={10} className="px-0">
              <BreadcrumbSection
                crumbs={[
                  { name: "Messages", link: "/messages" },
                  {
                    name: `${series.title} Series`,
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
              <h2 className="title">{message.title}</h2>
              <h6 className="p-0 text-primary">
                {`${message.communicator}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`${message.date}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`Part ${message.part} of ${series.length}`}
              </h6>

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
    </>
  )
}

MessageTemplate.propTypes = {
  data: {
    message: {
      date: PropTypes.string,
    },
  },
}

MessageTemplate.defaultProps = {
  data: {
    message: {
      date: "1776-07-04",
    },
  },
}

export const data = graphql`
  query($slug: String, $seriesId: String) {
    message: contentfulMessage(fields: { slug: { eq: $slug } }) {
      title: messageTitle
      date: messageDate(formatString: "MMMM DD, YYYY")
      communicator: communicatorName
      video: videoLink
      part: week
    }
    series: contentfulMessageSeries(contentful_id: { eq: $seriesId }) {
      title: seriesTitle
      length
      fields {
        slug
      }
      graphic: seriesGraphic {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default MessageTemplate
