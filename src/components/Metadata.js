import React from "react"

const Metadata = ({ children }) => (
  <h6 className="p-0 text-primary">
    {children.map((child, i) => {
      return `${child} ${
        i + 1 < children.length
          ? `\u{00A0}\u{00A0}\u{2022}\u{00A0}\u{00A0}`
          : ``
      }`
    })}
  </h6>
)

export default Metadata
