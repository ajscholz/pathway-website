import React, { useState } from "react"
import { Modal } from "reactstrap"
import ReactPlayer from "react-player"

const VideoModal = ({ children, video }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        style={{
          padding: 0,
          outline: 0,
          width: "100%",
          border: 0,
          margin: 0,
          background: "transparent",
        }}
        onClickCapture={e => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        {children}
      </button>
      <Modal
        isOpen={open}
        size="lg"
        className="h-100 pt-0 my-0 border-radius-0"
        contentClassName="bg-dark border-radius-0"
        centered={true}
        toggle={() => setOpen(false)}
      >
        <div
          style={{
            position: "relative",
            // width: "100%",
            paddingBottom: "56.25%",
          }}
        >
          <ReactPlayer
            url={video.url}
            width="100%"
            height="100%"
            // light={true}
            style={{ position: "absolute", top: 0, left: 0 }}
            playing={true}
            controls={true}
          />
        </div>
      </Modal>
    </>
  )
}

export default VideoModal
