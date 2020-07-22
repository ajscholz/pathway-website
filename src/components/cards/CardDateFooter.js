import React from "react"
import { CardText } from "reactstrap"

const CardDateFooter = ({ date }) => {
  return (
    <CardText className={`mt-1 pb-0 text-left`}>
      <small className="text-muted">
        <i className="fa fa-calendar" style={{ marginRight: "6px" }} />
        {date}
      </small>
    </CardText>
  )
}

export default CardDateFooter
