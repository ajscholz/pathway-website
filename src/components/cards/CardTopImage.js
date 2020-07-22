import React from "react"
import PropTypes from "prop-types"
import { CardImg } from "reactstrap"
import CardVideoThumbnail from "./CardVideoThumbnail"
import Image from "gatsby-image"

const CardTopImage = ({ imgData }) => {
  return (
    <CardImg
      top
      tag="div"
      style={{
        position: "relative",
        paddingTop: "56.25%",
        overflow: "hidden",
      }}
    >
      {typeof imgData === "string" ? (
        <CardVideoThumbnail url={imgData} />
      ) : (
        <Image
          fluid={imgData.fluid}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </CardImg>
  )
}

CardTopImage.propTypes = {
  imgData: PropTypes.oneOf([PropTypes.string, PropTypes.object]).isRequired,
}

export default CardTopImage
