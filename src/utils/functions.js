import React from "react"
import { Link } from "gatsby"
import { Button } from "reactstrap"

export const randomizeArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const setLinkType = (link, props) => {
  if (link === null) {
    return null
  }

  const url = new URL(link.link)

  if (url.host === "pathwaymarietta.com") {
    return (
      <Button tag={Link} to={url.pathname} {...props}>
        {link.text}
      </Button>
    )
  } else {
    return (
      <Button
        tag="a"
        href={`${url.href}${
          url.host === "pathwaymarietta.churchcenter.com"
            ? "?open-in-church-center-modal=true"
            : ""
        }`}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {/* <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" /> */}
        {link.text}
      </Button>
    )
  }
}
