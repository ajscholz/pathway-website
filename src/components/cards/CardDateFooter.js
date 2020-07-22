import React from "react"
import PropTypes from "prop-types"
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

CardDateFooter.propTypes = {
  date: PropTypes.string.isRequired,
  desc: PropTypes.bool.isRequired,
}

export default CardDateFooter
