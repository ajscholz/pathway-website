import React from "react"
import CardBigRadius from "./CardBigRadius"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"

const HelpMeUnderstandVideoCard = ({
  videoData: { title, tags, url, description },
}) => {
  return (
    <CardBigRadius
      title={title.replace("Help Me Understand ", "")}
      footerData={tags}
      imgData={url}
    >
      <CardDescription
        desc={
          <MDXRenderer className="card-description">
            {description.childMdx.body}
          </MDXRenderer>
        }
      />
    </CardBigRadius>
  )
}

export default HelpMeUnderstandVideoCard

export const query = graphql`
  fragment HelpMeUnderstandVideoCardFragment on ContentfulHelpMeUnderstandVideo {
    title
    url
    tags
    description: videoDescription {
      childMdx {
        body
      }
    }
  }
`
