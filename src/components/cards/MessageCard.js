import React from "react"
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap"
import ReactPlayer from "react-player"
import { graphql } from "gatsby"

import { Link } from "gatsby"

const PlayIcon = () => <></>

const MessageCard = ({ messageData }) => {
  const {
    title,
    date,
    videoLink,
    fields: { slug },
    messageSeries: {
      fields: { seriesSlug },
    },
  } = messageData
  return (
    <Link to={`/messages/series${seriesSlug}${slug}`}>
      <Card>
        <CardImg
          top
          tag="div"
          style={{
            position: "relative",
            paddingTop: "56.25%",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url={videoLink}
            light={true}
            controls={false}
            playIcon={PlayIcon}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0" }}
          />
        </CardImg>
        <CardBody>
          <CardTitle tag="h5" className="text-left text-capitalize">
            {title}
          </CardTitle>
          <CardText className="mt-1 pb-0 text-left">
            <small className="text-muted">
              <i className="fa fa-calendar" style={{ marginRight: "6px" }} />
              {date}
            </small>
          </CardText>
        </CardBody>
      </Card>
    </Link>
  )
}

export default MessageCard

export const query = graphql`
  fragment MessageCardFragment on ContentfulMessage {
    id: contentful_id
    title: messageTitle
    date: messageDate(formatString: "MMM DD YYYY")
    videoLink
    fields {
      slug
    }
    messageSeries {
      fields {
        seriesSlug: slug
      }
    }
  }
`
