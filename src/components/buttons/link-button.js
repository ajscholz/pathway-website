import React from "react"
import { useSetLinkType } from "../../utils/scripts/custom-hooks"

const LinkButton = props => {
  const { button, ...rest } = props
  // console.log(button)
  const Link = useSetLinkType(button, rest)
  // console.log(Link)
  return <>{Link}</>
}

export default LinkButton
