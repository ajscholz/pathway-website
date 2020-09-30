import React from "react"
import CardBigRadius from "./CardBigRadius"
// import CardDescription from "./CardDescription"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"

const MBTICard = ({
  videoData: { title, url, description, thumbnail },
  image,
}) => {
  return (
    <CardBigRadius title={title} imgData={image ? thumbnail.image : url}>
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
  fragment MBTICardFragment on ContentfulMyersBriggsVideo {
    id: contentful_id
    title
    url
    thumbnail: thumbnailImg {
      image: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    slug
    description {
      childMdx {
        body
      }
    }
  }
`
