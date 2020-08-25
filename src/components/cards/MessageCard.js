import React from "react"
import { graphql } from "gatsby"

import { Link } from "gatsby"
import CardBigRadius from "./CardBigRadius"

const MessageCard = ({ messageData }) => {
  const {
    title,
    date,
    videoLink,
    slug,
    messageSeries: { seriesSlug },
  } = messageData
  return (
    <Link to={`/messages/series/${seriesSlug}/${slug}`}>
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
    title
    date: messageDate(formatString: "MMM DD YYYY")
    videoLink
    slug
    messageSeries {
      seriesSlug: slug
    }
  }
`
