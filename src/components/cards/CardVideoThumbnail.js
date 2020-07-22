import React from "react"
import ReactPlayer from "react-player"
import PropTypes from "prop-types"

const PlayIcon = () => null

const CardVideoThumbnail = ({ url }) => {
  return (
    <ReactPlayer
      url={url}
      light={true}
      controls={false}
      playIcon={PlayIcon}
      width="100%"
      height="100%"
      style={{ position: "absolute", top: "0", overflow: "hidden" }}
    />
  )
}

CardVideoThumbnail.propTypes = {
  url: PropTypes.string.isRequired,
}

export default CardVideoThumbnail
