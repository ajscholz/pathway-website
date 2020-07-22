import React from "react"
import { graphql } from "gatsby"

import { CardBody, CardTitle, CardText } from "reactstrap"
import CardBigRadius from "./CardBigRadius"
import CardTopImage from "./CardTopImage"
import CardDateFooter from "./CardDateFooter"

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
