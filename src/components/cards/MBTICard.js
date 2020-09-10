import React from "react"
import CardBigRadius from "./CardBigRadius"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"

const MBTICard = ({ videoData: { title, tags, url, description } }) => {
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

export default MBTICard

export const query = graphql`
  fragment MBTICardFragment on ContentfulResourceVideo {
    id: contentful_id
    title
    url
    tags
    type
    # slug
    description {
      childMdx {
        body
      }
    }
  }
`
