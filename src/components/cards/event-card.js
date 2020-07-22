import React from "react"
import { graphql } from "gatsby"

import { CardText } from "reactstrap"
import CardBigRadius from "./CardBigRadius"

const EventCard = ({
  event: {
    image,
    start,
    title,
    description: { description },
  },
}) => {
  return (
    <CardBigRadius
      className="no-transition"
      title={title}
      imgData={image}
      footerData={start}
    >
      <CardText>{description}</CardText>
    </CardBigRadius>
  )
}

export default EventCard

export const query = graphql`
  fragment EventCardFragment on ContentfulEvent {
    id: contentful_id
    title: eventName
    start(formatString: "dddd MMMM D, YYYY")
    displayStart: start(formatString: "dddd, MMM DD")
    end
    image {
      file {
        url
      }
      fluid {
        ...GatsbyContentfulFluid
      }
    }
    description {
      description
    }
    callToActionButton {
      link
      text
    }
  }
`
