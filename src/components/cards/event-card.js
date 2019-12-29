import React from "react"
import Image from "gatsby-image"

import { Card, CardBody, CardTitle, CardFooter, CardText } from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

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
          <button className=" btn btn-link stats p-0 m-0 h6 text-primary border-0">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
            Register
          </button>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default EventCard
