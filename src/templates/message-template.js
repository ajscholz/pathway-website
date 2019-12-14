import React from "react"

import { graphql, Link } from "gatsby"

import { Button, Container, Row, Col } from "reactstrap"
import YouTubePlayer from "react-player/lib/players/YouTube"

const MessageTemplate = props => {
  const { data } = props
  const { message, series } = data

  return (
    <>
      <div style={{ height: "131.22px" }} className="bg-dark" />
      <div className="section secion-blog cd-section">
        <Container>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col md="10">
              <h2 className="title">{message.title}</h2>
              <Button
                color="primary"
                tag={Link}
                to={`/messages/series${series.fields.slug}`}
                className="btn-link h6 p-0 ml-n1"
              >
                <i className="fa fa-caret-left" />
                {`${series.title} Message Series`}
              </Button>
              <p className="author">
                {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
                {`${message.communicator}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`${message.date}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`Part ${message.part} of ${series.length}`}
                {/* </a> */}
              </p>
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
    }
  }
`

export default MessageTemplate
