import React from "react"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ to, children, ...props }) => {
  const url = new URL(to)
  console.log(to.concat("?open-in-church-center-modal=true"))

  return url.host === "pathwaymarietta.churchcenter.com" ? (
    <a
      href={to}
      // data-open-in-church-center-modal="true"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ) : url.host === "pathwaymarietta.com" ? (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

export default Link
