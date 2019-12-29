import React from "react"
import { useSetLinkType } from "../../utils/scripts/custom-hooks"

const LinkButton = props => {
  const { button, ...rest } = props
  const Link = useSetLinkType(button, rest)
  return <>{Link}</>
}

export default LinkButton
