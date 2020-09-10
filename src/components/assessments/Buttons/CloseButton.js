import React from "react"

const CloseButton = ({ setOpen }) => {
  return (
    <button
      aria-label="Close"
      className="close p-3 position-absolute"
      type="button"
      style={{ top: 0, right: 0, zIndex: 25 }}
      onClick={() => setOpen(false)}
    >
      <span aria-hidden={true}>×</span>
    </button>
  )
}

export default CloseButton
