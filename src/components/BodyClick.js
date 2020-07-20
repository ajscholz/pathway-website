import React, { useEffect, useRef } from "react"

const BodyClick = ({ closeNav }) => {
  const bodyClickRef = useRef(null)
  useEffect(() => {
    const setOpacity = setTimeout(() => {
      bodyClickRef.current.classList.add("bodyClick-show")
    }, 10)
    return () => clearTimeout(setOpacity)
  })
  return (
    <button
      className="btn-plain"
      id="bodyClick"
      type="button"
      aria-label="Close"
      onClick={() => closeNav()}
      ref={bodyClickRef}
    />
  )
}

export default BodyClick
