import React from "react"
import Image from "gatsby-image"

import { Card, CardBody, CardTitle, CardFooter, CardText } from "reactstrap"

import { useSetLinkType } from "../../utils/scripts/custom-hooks"

const EventCard = props => {
  const { event } = props

  let Link
  // const Link = useSetLinkType(event.callToActionButton, {
  //   className: "btn-link stats p-0 m-0 h6 border-0 text-primary",
  //   color: "primary",
  // })
  console.log(event)
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
