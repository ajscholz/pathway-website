import React from "react"
import propTypes from "prop-types"
import { CardText } from "reactstrap"

const CardDescription = ({ desc }) => {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
      }}
    >
      <CardText
        className="mt-2 pb-0 text-left"
        // style={{ maxHeight: "100%", overflow: "hidden" }}
      >
        {desc}
      </CardText>
    </div>
  )
}

CardDescription.propTypes = {
  desc: propTypes.string.isRequired,
}

export default CardDescription
