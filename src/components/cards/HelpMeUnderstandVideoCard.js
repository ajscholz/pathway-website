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
      footerData={tags ? tags : null}
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
  fragment HelpMeUnderstandVideoCardFragment on ContentfulResourceVideo {
    id: contentful_id
    title
    url
    tags
    type
    slug
    videoUserGuide {
      file {
        fileName
        url
      }
    }
    description {
      childMdx {
        body
      }
    }
  }
`
