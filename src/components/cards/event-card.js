import React from "react"

import { Card, CardBody, CardTitle, CardFooter, CardText } from "reactstrap"

const EventCard = props => {
  const { event } = props

  return (
    <Card className="no-transition">
      <div className="card-image ">
        {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
        <img alt="..." className="img" src={`https:${event.image.file.url}`} />
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
          <div className="author">{event.start}</div>
          {/* <div className="stats">
            <i className="fa fa-heart mr-1" />
            5.3k
          </div> */}
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default EventCard
