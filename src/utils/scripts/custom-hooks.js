import React from "react"
import { Link } from "gatsby"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { Button } from "reactstrap"
import { isRef } from "joi"

export const useCenterColumns = arr => {
  const length = arr.length
  const colSizes = arr.map(() => ({ md: "6", lg: "4" }))

  // Center the last item on medium screens if array length is odd
  if (length % 2 === 1) {
    colSizes[length - 1] = {
      md: { size: 6, offset: 3 },
      lg: { size: 4, offset: 0 },
    }
  }

  // Center last two items on large screens if there are only two items left
  if (length % 3 === 2) {
    colSizes[length - 2].lg = { size: 4, offset: 2 }
  }
  return colSizes
}

export const useRemovePastItems = arr => {
  const now = new Date()

  let activeItems = []

  arr.forEach(event => {
    let itemDate = new Date(event.end || event.start)
    itemDate.setDate(itemDate.getDate() + 1)
    if (itemDate > now) activeItems.push(event)
  })

  return activeItems
}

export const useSetLinkType = (link, props) => {
  const url = tryUrl(link.link)

  // make sure url is valid
  function tryUrl(url) {
    try {
      var website = new URL(url)
      return website
    } catch (error) {
      if (error) {
        return null
      } //just to check if TypeError, probably not necessary for your use
    }
  }

  if (url === null) {
    return null
  }

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

export const useGetLinkProps = (link, props) => {
  if (link === null || link === undefined) {
    return null
  }

  const url = new URL(link)

  if (url.host === "pathwaymarietta.com") {
    return { tag: Link, to: url.pathname, ...props }
  } else
    return {
      tag: "a",
      href: `${url.href}${url.host === "pathwaymarietta.churchcenter.com" &&
        "?open-in-church-center-modal=true"}`,
      // rel: "noopener noreferrer",
      // target: "_blank",
      ...props,
    }
}

export const useObjectPosition = (imageSize, focusPoint) => {
  const x = (focusPoint.x / imageSize.width) * 100
  const y = (focusPoint.y / imageSize.height) * 100

  return { x: x, y: y }
}
