import { graphql } from "gatsby"
import React from "react"
import { useSetLinkType } from "../../utils/scripts/custom-hooks"

const LinkButton = props => {
  const { button, ...rest } = props
  const Link = useSetLinkType(button, rest)

  return Link === null ? null : <>{Link}</>
}

export default LinkButton

export const data = graphql`
  fragment LinkButtonFragment on ContentfulButton {
    id
    link
    text
    internal {
      type
    }
  }
`
