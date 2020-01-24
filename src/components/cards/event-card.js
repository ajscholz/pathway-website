import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"

import { Card, CardBody, CardTitle, CardFooter, CardText } from "reactstrap"

const EventCard = props => {
  const { event } = props

  return (
    <Card className="no-transition">
      <div className="card-image ">
        {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
        <Image imgClass="img" fluid={event.image.fluid} />
        {/* </a> */}
      </div>
      <CardBody>
        {/* <Badge color="warning" pill>
          Travel
        </Badge> */}
        <CardTitle tag="h4" className="mb-2">
          {event.title}
        </CardTitle>
        <CardText>{event.description.description}</CardText>
        <hr />
        <CardFooter>
          <div className="author">{event.displayStart}</div>
          {/* {event.callToActionButton && Link} */}
        </CardFooter>
      </CardBody>
    </Card>
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
