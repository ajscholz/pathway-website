import React from "react"
import PropTypes from "prop-types"

import { graphql, Link } from "gatsby"
import Header from "components/header"

import {
  Button,
  Container,
  Row,
  Col,
  // Breadcrumb,
  // BreadcrumbItem,
} from "reactstrap"
import YouTubePlayer from "react-player/lib/players/YouTube"

const MessageTemplate = props => {
  const { data } = props
  const { message, series } = data

  return (
    <>
      <Header background={series.graphic} xs={true} />
      <div className="section">
        <Container>
          {/* <Row>
            <Breadcrumb style={{ background: "none" }}>
              <BreadcrumbItem>
                <Link to="/messages">Message Series</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to={`/messages/series${series.fields.slug}`}>
                  {series.title}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{message.title}</BreadcrumbItem>
            </Breadcrumb>
          </Row> */}
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
