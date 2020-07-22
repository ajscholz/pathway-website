import React from "react"
import { graphql } from "gatsby"

import { Link } from "gatsby"
import CardBigRadius from "./CardBigRadius"

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
      <CardBigRadius
        title={title}
        imgData={videoLink}
        footerData={date}
      ></CardBigRadius>
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
